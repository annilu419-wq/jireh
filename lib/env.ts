// Validación fail-closed de variables de entorno. Si falta algo requerido, la app
// avisa claro en vez de correr con un valor de juguete.
//
// OJO: Next solo incrusta las NEXT_PUBLIC_* en el bundle del navegador cuando se
// accede a `process.env.NEXT_PUBLIC_FOO` de forma ESTÁTICA (no `process.env[x]`).

function exigir(nombre: string, valor: string | undefined): string {
  if (!valor || valor.trim() === '' || valor.includes('PEGA_AQUI')) {
    throw new Error(
      `Falta la variable de entorno ${nombre}. Revísala en .env.local (o en Vercel para producción).`,
    );
  }
  return valor.trim();
}

/** Solo lo que puede ir al navegador (público por diseño; RLS protege los datos). */
export const publicEnv = {
  supabaseUrl: exigir('NEXT_PUBLIC_SUPABASE_URL', process.env.NEXT_PUBLIC_SUPABASE_URL),
  supabasePublishableKey: exigir(
    'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY',
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  ),
};

/** Solo servidor. Nunca importar esto desde un componente cliente. */
export function serverEnv() {
  return {
    supabaseUrl: exigir('SUPABASE_URL', process.env.SUPABASE_URL),
    supabaseSecretKey: exigir('SUPABASE_SECRET_KEY', process.env.SUPABASE_SECRET_KEY),
  };
}
