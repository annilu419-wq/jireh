'use client';

// Lector de capítulo — el texto bíblico completo (Reina-Valera 1909, dominio
// público, importado con scripts/importar-biblia.mjs a public/biblia/<slug>.json).
// Primera pantalla de tipo "lector de texto" → lleva revisor-visual.
// Tipografía serif de FICHA-ARTE para el texto; número de versículo en el acento.

import { use, useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, ChevronLeft, ChevronRight, RotateCw } from 'lucide-react';
import { AppShell, TopBar } from '@/components/app/ui';
import { getLibro } from '@/lib/biblia';
import { RACHA_ACTUAL } from '@/lib/contenido';

export default function CapituloPage({
  params,
}: {
  params: Promise<{ slug: string; capitulo: string }>;
}) {
  const { slug, capitulo } = use(params);
  const libro = getLibro(slug);
  const cap = Number(capitulo);
  const reduce = useReducedMotion();
  const [versos, setVersos] = useState<string[] | null>(null);
  const [estado, setEstado] = useState<'cargando' | 'ok' | 'error'>('cargando');

  const valido = !!libro && Number.isInteger(cap) && cap >= 1 && cap <= (libro?.capitulos ?? 0);

  const cargar = useCallback(() => {
    if (!valido) return;
    let vivo = true;
    setEstado('cargando');
    fetch(`/biblia/${slug}.json`)
      .then((r) => {
        if (!r.ok) throw new Error('fetch');
        return r.json();
      })
      .then((data: Record<string, string[]>) => {
        if (!vivo) return;
        const v = data[String(cap)];
        if (!v) throw new Error('sin capítulo');
        setVersos(v);
        setEstado('ok');
      })
      .catch(() => {
        if (vivo) setEstado('error');
      });
    return () => {
      vivo = false;
    };
  }, [slug, cap, valido]);

  useEffect(() => cargar(), [cargar]);

  if (!valido || !libro) notFound();

  const prev = cap > 1 ? cap - 1 : null;
  const next = cap < libro.capitulos ? cap + 1 : null;

  return (
    <AppShell>
      <TopBar streak={RACHA_ACTUAL} />

      <div className="px-4 pt-3">
        <Link
          href={`/app/biblia/${slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--text-secondary)] transition-transform [touch-action:manipulation] active:scale-[0.98]"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          {libro.nombre}
        </Link>
      </div>

      <header className="mt-3 px-4">
        <h1 className="text-[27px] font-bold leading-tight tracking-[-0.02em] [font-family:var(--font-display)]">
          {libro.nombre} {cap}
        </h1>
        <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--text-tertiary)]">
          Reina-Valera 1909
        </p>
        <span aria-hidden="true" className="mt-3 block h-px w-full" style={{ background: 'var(--hairline)' }} />
      </header>

      <div className="mt-4 flex flex-1 flex-col px-4 pb-4">
        {estado === 'cargando' && (
          <div className="space-y-3" aria-hidden="true">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="h-4 rounded bg-[color-mix(in_oklab,var(--text-tertiary)_12%,transparent)]"
                style={{ width: `${70 + ((i * 17) % 28)}%` }}
              />
            ))}
          </div>
        )}

        {estado === 'error' && (
          <div className="rounded-[var(--radius-card)] border border-[color-mix(in_oklab,var(--error)_35%,transparent)] bg-[color-mix(in_oklab,var(--error)_7%,var(--surface))] p-4">
            <p className="text-sm font-semibold text-[var(--text-primary)]">No pudimos cargar el capítulo</p>
            <p className="mt-0.5 text-xs text-[var(--text-secondary)]">Revisa tu conexión e inténtalo otra vez.</p>
            <button
              type="button"
              onClick={cargar}
              className="mt-2 inline-flex items-center gap-1.5 rounded-[var(--radius-button)] border border-[color-mix(in_oklab,var(--accent)_40%,transparent)] px-3 py-1.5 text-xs font-semibold text-[var(--accent)] [touch-action:manipulation]"
            >
              <RotateCw size={13} aria-hidden="true" />
              Reintentar
            </button>
          </div>
        )}

        {estado === 'ok' && versos && (
          <motion.ol
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-[17px] leading-[1.75] text-[var(--text-primary)] [font-family:var(--font-serif)]"
          >
            {versos.map((t, i) => (
              <li key={i} className="mt-2.5 first:mt-0">
                <span className="mr-1.5 align-[0.35em] text-[11px] font-bold tabular-nums text-[var(--accent)] [font-family:var(--font-body)]">
                  {i + 1}
                </span>
                {t}
              </li>
            ))}
          </motion.ol>
        )}

        <nav className="mt-8 flex items-center justify-between gap-3">
          {prev ? (
            <Link
              href={`/app/biblia/${slug}/${prev}`}
              className="inline-flex items-center gap-1 rounded-[var(--radius-button)] border border-[color-mix(in_oklab,var(--text-tertiary)_20%,transparent)] bg-[var(--surface)] px-3 py-2 text-sm font-semibold text-[var(--text-secondary)] shadow-[var(--shadow-1)] transition-transform [touch-action:manipulation] active:scale-[0.98]"
            >
              <ChevronLeft size={16} aria-hidden="true" />
              {libro.nombre} {prev}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/app/biblia/${slug}/${next}`}
              className="inline-flex items-center gap-1 rounded-[var(--radius-button)] border border-[color-mix(in_oklab,var(--accent)_40%,transparent)] bg-[var(--surface)] px-3 py-2 text-sm font-semibold text-[var(--accent)] shadow-[var(--shadow-card)] transition-transform [touch-action:manipulation] active:scale-[0.98]"
            >
              {libro.nombre} {next}
              <ChevronRight size={16} aria-hidden="true" />
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </div>
    </AppShell>
  );
}
