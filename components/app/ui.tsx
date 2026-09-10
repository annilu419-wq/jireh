'use client';

// APP INTERNA — piezas compartidas (Sesión 5). Mismo kit visual de FICHA-ARTE:
// fondo de 3 niveles (base/elevado/hundido), radio 20 cards/14 botones/12 chips,
// dispositivo ownable = la Ruta + la brújula. min-h-dvh, nav SIEMPRE al fondo.

import { useEffect, useRef, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useReducedMotion } from 'motion/react';
import { Compass, BookOpen, HeartHandshake, Wind, CircleUserRound } from 'lucide-react';
import { YirethMark } from '@/components/landing/Logo';

/* ── armazón de toda pantalla de la app: fondo con profundidad + curvas de nivel
   (dispositivo ownable de FICHA-ARTE, muy tenue) + nav al fondo ── */
const MAPA_APP =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'%3E%3Cg fill='none' stroke='%236E5B3E' stroke-opacity='0.16' stroke-width='1.2'%3E%3Cpath d='M-20 60 C80 30 180 90 340 55'/%3E%3Cpath d='M-20 150 C80 120 180 180 340 145'/%3E%3Cpath d='M-20 240 C80 210 180 270 340 235'/%3E%3Cpath d='M60 -20 C40 120 80 220 55 340'/%3E%3Cpath d='M220 -20 C200 120 240 220 215 340'/%3E%3C/g%3E%3Cg stroke='%236E5B3E' stroke-opacity='0.13' stroke-width='1' fill='none'%3E%3Ccircle cx='250' cy='250' r='20'/%3E%3Cpath d='M250 232 L253 250 L250 268 L247 250 Z' fill='%236E5B3E' fill-opacity='0.14' stroke='none'/%3E%3C/g%3E%3C/svg%3E\")";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto flex min-h-dvh w-full max-w-md flex-col overflow-hidden bg-[var(--bg)] text-[var(--text-primary)] [font-family:var(--font-body)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ backgroundImage: MAPA_APP, backgroundRepeat: 'repeat', backgroundSize: '300px 300px' }}
      />
      {/* amanecer: resplandor cálido arriba que se disuelve — da relieve sin ruido */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-96"
        style={{
          background:
            'radial-gradient(460px 260px at 20% -4%, color-mix(in oklab, var(--accent) 15%, transparent), transparent 70%), radial-gradient(380px 240px at 108% 2%, color-mix(in oklab, var(--accent-2) 12%, transparent), transparent 68%), linear-gradient(to bottom, color-mix(in oklab, var(--accent) 5%, transparent), transparent 55%)',
        }}
      />
      {/* recogimiento: sombra tibia muy suave al fondo para asentar la pantalla */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-64"
        style={{
          background:
            'linear-gradient(to top, color-mix(in oklab, var(--surface-2) 70%, transparent), transparent 78%)',
        }}
      />
      <div className="flex flex-1 flex-col pb-[calc(64px+env(safe-area-inset-bottom))]">{children}</div>
      <BottomNav />
    </div>
  );
}

/* ── cabecera: marca + racha (cuenta al montar y en CADA cambio) + perfil ── */
export function TopBar({ streak }: { streak?: number }) {
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? (streak ?? 0) : 0);
  const desde = useRef(reduce ? (streak ?? 0) : 0);
  const raf = useRef(0);
  const [bump, setBump] = useState(0);
  useEffect(() => {
    if (typeof streak !== 'number') return;
    if (reduce) { setN(streak); desde.current = streak; return; }
    const inicio = desde.current;
    const fin = streak;
    if (inicio !== fin) setBump((b) => b + 1);
    let t0 = 0;
    const tick = (t: number) => {
      if (!t0) t0 = t;
      const p = Math.min(1, (t - t0) / 550);
      setN(Math.round(inicio + (fin - inicio) * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf.current = requestAnimationFrame(tick);
      else desde.current = fin;
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [streak, reduce]);

  return (
    <div className="flex items-center justify-between px-4 pt-4">
      <span className="inline-flex items-center gap-2 text-[15px] font-semibold">
        <YirethMark className="size-6" />
        Yireth
      </span>
      {typeof streak === 'number' && (
        <Link
          href="/app/perfil"
          aria-label={`Racha: ${streak} días`}
          className="inline-flex items-center gap-1.5 rounded-full border border-[color-mix(in_oklab,var(--accent-2)_32%,transparent)] bg-[color-mix(in_oklab,var(--accent-2)_10%,transparent)] px-3 py-1.5 text-sm font-semibold tabular-nums text-[color-mix(in_oklab,var(--accent-2)_65%,black)]"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="var(--accent-2)" aria-hidden="true">
            <path d="M12 2c2.6 3.7 4.2 6.3 4.2 8.9a4.2 4.2 0 1 1-8.4 0C7.8 8.3 9.4 5.7 12 2Z" />
          </svg>
          <motion.span key={bump} initial={{ scale: reduce ? 1 : 1.5 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 320, damping: 16 }}>
            {n}
          </motion.span>
        </Link>
      )}
    </div>
  );
}

const NAV: { href: string; label: string; icon: typeof Compass }[] = [
  { href: '/app/hoy', label: 'Hoy', icon: Compass },
  { href: '/app/biblia', label: 'Biblia', icon: BookOpen },
  { href: '/app/diario', label: 'Diario', icon: HeartHandshake },
  { href: '/app/calma', label: 'Calma', icon: Wind },
  { href: '/app/perfil', label: 'Perfil', icon: CircleUserRound },
];

/* ── navegación inferior: 5 secciones, activo marcado con acento (nunca del
   mismo color que su contenedor), fila táctil ≥44px, safe-area respetada ── */
export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Navegación principal"
      className="fixed inset-x-0 bottom-0 z-30 mx-auto w-full max-w-md border-t border-[color-mix(in_oklab,var(--text-tertiary)_18%,transparent)] bg-[var(--surface)] pb-[env(safe-area-inset-bottom)]"
    >
      <ul className="flex items-stretch justify-between px-2">
        {NAV.map((item) => {
          const activo = pathname?.startsWith(item.href);
          const Icon = item.icon;
          return (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                aria-current={activo ? 'page' : undefined}
                className="flex min-h-16 flex-col items-center justify-center gap-1 [touch-action:manipulation]"
              >
                <span
                  className={`grid size-9 place-items-center rounded-xl transition-colors ${
                    activo ? 'bg-[color-mix(in_oklab,var(--accent)_14%,transparent)]' : ''
                  }`}
                >
                  <Icon size={20} strokeWidth={activo ? 2.4 : 2} color={activo ? 'var(--accent)' : 'var(--text-tertiary)'} aria-hidden="true" />
                </span>
                <span className={`text-[11px] font-medium ${activo ? 'text-[var(--accent)]' : 'text-[var(--text-tertiary)]'}`}>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/* ── entrada escalonada reutilizable (baseline de movimiento) ── */
export function useReveal(stagger = 0.07) {
  const reduce = useReducedMotion();
  return {
    contenedor: { hidden: {}, visible: { transition: { staggerChildren: reduce ? 0 : stagger } } },
    item: {
      hidden: { opacity: 0, y: reduce ? 0 : 14 },
      visible: { opacity: 1, y: 0, transition: { duration: reduce ? 0.2 : 0.4, ease: [0.16, 1, 0.3, 1] as const } },
    },
  };
}
export { motion };
