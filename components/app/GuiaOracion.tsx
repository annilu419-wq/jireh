'use client';

// Guía de oración de 4 pasos (pedido del usuario, 2026-09-23): Confesión →
// Alabanza → Súplica → Gracias. Vive en "Hoy", después de la enseñanza del
// capítulo, antes de marcar el día completo. Progressive disclosure — colapsada
// por defecto, no le agrega peso a quien tiene prisa; quien quiere orar guiado
// la abre. Lleva su PROPIA racha, aparte de la racha de lectura (pedido del
// usuario, misma sesión) — orar y leer son dos hábitos distintos que se pueden
// cumplir cada uno por su lado. "ritual" VETADO — se dice "tu momento de oración".
//
// Cronómetro por paso (pedido del usuario, 2026-09-24): cada paso trae su
// propia cuenta regresiva de 3 minutos para sostener el silencio con Dios —
// un paso a la vez, no los 4 listados de golpe. "Saltar" siempre visible: el
// tiempo ayuda, nunca encierra (regla de UX #8, undo/salida siempre a mano).

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ChevronDown, HandHeart, Check, Flame, Play, Pause } from 'lucide-react';
import { GUIA_ORACION } from '@/lib/contenido';
import { Destellos } from '@/components/app/Destellos';
import { Contador } from '@/components/app/ContextoFicha';

const DURACION_PASO = 180; // 3 minutos por paso
const RADIO_ANILLO = 34;
const CIRCUNFERENCIA = 2 * Math.PI * RADIO_ANILLO;

