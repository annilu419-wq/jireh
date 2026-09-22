'use client';

// "Calma" / Modo Crisis (Sesión 5). Cuando estás ansioso, triste, con culpa o
// quieres dar gracias: eliges la emoción → pasaje + respiración guiada (~60 s) +
// oración corta. Contenido CURADO (lib/contenido.ts), nunca IA como voz de Dios.
// "ritual" VETADO. Primera pantalla de tipo "guiado/respiración" → lleva revisor.

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Wind, CloudRain, HeartCrack, Sparkles, ArrowLeft, Check } from 'lucide-react';
import { AppShell, TopBar } from '@/components/app/ui';
import { CALMA, RACHA_ACTUAL, type Emocion, type EmocionKey } from '@/lib/contenido';

const MotionLink = motion.create(Link);

const ICONO: Record<EmocionKey, typeof Wind> = {
  ansiedad: Wind,
  tristeza: CloudRain,
  culpa: HeartCrack,
  gratitud: Sparkles,
};

const CICLO = 12; // s por respiración completa (inhala 4 · sostén 2 · exhala 4 · pausa 2)

export default function CalmaPage() {
  const reduce = useReducedMotion();
  const [emocion, setEmocion] = useState<Emocion | null>(null);
  const [fase, setFase] = useState<'elegir' | 'guiado' | 'cierre'>('elegir');

  return (
    <AppShell>
      <TopBar streak={RACHA_ACTUAL} />

      <AnimatePresence mode="wait">
        {fase === 'elegir' && (
          <Selector
            key="elegir"
            reduce={!!reduce}
            onElegir={(e) => { setEmocion(e); setFase('guiado'); }}
          />
        )}
        {fase === 'guiado' && emocion && (
          <Guiado
            key="guiado"
            reduce={!!reduce}
            emocion={emocion}
            onVolver={() => { setEmocion(null); setFase('elegir'); }}
            onTerminar={() => setFase('cierre')}
          />
        )}
        {fase === 'cierre' && emocion && (
          <Cierre
            key="cierre"
            reduce={!!reduce}
            emocion={emocion}
            onOtra={() => { setEmocion(null); setFase('elegir'); }}
          />
        )}
      </AnimatePresence>
    </AppShell>
  );
}

