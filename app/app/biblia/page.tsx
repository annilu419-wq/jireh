'use client';

// Pantalla "Biblia" — punto de entrada a (a) LA RUTA (recorrido guiado cronológico,
// el objeto principal) y (b) LA BIBLIA COMPLETA (66 libros en orden canónico, con
// búsqueda + filtro AT/NT + agrupación por división). "ritual" VETADO. Primera
// pantalla de tipo "navegador/índice" → lleva revisor-visual.

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { Search, ChevronRight, Compass, X } from 'lucide-react';
import { AppShell, TopBar } from '@/components/app/ui';
import { RutaCard } from '@/components/app/RutaCard';
import { LIBROS, DIVISIONES_AT, DIVISIONES_NT, type Libro } from '@/lib/biblia';
import { RACHA_ACTUAL } from '@/lib/contenido';

type Filtro = 'todo' | 'AT' | 'NT';
const FILTROS: { id: Filtro; label: string }[] = [
  { id: 'todo', label: 'Todo' },
  { id: 'AT', label: 'Antiguo' },
  { id: 'NT', label: 'Nuevo' },
];

// quita acentos para que "genesis" encuentre "Génesis"
const norm = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

export default function BibliaPage() {
  const reduce = useReducedMotion();
  const [filtro, setFiltro] = useState<Filtro>('todo');
  const [q, setQ] = useState('');

  const consulta = norm(q.trim());
  const filtrados = useMemo(
    () =>
      LIBROS.filter((l) => {
        if (filtro !== 'todo' && l.testamento !== filtro) return false;
        if (consulta && !norm(l.nombre).includes(consulta)) return false;
        return true;
      }),
    [filtro, consulta],
  );

  // agrupa por división, respetando el orden canónico de las divisiones
  const grupos = useMemo(() => {
    const orden = [...DIVISIONES_AT, ...DIVISIONES_NT];
    const map = new Map<string, Libro[]>();
    for (const l of filtrados) {
      if (!map.has(l.division)) map.set(l.division, []);
      map.get(l.division)!.push(l);
    }
    return orden.filter((d) => map.has(d)).map((d) => [d, map.get(d)!] as const);
  }, [filtrados]);

  const guiadasTotal = LIBROS.filter((l) => l.guiada).length;

  return (
    <AppShell>
      <TopBar streak={RACHA_ACTUAL} />

      <div className="px-4 pt-4">
        <h1 className="text-[26px] font-bold leading-tight tracking-[-0.02em] [font-family:var(--font-display)]">Biblia</h1>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">Sigue la Ruta o abre cualquier libro en orden.</p>
      </div>

      <div className="mt-4">
        <RutaCard />
      </div>

      {/* ── LA BIBLIA COMPLETA ── */}
      <div className="mt-7 flex flex-1 flex-col px-4">
        <p className="text-xs font-bold uppercase tracking-[0.1em] text-[var(--text-tertiary)]">La Biblia completa</p>
        <span aria-hidden="true" className="mt-2 block h-px w-full" style={{ background: 'var(--hairline)' }} />
        <p className="mt-2 text-xs text-[var(--text-tertiary)]">
          {filtro === 'todo' && !consulta
            ? <>66 libros en orden canónico · <span className="font-semibold text-[var(--accent)]">{guiadasTotal} con guía de Jireh</span> por ahora</>
            : <>{filtrados.length} {filtrados.length === 1 ? 'libro' : 'libros'}{filtro !== 'todo' && ` · ${filtro === 'AT' ? 'Antiguo' : 'Nuevo'} Testamento`}</>}
        </p>

        {/* búsqueda */}
        <div className="mt-3 flex h-11 items-center gap-2 rounded-[var(--radius-button)] border border-[color-mix(in_oklab,var(--text-tertiary)_24%,transparent)] bg-[var(--surface)] px-3 shadow-[var(--shadow-1)] focus-within:border-[var(--accent)]">
          <Search size={16} className="shrink-0 text-[var(--text-tertiary)]" aria-hidden="true" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar un libro"
            aria-label="Buscar un libro"
            className="h-full w-full bg-transparent text-sm outline-none placeholder:text-[var(--text-tertiary)]"
          />
          {q && (
            <motion.button whileTap={{ scale: reduce ? 1 : 0.9 }} type="button" onClick={() => setQ('')} aria-label="Limpiar búsqueda" className="shrink-0 text-[var(--text-tertiary)] [touch-action:manipulation]">
              <X size={16} aria-hidden="true" />
            </motion.button>
          )}
        </div>

        {/* filtro AT / NT */}
        <div role="tablist" aria-label="Filtrar por testamento" className="mt-2.5 grid grid-cols-3 gap-1 rounded-[var(--radius-button)] bg-[var(--surface-2)] p-1">
          {FILTROS.map((f) => {
            const on = filtro === f.id;
            return (
              <motion.button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={on}
                whileTap={{ scale: reduce ? 1 : 0.96 }}
                onClick={() => setFiltro(f.id)}
                className={`relative h-9 rounded-[calc(var(--radius-button)-4px)] text-xs font-semibold [touch-action:manipulation] ${
                  on ? 'text-[var(--accent)]' : 'text-[var(--text-tertiary)]'
                }`}
              >
                {on && (
                  <motion.span
                    layoutId="biblia-filtro"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-[calc(var(--radius-button)-4px)] bg-[var(--surface)] shadow-[var(--shadow-1)] ring-1 ring-[color-mix(in_oklab,var(--accent)_28%,transparent)]"
                  />
                )}
                <span className="relative">{f.label}</span>
              </motion.button>
            );
          })}
        </div>

        {/* resultados */}
        {grupos.length === 0 ? (
          <div className="mt-8 flex flex-col items-center px-6 text-center">
            <span className="grid size-12 place-items-center rounded-[var(--radius-card)] bg-[color-mix(in_oklab,var(--accent)_10%,transparent)]">
              <Search size={20} color="var(--accent)" aria-hidden="true" />
            </span>
            <p className="mt-3 text-sm font-semibold">Ningún libro coincide con “{q}”</p>
            <motion.button whileTap={{ scale: reduce ? 1 : 0.96 }} type="button" onClick={() => { setQ(''); setFiltro('todo'); }} className="mt-2 text-xs font-semibold text-[var(--accent)] underline-offset-2 hover:underline [touch-action:manipulation]">
              Ver los 66 libros
            </motion.button>
          </div>
        ) : (
          <div className="mt-4 space-y-5 pb-4">
            {grupos.map(([division, libros], gi) => (
              <section key={division}>
                <p className="mb-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--text-tertiary)]">{division}</p>
                <ul className="overflow-hidden rounded-[var(--radius-card)] border border-[color-mix(in_oklab,var(--text-tertiary)_10%,transparent)] bg-[var(--surface)] shadow-[var(--shadow-card)]">
                  {libros.map((l, i) => (
                    <motion.li
                      key={l.slug}
                      initial={{ opacity: 0, y: reduce ? 0 : 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileTap={{ scale: reduce ? 1 : 0.985, backgroundColor: 'color-mix(in oklab, var(--accent) 7%, transparent)' }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1], delay: reduce ? 0 : Math.min(0.25, (gi * 3 + i) * 0.015) }}
                      className="border-t border-[color-mix(in_oklab,var(--text-tertiary)_10%,transparent)] first:border-t-0"
                    >
                      <Link
                        href={`/app/biblia/${l.slug}`}
                        className="flex items-center gap-3 px-4 py-3 [touch-action:manipulation]"
                      >
                        <span className="min-w-0 flex-1">
                          <span className="flex items-center gap-2">
                            <span className="truncate text-[15px] font-semibold">{l.nombre}</span>
                            {l.guiada && (
                              <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[color-mix(in_oklab,var(--accent)_12%,transparent)] px-1.5 py-0.5 text-[10px] font-bold text-[var(--accent)]">
                                <Compass size={10} aria-hidden="true" />
                                Guía
                              </span>
                            )}
                          </span>
                          <span className="mt-0.5 block text-xs text-[var(--text-tertiary)]">{l.capitulos} capítulos</span>
                        </span>
                        <ChevronRight size={18} className="shrink-0 text-[var(--text-tertiary)]" aria-hidden="true" />
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
