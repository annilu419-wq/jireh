'use client';

// Detalle de libro — rejilla de capítulos (pantalla secundaria: medición + checklist,
// sin revisor). Cada capítulo abre el LECTOR real con el texto completo
// (Reina-Valera 1909) en /app/biblia/<slug>/<capitulo>.

import { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, Compass } from 'lucide-react';
import { AppShell, TopBar } from '@/components/app/ui';
import { getLibro, sobreLibro } from '@/lib/biblia';
import { RACHA_ACTUAL } from '@/lib/contenido';

const MotionLink = motion.create(Link);

export default function LibroPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const libro = getLibro(slug);
  const reduce = useReducedMotion();

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
          {caps.map((n) => (
            <MotionLink
              key={n}
              href={`/app/biblia/${slug}/${n}`}
              whileTap={reduce ? undefined : { scale: 0.95 }}
              className="flex h-11 items-center justify-center rounded-[var(--radius-button)] border border-[color-mix(in_oklab,var(--text-tertiary)_18%,transparent)] bg-[var(--surface)] text-sm font-semibold tabular-nums text-[var(--text-secondary)] shadow-[var(--shadow-1)] transition-colors [touch-action:manipulation] hover:border-[color-mix(in_oklab,var(--accent)_40%,transparent)] hover:text-[var(--accent)]"
            >
              {n}
            </MotionLink>
          ))}
        </div>

        <p className="mt-3 text-xs text-[var(--text-tertiary)]">
          Texto completo · Reina-Valera 1909{libro.guiada ? ' · con la guía de Jireh en la Ruta' : ''}.
        </p>

        <Link
          href="/app/hoy"
          className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-[var(--radius-button)] border border-[color-mix(in_oklab,var(--accent)_45%,transparent)] bg-[var(--surface)] text-sm font-semibold text-[var(--accent)] shadow-[var(--shadow-card)] [touch-action:manipulation]"
        >
          Ir a mi Ruta de hoy
        </Link>
      </div>
    </AppShell>
  );
}
