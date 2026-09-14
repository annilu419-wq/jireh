// Página puente temporal. Se reemplaza por la pantalla/contenido real en su sesión.

export function Placeholder({ titulo, nota }: { titulo: string; nota: string }) {
  return (
    <main className="mx-auto flex min-h-dvh max-w-lg flex-col items-center justify-center gap-4 px-6 text-center">
      <a href="/" className="flex items-center gap-2 text-base font-semibold text-[var(--text-primary)]">
        <span aria-hidden="true" className="size-6 rounded-lg bg-[var(--accent)]" />
        Jireh
      </a>
      <h1 className="text-2xl font-bold leading-tight [font-family:var(--font-display)] text-[var(--text-primary)]">
        {titulo}
      </h1>
      <p className="text-base leading-relaxed text-[var(--text-secondary)]">{nota}</p>
      <a
        href="/"
        className="mt-2 inline-flex h-12 items-center justify-center rounded-[var(--radius-button)] border border-[color-mix(in_oklab,var(--accent)_40%,transparent)] px-6 text-sm font-semibold text-[var(--accent)]"
      >
        Volver al inicio
      </a>
    </main>
  );
}
