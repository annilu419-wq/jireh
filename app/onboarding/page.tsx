'use client';

// Onboarding + paywall de Yireth (Sesión 4). Modelo onboarding-first anónimo:
// el estado vive en el navegador; el pago (Hotmart) es SIMULADO — se conecta en la Sesión 6.
// Los 5 trabajos (02B): segmentar · personalizar · activar (la primera victoria) ·
// crear deseo · preparar el pago. Copy trazado a FICHA-AVATAR (avatar "María Alejandra").

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  FunnelShell,
  FunnelHeader,
  StepHeader,
  Pregunta,
  Opciones,
  Reconocimiento,
  Compromiso,
  HoldToCommit,
  A,
  type Opcion,
} from '@/components/funnel/ui';
import { ShieldCheck } from 'lucide-react';
import { Loading } from '@/components/funnel/Loading';
import {
  PrimeraVictoria,
  PaywallRecap,
  PaywallTimeline,
  PaywallPrecio,
  type Respuestas,
} from '@/components/funnel/Paywall';

type Step =
  | 'q_dolor'
  | 'r1'
  | 'q_inicio'
  | 'q_momento'
  | 'q_dias'
  | 'q_probaste'
  | 'r2'
  | 'q_canal'
  | 'loading'
  | 'aha'
  | 'pw_recap'
  | 'hold'
  | 'pw_timeline'
  | 'pw_precio';

const ORDEN: Step[] = [
  'q_dolor', 'r1', 'q_inicio', 'q_momento', 'q_dias', 'q_probaste', 'r2', 'q_canal',
  'loading', 'aha', 'pw_recap', 'hold', 'pw_timeline', 'pw_precio',
];

const PCT: Record<Step, number> = {
  q_dolor: 8, r1: 20, q_inicio: 30, q_momento: 45, q_dias: 60, q_probaste: 74, r2: 82, q_canal: 92,
  loading: 100, aha: 100, pw_recap: 100, hold: 100, pw_timeline: 100, pw_precio: 100,
};

const OPC_DOLOR: Opcion[] = [
  { id: 'perder', label: 'Me pierdo entre tantos libros, reyes y profetas' },
  { id: 'sentido', label: 'La leo, pero no sé qué significa para mi vida' },
  { id: 'dejar', label: 'Empiezo con ganas y a los pocos días la dejo' },
  { id: 'culpa', label: 'Casi no la abro — y me da culpa' },
];
const OPC_INICIO: Opcion[] = [
  { id: 'evangelios', label: 'Por la vida de Jesús (los Evangelios)', recomendada: true },
  { id: 'genesis', label: 'Por el principio (Génesis)' },
  { id: 'salmos', label: 'Por los Salmos, para orar' },
  { id: 'guia', label: 'No sé — empieza por donde tenga más sentido' },
];
const OPC_MOMENTO: Opcion[] = [
  { id: 'manana', label: 'En la mañana, al despertar' },
  { id: 'media', label: 'A media mañana o en el almuerzo' },
  { id: 'noche', label: 'En la noche, antes de dormir' },
];
const OPC_PROBASTE: Opcion[] = [
  { id: 'si', label: 'Sí, varias veces — y lo dejé' },
  { id: 'alguna', label: 'Alguna vez, pero no seguí' },
  { id: 'no', label: 'No, esta es mi primera vez' },
];
const OPC_CANAL: Opcion[] = [
  { id: 'ig', label: 'Instagram' },
  { id: 'tiktok', label: 'TikTok' },
  { id: 'reco', label: 'Me la recomendaron' },
  { id: 'google', label: 'Google' },
  { id: 'otro', label: 'Otro' },
];

const INICIO_TXT: Record<string, string> = {
  evangelios: 'los Evangelios',
  genesis: 'el principio (Génesis)',
  salmos: 'los Salmos',
  guia: 'los Evangelios',
};
const MOMENTO_TXT: Record<string, string> = {
  manana: 'cada mañana',
  media: 'a media mañana',
  noche: 'cada noche',
};

