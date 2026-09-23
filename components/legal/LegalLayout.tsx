// Layout compartido de las 4 páginas legales (Sesión 6, archivo 47). Mismo
// tratamiento tipográfico y de marca que el resto de la app — nunca un
// documento "aparte" sin identidad.

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { JirehMark } from '@/components/landing/Logo';

export function LegalLayout({
  titulo,
  actualizado,
  children,
}: {
  titulo: string;
  actualizado: string;
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto flex min-h-dvh max-w-2xl flex-col px-5 pb-16 pt-6 sm:px-8">
      <div className="flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-2 text-[15px] font-semibold text-[var(--text-primary)] [touch-action:manipulation]">
          <JirehMark className="size-6" />
          Jireh
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--text-secondary)] [touch-action:manipulation]"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Volver
        </Link>
      </div>

      <h1 className="mt-8 text-[28px] font-bold leading-tight tracking-[-0.02em] [font-family:var(--font-display)] text-[var(--text-primary)]">
        {titulo}
      </h1>
      <p className="mt-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--text-tertiary)]">
        Última actualización: {actualizado}
      </p>

      <span aria-hidden="true" className="mt-6 block h-px w-full" style={{ background: 'var(--hairline)' }} />

      <div className="legal-prose mt-6 flex-1 text-[15px] leading-relaxed text-[var(--text-secondary)]">
        {children}
      </div>

      <span aria-hidden="true" className="mt-10 block h-px w-full" style={{ background: 'var(--hairline)' }} />
      <p className="mt-6 text-sm text-[var(--text-tertiary)]">
        ¿Preguntas sobre esta página? Escríbenos a{' '}
        <a href="mailto:hola@jireh.app" className="font-semibold text-[var(--accent)] underline-offset-2 hover:underline">
          hola@jireh.app
        </a>
        .
      </p>
    </main>
  );
}

export function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-8 text-lg font-bold leading-snug [font-family:var(--font-display)] text-[var(--text-primary)] first:mt-0">
      {children}
    </h2>
  );
}

export function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-3">{children}</p>;
}

export function Ul({ children }: { children: React.ReactNode }) {
  return <ul className="mt-3 list-disc space-y-1.5 pl-5">{children}</ul>;
}