export function GuiaOracion({
  racha,
  hechaHoy,
  onMarcar,
  onDeshacer,
}: {
  racha: number;
  hechaHoy: boolean;
  onMarcar: () => void;
  onDeshacer: () => void;
}) {
  const [abierto, setAbierto] = useState(false);
  const [celebrando, setCelebrando] = useState(false);
  const [pasoActivo, setPasoActivo] = useState(0);
  const [restante, setRestante] = useState(DURACION_PASO);
  const [corriendo, setCorriendo] = useState(false);
  const reduce = useReducedMotion();
  const celebraTimer = useRef<number | undefined>(undefined);
  const intervalo = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(celebraTimer.current), []);

  useEffect(() => {
    if (!corriendo) return;
    intervalo.current = window.setInterval(() => {
      setRestante((s) => {
        if (s <= 1) {
          setCorriendo(false);
          setPasoActivo((p) => Math.min(p + 1, GUIA_ORACION.length));
          return DURACION_PASO;
        }
        return s - 1;
      });
    }, 1000);
    return () => window.clearInterval(intervalo.current);
  }, [corriendo]);

  // "Deshacer" reinicia el recorrido para poder volver a orar el mismo día.
  useEffect(() => {
    if (!hechaHoy) {
      setPasoActivo(0);
      setRestante(DURACION_PASO);
      setCorriendo(false);
    }
  }, [hechaHoy]);

  const marcar = () => {
    setCelebrando(true);
    window.clearTimeout(celebraTimer.current);
    const capturar =
      process.env.NODE_ENV !== 'production' &&
      typeof window !== 'undefined' &&
      window.location.search.includes('celebra');
    celebraTimer.current = window.setTimeout(() => setCelebrando(false), capturar ? 999999 : 1800);
    onMarcar();
  };

  const saltarPaso = () => {
    setCorriendo(false);
    setRestante(DURACION_PASO);
    setPasoActivo((p) => Math.min(p + 1, GUIA_ORACION.length));
  };

  const paso = GUIA_ORACION[pasoActivo];
  const mm = Math.floor(restante / 60);
  const ss = String(restante % 60).padStart(2, '0');
  const avance = 1 - restante / DURACION_PASO;

  return (
    <div className="mt-4 overflow-hidden rounded-[var(--radius-card)] border border-[color-mix(in_oklab,var(--text-tertiary)_14%,transparent)] bg-[var(--surface-2)] shadow-[inset_0_1px_2px_rgb(47_60_74_/_0.06)]">
      <motion.button
        type="button"
        onClick={() => setAbierto((v) => !v)}
        whileTap={{ scale: reduce ? 1 : 0.99 }}
        aria-expanded={abierto}
        className="flex w-full items-center gap-3 px-4 py-3.5 text-left [touch-action:manipulation]"
      >
        <span aria-hidden="true" className="grid size-9 shrink-0 place-items-center rounded-full bg-[color-mix(in_oklab,var(--accent)_12%,transparent)]">
          <HandHeart size={16} color="var(--accent)" aria-hidden="true" />
        </span>
        <span className="flex-1">
          <span className="block text-base font-semibold">Tu momento de oración</span>
          <span className="block text-xs text-[var(--text-tertiary)]">4 pasos guiados, 3 min cada uno</span>
        </span>
        {racha > 0 && (
          <span className="flex shrink-0 items-center gap-1 rounded-full bg-[color-mix(in_oklab,var(--accent-2)_12%,transparent)] px-2 py-0.5 text-xs font-bold text-[color-mix(in_oklab,var(--accent-2)_70%,black)]">
            <Flame size={11} aria-hidden="true" />
            {racha}
          </span>
        )}
        <motion.span
          animate={{ rotate: abierto ? 180 : 0 }}
          transition={{ duration: reduce ? 0 : 0.2 }}
          className="shrink-0 text-[var(--text-tertiary)]"
        >
          <ChevronDown size={18} aria-hidden="true" />
        </motion.span>
      </motion.button>

      <AnimatePresence initial={false}>
        {abierto && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4">
              {hechaHoy ? (
                <div className="relative">
                  <Destellos activo={celebrando && !reduce} />
                  <div className="flex items-center justify-between rounded-[var(--radius-button)] bg-[color-mix(in_oklab,var(--accent-2)_10%,transparent)] px-4 py-2.5">
                    <span className="flex items-center gap-2 text-sm font-semibold text-[color-mix(in_oklab,var(--accent-2)_70%,black)]">
                      <Check size={15} strokeWidth={2.8} aria-hidden="true" />
                      Oraste hoy
                    </span>
                    <button
                      type="button"
                      onClick={onDeshacer}
                      className="text-xs font-semibold text-[var(--text-tertiary)] underline-offset-2 hover:underline [touch-action:manipulation]"
                    >
                      Deshacer
                    </button>
                  </div>
                  {racha > 0 && (
                    <div className="mt-2.5 flex items-center gap-1.5 px-1 text-sm font-semibold text-[color-mix(in_oklab,var(--accent-2)_70%,black)]">
                      <Flame size={14} aria-hidden="true" />
                      Racha: <Contador n={racha} /> {racha === 1 ? 'día' : 'días'}
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <div className="mb-4 flex items-center gap-2" role="presentation">
                    {GUIA_ORACION.map((p, i) => (
                      <span
                        key={p.paso}
                        aria-hidden="true"
                        className={`h-1.5 flex-1 rounded-full transition-colors ${
                          i < pasoActivo
                            ? 'bg-[var(--accent-2)]'
                            : i === pasoActivo
                              ? 'bg-[var(--accent)]'
                              : 'bg-[color-mix(in_oklab,var(--text-tertiary)_18%,transparent)]'
                        }`}
                      />
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    {pasoActivo < GUIA_ORACION.length ? (
                      <motion.div
                        key={paso.paso}
                        initial={{ opacity: 0, y: reduce ? 0 : 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: reduce ? 0 : -8 }}
                        transition={{ duration: reduce ? 0 : 0.25 }}
                        className="rounded-[var(--radius-card)] bg-[var(--surface)] p-4"
                      >
                        <div className="flex items-center gap-3">
                          <span
                            aria-hidden="true"
                            className="grid size-7 shrink-0 place-items-center rounded-full bg-[var(--accent)] text-xs font-bold text-[var(--bg)]"
                          >
                            {paso.paso}
                          </span>
                          <div>
                            <p className="text-sm font-semibold">{paso.titulo}</p>
                            <p className="text-xs text-[var(--text-tertiary)]">
                              Paso {pasoActivo + 1} de {GUIA_ORACION.length}
                            </p>
                          </div>
                        </div>

                        <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">{paso.prompt}</p>

                        <div className="mt-4 flex items-center justify-center">
                          <div className="relative grid size-24 place-items-center">
                            <svg viewBox="0 0 80 80" className="absolute inset-0 -rotate-90" aria-hidden="true">
                              <circle cx="40" cy="40" r={RADIO_ANILLO} fill="none" stroke="var(--surface-2)" strokeWidth="6" />
                              <motion.circle
                                cx="40"
                                cy="40"
                                r={RADIO_ANILLO}
                                fill="none"
                                stroke="var(--accent)"
                                strokeWidth="6"
                                strokeLinecap="round"
                                strokeDasharray={CIRCUNFERENCIA}
                                animate={{ strokeDashoffset: CIRCUNFERENCIA * (1 - avance) }}
                                transition={{ duration: reduce ? 0 : 0.4, ease: 'linear' }}
                              />
                            </svg>
                            <span className="text-lg font-bold tabular-nums" aria-live="polite">
                              {mm}:{ss}
                            </span>
                          </div>
                        </div>

                        <div className="mt-4 flex items-center justify-center gap-3">
                          {!corriendo ? (
                            <motion.button
                              type="button"
                              whileTap={{ scale: reduce ? 1 : 0.97 }}
                              onClick={() => setCorriendo(true)}
                              className="flex h-11 flex-1 items-center justify-center gap-2 rounded-[var(--radius-button)] bg-[var(--accent)] text-sm font-semibold text-[var(--bg)] shadow-[var(--shadow-card)] [touch-action:manipulation]"
                            >
                              <Play size={15} aria-hidden="true" />
                              {restante < DURACION_PASO ? 'Continuar' : 'Comenzar (3 min)'}
                            </motion.button>
                          ) : (
                            <motion.button
                              type="button"
                              whileTap={{ scale: reduce ? 1 : 0.97 }}
                              onClick={() => setCorriendo(false)}
                              className="flex h-11 flex-1 items-center justify-center gap-2 rounded-[var(--radius-button)] bg-[var(--surface-2)] text-sm font-semibold [touch-action:manipulation]"
                            >
                              <Pause size={15} aria-hidden="true" />
                              Pausar
                            </motion.button>
                          )}
                          <button
                            type="button"
                            onClick={saltarPaso}
                            className="text-xs font-semibold text-[var(--text-tertiary)] underline-offset-2 hover:underline [touch-action:manipulation]"
                          >
                            Saltar
                          </button>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.button
                        key="marcar"
                        type="button"
                        initial={{ opacity: 0, y: reduce ? 0 : 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileTap={{ scale: reduce ? 1 : 0.97 }}
                        onClick={marcar}
                        className="flex h-11 w-full items-center justify-center gap-2 rounded-[var(--radius-button)] bg-[var(--accent)] text-sm font-semibold text-[var(--bg)] shadow-[var(--shadow-card)] [touch-action:manipulation]"
                      >
                        <Check size={15} aria-hidden="true" />
                        Listo, oré hoy
                      </motion.button>
                    )}
                  </AnimatePresence>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
