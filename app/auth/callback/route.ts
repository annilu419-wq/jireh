// Punto de aterrizaje del enlace de acceso (magic link) y del OAuth de Google.
// Supabase manda aquí con un ?code=... ; lo canjeamos por una sesión en cookies
// y mandamos al usuario a la app.

import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  // solo rutas internas: evita que un enlace manipulado mande a otro sitio
  const pedido = url.searchParams.get('next') ?? '/app/hoy';
  const next = pedido.startsWith('/') && !pedido.startsWith('//') ? pedido : '/app/hoy';

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(new URL(next, url.origin));
    }
  }

  // enlace vencido, ya usado o inválido
  return NextResponse.redirect(new URL('/entrar?error=enlace', url.origin));
}
