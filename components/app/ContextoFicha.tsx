'use client';

// Ficha de contexto — el objeto principal de la pantalla "Hoy" (Sesión 5).
// 30 segundos de contexto ANTES de leer: autor · época · lugar · qué pasa aquí ·
// dónde vas en la Ruta. La escena va dibujada en código (EscenaContexto), NUNCA
// imagen de IA por capítulo (decisión de costo del usuario). Blueprint: 53.

import { motion, useReducedMotion } from 'motion/react';
import { Play } from 'lucide-react';
import { EscenaContexto, type EscenaKey } from './EscenasContexto';
import { LineaPromesa, type NodoPromesa } from './LineaPromesa';
import { useReveal } from './ui';

export interface ContextoFichaData {
  libro: string;
  capitulo: number;
  subtitulo: string;
  autor: string;
  epoca: string;
  lugar: string;
  escena: EscenaKey;
  captionEscena: string;
  /** 1 frase que pica la curiosidad antes de contar la historia ("Antes de leer") */
  gancho?: string;
  /** 1-2 párrafos cortos (ninguno > 4 líneas a 375px) */
  quePasa: string[];
  /** 1-2 frases: dónde encaja este capítulo en el arco completo de la Biblia */
  enElMapa?: string;
  /** si va, muestra "la línea de la promesa" resaltando este eslabón */
  lineaPromesa?: NodoPromesa;
  /** 1 pregunta corta para llevarse al día */
  paraHoy?: string;
  /** progreso 0-100 dentro de la Ruta, para el mini-strip "dónde vas" */
  progresoRuta: number;
  duracionMin: number;
}

