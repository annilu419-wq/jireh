-- ════════════════════════════════════════════════════════════════════════════
--  Yireth · esquema inicial (Sesión 6)
--  Pegar TAL CUAL en:  Supabase → tu proyecto → SQL Editor → New query → Run
--  Todo con RLS activo. Cada persona SOLO ve y edita sus propias filas.
--  Forma de alto rendimiento de la política:  (select auth.uid())  — no  auth.uid()
-- ════════════════════════════════════════════════════════════════════════════

-- ── PERFIL (1 fila por usuario) ─────────────────────────────────────────────
create table if not exists public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  nombre      text not null default 'Amig@',
  inicial     text not null default 'Y',
  created_at  timestamptz not null default now()
);
alter table public.profiles enable row level security;

create policy "profiles: leer lo propio"   on public.profiles for select using ( (select auth.uid()) = id );
create policy "profiles: editar lo propio"  on public.profiles for update using ( (select auth.uid()) = id ) with check ( (select auth.uid()) = id );

-- ── AJUSTES ────────────────────────────────────────────────────────────────
create table if not exists public.settings (
  user_id       uuid primary key references auth.users (id) on delete cascade,
  recordatorio  boolean not null default true,
  hora          text    not null default '07:00',
  vibracion     boolean not null default true,
  aviso_racha   boolean not null default true,
  updated_at    timestamptz not null default now()
);
alter table public.settings enable row level security;
create policy "settings: dueño"      on public.settings for select using ( (select auth.uid()) = user_id );
create policy "settings: dueño ins"  on public.settings for insert with check ( (select auth.uid()) = user_id );
create policy "settings: dueño upd"  on public.settings for update using ( (select auth.uid()) = user_id ) with check ( (select auth.uid()) = user_id );

-- ── RACHA ──────────────────────────────────────────────────────────────────
create table if not exists public.streak (
  user_id     uuid primary key references auth.users (id) on delete cascade,
  actual      integer not null default 0,
  mejor       integer not null default 0,
  total_dias  integer not null default 0,
  ultimo_dia  date,
  updated_at  timestamptz not null default now()
);
alter table public.streak enable row level security;
create policy "streak: dueño"      on public.streak for select using ( (select auth.uid()) = user_id );
create policy "streak: dueño ins"  on public.streak for insert with check ( (select auth.uid()) = user_id );
create policy "streak: dueño upd"  on public.streak for update using ( (select auth.uid()) = user_id ) with check ( (select auth.uid()) = user_id );

-- ── PROGRESO DE LA RUTA ────────────────────────────────────────────────────
create table if not exists public.ruta_progreso (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  libro      text    not null default 'Génesis',
  capitulo   integer not null default 1,
  progreso   integer not null default 0,   -- % 0..100
  updated_at timestamptz not null default now()
);
alter table public.ruta_progreso enable row level security;
create policy "ruta: dueño"      on public.ruta_progreso for select using ( (select auth.uid()) = user_id );
create policy "ruta: dueño ins"  on public.ruta_progreso for insert with check ( (select auth.uid()) = user_id );
create policy "ruta: dueño upd"  on public.ruta_progreso for update using ( (select auth.uid()) = user_id ) with check ( (select auth.uid()) = user_id );

-- ── DÍAS COMPLETADOS (para la racha y el calendario) ───────────────────────
create table if not exists public.dia_completado (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users (id) on delete cascade,
  fecha      date not null default (now() at time zone 'utc')::date,
  libro      text,
  capitulo   integer,
  created_at timestamptz not null default now(),
  unique (user_id, fecha)
);
create index if not exists dia_completado_user_idx on public.dia_completado (user_id, fecha desc);
alter table public.dia_completado enable row level security;
create policy "dia: dueño"      on public.dia_completado for select using ( (select auth.uid()) = user_id );
create policy "dia: dueño ins"  on public.dia_completado for insert with check ( (select auth.uid()) = user_id );
create policy "dia: dueño del"  on public.dia_completado for delete using ( (select auth.uid()) = user_id );

-- ── DIARIO: peticiones y gratitud ─────────────────────────────────────────
create table if not exists public.peticiones (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users (id) on delete cascade,
  tipo          text not null default 'peticion' check (tipo in ('peticion','gratitud')),
  titulo        text not null check (char_length(titulo) between 1 and 200),
  nota          text check (char_length(nota) <= 1000),
  estado        text not null default 'pendiente' check (estado in ('pendiente','respondida')),
  creada_at     timestamptz not null default now(),
  respondida_at timestamptz
);
create index if not exists peticiones_user_idx on public.peticiones (user_id, creada_at desc);
alter table public.peticiones enable row level security;
create policy "peticiones: leer lo propio"   on public.peticiones for select using ( (select auth.uid()) = user_id );
create policy "peticiones: crear lo propio"   on public.peticiones for insert with check ( (select auth.uid()) = user_id );
create policy "peticiones: editar lo propio"  on public.peticiones for update using ( (select auth.uid()) = user_id ) with check ( (select auth.uid()) = user_id );
create policy "peticiones: borrar lo propio"  on public.peticiones for delete using ( (select auth.uid()) = user_id );

-- ── ALTA AUTOMÁTICA: al registrarse, crear sus filas base ─────────────────
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, nombre, inicial)
    values (
      new.id,
      coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1), 'Amig@'),
      upper(left(coalesce(new.raw_user_meta_data->>'name', new.email, 'Y'), 1))
    )
    on conflict (id) do nothing;
  insert into public.settings   (user_id) values (new.id) on conflict do nothing;
  insert into public.streak     (user_id) values (new.id) on conflict do nothing;
  insert into public.ruta_progreso (user_id) values (new.id) on conflict do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
