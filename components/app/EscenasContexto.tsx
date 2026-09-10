// Librería CHICA de vignetas GENÉRICAS reutilizables para la Ficha de Contexto (Sesión 5-6).
// Decisión de costo (usuario, 2026-09-01): la ficha de CADA capítulo va dibujada en código
// (gratis, "solo datos") — NUNCA una escena bespoke por capítulo. Cada capítulo elige UNA de
// estas 6 por su campo `escena`. Solo las 66 PORTADAS DE LIBRO llevan imagen con IA.
//
// Estética "pincelada" (usuario, 2026-09-01) SIN costo: un filtro SVG único (feTurbulence +
// feDisplacementMap) da a cada trazo un borde orgánico de pincel, y un grano de papel sutil
// vende el "pintado a mano". Todo en el navegador, cero librerías, cero generación.
//
// 2026-09-10 (revisor): las 6 escenas RECOMPUESTAS al frame de 132 con línea de horizonte
// consistente (~y62), un elemento con figura/estructura para dar escala, y el fondo de mapa
// con más contraste. Antes 5 de 6 tenían coords del frame viejo (176) y se veían vacías.

import type { ReactNode } from 'react';

export type EscenaKey = 'agua' | 'monte' | 'camino' | 'ciudad' | 'desierto' | 'casa';

const TINTA = 'color-mix(in oklab, var(--text-tertiary) 70%, transparent)';
const SEPIA = 'color-mix(in oklab, var(--text-tertiary) 64%, transparent)';
const FOLLAJE = 'color-mix(in oklab, var(--accent) 13%, transparent)';

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
      <rect width="320" height="132" filter="url(#grano)" opacity="0.04" />
    </svg>
  );
}

/* ── Fondo tipo carta antigua CLARA para las escenas (usuario 2026-09-01):
   papel envejecido tenue + rosa de los vientos + sendero punteado + hito ✕ + gotas
   de tinta, en sepia a baja opacidad dentro del crema de FICHA-ARTE. Va DETRÁS.
   2026-09-10: más contraste (el revisor lo veía "crema plano") + brújula reubicada
   para que no se recorte. ── */
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
      <ellipse cx="40" cy="20" rx="70" ry="34" fill="color-mix(in oklab, var(--accent-2) 7%, transparent)" />
      <ellipse cx="300" cy="120" rx="90" ry="44" fill="color-mix(in oklab, var(--accent-2) 6%, transparent)" />
      <g filter="url(#pincel)" strokeLinecap="round" strokeLinejoin="round">
        {/* graticula tenue */}
        <g fill="none" stroke={SEPIA} strokeOpacity="0.2" strokeWidth="0.9">
          <path d="M-10 30 C80 18 160 40 330 24" />
          <path d="M-10 74 C80 62 160 86 330 68" />
          <path d="M60 -10 C50 50 66 96 58 142" />
          <path d="M230 -10 C220 50 236 96 228 142" />
        </g>
        {/* sendero punteado con hito ✕ */}
        <path d="M6 118 C60 96 70 118 120 100 C170 82 150 116 210 96" fill="none" stroke={SEPIA} strokeOpacity="0.34" strokeWidth="1.6" strokeDasharray="1 6" />
        <g stroke={SEPIA} strokeOpacity="0.38" strokeWidth="1.5">
          <path d="M14 110 l7 7 M21 110 l-7 7" />
        </g>
        {/* rosa de los vientos, arriba a la derecha (reubicada hacia dentro y abajo) */}
        <g transform="translate(262 42)" stroke={SEPIA} strokeOpacity="0.32" fill="none">
          <circle r="13" strokeWidth="0.9" />
          <circle r="7" strokeWidth="0.8" />
          <path d="M0 -18 L3 0 L0 18 L-3 0 Z" fill={SEPIA} fillOpacity="0.26" stroke="none" />
          <path d="M-18 0 L0 3 L18 0 L0 -3 Z" fill={SEPIA} fillOpacity="0.18" stroke="none" />
          <path d="M-11 -11 L2 -2 M11 -11 L-2 -2" strokeWidth="0.7" />
        </g>
        {/* gotas de tinta dispersas */}
        <g fill={SEPIA} fillOpacity="0.16">
          <circle cx="150" cy="24" r="2" /><circle cx="164" cy="30" r="1.2" />
          <circle cx="96" cy="52" r="1.5" /><circle cx="212" cy="60" r="1.8" />
          <circle cx="52" cy="86" r="1.4" /><circle cx="250" cy="96" r="1.3" />
        </g>
      </g>
      <rect width="320" height="132" filter="url(#grano)" opacity="0.04" />
    </svg>
  );
}

