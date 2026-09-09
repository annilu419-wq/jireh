'use client';

// FUNNEL — La primera victoria + el paywall de secuencia (C0 de 50): 3 pantallas,
// cada una hace UN trabajo. Recap personalizado → timeline del trial → precio.
// Copy derivado de FICHA-AVATAR (mecanismo "la Ruta"; dolor #5 "empiezo y abandono";
// deseo #1 "toda la Biblia como un mapa"). El pago es SIMULADO (Hotmart en Sesión 6).

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, Check, X, ShieldCheck, BellRing, Loader2, RotateCw } from 'lucide-react';
import { FunnelBrand } from './ui';
import { EscenaContexto } from '@/components/app/EscenasContexto';

export interface Respuestas {
  inicio: string; // "los Evangelios" | "Génesis" | ...
  momento: string; // "cada mañana" | ...
  dias: number;
}

/* conteo animado para números héroe (baseline de movimiento del SO) */
function CountUp({ value, decimals = 0, prefix = '' }: { value: number; decimals?: number; prefix?: string }) {
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? value : 0);
  const raf = useRef(0);
  useEffect(() => {
    if (reduce) { setN(value); return; }
    const dur = 650;
    let t0 = 0;
    const tick = (t: number) => {
      if (!t0) t0 = t;
      const p = Math.min(1, (t - t0) / dur);
      setN(value * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [value, reduce]);
  return <>{prefix}{n.toFixed(decimals)}</>;
}

function CheckRow({ children, i = 0 }: { children: ReactNode; i?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.li
      initial={{ opacity: 0, y: reduce ? 0 : 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: reduce ? 0 : 0.15 + i * 0.07, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-start gap-3 text-[15px] leading-snug text-[var(--text-primary)]"
    >
      <span aria-hidden="true" className="mt-0.5 grid size-[22px] shrink-0 place-items-center rounded-full bg-[color-mix(in_oklab,var(--accent)_12%,transparent)]">
        <Check size={13} strokeWidth={2.6} color="var(--accent)" />
      </span>
      <span>{children}</span>
    </motion.li>
  );
}

/* tarjeta de plan — misma caja/radio/estado para ambos; el recomendado se
   distingue SOLO por el borde-degradé y el badge (nota del revisor) */
function PlanCard({
  sel, onSelect, nombre, precio, sub, badge, i,
}: {
  sel: boolean;
  onSelect: () => void;
  nombre: string;
  precio: ReactNode;
  sub: string;
  badge?: string;
  i: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileTap={{ scale: reduce ? 1 : 0.98 }}
      initial={{ opacity: 0, y: reduce ? 0 : 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: reduce ? 0 : 0.34 + i * 0.08, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      aria-pressed={sel}
      className="relative w-full rounded-xl p-[2px] text-left shadow-[var(--shadow-chip)] [touch-action:manipulation]"
      style={{
        background: sel
          ? 'linear-gradient(135deg, color-mix(in oklab, var(--accent) 70%, transparent), color-mix(in oklab, var(--accent) 14%, transparent) 70%)'
          : 'color-mix(in oklab, var(--text-tertiary) 30%, transparent)',
      }}
    >
      {badge && (
        <span className="absolute -top-2.5 left-4 z-10 rounded-full bg-[var(--accent-2)] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[var(--text-primary)]">
          {badge}
        </span>
      )}
      <span className={`block rounded-[10px] p-4 ${sel ? 'bg-[color-mix(in_oklab,var(--accent)_6%,var(--surface))]' : 'bg-[var(--surface)]'}`}>
        <span className="flex items-baseline justify-between">
          <span className="text-[15px] font-semibold">{nombre}</span>
          <span className="text-[22px] font-bold tabular-nums [font-family:var(--font-display)]">{precio}</span>
        </span>
        <span className="mt-1 block text-xs text-[var(--text-secondary)]">{sub}</span>
      </span>
    </motion.button>
  );
}

/* ── AHA: la primera victoria — Marcos 4 ya explicado, ANTES del precio ── */
export function PrimeraVictoria({ onNext, onBack }: { onNext: () => void; onBack?: () => void }) {
  const reduce = useReducedMotion();
  const cont = {
    hidden: {},
    visible: { transition: { staggerChildren: reduce ? 0 : 0.07 } },
  } as const;
  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const } },
  } as const;

  return (
    <div className="flex flex-1 flex-col px-4">
      <div className="flex items-center gap-1 px-1 pt-3">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            aria-label="Volver"
            className="-ml-1 grid size-9 place-items-center rounded-full text-[var(--text-secondary)] [touch-action:manipulation]"
          >
            <ArrowLeft size={18} aria-hidden="true" />
          </button>
        )}
        <FunnelBrand />
      </div>

      <motion.div variants={cont} initial="hidden" animate="visible" className="mt-6 flex flex-1 flex-col">
        <motion.div variants={item}>
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--accent)]">Tu primera lectura</p>
          <h1 className="mt-2 text-[26px] font-bold leading-[1.12] tracking-[-0.02em] [font-family:var(--font-display)]">
            Así te explica Yireth <span className="text-[var(--accent)]">cada capítulo</span>
          </h1>
        </motion.div>

        <motion.div
          variants={item}
          className="mt-5 overflow-hidden rounded-[var(--radius-card)] border border-[color-mix(in_oklab,var(--accent)_20%,transparent)] bg-[var(--surface)] shadow-[var(--shadow-1)]"
        >
          <div className="p-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--accent)]">Contexto · 30 segundos</p>
            <p className="mt-1 text-[18px] font-bold [font-family:var(--font-display)]">Marcos 4 — El sembrador</p>
            <div className="mt-3 flex gap-2">
              {[
                ['Autor', 'Juan Marcos'],
                ['Época', '~55 d.C.'],
                ['Lugar', 'Galilea'],
              ].map(([k, v]) => (
                <div key={k} className="flex-1 rounded-xl border border-[color-mix(in_oklab,var(--text-tertiary)_20%,transparent)] bg-[var(--bg)] px-2 py-2 text-center">
                  <p className="text-[9px] font-bold uppercase tracking-wide text-[var(--text-tertiary)]">{k}</p>
                  <p className="mt-0.5 text-xs font-bold leading-tight">{v}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="border-y border-[color-mix(in_oklab,var(--text-tertiary)_12%,transparent)] [&>div>svg]:block [&>div>svg]:h-auto [&>div>svg]:w-full">
            <EscenaContexto escena="agua" />
          </div>
          <p className="px-4 pb-3 pt-2.5 text-xs font-medium leading-snug text-[var(--text-secondary)]">
            La escena: Jesús enseña desde una barca a la orilla del mar de Galilea.
          </p>
        </motion.div>

        <motion.div variants={item} className="mt-6">
          <p className="text-[13px] font-bold uppercase tracking-[0.08em] text-[var(--accent)]">El relato</p>
          <div className="mt-2 space-y-2.5 text-[15px] leading-relaxed text-[var(--text-primary)]">
            <p>Se junta tanta gente junto al mar que Jesús se sube a una barca para que todos lo escuchen.</p>
            <p>Desde ahí cuenta la parábola del sembrador: una misma semilla cae en el camino, entre piedras, entre espinos y en buena tierra. Solo en uno de los cuatro terrenos da fruto.</p>
            <p className="font-semibold">No habla de agricultura: habla de cómo recibes tú la palabra hoy.</p>
          </div>
        </motion.div>

        <motion.div variants={item} className="mt-6">
          <p className="text-[13px] font-bold text-[var(--text-primary)]">Qué te quiso decir Jesús</p>
          <ul className="mt-2 space-y-2">
            <CheckRow>La palabra es la semilla; tu corazón es la tierra.</CheckRow>
            <CheckRow>Lo que ahoga tu fe son los afanes del día, no la falta de tiempo.</CheckRow>
            <CheckRow>Lo sembrado con paciencia da fruto al ciento por uno.</CheckRow>
          </ul>
        </motion.div>

        <motion.div variants={item} className="mt-8 pb-[max(16px,env(safe-area-inset-bottom))] pt-2">
          <motion.button
            type="button"
            whileTap={{ scale: reduce ? 1 : 0.97 }}
            onClick={onNext}
            className="h-[54px] w-full rounded-[var(--radius-button)] bg-[var(--accent)] text-[16px] font-semibold text-[var(--bg)] shadow-[0_8px_24px_color-mix(in_oklab,var(--accent)_30%,transparent)] [touch-action:manipulation]"
          >
            Ver mi Ruta completa
          </motion.button>
          <p className="mt-2 text-center text-xs text-[var(--text-secondary)]">Así es cada uno de los 66 libros, en orden.</p>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ── PAYWALL P1 — recap del valor personalizado ── */
export function PaywallRecap({ r, onNext }: { r: Respuestas; onNext: () => void }) {
  const reduce = useReducedMotion();
  return (
    <div className="flex flex-1 flex-col px-4">
      <div className="px-1 pt-3"><FunnelBrand /></div><hr className="mt-2 h-px border-0 bg-[linear-gradient(90deg,transparent,color-mix(in_oklab,var(--accent)_45%,transparent),transparent)]" />
      <motion.div
        initial={{ opacity: 0, y: reduce ? 0 : 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mt-6"
      >
        <h1 className="text-[27px] font-bold leading-[1.12] tracking-[-0.02em] [font-family:var(--font-display)]">
          Tu <span className="text-[var(--accent)]">Ruta</span> está lista
        </h1>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          Empiezas por {r.inicio} · {r.dias} días por semana · te avisamos {r.momento}
        </p>
      </motion.div>

      <ul className="mt-6 space-y-3.5">
        <CheckRow>Toda la Biblia en orden — tu Ruta por los 66 libros</CheckRow>
        <CheckRow>El contexto y la enseñanza de cada capítulo, en 5 minutos</CheckRow>
        <CheckRow>Tu diario de oración y tu racha, para no soltar el hábito</CheckRow>
        <CheckRow>Modo Crisis y una Cápsula de la noche para los días difíciles</CheckRow>
      </ul>

      <div className="mt-auto pb-[max(16px,env(safe-area-inset-bottom))] pt-6">
        <motion.button
          type="button"
          whileTap={{ scale: reduce ? 1 : 0.97 }}
          onClick={onNext}
          className="h-[54px] w-full rounded-[var(--radius-button)] bg-[var(--accent)] text-[16px] font-semibold text-[var(--bg)] shadow-[0_8px_24px_color-mix(in_oklab,var(--accent)_30%,transparent)] [touch-action:manipulation]"
        >
          Continuar
        </motion.button>
      </div>
    </div>
  );
}

/* ── PAYWALL P2 — timeline del trial (C4, patrón Blinkist) + opt-in del aviso ── */
export function PaywallTimeline({ onNext }: { onNext: () => void }) {
  const reduce = useReducedMotion();
  const [aviso, setAviso] = useState(true);
  const nodos = [
    { on: true, t: 'Hoy — acceso completo', s: 'Toda tu Ruta, sin límites' },
    { on: true, t: 'Día 6 — te avisamos', s: 'Un correo antes de cualquier cobro' },
    { on: false, t: 'Día 7 — primer cobro: $29.99/año', s: 'Cancela antes sin costo' },
  ];
  return (
    <div className="flex flex-1 flex-col px-4">
      <div className="px-1 pt-3"><FunnelBrand /></div><hr className="mt-2 h-px border-0 bg-[linear-gradient(90deg,transparent,color-mix(in_oklab,var(--accent)_45%,transparent),transparent)]" />
      <motion.h1
        initial={{ opacity: 0, y: reduce ? 0 : 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mt-6 text-[26px] font-bold leading-[1.12] tracking-[-0.02em] [font-family:var(--font-display)]"
      >
        Cómo funciona tu <span className="text-[var(--accent)]">prueba</span>
      </motion.h1>

      <ol className="mt-7 space-y-0">
        {nodos.map((n, i) => (
          <li key={i} className="relative flex gap-4 pb-7 last:pb-0">
            {i < nodos.length - 1 && (
              <span aria-hidden="true" className="absolute left-[7px] top-4 h-full w-0.5 bg-[color-mix(in_oklab,var(--accent)_25%,transparent)]" />
            )}
            <span
              aria-hidden="true"
              className={`relative z-10 mt-0.5 size-4 shrink-0 rounded-full ${
                n.on ? 'bg-[var(--accent)]' : 'border-2 border-[color-mix(in_oklab,var(--text-tertiary)_50%,transparent)] bg-[var(--bg)]'
              }`}
            />
            <div>
              <p className="text-[15px] font-semibold">{n.t}</p>
              <p className="mt-0.5 text-[13px] text-[var(--text-secondary)]">{n.s}</p>
            </div>
          </li>
        ))}
      </ol>

      <button
        type="button"
        onClick={() => setAviso((v) => !v)}
        aria-pressed={aviso}
        className="mt-2 flex items-center gap-3 rounded-[var(--radius-button)] border border-[color-mix(in_oklab,var(--text-tertiary)_25%,transparent)] bg-[var(--surface)] px-4 py-3 text-left [touch-action:manipulation]"
      >
        <BellRing size={18} color="var(--accent)" aria-hidden="true" />
        <span className="flex-1 text-[13px] font-medium">Avísame por correo el día 6, antes del cobro</span>
        <span className={`h-5 w-9 shrink-0 rounded-full p-0.5 transition-colors ${aviso ? 'bg-[var(--accent)]' : 'bg-[color-mix(in_oklab,var(--text-tertiary)_35%,transparent)]'}`}>
          <span className={`block size-4 rounded-full bg-white transition-transform ${aviso ? 'translate-x-4' : ''}`} />
        </span>
      </button>

      <div className="mt-auto pb-[max(16px,env(safe-area-inset-bottom))] pt-6">
        <motion.button
          type="button"
          whileTap={{ scale: reduce ? 1 : 0.97 }}
          onClick={onNext}
          className="h-[54px] w-full rounded-[var(--radius-button)] bg-[var(--accent)] text-[16px] font-semibold text-[var(--bg)] shadow-[0_8px_24px_color-mix(in_oklab,var(--accent)_30%,transparent)] [touch-action:manipulation]"
        >
          Elegir mi plan
        </motion.button>
      </div>
    </div>
  );
}

/* ── PAYWALL P3 — precio (C1). Salida limpia sin culpa. Pago simulado. ── */
export function PaywallPrecio({ onPay, onDecline, onBack }: { onPay: () => void; onDecline: () => void; onBack?: () => void }) {
  const reduce = useReducedMotion();
  const [plan, setPlan] = useState<'anual' | 'mensual'>('anual');
  const [pago, setPago] = useState<'idle' | 'enviando' | 'error'>('idle');
  const timer = useRef(0);
  const fallo = useRef(0);
  useEffect(() => () => { window.clearTimeout(timer.current); window.clearTimeout(fallo.current); }, []);

  const pagar = () => {
    if (pago === 'enviando') return;
    setPago('enviando');
    // pago SIMULADO (Hotmart en Sesión 6): abre el checkout tras un instante.
    timer.current = window.setTimeout(() => {
      try {
        onPay();
      } catch {
        window.clearTimeout(fallo.current);
        setPago('error');
      }
    }, 750);
    // red de seguridad: si el checkout no abre a tiempo, error recuperable.
    fallo.current = window.setTimeout(() => setPago('error'), 3500);
  };

  return (
    <div className="flex flex-1 flex-col px-4">
      <div className="flex items-center justify-between px-1 pt-3">
        {onBack ? (
          <button type="button" onClick={onBack} aria-label="Atrás" className="grid size-11 place-items-center text-[var(--text-secondary)] [touch-action:manipulation]">
            <ArrowLeft size={22} aria-hidden="true" />
          </button>
        ) : (
          <span className="size-11" />
        )}
        <FunnelBrand />
        <button type="button" onClick={onDecline} aria-label="Cerrar" className="grid size-11 place-items-center text-[var(--text-secondary)] [touch-action:manipulation]">
          <X size={22} aria-hidden="true" />
        </button>
      </div>
      <hr className="mt-2 h-px border-0 bg-[linear-gradient(90deg,transparent,color-mix(in_oklab,var(--accent)_45%,transparent),transparent)]" />

      <motion.div
        initial={{ opacity: 0, y: reduce ? 0 : 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mt-4"
      >
        <h1 className="text-[26px] font-bold leading-[1.12] tracking-[-0.02em] [font-family:var(--font-display)]">
          No dejes tu <span className="text-[var(--accent)]">Ruta</span> a medias
        </h1>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          Esta vez no la vas a abandonar a los cuatro días: son 5 minutos al día, en orden y sin culpa.
        </p>
      </motion.div>

      <ul className="mt-5 space-y-2.5">
        <CheckRow i={0}>Los 66 libros en orden, con contexto y enseñanza</CheckRow>
        <CheckRow i={1}>Modo audio para escuchar en 3 minutos</CheckRow>
        <CheckRow i={2}>Diario de oración, Modo Crisis y Cápsula de la noche</CheckRow>
      </ul>

      {/* bloque de planes asentado sobre superficie hundida (profundidad de 3 niveles) */}
      <div className="mt-5 rounded-[var(--radius-card)] bg-[var(--surface-2)] p-3 shadow-[inset_0_1px_2px_rgb(47_60_74_/_0.08)] ring-1 ring-inset ring-[color-mix(in_oklab,var(--text-tertiary)_12%,transparent)]">
        {/* eco de la Ruta — mapa de expedición (dispositivo ownable) */}
        <div className="flex items-center gap-2 px-1">
          <svg viewBox="0 0 300 48" className="h-10 flex-1" aria-hidden="true">
            <g fill="none" stroke="color-mix(in oklab, var(--text-tertiary) 22%, transparent)" strokeWidth="1">
              <path d="M-10 14 C70 4 150 24 320 8" />
              <path d="M-10 38 C70 28 150 46 320 30" />
            </g>
            <path d="M12 34 C70 12 100 40 156 18 C214 -4 246 34 288 10" fill="none" stroke="color-mix(in oklab, var(--text-tertiary) 45%, transparent)" strokeWidth="2.4" strokeLinecap="round" strokeDasharray="1 7" />
            <motion.path
              d="M12 34 C70 12 100 40 156 18 C214 -4 246 34 288 10"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: reduce ? 0.44 : 0 }}
              animate={{ pathLength: 0.44 }}
              transition={{ duration: reduce ? 0 : 0.9, ease: [0.16, 1, 0.3, 1], delay: reduce ? 0 : 0.3 }}
            />
            <g stroke="var(--accent)" strokeWidth="2.2" strokeLinecap="round"><path d="M84 20 l6 6 M90 20 l-6 6" /></g>
            <g transform="translate(12 34)">
              <circle r="4.5" fill="var(--bg)" stroke="var(--accent)" strokeWidth="2.4" />
              <path d="M0 -4.5 L0 -14 L8 -11 L0 -8 Z" fill="var(--accent)" />
            </g>
            <circle cx="156" cy="18" r="4.5" fill="var(--accent)" />
            <g transform="translate(288 10)" stroke="color-mix(in oklab, var(--text-tertiary) 55%, transparent)" fill="none">
              <circle r="7" strokeWidth="1" />
              <path d="M0 -9 L2 0 L0 9 L-2 0 Z" fill="color-mix(in oklab, var(--text-tertiary) 55%, transparent)" stroke="none" />
              <path d="M-9 0 L0 2 L9 0 L0 -2 Z" fill="color-mix(in oklab, var(--text-tertiary) 40%, transparent)" stroke="none" />
            </g>
          </svg>
          <span className="shrink-0 whitespace-nowrap text-[11px] font-medium text-[var(--text-tertiary)]">tu Ruta te espera</span>
        </div>

        <div className="mt-3 space-y-3">
          <PlanCard
            i={0}
            sel={plan === 'anual'}
            onSelect={() => setPlan('anual')}
            nombre="Anual"
            badge="Mejor valor"
            precio={<><CountUp value={2.49} decimals={2} prefix="$" /><span className="text-xs font-medium text-[var(--text-secondary)]">/mes</span></>}
            sub="Se cobra $29.99/año · pagas 4 meses, tienes 12"
          />
          <PlanCard
            i={1}
            sel={plan === 'mensual'}
            onSelect={() => setPlan('mensual')}
            nombre="Mensual"
            precio={<><CountUp value={6.99} decimals={2} prefix="$" /><span className="text-xs font-medium text-[var(--text-secondary)]">/mes</span></>}
            sub="7 días gratis · cancelas cuando quieras"
          />
        </div>

        <p className="mt-3 text-center text-xs text-[var(--text-tertiary)]">
          Con el plan anual: hoy $0 · el día 7 se cobra $29.99/año · cancelas antes sin costo.
        </p>
      </div>

      <div className="mt-auto pb-[max(16px,env(safe-area-inset-bottom))] pt-4">
        <AnimatePresence>
          {pago === 'error' && (
            <motion.div
              role="alert"
              initial={{ opacity: 0, y: reduce ? 0 : 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="mb-3 flex items-center gap-3 rounded-xl border border-[color-mix(in_oklab,var(--error)_40%,transparent)] bg-[color-mix(in_oklab,var(--error)_8%,transparent)] px-4 py-3 text-sm text-[var(--text-primary)]"
            >
              <span className="flex-1">No se pudo abrir el pago. Revisa tu conexión.</span>
              <button
                type="button"
                onClick={() => { setPago('idle'); pagar(); }}
                className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[var(--accent)] px-3 py-1.5 text-xs font-semibold text-[var(--bg)] [touch-action:manipulation]"
              >
                <RotateCw size={13} aria-hidden="true" />
                Reintentar
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        <motion.button
          type="button"
          whileTap={{ scale: reduce || pago === 'enviando' ? 1 : 0.97 }}
          onClick={pagar}
          disabled={pago === 'enviando'}
          aria-busy={pago === 'enviando'}
          className="flex h-[54px] w-full items-center justify-center gap-2 rounded-[var(--radius-button)] bg-[var(--accent)] text-[16px] font-semibold text-[var(--bg)] shadow-[0_8px_24px_color-mix(in_oklab,var(--accent)_30%,transparent)] [touch-action:manipulation] disabled:opacity-80"
        >
          {pago === 'enviando' ? (
            <>
              <Loader2 size={18} className="animate-spin" aria-hidden="true" />
              Abriendo el pago seguro…
            </>
          ) : (
            'Empezar mis 7 días gratis'
          )}
        </motion.button>
        <p className="mt-2.5 text-center text-xs text-[var(--text-secondary)]">
          Menos de <span className="font-semibold text-[var(--text-primary)]">$0.09 al día</span> · aviso el día 6 · cancelas en 1 tap
        </p>
        <p className="mt-2 flex items-center justify-center gap-1.5 text-center text-xs text-[var(--text-tertiary)]">
          <ShieldCheck size={13} aria-hidden="true" />
          La Garantía Sin Letra Chica · 30 días · Pago seguro por Hotmart
        </p>
        <button type="button" onClick={onDecline} className="mx-auto mt-2 block py-2 text-xs text-[var(--text-tertiary)] [touch-action:manipulation]">
          Ahora no
        </button>
      </div>
    </div>
  );
}
