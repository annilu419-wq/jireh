'use client';

// "Tu historia con Dios" — el diferencial de Jireh (idea de la usuaria, 2026-11-10):
// al terminar la enseñanza, la persona escribe en 2 líneas qué situación suya toca
// el capítulo y qué cree que Dios le dice. Una entrada por día; queda guardada y se
// puede releer en "Devocional". Sin IA: son sus propias palabras. "ritual" VETADO.

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Check, PenLine, RotateCw } from 'lucide-react';
import { getHistoriaHoy, guardarHistoria } from '@/lib/datos';

const MAX = 300;

export function HistoriaConDios({
  libro,
  capitulo,
  demo = false,
}: {
  libro: string;
  capitulo: number;
  /** solo para capturas/pruebas: no toca Supabase */
  demo?: boolean;
}) {
  const reduce = useReducedMotion();
  const [situacion, setSituacion] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [fase, setFase] = useState<'cargando' | 'editando' | 'guardado'>(demo ? 'editando' : 'cargando');
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (demo) return;
    let vivo = true;
    getHistoriaHoy()
      .then((e) => {
        if (!vivo) return;
        if (e) {
          setSituacion(e.situacion);
          setMensaje(e.mensaje);
          setFase('guardado');
        } else {
          setFase('editando');
        }
      })
      .catch(() => {
        if (vivo) setFase('editando');
      });
    return () => {
      vivo = false;
    };
  }, [demo]);

  const vacio = !situacion.trim() && !mensaje.trim();

  const guardar = async () => {
    if (vacio || guardando) return;
    setGuardando(true);
    setError(false);
    try {
      if (!demo) await guardarHistoria({ libro, capitulo, situacion, mensaje });
      setFase('guardado');
    } catch {
      setError(true);
    } finally {
      setGuardando(false);
    }
  };

  const campo =
    'mt-1.5 w-full resize-none rounded-[var(--radius-button)] border border-[color-mix(in_oklab,var(--text-tertiary)_28%,transparent)] bg-[var(--surface)] p-3 text-base leading-relaxed outline-none focus-visible:border-[var(--accent)]';

  return (
    <section
      aria-label="Tu historia con Dios"
      className="mt-5 rounded-[var(--radius-card)] border border-[color-mix(in_oklab,var(--accent)_28%,transparent)] bg-[color-mix(in_oklab,var(--accent)_5%,var(--surface))] p-4 shadow-[var(--shadow-card)]"
    >
      <div className="flex items-center gap-2.5">
        <span aria-hidden="true" className="grid size-8 shrink-0 place-items-center rounded-full bg-[color-mix(in_oklab,var(--accent)_14%,transparent)]">
          <PenLine size={15} color="var(--accent)" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">Tu historia con Dios</p>
          <p className="text-xs text-[var(--text-tertiary)]">Dos líneas bastan. Aquí queda tu camino.</p>
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {fase === 'cargando' ? (
          <motion.div key="c" exit={{ opacity: 0 }} className="mt-4 space-y-3" aria-hidden="true">
            <div className="h-16 animate-pulse rounded-[var(--radius-button)] bg-[var(--surface-2)]" />
            <div className="h-16 animate-pulse rounded-[var(--radius-button)] bg-[var(--surface-2)]" />
          </motion.div>
        ) : fase === 'guardado' ? (
          <motion.div
            key="g"
            initial={{ opacity: 0, y: reduce ? 0 : 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-4"
          >
            {situacion.trim() && (
              <div>
                <p className="text-xs font-semibold text-[var(--text-tertiary)]">Mi situación</p>
                <p className="mt-0.5 text-base leading-relaxed text-[var(--text-primary)]">{situacion}</p>
              </div>
            )}
            {mensaje.trim() && (
              <div className={situacion.trim() ? 'mt-3' : ''}>
                <p className="text-xs font-semibold text-[var(--text-tertiary)]">Lo que creo que Dios me dice</p>
                <p className="mt-0.5 text-base leading-relaxed text-[var(--text-primary)]">{mensaje}</p>
              </div>
            )}
            <div className="mt-3 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent)]">
                <Check size={14} strokeWidth={2.8} aria-hidden="true" />
                Guardado en tu historia
              </span>
              <button
                type="button"
                onClick={() => setFase('editando')}
                className="text-xs font-semibold text-[var(--text-tertiary)] underline-offset-2 hover:underline [touch-action:manipulation]"
              >
                Editar
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div key="e" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} className="mt-4">
            <label htmlFor="h-situacion" className="block text-xs font-semibold text-[var(--text-secondary)]">
              ¿Qué situación tuya toca este capítulo?
            </label>
            <textarea
              id="h-situacion"
              value={situacion}
              onChange={(e) => setSituacion(e.target.value)}
              maxLength={MAX}
              rows={2}
              placeholder="Ej. Estoy decidiendo si cambio de trabajo"
              className={campo}
            />
            <label htmlFor="h-mensaje" className="mt-3 block text-xs font-semibold text-[var(--text-secondary)]">
              ¿Qué crees que Dios te dice?
            </label>
            <textarea
              id="h-mensaje"
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              maxLength={MAX}
              rows={2}
              placeholder="Ej. Que no tengo que tener todo resuelto hoy"
              className={campo}
            />

            {error && (
              <p role="alert" className="mt-2 flex items-center gap-1.5 text-xs text-[var(--error)]">
                No pudimos guardarlo. Revisa tu conexión e inténtalo otra vez.
              </p>
            )}

            <motion.button
              type="button"
              whileTap={{ scale: reduce || vacio ? 1 : 0.97 }}
              onClick={guardar}
              disabled={vacio || guardando}
              className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-[var(--radius-button)] bg-[var(--accent)] text-sm font-semibold text-[var(--bg)] shadow-[var(--shadow-card)] disabled:opacity-45 [touch-action:manipulation]"
            >
              {guardando ? (
                'Guardando…'
              ) : error ? (
                <>
                  <RotateCw size={14} aria-hidden="true" />
                  Reintentar
                </>
              ) : vacio ? (
                'Escribe algo para guardar'
              ) : (
                'Guardar en mi historia'
              )}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