/* figura humana de espaldas — silueta simple, sin rostro (regla de arte del proyecto) */
function Figura({ x, y, h = 16 }: { x: number; y: number; h?: number }) {
  const r = h * 0.19;
  return (
    <>
      <circle cx={x} cy={y} r={r} />
      <path d={`M${x} ${y + r} q${-h * 0.28} ${h * 0.5} ${-h * 0.16} ${h} l${h * 0.32} 0 q${h * 0.12} ${-h * 0.5} ${-h * 0.16} ${-h} Z`} />
    </>
  );
}

const ESCENAS: Record<EscenaKey, () => ReactNode> = {
  // Marcos 4 — afinada y aprobada; el lavado azul deja ver el mapa de fondo.
  agua: () => (
    <>
      <path d="M0 44 C40 34 80 40 130 34 C180 28 220 38 270 32 C300 29 320 33 320 33 L320 48 L0 48 Z" fill={TINTA} fillOpacity="0.18" stroke="none" />
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

  // cordillera con un pico dominante + figura al pie para escala
  monte: () => (
    <>
      <path d="M0 132 L0 104 L54 58 L96 100 L150 44 L206 100 L252 66 L320 104 L320 132 Z" fill="var(--surface-2)" stroke="none" />
      <path d="M0 104 L54 58 L96 100 L150 44 L206 100 L252 66 L320 104" stroke={TINTA} strokeWidth="1.3" />
      <path d="M139 58 L150 44 L162 60 L154 55 L147 62 Z" fill={TINTA} fillOpacity="0.32" stroke="none" />
      <path d="M58 92 q14 -8 30 0 t28 0" stroke="var(--accent)" strokeOpacity="0.26" strokeWidth="1.1" fill="none" />
      <g fill={TINTA} fillOpacity="0.82" stroke="none">
        <Figura x={118} y={112} h={13} />
      </g>
    </>
  ),

  // camino que se aleja a un punto de fuga + dos figuras alejándose
  camino: () => (
    <>
      <path d="M0 132 L0 92 C80 84 160 90 320 82 L320 132 Z" fill="var(--surface-2)" stroke="none" />
      <path d="M0 92 C50 76 110 84 170 72 C230 60 285 70 320 66" stroke={TINTA} strokeWidth="1.3" />
      <path d="M0 78 C60 70 120 74 200 66 C260 60 300 64 320 62" stroke={TINTA} strokeOpacity="0.45" strokeWidth="1" />
      <path d="M126 132 L196 74" stroke={TINTA} strokeOpacity="0.5" strokeWidth="1.4" strokeDasharray="1 8" />
      <path d="M232 132 L204 74" stroke={TINTA} strokeOpacity="0.5" strokeWidth="1.4" strokeDasharray="1 8" />
      <path d="M210 74 l0 -12" stroke={TINTA} strokeWidth="1.1" />
      <circle cx="210" cy="58" r="6" fill={FOLLAJE} stroke={TINTA} strokeWidth="1" />
      <g fill={TINTA} fillOpacity="0.82" stroke="none">
        <Figura x={176} y={94} h={15} />
        <Figura x={189} y={97} h={13} />
      </g>
    </>
  ),

  // horizonte de tejados + torre de Babel central, más alta y sin terminar
  ciudad: () => (
    <>
      <path d="M0 132 L0 108 L320 108 L320 132 Z" fill="var(--surface-2)" stroke="none" />
      <path d="M0 108 L0 92 L22 92 L22 78 L44 78 L44 96 L64 96 L64 84 L86 84 L86 108" stroke={TINTA} strokeWidth="1.2" fill="none" />
      <path d="M196 108 L196 88 L216 88 L216 100 L236 100 L236 82 L258 82 L258 108" stroke={TINTA} strokeWidth="1.2" fill="none" />
      <path d="M120 108 L120 40 L124 34 L156 34 L160 40 L160 108" stroke={TINTA} strokeWidth="1.4" fill="var(--surface)" />
      <path d="M120 62 L160 62 M120 82 L160 82" stroke={TINTA} strokeOpacity="0.5" strokeWidth="1" />
      <path d="M124 34 L138 22 L152 34" stroke={TINTA} strokeOpacity="0.6" strokeWidth="1.1" fill="none" strokeDasharray="1 5" />
      <path d="M132 34 L136 22 M148 34 L144 22" stroke={TINTA} strokeOpacity="0.42" strokeWidth="0.9" />
      <path d="M160 44 l14 -4" stroke="var(--accent)" strokeOpacity="0.3" strokeWidth="1.2" />
    </>
  ),

  // Génesis 12 — Abram y su familia caminan hacia una tierra que no conocen, sol bajo
  desierto: () => (
    <>
      <path d="M0 132 L0 66 C70 60 130 70 200 62 C260 56 300 64 320 60 L320 132 Z" fill="var(--surface-2)" stroke="none" />
      <path d="M0 66 C70 60 130 70 200 62 C260 56 300 64 320 60" stroke={TINTA} strokeWidth="1.3" />
      <path d="M0 88 C60 82 120 94 190 86 C250 79 300 90 320 84" stroke={TINTA} strokeOpacity="0.55" strokeWidth="1.1" />
      <path d="M0 110 C60 104 120 116 190 108 C250 101 300 112 320 106" stroke={TINTA} strokeOpacity="0.4" strokeWidth="1" />
      <circle cx="252" cy="42" r="11" fill="color-mix(in oklab, var(--text-tertiary) 14%, transparent)" stroke={SEPIA} strokeOpacity="0.5" strokeWidth="1.1" />
      <path d="M150 120 C176 106 204 94 232 78" stroke={TINTA} strokeOpacity="0.55" strokeWidth="1.3" strokeDasharray="1 7" />
      <g fill={TINTA} fillOpacity="0.85" stroke="none">
        {/* animal de carga */}
        <path d="M104 100 q6 -9 17 -6 q10 2 12 8 l-2 8 l-4 0 l-1 -5 l-15 0 l-1 5 l-4 0 Z" />
        <Figura x={136} y={84} h={18} />
        <Figura x={150} y={88} h={15} />
        <Figura x={161} y={92} h={12} />
      </g>
    </>
  ),

  // casa / tienda con un árbol — hogar, jardín, descanso
  casa: () => (
    <>
      <path d="M0 132 L0 104 C90 98 200 100 320 96 L320 132 Z" fill="var(--surface-2)" stroke="none" />
      <path d="M0 104 C90 98 200 100 320 96" stroke={TINTA} strokeWidth="1.2" />
      <path d="M96 104 L96 66 L134 44 L172 66 L172 104" stroke={TINTA} strokeWidth="1.3" fill="var(--surface)" />
      <path d="M96 66 L134 44 L172 66" stroke={TINTA} strokeWidth="1.3" fill="none" />
      <rect x="126" y="80" width="16" height="24" fill="var(--surface-2)" stroke={TINTA} strokeWidth="1" />
      <path d="M214 104 l0 -20" stroke={TINTA} strokeWidth="1.3" />
      <circle cx="214" cy="74" r="12" fill={FOLLAJE} stroke={TINTA} strokeWidth="1.1" />
      <path d="M134 104 C130 116 150 122 150 132" stroke={TINTA} strokeOpacity="0.4" strokeWidth="1.1" strokeDasharray="1 6" fill="none" />
    </>
  ),
};

export function EscenaContexto({ escena }: { escena: EscenaKey }) {
  const Render = ESCENAS[escena] ?? ESCENAS.camino;
  // La escena se dibuja SOBRE el fondo de mapa (carta antigua clara).
  return (
    <div className="relative [&>div>svg]:block [&>div>svg]:h-auto [&>div>svg]:w-full">
      <MapaFondo />
      <div className="relative">
        <Base>{Render()}</Base>
      </div>
    </div>
  );
}