export function ContextoFicha({
  data,
  ctaLabel = 'Ver la enseñanza de hoy',
  ctaOculto = false,
  onVerEnsenanza,
}: {
  data: ContextoFichaData;
  ctaLabel?: string;
  /** true cuando la enseñanza ya se reveló — el CTA cumplió su función y se colapsa */
  ctaOculto?: boolean;
  onVerEnsenanza?: () => void;
}) {
  const reduce = useReducedMotion();
  const { contenedor, item } = useReveal();
  const dibujo = Math.max(0.08, Math.min(1, data.progresoRuta / 100));

  return (
    <motion.div variants={contenedor} initial="hidden" animate="visible" className="px-4">
      <motion.div variants={item}>
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--accent)]">Contexto · 30 segundos</p>
        <h1 className="mt-1 text-[27px] font-bold leading-[1.12] tracking-[-0.02em] [font-family:var(--font-display)]">
          {data.libro} {data.capitulo}
        </h1>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">{data.subtitulo}</p>
      </motion.div>

      {data.gancho && (
        <motion.div
          variants={item}
          className="mt-4 rounded-[var(--radius-card)] border-l-2 border-[color-mix(in_oklab,var(--accent)_35%,transparent)] bg-[color-mix(in_oklab,var(--accent)_5%,var(--surface-2))] py-2.5 pl-3.5 pr-3"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--accent)]">Antes de leer</p>
          <p className="mt-1 text-[15px] leading-relaxed text-[var(--text-primary)]">{data.gancho}</p>
        </motion.div>
      )}

      <motion.div variants={item} className="mt-4 flex gap-2">
        <Chip etiqueta="Autor" valor={data.autor} />
        <Chip etiqueta="Época" valor={data.epoca} />
        <Chip etiqueta="Lugar" valor={data.lugar} />
      </motion.div>

      <motion.div variants={item} className="mt-4 overflow-hidden rounded-[var(--radius-card)] border border-[color-mix(in_oklab,var(--text-tertiary)_10%,transparent)] bg-[var(--surface)] shadow-[var(--shadow-card)]">
        <EscenaContexto escena={data.escena} />
        <p className="border-t border-[color-mix(in_oklab,var(--text-tertiary)_14%,transparent)] px-3 py-2 text-xs text-[var(--text-tertiary)]">
          {data.captionEscena}
        </p>
      </motion.div>

      <motion.div variants={item} className="mt-5">
        <p className="text-xs font-bold uppercase tracking-[0.1em] text-[var(--text-tertiary)]">Qué pasa aquí</p>
        <span aria-hidden="true" className="mt-2 block h-px w-full" style={{ background: 'var(--hairline)' }} />
        <div className="mt-3 space-y-2 text-[15px] leading-relaxed text-[var(--text-secondary)]">
          {data.quePasa.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </motion.div>

      <motion.div variants={item} className="mt-5 rounded-[var(--radius-card)] border border-[color-mix(in_oklab,var(--text-tertiary)_8%,transparent)] bg-[var(--surface-2)] px-3.5 pb-3.5 pt-3 shadow-[inset_0_1px_3px_color-mix(in_oklab,var(--text-primary)_5%,transparent)]">
        <div className="flex items-baseline justify-between">
          <p className="text-xs font-bold uppercase tracking-[0.1em] text-[var(--accent)]">En el mapa</p>
          <p className="text-[11px] font-semibold tabular-nums text-[var(--text-tertiary)]">{Math.round(data.progresoRuta)}% de la Ruta</p>
        </div>
        <svg viewBox="0 0 300 26" className="mt-2 w-full" aria-hidden="true">
          <path d="M10 20 C70 8 96 4 150 8 C214 12 240 20 288 6" fill="none" stroke="color-mix(in oklab, var(--text-tertiary) 40%, transparent)" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="1 7" />
          <motion.path
            d="M10 20 C70 8 96 4 150 8 C214 12 240 20 288 6"
            fill="none" stroke="var(--accent)" strokeWidth="2.8" strokeLinecap="round"
            initial={{ pathLength: reduce ? dibujo : 0 }}
            animate={{ pathLength: dibujo }}
            transition={{ duration: reduce ? 0 : 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          />
          <circle cx="10" cy="20" r="3.4" fill="var(--bg)" stroke="var(--accent)" strokeWidth="2.2" />
          <circle cx="288" cy="6" r="3.4" fill="var(--bg)" stroke="var(--accent)" strokeWidth="2.2" />
        </svg>
        {data.enElMapa && (
          <p className="mt-2 text-[15px] leading-relaxed text-[var(--text-primary)]">{data.enElMapa}</p>
        )}
      </motion.div>

      {data.lineaPromesa && (
        <motion.div variants={item} className="mt-3">
          <LineaPromesa hasta={data.lineaPromesa} />
        </motion.div>
      )}

      {data.paraHoy && (
        <motion.div
          variants={item}
          className="mt-5 rounded-[var(--radius-card)] border border-[color-mix(in_oklab,var(--accent-2)_20%,transparent)] bg-[color-mix(in_oklab,var(--accent-2)_5%,var(--surface))] p-4"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[color-mix(in_oklab,var(--accent-2)_70%,black)]">Para hoy</p>
          <p className="mt-1.5 text-[15px] font-medium leading-relaxed text-[var(--text-primary)]">{data.paraHoy}</p>
        </motion.div>
      )}

      {ctaOculto ? (
        <motion.p variants={item} className="mt-5 text-center text-xs text-[var(--text-tertiary)]">
          La enseñanza de hoy está abajo ↓
        </motion.p>
      ) : (
        <>
          <motion.button
            variants={item}
            type="button"
            onClick={onVerEnsenanza}
            whileTap={{ scale: reduce ? 1 : 0.97 }}
            className="mt-5 flex h-[52px] w-full items-center justify-center gap-2 rounded-[var(--radius-button)] bg-[var(--accent)] text-[15px] font-semibold text-[var(--bg)] shadow-[0_8px_22px_color-mix(in_oklab,var(--accent)_30%,transparent)] [touch-action:manipulation]"
          >
            <Play size={16} fill="var(--bg)" aria-hidden="true" />
            {ctaLabel}
          </motion.button>
          <p className="mt-2 text-center text-xs text-[var(--text-tertiary)]">{data.duracionMin} min de lectura · audio pronto</p>
        </>
      )}
    </motion.div>
  );
}

/* dato de lectura, no control — sin sombra ni borde de tarjeta tocable (no hace nada al tocarlo) */
function Chip({ etiqueta, valor }: { etiqueta: string; valor: string }) {
  return (
    <div className="flex-1 border-l-2 border-[color-mix(in_oklab,var(--accent)_25%,transparent)] pl-2.5 text-left">
      <p className="text-[11px] font-bold uppercase tracking-wide text-[var(--text-tertiary)]">{etiqueta}</p>
      <p className="mt-0.5 text-xs font-bold leading-snug">{valor}</p>
    </div>
  );
}
