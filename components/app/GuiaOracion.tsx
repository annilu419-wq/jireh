'use client';

// Guía de oración de 4 pasos (pedido del usuario, 2026-09-23): Confesión →
// Alabanza → Súplica → Gracias. Vive en "Hoy", después de la enseñanza del
// capítulo, antes de marcar el día completo. Progressive disclosure — colapsada
// por defecto, no le agrega peso a quien tiene prisa; quien quiere orar guiado
// la abre. Lleva su PROPIA racha, aparte de la racha de lectura (pedido del
// usuario, misma sesión) — orar y leer son dos hábitos distintos que se pueden
// cumplir cada uno por su lado. "ritual" VETADO — se dice "tu momento de oración".

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ChevronDown, HandHeart, Check, Flame } from 'lucide-react';
import { GUIA_ORACION } from '@/lib/contenido';

export function GuiaOracion({
  racha,
  hechaHoy,
  onMarcar,
  onDeshacer,
}: {
  racha: number;
  hechaHoy: boolean;
  onMarcar: () => void;
  onDeshacer: () => void;
}) {
  const [abierto, setAbierto] = useState(false);
  const reduce = useReducedMotion();

  return (
    <div className="mt-4 overflow-hidden rounded-[var(--radius-card)] border border-[color-mix(in_oklab,var(--text-tertiary)_14%,transparent)] bg-[var(--surface-2)] shadow-[inset_0_1px_2px_rgb(47_60_74_/_0.06)]">
      <motion.button
        type="button"
        onClick={() => setAbierto((v) => !v)}
        whileTap={{ scale: reduce ? 1 : 0.99 }}
        aria-expanded={abierto}
        className="flex w-full items-center gap-3 px-4 py-3.5 text-left [touch-action:manipulation]"
      >
        <span aria-hidden="true" className="grid size-9 shrink-0 place-items-center rounded-full bg-[color-mix(in_oklab,var(--accent)_12%,transparent)]">
          <HandHeart size={16} color="var(--accent)" aria-hidden="true" />
        </span>
        <span className="flex-1">
          <span className="block text-[15px] font-semibold">Tu momento de oración</span>
          <span className="block text-xs text-[var(--text-tertiary)]">4 pasos: confesión, alabanza, súplica, gracias</span>
        </span>
        {racha > 0 && (
          <span className="flex shrink-0 items-center gap-1 rounded-full bg-[color-mix(in_oklab,var(--accent-2)_12%,transparent)] px-2 py-0.5 text-xs font-bold text-[color-mix(in_oklab,var(--accent-2)_70%,black)]">
            <Flame size={11} aria-hidden="true" />
            {racha}
          </span>
        )}
        <motion.span
          animate={{ rotate: abierto ? 180 : 0 }}
          transition={{ duration: reduce ? 0 : 0.2 }}
          className="shrink-0 text-[var(--text-tertiary)]"
        >
          <ChevronDown size={18} aria-hidden="true" />
        </motion.span>
      </motion.button>

      <AnimatePresence initial={false}>
        {abierto && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <ol className="space-y-4 px-4 pb-4">
              {GUIA_ORACION.map((p, i) => (
                <motion.li
                  key={p.paso}
                  initial={{ opacity: 0, y: reduce ? 0 : 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reduce ? 0 : i * 0.07, duration: 0.3 }}
                  className="flex gap-3"
                >
                  <span
                    aria-hidden="true"
                    className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-[var(--surface-2)] text-xs font-bold text-[var(--accent)]"
                  >
                    {p.paso}
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{p.titulo}</p>
                    <p className="mt-0.5 text-[13px] leading-relaxed text-[var(--text-secondary)]">{p.prompt}</p>
                  </div>
                </motion.li>
              ))}
            </ol>

            <div className="px-4 pb-4">
              {hechaHoy ? (
                <div className="flex items-center justify-between rounded-[var(--radius-button)] bg-[color-mix(in_oklab,var(--accent-2)_10%,transparent)] px-4 py-2.5">
                  <span className="flex items-center gap-2 text-sm font-semibold text-[color-mix(in_oklab,var(--accent-2)_70%,black)]">
                    <Check size={15} strokeWidth={2.8} aria-hidden="true" />
                    Oraste hoy
                  </span>
                  <button
                    type="button"
                    onClick={onDeshacer}
                    className="text-xs font-semibold text-[var(--text-tertiary)] underline-offset-2 hover:underline [touch-action:manipulation]"
                  >
                    Deshacer
                  </button>
                </div>
              ) : (
                <motion.button
                  type="button"
                  whileTap={{ scale: reduce ? 1 : 0.97 }}
                  onClick={onMarcar}
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-[var(--radius-button)] bg-[var(--accent)] text-sm font-semibold text-[var(--bg)] shadow-[var(--shadow-card)] [touch-action:manipulation]"
                >
                  <Check size={15} aria-hidden="true" />
                  Listo, oré hoy
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
