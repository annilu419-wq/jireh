'use client';

// Transición corta entre pestañas de la app interna (baseline de movimiento del SO:
// "transición entre tabs/pantallas"). template.tsx se re-monta en cada navegación,
// así que su animación de entrada corre en cada cambio de ruta. reduced-motion: sin y.

import { motion, useReducedMotion } from 'motion/react';

export default function AppTemplate({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0.15 : 0.28, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
