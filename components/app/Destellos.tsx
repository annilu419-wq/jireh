'use client';

// Destellos de estrella — celebración "algo mágico" (pedido del usuario).
// Se usa en el Diario ("¡Respondida!") y en Hoy ("día completo").
// Sobrio: estrellitas ÁMBAR (ley de color: ámbar = celebración) que brotan del
// centro con spring + fade. Nada de arcoíris.

import { motion } from 'motion/react';

// ayuda de captura: solo fuera de producción. Con ?celebra en la URL los destellos
// hacen loop, para poder fotografiar el estado.
const CAPTURA = process.env.NODE_ENV !== 'production';

const CHISPAS = [
  { x: -52, y: -18, s: 11, d: 0 }, { x: 50, y: -24, s: 13, d: 0.05 }, { x: -34, y: 22, s: 9, d: 0.09 },
  { x: 40, y: 24, s: 12, d: 0.07 }, { x: 2, y: -34, s: 10, d: 0.11 }, { x: -60, y: 8, s: 8, d: 0.13 },
  { x: 62, y: 6, s: 9, d: 0.1 }, { x: 14, y: 34, s: 8, d: 0.15 }, { x: -18, y: -30, s: 7, d: 0.17 },
  { x: 28, y: -8, s: 7, d: 0.19 },
];

export function Destellos({ activo }: { activo: boolean }) {
  if (!activo) return null;
  const loop =
    CAPTURA && typeof window !== 'undefined' && window.location.search.includes('celebra');
  return (
    <span aria-hidden="true" className="pointer-events-none absolute inset-0 grid place-items-center">
      {CHISPAS.map((c, i) => (
        <motion.svg
          key={i}
          viewBox="0 0 24 24"
          width={c.s}
          height={c.s}
          className="absolute"
          style={{ filter: 'drop-shadow(0 0 2px color-mix(in oklab, var(--accent-2) 55%, transparent))' }}
          initial={{ opacity: 0, scale: 0, x: 0, y: 0, rotate: -30 }}
          animate={{ opacity: [0, 1, 1, 0], scale: [0, 1, 1, 0.6], x: c.x, y: c.y, rotate: 20 }}
          transition={{ duration: 1.1, delay: c.d, ease: [0.16, 1, 0.3, 1], repeat: loop ? Infinity : 0, repeatDelay: 0.2 }}
        >
          <path
            d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z"
            fill="var(--accent-2)"
          />
        </motion.svg>
      ))}
    </span>
  );
}
