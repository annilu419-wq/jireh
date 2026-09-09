'use client';

// Dispositivo ownable de FICHA-ARTE (estilo B): la RUTA cronológica ilustrada.
// Sendero curvo con estaciones + pines + curvas de nivel + brújula. Se dibuja al
// entrar en viewport (strokeDashoffset) y cuenta "0 → 66 libros". No depende de
// la app interna: es una ilustración honesta del mecanismo, no una captura falsa.

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';

const ESTACIONES = [
  { x: 34, y: 250, label: 'Génesis' },
  { x: 120, y: 196, label: 'Éxodo' },
  { x: 78, y: 128, label: 'Salmos' },
  { x: 176, y: 96, label: 'Evangelios', hero: true },
  { x: 252, y: 150, label: 'Hechos' },
  { x: 300, y: 74, label: 'Apocalipsis' },
];

function useCountUp(target: number, run: boolean, ms = 900) {
  const [n, setN] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (!run) return;
    if (reduce) {
      setN(target);
      return;
    }
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / ms);
      setN(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target, ms, reduce]);
  return n;
}

export function RutaIllustration() {
  const ref = useRef<HTMLDivElement>(null);
  const enVista = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();
  const libros = useCountUp(66, enVista);

  // Trazado del sendero que une las estaciones (curva suave)
  const path =
    'M34 250 C70 224 96 210 120 196 C104 168 86 150 78 128 C112 108 148 100 176 96 C214 100 236 128 252 150 C276 128 292 100 300 74';

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden rounded-[var(--radius-card)] border border-[color-mix(in_oklab,var(--accent)_18%,transparent)] bg-[var(--surface)] shadow-[var(--shadow-2)]"
    >
      {/* halo de amanecer arriba */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-40"
        style={{
          background:
            'radial-gradient(320px 160px at 30% 0%, color-mix(in oklab, var(--accent) 16%, transparent), transparent 70%), radial-gradient(280px 150px at 100% 6%, color-mix(in oklab, var(--accent-2) 12%, transparent), transparent 70%)',
        }}
      />

      <svg viewBox="0 0 340 290" className="relative w-full" role="img" aria-label="La Ruta: un camino por toda la Biblia, de Génesis a Apocalipsis">
        {/* curvas de nivel de fondo (textura de mapa) */}
        <g fill="none" stroke="var(--accent)" strokeOpacity="0.08" strokeWidth="1.4">
          <path d="M-10 60 C60 30 120 78 200 50 C260 28 300 62 350 44" />
          <path d="M-10 120 C50 96 130 138 210 112 C270 92 320 124 350 108" />
          <path d="M-10 200 C70 176 150 214 220 188 C300 160 330 196 350 184" />
          <path d="M-10 258 C60 240 150 270 230 250 C300 232 330 258 350 250" />
        </g>

        {/* sendero: base + trazo animado */}
        <path d={path} fill="none" stroke="color-mix(in oklab, var(--text-tertiary) 34%, transparent)" strokeWidth="3" strokeLinecap="round" strokeDasharray="1 8" />
        <motion.path
          d={path}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="3.5"
          strokeLinecap="round"
          initial={{ pathLength: reduce ? 1 : 0 }}
          animate={{ pathLength: enVista ? 1 : reduce ? 1 : 0 }}
          transition={{ duration: reduce ? 0 : 1.1, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* estaciones */}
        {ESTACIONES.map((e, i) => (
          <motion.g
            key={e.label}
            initial={{ opacity: reduce ? 1 : 0, scale: reduce ? 1 : 0.6 }}
            animate={{ opacity: enVista ? 1 : reduce ? 1 : 0, scale: enVista ? 1 : reduce ? 1 : 0.6 }}
            transition={{ delay: reduce ? 0 : 0.5 + i * 0.13, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {e.hero && <circle cx={e.x} cy={e.y} r="12" fill="color-mix(in oklab, var(--accent) 16%, transparent)" />}
            <circle
              cx={e.x}
              cy={e.y}
              r={e.hero ? 6 : 4.5}
              fill={e.hero ? 'var(--accent)' : 'var(--surface)'}
              stroke="var(--accent)"
              strokeWidth={e.hero ? 0 : 2.5}
            />
            <text
              x={e.x}
              y={e.y - (e.hero ? 18 : 12)}
              textAnchor="middle"
              className="[font-family:var(--font-body)]"
              fontSize={e.hero ? 12 : 10}
              fontWeight={e.hero ? 700 : 600}
              fill={e.hero ? 'var(--accent)' : 'var(--text-secondary)'}
            >
              {e.label}
            </text>
          </motion.g>
        ))}

        {/* brújula, esquina */}
        <g transform="translate(310 258)" opacity="0.9">
          <path d="M0 -13 L4 6 L0 3 L-4 6 Z" fill="var(--accent-2)" />
          <path d="M13 0 L-6 4 L-3 0 L-6 -4 Z M-13 0 L6 4 L3 0 L6 -4 Z M0 13 L4 -6 L0 -3 L-4 -6 Z" fill="var(--accent)" />
          <circle cx="0" cy="0" r="1.6" fill="var(--surface)" />
        </g>
      </svg>

      {/* pie: dato héroe con conteo animado */}
      <div className="flex items-center justify-between gap-3 border-t border-[color-mix(in_oklab,var(--text-tertiary)_18%,transparent)] px-6 py-4">
        <p className="text-sm font-medium text-[var(--text-secondary)]">Tu Ruta por toda la Biblia</p>
        <p className="text-base font-bold tabular-nums text-[var(--accent)]">
          {libros} <span className="text-xs font-medium text-[var(--text-secondary)]">libros, en orden</span>
        </p>
      </div>
    </div>
  );
}
