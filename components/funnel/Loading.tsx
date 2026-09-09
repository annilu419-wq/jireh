'use client';

// FUNNEL — "Armando tu Ruta" (blueprint B de 50): NO es un spinner. 4-6s, anillo
// con mesetas, 3-5 líneas con checkmarks progresivos que usan las respuestas REALES.
// Al completar: pausa de 400ms con todo en check → onDone.

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Check } from 'lucide-react';

export interface LineaLoading {
  /** "[verbo gerundio] tu [dato]: [respuesta literal]" */
  texto: string;
}

export function Loading({ lineas, onDone }: { lineas: LineaLoading[]; onDone: () => void }) {
  const reduce = useReducedMotion();
  const [activa, setActiva] = useState(0);
  const [pct, setPct] = useState(0);
  const total = lineas.length;
  const doneRef = useRef(false);

  useEffect(() => {
    if (reduce) {
      setActiva(total);
      setPct(100);
      const t = window.setTimeout(onDone, 300);
      return () => window.clearTimeout(t);
    }
    const perLine = Math.max(750, Math.min(1100, 4800 / total));
    const timers: number[] = [];
    for (let i = 1; i <= total; i++) {
      timers.push(window.setTimeout(() => setActiva(i), perLine * i));
    }
    // anillo con mesetas
    let p = 0;
    const ring = window.setInterval(() => {
      p = Math.min(100, p + (2.5 + Math.random() * 3));
      setPct(Math.round(p));
      if (p >= 100) window.clearInterval(ring);
    }, Math.max(60, (perLine * total) / 40));
    const end = window.setTimeout(() => {
      if (doneRef.current) return;
      doneRef.current = true;
      setActiva(total);
      setPct(100);
      window.setTimeout(onDone, 420);
    }, perLine * total + 300);
    timers.push(end);
    return () => {
      timers.forEach(window.clearTimeout);
      window.clearInterval(ring);
    };
  }, [lineas, total, onDone, reduce]);

  const R = 52;
  const C = 2 * Math.PI * R;

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6" aria-live="polite" aria-busy={pct < 100}>
      <div className="relative size-32">
        <svg viewBox="0 0 128 128" className="size-full -rotate-90">
          <circle cx="64" cy="64" r={R} fill="none" strokeWidth="9" stroke="color-mix(in oklab, var(--accent) 14%, transparent)" />
          <circle
            cx="64"
            cy="64"
            r={R}
            fill="none"
            strokeWidth="9"
            strokeLinecap="round"
            stroke="var(--accent)"
            strokeDasharray={C}
            strokeDashoffset={C * (1 - pct / 100)}
            style={{ transition: 'stroke-dashoffset .4s ease-out' }}
          />
        </svg>
        <span className="absolute inset-0 grid place-items-center text-[22px] font-bold tabular-nums text-[var(--text-primary)] [font-family:var(--font-display)]">
          {pct}%
        </span>
      </div>

      <h2 className="mt-6 text-[22px] font-bold tracking-[-0.02em] [font-family:var(--font-display)]">Armando tu Ruta…</h2>

      <ul className="mt-6 w-full max-w-sm space-y-2.5">
        {lineas.map((l, i) => {
          const estado = i < activa ? 'done' : i === activa ? 'now' : 'pending';
          return (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: reduce ? 0 : 8 }}
              animate={{ opacity: estado === 'pending' ? 0.4 : 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="flex items-start gap-3 text-[15px] leading-snug text-[var(--text-primary)]"
            >
              <span aria-hidden="true" className="mt-0.5 grid size-5 shrink-0 place-items-center">
                {estado === 'done' ? (
                  <span className="grid size-5 place-items-center rounded-full bg-[color-mix(in_oklab,var(--accent)_14%,transparent)]">
                    <Check size={13} strokeWidth={2.8} color="var(--accent)" />
                  </span>
                ) : estado === 'now' ? (
                  <motion.span
                    className="size-2.5 rounded-full bg-[var(--accent)]"
                    animate={reduce ? {} : { scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  />
                ) : (
                  <span className="size-2.5 rounded-full border-2 border-[color-mix(in_oklab,var(--text-tertiary)_45%,transparent)]" />
                )}
              </span>
              {l.texto}
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
