'use client';

// Pantalla "Hoy" — protagonista de la app (Sesión 5). Objeto principal: la Ficha de
// Contexto del capítulo del día. Trabajo: activar el LOOP (gatillo→acción→recompensa→
// inversión) de ESTADO.md. Copy: "ritual" VETADO — se dice "tu momento con Dios" / "Hoy".
//
// Honestidad del loop (corrección tras revisor 2026-09-01): el CTA de la ficha SOLO
// revela la enseñanza (todavía no hay lector/audio real) — NO marca el día como hecho
// por sí solo. Completar el día es una acción aparte, explícita, y se puede deshacer.

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { Check, BookOpenText, RotateCw, TriangleAlert } from 'lucide-react';
import { AppShell, TopBar } from '@/components/app/ui';
import { ContextoFicha, Contador } from '@/components/app/ContextoFicha';
import { ParaTiHoy } from '@/components/app/ParaTiHoy';
import { Destellos } from '@/components/app/Destellos';
import { CAPITULO_DE_HOY, PARA_TI_HOY, capituloPorRuta, siguienteEnRuta, type CapituloHoy } from '@/lib/contenido';
import { getResumenHoy, getRuta, marcarDiaCompleto, deshacerDiaCompleto, avanzarRuta } from '@/lib/datos';

