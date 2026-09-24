'use client';

// Guía de oración de 4 pasos (pedido del usuario, 2026-09-23): Confesión →
// Alabanza → Súplica → Gracias. Vive en la pantalla "Oración" (antes "Diario",
// renombrada 2026-09-24 porque el usuario no la encontraba escondida dentro de
// "Hoy"). Ahora es una TARJETA HERO siempre visible arriba de esa pantalla —
// nada de acordeón colapsado — que abre el recorrido guiado en una hoja a
// pantalla completa, igual al patrón de "anotar petición" del Diario. Lleva su
// PROPIA racha, aparte de la racha de lectura (pedido del usuario, misma
// sesión) — orar y leer son dos hábitos distintos. "ritual" VETADO — se dice
// "tu momento de oración".
//
// Cronómetro por paso (pedido del usuario, 2026-09-24): cada paso trae su
// propia cuenta regresiva de 3 minutos para sostener el silencio con Dios —
// un paso a la vez, no los 4 listados de golpe. "Saltar" siempre visible: el
// tiempo ayuda, nunca encierra (regla de UX #8, undo/salida siempre a mano).

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { HandHeart, Check, Flame, Play, Pause, X } from 'lucide-react';
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
  const [sheet, setSheet] = useState(false);
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

  useEffect(() => {
    if (sheet) {
      const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && setSheet(false);
      window.addEventListener('keydown', onEsc);
      return () => window.removeEventListener('keydown', onEsc);
    }
  }, [sheet]);

  const marcar = () => {
    setCelebrando(true);
    window.clearTimeout(celebraTimer.current);
    const capturar =
      process.env.NODE_ENV !== 'production' &&
      typeof window !== 'undefined' &&
      window.location.search.includes('celebra');
    celebraTimer.current = window.setTimeout(() => setCelebrando(false), capturar ? 999999 : 1800);
    onMarcar();
    setSheet(false);
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
    <>
      {hechaHoy ? (
        <div className="relative mt-4 flex items-center gap-3 overflow-hidden rounded-[var(--radius-card)] bg-[color-mix(in_oklab,var(--accent-2)_10%,var(--surface))] p-4 shadow-[var(--shadow-card)]">
          <Destellos activo={celebrando && !reduce} />
          <span aria-hidden="true" className="grid size-11 shrink-0 place-items-center rounded-full bg-[color-mix(in_oklab,var(--accent-2)_18%,transparent)]">
            <Check size={20} strokeWidth={2.8} color="var(--accent-2)" aria-hidden="true" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-base font-bold text-[color-mix(in_oklab,var(--accent-2)_70%,black)]">Oraste hoy</span>
            {racha > 0 && (
              <span className="mt-0.5 flex items-center gap-1 text-xs font-semibold text-[var(--text-tertiary)]">
                <Flame size={12} aria-hidden="true" />
                Racha: <Contador n={racha} /> {racha === 1 ? 'día' : 'días'}
              </span>
            )}
          </span>
          <button
            type="button"
            onClick={onDeshacer}
            className="shrink-0 text-xs font-semibold text-[var(--text-tertiary)] underline-offset-2 hover:underline [touch-action:manipulation]"
          >
            Deshacer
          </button>
        </div>
      ) : (
        <motion.button
          type="button"
          whileTap={{ scale: reduce ? 1 : 0.98 }}
          onClick={() => setSheet(true)}
          className="relative mt-4 flex w-full items-center gap-3 rounded-[var(--radius-card)] bg-[var(--accent)] p-4 text-left shadow-[0_12px_28px_-12px_color-mix(in_oklab,var(--accent)_60%,transparent)] [touch-action:manipulation]"
        >
          <span aria-hidden="true" className="grid size-11 shrink-0 place-items-center rounded-full bg-[color-mix(in_oklab,var(--bg)_22%,transparent)]">
            <HandHeart size={20} color="var(--bg)" aria-hidden="true" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-base font-bold text-[var(--bg)]">Tu momento de oración</span>
            <span className="block text-xs text-[color-mix(in_oklab,var(--bg)_78%,transparent)]">4 pasos guiados · 3 min cada uno</span>
          </span>
          {racha > 0 && (
            <span className="flex shrink-0 items-center gap-1 rounded-full bg-[color-mix(in_oklab,var(--bg)_20%,transparent)] px-2 py-1 text-xs font-bold text-[var(--bg)]">
              <Flame size={12} aria-hidden="true" />
              {racha}
            </span>
          )}
        </motion.button>
      )}

      <AnimatePresence>
        {sheet && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSheet(false)}
              className="fixed inset-0 z-40 bg-[color-mix(in_oklab,var(--text-primary)_40%,transparent)]"
            />
            <motion.div
              initial={{ y: reduce ? 0 : '100%' }}
              animate={{ y: 0 }}
              exit={{ y: reduce ? 0 : '100%' }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              role="dialog"
              aria-modal="true"
              aria-label="Tu momento de oración"
              className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-md rounded-t-[var(--radius-card)] border-t border-[color-mix(in_oklab,var(--text-tertiary)_12%,transparent)] bg-[var(--bg)] p-5 pb-[max(20px,env(safe-area-inset-bottom))] shadow-[0_-18px_50px_-16px_rgb(47_60_74_/_0.30)]"
            >
              <span aria-hidden="true" className="mx-auto mb-3 block h-1 w-9 rounded-full bg-[color-mix(in_oklab,var(--text-tertiary)_30%,transparent)]" />
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold [font-family:var(--font-display)]">Tu momento de oración</h2>
                <button
                  type="button"
                  onClick={() => setSheet(false)}
                  aria-label="Cerrar"
                  className="grid size-9 place-items-center text-[var(--text-secondary)] [touch-action:manipulation]"
                >
                  <X size={20} aria-hidden="true" />
                </button>
              </div>

              <div className="mt-4 flex items-center gap-2" role="presentation">
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
                    className="mt-4 rounded-[var(--radius-card)] bg-[var(--surface-2)] p-4"
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
                          <circle cx="40" cy="40" r={RADIO_ANILLO} fill="none" stroke="var(--surface)" strokeWidth="6" />
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
                          className="flex h-11 flex-1 items-center justify-center gap-2 rounded-[var(--radius-button)] bg-[var(--surface)] text-sm font-semibold [touch-action:manipulation]"
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
                    className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-[var(--radius-button)] bg-[var(--accent)] text-sm font-semibold text-[var(--bg)] shadow-[var(--shadow-card)] [touch-action:manipulation]"
                  >
                    <Check size={15} aria-hidden="true" />
                    Listo, oré hoy
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
