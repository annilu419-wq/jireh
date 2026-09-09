'use client';

// "La Ruta" — el dispositivo ownable de FICHA-ARTE (sendero curvo + estaciones +
// pin "aquí estás" + curvas de nivel). Es el OBJETO PRINCIPAL de la pantalla Biblia:
// el recorrido cronológico que se ilumina a medida que avanzas. Azul = la Ruta/acción;
// ámbar = el progreso/logro (%). Motion: la línea se dibuja, el % cuenta.

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { RUTA } from '@/lib/biblia';

const MotionLink = motion.create(Link);

const TRAZO = 'M8 78 C40 40 66 40 96 58 C128 78 150 96 184 78 C220 58 250 30 292 40';
// puntos aproximados sobre la curva para las estaciones (x,y)
const PUNTOS = [
  [8, 78], [58, 45], [96, 58], [140, 90], [184, 78], [226, 52], [262, 33], [292, 40],
] as const;

export function RutaCard() {
  const reduce = useReducedMotion();
  const total = RUTA.estaciones.length;
  const hechas = RUTA.estaciones.filter((e) => e.hecha).length;
  const dibujo = Math.max(0.06, Math.min(1, hechas / (total - 1)));

  const [pct, setPct] = useState(reduce ? RUTA.progreso : 0);
  const raf = useRef(0);
  useEffect(() => {
    if (reduce) return;
    let t0 = 0;
    const tick = (t: number) => {
      if (!t0) t0 = t;
      const p = Math.min(1, (t - t0) / 900);
      setPct(Math.round(RUTA.progreso * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [reduce]);

  return (
    <motion.section
      initial={{ opacity: 0, y: reduce ? 0 : 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="mx-4 overflow-hidden rounded-[var(--radius-card)] border border-[color-mix(in_oklab,var(--accent)_18%,transparent)] bg-[var(--surface)] shadow-[var(--shadow-card)]"
    >
      <div className="flex items-center justify-between px-4 pt-4">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--accent)]">Tu recorrido</p>
        <p className="text-xs font-semibold tabular-nums text-[color-mix(in_oklab,var(--accent-2)_70%,black)]">
          {pct}% de la Ruta
        </p>
      </div>

      {/* mini-mapa: curvas de nivel + sendero que se ilumina + pin "aquí estás" */}
      <div className="relative mt-2 px-4">
        <svg viewBox="0 0 300 108" className="w-full" aria-hidden="true">
          <defs>
            <linearGradient id="ruta-cielo" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="color-mix(in oklab, var(--accent-2) 10%, transparent)" />
              <stop offset="1" stopColor="transparent" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="300" height="108" fill="url(#ruta-cielo)" />
          {/* curvas de nivel muy tenues */}
          {[26, 52, 78].map((y) => (
            <path
              key={y}
              d={`M-10 ${y} C60 ${y - 12} 140 ${y + 10} 310 ${y - 6}`}
              fill="none"
              stroke="color-mix(in oklab, var(--text-tertiary) 14%, transparent)"
              strokeWidth="1"
            />
          ))}
          {/* sendero base (punteado) */}
          <path d={TRAZO} fill="none" stroke="color-mix(in oklab, var(--text-tertiary) 34%, transparent)" strokeWidth="2.4" strokeLinecap="round" strokeDasharray="1 8" />
          {/* sendero recorrido (sólido, azul) */}
          <motion.path
            d={TRAZO}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: reduce ? dibujo : 0 }}
            animate={{ pathLength: dibujo }}
            transition={{ duration: reduce ? 0 : 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          />
          {/* estaciones */}
          {PUNTOS.map(([x, y], i) => {
            const est = RUTA.estaciones[i];
            const aqui = est && !est.hecha && RUTA.estaciones[i - 1]?.hecha;
            if (aqui) {
              return (
                <g key={i}>
                  <motion.circle
                    cx={x} cy={y} r="9"
                    fill="none" stroke="var(--accent)" strokeWidth="2"
                    initial={{ opacity: reduce ? 0.5 : 0, scale: reduce ? 1 : 0.4 }}
                    animate={reduce ? { opacity: 0.5 } : { opacity: [0.5, 0, 0.5], scale: [0.6, 1.5, 0.6] }}
                    transition={reduce ? {} : { duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
                    style={{ transformOrigin: `${x}px ${y}px` }}
                  />
                  <circle cx={x} cy={y} r="4.5" fill="var(--accent)" stroke="var(--surface)" strokeWidth="2" />
                </g>
              );
            }
            return (
              <circle
                key={i}
                cx={x} cy={y} r={est?.hecha ? 3.4 : 2.6}
                fill={est?.hecha ? 'var(--accent-2)' : 'var(--surface)'}
                stroke={est?.hecha ? 'var(--surface)' : 'color-mix(in oklab, var(--text-tertiary) 45%, transparent)'}
                strokeWidth="1.6"
              />
            );
          })}
          {/* rótulos: extremos + "aquí" junto al pin (que no sea gráfico abstracto) */}
          <text x="8" y="98" fontSize="8" fontWeight="600" fill="color-mix(in oklab, var(--text-tertiary) 90%, transparent)">Génesis</text>
          <text x="292" y="98" fontSize="8" fontWeight="600" textAnchor="end" fill="color-mix(in oklab, var(--text-tertiary) 90%, transparent)">Apocalipsis</text>
          <text x="226" y="38" fontSize="8" fontWeight="700" textAnchor="middle" fill="var(--accent)">aquí</text>
        </svg>
      </div>

      <div className="px-4 pb-4 pt-1">
        <p className="text-[15px] font-semibold leading-snug">
          Vas por {RUTA.libroActual} {RUTA.capituloActual}
        </p>
        <p className="mt-0.5 text-[13px] leading-relaxed text-[var(--text-secondary)]">
          La Ruta ordena toda la Biblia de principio a fin. Retómala donde la dejaste.
        </p>
        <MotionLink
          href="/app/hoy"
          whileTap={{ scale: reduce ? 1 : 0.97 }}
          className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-[var(--radius-button)] bg-[var(--accent)] text-sm font-semibold text-[var(--bg)] shadow-[0_8px_22px_color-mix(in_oklab,var(--accent)_28%,transparent)] [touch-action:manipulation]"
        >
          Continuar en la Ruta
          <ArrowRight size={16} aria-hidden="true" />
        </MotionLink>
      </div>
    </motion.section>
  );
}
