'use client';

// Buscador de palabras dentro del texto bíblico (pedido del usuario, 2026-10-18).
// Hoja a pantalla completa: escribes una palabra → lista de versículos que la
// contienen (sin importar tildes ni mayúsculas) → tocas y abres el capítulo.
// El índice se arma en el navegador la primera vez que se abre (los 66 JSON de
// public/biblia, ~4 MB, quedan en caché del navegador) y se reutiliza.

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Loader2, RotateCw, Search, X } from 'lucide-react';
import { LIBROS } from '@/lib/biblia';

interface Entrada {
  slug: string;
  libro: string;
  cap: number;
  vers: number;
  texto: string;
  norm: string;
}

const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
const MAX = 60;
const MIN_CHARS = 3;

// posición donde empieza una palabra que arranca con la consulta (así "paz" no
// encuentra "capaz", pero "paci" sí encuentra "paciencia")
function posicion(n: string, consulta: string): number {
  let desde = 0;
  while (true) {
    const i = n.indexOf(consulta, desde);
    if (i < 0) return -1;
    if (i === 0 || !/[a-z0-9]/.test(n[i - 1])) return i;
    desde = i + 1;
  }
}

let indice: Entrada[] | null = null;
let cargando: Promise<Entrada[]> | null = null;

function cargarIndice(): Promise<Entrada[]> {
  if (indice) return Promise.resolve(indice);
  if (cargando) return cargando;
  cargando = Promise.all(
    LIBROS.map(async (l) => {
      const res = await fetch(`/biblia/${l.slug}.json`);
      if (!res.ok) throw new Error(l.slug);
      const data = (await res.json()) as Record<string, string[]>;
      const filas: Entrada[] = [];
      for (const [cap, versos] of Object.entries(data)) {
        versos.forEach((texto, i) => {
          filas.push({ slug: l.slug, libro: l.nombre, cap: Number(cap), vers: i + 1, texto, norm: norm(texto) });
        });
      }
      return filas;
    }),
  )
    .then((partes) => {
      indice = partes.flat();
      return indice;
    })
    .finally(() => {
      cargando = null;
    });
  return cargando;
}

// parte el texto original resaltando la palabra buscada (las posiciones de la
// versión sin tildes coinciden con las del original: NFD quita marcas, no letras)
function Resaltado({ texto, consulta }: { texto: string; consulta: string }) {
  const n = norm(texto);
  const i = posicion(n, consulta);
  if (i < 0) return <>{texto}</>;
  const ini = Math.max(0, i - 60);
  const fin = Math.min(texto.length, i + consulta.length + 90);
  return (
    <>
      {ini > 0 && '…'}
      {texto.slice(ini, i)}
      <mark className="rounded-sm bg-[color-mix(in_oklab,var(--accent-2)_28%,transparent)] px-0.5 font-semibold text-[var(--text-primary)]">
        {texto.slice(i, i + consulta.length)}
      </mark>
      {texto.slice(i + consulta.length, fin)}
      {fin < texto.length && '…'}
    </>
  );
}

