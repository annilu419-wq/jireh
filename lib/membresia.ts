// Reglas de la membresía de Jireh. Funciones PURAS (sin red ni base de datos), para que
// las use tanto el receptor de Hotmart como el candado de la app (proxy.ts) y las pruebas.

export type EstadoMembresia =
  | 'trialing'
  | 'active'
  | 'past_due'
  | 'cancelled'
  | 'expired'
  | 'refunded'
  | 'chargeback';

export interface Membresia {
  status: EstadoMembresia;
  access_until: string | null;
  grace_ends_at: string | null;
}

/**
 * ¿Esta membresía da acceso completo a la app?
 *  · prueba o activa            → sí
 *  · cancelada                  → sí, pero SOLO hasta `access_until` (ya pagó ese período)
 *  · pago atrasado              → sí durante la gracia (`grace_ends_at`)
 *  · vencida, reembolsada, contracargo → no
 */
export function tieneAcceso(m: Membresia | null | undefined, ahora: Date = new Date()): boolean {
  if (!m) return false;
  switch (m.status) {
    case 'trialing':
    case 'active':
      return true;
    case 'cancelled':
      return !!m.access_until && ahora < new Date(m.access_until);
    case 'past_due':
      return !!m.grace_ends_at && ahora < new Date(m.grace_ends_at);
    default:
      return false;
  }
}