/* ── 1. elegir la emoción ── */
function Selector({ reduce, onElegir }: { reduce: boolean; onElegir: (e: Emocion) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: reduce ? 0 : -8 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-1 flex-col justify-center px-4 pb-6 pt-4"
    >
      <h1 className="text-[26px] font-bold leading-tight tracking-[-0.02em] [font-family:var(--font-display)]">Un momento de calma</h1>
      <p className="mt-1 text-sm text-[var(--text-secondary)]">¿Cómo te sientes ahora? Elige y respira un momento.</p>

      <div className="mt-6">
        <div className="grid grid-cols-2 gap-3">
          {CALMA.map((e, i) => {
            const Icon = ICONO[e.key];
            return (
              <motion.button
                key={e.key}
                type="button"
                onClick={() => onElegir(e)}
                whileTap={{ scale: reduce ? 1 : 0.97 }}
                initial={{ opacity: 0, y: reduce ? 0 : 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reduce ? 0 : i * 0.06, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-start rounded-[var(--radius-card)] border border-[color-mix(in_oklab,var(--text-tertiary)_10%,transparent)] bg-[var(--surface)] p-4 text-left shadow-[var(--shadow-card)] [touch-action:manipulation]"
              >
                <span className="grid size-11 place-items-center rounded-[var(--radius-button)] bg-[color-mix(in_oklab,var(--accent)_10%,transparent)]">
                  <Icon size={20} color="var(--accent)" aria-hidden="true" />
                </span>
                <span className="mt-3 block text-[17px] font-bold [font-family:var(--font-display)]">{e.titulo}</span>
                <span className="mt-1 block text-[13px] leading-snug text-[var(--text-secondary)]">{e.descripcion}</span>
              </motion.button>
            );
          })}
        </div>
        <p className="mt-4 text-center text-xs text-[var(--text-tertiary)]">Contenido para acompañarte, no para reemplazar ayuda profesional.</p>
      </div>
    </motion.div>
  );
}

/* ── 2. pasaje + respiración guiada + oración ── */
function Guiado({
  reduce,
  emocion,
  onVolver,
  onTerminar,
}: {
  reduce: boolean;
  emocion: Emocion;
  onVolver: () => void;
  onTerminar: () => void;
}) {
  // texto de respiración sincronizado con el ciclo del círculo
  const PASOS = ['Inhala', 'Sostén', 'Exhala', ' '];
  const [paso, setPaso] = useState(0);
  const timer = useRef(0);
  useEffect(() => {
    if (reduce) return;
    const marcas = [0, 4000, 6000, 10000];
    const tick = () => {
      const t = (Date.now() - t0) % (CICLO * 1000);
      let p = 0;
      for (let k = 0; k < marcas.length; k++) if (t >= marcas[k]) p = k;
      setPaso(p);
      timer.current = window.setTimeout(tick, 250);
    };
    const t0 = Date.now();
    tick();
    return () => window.clearTimeout(timer.current);
  }, [reduce]);

  // van saliendo los versículos de la emoción, uno a la vez, cada 2 respiraciones
  // (pedido del usuario: "que vayan saliendo versículos que te ayuden con la calma")
  const [iPasaje, setIPasaje] = useState(0);
  const pasajeTimer = useRef(0);
  useEffect(() => {
    setIPasaje(0);
    if (reduce || emocion.pasajes.length <= 1) return;
    pasajeTimer.current = window.setInterval(() => {
      setIPasaje((p) => (p + 1) % emocion.pasajes.length);
    }, CICLO * 2 * 1000);
    return () => window.clearInterval(pasajeTimer.current);
  }, [reduce, emocion]);
  const pasaje = emocion.pasajes[iPasaje];

  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: reduce ? 0 : -8 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-1 flex-col px-4 pt-3"
    >
      <motion.button type="button" whileTap={{ scale: reduce ? 1 : 0.96 }} onClick={onVolver} className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--text-secondary)] [touch-action:manipulation]">
        <ArrowLeft size={16} aria-hidden="true" />
        {emocion.titulo}
      </motion.button>

      {/* pasaje — tratamiento de tarjeta de versículo (FICHA-ARTE). Va cambiando
          de versículo cada 2 respiraciones mientras la persona sigue aquí. */}
      <div className="relative mt-3 min-h-32 overflow-hidden rounded-[var(--radius-card)] border border-[color-mix(in_oklab,var(--accent-2)_18%,transparent)] bg-[color-mix(in_oklab,var(--accent-2)_4%,var(--surface-2))] px-5 py-4 text-center shadow-[inset_0_1px_3px_color-mix(in_oklab,var(--text-primary)_5%,transparent)]">
        <span aria-hidden="true" className="mx-auto block h-px w-10" style={{ background: 'color-mix(in oklab, var(--accent-2) 40%, transparent)' }} />
        <AnimatePresence mode="wait">
          <motion.div
            key={iPasaje}
            initial={{ opacity: 0, y: reduce ? 0 : 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduce ? 0 : -6 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="mt-2.5 text-base leading-[1.5] text-[var(--text-primary)] [font-family:var(--font-serif)]">
              &ldquo;{pasaje.texto}&rdquo;
            </p>
            <p className="mt-1.5 text-xs font-semibold text-[var(--accent)]">{pasaje.referencia}</p>
          </motion.div>
        </AnimatePresence>
        {emocion.pasajes.length > 1 && (
          <div className="mt-2 flex items-center justify-center gap-1.5" role="presentation">
            {emocion.pasajes.map((_, k) => (
              <span
                key={k}
                aria-hidden="true"
                className={`size-1.5 rounded-full transition-colors ${k === iPasaje ? 'bg-[var(--accent)]' : 'bg-[color-mix(in_oklab,var(--text-tertiary)_30%,transparent)]'}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* respiración guiada */}
      <div className="mt-6 flex flex-1 flex-col items-center justify-center">
        <div className="relative grid size-56 place-items-center">
          {/* anillos que acompañan */}
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 rounded-full border border-[color-mix(in_oklab,var(--accent)_30%,transparent)]"
            animate={reduce ? {} : { scale: [0.72, 1, 1, 0.72, 0.72], opacity: [0.5, 0.9, 0.9, 0.5, 0.5] }}
            transition={reduce ? {} : { duration: CICLO, times: [0, 0.33, 0.5, 0.83, 1], repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.span
            aria-hidden="true"
            className="absolute size-40 rounded-full bg-[color-mix(in_oklab,var(--accent)_12%,transparent)]"
            animate={reduce ? {} : { scale: [0.7, 1, 1, 0.7, 0.7] }}
            transition={reduce ? {} : { duration: CICLO, times: [0, 0.33, 0.5, 0.83, 1], repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="relative grid size-28 place-items-center rounded-full bg-[var(--accent)] text-center text-sm font-semibold text-[var(--bg)] shadow-[0_10px_30px_-8px_color-mix(in_oklab,var(--accent)_50%,transparent)]">
            {reduce ? 'Respira\ncon calma' : PASOS[paso]}
          </div>
        </div>

        {/* oración guiada — 3 líneas */}
        <div className="mt-6 space-y-1.5 text-center">
          {emocion.oracion.map((linea, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: reduce ? 0 : 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduce ? 0 : 0.2 + i * 0.5, duration: 0.4 }}
              className="text-[15px] leading-relaxed text-[var(--text-secondary)]"
            >
              {linea}
            </motion.p>
          ))}
        </div>
      </div>

      <p className="mt-6 text-center text-xs text-[var(--text-tertiary)]">Quédate el tiempo que necesites.</p>
      <motion.button
        type="button"
        whileTap={{ scale: reduce ? 1 : 0.97 }}
        onClick={onTerminar}
        className="mb-4 mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-[var(--radius-button)] bg-[var(--accent)] text-sm font-semibold text-[var(--bg)] shadow-[0_8px_22px_color-mix(in_oklab,var(--accent)_28%,transparent)] [touch-action:manipulation]"
      >
        Terminar
      </motion.button>
    </motion.div>
  );
}

/* ── 3. cierre sereno (sin celebración fuerte — es modo crisis, no logro) ── */
function Cierre({ reduce, emocion, onOtra }: { reduce: boolean; emocion: Emocion; onOtra: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-1 flex-col items-center justify-center px-8 pb-10 text-center"
    >
      <motion.span
        initial={{ scale: reduce ? 1 : 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 18 }}
        className="grid size-16 place-items-center rounded-full bg-[color-mix(in_oklab,var(--accent)_12%,transparent)]"
      >
        <Check size={26} strokeWidth={2.4} color="var(--accent)" aria-hidden="true" />
      </motion.span>
      <h2 className="mt-4 text-lg font-bold [font-family:var(--font-display)]">Respiraste. Eso ya es algo.</h2>
      <p className="mt-2 max-w-[32ch] text-sm leading-relaxed text-[var(--text-secondary)]">
        Quédate hoy con {emocion.pasajes[0].referencia}. Vuelve aquí cada vez que lo necesites.
      </p>
      <div className="mt-6 flex w-full max-w-xs flex-col gap-2.5">
        <motion.button
          type="button"
          whileTap={{ scale: reduce ? 1 : 0.97 }}
          onClick={onOtra}
          className="h-12 rounded-[var(--radius-button)] bg-[var(--accent)] text-sm font-semibold text-[var(--bg)] shadow-[0_8px_22px_color-mix(in_oklab,var(--accent)_28%,transparent)] [touch-action:manipulation]"
        >
          Elegir otra emoción
        </motion.button>
        <MotionLink
          href="/app/hoy"
          whileTap={{ scale: reduce ? 1 : 0.97 }}
          className="flex h-12 items-center justify-center rounded-[var(--radius-button)] border border-[color-mix(in_oklab,var(--accent)_45%,transparent)] bg-[var(--surface)] text-sm font-semibold text-[var(--accent)] shadow-[var(--shadow-card)] [touch-action:manipulation]"
        >
          Volver a Hoy
        </MotionLink>
      </div>
    </motion.div>
  );
}