export default function Hoy() {
  const [revelado, setRevelado] = useState(false);
  const [completado, setCompletado] = useState(false);
  const [racha, setRacha] = useState<number | undefined>(undefined);
  const [cap, setCap] = useState<CapituloHoy>(CAPITULO_DE_HOY);
  const [estado, setEstado] = useState<'cargando' | 'ok' | 'error'>('cargando');
  const [celebrando, setCelebrando] = useState(false);
  const celebraTimer = useRef(0);
  const reduce = useReducedMotion();

  const cargar = useCallback(() => {
    let vivo = true;
    setEstado('cargando');
    Promise.all([getResumenHoy(), getRuta()])
      .then(([r, ruta]) => {
        if (!vivo) return;
        setRacha(r.racha);
        setCompletado(r.completadoHoy);
        setCap(capituloPorRuta(ruta.libro, ruta.capitulo));
        setEstado('ok');
      })
      .catch(() => {
        if (vivo) setEstado('error');
      });
    return () => {
      vivo = false;
    };
  }, []);

  useEffect(() => cargar(), [cargar]);
  useEffect(() => () => window.clearTimeout(celebraTimer.current), []);

  const { libro, capitulo } = cap.ficha;

  const marcarCompleto = () => {
    if (estado !== 'ok') return; // no marcar con racha/Ruta sin confirmar
    setCompletado(true);
    setCelebrando(true);
    window.clearTimeout(celebraTimer.current);
    // ?celebra en la URL (solo fuera de prod) mantiene la celebración para capturas
    const capturar =
      process.env.NODE_ENV !== 'production' &&
      typeof window !== 'undefined' &&
      window.location.search.includes('celebra');
    celebraTimer.current = window.setTimeout(() => setCelebrando(false), capturar ? 999999 : 1800);
    marcarDiaCompleto(libro, capitulo)
      .then((r) => setRacha(r.racha))
      .catch(() => {});
    // avanza la Ruta al siguiente capítulo producido
    const sig = siguienteEnRuta(libro, capitulo);
    if (sig) avanzarRuta(sig.libro, sig.capitulo, sig.progreso).catch(() => {});
  };
  const deshacer = () => {
    setCompletado(false);
    setCelebrando(false);
    window.clearTimeout(celebraTimer.current);
    deshacerDiaCompleto()
      .then((r) => setRacha(r.racha))
      .catch(() => {});
    // regresa la Ruta a este capítulo
    if (siguienteEnRuta(libro, capitulo)) {
      avanzarRuta(libro, capitulo, cap.ficha.progresoRuta).catch(() => {});
    }
  };

  return (
    <AppShell>
      <TopBar streak={racha} />

      <div className="mt-2 px-4">
        <p className="text-sm text-[var(--text-secondary)]">Hoy</p>
      </div>

      {estado === 'error' && (
        <div className="mx-4 mt-3 flex items-start gap-3 rounded-[var(--radius-card)] border border-[color-mix(in_oklab,var(--error)_35%,transparent)] bg-[color-mix(in_oklab,var(--error)_7%,var(--surface))] p-3">
          <TriangleAlert size={18} className="mt-0.5 shrink-0 text-[var(--error)]" aria-hidden="true" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-[var(--text-primary)]">No pudimos cargar tu avance</p>
            <p className="mt-0.5 text-xs text-[var(--text-secondary)]">
              Estás viendo un capítulo de muestra. Tu racha y tu lugar en la Ruta no se guardarán hasta reconectar.
            </p>
            <button
              type="button"
              onClick={cargar}
              className="mt-2 inline-flex items-center gap-1.5 rounded-[var(--radius-button)] border border-[color-mix(in_oklab,var(--accent)_40%,transparent)] px-3 py-1.5 text-xs font-semibold text-[var(--accent)] [touch-action:manipulation]"
            >
              <RotateCw size={13} aria-hidden="true" />
              Reintentar
            </button>
          </div>
        </div>
      )}

      <div className="mt-5">
        <ContextoFicha
          data={cap.ficha}
          ctaOculto={revelado}
          onVerEnsenanza={() => setRevelado(true)}
        />
      </div>

      {revelado && (
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mx-4 mt-5 rounded-[var(--radius-card)] border border-[color-mix(in_oklab,var(--accent)_16%,transparent)] bg-[var(--surface)] p-4 shadow-[var(--shadow-card)]"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--text-tertiary)]">{cap.tituloEnsenanza ?? 'Qué te quiso decir Jesús'}</p>
          <span aria-hidden="true" className="mt-2 block h-px w-full" style={{ background: 'var(--hairline)' }} />
          <ul className="mt-2.5 space-y-2.5">
            {cap.ensenanza.map((linea, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: reduce ? 0 : 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reduce ? 0 : 0.1 + i * 0.08, duration: 0.3 }}
                className="flex items-start gap-3 text-sm leading-snug"
              >
                <span aria-hidden="true" className="mt-0.5 grid size-[22px] shrink-0 place-items-center rounded-full bg-[color-mix(in_oklab,var(--accent)_12%,transparent)]">
                  <Check size={13} strokeWidth={2.6} color="var(--accent)" />
                </span>
                {linea}
              </motion.li>
            ))}
          </ul>

          <Link
            href="/app/biblia"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent)] transition-transform [touch-action:manipulation] active:scale-[0.98]"
          >
            <BookOpenText size={15} aria-hidden="true" />
            Leer el capítulo completo
          </Link>

          <div className="relative mt-4 border-t border-[color-mix(in_oklab,var(--text-tertiary)_16%,transparent)] pt-4">
            <Destellos activo={celebrando && !reduce} />
            {completado ? (
              <div className="relative">
                <div className="flex items-center justify-between">
                  <motion.p
                    initial={{ opacity: 0, scale: reduce ? 1 : 0.85, x: reduce ? 0 : -4 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ type: 'spring', stiffness: 340, damping: 18 }}
                    className="flex items-center gap-1.5 text-xs font-semibold text-[color-mix(in_oklab,var(--accent-2)_75%,black)]"
                  >
                    <motion.span
                      initial={{ scale: reduce ? 1 : 0, rotate: reduce ? 0 : -40 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 360, damping: 14, delay: 0.05 }}
                      className="grid place-items-center"
                    >
                      <Check size={13} strokeWidth={3} aria-hidden="true" />
                    </motion.span>
                    Capítulo de hoy completado
                  </motion.p>
                  <button
                    type="button"
                    onClick={deshacer}
                    className="text-xs font-semibold text-[var(--text-tertiary)] underline-offset-2 transition-transform hover:underline [touch-action:manipulation] active:scale-[0.98]"
                  >
                    Deshacer
                  </button>
                </div>
                <motion.div
                  initial={{ opacity: 0, scale: reduce ? 1 : 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 16 }}
                  className="mt-3 inline-flex items-center gap-2 rounded-full bg-[color-mix(in_oklab,var(--accent-2)_12%,transparent)] px-3 py-1.5 text-sm font-semibold text-[color-mix(in_oklab,var(--accent-2)_70%,black)]"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="var(--accent-2)" aria-hidden="true">
                    <path d="M12 2c2.6 3.7 4.2 6.3 4.2 8.9a4.2 4.2 0 1 1-8.4 0C7.8 8.3 9.4 5.7 12 2Z" />
                  </svg>
                  Racha: <Contador n={racha ?? 1} /> {racha === 1 ? 'día' : 'días'}
                  <span className="text-[color-mix(in_oklab,var(--accent-2)_55%,transparent)]">+1</span>
                </motion.div>
              </div>
            ) : (
              <div>
                <motion.button
                  type="button"
                  whileTap={{ scale: reduce || estado !== 'ok' ? 1 : 0.97 }}
                  onClick={marcarCompleto}
                  disabled={estado !== 'ok'}
                  aria-disabled={estado !== 'ok'}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-[var(--radius-button)] border border-[color-mix(in_oklab,var(--accent)_45%,transparent)] bg-[var(--surface)] text-sm font-semibold text-[var(--accent)] shadow-[var(--shadow-card)] [touch-action:manipulation] disabled:border-[color-mix(in_oklab,var(--text-tertiary)_25%,transparent)] disabled:text-[var(--text-tertiary)] disabled:shadow-none"
                >
                  <Check size={16} aria-hidden="true" />
                  Marcar mi día como completo
                </motion.button>
                {estado === 'error' && (
                  <p className="mt-2 text-center text-xs text-[var(--text-tertiary)]">
                    Disponible cuando recuperemos tu avance.
                  </p>
                )}
              </div>
            )}
          </div>
        </motion.div>
      )}

      <div className="mt-5">
        <ParaTiHoy data={PARA_TI_HOY} />
      </div>
    </AppShell>
  );
}
