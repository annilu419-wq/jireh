'use client';

// Lector de capítulo — el texto bíblico completo (Reina-Valera 1909, dominio
// público, importado con scripts/importar-biblia.mjs a public/biblia/<slug>.json).
// Primera pantalla de tipo "lector de texto largo" → lleva revisor-visual.
// Cuerpo en Sora (FICHA-ARTE: una sola familia); tamaño ajustable y persistido;
// teclas ←/→ entre capítulos; salto directo a cualquier capítulo; recuerda la
// posición de lectura en la sesión.

import { use, useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, ChevronLeft, ChevronRight, ChevronDown, Loader2, RotateCw, WifiOff, X } from 'lucide-react';
import { AppShell, TopBar } from '@/components/app/ui';
import { getLibro } from '@/lib/biblia';
import { RACHA_ACTUAL } from '@/lib/contenido';

const EASE = [0.22, 1, 0.3, 1] as const;
const TAMANOS = [
  { px: 15, lh: 1.72 },
  { px: 17, lh: 1.8 },
  { px: 19, lh: 1.85 },
  { px: 21, lh: 1.9 },
] as const;

const MotionLink = motion.create(Link);

// trama de cartografía tenue (curvas de nivel + puntos) — 3er plano del fondo,
// eco del mapa. FICHA-ARTE: trama al 3-5%.
const TRAMA_MAPA =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cg fill='none' stroke='%236E5B3E' stroke-opacity='0.5' stroke-width='0.8'%3E%3Cpath d='M-10 24 C30 12 70 34 130 20'/%3E%3Cpath d='M-10 66 C30 54 70 76 130 62'/%3E%3Cpath d='M-10 108 C30 96 70 118 130 104'/%3E%3C/g%3E%3Cg fill='%236E5B3E' fill-opacity='0.4'%3E%3Ccircle cx='16' cy='44' r='1'/%3E%3Ccircle cx='92' cy='30' r='1'/%3E%3Ccircle cx='58' cy='90' r='1'/%3E%3C/g%3E%3C/svg%3E\")";

// Ornamento del lector — el "sendero" del mapa de expedición con estaciones y una
// rosa de los vientos. Deliberado y visible a 375px (no marca de agua): es el eco
// del dispositivo ownable dentro del lienzo del lector.
function SenderoOrnamento() {
  const T = 'color-mix(in oklab, var(--text-tertiary) 75%, transparent)';
  return (
    <svg viewBox="0 0 300 26" className="mt-2 h-6 w-full max-w-[280px]" fill="none" aria-hidden="true">
      <path
        d="M4 18 C40 6 70 20 110 12 C150 4 182 20 222 12 C252 6 276 12 296 8"
        stroke={T}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeDasharray="1 5"
      />
      <circle cx="4" cy="18" r="2.6" fill="none" stroke={T} strokeWidth="1.6" />
      <circle cx="110" cy="12" r="2.6" fill="none" stroke={T} strokeWidth="1.6" />
      <circle cx="222" cy="12" r="3.6" fill="var(--accent)" />
      <g transform="translate(288 9)" stroke={T} fill="none" strokeWidth="1">
        <circle r="6" />
        <path d="M0 -9 L1.6 0 L0 9 L-1.6 0 Z" fill={T} stroke="none" />
        <path d="M-9 0 L0 1.4 L9 0 L0 -1.4 Z" fill={T} stroke="none" />
      </g>
    </svg>
  );
}

