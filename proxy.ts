// Next 16 renombró `middleware.ts` → `proxy.ts`. Refresca la sesión de Supabase
// en cada request (mueve el token si está por vencer) para que Server Components
// y Route Handlers vean siempre un usuario válido.

import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { tieneAcceso } from '@/lib/membresia';

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return response; // sin config aún: no romper el dev server

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  // Necesario: dispara el refresh del token.
  const { data: { user } } = await supabase.auth.getUser();

  // Las secciones internas exigen sesión. Sin ella → a "Entrar".
  const path = request.nextUrl.pathname;
  if (!user && path.startsWith('/app')) {
    const url = request.nextUrl.clone();
    url.pathname = '/entrar';
    url.search = '';
    return NextResponse.redirect(url);
  }

  // CANDADO DE MEMBRESÍA. Apagado por defecto: se enciende en Vercel con PAYWALL_ACTIVO=true
  // el día del lanzamiento (así no dejamos fuera a quien prueba mientras se construye).
  // Con sesión pero sin suscripción vigente → a "Entrar" con un aviso claro.
  if (user && path.startsWith('/app') && process.env.PAYWALL_ACTIVO === 'true') {
    // RLS solo deja ver la membresía del correo de la propia sesión.
    const { data: membresia, error } = await supabase
      .from('membresias')
      .select('status, access_until, grace_ends_at')
      .maybeSingle();
    if (error || !tieneAcceso(membresia)) {
      const destino = request.nextUrl.clone();
      destino.pathname = '/entrar';
      destino.search = error ? '?error=verificacion' : '?error=membresia'; // fail-closed si no se pudo verificar
      return NextResponse.redirect(destino);
    }
  }

  // Si ya hay sesión y vuelve a "Entrar", lo mandamos a su día
  // (salvo que venga con un aviso de membresía: ahí debe verlo, no rebotar en bucle).
  if (user && path === '/entrar' && !request.nextUrl.searchParams.has('error')) {
    const url = request.nextUrl.clone();
    url.pathname = '/app/hoy';
    url.search = '';
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
