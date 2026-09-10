'use client';

// "La línea de la promesa" — el hilo de Génesis 3:15 hasta Jesús, dibujado en
// código sobre una tira de pergamino. Aparece SOLO en capítulos hito de la Ruta
// (~8-10 veces en total): la persona VE el hilo de toda la Biblia, no solo lo lee.
// Refuerza el mecanismo "la Biblia como un mapa".
//
// Vertical (se lee como un árbol / línea de tiempo). Color de FICHA-ARTE:
// azul = lo recorrido; ámbar = el hito donde estás (logro); tenue = lo que falta.

import { motion, useReducedMotion } from 'motion/react';
import { MapPin } from 'lucide-react';

// anclajes memorables (Mateo 1 los agrupa: Abraham→David, David→exilio, exilio→Jesús)
export const NODOS_PROMESA = [
  { n: 'Abraham', d: 'empieza la promesa' },
  { n: 'Isaac', d: 'el hijo prometido' },
  { n: 'Jacob', d: 'las 12 tribus' },
  { n: 'Judá', d: 'de su tribu vendrá el rey' },
  { n: 'Booz', d: 'rescató a Rut' },
  { n: 'David', d: 'el rey; se le promete un trono para siempre' },
  { n: 'Exilio', d: 'todo parece perdido' },
  { n: 'José de Nazaret', d: 'esposo de María, el carpintero' },
  { n: 'Jesús', d: 'la promesa cumplida' },
] as const;

export type NodoPromesa = (typeof NODOS_PROMESA)[number]['n'];

export function LineaPromesa({ hasta }: { hasta: NodoPromesa }) {
  const reduce = useReducedMotion();
  const iAhora = Math.max(0, NODOS_PROMESA.findIndex((x) => x.n === hasta));

  return (
    <figure className="overflow-hidden rounded-[var(--radius-card)] border border-[color-mix(in_oklab,var(--text-tertiary)_10%,transparent)] bg-[color-mix(in_oklab,var(--accent-2)_4%,var(--surface-2))] p-4 shadow-[inset_0_1px_3px_color-mix(in_oklab,var(--text-primary)_5%,transparent)]">
      <figcaption className="text-[11px] font-bold uppercase tracking-[0.12em] text-[color-mix(in_oklab,var(--accent-2)_70%,black)]">
        La línea de la promesa
      </figcaption>

      <ol className="relative mt-3">
        {NODOS_PROMESA.map((x, i) => {
          const recorrido = i < iAhora;
          const aqui = i === iAhora;
          const ultimo = i === NODOS_PROMESA.length - 1;
          return (
            <li
              key={x.n}
              className={`relative flex gap-3 pb-3 last:pb-0 ${
                aqui ? '-mx-2 rounded-[var(--radius-button)] bg-[color-mix(in_oklab,var(--accent-2)_12%,transparent)] px-2 py-1.5' : ''
              }`}
            >
              {/* tramo vertical hacia el siguiente nodo */}
              {!ultimo && (
                <span
                  aria-hidden="true"
                  className="absolute left-[5px] top-3 h-full w-[2px]"
                  style={{
                    background:
                      i < iAhora
                        ? 'var(--accent)'
                        : 'repeating-linear-gradient(180deg, color-mix(in oklab, var(--text-tertiary) 40%, transparent) 0 2px, transparent 2px 6px)',
                  }}
                />
              )}

              {/* nodo */}
              <span className="relative z-10 mt-1 grid size-3 shrink-0 place-items-center">
                {aqui ? (
                  <>
                    {!reduce && (
                      <motion.span
                        className="absolute inset-[-6px] rounded-full border border-[color-mix(in_oklab,var(--accent-2)_45%,transparent)]"
                        animate={{ scale: [0.7, 1.6, 0.7], opacity: [0.6, 0, 0.6] }}
                        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
                      />
                    )}
                    <span className="size-3 rounded-full bg-[var(--accent-2)] ring-2 ring-[color-mix(in_oklab,var(--accent-2)_25%,transparent)]" />
                  </>
                ) : (
                  <span
                    className={`size-2.5 rounded-full ${
                      recorrido
                        ? 'bg-[var(--accent)]'
                        : 'border border-[color-mix(in_oklab,var(--text-tertiary)_45%,transparent)] bg-[var(--surface)]'
                    }`}
                  />
                )}
              </span>

              {/* texto */}
              <span className="min-w-0 flex-1 -mt-0.5">
                {aqui && (
                  <span className="mb-1 inline-flex items-center gap-1 rounded-full bg-[var(--accent-2)] px-2 py-0.5 text-[11px] font-bold text-[var(--bg)]">
                    <MapPin size={11} strokeWidth={2.6} aria-hidden="true" />
                    Vas por aquí
                  </span>
                )}
                <span className="block">
                  <span
                    className={`text-sm leading-tight ${
                      aqui
                        ? 'font-bold text-[color-mix(in_oklab,var(--accent-2)_72%,black)]'
                        : recorrido
                          ? 'font-semibold text-[var(--text-primary)]'
                          : 'font-medium text-[var(--text-tertiary)]'
                    }`}
                  >
                    {x.n}
                  </span>
                  <span
                    className={`ml-1.5 text-[13px] leading-tight ${
                      i > iAhora ? 'text-[var(--text-tertiary)]' : 'text-[var(--text-secondary)]'
                    }`}
                  >
                    · {x.d}
                  </span>
                </span>
              </span>
            </li>
          );
        })}
      </ol>
    </figure>
  );
}