export default function Onboarding() {
  const router = useRouter();
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const step = ORDEN[i];

  // QA/screenshots: ?s=<step> salta a un paso (solo en dev, tras montar — no afecta el SSR).
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;
    const s = new URLSearchParams(window.location.search).get('s') as Step | null;
    const idx = s ? ORDEN.indexOf(s) : -1;
    if (idx >= 0) setI(idx);
  }, []);

  const [a, setA] = useState<{ dolor?: string; inicio?: string; momento?: string; dias: number; probaste?: string; canal?: string }>({ dias: 5 });

  const go = (n: number) => setI((p) => Math.max(0, Math.min(ORDEN.length - 1, p + n)));
  const set = (k: string, v: string | number) => setA((p) => ({ ...p, [k]: v }));

  const respuestas: Respuestas = {
    inicio: INICIO_TXT[a.inicio ?? 'evangelios'],
    momento: MOMENTO_TXT[a.momento ?? 'manana'],
    dias: a.dias,
  };

  const lineasLoading = useMemo(
    () => [
      { texto: `Empezando por ${INICIO_TXT[a.inicio ?? 'evangelios']}` },
      { texto: `Ajustando a ${a.dias} días por semana` },
      { texto: `Tu recordatorio: ${MOMENTO_TXT[a.momento ?? 'manana']}` },
      { texto: 'Preparando tu primer capítulo: Marcos 4' },
      { texto: 'Trazando tu Ruta por los 66 libros' },
    ],
    [a.inicio, a.dias, a.momento],
  );

  const PREG_N: Partial<Record<Step, number>> = { q_dolor: 1, q_inicio: 2, q_momento: 3, q_dias: 4, q_probaste: 5, q_canal: 6 };
  const showHeader = ['q_dolor', 'r1', 'q_inicio', 'q_momento', 'q_dias', 'q_probaste', 'r2', 'q_canal'].includes(step);
  const puedeAtras = i > 0 && showHeader && step !== 'q_dolor';
  const pasoTxt = PREG_N[step] ? `Pregunta ${PREG_N[step]} de 6` : undefined;

  const trans = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.2 } }
    : {
        initial: { opacity: 0, x: 40 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -24 },
        transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
      };

  return (
    <FunnelShell>
      {showHeader && <FunnelHeader paso={pasoTxt} />}
      {showHeader && (
        <StepHeader
          pct={PCT[step]}
          onBack={puedeAtras ? () => go(-1) : undefined}
          onExit={step === 'q_dolor' ? () => router.push('/') : undefined}
        />
      )}

      <AnimatePresence mode="wait">
        <motion.div key={step} {...trans} className="flex flex-1 flex-col">
          {step === 'q_dolor' && (
            <QLayout prog={PCT[step]} nota="Gratis 7 días · cancelas con un correo">
              <Pregunta hint="Con lo que respondas, armo tu Ruta.">Cuando abres la Biblia <A>sola</A>, ¿qué te pasa?</Pregunta>
              <Opciones opciones={OPC_DOLOR} onPick={(id) => { set('dolor', id); go(1); }} />
            </QLayout>
          )}

          {step === 'r1' && (
            <Reconocimiento
              titulo="No te pierdes por falta de fe"
              cuerpo={
                <>
                  Te pierdes porque nadie te dio el mapa: la Biblia no está en orden y nadie te explicó por dónde va la historia.{' '}
                  <span className="font-semibold text-[var(--text-primary)]">La Ruta</span> ordena los 66 libros como un solo camino — y te explica cada capítulo antes de leerlo.
                </>
              }
              visual={<MiniRuta />}
              onNext={() => go(1)}
            />
          )}

          {step === 'q_inicio' && (
            <QLayout prog={PCT[step]}>
              <Pregunta>¿Por dónde quieres empezar tu <A>Ruta</A>?</Pregunta>
              <Opciones opciones={OPC_INICIO} onPick={(id) => { set('inicio', id); go(1); }} />
            </QLayout>
          )}

          {step === 'q_momento' && (
            <QLayout prog={PCT[step]}>
              <Pregunta hint="Te enviaremos un aviso amable a esa hora.">¿Cuándo vas a leer tu <A>capítulo del día</A>?</Pregunta>
              <Opciones opciones={OPC_MOMENTO} onPick={(id) => { set('momento', id); go(1); }} />
            </QLayout>
          )}

          {step === 'q_dias' && (
            <div className="flex flex-1 flex-col">
              <div className="px-4 pt-6">
                <Pregunta>¿Cuántos días por semana quieres <A>conectar con Dios</A>?</Pregunta>
              </div>
              <Compromiso
                inicial={a.dias}
                unidad="días por semana"
                feedback={(v) =>
                  v <= 2 ? 'Un buen comienzo, sin presión.' : v <= 5 ? 'Constancia realista — así se forma el hábito.' : 'Vas con todo. Te acompañamos para no fallar.'
                }
                ctaLabel="Fijar mi meta"
                onCommit={(v) => { set('dias', v); go(1); }}
                footer={<RutaBand prog={PCT.q_dias} />}
              />
            </div>
          )}

          {step === 'q_probaste' && (
            <QLayout prog={PCT[step]}>
              <Pregunta>¿Ya intentaste antes con un <A>plan o una app</A> de lectura?</Pregunta>
              <Opciones opciones={OPC_PROBASTE} onPick={(id) => { set('probaste', id); go(1); }} />
            </QLayout>
          )}

          {step === 'r2' && (
            <Reconocimiento
              titulo={a.probaste === 'no' ? 'Empezar era lo más difícil' : 'No fue tu culpa'}
              cuerpo={
                a.probaste === 'no' ? (
                  <>Y ya lo hiciste. La Ruta te lleva de la mano: un capítulo al día, explicado y en orden. Si un día no puedes, te ayuda a retomar.</>
                ) : (
                  <>Los planes que abandonaste te pedían 30 o 45 minutos y palabras de seminario. La Ruta te pide <span className="font-semibold text-[var(--text-primary)]">5 minutos</span>, en orden — y si fallas un día, te ayuda a retomar sin culpa.</>
                )
              }
              onNext={() => go(1)}
            />
          )}

          {step === 'q_canal' && (
            <QLayout prog={PCT[step]}>
              <Pregunta hint="Nos ayuda a saber dónde encontrarte.">¿Cómo llegaste a <A>Yireth</A>?</Pregunta>
              <Opciones opciones={OPC_CANAL} columnas={2} onPick={(id) => { set('canal', id); go(1); }} />
            </QLayout>
          )}

          {step === 'loading' && <Loading lineas={lineasLoading} onDone={() => go(1)} />}

          {step === 'aha' && <PrimeraVictoria onNext={() => go(1)} />}

          {step === 'pw_recap' && <PaywallRecap r={respuestas} onNext={() => go(1)} />}

          {step === 'hold' && <HoldToCommit pregunta="¿Lista para empezar tu Ruta?" onDone={() => go(1)} />}

          {step === 'pw_timeline' && <PaywallTimeline onNext={() => go(1)} />}

          {step === 'pw_precio' && (
            <PaywallPrecio
              onPay={() => router.push('/entrar?from=pago')}
              onDecline={() => router.push('/entrar?from=gratis')}
              onBack={() => go(-1)}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </FunnelShell>
  );
}

/* layout de pregunta: contenido arriba; la banda de la Ruta anclada AL FONDO
   (pie de contexto, nunca hueco muerto entre medio) + reaseguro opcional */
function QLayout({ children, prog, nota }: { children: React.ReactNode; prog: number; nota?: string }) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col justify-center py-6">{children}</div>
      <div className="px-4 pb-[max(16px,env(safe-area-inset-bottom))] pt-4">
        {nota && (
          <div className="mb-3 flex items-center justify-center gap-2 text-sm text-[var(--text-tertiary)]">
            <span aria-hidden="true" className="grid size-6 shrink-0 place-items-center rounded-full bg-[color-mix(in_oklab,var(--accent)_12%,transparent)]">
              <ShieldCheck size={13} color="var(--accent)" />
            </span>
            <span>{nota}</span>
          </div>
        )}
        <RutaBand prog={prog} />
      </div>
    </div>
  );
}

