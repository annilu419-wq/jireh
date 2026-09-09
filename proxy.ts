// Next 16 renombró `middleware.ts` → `proxy.ts`. Refresca la sesión de Supabase
// en cada request (mueve el token si está por vencer) para que Server Components
// y Route Handlers vean siempre un usuario válido.

import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

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

  // Si ya hay sesión y vuelve a "Entrar", lo mandamos a su día.
  if (user && path === '/entrar') {
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