export default function CapituloPage({
  params,
}: {
  params: Promise<{ slug: string; capitulo: string }>;
}) {
  const { slug, capitulo } = use(params);
  const router = useRouter();
  const libro = getLibro(slug);
  const cap = Number(capitulo);
  const reduce = useReducedMotion();

  const [versos, setVersos] = useState<string[] | null>(null);
  const [estado, setEstado] = useState<'cargando' | 'ok' | 'error'>('cargando');
  const [sinRed, setSinRed] = useState(false);
  const [nivel, setNivel] = useState(1);
  const [yendo, setYendo] = useState(false);
  const [tips, setTips] = useState(false);
  const [picker, setPicker] = useState(false);
  const restauro = useRef(false);

  const valido = !!libro && Number.isInteger(cap) && cap >= 1 && cap <= (libro?.capitulos ?? 0);
  const prev = valido && cap > 1 ? cap - 1 : null;
  const next = valido && libro && cap < libro.capitulos ? cap + 1 : null;
  const claveScroll = `lector:pos:${slug}:${cap}`;

  const marcarTipsVistos = useCallback(() => {
    setTips(false);
    try {
      localStorage.setItem('lector:tips', '1');
    } catch {
      /* sin storage */
    }
  }, []);

  useEffect(() => {
    try {
      const g = Number(localStorage.getItem('lector:nivel'));
      if (Number.isInteger(g) && g >= 0 && g < TAMANOS.length) setNivel(g);
      if (!localStorage.getItem('lector:tips')) setTips(true);
    } catch {
      /* sin storage */
    }
  }, []);

  const cambiarNivel = (d: number) => {
    marcarTipsVistos();
    setNivel((n) => {
      const v = Math.min(TAMANOS.length - 1, Math.max(0, n + d));
      try {
        localStorage.setItem('lector:nivel', String(v));
      } catch {
        /* sin storage */
      }
      return v;
    });
  };

  const cargar = useCallback(() => {
    if (!valido) return;
    let vivo = true;
    setEstado('cargando');
    fetch(`/biblia/${slug}.json`)
      .then((r) => {
        if (!r.ok) throw new Error('http');
        return r.json();
      })
      .then((data: Record<string, string[]>) => {
        if (!vivo) return;
        const v = data[String(cap)];
        if (!v) throw new Error('sin capítulo');
        setVersos(v);
        setEstado('ok');
      })
      .catch(() => {
        if (!vivo) return;
        setSinRed(typeof navigator !== 'undefined' && !navigator.onLine);
        setEstado('error');
      });
    return () => {
      vivo = false;
    };
  }, [slug, cap, valido]);

  useEffect(() => cargar(), [cargar]);

  // reintento automático al volver la conexión
  useEffect(() => {
    const alVolver = () => {
      setSinRed(false);
      if (estado === 'error') cargar();
    };
    window.addEventListener('online', alVolver);
    return () => window.removeEventListener('online', alVolver);
  }, [estado, cargar]);

  // teclado ← / → entre capítulos
  useEffect(() => {
    if (!valido) return;
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      if (el && /INPUT|TEXTAREA|SELECT/.test(el.tagName)) return;
      if (e.key === 'ArrowLeft' && prev) {
        marcarTipsVistos();
        setYendo(true);
        router.push(`/app/biblia/${slug}/${prev}`);
      }
      if (e.key === 'ArrowRight' && next) {
        marcarTipsVistos();
        setYendo(true);
        router.push(`/app/biblia/${slug}/${next}`);
      }
      if (e.key === 'Escape') setPicker(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [slug, prev, next, valido, router, marcarTipsVistos]);

  useEffect(() => {
    if (estado !== 'ok') return;
    if (!restauro.current) {
      restauro.current = true;
      try {
        const y = Number(sessionStorage.getItem(claveScroll));
        if (y > 0) window.scrollTo(0, y);
      } catch {
        /* sin storage */
      }
    }
    let t = 0;
    const onScroll = () => {
      window.clearTimeout(t);
      t = window.setTimeout(() => {
        try {
          sessionStorage.setItem(claveScroll, String(Math.round(window.scrollY)));
        } catch {
          /* sin storage */
        }
      }, 200);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.clearTimeout(t);
    };
  }, [estado, claveScroll]);

  if (!valido || !libro) notFound();

  const tam = TAMANOS[nivel];
  const irACapitulo = () => {
    marcarTipsVistos();
    setYendo(true);
  };

  return (
    <AppShell>
      <TopBar streak={RACHA_ACTUAL} />

      {/* 3er plano del fondo: resplandor de acento + trama de mapa (FICHA-ARTE) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage: `radial-gradient(420px 240px at 12% -2%, color-mix(in oklab, var(--accent) 9%, transparent), transparent 72%), ${TRAMA_MAPA}`,
          backgroundRepeat: 'no-repeat, repeat',
          backgroundSize: 'auto, 120px 120px',
        }}
      />

      {/* fila 1 · volver + tamaño */}
      <div className="flex items-center justify-between gap-3 px-4 pt-3">
        <Link
          href={`/app/biblia/${slug}`}
          className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-[var(--text-secondary)] transition-transform [touch-action:manipulation] active:scale-[0.98]"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          {libro.nombre}
        </Link>
        <div className="inline-flex items-center rounded-full border border-[color-mix(in_oklab,var(--text-tertiary)_22%,transparent)] bg-[var(--surface)]">
          <button
            type="button"
            onClick={() => cambiarNivel(-1)}
            disabled={nivel === 0}
            aria-label="Reducir el tamaño del texto"
            className="grid h-9 w-11 place-items-center rounded-l-full text-[14px] font-bold text-[var(--text-secondary)] [touch-action:manipulation] disabled:text-[color-mix(in_oklab,var(--text-tertiary)_45%,transparent)]"
          >
            A−
          </button>
          <span aria-hidden="true" className="h-5 w-px bg-[color-mix(in_oklab,var(--text-tertiary)_22%,transparent)]" />
          <button
            type="button"
            onClick={() => cambiarNivel(1)}
            disabled={nivel === TAMANOS.length - 1}
            aria-label="Aumentar el tamaño del texto"
            className="grid h-9 w-11 place-items-center rounded-r-full text-[14px] font-bold text-[var(--text-secondary)] [touch-action:manipulation] disabled:text-[color-mix(in_oklab,var(--text-tertiary)_45%,transparent)]"
          >
            A+
          </button>
        </div>
      </div>

      {/* fila 2 · título (salta a cualquier capítulo) + versión */}
      <header className="mt-2 px-4">
        <button
          type="button"
          onClick={() => setPicker((v) => !v)}
          aria-expanded={picker}
          className="inline-flex items-center gap-1.5 text-[28px] font-bold leading-tight tracking-[-0.02em] [font-family:var(--font-display)] [touch-action:manipulation]"
        >
          {libro.nombre} {cap}
          <ChevronDown
            size={22}
            aria-hidden="true"
            className={`mt-1 text-[var(--text-tertiary)] transition-transform ${picker ? 'rotate-180' : ''}`}
          />
        </button>

        <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--text-tertiary)]">
          Reina-Valera 1909
        </p>
        <SenderoOrnamento />

        <AnimatePresence initial={false}>
          {picker && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.24, ease: EASE }}
              className="overflow-hidden"
            >
              <div className="mt-3 rounded-[var(--radius-card)] border border-[color-mix(in_oklab,var(--text-tertiary)_12%,transparent)] bg-[var(--surface)] p-3 shadow-[var(--shadow-1)]">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--text-tertiary)]">Ir a un capítulo</p>
                  <button
                    type="button"
                    onClick={() => setPicker(false)}
                    className="grid size-7 place-items-center rounded-full text-[var(--text-tertiary)] [touch-action:manipulation] hover:text-[var(--text-secondary)]"
                    aria-label="Cerrar la lista de capítulos"
                  >
                    <X size={16} aria-hidden="true" />
                  </button>
                </div>
                <div className="grid grid-cols-6 gap-1.5">
                {Array.from({ length: libro.capitulos }, (_, i) => i + 1).map((n) =>
                  n === cap ? (
                    <span
                      key={n}
                      aria-current="page"
                      className="grid h-9 place-items-center rounded-[var(--radius-button)] bg-[var(--accent)] text-sm font-bold tabular-nums text-[var(--bg)]"
                    >
                      {n}
                    </span>
                  ) : (
                    <Link
                      key={n}
                      href={`/app/biblia/${slug}/${n}`}
                      onClick={irACapitulo}
                      className="grid h-9 place-items-center rounded-[var(--radius-button)] text-sm font-semibold tabular-nums text-[var(--text-secondary)] [touch-action:manipulation] hover:bg-[color-mix(in_oklab,var(--accent)_10%,transparent)] hover:text-[var(--accent)]"
                    >
                      {n}
                    </Link>
                  ),
                )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <details className="group mt-2" onToggle={marcarTipsVistos}>
          <summary className="inline-flex cursor-pointer list-none items-center gap-1 text-xs font-semibold text-[var(--text-secondary)] [touch-action:manipulation]">
            Sobre esta versión y cómo leer
            <ChevronRight size={13} aria-hidden="true" className="transition-transform group-open:rotate-90" />
          </summary>
          <p className="mt-1.5 text-xs leading-relaxed text-[var(--text-tertiary)]">
            La Reina-Valera 1909 es una traducción clásica de uso libre; conserva palabras antiguas
            como «empero» o «he aquí», con el mismo sentido que una Biblia de hoy. Ajusta el tamaño de
            la letra con <span className="font-semibold text-[var(--text-secondary)]">A− / A+</span>;
            en computador cambias de capítulo con las flechas{' '}
            <span className="font-semibold text-[var(--text-secondary)]">← →</span>.
          </p>
        </details>
      </header>

      <div className="mt-4 flex flex-1 flex-col px-4 pb-4">
        <div
          className="rounded-[var(--radius-card)] border border-transparent p-5 shadow-[var(--shadow-card)]"
          style={{
            background:
              'linear-gradient(var(--surface), var(--surface)) padding-box, linear-gradient(160deg, color-mix(in oklab, var(--accent) 32%, transparent), color-mix(in oklab, var(--accent) 6%, transparent) 55%, color-mix(in oklab, var(--text-tertiary) 12%, transparent)) border-box',
          }}
        >
          {estado === 'cargando' && (
            <div role="status" aria-live="polite" className="space-y-3">
              <span className="sr-only">Cargando el capítulo</span>
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  aria-hidden="true"
                  className="h-4 rounded bg-[color-mix(in_oklab,var(--text-tertiary)_12%,transparent)]"
                  style={{ width: `${70 + ((i * 17) % 28)}%` }}
                />
              ))}
            </div>
          )}

          {estado === 'error' && (
            <div role="alert">
              <p className="flex items-center gap-1.5 text-sm font-semibold text-[var(--text-primary)]">
                {sinRed && <WifiOff size={15} aria-hidden="true" className="text-[var(--text-tertiary)]" />}
                {sinRed ? 'Sin conexión' : 'No pudimos cargar el capítulo'}
              </p>
              <p className="mt-0.5 text-xs text-[var(--text-secondary)]">
                {sinRed
                  ? 'El texto se abrirá solo cuando vuelva tu internet.'
                  : 'Puede ser algo temporal del servidor. Inténtalo de nuevo.'}
              </p>
              <button
                type="button"
                onClick={cargar}
                className="mt-3 inline-flex min-h-11 items-center gap-1.5 rounded-[var(--radius-button)] border border-[color-mix(in_oklab,var(--accent)_40%,transparent)] px-3 text-xs font-semibold text-[var(--accent)] [touch-action:manipulation]"
              >
                <RotateCw size={13} aria-hidden="true" />
                Reintentar
              </button>
            </div>
          )}

          {estado === 'ok' && versos && (
            <ol
              className="mx-auto max-w-[42ch] text-[var(--text-primary)]"
              style={{ fontSize: `${tam.px}px`, lineHeight: tam.lh }}
            >
              {versos.map((linea, i) => (
                <motion.li
                  key={`${cap}-${i}`}
                  initial={reduce ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reduce ? 0 : Math.min(i * 0.02, 0.5), duration: 0.25, ease: EASE }}
                  className="mt-2.5 first:mt-0"
                >
                  <span className="mr-1.5 align-[0.35em] text-[11px] font-bold tabular-nums text-[var(--accent)]">
                    {i + 1}
                  </span>
                  {linea}
                </motion.li>
              ))}
            </ol>
          )}
        </div>

        <nav aria-label="Capítulos" className="mt-6 flex items-stretch justify-between gap-3">
          {prev ? (
            <MotionLink
              href={`/app/biblia/${slug}/${prev}`}
              onClick={irACapitulo}
              whileTap={reduce ? undefined : { scale: 0.97 }}
              className="inline-flex min-h-[48px] items-center gap-1 rounded-[var(--radius-button)] border border-[color-mix(in_oklab,var(--text-tertiary)_20%,transparent)] bg-[var(--surface)] px-4 text-sm font-semibold text-[var(--text-secondary)] shadow-[var(--shadow-1)] [touch-action:manipulation]"
            >
              <ChevronLeft size={16} aria-hidden="true" />
              {libro.nombre} {prev}
            </MotionLink>
          ) : (
            <span />
          )}
          {next ? (
            <MotionLink
              href={`/app/biblia/${slug}/${next}`}
              onClick={irACapitulo}
              whileTap={reduce ? undefined : { scale: 0.97 }}
              className="inline-flex min-h-[48px] items-center gap-1 rounded-[var(--radius-button)] border border-[color-mix(in_oklab,var(--accent)_45%,transparent)] bg-[var(--surface)] px-4 text-sm font-semibold text-[var(--accent)] shadow-[var(--shadow-1)] [touch-action:manipulation]"
            >
              {libro.nombre} {next}
              <ChevronRight size={16} aria-hidden="true" />
            </MotionLink>
          ) : (
            <span />
          )}
        </nav>

        {yendo && (
          <p role="status" className="mt-3 flex items-center justify-center gap-2 text-xs text-[var(--text-tertiary)]">
            <Loader2 size={13} aria-hidden="true" className={reduce ? '' : 'animate-spin'} />
            Abriendo capítulo…
          </p>
        )}
      </div>
    </AppShell>
  );
}
