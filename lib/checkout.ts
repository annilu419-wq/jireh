// Links de pago de Hotmart (públicos, verificados 2026-11-12). Cada plan es una "oferta" (?off=).
// Anual: US$29,99/año con 7 días gratis · Mensual: US$6,99/mes sin prueba.
export const CHECKOUT_URL = {
  anual: 'https://pay.hotmart.com/L108450893L?off=kxwsbqi2',
  mensual: 'https://pay.hotmart.com/L108450893L?off=uxyai7r5',
} as const;

export type PlanCheckout = keyof typeof CHECKOUT_URL;
