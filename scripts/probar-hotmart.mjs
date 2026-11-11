// Pruebas SIN red del receptor de Hotmart (funciones puras).
// Uso:  node --conditions=react-server --experimental-strip-types scripts/probar-hotmart.mjs
import assert from 'node:assert/strict';
import { hottokValido, interpretarEvento, huella } from '../lib/hotmart.ts';
import { tieneAcceso } from '../lib/membresia.ts';

let ok = 0;
const t = (nombre, fn) => { fn(); ok++; console.log('  ✓', nombre); };

console.log('hottok');
t('acepta el correcto', () => assert.equal(hottokValido('abc123', 'abc123'), true));
t('rechaza uno distinto', () => assert.equal(hottokValido('abc124', 'abc123'), false));
t('rechaza vacío / ausente', () => { assert.equal(hottokValido('', 'abc'), false); assert.equal(hottokValido(null, 'abc'), false); });
t('SIN clave configurada nada pasa (fail-secure)', () => { assert.equal(hottokValido('abc', undefined), false); assert.equal(hottokValido('', ''), false); });
t('longitudes distintas no explotan', () => assert.equal(hottokValido('a', 'aaaaaaaaaaaaaaaa'), false));

console.log('interpretar evento');
const compra = {
  id: 'evt-1', event: 'PURCHASE_APPROVED', creation_date: 1760000000000,
  data: { product: { id: 8947528 }, buyer: { email: 'Ana@Correo.com', name: 'Ana' },
    purchase: { transaction: 'HP123', status: 'APPROVED', price: { value: 29.99 } },
    subscription: { plan: { name: 'Anual' }, subscriber: { code: 'SUB1' } } },
};
t('compra aprobada → active, correo en minúsculas, plan anual', () => {
  const e = interpretarEvento(compra);
  assert.equal(e.estado, 'active'); assert.equal(e.email, 'ana@correo.com');
  assert.equal(e.plan, 'anual'); assert.equal(e.subscriber, 'SUB1'); assert.equal(e.productId, '8947528');
  assert.equal(e.eventId, 'evt-1');
});
t('compra con valor 0 → trialing y vence en 7 días', () => {
  const e = interpretarEvento({ ...compra, data: { ...compra.data, purchase: { ...compra.data.purchase, price: { value: 0 } } } });
  assert.equal(e.estado, 'trialing');
  assert.equal(e.trialEndsAt.getTime() - e.eventAt.getTime(), 7 * 864e5);
});
t('cancelación (correo en data.subscriber) → cancelled con acceso hasta la próxima fecha', () => {
  const e = interpretarEvento({ id: 'evt-2', event: 'SUBSCRIPTION_CANCELLATION', creation_date: 1760000000000,
    data: { subscriber: { code: 'SUB1', email: 'ana@correo.com' }, date_next_charge: 1762600000000 } });
  assert.equal(e.estado, 'cancelled'); assert.equal(e.email, 'ana@correo.com');
  assert.equal(e.accessUntil.getTime(), 1762600000000);
});
t('reembolso y contracargo', () => {
  assert.equal(interpretarEvento({ event: 'PURCHASE_REFUNDED', data: {} }).estado, 'refunded');
  assert.equal(interpretarEvento({ event: 'PURCHASE_CHARGEBACK', data: {} }).estado, 'chargeback');
});
t('evento desconocido → sin estado (se ignora)', () => assert.equal(interpretarEvento({ event: 'PURCHASE_OUT_OF_SHOPPING_CART', data: {} }).estado, null));
t('basura no revienta', () => { for (const x of [null, 5, 'x', [], {}]) interpretarEvento(x); });
t('id estable entre reintentos cuando Hotmart no manda id', () => {
  const sinId = { event: 'PURCHASE_APPROVED', creation_date: 1760000000000, data: { buyer: { email: 'a@b.co' }, purchase: { transaction: 'T9' } } };
  assert.equal(interpretarEvento(sinId).eventId, interpretarEvento(sinId).eventId);
});
t('huella es estable', () => assert.equal(huella('x'), huella('x')));

console.log('acceso');
const ahora = new Date('2026-12-01T00:00:00Z');
const futuro = '2026-12-10T00:00:00Z', pasado = '2026-11-20T00:00:00Z';
t('trialing y active entran', () => { assert.equal(tieneAcceso({ status: 'trialing' }, ahora), true); assert.equal(tieneAcceso({ status: 'active' }, ahora), true); });
t('cancelada entra solo hasta access_until', () => {
  assert.equal(tieneAcceso({ status: 'cancelled', access_until: futuro }, ahora), true);
  assert.equal(tieneAcceso({ status: 'cancelled', access_until: pasado }, ahora), false);
  assert.equal(tieneAcceso({ status: 'cancelled', access_until: null }, ahora), false);
});
t('atrasada entra solo durante la gracia', () => {
  assert.equal(tieneAcceso({ status: 'past_due', grace_ends_at: futuro }, ahora), true);
  assert.equal(tieneAcceso({ status: 'past_due', grace_ends_at: pasado }, ahora), false);
});
t('vencida, reembolsada, contracargo y sin membresía NO entran', () => {
  for (const s of ['expired', 'refunded', 'chargeback']) assert.equal(tieneAcceso({ status: s }, ahora), false);
  assert.equal(tieneAcceso(null, ahora), false); assert.equal(tieneAcceso(undefined, ahora), false);
});

console.log(`\n${ok} pruebas OK`);
