'use client';

// "Para ti hoy" — tarjeta de versículo + reflexión breve (pedida por el usuario,
// ver ESTADO.md Decisiones técnicas). Framing cuidadoso: NUNCA "lo que Dios te dice
// hoy" como afirmación (riesgo doctrinal). Tratamiento propio de FICHA-ARTE §Tarjetas
// de versículo: suave, elegante, de época — serif SOLO aquí (excepción a "una sola sans"),
// filete fino dorado, mucho aire, nada de sombras duras.

import { motion, useReducedMotion } from 'motion/react';

export interface ParaTiHoyData {
  versiculo: string;
  referencia: string;
  reflexion: string;
}

export function ParaTiHoy({ data }: { data: ParaTiHoyData }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="mx-4 rounded-[var(--radius-card)] border border-[color-mix(in_oklab,var(--accent-2)_18%,transparent)] bg-[color-mix(in_oklab,var(--accent-2)_4%,var(--surface-2))] px-5 py-5 text-center shadow-[inset_0_1px_3px_color-mix(in_oklab,var(--text-primary)_5%,transparent)]"
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[color-mix(in_oklab,var(--accent-2)_75%,black)]">Para ti hoy</p>
      <span aria-hidden="true" className="mx-auto mt-2 block h-px w-10" style={{ background: 'color-mix(in oklab, var(--accent-2) 40%, transparent)' }} />
      <p className="mt-2.5 text-base leading-[1.5] text-[var(--text-primary)] [font-family:var(--font-serif)]">
        &ldquo;{data.versiculo}&rdquo;
      </p>
      <p className="mt-1.5 text-xs font-semibold text-[var(--accent)]">{data.referencia}</p>
      <p className="mx-auto mt-2.5 max-w-[34ch] text-[13px] leading-relaxed text-[var(--text-secondary)]">{data.reflexion}</p>
    </motion.div>
  );
}
