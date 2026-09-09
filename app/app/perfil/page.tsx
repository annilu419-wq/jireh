'use client';

// "Perfil" (Sesión 5) — racha + hitos + progreso de la Ruta + ajustes + suscripción
// + cuenta. Estado local (Supabase/Hotmart en la Sesión 6). "ritual" VETADO.
// Pantalla SECUNDARIA: medición + checklist, sin revisor-visual.

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Flame, Trophy, Bell, Vibrate, ShieldCheck, ChevronRight, LogOut, Map } from 'lucide-react';
import { AppShell, TopBar } from '@/components/app/ui';
import { createClient } from '@/lib/supabase/client';
import { PERFIL } from '@/lib/contenido';
import { getPerfil, guardarAjustes, type PerfilDB } from '@/lib/datos';

const MotionLink = motion.create(Link);
const HORAS = ['07:00', '12:00', '21:00'];

export default function PerfilPage() {
  const reduce = useReducedMotion();
  const router = useRouter();
  const [saliendo, setSaliendo] = useState(false);
  const [pd, setPd] = useState<PerfilDB | null>(null);
  const [recordatorio, setRecordatorio] = useState(true);
  const [hora, setHora] = useState('07:00');
  const [vibracion, setVibracion] = useState(true);
  const [avisoRacha, setAvisoRacha] = useState(true);
  const [notaPlan, setNotaPlan] = useState(false);

  useEffect(() => {
    let vivo = true;
    getPerfil()
      .then((d) => {
        if (!vivo) return;
        setPd(d);
        setRecordatorio(d.ajustes.recordatorio);
        setHora(d.ajustes.hora);
        setVibracion(d.ajustes.vibracion);
        setAvisoRacha(d.ajustes.avisoRacha);
      })
      .catch(() => {});
    return () => {
      vivo = false;
    };
  }, []);

  const p = {
    nombre: pd?.nombre ?? PERFIL.nombre,
    inicial: pd?.inicial ?? PERFIL.inicial,
    desde: PERFIL.desde,
    rachaActual: pd?.racha ?? 0,
    mejorRacha: pd?.mejorRacha ?? 0,
    totalDias: pd?.totalDias ?? 0,
    rutaProgreso: pd?.ruta.progreso ?? 0,
    rutaLugar: pd ? `${pd.ruta.libro} ${pd.ruta.capitulo}` : PERFIL.rutaLugar,
    hitos: PERFIL.hitos,
    plan: PERFIL.plan,
    diasPrueba: PERFIL.diasPrueba,
  };

  const proximo = p.hitos.find((h) => h > p.rachaActual) ?? p.hitos[p.hitos.length - 1];
  const haciaProximo = proximo ? Math.min(1, p.rachaActual / proximo) : 0;

  // optimista: cambia la UI y guarda en la base; si falla, revierte
  const setAjuste = (
    set: (v: boolean) => void,
    prev: boolean,
    patch: Parameters<typeof guardarAjustes>[0],
  ) => {
    const nuevo = !prev;
    set(nuevo);
    guardarAjustes(patch).catch(() => set(prev));
  };
  const setHoraDB = (h: string) => {
    setHora(h);
    guardarAjustes({ hora: h }).catch(() => {});
  };

  return (
    <AppShell>
      <TopBar streak={p.rachaActual} />

      <div className="flex flex-1 flex-col gap-5 px-4 pt-4 pb-4">
        <div>
          <h1 className="text-[26px] font-bold leading-tight tracking-[-0.02em] [font-family:var(--font-display)]">Perfil</h1>
        </div>

        {/* identidad */}
        <div className="flex items-center gap-3">
          <span className="grid size-14 place-items-center rounded-full bg-[color-mix(in_oklab,var(--accent)_14%,transparent)] text-xl font-bold text-[var(--accent)] [font-family:var(--font-display)]">
            {p.inicial}
          </span>
          <div className="min-w-0">
            <p className="truncate text-[17px] font-bold [font-family:var(--font-display)]">{p.nombre}</p>
            <p className="text-[13px] text-[var(--text-secondary)]">En la Ruta desde {p.desde}</p>
          </div>
        </div>

        {/* racha */}
        <div className="rounded-[var(--radius-card)] border border-[color-mix(in_oklab,var(--accent-2)_20%,transparent)] bg-[color-mix(in_oklab,var(--accent-2)_5%,var(--surface))] p-4 shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-[var(--radius-button)] bg-[color-mix(in_oklab,var(--accent-2)_16%,transparent)]">
              <Flame size={20} color="var(--accent-2)" aria-hidden="true" />
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-[28px] font-bold tabular-nums leading-none text-[color-mix(in_oklab,var(--accent-2)_72%,black)] [font-family:var(--font-display)]">{p.rachaActual}</span>
              <span className="text-sm font-semibold text-[var(--text-secondary)]">días seguidos</span>
            </div>
          </div>
          <div className="mt-3 flex gap-4 text-xs text-[var(--text-tertiary)]">
            <span>Mejor racha: <span className="font-semibold text-[var(--text-secondary)] tabular-nums">{p.mejorRacha}</span></span>
            <span>Días en total: <span className="font-semibold text-[var(--text-secondary)] tabular-nums">{p.totalDias}</span></span>
          </div>
        </div>

        {/* hitos */}
        <div className="rounded-[var(--radius-card)] border border-[color-mix(in_oklab,var(--text-tertiary)_10%,transparent)] bg-[var(--surface)] p-4 shadow-[var(--shadow-card)]">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-[0.1em] text-[var(--text-tertiary)]">Hitos</p>
            <p className="text-xs text-[var(--text-tertiary)]">
              Faltan <span className="font-semibold text-[var(--accent)] tabular-nums">{proximo - p.rachaActual}</span> para {proximo} días
            </p>
          </div>
          <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-[var(--surface-2)]">
            <motion.div
              className="h-full rounded-full bg-[var(--accent)]"
              initial={{ scaleX: reduce ? haciaProximo : 0 }}
              animate={{ scaleX: haciaProximo }}
              transition={{ duration: reduce ? 0 : 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: 'left' }}
            />
          </div>
          <div className="mt-3 flex gap-2">
            {p.hitos.map((h) => {
              const logrado = p.rachaActual >= h;
              return (
                <div
                  key={h}
                  className={`flex flex-1 flex-col items-center gap-1 rounded-[var(--radius-button)] border px-2 py-2.5 ${
                    logrado
                      ? 'border-[color-mix(in_oklab,var(--accent-2)_35%,transparent)] bg-[color-mix(in_oklab,var(--accent-2)_10%,transparent)]'
                      : 'border-[color-mix(in_oklab,var(--text-tertiary)_14%,transparent)] bg-[var(--surface-2)]'
                  }`}
                >
                  <Trophy size={15} color={logrado ? 'var(--accent-2)' : 'var(--text-tertiary)'} aria-hidden="true" />
                  <span className={`text-xs font-bold tabular-nums ${logrado ? 'text-[color-mix(in_oklab,var(--accent-2)_70%,black)]' : 'text-[var(--text-tertiary)]'}`}>{h} días</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* progreso de la Ruta */}
        <MotionLink
          href="/app/biblia"
          whileTap={{ scale: reduce ? 1 : 0.98 }}
          className="flex items-center gap-3 rounded-[var(--radius-card)] border border-[color-mix(in_oklab,var(--accent)_18%,transparent)] bg-[var(--surface)] p-4 shadow-[var(--shadow-card)] [touch-action:manipulation]"
        >
          <span className="grid size-11 place-items-center rounded-[var(--radius-button)] bg-[color-mix(in_oklab,var(--accent)_10%,transparent)]">
            <Map size={20} color="var(--accent)" aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[15px] font-semibold">Tu Ruta · {p.rutaProgreso}%</p>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[var(--surface-2)]">
              <div className="h-full rounded-full bg-[var(--accent)]" style={{ width: `${p.rutaProgreso}%` }} />
            </div>
            <p className="mt-1 text-xs text-[var(--text-tertiary)]">Vas por {p.rutaLugar}</p>
          </div>
          <ChevronRight size={18} className="shrink-0 text-[var(--text-tertiary)]" aria-hidden="true" />
        </MotionLink>

        {/* ajustes */}
        <section>
          <p className="text-xs font-bold uppercase tracking-[0.1em] text-[var(--text-tertiary)]">Ajustes</p>
          <span aria-hidden="true" className="mt-2 block h-px w-full" style={{ background: 'var(--hairline)' }} />
          <div className="mt-3 overflow-hidden rounded-[var(--radius-card)] border border-[color-mix(in_oklab,var(--text-tertiary)_10%,transparent)] bg-[var(--surface)] shadow-[var(--shadow-card)]">
            <Fila icon={Bell} titulo="Recordatorio diario" sub={recordatorio ? `Todos los días a las ${hora}` : 'Desactivado'}>
              <Switch on={recordatorio} onToggle={() => setAjuste(setRecordatorio, recordatorio, { recordatorio: !recordatorio })} label="Recordatorio diario" reduce={!!reduce} />
            </Fila>
            <AnimatePresence initial={false}>
              {recordatorio && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden border-t border-[color-mix(in_oklab,var(--text-tertiary)_10%,transparent)] bg-[var(--surface-2)]"
                >
                  <div className="flex gap-2 px-4 py-3">
                    {HORAS.map((h) => (
                      <motion.button
                        key={h}
                        type="button"
                        whileTap={{ scale: reduce ? 1 : 0.95 }}
                        onClick={() => setHoraDB(h)}
                        className={`flex-1 rounded-[var(--radius-button)] py-2 text-xs font-semibold tabular-nums [touch-action:manipulation] ${
                          hora === h
                            ? 'bg-[var(--accent)] text-[var(--bg)]'
                            : 'bg-[var(--surface)] text-[var(--text-secondary)] shadow-[var(--shadow-1)]'
                        }`}
                      >
                        {h}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <Fila icon={Vibrate} titulo="Vibración" sub="Al completar y en las celebraciones" borde>
              <Switch on={vibracion} onToggle={() => setAjuste(setVibracion, vibracion, { vibracion: !vibracion })} label="Vibración" reduce={!!reduce} />
            </Fila>
            <Fila icon={Flame} titulo="Aviso si la racha está en riesgo" sub="Un recordatorio suave, nunca regaños" borde>
              <Switch on={avisoRacha} onToggle={() => setAjuste(setAvisoRacha, avisoRacha, { avisoRacha: !avisoRacha })} label="Aviso de racha" reduce={!!reduce} />
            </Fila>
          </div>
        </section>

        {/* suscripción */}
        <section>
          <p className="text-xs font-bold uppercase tracking-[0.1em] text-[var(--text-tertiary)]">Suscripción</p>
          <span aria-hidden="true" className="mt-2 block h-px w-full" style={{ background: 'var(--hairline)' }} />
          <div className="mt-3 rounded-[var(--radius-card)] border border-[color-mix(in_oklab,var(--text-tertiary)_10%,transparent)] bg-[var(--surface)] p-4 shadow-[var(--shadow-card)]">
            {p.plan === 'pro' ? (
              <p className="text-[15px] font-semibold">Yireth Pro · activo</p>
            ) : (
              <>
                <p className="text-[15px] font-semibold">Prueba de Yireth</p>
                <p className="mt-0.5 text-[13px] text-[var(--text-secondary)]">Te quedan <span className="font-semibold tabular-nums">{p.diasPrueba} días</span>. Después, Yireth Pro sigue con todo desbloqueado.</p>
              </>
            )}
            <motion.button
              type="button"
              whileTap={{ scale: reduce ? 1 : 0.98 }}
              onClick={() => setNotaPlan((v) => !v)}
              className="mt-3 flex h-11 w-full items-center justify-center rounded-[var(--radius-button)] border border-[color-mix(in_oklab,var(--accent)_45%,transparent)] bg-[var(--surface)] text-sm font-semibold text-[var(--accent)] shadow-[var(--shadow-1)] [touch-action:manipulation]"
            >
              Ver planes
            </motion.button>
            <AnimatePresence initial={false}>
              {notaPlan && (
                <motion.p
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden text-center text-xs text-[var(--text-tertiary)]"
                >
                  <span className="block pt-2">Los planes y el cobro se activan cuando el dueño conecte el pago.</span>
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* cuenta */}
        <section>
          <p className="text-xs font-bold uppercase tracking-[0.1em] text-[var(--text-tertiary)]">Cuenta</p>
          <span aria-hidden="true" className="mt-2 block h-px w-full" style={{ background: 'var(--hairline)' }} />
          <div className="mt-3 overflow-hidden rounded-[var(--radius-card)] border border-[color-mix(in_oklab,var(--text-tertiary)_10%,transparent)] bg-[var(--surface)] shadow-[var(--shadow-card)]">
            <EnlaceFila href="/privacidad" icon={ShieldCheck} titulo="Privacidad y términos" />
            <motion.button
              type="button"
              disabled={saliendo}
              whileTap={{ scale: reduce ? 1 : 0.99 }}
              onClick={async () => {
                setSaliendo(true);
                await createClient().auth.signOut();
                router.replace('/entrar');
              }}
              className="flex w-full items-center gap-3 border-t border-[color-mix(in_oklab,var(--text-tertiary)_10%,transparent)] px-4 py-3.5 text-left text-[var(--error)] disabled:opacity-50 [touch-action:manipulation]"
            >
              <LogOut size={18} aria-hidden="true" />
              <span className="text-sm font-semibold">{saliendo ? 'Cerrando…' : 'Cerrar sesión'}</span>
            </motion.button>
          </div>
          <p className="mt-3 text-center text-xs text-[var(--text-tertiary)]">Yireth · versión 1.0</p>
        </section>
      </div>
    </AppShell>
  );
}

function Fila({
  icon: Icon,
  titulo,
  sub,
  borde,
  children,
}: {
  icon: typeof Bell;
  titulo: string;
  sub: string;
  borde?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={`flex items-center gap-3 px-4 py-3.5 ${borde ? 'border-t border-[color-mix(in_oklab,var(--text-tertiary)_10%,transparent)]' : ''}`}>
      <span className="grid size-9 shrink-0 place-items-center rounded-[var(--radius-button)] bg-[color-mix(in_oklab,var(--accent)_10%,transparent)]">
        <Icon size={16} color="var(--accent)" aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold">{titulo}</span>
        <span className="block text-xs text-[var(--text-tertiary)]">{sub}</span>
      </span>
      {children}
    </div>
  );
}

function EnlaceFila({ href, icon: Icon, titulo }: { href: string; icon: typeof Bell; titulo: string }) {
  return (
    <Link href={href} className="flex items-center gap-3 px-4 py-3.5 [touch-action:manipulation]">
      <span className="grid size-9 shrink-0 place-items-center rounded-[var(--radius-button)] bg-[color-mix(in_oklab,var(--accent)_10%,transparent)]">
        <Icon size={16} color="var(--accent)" aria-hidden="true" />
      </span>
      <span className="flex-1 text-sm font-semibold">{titulo}</span>
      <ChevronRight size={18} className="shrink-0 text-[var(--text-tertiary)]" aria-hidden="true" />
    </Link>
  );
}

function Switch({ on, onToggle, label, reduce }: { on: boolean; onToggle: () => void; label: string; reduce: boolean }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={onToggle}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors after:absolute after:inset-[-11px] after:content-[''] [touch-action:manipulation] ${
        on ? 'bg-[var(--accent)]' : 'bg-[color-mix(in_oklab,var(--text-tertiary)_35%,transparent)]'
      }`}
    >
      <motion.span
        className="absolute top-0.5 size-5 rounded-full bg-[var(--bg)] shadow-[var(--shadow-1)]"
        animate={{ left: on ? 22 : 2 }}
        transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 500, damping: 32 }}
      />
    </button>
  );
}
