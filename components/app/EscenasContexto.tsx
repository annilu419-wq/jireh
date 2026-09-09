// Librería CHICA de vignetas GENÉRICAS reutilizables para la Ficha de Contexto (Sesión 5).
// Decisión de costo (usuario, 2026-09-01): la ficha de CADA capítulo va dibujada en código
// (gratis, "solo datos") — NUNCA una escena bespoke por capítulo. Cada capítulo elige UNA de
// estas 6 por su campo `escena`. Solo las 66 PORTADAS DE LIBRO llevan imagen con IA.
//
// Estética "pincelada" (usuario, 2026-09-01) SIN costo: un filtro SVG único (feTurbulence +
// feDisplacementMap) da a cada trazo un borde orgánico de pincel, y un grano de papel sutil
// vende el "pintado a mano". Todo en el navegador, cero librerías, cero generación.

import type { ReactNode } from 'react';

export type EscenaKey = 'agua' | 'monte' | 'camino' | 'ciudad' | 'desierto' | 'casa';

const TINTA = 'color-mix(in oklab, var(--text-tertiary) 55%, transparent)';
const SEPIA = 'color-mix(in oklab, var(--text-tertiary) 62%, transparent)';

/* Filtro de pincel + grano — se declara una vez por SVG (ids iguales, gana el primero). */
function DefsPincel() {
  return (
    <defs>
      <filter id="pincel" x="-12%" y="-12%" width="124%" height="124%">
        <feTurbulence type="fractalNoise" baseFrequency="0.013" numOctaves="2" seed="7" result="n" />
        <feDisplacementMap in="SourceGraphic" in2="n" scale="1.5" xChannelSelector="R" yChannelSelector="G" />
      </filter>
      <filter id="grano">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" result="g" />
        <feColorMatrix in="g" type="matrix" values="0 0 0 0 0.43  0 0 0 0 0.4  0 0 0 0 0.35  0 0 0 0.5 0" />
      </filter>
    </defs>
  );
}

// Frame 320×132: la escena no domina con aire muerto.
function Base({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 320 132" fill="none" role="img" aria-hidden="true">
      <DefsPincel />
      <g filter="url(#pincel)" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </g>
      <rect width="320" height="132" filter="url(#grano)" opacity="0.035" />
    </svg>
  );
}

/* ── Fondo tipo carta antigua CLARA para las escenas (usuario 2026-09-01):
   papel envejecido tenue + rosa de los vientos + sendero punteado + hito ✕ + gotas
   de tinta, en sepia a baja opacidad dentro del crema de FICHA-ARTE. Va DETRÁS. ── */
export function MapaFondo() {
  return (
    <svg
      viewBox="0 0 320 132"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <DefsPincel />
      <rect width="320" height="132" fill="var(--surface-2)" />
      <ellipse cx="40" cy="20" rx="70" ry="34" fill="color-mix(in oklab, var(--accent-2) 6%, transparent)" />
      <ellipse cx="300" cy="120" rx="90" ry="44" fill="color-mix(in oklab, var(--accent-2) 5%, transparent)" />
      <g filter="url(#pincel)" strokeLinecap="round" strokeLinejoin="round">
        {/* graticula tenue */}
        <g fill="none" stroke={SEPIA} strokeOpacity="0.12" strokeWidth="0.9">
          <path d="M-10 30 C80 18 160 40 330 24" />
          <path d="M-10 74 C80 62 160 86 330 68" />
          <path d="M60 -10 C50 50 66 96 58 142" />
          <path d="M230 -10 C220 50 236 96 228 142" />
        </g>
        {/* sendero punteado con hito ✕ */}
        <path d="M6 118 C60 96 70 118 120 100 C170 82 150 116 210 96" fill="none" stroke={SEPIA} strokeOpacity="0.26" strokeWidth="1.5" strokeDasharray="1 6" />
        <g stroke={SEPIA} strokeOpacity="0.3" strokeWidth="1.4">
          <path d="M14 110 l7 7 M21 110 l-7 7" />
        </g>
        {/* rosa de los vientos, arriba a la derecha */}
        <g transform="translate(280 26)" stroke={SEPIA} strokeOpacity="0.24" fill="none">
          <circle r="15" strokeWidth="0.9" />
          <circle r="8" strokeWidth="0.8" />
          <path d="M0 -20 L3 0 L0 20 L-3 0 Z" fill={SEPIA} fillOpacity="0.2" stroke="none" />
          <path d="M-20 0 L0 3 L20 0 L0 -3 Z" fill={SEPIA} fillOpacity="0.14" stroke="none" />
          <path d="M-13 -13 L2 -2 M13 -13 L-2 -2" strokeWidth="0.7" />
        </g>
        {/* gotas de tinta dispersas */}
        <g fill={SEPIA} fillOpacity="0.12">
          <circle cx="150" cy="24" r="2" /><circle cx="164" cy="30" r="1.2" />
          <circle cx="96" cy="52" r="1.5" /><circle cx="212" cy="60" r="1.8" />
          <circle cx="52" cy="86" r="1.4" /><circle cx="250" cy="96" r="1.3" />
        </g>
      </g>
      <rect width="320" height="132" filter="url(#grano)" opacity="0.035" />
    </svg>
  );
}

