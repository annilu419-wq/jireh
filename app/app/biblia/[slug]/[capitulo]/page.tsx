'use client';

// Lector de capítulo — el texto bíblico completo (Reina-Valera 1909, dominio
// público, importado con scripts/importar-biblia.mjs a public/biblia/<slug>.json).
// Primera pantalla de tipo "lector de texto largo" → lleva revisor-visual.
// Cuerpo en Sora (FICHA-ARTE: una sola familia); tamaño ajustable y persistido;
// teclas ←/→ entre capítulos; recuerda la posición de lectura en la sesión.

import { use, useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, ChevronLeft, ChevronRight, Loader2, RotateCw } from 'lucide-react';
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

// banda de curvas de nivel para el borde superior del lector — más marcada que la
// del AppShell y con desvanecido hacia abajo: da profundidad + eco del "mapa".
const BANDA_MAPA =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='340' height='200' viewBox='0 0 340 200'%3E%3Cg fill='none' stroke='%236E5B3E' stroke-opacity='0.5' stroke-width='1.15'%3E%3Cpath d='M-20 34 C90 12 200 54 360 26'/%3E%3Cpath d='M-20 74 C90 52 200 94 360 66'/%3E%3Cpath d='M-20 114 C90 92 200 134 360 106'/%3E%3Cpath d='M-20 154 C90 132 200 174 360 146'/%3E%3C/g%3E%3Cg stroke='%236E5B3E' stroke-opacity='0.4' stroke-width='0.9' fill='none'%3E%3Ccircle cx='286' cy='44' r='16'/%3E%3Cpath d='M286 26 L289 44 L286 62 L283 44 Z' fill='%236E5B3E' fill-opacity='0.45' stroke='none'/%3E%3C/g%3E%3C/svg%3E\")";

const MotionLink = motion.create(Link);

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
  const [nivel, setNivel] = useState(1); // índice en TAMANOS
  const [yendo, setYendo] = useState(false); // navegando a otro capítulo
  const [tips, setTips] = useState(false);
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

  // preferencias persistidas
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
        if (!r.ok) throw new Error('fetch');
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
        if (vivo) setEstado('error');
      });
    return () => {
      vivo = false;
    };
  }, [slug, cap, valido]);

  useEffect(() => cargar(), [cargar]);

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
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [slug, prev, next, valido, router, marcarTipsVistos]);

  // recuerda la posición de lectura de este capítulo (durante la sesión)
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

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-12 -z-10 h-64"
        style={{
          backgroundImage: BANDA_MAPA,
          backgroundRepeat: 'repeat-x',
          backgroundSize: '340px 200px',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.9), transparent 80%)',
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.9), transparent 80%)',
        }}
      />

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

      <header className="mt-3 px-4">
        <h1 className="text-[27px] font-bold leading-tight tracking-[-0.02em] [font-family:var(--font-display)]">
          {libro.nombre} {cap}
        </h1>
        <div className="mt-1 flex items-center gap-2">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--text-tertiary)]">
            Reina-Valera 1909
          </p>
          <svg viewBox="0 0 56 14" className="h-3 w-14" fill="none" aria-hidden="true">
            <path
              d="M2 11 C14 3 20 12 30 7 C40 2 46 9 54 4"
              stroke="var(--accent)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray="0.1 4.5"
            />
            <circle cx="2" cy="11" r="2" fill="none" stroke="var(--accent)" strokeWidth="1.4" />
            <circle cx="54" cy="4" r="2.4" fill="var(--accent)" />
          </svg>
        </div>
        <details className="group mt-2" onToggle={marcarTipsVistos}>
          <summary className="inline-flex cursor-pointer list-none items-center gap-1 text-xs font-semibold text-[var(--text-secondary)] [touch-action:manipulation]">
            ¿Por qué suena así?
            <ChevronRight size={13} aria-hidden="true" className="transition-transform group-open:rotate-90" />
          </summary>
          <p className="mt-1.5 text-xs leading-relaxed text-[var(--text-tertiary)]">
            La Reina-Valera 1909 es una traducción clásica de uso libre. Conserva palabras antiguas
            como «empero» o «he aquí»; el sentido es el mismo que en una Biblia de hoy.
          </p>
        </details>
      </header>

      <div className="mt-4 flex flex-1 flex-col px-4 pb-4">
        {tips && estado === 'ok' && (
          <p className="mb-3 rounded-[var(--radius-button)] border border-[color-mix(in_oklab,var(--accent)_18%,transparent)] bg-[color-mix(in_oklab,var(--accent)_5%,var(--surface))] px-3 py-2 text-[11px] leading-relaxed text-[var(--text-secondary)]">
            Ajusta el tamaño de la letra con <span className="font-bold">A− / A+</span>. En computador,
            cambias de capítulo con las flechas <span className="font-bold">← →</span>.
          </p>
        )}

        <div className="rounded-[var(--radius-card)] border border-[color-mix(in_oklab,var(--text-tertiary)_10%,transparent)] bg-[var(--surface)] p-5 shadow-[var(--shadow-card)]">
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
              <p className="text-sm font-semibold text-[var(--text-primary)]">No pudimos cargar el capítulo</p>
              <p className="mt-0.5 text-xs text-[var(--text-secondary)]">Revisa tu conexión e inténtalo otra vez.</p>
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
