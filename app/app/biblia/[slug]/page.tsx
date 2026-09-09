'use client';

// Detalle de libro — rejilla de capítulos (pantalla secundaria: medición + checklist,
// sin revisor). El TEXTO/audio de la Biblia llega en la Sesión 6; por ahora solo el
// capítulo de muestra (Marcos 4) abre la vista guiada — el resto avisa "muy pronto"
// sin dejar taps muertos.

import { use, useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ArrowLeft, Compass } from 'lucide-react';
import { AppShell, TopBar } from '@/components/app/ui';
import { getLibro, sobreLibro } from '@/lib/biblia';
import { RACHA_ACTUAL } from '@/lib/contenido';

// único capítulo con capa guiada ya producida (seed)
const MUESTRA = { slug: 'marcos', capitulo: 4 };

export default function LibroPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const libro = getLibro(slug);
  const reduce = useReducedMotion();
  const [aviso, setAviso] = useState<number | null>(null);

  if (!libro) notFound();

  const testamento = libro.testamento === 'AT' ? 'Antiguo Testamento' : 'Nuevo Testamento';
  const caps = Array.from({ length: libro.capitulos }, (_, i) => i + 1);

  return (
    <AppShell>
      <TopBar streak={RACHA_ACTUAL} />

      <div className="px-4 pt-3">
        <Link href="/app/biblia" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--text-secondary)] [touch-action:manipulation]">
          <ArrowLeft size={16} aria-hidden="true" />
          Biblia
        </Link>
      </div>

      <div className="mt-3 px-4">
        <div className="flex items-center gap-2">
          <h1 className="text-[26px] font-bold leading-tight tracking-[-0.02em] [font-family:var(--font-display)]">{libro.nombre}</h1>
          {libro.guiada && (
            <span className="inline-flex items-center gap-1 rounded-full bg-[color-mix(in_oklab,var(--accent)_12%,transparent)] px-2 py-0.5 text-[10px] font-bold text-[var(--accent)]">
              <Compass size={10} aria-hidden="true" />
              Guía
            </span>
          )}
        </div>
        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--text-tertiary)]">
          {testamento} · {libro.division}
        </p>
        <p className="mt-2.5 text-[15px] leading-relaxed text-[var(--text-secondary)]">{sobreLibro(libro)}</p>
      </div>

      <div className="mt-5 flex flex-1 flex-col px-4 pb-4">
        <p className="text-xs font-bold uppercase tracking-[0.1em] text-[var(--text-tertiary)]">Capítulos</p>
        <span aria-hidden="true" className="mt-2 block h-px w-full" style={{ background: 'var(--hairline)' }} />

        <div className="mt-3 grid grid-cols-5 gap-2 sm:grid-cols-6">
          {caps.map((n) => {
            const esMuestra = libro.slug === MUESTRA.slug && n === MUESTRA.capitulo;
            const base =
              'flex h-11 items-center justify-center rounded-[var(--radius-button)] text-sm font-semibold tabular-nums [touch-action:manipulation] transition-colors';
            if (esMuestra) {
              return (
                <Link
                  key={n}
                  href="/app/hoy"
                  className={`${base} bg-[var(--accent)] text-[var(--bg)] shadow-[0_6px_16px_-4px_color-mix(in_oklab,var(--accent)_45%,transparent)]`}
                >
                  {n}
                </Link>
              );
            }
            return (
              <motion.button
                key={n}
                type="button"
                whileTap={reduce ? undefined : { scale: 0.95 }}
                onClick={() => setAviso(n)}
                className={`${base} border border-[color-mix(in_oklab,var(--text-tertiary)_18%,transparent)] bg-[var(--surface)] text-[var(--text-secondary)] shadow-[var(--shadow-1)]`}
              >
                {n}
              </motion.button>
            );
          })}
        </div>

        <p className="mt-3 text-xs text-[var(--text-tertiary)]">
          {libro.slug === MUESTRA.slug
            ? `El capítulo ${MUESTRA.capitulo} ya tiene la guía completa. El resto llega muy pronto.`
            : 'El texto y el audio de este libro se activan muy pronto. Mientras tanto, sigue tu Ruta.'}
        </p>

        <Link
          href="/app/hoy"
          className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-[var(--radius-button)] border border-[color-mix(in_oklab,var(--accent)_45%,transparent)] bg-[var(--surface)] text-sm font-semibold text-[var(--accent)] shadow-[var(--shadow-card)] [touch-action:manipulation]"
        >
          Ir a mi Ruta de hoy
        </Link>
      </div>

      {/* aviso "muy pronto" al tocar un capítulo sin guía — cero taps muertos */}
      <AnimatePresence>
        {aviso !== null && (
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduce ? 0 : 16 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            role="status"
            onClick={() => setAviso(null)}
            className="fixed inset-x-0 bottom-[calc(64px+env(safe-area-inset-bottom)+12px)] z-40 mx-auto flex w-[calc(100%-32px)] max-w-[368px] items-center justify-between gap-3 rounded-[var(--radius-button)] bg-[var(--text-primary)] px-4 py-3 text-sm text-[var(--bg)] shadow-[0_10px_30px_color-mix(in_oklab,var(--text-primary)_35%,transparent)]"
          >
            <span className="min-w-0">{libro.nombre} {aviso} llega muy pronto</span>
            <span className="shrink-0 font-bold text-[color-mix(in_oklab,var(--accent)_45%,white)]">Entendido</span>
          </motion.div>
        )}
      </AnimatePresence>
    </AppShell>
  );
}