// NOTA: solo 'agua' está afinada al frame de 132 (la usa Marcos 4). monte/camino/
// ciudad/desierto/casa todavía tienen coords del frame viejo (176) y se re-afinan
// cuando un capítulo del lote de lanzamiento las use por primera vez.
const ESCENAS: Record<EscenaKey, () => ReactNode> = {
  agua: () => (
    <>
      <path d="M0 44 C40 34 80 40 130 34 C180 28 220 38 270 32 C300 29 320 33 320 33 L320 48 L0 48 Z" fill={TINTA} fillOpacity="0.18" stroke="none" />
      {/* agua — lavado azul translúcido para que el mapa de fondo se lea a través */}
      <path d="M0 132 L0 48 C60 38 110 54 170 46 C230 38 280 52 320 44 L320 132 Z" fill="color-mix(in oklab, var(--accent) 12%, transparent)" stroke="none" />
      <path d="M0 48 C60 38 110 54 170 46 C230 38 280 52 320 44" stroke={TINTA} strokeWidth="1.3" />
      <g stroke="var(--accent)" strokeOpacity="0.28" strokeWidth="1">
        <path d="M40 80 q12 -5 24 0 t24 0 t24 0" />
        <path d="M196 92 q12 -5 24 0 t24 0" />
        <path d="M56 112 q12 -5 24 0 t24 0 t24 0" />
      </g>
      <g transform="translate(158 58)">
        <path d="M-22 8 Q0 22 22 8 L15 -1 L-15 -1 Z" fill="var(--surface)" stroke={TINTA} strokeWidth="1.3" />
        <path d="M0 -1 L0 -14" stroke={TINTA} strokeWidth="1.3" />
        <circle cx="0" cy="-10" r="3.2" fill="var(--accent)" stroke="none" />
      </g>
      <g fill={TINTA} fillOpacity="0.5" stroke="none">
        <circle cx="54" cy="34" r="2.4" /><circle cx="66" cy="38" r="2.4" /><circle cx="78" cy="33" r="2.4" /><circle cx="90" cy="38" r="2.4" /><circle cx="102" cy="34" r="2.4" />
        <circle cx="238" cy="32" r="2.4" /><circle cx="250" cy="36" r="2.4" /><circle cx="262" cy="32" r="2.4" />
      </g>
    </>
  ),
  monte: () => (
    <>
      <path d="M0 176 L0 108 L60 60 L110 108 L160 70 L210 108 L260 68 L320 108 L320 176 Z" fill="var(--surface-2)" stroke="none" />
      <path d="M0 108 L60 60 L110 108 L160 70 L210 108 L260 68 L320 108" stroke={TINTA} strokeWidth="1.3" />
      <g stroke="var(--accent)" strokeOpacity="0.32" strokeWidth="1.2">
        <path d="M40 120 q40 -30 80 0" /><path d="M180 122 q40 -26 80 0" />
      </g>
      <g fill={TINTA} fillOpacity="0.4" stroke="none">
        <circle cx="150" cy="128" r="2.6" /><circle cx="162" cy="130" r="2.6" /><circle cx="174" cy="127" r="2.6" />
      </g>
    </>
  ),
  camino: () => (
    <>
      <path d="M40 176 C90 120 130 96 170 60 C200 34 230 20 300 8" stroke={TINTA} strokeWidth="1.6" strokeDasharray="1 9" />
      <g stroke="var(--accent)" strokeOpacity="0.35" strokeWidth="1">
        <path d="M0 150 q160 -20 320 -40" /><path d="M0 110 q160 -14 320 -30" />
      </g>
      <g fill={TINTA} fillOpacity="0.5" stroke="none">
        <circle cx="70" cy="150" r="2.8" /><circle cx="150" cy="108" r="2.8" /><circle cx="230" cy="60" r="2.8" />
      </g>
      <circle cx="300" cy="8" r="4.5" fill="var(--accent)" stroke="none" />
    </>
  ),
  ciudad: () => (
    <>
      <path d="M0 176 L0 120 L20 120 L20 96 L44 96 L44 120 L70 120 L70 84 L98 84 L98 120 L130 120 L130 100 L160 100 L160 120 L190 120 L190 90 L214 90 L214 120 L250 120 L250 108 L280 108 L280 120 L320 120 L320 176 Z" fill="var(--surface-2)" stroke="none" />
      <path d="M0 120 L20 120 L20 96 L44 96 L44 120 L70 120 L70 84 L98 84 L98 120 L130 120 L130 100 L160 100 L160 120 L190 120 L190 90 L214 90 L214 120 L250 120 L250 108 L280 108 L280 120 L320 120" stroke={TINTA} strokeWidth="1.3" />
      <g stroke="var(--accent)" strokeOpacity="0.32" strokeWidth="1">
        <path d="M60 74 l10 -14 l10 14" /><path d="M200 80 l9 -12 l9 12" />
      </g>
    </>
  ),
  desierto: () => (
    <>
      <path d="M0 176 L0 130 C60 118 110 140 170 126 C230 112 280 132 320 122 L320 176 Z" fill="var(--surface-2)" stroke="none" />
      <path d="M0 130 C60 118 110 140 170 126 C230 112 280 132 320 122" stroke={TINTA} strokeWidth="1.3" />
      <path d="M0 152 C60 142 110 160 170 150 C230 138 280 156 320 148" stroke={TINTA} strokeOpacity="0.5" strokeWidth="1" />
      <circle cx="252" cy="52" r="18" fill="none" stroke="var(--accent-2)" strokeOpacity="0.5" strokeWidth="1.2" />
    </>
  ),
  casa: () => (
    <>
      <path d="M40 176 L40 108 L100 68 L160 108 L160 176 Z" fill="var(--surface-2)" stroke="none" />
      <path d="M40 108 L100 68 L160 108 M40 108 L40 176 M160 108 L160 176" stroke={TINTA} strokeWidth="1.3" />
      <rect x="90" y="132" width="22" height="44" fill="var(--surface)" stroke={TINTA} strokeWidth="1" />
      <g stroke="var(--accent)" strokeOpacity="0.32" strokeWidth="1">
        <path d="M180 176 q6 -6 12 0 t12 0 t12 0" /><path d="M0 168 q6 -6 12 0 t12 0" />
      </g>
    </>
  ),
};

export function EscenaContexto({ escena }: { escena: EscenaKey }) {
  const Render = ESCENAS[escena] ?? ESCENAS.camino;
  // La escena se dibuja SOBRE el fondo de mapa (carta antigua clara).
  return (
    <div className="relative [&>div>svg]:block [&>div>svg]:w-full [&>div>svg]:h-auto">
      <MapaFondo />
      <div className="relative">
        <Base>{Render()}</Base>
      </div>
    </div>
  );
}
