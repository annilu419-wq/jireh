'use client';

// RUTA DESECHABLE — solo para screenshot del revisor. Renderiza la pantalla "Hoy"
// con la ficha enriquecida (Génesis 12: gancho + En el mapa + línea de la promesa +
// Para hoy) sin depender de sesión/Supabase. Borrar tras la revisión.

import { useState } from 'react';
import { AppShell, TopBar } from '@/components/app/ui';
import { ContextoFicha } from '@/components/app/ContextoFicha';
import { ParaTiHoy } from '@/components/app/ParaTiHoy';
import { RUTA_CAPITULOS, PARA_TI_HOY } from '@/lib/contenido';

export default function DevHoy() {
  const cap = RUTA_CAPITULOS[6]; // Génesis 12 — trae lineaPromesa
  const [revelado, setRevelado] = useState(false);

  return (
    <AppShell>
      <TopBar streak={3} />
      <div className="mt-2 px-4">
        <p className="text-sm text-[var(--text-secondary)]">Hoy</p>
      </div>
      <div className="mt-5">
        <ContextoFicha data={cap.ficha} ctaOculto={revelado} onVerEnsenanza={() => setRevelado(true)} />
      </div>
      <div className="mt-5">
        <ParaTiHoy data={PARA_TI_HOY} />
      </div>
    </AppShell>
  );
}