export function BuscadorVersiculos({ abierto, onCerrar }: { abierto: boolean; onCerrar: () => void }) {
  const reduce = useReducedMotion();
  const [q, setQ] = useState('');
  const [estado, setEstado] = useState<'idle' | 'cargando' | 'listo' | 'error'>(indice ? 'listo' : 'idle');
  const inputRef = useRef<HTMLInputElement>(null);

  const cargar = () => {
    setEstado('cargando');
    cargarIndice()
      .then(() => setEstado('listo'))
      .catch(() => setEstado('error'));
  };

  useEffect(() => {
    if (!abierto) return;
    if (!indice) cargar();
    const t = window.setTimeout(() => inputRef.current?.focus(), 80);
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && onCerrar();
    window.addEventListener('keydown', onEsc);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener('keydown', onEsc);
    };
  }, [abierto, onCerrar]);

  const consulta = norm(q.trim());
  const { resultados, total } = useMemo(() => {
    if (estado !== 'listo' || !indice || consulta.length < MIN_CHARS) return { resultados: [] as Entrada[], total: 0 };
    const todos = indice.filter((e) => posicion(e.norm, consulta) >= 0);
    return { resultados: todos.slice(0, MAX), total: todos.length };
  }, [estado, consulta]);

  return (
    <AnimatePresence>
      {abierto && (
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduce ? 0 : 24 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          role="dialog"
          aria-modal="true"
          aria-label="Buscar en la Biblia"
          className="fixed inset-0 z-50 mx-auto flex w-full max-w-md flex-col bg-[var(--bg)]"
        >
          <div className="flex items-center gap-2 border-b border-[color-mix(in_oklab,var(--text-tertiary)_14%,transparent)] px-4 pb-3 pt-[max(12px,env(safe-area-inset-top))]">
            <div className="flex h-11 min-w-0 flex-1 items-center gap-2 rounded-[var(--radius-button)] border border-[color-mix(in_oklab,var(--text-tertiary)_24%,transparent)] bg-[var(--surface)] px-3 focus-within:border-[var(--accent)]">
              <Search size={16} className="shrink-0 text-[var(--text-tertiary)]" aria-hidden="true" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Una palabra, ej. paz"
                aria-label="Buscar una palabra en la Biblia"
                className="h-full w-full bg-transparent text-sm outline-none placeholder:text-[var(--text-tertiary)]"
              />
              {q && (
                <button type="button" onClick={() => setQ('')} aria-label="Limpiar" className="shrink-0 text-[var(--text-tertiary)] [touch-action:manipulation]">
                  <X size={16} aria-hidden="true" />
                </button>
              )}
            </div>
            <button type="button" onClick={onCerrar} className="shrink-0 px-1 text-sm font-semibold text-[var(--accent)] [touch-action:manipulation]">
              Cerrar
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 pb-8 pt-3">
            {estado === 'cargando' && (
              <div className="mt-10 flex flex-col items-center gap-3 text-center">
                <Loader2 size={22} className="animate-spin text-[var(--accent)]" aria-hidden="true" />
                <p className="text-sm text-[var(--text-secondary)]">Preparando la Biblia para buscar…</p>
                <p className="max-w-[28ch] text-xs text-[var(--text-tertiary)]">Solo la primera vez tarda unos segundos.</p>
              </div>
            )}

            {estado === 'error' && (
              <div className="mt-10 flex flex-col items-center gap-2 text-center">
                <p className="text-sm font-semibold">No pudimos preparar la búsqueda</p>
                <p className="text-xs text-[var(--text-tertiary)]">Revisa tu conexión e inténtalo otra vez.</p>
                <button type="button" onClick={cargar} className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent)] [touch-action:manipulation]">
                  <RotateCw size={14} aria-hidden="true" />
                  Reintentar
                </button>
              </div>
            )}

            {estado === 'listo' && consulta.length < MIN_CHARS && (
              <div className="mt-10 flex flex-col items-center px-6 text-center">
                <span className="grid size-12 place-items-center rounded-[var(--radius-card)] bg-[color-mix(in_oklab,var(--accent)_10%,transparent)]">
                  <Search size={20} color="var(--accent)" aria-hidden="true" />
                </span>
                <p className="mt-3 text-sm font-semibold">Busca en toda la Biblia</p>
                <p className="mt-1 max-w-[30ch] text-xs leading-relaxed text-[var(--text-tertiary)]">
                  Escribe una palabra (mínimo 3 letras) y verás los versículos donde aparece. No importan tildes ni mayúsculas.
                </p>
              </div>
            )}

            {estado === 'listo' && consulta.length >= MIN_CHARS && total === 0 && (
              <div className="mt-10 text-center">
                <p className="text-sm font-semibold">Ningún versículo contiene “{q.trim()}”</p>
                <p className="mt-1 text-xs text-[var(--text-tertiary)]">Prueba con otra palabra o una parte más corta.</p>
              </div>
            )}

            {resultados.length > 0 && (
              <>
                <p className="text-xs text-[var(--text-tertiary)]" aria-live="polite">
                  {total > MAX
                    ? `Mostrando ${MAX} de ${total} versículos — escribe más letras para acotar`
                    : `${total} ${total === 1 ? 'versículo' : 'versículos'}`}
                </p>
                <ul className="mt-2 space-y-2">
                  {resultados.map((e) => (
                    <li key={`${e.slug}-${e.cap}-${e.vers}`}>
                      <Link
                        href={`/app/biblia/${e.slug}/${e.cap}`}
                        className="block rounded-[var(--radius-card)] border border-[color-mix(in_oklab,var(--text-tertiary)_10%,transparent)] bg-[var(--surface)] p-3.5 shadow-[var(--shadow-card)] transition-transform active:scale-[0.985] [touch-action:manipulation]"
                      >
                        <span className="block text-xs font-bold text-[var(--accent)]">
                          {e.libro} {e.cap}:{e.vers}
                        </span>
                        <span className="mt-1 block text-sm leading-relaxed text-[var(--text-secondary)]">
                          <Resaltado texto={e.texto} consulta={consulta} />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
