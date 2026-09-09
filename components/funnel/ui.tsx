'use client';

// FUNNEL — piezas compartidas del onboarding + paywall + login (blueprints de 50).
// Estilo B (tokens de components/landing/tokens.css). Márgenes del funnel: 16px.
// Reglas embebidas: barra de progreso fina que anima y no retrocede · 1 decisión por
// pantalla · chips 56-64px con estado seleccionado completo · reduced-motion respetado.

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, Check, X } from 'lucide-react';
import { YirethMark } from '@/components/landing/Logo';

/** palabra clave en el acento del kit (misma que la landing) */
export function A({ children }: { children: ReactNode }) {
  return <span className="text-[var(--accent)]">{children}</span>;
}

/* ── marca del funnel (regla de marca de 50): logo + nombre arriba, vuelve a / ── */
export function FunnelBrand() {
  return (
    <a href="/" aria-label="Yireth — inicio" className="inline-flex items-center gap-2 text-[15px] font-semibold text-[var(--text-primary)]">
      <YirethMark className="size-6" />
      Yireth
    </a>
  );
}

/* ── barra de progreso: línea fina, % real, ANIMA, nunca retrocede, arranca en 6% ── */
export function ProgressBar({ pct }: { pct: number }) {
  const reduce = useReducedMotion();
  const v = Math.max(6, Math.min(100, pct));
  return (
    <div className="h-[3px] w-full overflow-hidden rounded-full bg-[color-mix(in_oklab,var(--accent)_14%,transparent)]" role="progressbar" aria-valuenow={Math.round(v)} aria-valuemin={0} aria-valuemax={100}>
      <motion.div
        className="h-full rounded-full bg-[var(--accent)]"
        initial={false}
        animate={{ width: `${v}%` }}
        transition={{ duration: reduce ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}

/* ── cabecera del paso: atrás (entre pasos) o salir (paso 1) + barra ── */
export function StepHeader({ pct, onBack, onExit }: { pct: number; onBack?: () => void; onExit?: () => void }) {
  return (
    <div className="flex items-center gap-3 px-4 pt-3">
      {onExit ? (
        <button type="button" onClick={onExit} className="inline-flex h-11 shrink-0 items-center gap-1 px-1 text-xs font-medium [touch-action:manipulation] text-[var(--text-secondary)]">
          <X size={16} aria-hidden="true" />
          Salir
        </button>
      ) : onBack ? (
        <button type="button" onClick={onBack} aria-label="Atrás" className="grid size-11 shrink-0 place-items-center [touch-action:manipulation] text-[var(--text-secondary)]">
          <ArrowLeft size={22} aria-hidden="true" />
        </button>
      ) : (
        <span className="size-11 shrink-0" />
      )}
      <ProgressBar pct={pct} />
      <span className="size-11 shrink-0" />
    </div>
  );
}

/* ── contenedor de pantalla del funnel: min-h-dvh, nav/CTA al fondo,
   fondo con PROFUNDIDAD (FICHA-ARTE: dispositivo ownable = mapa de expedición).
   Marca de agua muy tenue con estilo de carta antigua: graticula + rosa de los
   vientos + relieve. Sutil pero visible sin buscarlo (nota del revisor). ── */
const MAPA_EPOCA =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='320' viewBox='0 0 320 320'%3E%3Cg fill='none' stroke='%236E5B3E' stroke-opacity='0.28' stroke-width='1.2'%3E%3Cpath d='M-20 60 C80 30 180 90 340 55'/%3E%3Cpath d='M-20 150 C80 120 180 180 340 145'/%3E%3Cpath d='M-20 240 C80 210 180 270 340 235'/%3E%3Cpath d='M60 -20 C40 120 80 220 55 340'/%3E%3Cpath d='M220 -20 C200 120 240 220 215 340'/%3E%3C/g%3E%3Cg stroke='%236E5B3E' stroke-opacity='0.32' stroke-width='1' fill='none'%3E%3Ccircle cx='252' cy='250' r='26'/%3E%3Ccircle cx='252' cy='250' r='16'/%3E%3Cpath d='M252 220 L257 250 L252 280 L247 250 Z' fill='%236E5B3E' fill-opacity='0.2' stroke='none'/%3E%3Cpath d='M222 250 L252 255 L282 250 L252 245 Z' fill='%236E5B3E' fill-opacity='0.12' stroke='none'/%3E%3C/g%3E%3Cg fill='none' stroke='%236E5B3E' stroke-opacity='0.26' stroke-width='1'%3E%3Cpath d='M62 96 l12 -16 l12 16 M80 96 l12 -14 l12 14'/%3E%3Cpath d='M150 300 q6 -6 12 0 t12 0 t12 0'/%3E%3C/g%3E%3C/svg%3E\")";

export function FunnelShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto flex min-h-dvh w-full max-w-md flex-col overflow-hidden bg-[var(--bg)] text-[var(--text-primary)] [font-family:var(--font-body)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ backgroundImage: MAPA_EPOCA, backgroundRepeat: 'repeat', backgroundSize: '300px 300px' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-80"
        style={{
          background:
            'radial-gradient(340px 220px at 22% 0%, color-mix(in oklab, var(--accent) 28%, transparent), transparent 68%), radial-gradient(300px 200px at 100% 3%, color-mix(in oklab, var(--accent-2) 20%, transparent), transparent 66%)',
        }}
      />
      {children}
    </div>
  );
}

/* ── marca del funnel arriba (regla de marca de 50) + hairline degradé ── */
export function FunnelHeader({ paso }: { paso?: string }) {
  return (
    <div className="px-4 pt-4">
      <div className="flex items-center justify-between">
        <FunnelBrand />
        {paso && <span className="text-xs font-medium tabular-nums text-[var(--text-tertiary)]">{paso}</span>}
      </div>
      <hr className="mt-3 h-px border-0 bg-[linear-gradient(90deg,transparent,color-mix(in_oklab,var(--accent)_45%,transparent),transparent)]" />
    </div>
  );
}

/* ── pregunta (display bold, ≤8 palabras) + micro-copy opcional ── */
export function Pregunta({ children, hint }: { children: ReactNode; hint?: string }) {
  return (
    <div className="px-4">
      <h1 className="text-[26px] font-bold leading-[1.12] tracking-[-0.02em] text-balance text-[var(--text-primary)] [font-family:var(--font-display)]">
        {children}
      </h1>
      {hint && <p className="mt-2 text-sm text-[var(--text-secondary)]">{hint}</p>}
    </div>
  );
}

export interface Opcion {
  id: string;
  label: string;
  /** eco de un campo de FICHA-AVATAR (trazabilidad) */
  nota?: string;
  recomendada?: boolean;
}

/* ── chips de opción (selección única, auto-avance a los 300ms) ── */
export function Opciones({
  opciones,
  onPick,
  columnas = 1,
}: {
  opciones: Opcion[];
  onPick: (id: string) => void;
  columnas?: 1 | 2;
}) {
  const [sel, setSel] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const bloqueado = useRef(false);

  const pick = (id: string) => {
    if (bloqueado.current) return;
    bloqueado.current = true;
    setSel(id);
    window.setTimeout(() => onPick(id), reduce ? 0 : 520);
  };

  return (
    <div className={`mt-6 grid gap-3 px-4 ${columnas === 2 ? 'grid-cols-2' : 'grid-cols-1'}`}>
      {opciones.map((o, i) => {
        const activo = sel === o.id;
        return (
          <motion.button
            key={o.id}
            type="button"
            onClick={() => pick(o.id)}
            whileTap={{ scale: reduce ? 1 : 0.98 }}
            initial={{ opacity: 0, y: reduce ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduce ? 0 : 0.05 + i * 0.05, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={`flex min-h-[60px] items-center gap-3 rounded-xl border px-4 py-3 text-left [touch-action:manipulation] transition-shadow transition-colors ${
              activo
                ? 'border-[var(--accent)] bg-[color-mix(in_oklab,var(--accent)_10%,transparent)] shadow-[var(--shadow-1)]'
                : 'border-[color-mix(in_oklab,var(--text-tertiary)_22%,transparent)] bg-[var(--surface)] shadow-[var(--shadow-chip)]'
            }`}
          >
            <span className="flex-1 text-[15px] font-medium leading-snug">{o.label}</span>
            {o.recomendada && !activo && (
              <span className="shrink-0 rounded-full bg-[color-mix(in_oklab,var(--accent)_14%,transparent)] px-2 py-0.5 text-[11px] font-semibold text-[var(--accent)]">
                Sugerida
              </span>
            )}
            <span
              aria-hidden="true"
              className={`grid size-5 shrink-0 place-items-center rounded-full transition-opacity ${activo ? 'opacity-100' : 'opacity-0'}`}
            >
              <Check size={18} strokeWidth={2.6} color="var(--accent)" />
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}

/* ── pantalla de reconocimiento (A5): ilustración + patrón nombrado + causa + mecanismo ── */
export function Reconocimiento({
  titulo,
  cuerpo,
  visual,
  onNext,
}: {
  titulo: string;
  cuerpo: ReactNode;
  visual?: ReactNode;
  onNext: () => void;
}) {
  const reduce = useReducedMotion();
  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
  } as const;
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: reduce ? 0 : 0.08 }}
      className="flex flex-1 flex-col items-center justify-center px-6 text-center"
    >
      {visual && <motion.div variants={item} className="mb-6 w-full max-w-[300px]">{visual}</motion.div>}
      <motion.h2 variants={item} className="text-[24px] font-bold leading-tight tracking-[-0.02em] [font-family:var(--font-display)]">
        {titulo}
      </motion.h2>
      <motion.div variants={item} className="mt-3 max-w-[34ch] text-[15px] leading-relaxed text-[var(--text-secondary)]">
        {cuerpo}
      </motion.div>
      <motion.button
        variants={item}
        type="button"
        onClick={onNext}
        whileTap={{ scale: reduce ? 1 : 0.97 }}
        className="mt-8 h-[52px] w-full max-w-sm rounded-[var(--radius-button)] bg-[var(--accent)] text-[16px] font-semibold text-[var(--bg)] shadow-[0_8px_22px_color-mix(in_oklab,var(--accent)_30%,transparent)] [touch-action:manipulation]"
      >
        Continuar
      </motion.button>
    </motion.div>
  );
}

/* ── slider de compromiso (A6): valor héroe + feedback contextual que valida ── */
export function Compromiso({
  min = 1,
  max = 7,
  inicial = 5,
  unidad,
  feedback,
  ctaLabel,
  onCommit,
  footer,
}: {
  min?: number;
  max?: number;
  inicial?: number;
  unidad: string;
  feedback: (v: number) => string;
  ctaLabel: string;
  onCommit: (v: number) => void;
  footer?: ReactNode;
}) {
  const [v, setV] = useState(inicial);
  const reduce = useReducedMotion();

  // conteo animado del número héroe al montar (baseline de movimiento del SO)
  const [display, setDisplay] = useState(reduce ? inicial : 0);
  const raf = useRef(0);
  const tocado = useRef(false);
  useEffect(() => {
    if (reduce) { setDisplay(inicial); return; }
    let t0 = 0;
    const tick = (t: number) => {
      if (tocado.current) return;
      if (!t0) t0 = t;
      const p = Math.min(1, (t - t0) / 500);
      setDisplay(Math.round(inicial * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [inicial, reduce]);

  const setValor = (n: number) => { tocado.current = true; cancelAnimationFrame(raf.current); setV(n); setDisplay(n); };

  return (
    <div className="flex flex-1 flex-col px-4">
      {/* número + slider + feedback centrados en el alto disponible (sin hueco muerto) */}
      <div className="flex flex-1 flex-col justify-center">
        <div className="flex flex-col items-center">
          <span className="text-[44px] font-bold tabular-nums leading-none tracking-[-0.02em] text-[var(--text-primary)] [font-family:var(--font-display)]">
            {tocado.current ? v : display}
          </span>
          <span className="mt-1 text-sm font-medium text-[var(--text-secondary)]">{unidad}</span>
        </div>
        <input
          type="range"
          min={min}
          max={max}
          value={v}
          onChange={(e) => setValor(Number(e.target.value))}
          aria-label={`Elige un valor entre ${min} y ${max}`}
          className="mt-8 h-2 w-full cursor-pointer appearance-none rounded-full bg-[color-mix(in_oklab,var(--accent)_16%,transparent)] accent-[var(--accent)]"
        />
        <div className="mt-2 flex justify-between text-xs text-[var(--text-tertiary)]">
          <span>{min}</span>
          <span>{max}</span>
        </div>
        <p className="mt-6 rounded-[var(--radius-button)] bg-[color-mix(in_oklab,var(--accent)_8%,transparent)] px-4 py-3 text-center text-sm font-medium text-[var(--text-primary)]">
          {feedback(v)}
        </p>
      </div>
      {footer && <div className="pt-4">{footer}</div>}
      <div className="pb-[max(16px,env(safe-area-inset-bottom))] pt-4">
        <motion.button
          type="button"
          whileTap={{ scale: reduce ? 1 : 0.97 }}
          onClick={() => onCommit(v)}
          className="h-[54px] w-full rounded-[var(--radius-button)] bg-[var(--accent)] text-[16px] font-semibold text-[var(--bg)] shadow-[0_8px_24px_color-mix(in_oklab,var(--accent)_30%,transparent)] [touch-action:manipulation]"
        >
          {ctaLabel}
        </motion.button>
      </div>
    </div>
  );
}

/* ── ritual "mantén presionado" pre-paywall (C3bis, patrón Flo — justificado en hábito) ── */
export function HoldToCommit({ pregunta, onDone }: { pregunta: string; onDone: () => void }) {
  const reduce = useReducedMotion();
  const [p, setP] = useState(0);
  const raf = useRef(0);
  const start = useRef(0);
  const done = useRef(false);
  const DUR = 1000;

  const tick = (t: number) => {
    if (!start.current) start.current = t;
    const frac = Math.min(1, (t - start.current) / DUR);
    setP(frac);
    if (frac >= 1 && !done.current) {
      done.current = true;
      onDone();
      return;
    }
    raf.current = requestAnimationFrame(tick);
  };
  const begin = () => {
    if (done.current) return;
    if (reduce) {
      done.current = true;
      onDone();
      return;
    }
    start.current = 0;
    raf.current = requestAnimationFrame(tick);
  };
  const cancel = () => {
    cancelAnimationFrame(raf.current);
    start.current = 0;
    if (!done.current) setP(0);
  };
  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
      <h2 className="text-[24px] font-bold leading-tight tracking-[-0.02em] [font-family:var(--font-display)]">{pregunta}</h2>
      <button
        type="button"
        onPointerDown={begin}
        onPointerUp={cancel}
        onPointerLeave={cancel}
        onPointerCancel={cancel}
        aria-label="Mantén presionado para empezar tu Ruta"
        className="relative mt-10 grid size-32 place-items-center rounded-full border-2 border-[color-mix(in_oklab,var(--accent)_35%,transparent)] [touch-action:none]"
        style={{ background: `conic-gradient(var(--accent) ${p * 360}deg, transparent 0)` }}
      >
        <span className="grid size-[104px] place-items-center rounded-full bg-[var(--bg)] px-4 text-[13px] font-semibold text-[var(--text-primary)]">
          Mantén presionado
        </span>
      </button>
      <p className="mt-6 text-xs text-[var(--text-tertiary)]">Un gesto para empezar con intención.</p>
    </div>
  );
}
