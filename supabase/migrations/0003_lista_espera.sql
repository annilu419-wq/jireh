-- ════════════════════════════════════════════════════════════════════════════
--  Jireh · lista de espera de pre-lanzamiento — IDEMPOTENTE.
--  Pegar tal cual en: Supabase → SQL Editor → Run. Se puede correr varias veces.
--
--  Qué crea: la tabla `lista_espera` (1 fila por correo interesado).
--  Seguridad: RLS activo. El navegador SOLO puede AGREGAR un correo con formato válido;
--  nadie puede leer, cambiar ni borrar la lista desde fuera (solo tú, desde el panel de
--  Supabase, o el servidor con la secret key).
-- ════════════════════════════════════════════════════════════════════════════

create table if not exists public.lista_espera (
  email       text primary key
              check (email = lower(email) and length(email) <= 254 and email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  nombre      text check (nombre is null or length(nombre) <= 80),
  origen      text check (origen is null or length(origen) <= 40),   -- instagram, tiktok, directo…
  created_at  timestamptz not null default now()
);

alter table public.lista_espera enable row level security;

drop policy if exists "lista_espera: cualquiera puede apuntarse" on public.lista_espera;
create policy "lista_espera: cualquiera puede apuntarse" on public.lista_espera
  for insert to anon, authenticated
  with check ( true );
-- (sin políticas de select/update/delete → nadie lee la lista desde el navegador)

revoke all on public.lista_espera from anon, authenticated;
grant insert on public.lista_espera to anon, authenticated;