function RutaBand({ prog }: { prog: number }) {
  const reduce = useReducedMotion();
  const dibujo = Math.max(0.12, Math.min(1, prog / 100));
  const tinta = 'color-mix(in oklab, var(--text-tertiary) 55%, transparent)';
  return (
    <div className="rounded-xl bg-[var(--surface-2)] px-4 py-3">
      <p className="text-sm font-semibold uppercase tracking-[0.1em] text-[var(--text-tertiary)]">Tu Ruta se va armando</p>
      <svg viewBox="0 0 300 44" className="mt-2 w-full" aria-hidden="true">
        {/* relieve tenue */}
        <g fill="none" stroke={tinta} strokeOpacity="0.55" strokeWidth="1">
          <path d="M6 34 q7 -5 14 0 t14 0" />
          <path d="M252 38 q7 -5 14 0 t14 0" />
        </g>
        {/* sendero completo, punteado */}
        <path d="M16 32 C64 12 92 40 142 20 C192 1 222 34 284 12" fill="none" stroke={tinta} strokeWidth="2.4" strokeLinecap="round" strokeDasharray="1 7" />
        {/* tramo recorrido, se dibuja según el avance */}
        <motion.path
          d="M16 32 C64 12 92 40 142 20 C192 1 222 34 284 12"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: reduce ? dibujo : 0 }}
          animate={{ pathLength: dibujo }}
          transition={{ duration: reduce ? 0 : 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
        {/* hito ✕ */}
        <g stroke="var(--accent)" strokeWidth="2.2" strokeLinecap="round">
          <path d="M76 22 l6 6 M82 22 l-6 6" />
        </g>
        {/* pin de salida */}
        <g transform="translate(16 32)">
          <circle r="4.5" fill="var(--bg)" stroke="var(--accent)" strokeWidth="2.6" />
          <path d="M0 -4.5 L0 -14 L8 -11 L0 -8 Z" fill="var(--accent)" />
        </g>
        {/* aquí estás */}
        <g transform="translate(142 20)">
          <circle r="10" fill="none" stroke="var(--accent)" strokeOpacity="0.35" strokeWidth="1" />
          <circle r="5" fill="var(--accent)" />
        </g>
        {/* rosa de los vientos en la meta */}
        <g transform="translate(284 12)" stroke={tinta} fill="none">
          <circle r="7.5" strokeWidth="1" />
          <path d="M0 -10 L2.4 0 L0 10 L-2.4 0 Z" fill={tinta} stroke="none" />
          <path d="M-10 0 L0 2.4 L10 0 L0 -2.4 Z" fill={tinta} fillOpacity="0.6" stroke="none" />
        </g>
      </svg>
    </div>
  );
}

