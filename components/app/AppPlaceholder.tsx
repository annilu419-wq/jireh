'use client';

// Pantalla puente para las secciones de la app que aún no se construyen (Sesión 5
// entrega "Hoy"; el resto llega después). Mantiene el armazón real (TopBar + nav)
// para que la navegación completa se sienta viva desde ya — nunca un tap muerto.

import type { LucideIcon } from 'lucide-react';
import { AppShell, TopBar } from './ui';
import { RACHA_ACTUAL } from '@/lib/contenido';

export function AppPlaceholder({ icon: Icon, titulo, nota }: { icon: LucideIcon; titulo: string; nota: string }) {
  return (
    <AppShell>
      <TopBar streak={RACHA_ACTUAL} />
      <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 text-center">
        <span className="grid size-14 place-items-center rounded-2xl bg-[color-mix(in_oklab,var(--accent)_10%,transparent)]">
          <Icon size={26} color="var(--accent)" aria-hidden="true" />
        </span>
        <h1 className="text-xl font-bold [font-family:var(--font-display)]">{titulo}</h1>
        <p className="max-w-[30ch] text-sm leading-relaxed text-[var(--text-secondary)]">{nota}</p>
      </div>
    </AppShell>
  );
}
