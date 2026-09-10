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
import { ArrowLeft, ChevronLeft, ChevronRight, ChevronDown, HelpCircle, Loader2, RotateCw, WifiOff, X } from 'lucide-react';
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

// trama de cartografía (curvas de nivel + puntos) — 3er plano del fondo, eco del
// mapa. Debe LEERSE a 375px en los márgenes del lienzo (no marca de agua).
const TRAMA_MAPA =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Cg fill='none' stroke='%235A4A30' stroke-opacity='0.85' stroke-width='1.1'%3E%3Cpath d='M-14 32 C40 14 96 46 174 26'/%3E%3Cpath d='M-14 84 C40 66 96 98 174 78'/%3E%3Cpath d='M-14 136 C40 118 96 150 174 130'/%3E%3C/g%3E%3Cg fill='%235A4A30' fill-opacity='0.7'%3E%3Ccircle cx='22' cy='58' r='1.5'/%3E%3Ccircle cx='120' cy='40' r='1.5'/%3E%3Ccircle cx='78' cy='118' r='1.5'/%3E%3Ccircle cx='150' cy='96' r='1.5'/%3E%3C/g%3E%3C/svg%3E\")";

// Ornamento del lector — el "sendero" del mapa de expedición con estaciones y una
// rosa de los vientos. Deliberado y visible a 375px (no marca de agua): es el eco
// del dispositivo ownable dentro del lienzo del lector.
function SenderoOrnamento() {
  const T = 'color-mix(in oklab, var(--text-tertiary) 90%, transparent)';
  return (
    <svg viewBox="0 0 300 26" className="mt-2 h-6 w-full max-w-[280px]" fill="none" aria-hidden="true">
      <path
        d="M4 18 C40 6 70 20 110 12 C150 4 182 20 222 12 C252 6 276 12 296 8"
        stroke={T}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeDasharray="1 5"
      />
      <circle cx="4" cy="18" r="3" fill="none" stroke={T} strokeWidth="2" />
      <circle cx="110" cy="12" r="3" fill="none" stroke={T} strokeWidth="2" />
      <circle cx="222" cy="12" r="4.4" fill="var(--accent)" />
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
  const [ayuda, setAyuda] = useState(false);
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
          backgroundImage:
            'radial-gradient(620px 380px at 18% -6%, color-mix(in oklab, var(--accent) 15%, transparent), transparent 68%), radial-gradient(420px 300px at 100% 4%, color-mix(in oklab, var(--accent-2) 9%, transparent), transparent 70%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.15]"
        style={{
          backgroundImage: TRAMA_MAPA,
          backgroundSize: '160px 160px',
          WebkitMaskImage: 'linear-gradient(to bottom, black, black 16%, transparent 44%)',
          maskImage: 'linear-gradient(to bottom, black, black 16%, transparent 44%)',
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

        {/* plano HUNDIDO: tira de versión + sendero + ayuda */}
        <div className="mt-1.5 flex items-center gap-2 rounded-full bg-[var(--surface-2)] px-3 py-1.5 shadow-[inset_0_1px_4px_color-mix(in_oklab,var(--text-primary)_11%,transparent)]">
          <p className="shrink-0 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--text-tertiary)]">RV 1909</p>
          <span className="min-w-0 flex-1">
            <SenderoOrnamento />
          </span>
          <button
            type="button"
            onClick={() => {
              setAyuda((v) => !v);
              marcarTipsVistos();
            }}
            aria-expanded={ayuda}
            aria-label="Sobre esta versión y cómo leer"
            className="grid size-6 shrink-0 place-items-center rounded-full text-[var(--text-tertiary)] [touch-action:manipulation] hover:text-[var(--text-secondary)]"
          >
            <HelpCircle size={15} aria-hidden="true" />
          </button>
        </div>
        {ayuda && (
          <p className="mt-2 text-xs leading-relaxed text-[var(--text-tertiary)]">
            La Reina-Valera 1909 es una traducción clásica de uso libre; conserva palabras antiguas
            como «empero» o «he aquí», con el mismo sentido que una Biblia de hoy. Ajusta el tamaño de
            la letra con <span className="font-semibold text-[var(--text-secondary)]">A− / A+</span>;
            en computador cambias de capítulo con las flechas{' '}
            <span className="font-semibold text-[var(--text-secondary)]">← →</span>.
          </p>
        )}

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
      </header>

      <div className="mt-4 flex flex-1 flex-col px-4 pb-4">
        <motion.div
          key={cap}
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.32, ease: EASE }}
          className="rounded-[var(--radius-card)] border border-[color-mix(in_oklab,var(--accent)_30%,transparent)] p-5"
          style={{
            background: 'color-mix(in oklab, white 70%, var(--surface))',
            boxShadow:
              '0 1px 2px color-mix(in oklab, var(--text-primary) 7%, transparent), 0 12px 30px -6px color-mix(in oklab, var(--text-primary) 20%, transparent), 0 34px 64px -34px color-mix(in oklab, var(--text-primary) 24%, transparent), inset 0 0 0 1px color-mix(in oklab, var(--accent) 8%, transparent)',
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
        </motion.div>

        <nav aria-label="Capítulos" className="mt-6 grid grid-cols-2 gap-3">
          {prev ? (
            <MotionLink
              href={`/app/biblia/${slug}/${prev}`}
              onClick={irACapitulo}
              whileTap={reduce ? undefined : { scale: 0.97 }}
              className="flex min-h-[48px] items-center justify-center gap-1 rounded-[var(--radius-button)] border border-[color-mix(in_oklab,var(--text-tertiary)_20%,transparent)] bg-[var(--surface)] px-3 text-sm font-semibold text-[var(--text-secondary)] shadow-[var(--shadow-1)] [touch-action:manipulation]"
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
              className="col-start-2 flex min-h-[48px] items-center justify-center gap-1 rounded-[var(--radius-button)] border border-[color-mix(in_oklab,var(--text-tertiary)_20%,transparent)] bg-[var(--surface)] px-3 text-sm font-semibold text-[var(--accent)] shadow-[var(--shadow-1)] [touch-action:manipulation]"
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
