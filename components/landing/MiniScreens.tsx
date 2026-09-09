// Mockups honestos ilustrados para el carrusel de §5 (jerarquía #2 de 19 §5):
// pantallas dibujadas que reproducen el mecanismo real — no capturas falsas.
// Se reemplazan por screenshots reales cuando exista la app interna (ESTADO.md).

const wrap =
  'flex h-full w-full flex-col gap-3 bg-[var(--bg)] px-4 pt-6 [font-family:var(--font-body)]';
const cap = 'text-[10px] font-bold uppercase tracking-wide text-[var(--accent)]';
const card =
  'rounded-2xl border border-[color-mix(in_oklab,var(--text-tertiary)_18%,transparent)] bg-[var(--surface)] p-3 shadow-[var(--shadow-1)]';

export function ScreenHoy() {
  return (
    <div className={wrap}>
      <p className="text-xs font-medium text-[var(--text-secondary)]">Buenos días, María</p>
      <p className="text-base font-bold text-[var(--text-primary)]">Marcos 4 — El sembrador</p>
      <div className={card}>
        <p className={cap}>Contexto · 30 s</p>
        <div className="mt-2 flex gap-1.5">
          {['Autor', 'Época', 'Lugar'].map((t) => (
            <span key={t} className="flex-1 rounded-lg bg-[var(--bg)] px-1.5 py-1 text-center text-[9px] font-semibold text-[var(--text-secondary)]">
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className={card}>
        <p className="text-[11px] font-semibold text-[var(--text-primary)]">Qué te quiso decir Jesús</p>
        <ul className="mt-1.5 space-y-1">
          {['La palabra es la semilla.', 'Los afanes ahogan la fe.', 'La paciencia da fruto.'].map((t) => (
            <li key={t} className="flex gap-1.5 text-[10px] leading-tight text-[var(--text-secondary)]">
              <span className="mt-0.5 size-3 shrink-0 rounded-full bg-[color-mix(in_oklab,var(--accent)_16%,transparent)]" />
              {t}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-auto mb-4 flex h-8 items-center justify-center rounded-xl bg-[var(--accent)] text-[11px] font-bold text-[var(--bg)]">
        Leer o escuchar · 3 min
      </div>
    </div>
  );
}

export function ScreenRuta() {
  const nodos = [
    { t: 'Mateo', done: true },
    { t: 'Marcos · cap. 4', now: true },
    { t: 'Lucas', done: false },
    { t: 'Juan', done: false },
  ];
  return (
    <div className={wrap}>
      <p className={cap}>Tu ruta cronológica</p>
      <p className="text-base font-bold text-[var(--text-primary)]">Vas por la estación 2</p>
      <div className="mt-1 space-y-2.5">
        {nodos.map((n) => (
          <div key={n.t} className="flex items-center gap-2.5">
            <span
              className={`size-3 shrink-0 rounded-full ${
                n.done
                  ? 'bg-[var(--ok)]'
                  : n.now
                    ? 'bg-[var(--accent)] ring-4 ring-[color-mix(in_oklab,var(--accent)_18%,transparent)]'
                    : 'bg-[color-mix(in_oklab,var(--text-tertiary)_35%,transparent)]'
              }`}
            />
            <span className={`text-[11px] ${n.now ? 'font-bold text-[var(--accent)]' : 'text-[var(--text-secondary)]'}`}>
              {n.t}
            </span>
          </div>
        ))}
      </div>
      <div className={`${card} mt-3`}>
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold text-[var(--text-secondary)]">Racha</span>
          <span className="text-xs font-bold tabular-nums text-[color-mix(in oklab, var(--accent-2) 88%, var(--text-primary))]">12 días</span>
        </div>
        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[color-mix(in_oklab,var(--accent)_14%,transparent)]">
          <div className="h-full w-2/5 rounded-full bg-[var(--accent)]" />
        </div>
      </div>
    </div>
  );
}

export function ScreenOracion() {
  const items = [
    { t: 'Por el trabajo de Andrés', on: false },
    { t: 'Salud de mamá', on: true },
    { t: 'Paz en casa', on: false },
  ];
  return (
    <div className={wrap}>
      <p className={cap}>Diario de oración</p>
      <p className="text-base font-bold text-[var(--text-primary)]">Tus peticiones</p>
      <div className="space-y-2">
        {items.map((i) => (
          <div key={i.t} className={`${card} flex items-center gap-2`}>
            <span
              className={`size-4 shrink-0 rounded-full border-2 ${
                i.on
                  ? 'border-[var(--ok)] bg-[var(--ok)]'
                  : 'border-[color-mix(in_oklab,var(--text-tertiary)_45%,transparent)]'
              }`}
            />
            <span className={`text-[11px] ${i.on ? 'font-semibold text-[var(--text-primary)] line-through' : 'text-[var(--text-secondary)]'}`}>
              {i.t}
            </span>
            {i.on && <span className="ml-auto text-[9px] font-bold text-[var(--ok)]">Respondida</span>}
          </div>
        ))}
      </div>
      <div className="mt-auto mb-4 flex h-8 items-center justify-center rounded-xl border border-[color-mix(in_oklab,var(--accent)_40%,transparent)] text-[11px] font-bold text-[var(--accent)]">
        + Nueva petición
      </div>
    </div>
  );
}

export function ScreenCrisis() {
  const emos = ['Ansiedad', 'Tristeza', 'Culpa', 'Gratitud'];
  return (
    <div className={wrap}>
      <p className={cap}>Cuando el día pesa</p>
      <p className="text-base font-bold text-[var(--text-primary)]">¿Cómo te sientes?</p>
      <div className="grid grid-cols-2 gap-2">
        {emos.map((e, idx) => (
          <div
            key={e}
            className={`rounded-xl p-2.5 text-center text-[11px] font-semibold ${
              idx === 0
                ? 'bg-[var(--accent)] text-[var(--bg)]'
                : 'bg-[color-mix(in_oklab,var(--accent)_10%,transparent)] text-[var(--accent)]'
            }`}
          >
            {e}
          </div>
        ))}
      </div>
      <div className={`${card} mt-2`}>
        <p className="text-[10px] font-semibold text-[var(--text-primary)]">Cápsula de sabiduría</p>
        <div className="mt-1.5 flex items-center gap-2">
          <span className="flex size-6 items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--accent)_16%,transparent)]">
            <svg viewBox="0 0 24 24" className="size-3 fill-[var(--accent)]"><path d="M5 3l14 9-14 9V3Z" /></svg>
          </span>
          <span className="text-[10px] text-[var(--text-secondary)]">60 segundos para soltar el día</span>
        </div>
      </div>
    </div>
  );
}
