// Piezas del receptor de avisos de Hotmart (webhook v2). Lo delicado va aquí, aparte del
// route handler, para poder probarlo sin red.

import crypto from 'node:crypto';
import type { EstadoMembresia } from '@/lib/membresia';

// ── 1. Autenticidad: el hottok viaja en el header X-HOTMART-HOTTOK ───────────────────────
// Se compara en TIEMPO CONSTANTE (un `===` filtra, por el tiempo de respuesta, cuántos
// caracteres acertó un atacante). Comparamos los hashes SHA-256 de ambos lados: así la
// longitud no se filtra y timingSafeEqual recibe buffers del mismo tamaño.
export function hottokValido(recibido: string | null | undefined, esperado: string | undefined): boolean {
  if (!recibido || !esperado) return false; // fail-secure: sin clave configurada, NADA pasa
  const a = crypto.createHash('sha256').update(recibido, 'utf8').digest();
  const b = crypto.createHash('sha256').update(esperado, 'utf8').digest();
  return crypto.timingSafeEqual(a, b);
}

// ── 2. Qué estado implica cada evento ────────────────────────────────────────────────────
const EVENTO_A_ESTADO: Record<string, EstadoMembresia> = {
  PURCHASE_APPROVED: 'active',
  PURCHASE_COMPLETE: 'active',
  PURCHASE_DELAYED: 'past_due',
  PURCHASE_EXPIRED: 'expired',
  SUBSCRIPTION_CANCELLATION: 'cancelled',
  PURCHASE_REFUNDED: 'refunded',
  PURCHASE_CHARGEBACK: 'chargeback',
};

// Hotmart v2: https://developers.hotmart.com/docs/en/v1/webhook/webhook-configuration/
type Json = Record<string, unknown>;
const obj = (v: unknown): Json => (v && typeof v === 'object' ? (v as Json) : {});
const str = (v: unknown): string | undefined => (typeof v === 'string' && v.trim() !== '' ? v.trim() : undefined);
const num = (v: unknown): number | undefined => {
  const n = typeof v === 'string' ? Number(v) : v;
  return typeof n === 'number' && Number.isFinite(n) ? n : undefined;
};
const msADate = (v: unknown): Date | undefined => {
  const n = num(v);
  return n === undefined || n <= 0 ? undefined : new Date(n);
};

export interface EventoHotmart {
  evento: string;
  eventId: string;
  email?: string;
  nombre?: string;
  subscriber?: string;
  transaction?: string;
  productId?: string;
  plan?: 'mensual' | 'anual';
  estado: EstadoMembresia | null;
  eventAt?: Date;
  trialEndsAt?: Date;
  accessUntil?: Date;
  /** pista sin datos personales para la bitácora */
  pista: string;
}

/** Convierte el JSON de Hotmart en lo que necesita Jireh. NO valida autenticidad (eso va antes). */
export function interpretarEvento(payload: unknown): EventoHotmart {
  const p = obj(payload);
  const data = obj(p.data);
  const buyer = obj(data.buyer);
  const subscriber = obj(data.subscriber); // en eventos de suscripción (cancelación)
  const purchase = obj(data.purchase);
  const subscription = obj(data.subscription);
  const product = obj(data.product);
  const plan = obj(subscription.plan);
  const price = obj(purchase.price);

  const evento = str(p.event) ?? 'DESCONOCIDO';
  const email = (str(buyer.email) ?? str(subscriber.email))?.toLowerCase();
  const transaction = str(purchase.transaction);
  const eventAt = msADate(p.creation_date) ?? msADate(purchase.approved_date);

  // El id del evento debe ser ESTABLE entre reintentos (nunca Date.now()).
  const eventId =
    str(p.id) ?? `${evento}:${transaction ?? str(subscriber.code) ?? email ?? 'x'}:${eventAt?.getTime() ?? 'x'}`;

  let estado = EVENTO_A_ESTADO[evento] ?? null;

  // Inicio de PRUEBA GRATIS: Hotmart suele mandar la compra aprobada con importe 0.
  // ⚠️ A confirmar con una compra real de prueba (la pista queda en la bitácora).
  const valor = num(price.value);
  if (estado === 'active' && valor === 0) estado = 'trialing';

  const nombrePlan = (str(plan.name) ?? '').toLowerCase();
  const planDetectado: 'mensual' | 'anual' | undefined = nombrePlan.includes('anual')
    ? 'anual'
    : nombrePlan.includes('mensual')
      ? 'mensual'
      : undefined;

  // Prueba de 7 días: vence 7 días después del inicio (a falta de una fecha explícita).
  const trialEndsAt = estado === 'trialing' && eventAt ? new Date(eventAt.getTime() + 7 * 864e5) : undefined;

  // Cancelación: conserva el acceso hasta la próxima fecha de cobro (ya pagó ese período).
  const accessUntil = msADate(data.date_next_charge) ?? msADate(subscription.date_next_charge);

  return {
    evento,
    eventId,
    email,
    nombre: str(buyer.name) ?? str(subscriber.name),
    subscriber: str(subscriber.code) ?? str(obj(subscription.subscriber).code),
    transaction,
    productId: str(product.id) ?? (num(product.id) !== undefined ? String(num(product.id)) : undefined),
    plan: planDetectado,
    estado,
    eventAt,
    trialEndsAt,
    accessUntil,
    pista: `evento=${evento} estado=${estado ?? '-'} pago=${str(purchase.status) ?? '-'} valor=${valor ?? '-'} plan=${planDetectado ?? '-'}`,
  };
}

/** Huella del cuerpo recibido, para auditoría. */
export function huella(rawBody: string): string {
  return crypto.createHash('sha256').update(rawBody, 'utf8').digest('hex');
}
