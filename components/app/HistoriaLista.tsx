'use client';

// Lista de "Tu historia con Dios" dentro de Devocional: lo que la persona ha ido
// escribiendo cada día, para releerlo. Muestra las últimas 3 y se expande al resto.

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { BookHeart, ChevronDown, ChevronRight } from 'lucide-react';
import { fechaRelativa, listarHistoria, type EntradaHistoria } from '@/lib/datos';

const VISIBLES = 3;

export function HistoriaLista({ demo }: { demo?: EntradaHistoria[] } = {}) {
  const reduce = useReducedMotion();
  const [entradas, setEntradas] = useState<EntradaHistoria[] | null>(demo ?? null);
  const [todas, setTodas] = useState(false);

  useEffect(() => {
    if (demo) return;
    let vivo = true;
    listarHistoria()
      .then((l) => {
        if (vivo) setEntradas(l);
      })
      .catch(() => {
        if (vivo) setEntradas([]);
      });
    return () => {
      vivo = false;
    };
  }, [demo]);

  if (entradas === null) {
    return <div aria-hidden="true" className="mt-4 h-24 animate-pulse rounded-[var(--radius-card)] bg-[var(--surface-2)]" />;
  }

  const total = entradas.length;
  const mostradas = todas ? entradas : entradas.slice(0, VISIBLES);

  return (
    <section
      aria-label="Tu historia con Dios"
      className="mt-4 rounded-[var(--radius-card)] border border-[color-mix(in_oklab,var(--text-tertiary)_12%,transparent)] bg-[var(--surface)] p-4 shadow-[var(--shadow-card)]"
    >
      <div className="flex items-center gap-2.5">
        <span aria-hidden="true" className="grid size-8 shrink-0 place-items-center rounded-full bg-[color-mix(in_oklab,var(--accent)_12%,transparent)]">
          <BookHeart size={15} color="var(--accent)" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-base font-bold [font-family:var(--font-display)]">Tu historia con Dios</p>
          <p className="text-xs text-[var(--text-tertiary)]">
            {total === 0 ? 'Todavía no has escrito nada' : `${total} ${total === 1 ? 'día escrito' : 'días escritos'}`}
          </p>
        </div>
      </div>

      {total === 0 ? (
        <div className="mt-3">
          <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
            Aquí vivirá lo que Dios te vaya diciendo, con tus propias palabras. Se escribe en <span className="font-semibold">Hoy</span>, al terminar la enseñanza.
          </p>
          <Link
            href="/app/hoy"
            className="mt-2.5 inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent)] [touch-action:manipulation]"
          >
            Empezar hoy
            <ChevronRight size={15} aria-hidden="true" />
          </Link>
        </div>
      ) : (
        <>
          <ul className="mt-3 space-y-3">
            {mostradas.map((e, i) => (
              <motion.li
                key={e.id}
                initial={{ opacity: 0, y: reduce ? 0 : 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reduce ? 0 : i * 0.05, duration: 0.25 }}
                className="border-t border-[color-mix(in_oklab,var(--text-tertiary)_12%,transparent)] pt-3 first:border-t-0 first:pt-0"
              >
                <p className="text-xs font-semibold text-[var(--text-tertiary)]">
                  {fechaRelativa(`${e.fecha}T12:00:00`)}
                  {e.libro && e.capitulo ? <span className="text-[var(--accent)]"> · {e.libro} {e.capitulo}</span> : null}
                </p>
                {e.situacion && <p className="mt-1 text-sm leading-relaxed text-[var(--text-primary)]">{e.situacion}</p>}
                {e.mensaje && (
                  <p className="mt-1 border-l-2 border-[color-mix(in_oklab,var(--accent-2)_55%,transparent)] pl-3 text-sm italic leading-relaxed text-[var(--text-secondary)]">
                    {e.mensaje}
                  </p>
                )}
              </motion.li>
            ))}
          </ul>
          {total > VISIBLES && (
            <button
              type="button"
              onClick={() => setTodas((v) => !v)}
              aria-expanded={todas}
              className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent)] [touch-action:manipulation]"
            >
              {todas ? 'Ver menos' : `Ver los ${total} días`}
              <ChevronDown size={15} className={todas ? 'rotate-180' : ''} aria-hidden="true" />
            </button>
          )}
        </>
      )}
    </section>
  );
}
