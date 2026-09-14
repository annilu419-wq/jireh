// Marca de Jireh — "La brújula guía" (FICHA-ARTE, concepto 2).
// Rosa de los vientos con anillo y facetas: la punta NORTE en ámbar rompe el
// anillo (= el punto de partida de la historia); las otras tres en azul (= la
// Ruta). Aguja sur + centro = la Y implícita. Dos colores, sin relleno de fondo.
// `mono` = un solo color para el footer (jerarquía terciaria, cero acento).

export function JirehMark({ className = 'size-6', mono = false }: { className?: string; mono?: boolean }) {
  const norte = mono ? 'var(--text-tertiary)' : 'var(--accent-2)';
  const ruta = mono ? 'var(--text-tertiary)' : 'var(--accent)';
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" fill="none">
      {/* anillo de la brújula */}
      <circle cx="32" cy="32" r="25.5" stroke={ruta} strokeOpacity="0.38" strokeWidth="1.6" />
      {/* marcas cardinales */}
      <g stroke={ruta} strokeOpacity="0.45" strokeWidth="1.6" strokeLinecap="round">
        <path d="M32 8.5v4M32 51.5v4M8.5 32h4M51.5 32h4" />
      </g>
      {/* rosa diagonal tenue (NE·SE·SW·NW) — le da cuerpo, no es un blob */}
      <g fill={ruta} fillOpacity="0.16">
        <path d="M32 32 46 18 34.5 29.5Z" />
        <path d="M32 32 46 46 29.5 34.5Z" />
        <path d="M32 32 18 46 29.5 34.5Z" />
        <path d="M32 32 18 18 34.5 29.5Z" />
      </g>
      {/* aguja NORTE — ámbar, rompe el anillo (el punto de partida) */}
      <path d="M32 3 35 30 32 32Z" fill={norte} />
      <path d="M32 3 29 30 32 32Z" fill={norte} fillOpacity="0.55" />
      {/* aguja SUR larga — azul (con el centro, la Y) */}
      <path d="M32 60 35 34 32 32Z" fill={ruta} />
      <path d="M32 60 29 34 32 32Z" fill={ruta} fillOpacity="0.55" />
      {/* este · oeste — azul */}
      <path d="M60 32 34 29 32 32Z" fill={ruta} />
      <path d="M60 32 34 35 32 32Z" fill={ruta} fillOpacity="0.55" />
      <path d="M4 32 30 29 32 32Z" fill={ruta} />
      <path d="M4 32 30 35 32 32Z" fill={ruta} fillOpacity="0.55" />
      {/* eje central */}
      <circle cx="32" cy="32" r="3.6" fill={ruta} />
      <circle cx="32" cy="32" r="1.5" fill="var(--bg)" />
    </svg>
  );
}
