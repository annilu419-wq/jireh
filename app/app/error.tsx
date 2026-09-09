'use client';

// Error boundary de la app interna (UX rule 18: la app NUNCA muestra pantalla blanca).
// Mensaje humano + acción para reintentar. Se activa si cualquier pantalla de /app falla.

import { useEffect } from 'react';
import { RotateCw } from 'lucide-react';
import { AppShell, TopBar } from '@/components/app/ui';

export default function AppError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // en producción esto iría a un logger; por ahora, consola.
    console.error(error);
  }, [error]);

  return (
    <AppShell>
      <TopBar />
      <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
        <h1 className="text-xl font-bold [font-family:var(--font-display)]">Algo se interpuso</h1>
        <p className="max-w-[30ch] text-sm leading-relaxed text-[var(--text-secondary)]">
          No pudimos cargar esta parte. Tu progreso está a salvo. Vuelve a intentar.
        </p>
        <button
          type="button"
          onClick={reset}
          className="inline-flex h-12 items-center gap-2 rounded-[var(--radius-button)] bg-[var(--accent)] px-6 text-sm font-semibold text-[var(--bg)] [touch-action:manipulation]"
        >
          <RotateCw size={16} aria-hidden="true" />
          Reintentar
        </button>
      </div>
    </AppShell>
  );
}
