// Receptor de avisos de Hotmart (webhook). Cuando alguien paga, cancela o pide reembolso,
// Hotmart llama aquí; este archivo verifica que el aviso sea REAL y actualiza la membresía.
//
// Orden de defensas (todas antes de tocar la base de datos):
//   1. AUTENTICIDAD  → el hottok del header coincide con HOTMART_HOTTOK (tiempo constante).
//   2. PRODUCTO      → es nuestro producto (si HOTMART_PRODUCT_ID está configurado).
//   3. IDEMPOTENCIA  → Hotmart reenvía; la función SQL descarta lo ya procesado.
//   4. ORDEN/ESTADO  → un aviso viejo no pisa uno nuevo; un reembolso no se "revive".
//
// Respuestas: 401 si no es de Hotmart · 200 cuando la decisión ya se tomó (aunque sea
// "duplicado" o "ignorado", así Hotmart deja de reintentar) · 5xx si falló algo nuestro
// (así Hotmart reintenta).

import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import { hottokValido, huella, interpretarEvento } from '@/lib/hotmart';

export const runtime = 'nodejs'; // necesitamos node:crypto

type Resultado = 'applied' | 'duplicate' | 'illegal' | 'stale' | 'ignored' | 'unauthorized' | 'error';

async function registrar(
  admin: Awaited<ReturnType<typeof createAdminClient>>,
  fila: { event_id?: string; type?: string; result: Resultado; detalle?: string },
) {
  // La bitácora nunca debe tumbar la respuesta: si falla, solo lo anotamos en consola.
  const { error } = await admin.from('webhook_log').insert(fila);
  if (error) console.error('webhook_log no se pudo escribir', { code: error.code });
}

export async function POST(req: NextRequest) {
  // 0. Sin la clave configurada el receptor NO opera (fail-secure, nunca un valor de juguete).
  const esperado = process.env.HOTMART_HOTTOK?.trim(); // trim: un salto de línea al pegar la clave no debe tumbar todo
  if (!esperado) {
    console.error('FALTA HOTMART_HOTTOK — el receptor de Hotmart está apagado');
    return NextResponse.json({ error: 'not configured' }, { status: 503 });
  }

  const rawBody = await req.text();
  const admin = await createAdminClient();

  // 1. Autenticidad
  const hottok = req.headers.get('x-hotmart-hottok');
  if (!hottokValido(hottok?.trim(), esperado)) {
    // Pista sin secretos: si llegó el header y los largos, para diagnosticar un desajuste.
    const pista = `header=${hottok ? 'si' : 'no'} largo_recibido=${hottok?.trim().length ?? 0} largo_esperado=${esperado.length}`;
    await registrar(admin, { result: 'unauthorized', detalle: pista });
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 }); // genérico: no revelar por qué
  }

  // Parsear SOLO después de verificar
  let payload: unknown;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: 'bad request' }, { status: 400 });
  }

  const ev = interpretarEvento(payload);

  // 2. ¿Es nuestro producto?
  const productoEsperado = process.env.HOTMART_PRODUCT_ID?.trim();
  if (productoEsperado && ev.productId && ev.productId !== productoEsperado) {
    await registrar(admin, { event_id: ev.eventId, type: ev.evento, result: 'ignored', detalle: 'producto ajeno' });
    return NextResponse.json({ received: true, ignored: 'product' });
  }

  // Eventos que no cambian la membresía (p. ej. carrito abandonado): se anotan y listo.
  if (!ev.estado) {
    await registrar(admin, { event_id: ev.eventId, type: ev.evento, result: 'ignored', detalle: ev.pista });
    return NextResponse.json({ received: true, ignored: ev.evento });
  }

  // 3 y 4. Idempotencia + orden + transición legal + actualización, todo atómico en SQL.
  const { data, error } = await admin.rpc('apply_hotmart_event', {
    p_event_id: ev.eventId,
    p_event_type: ev.evento,
    p_payload_hash: huella(rawBody),
    p_email: ev.email ?? null,
    p_name: ev.nombre ?? null,
    p_subscriber: ev.subscriber ?? null,
    p_transaction: ev.transaction ?? null,
    p_new_status: ev.estado,
    p_plan: ev.plan ?? null,
    p_event_at: ev.eventAt?.toISOString() ?? null,
    p_trial_ends_at: ev.trialEndsAt?.toISOString() ?? null,
    p_access_until: ev.accessUntil?.toISOString() ?? null,
  });

  if (error) {
    console.error('webhook hotmart: falló apply_hotmart_event', { evento: ev.evento, code: error.code }); // sin datos personales
    await registrar(admin, { event_id: ev.eventId, type: ev.evento, result: 'error', detalle: ev.pista });
    return NextResponse.json({ error: 'processing failed' }, { status: 500 }); // 5xx → Hotmart reintenta
  }

  const estadoSql = (data as { status?: string } | null)?.status;
  const resultado: Resultado =
    estadoSql === 'applied' ? 'applied'
    : estadoSql === 'duplicate' ? 'duplicate'
    : estadoSql === 'stale' ? 'stale'
    : estadoSql === 'illegal_transition' ? 'illegal'
    : 'ignored';

  await registrar(admin, { event_id: ev.eventId, type: ev.evento, result: resultado, detalle: ev.pista });
  return NextResponse.json({ received: true, result: resultado });
}

// Cualquier otro método (alguien abriendo la dirección en el navegador): nada que ver aquí.
export function GET() {
  return NextResponse.json({ error: 'method not allowed' }, { status: 405 });
}
