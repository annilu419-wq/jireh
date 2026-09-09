'use client';

// Diario de oración (Sesión 5) — parte de la INVERSIÓN del loop de retención:
// anotar una petición y ver cómo Dios responde con el tiempo. Estado local (sin
// backend hasta la Sesión 6). "ritual" VETADO en copy. LEY DE COLOR de FICHA-ARTE:
// actuar = azul (--accent); ámbar (--accent-2) SOLO en logro/celebración → aquí, el
// check de "Respondidas" y el toast, nunca el botón de acción.

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Plus, Check, HeartHandshake, X, Trash2, Sparkles } from 'lucide-react';
import { AppShell, TopBar } from './ui';
import { Destellos } from './Destellos';
import type { Peticion } from '@/lib/contenido';
import {
  listarPeticiones,
  crearPeticion,
  marcarRespondidaDB,
  borrarPeticion,
  getResumenHoy,
} from '@/lib/datos';

let contador = 0;
const tap = { scale: 0.97 } as const;
/* ayuda de captura: solo fuera de producción. Congela la celebración con ?celebra
   en la URL, para poder fotografiar el estado. */
const CAPTURA = process.env.NODE_ENV !== 'production';

export function Diario() {
  const reduce = useReducedMotion();
  const wt = reduce ? undefined : tap;
  const [peticiones, setPeticiones] = useState<Peticion[]>([]);
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState(false);
  const [racha, setRacha] = useState<number | undefined>(undefined);
  const [abierto, setAbierto] = useState(false);
  const [modo, setModo] = useState<'peticion' | 'gratitud'>('peticion');
  const [titulo, setTitulo] = useState('');
  const [nota, setNota] = useState('');
  const [celebra, setCelebra] = useState<string | null>(null);
  const [eliminada, setEliminada] = useState<Peticion | null>(null);
  const celebraTimer = useRef(0);
  const undoTimer = useRef(0);
  const borrarTimer = useRef(0);
  const tituloRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let vivo = true;
    (async () => {
      try {
        const [lista, resumen] = await Promise.all([listarPeticiones(), getResumenHoy()]);
        if (!vivo) return;
        setPeticiones(lista);
        setRacha(resumen.racha);
      } catch {
        if (vivo) setErrorCarga(true);
      } finally {
        if (vivo) setCargando(false);
      }
    })();
    return () => {
      vivo = false;
    };
  }, []);

  const pendientes = useMemo(
    () => peticiones.filter((p) => p.tipo !== 'gratitud' && p.estado === 'pendiente'),
    [peticiones],
  );
  const respondidas = useMemo(
    () => peticiones.filter((p) => p.tipo !== 'gratitud' && p.estado === 'respondida'),
    [peticiones],
  );
  const gratitudes = useMemo(() => peticiones.filter((p) => p.tipo === 'gratitud'), [peticiones]);

  const abrir = (m: 'peticion' | 'gratitud') => {
    setModo(m);
    setTitulo('');
    setNota('');
    setAbierto(true);
  };
  const esGrat = modo === 'gratitud';

  useEffect(() => {
    if (abierto) {
      const t = window.setTimeout(() => tituloRef.current?.focus(), 60);
      const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && setAbierto(false);
      window.addEventListener('keydown', onEsc);
      return () => {
        window.clearTimeout(t);
        window.removeEventListener('keydown', onEsc);
      };
    }
  }, [abierto]);
  useEffect(() => () => { window.clearTimeout(celebraTimer.current); window.clearTimeout(undoTimer.current); }, []);

  const guardar = async () => {
    const t = titulo.trim();
    if (!t) return;
    contador += 1;
    const tmpId = `tmp${contador}`;
    const optimista: Peticion = {
      id: tmpId,
      tipo: modo,
      titulo: t,
      nota: nota.trim() || undefined,
      estado: 'pendiente',
      creada: 'hoy',
    };
    setPeticiones((prev) => [optimista, ...prev]);
    setTitulo('');
    setNota('');
    setAbierto(false);
    try {
      const real = await crearPeticion({ tipo: modo, titulo: t, nota: optimista.nota });
      setPeticiones((prev) => prev.map((p) => (p.id === tmpId ? real : p)));
    } catch {
      setPeticiones((prev) => prev.filter((p) => p.id !== tmpId));
    }
  };

  const marcarRespondida = (id: string) => {
    setCelebra(id);
    window.clearTimeout(celebraTimer.current);
    // deja ver la celebración anclada al ítem antes de moverlo
    // (?celebra en la URL congela la celebración para capturas de revisión)
    const hold = CAPTURA && typeof window !== 'undefined' && window.location.search.includes('celebra') ? 999999 : 900;
    celebraTimer.current = window.setTimeout(() => {
      setPeticiones((prev) =>
        prev.map((p) => (p.id === id ? { ...p, estado: 'respondida', respondida: 'hoy' } : p)),
      );
      celebraTimer.current = window.setTimeout(() => setCelebra(null), 1600);
      marcarRespondidaDB(id, true).catch(() => {});
    }, hold);
  };

  const reabrir = (id: string) => {
    setPeticiones((prev) => prev.map((p) => (p.id === id ? { ...p, estado: 'pendiente', respondida: undefined } : p)));
    marcarRespondidaDB(id, false).catch(() => {});
  };

  const eliminar = (id: string) => {
    const item = peticiones.find((p) => p.id === id);
    if (!item) return;
    setPeticiones((prev) => prev.filter((p) => p.id !== id));
    setEliminada(item);
    window.clearTimeout(undoTimer.current);
    window.clearTimeout(borrarTimer.current);
    undoTimer.current = window.setTimeout(() => setEliminada(null), 5000);
    // el borrado real espera la ventana de deshacer
    borrarTimer.current = window.setTimeout(() => {
      borrarPeticion(id).catch(() => {});
    }, 5000);
  };
  const deshacerEliminar = () => {
    if (!eliminada) return;
    window.clearTimeout(borrarTimer.current); // cancela el borrado en la base
    setPeticiones((prev) => [eliminada, ...prev]);
    setEliminada(null);
    window.clearTimeout(undoTimer.current);
  };

  const vacio = peticiones.length === 0;

  return (
    <AppShell>
      <TopBar streak={racha} />

      <div className="px-4 pt-4">
        <h1 className="text-[26px] font-bold leading-tight tracking-[-0.02em] [font-family:var(--font-display)]">Diario de oración</h1>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">
          {cargando
            ? 'Abriendo tu diario…'
            : errorCarga
              ? 'No pudimos abrir tu diario.'
              : vacio
                ? 'Guarda lo que le pides a Dios y aquello que le agradeces.'
                : [
                    `${pendientes.length} en oración`,
                    respondidas.length > 0 && `${respondidas.length} ${respondidas.length === 1 ? 'respondida' : 'respondidas'}`,
                    gratitudes.length > 0 && `${gratitudes.length} de gratitud`,
                  ]
                    .filter(Boolean)
                    .join(' · ')}
        </p>
      </div>

      {cargando ? (
        <div className="mt-5 space-y-2.5 px-4" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-24 animate-pulse rounded-[var(--radius-card)] bg-[var(--surface-2)]" />
          ))}
        </div>
      ) : errorCarga ? (
        <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
          <p className="text-sm text-[var(--text-secondary)]">Revisa tu conexión y vuelve a entrar.</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-3 text-sm font-semibold text-[var(--accent)] underline-offset-2 hover:underline [touch-action:manipulation]"
          >
            Reintentar
          </button>
        </div>
      ) : vacio ? (
        <div className="flex flex-1 flex-col items-center justify-center px-8 pb-10 text-center">
          <span className="grid size-16 place-items-center rounded-[var(--radius-card)] bg-[color-mix(in_oklab,var(--accent)_10%,transparent)]">
            <HeartHandshake size={28} color="var(--accent)" aria-hidden="true" />
          </span>
          <h2 className="mt-4 text-lg font-bold [font-family:var(--font-display)]">Tu primera entrada</h2>
          <p className="mt-2 max-w-[32ch] text-sm leading-relaxed text-[var(--text-secondary)]">
            Escribe lo que le pides a Dios y aquello que le agradeces. Cuando veas una petición respondida, la marcas — y guardas el recuerdo.
          </p>
          <div className="mt-6 flex w-full max-w-xs flex-col gap-2.5">
            <motion.button
              type="button"
              whileTap={wt}
              onClick={() => abrir('peticion')}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-[var(--radius-button)] bg-[var(--accent)] px-6 text-sm font-semibold text-[var(--bg)] shadow-[0_8px_22px_color-mix(in_oklab,var(--accent)_30%,transparent)] [touch-action:manipulation]"
            >
              <Plus size={16} aria-hidden="true" />
              Escribe tu petición
            </motion.button>
            <motion.button
              type="button"
              whileTap={wt}
              onClick={() => abrir('gratitud')}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-[var(--radius-button)] border border-[color-mix(in_oklab,var(--accent-2)_45%,transparent)] bg-[var(--surface)] px-6 text-sm font-semibold text-[color-mix(in_oklab,var(--accent-2)_70%,black)] shadow-[var(--shadow-card)] [touch-action:manipulation]"
            >
              <Sparkles size={16} aria-hidden="true" />
              Gratitud
            </motion.button>
          </div>
        </div>
      ) : (
        <div className="mt-5 flex flex-1 flex-col gap-6 px-4">
          {pendientes.length > 0 && (
            <section>
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-[var(--text-tertiary)]">En oración</p>
              <span aria-hidden="true" className="mt-2 block h-px w-full" style={{ background: 'var(--hairline)' }} />
              <ul className="mt-3 space-y-2.5">
                <AnimatePresence initial={false}>
                  {pendientes.map((p, i) => (
                    <motion.li
                      key={p.id}
                      layout
                      initial={{ opacity: 0, y: reduce ? 0 : 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: reduce ? 1 : 0.96 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1], delay: reduce ? 0 : i * 0.06 }}
                      className="relative rounded-[var(--radius-card)] border border-[color-mix(in_oklab,var(--text-tertiary)_10%,transparent)] bg-[var(--surface)] p-4 shadow-[var(--shadow-card)]"
                    >
                      <p className="text-[15px] font-semibold leading-snug">{p.titulo}</p>
                      {p.nota && <p className="mt-1 text-[13px] leading-relaxed text-[var(--text-secondary)]">{p.nota}</p>}
                      <div className="mt-3 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 text-xs text-[var(--text-tertiary)]">
                          <span>{p.creada}</span>
                          <motion.button
                            type="button"
                            whileTap={wt}
                            onClick={() => eliminar(p.id)}
                            className="inline-flex items-center gap-1 underline-offset-2 hover:underline [touch-action:manipulation]"
                          >
                            <Trash2 size={12} aria-hidden="true" />
                            Eliminar
                          </motion.button>
                        </div>
                        <motion.button
                          type="button"
                          whileTap={wt}
                          onClick={() => marcarRespondida(p.id)}
                          className="inline-flex items-center gap-1.5 rounded-full bg-[var(--accent)] px-3 py-1.5 text-xs font-semibold text-[var(--bg)] shadow-[0_4px_12px_-3px_color-mix(in_oklab,var(--accent)_45%,transparent)] [touch-action:manipulation]"
                        >
                          <Check size={13} strokeWidth={3} aria-hidden="true" />
                          Marcar respondida
                        </motion.button>
                      </div>

                      <AnimatePresence>
                        {celebra === p.id && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 grid place-items-center overflow-hidden rounded-[var(--radius-card)] bg-[color-mix(in_oklab,var(--accent-2)_10%,var(--surface))]"
                          >
                            <Destellos activo={!reduce} />
                            <motion.span
                              initial={{ scale: reduce ? 1 : 0.4 }}
                              animate={{ scale: 1 }}
                              transition={{ type: 'spring', stiffness: 320, damping: 14 }}
                              className="relative inline-flex items-center gap-2 text-sm font-bold text-[color-mix(in_oklab,var(--accent-2)_72%,black)]"
                            >
                              <span className="grid size-7 place-items-center rounded-full bg-[color-mix(in_oklab,var(--accent-2)_20%,transparent)]">
                                <Check size={16} strokeWidth={3} aria-hidden="true" />
                              </span>
                              ¡Respondida!
                            </motion.span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            </section>
          )}

          {respondidas.length > 0 && (
            <section>
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-[var(--text-tertiary)]">Respondidas</p>
              <span aria-hidden="true" className="mt-2 block h-px w-full" style={{ background: 'var(--hairline)' }} />
              <ul className="mt-3 space-y-2">
                <AnimatePresence initial={false}>
                  {respondidas.map((p, i) => (
                    <motion.li
                      key={p.id}
                      layout
                      initial={{ opacity: 0, y: reduce ? 0 : 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1], delay: reduce ? 0 : i * 0.06 }}
                      className="flex items-start gap-3 rounded-[var(--radius-card)] border border-[color-mix(in_oklab,var(--text-tertiary)_8%,transparent)] bg-[var(--surface-2)] px-4 py-3 shadow-[inset_0_1px_3px_color-mix(in_oklab,var(--text-primary)_6%,transparent)]"
                    >
                      <span aria-hidden="true" className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-[color-mix(in_oklab,var(--accent-2)_16%,transparent)]">
                        <Check size={12} strokeWidth={3} color="var(--accent-2)" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium leading-snug text-[var(--text-primary)]">{p.titulo}</p>
                        <p className="mt-0.5 text-xs text-[var(--text-tertiary)]">Respondida {p.respondida}</p>
                      </div>
                      <motion.button
                        type="button"
                        whileTap={wt}
                        onClick={() => reabrir(p.id)}
                        className="shrink-0 text-xs font-semibold text-[var(--text-tertiary)] underline-offset-2 hover:underline [touch-action:manipulation]"
                      >
                        Deshacer
                      </motion.button>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            </section>
          )}

          {gratitudes.length > 0 && (
            <section>
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-[var(--text-tertiary)]">Gratitud</p>
              <span aria-hidden="true" className="mt-2 block h-px w-full" style={{ background: 'var(--hairline)' }} />
              <ul className="mt-3 space-y-2.5">
                <AnimatePresence initial={false}>
                  {gratitudes.map((p, i) => (
                    <motion.li
                      key={p.id}
                      layout
                      initial={{ opacity: 0, y: reduce ? 0 : 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: reduce ? 1 : 0.96 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1], delay: reduce ? 0 : i * 0.06 }}
                      className="flex items-start gap-3 rounded-[var(--radius-card)] border border-[color-mix(in_oklab,var(--text-tertiary)_8%,transparent)] border-l-2 border-l-[color-mix(in_oklab,var(--accent-2)_40%,transparent)] bg-[color-mix(in_oklab,var(--accent-2)_5%,var(--surface))] p-4 shadow-[var(--shadow-card)]"
                    >
                      <span aria-hidden="true" className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-[color-mix(in_oklab,var(--accent-2)_14%,transparent)]">
                        <Sparkles size={13} color="var(--accent-2)" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-[15px] font-semibold leading-snug">{p.titulo}</p>
                        {p.nota && <p className="mt-1 text-[13px] leading-relaxed text-[var(--text-secondary)]">{p.nota}</p>}
                        <div className="mt-2 flex items-center gap-3 text-xs text-[var(--text-tertiary)]">
                          <span>{p.creada}</span>
                          <motion.button
                            type="button"
                            whileTap={wt}
                            onClick={() => eliminar(p.id)}
                            className="inline-flex items-center gap-1 underline-offset-2 hover:underline [touch-action:manipulation]"
                          >
                            <Trash2 size={12} aria-hidden="true" />
                            Eliminar
                          </motion.button>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            </section>
          )}

          <div className="space-y-3 pb-2 pt-2">
            <div className="rounded-[var(--radius-card)] border border-[color-mix(in_oklab,var(--text-tertiary)_8%,transparent)] border-l-2 border-l-[color-mix(in_oklab,var(--accent)_32%,transparent)] bg-[var(--surface-2)] py-3 pl-4 pr-4 shadow-[inset_0_1px_3px_color-mix(in_oklab,var(--text-primary)_5%,transparent)]">
              <p className="text-[13px] italic leading-relaxed text-[var(--text-secondary)] [font-family:var(--font-serif)]">
                «Oren en todo momento… con acción de gracias, presenten sus peticiones a Dios.»
              </p>
              <p className="mt-1 text-xs font-semibold not-italic text-[var(--accent)]">Filipenses 4:6</p>
            </div>
            <motion.div
              animate={{ opacity: eliminada ? 0 : 1 }}
              transition={{ duration: 0.2 }}
              className={`grid grid-cols-2 gap-2.5 ${eliminada ? 'pointer-events-none' : ''}`}
            >
              <motion.button
                type="button"
                whileTap={wt}
                onClick={() => abrir('peticion')}
                className="flex h-12 items-center justify-center gap-2 rounded-[var(--radius-button)] bg-[var(--accent)] text-sm font-semibold text-[var(--bg)] shadow-[0_8px_22px_color-mix(in_oklab,var(--accent)_28%,transparent)] [touch-action:manipulation]"
              >
                <Plus size={16} aria-hidden="true" />
                Petición
              </motion.button>
              <motion.button
                type="button"
                whileTap={wt}
                onClick={() => abrir('gratitud')}
                className="flex h-12 items-center justify-center gap-2 rounded-[var(--radius-button)] border border-[color-mix(in_oklab,var(--accent-2)_45%,transparent)] bg-[var(--surface)] text-sm font-semibold text-[color-mix(in_oklab,var(--accent-2)_70%,black)] shadow-[var(--shadow-card)] [touch-action:manipulation]"
              >
                <Sparkles size={16} aria-hidden="true" />
                Gratitud
              </motion.button>
            </motion.div>
          </div>
        </div>
      )}

      {/* hoja para anotar */}
      <AnimatePresence>
        {abierto && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setAbierto(false)}
              className="fixed inset-0 z-40 bg-[color-mix(in_oklab,var(--text-primary)_40%,transparent)]"
            />
            <motion.div
              initial={{ y: reduce ? 0 : '100%' }}
              animate={{ y: 0 }}
              exit={{ y: reduce ? 0 : '100%' }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              role="dialog"
              aria-modal="true"
              aria-label={esGrat ? 'Anotar gratitud' : 'Escribe tu petición'}
              className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-md rounded-t-[var(--radius-card)] border-t border-[color-mix(in_oklab,var(--text-tertiary)_12%,transparent)] bg-[var(--bg)] p-5 pb-[max(20px,env(safe-area-inset-bottom))] shadow-[0_-18px_50px_-16px_rgb(47_60_74_/_0.30)]"
            >
              <span aria-hidden="true" className="mx-auto mb-3 block h-1 w-9 rounded-full bg-[color-mix(in_oklab,var(--text-tertiary)_30%,transparent)]" />
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold [font-family:var(--font-display)]">{esGrat ? 'Nueva gratitud' : 'Nueva petición'}</h2>
                <button type="button" onClick={() => setAbierto(false)} aria-label="Cerrar" className="grid size-9 place-items-center text-[var(--text-secondary)] [touch-action:manipulation]">
                  <X size={20} aria-hidden="true" />
                </button>
              </div>

              {/* alternar entre petición y gratitud sin cerrar la hoja */}
              <div role="tablist" aria-label="Tipo de entrada" className="mt-4 grid grid-cols-2 gap-1 rounded-[var(--radius-button)] bg-[var(--surface-2)] p-1">
                {(['peticion', 'gratitud'] as const).map((m) => {
                  const on = modo === m;
                  return (
                    <button
                      key={m}
                      type="button"
                      role="tab"
                      aria-selected={on}
                      onClick={() => setModo(m)}
                      className={`flex h-9 items-center justify-center gap-1.5 rounded-[calc(var(--radius-button)-4px)] text-xs font-semibold transition-colors [touch-action:manipulation] ${
                        on ? 'bg-[var(--surface)] text-[var(--text-primary)] shadow-[var(--shadow-1)]' : 'text-[var(--text-tertiary)]'
                      }`}
                    >
                      {m === 'peticion' ? <Plus size={13} aria-hidden="true" /> : <Sparkles size={13} aria-hidden="true" />}
                      {m === 'peticion' ? 'Petición' : 'Gratitud'}
                    </button>
                  );
                })}
              </div>

              <label className="mt-4 block text-xs font-semibold text-[var(--text-secondary)]" htmlFor="d-titulo">
                {esGrat ? '¿Qué le agradeces a Dios hoy?' : '¿Por qué estás orando?'}
              </label>
              <input
                id="d-titulo"
                ref={tituloRef}
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); guardar(); } }}
                maxLength={90}
                placeholder={esGrat ? 'Ej. Por la salud de mi familia' : 'Ej. Sabiduría para una decisión'}
                className="mt-1.5 h-12 w-full rounded-[var(--radius-button)] border border-[color-mix(in_oklab,var(--text-tertiary)_28%,transparent)] bg-[var(--surface)] px-3.5 text-[15px] outline-none focus-visible:border-[var(--accent)]"
              />
              <label className="mt-3 block text-xs font-semibold text-[var(--text-secondary)]" htmlFor="d-nota">Una nota (opcional)</label>
              <textarea
                id="d-nota"
                value={nota}
                onChange={(e) => setNota(e.target.value)}
                maxLength={240}
                rows={3}
                placeholder={esGrat ? 'Lo que sentiste, lo que pasó.' : 'Lo que sientes hoy sobre esto.'}
                className="mt-1.5 w-full resize-none rounded-[var(--radius-button)] border border-[color-mix(in_oklab,var(--text-tertiary)_28%,transparent)] bg-[var(--surface)] p-3.5 text-[15px] leading-relaxed outline-none focus-visible:border-[var(--accent)]"
              />
              <motion.button
                type="button"
                whileTap={titulo.trim() ? wt : undefined}
                onClick={guardar}
                disabled={!titulo.trim()}
                className="mt-4 h-12 w-full rounded-[var(--radius-button)] bg-[var(--accent)] text-sm font-semibold text-[var(--bg)] shadow-[0_8px_22px_color-mix(in_oklab,var(--accent)_30%,transparent)] disabled:opacity-45 [touch-action:manipulation]"
              >
                {titulo.trim()
                  ? esGrat ? 'Guardar gratitud' : 'Guardar petición'
                  : esGrat ? 'Escribe algo para guardar' : 'Escribe una petición para guardar'}
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* deshacer eliminación (ventana de 5 s) */}
      <AnimatePresence>
        {eliminada && (
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduce ? 0 : 16 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            role="status"
            className="fixed inset-x-0 bottom-[calc(64px+env(safe-area-inset-bottom)+12px)] z-40 mx-auto flex w-[calc(100%-32px)] max-w-[368px] items-center justify-between gap-3 rounded-[var(--radius-button)] bg-[var(--text-primary)] px-4 py-3 text-sm text-[var(--bg)] shadow-[0_10px_30px_color-mix(in_oklab,var(--text-primary)_35%,transparent)]"
          >
            <span className="min-w-0 truncate">{eliminada.tipo === 'gratitud' ? 'Gratitud eliminada' : 'Petición eliminada'}</span>
            <motion.button
              type="button"
              whileTap={wt}
              onClick={deshacerEliminar}
              className="shrink-0 font-bold text-[color-mix(in_oklab,var(--accent)_45%,white)] underline-offset-2 hover:underline [touch-action:manipulation]"
            >
              Deshacer
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </AppShell>
  );
}
