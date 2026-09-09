'use client';

// KIT DE LANDING — §3 AGITACIÓN (blueprint: 55 §3)
// El costo de seguir igual, ESCANEABLE: cada punto es una fila con ícono-ancla y
// un dato-héroe opcional (la cifra de la pérdida, grande). NUNCA párrafos grises
// apilados. `puntos` es el contrato: {icon, textoMarked, dato?} — imposible pasar
// un muro de texto. Warn a las 18 palabras por punto. MISMO fondo elevado que §2
// (un solo movimiento visual). Cero decoración de miedo, cero rojo.

import { motion } from 'motion/react';
import type { LucideIcon } from 'lucide-react';
import { IconChip, Kicker, SectionShell, useReveal, VIEWPORT_ONCE } from './ui';
import { MarkedCopy, warnCopy, warnRango } from './MarkedCopy';

export interface AgitacionPunto {
  icon: LucideIcon;
  /** frase corta MARCADA (warn 18 palabras) — una idea */
  textoMarked: string;
  /** dato-héroe opcional: la cifra de la pérdida, se muestra grande (ej. "≈50 al año") */
  dato?: string;
}

export interface AgitacionProps {
  kicker?: string;
  titulo?: string;
  /** 2-4 puntos — el array es el contrato: nada de párrafos. */
  puntos: AgitacionPunto[];
  /** Mini-card opcional "hoy vs si nada cambia" (55 §3). */
  contraste?: {
    labelHoy: string;
    hoy: string;
    labelFuturo: string;
    futuro: string;
  };
  id?: string;
}

export function Agitacion({ kicker = 'EL COSTO DE SEGUIR IGUAL', titulo, puntos, contraste, id }: AgitacionProps) {
  warnRango('Agitación → puntos', puntos.length, 2, 4);
  puntos.forEach((p, i) => warnCopy(`Agitación → punto ${i + 1}`, p.textoMarked, 18));
  const { contenedor, item } = useReveal();

  return (
    <SectionShell id={id} elevacion="base" ariaLabel="El costo de seguir igual">
      <motion.div
        variants={contenedor}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
        className="mx-auto max-w-[620px]"
      >
        {(kicker || titulo) && (
          <motion.div variants={item} className="mb-6">
            {kicker && <Kicker>{kicker}</Kicker>}
            {titulo && (
              <h2 className="text-balance text-[26px] font-bold leading-[1.15] text-[var(--text-primary)] [font-family:var(--font-display)] md:text-[34px]">
                {titulo}
              </h2>
            )}
          </motion.div>
        )}

        <ul className="flex flex-col gap-3">
          {puntos.map((p, i) => (
            <motion.li
              key={i}
              variants={item}
              className="flex items-start gap-4 rounded-[var(--radius-card)] bg-[var(--surface)] p-4 shadow-[var(--shadow-1)]"
            >
              <IconChip icon={p.icon} tone="muted" />
              <div className="min-w-0">
                {p.dato && (
                  <p className="text-[22px] font-bold leading-none tracking-[-0.01em] tabular-nums text-[var(--accent)] [font-family:var(--font-display)]">
                    {p.dato}
                  </p>
                )}
                <p className={`text-[15px] leading-snug text-[var(--text-primary)] ${p.dato ? 'mt-1.5' : ''}`}>
                  <MarkedCopy text={p.textoMarked} />
                </p>
              </div>
            </motion.li>
          ))}
        </ul>

        {contraste && (
          <motion.div variants={item} className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-[var(--radius-card)] bg-[var(--surface-2)] p-5">
              <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--text-tertiary)]">
                {contraste.labelHoy}
              </p>
              <p className="mt-2 text-[15px] leading-snug text-[var(--text-primary)]">{contraste.hoy}</p>
            </div>
            <div className="rounded-[var(--radius-card)] bg-[var(--surface-2)] p-5">
              <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--text-tertiary)]">
                {contraste.labelFuturo}
              </p>
              <p className="mt-2 text-[15px] leading-snug text-[var(--text-secondary)]">{contraste.futuro}</p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </SectionShell>
  );
}
