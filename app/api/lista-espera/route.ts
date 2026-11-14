// Recibe el correo de la lista de espera. Pública, pero:
//  · valida formato y largo en el servidor,
//  · trampa anti-bots (campo "empresa" oculto: una persona nunca lo llena),
//  · límite simple por IP,
//  · responde igual si el correo ya estaba (no revela quién está en la lista).
// Escribe con la publishable key: la política RLS solo permite AGREGAR filas.

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';

const ORIGENES = new Set(['instagram', 'tiktok', 'directo']);
const EMAIL_OK = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

// Límite por IP en memoria (suficiente para frenar abuso casual; cada instancia lleva su cuenta).
const intentos = new Map<string, { n: number; desde: number }>();
const VENTANA_MS = 10 * 60 * 1000;
const MAX_POR_VENTANA = 8;

function permitido(ip: string) {
  const ahora = Date.now();
  const r = intentos.get(ip);
  if (!r || ahora - r.desde > VENTANA_MS) {
    intentos.set(ip, { n: 1, desde: ahora });
    return true;
  }
  r.n += 1;
  return r.n <= MAX_POR_VENTANA;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'desconocida';
  if (!permitido(ip)) {
    return NextResponse.json({ ok: false, error: 'demasiados' }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalido' }, { status: 400 });
  }

  // Trampa para bots: fingimos éxito y no guardamos nada.
  if (typeof body.empresa === 'string' && body.empresa.trim() !== '') {
    return NextResponse.json({ ok: true });
  }

  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  if (!email || email.length > 254 || !EMAIL_OK.test(email)) {
    return NextResponse.json({ ok: false, error: 'correo' }, { status: 400 });
  }
  const nombre =
    typeof body.nombre === 'string' && body.nombre.trim() ? body.nombre.trim().slice(0, 80) : null;
  const origen = typeof body.origen === 'string' && ORIGENES.has(body.origen) ? body.origen : null;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) {
    console.error('lista-espera: falta la configuración de Supabase');
    return NextResponse.json({ ok: false, error: 'servidor' }, { status: 503 });
  }

  const supabase = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  const { error } = await supabase.from('lista_espera').insert({ email, nombre, origen });

  // 23505 = ya estaba apuntado: para quien escribe es lo mismo (éxito), y no revelamos nada.
  if (error && error.code !== '23505') {
    console.error('lista-espera: no se pudo guardar', { code: error.code });
    return NextResponse.json({ ok: false, error: 'servidor' }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
