-- ════════════════════════════════════════════════════════════════════════════
--  Jireh · membresías + webhook de Hotmart (Sesión 6) — IDEMPOTENTE.
--  Pegar tal cual en: Supabase → SQL Editor → Run. Se puede correr varias veces.
--
--  Qué crea:
--   · membresias        → 1 fila por correo comprador: estado, plan, hasta cuándo.
--   · processed_events  → avisos de Hotmart ya procesados (evita duplicados).
--   · webhook_log       → bitácora de TODO aviso recibido (éxito y fallo).
--   · apply_hotmart_event() → aplica un aviso de forma atómica (solo servidor).
--
--  Seguridad: RLS activo en las tres tablas. La persona SOLO puede leer SU
--  membresía (por el correo de su sesión). Escribir/leer el resto: solo el servidor
--  (secret key), nunca el navegador.
-- ════════════════════════════════════════════════════════════════════════════

-- ── MEMBRESÍAS ─────────────────────────────────────────────────────────────
create table if not exists public.membresias (
  email                text primary key check (email = lower(email)),
  nombre               text,
  status               text not null check (status in
                         ('trialing','active','past_due','cancelled','expired','refunded','chargeback')),
  plan                 text check (plan in ('mensual','anual')),
  hotmart_subscriber   text,                 -- código del suscriptor en Hotmart
  hotmart_transaction  text,                 -- última transacción vista
  trial_ends_at        timestamptz,
  first_paid_at        timestamptz,          -- fija el PRIMER cobro real (métrica prueba→pago)
  access_until         timestamptz,          -- cancelada: acceso hasta aquí
  grace_ends_at        timestamptz,          -- pago atrasado: gracia hasta aquí
  last_event_at        timestamptz not null default now(),  -- fecha del último evento aplicado
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now()
);
create index if not exists membresias_subscriber_idx on public.membresias (hotmart_subscriber);
alter table public.membresias enable row level security;
drop policy if exists "membresias: leer la propia" on public.membresias;
create policy "membresias: leer la propia" on public.membresias
  for select using ( email = lower((select auth.jwt() ->> 'email')) );
-- (sin políticas de insert/update/delete → solo el servidor con la secret key escribe)

-- ── AVISOS YA PROCESADOS (idempotencia) ────────────────────────────────────
create table if not exists public.processed_events (
  event_id      text primary key,
  event_type    text not null,
  payload_hash  text,
  processed_at  timestamptz not null default now()
);
alter table public.processed_events enable row level security;  -- sin políticas: solo servidor

-- ── BITÁCORA DE TODO AVISO ─────────────────────────────────────────────────
create table if not exists public.webhook_log (
  id           bigserial primary key,
  event_id     text,
  type         text,
  result       text not null check (result in
                 ('applied','duplicate','illegal','stale','ignored','unauthorized','error')),
  detalle      text,                         -- pista SIN datos personales (p. ej. estado del pago)
  received_at  timestamptz not null default now()
);
create index if not exists webhook_log_received_idx on public.webhook_log (received_at desc);
create index if not exists webhook_log_result_idx   on public.webhook_log (result, received_at desc);
alter table public.webhook_log enable row level security;       -- sin políticas: solo servidor

-- ── APLICAR UN AVISO (atómico) ─────────────────────────────────────────────
--  Idempotencia + orden de eventos + transición legal + upsert, todo en una transacción.
create or replace function public.apply_hotmart_event(
  p_event_id        text,
  p_event_type      text,
  p_payload_hash    text,
  p_email           text,
  p_name            text,
  p_subscriber      text,
  p_transaction     text,
  p_new_status      text,
  p_plan            text,
  p_event_at        timestamptz,
  p_trial_ends_at   timestamptz,
  p_access_until    timestamptz
) returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_email    text := lower(trim(p_email));
  v_current  public.membresias%rowtype;
  v_found    boolean;
  v_event_at timestamptz := coalesce(p_event_at, now());
begin
  if v_email is null or v_email = '' then
    return jsonb_build_object('status','ignored','reason','sin_correo');
  end if;

  -- (a) IDEMPOTENCIA: si el evento ya se procesó, salir sin tocar nada.
  begin
    insert into public.processed_events (event_id, event_type, payload_hash)
    values (p_event_id, p_event_type, p_payload_hash);
  exception when unique_violation then
    return jsonb_build_object('status','duplicate');
  end;

  -- (b) Estado actual (bloquea la fila mientras dura la transacción).
  select * into v_current from public.membresias where email = v_email for update;
  v_found := found;

  -- (c) Evento VIEJO reentregado: no pisar algo más reciente.
  if v_found and v_event_at < v_current.last_event_at then
    return jsonb_build_object('status','stale');
  end if;

  -- (d) TRANSICIÓN LEGAL: no resucitar un reembolso/contracargo con un evento de acceso.
  if v_found and v_current.status in ('refunded','chargeback')
     and p_new_status in ('active','trialing','past_due') then
    return jsonb_build_object('status','illegal_transition','from',v_current.status);
  end if;

  -- (e) Aplicar.
  insert into public.membresias as m
    (email, nombre, status, plan, hotmart_subscriber, hotmart_transaction,
     trial_ends_at, first_paid_at, access_until, grace_ends_at, last_event_at, updated_at)
  values
    (v_email, nullif(p_name,''), p_new_status, p_plan, p_subscriber, p_transaction,
     case when p_new_status = 'trialing' then p_trial_ends_at else null end,
     case when p_new_status = 'active'   then v_event_at      else null end,
     case when p_new_status = 'cancelled' then coalesce(p_access_until, v_event_at + interval '30 days') else null end,
     case when p_new_status = 'past_due'  then v_event_at + interval '7 days' else null end,
     v_event_at, now())
  on conflict (email) do update set
    nombre              = coalesce(nullif(p_name,''), m.nombre),
    status              = excluded.status,
    plan                = coalesce(excluded.plan, m.plan),
    hotmart_subscriber  = coalesce(excluded.hotmart_subscriber, m.hotmart_subscriber),
    hotmart_transaction = coalesce(excluded.hotmart_transaction, m.hotmart_transaction),
    trial_ends_at       = case when excluded.status = 'trialing'
                               then coalesce(excluded.trial_ends_at, m.trial_ends_at)
                               else m.trial_ends_at end,
    -- el primer cobro real se fija UNA sola vez (métrica prueba→pago)
    first_paid_at       = coalesce(m.first_paid_at, excluded.first_paid_at),
    access_until        = case when excluded.status = 'cancelled'
                               then coalesce(p_access_until, m.access_until, v_event_at + interval '30 days')
                               when excluded.status in ('active','trialing') then null
                               else m.access_until end,
    grace_ends_at       = case when excluded.status = 'past_due' then excluded.grace_ends_at
                               when excluded.status in ('active','trialing') then null
                               else m.grace_ends_at end,
    last_event_at       = v_event_at,
    updated_at          = now();

  return jsonb_build_object('status','applied','new_status',p_new_status);
end;
$$;

-- Solo el servidor (secret key) puede ejecutarla. Por defecto Postgres la deja abierta a todos:
revoke all on function public.apply_hotmart_event(
  text,text,text,text,text,text,text,text,text,timestamptz,timestamptz,timestamptz
) from public, anon, authenticated;
grant execute on function public.apply_hotmart_event(
  text,text,text,text,text,text,text,text,text,timestamptz,timestamptz,timestamptz
) to service_role;