/* mini mapa de la Ruta para la pantalla de reconocimiento (dispositivo ownable: mapa de expedición) */
function MiniRuta() {
  const tinta = 'color-mix(in oklab, var(--text-tertiary) 55%, transparent)';
  return (
    <svg viewBox="0 0 300 118" className="w-full" role="img" aria-label="Un mapa donde el camino une Génesis, los Evangelios y Apocalipsis">
      {/* graticula */}
      <g fill="none" stroke={tinta} strokeOpacity="0.3" strokeWidth="1">
        <path d="M-10 26 C70 12 150 40 320 20" />
        <path d="M-10 64 C70 50 150 78 320 58" />
        <path d="M-10 102 C70 88 150 116 320 96" />
        <path d="M62 -10 C52 40 72 82 62 132" />
        <path d="M170 -10 C160 40 180 82 170 132" />
        <path d="M266 -10 C256 40 276 82 266 132" />
      </g>
      {/* relieve: montañas y olas */}
      <g fill="none" stroke={tinta} strokeOpacity="0.55" strokeWidth="1">
        <path d="M44 50 l8 -11 l8 11 M56 50 l8 -9 l8 9" />
        <path d="M206 34 l7 -10 l7 10 M218 34 l7 -8 l7 8" />
        <path d="M150 98 q6 -6 12 0 t12 0 t12 0" />
        <path d="M64 104 q6 -6 12 0 t12 0" />
      </g>
      {/* sendero completo punteado */}
      <path d="M28 90 C72 68 58 34 130 26 C198 18 190 54 272 22" fill="none" stroke={tinta} strokeWidth="2.6" strokeLinecap="round" strokeDasharray="1 8" />
      {/* tramo recorrido */}
      <path d="M28 90 C72 68 58 34 130 26" fill="none" stroke="var(--accent)" strokeWidth="3.4" strokeLinecap="round" />
      {/* hito ✕ */}
      <g stroke="var(--accent)" strokeWidth="2.4" strokeLinecap="round">
        <path d="M70 54 l7 7 M77 54 l-7 7" />
      </g>
      {/* pin de salida: Génesis */}
      <g transform="translate(28 90)">
        <circle r="5" fill="var(--bg)" stroke="var(--accent)" strokeWidth="2.6" />
        <path d="M0 -5 L0 -17 L10 -13 L0 -9 Z" fill="var(--accent)" />
      </g>
      <text x="28" y="112" fontSize="9" fontWeight="600" fontFamily="var(--font-body)" fill="var(--text-secondary)" textAnchor="middle">Génesis</text>
      {/* estrella: Evangelios */}
      <g transform="translate(130 26)">
        <circle r="12" fill="none" stroke="var(--accent)" strokeOpacity="0.35" strokeWidth="1" />
        <path d="M0 -7.5 L1.9 -1.9 L7.5 -1.9 L2.8 1.3 L4.4 6.8 L0 3.4 L-4.4 6.8 L-2.8 1.3 L-7.5 -1.9 L-1.9 -1.9 Z" fill="var(--accent)" />
      </g>
      <text x="130" y="11" fontSize="10" fontWeight="700" fontFamily="var(--font-body)" fill="var(--accent)" textAnchor="middle">Evangelios</text>
      {/* meta: Apocalipsis */}
      <g transform="translate(272 22)">
        <circle r="4.5" fill="var(--bg)" stroke="var(--accent)" strokeWidth="2.4" />
      </g>
      <text x="268" y="13" fontSize="9" fontFamily="var(--font-body)" fill="var(--text-secondary)" textAnchor="end">Apoc.</text>
      {/* rosa de los vientos */}
      <g transform="translate(32 24)" stroke={tinta} fill="none">
        <circle r="9" strokeWidth="1" />
        <path d="M0 -12 L2.5 0 L0 12 L-2.5 0 Z" fill={tinta} stroke="none" />
        <path d="M-12 0 L0 2.5 L12 0 L0 -2.5 Z" fill={tinta} fillOpacity="0.6" stroke="none" />
      </g>
    </svg>
  );
}
