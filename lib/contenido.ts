// Datos semilla de la app interna (Sesión 5). Local, sin backend todavía (Supabase
// llega en la Sesión 6) — igual que el resto del proyecto hasta ahora. Cuando exista
// Supabase, esto se reemplaza por lecturas de `chapters`/`infographics`/`teachings`
// sin tocar los componentes que los consumen.

import type { EscenaKey } from '@/components/app/EscenasContexto';
import type { ContextoFichaData } from '@/components/app/ContextoFicha';
import type { ParaTiHoyData } from '@/components/app/ParaTiHoy';

export interface CapituloHoy {
  ficha: ContextoFichaData;
  ensenanza: string[];
}

export const CAPITULO_DE_HOY: CapituloHoy = {
  ficha: {
    libro: 'Marcos',
    capitulo: 4,
    subtitulo: 'La parábola del sembrador',
    autor: 'Juan Marcos',
    epoca: '~55 d.C.',
    lugar: 'Mar de Galilea',
    escena: 'agua' as EscenaKey,
    captionEscena: 'Jesús enseña desde una barca; la semilla cae en cuatro terrenos.',
    quePasa: [
      'Junto al mar de Galilea se junta tanta gente que Jesús se sube a una barca para que todos lo vean y lo escuchen.',
      'Desde ahí cuenta la parábola del sembrador: una misma semilla cae en el camino, entre piedras, entre espinos y en buena tierra — y solo en uno de los cuatro terrenos da fruto. No habla de agricultura: habla de cómo recibes tú la palabra hoy.',
    ],
    progresoRuta: 42,
    duracionMin: 3,
  },
  ensenanza: [
    'La palabra es la semilla; tu corazón es la tierra.',
    'Lo que ahoga tu fe son los afanes del día, no la falta de tiempo.',
    'Lo sembrado con paciencia da fruto al ciento por uno.',
  ],
};

export const PARA_TI_HOY: ParaTiHoyData = {
  versiculo: 'El Señor es mi pastor; nada me faltará.',
  referencia: 'Salmo 23:1',
  reflexion: 'Hoy, antes de que el día te apure, recuerda que no caminas sola. Un minuto de calma antes de empezar.',
};

export const RACHA_ACTUAL = 3;

/* ── Diario de oración (Sesión 5). Local, sin backend hasta la Sesión 6. ── */
export interface Peticion {
  id: string;
  tipo?: 'peticion' | 'gratitud'; // sin valor = 'peticion' (compat. semilla vieja)
  titulo: string;
  nota?: string;
  estado: 'pendiente' | 'respondida'; // solo aplica a 'peticion'
  creada: string; // etiqueta legible ("hoy", "hace 3 días", "12 ago")
  respondida?: string;
}

export const PETICIONES_SEED: Peticion[] = [
  { id: 'p1', tipo: 'peticion', titulo: 'Sabiduría para la decisión del trabajo', nota: 'Que tenga paz y claridad esta semana.', estado: 'pendiente', creada: 'hace 2 días' },
  { id: 'p2', tipo: 'peticion', titulo: 'Por la salud de mi mamá', estado: 'pendiente', creada: 'hace 5 días' },
  { id: 'p3', tipo: 'peticion', titulo: 'Que se resolviera lo del arriendo', estado: 'respondida', creada: 'hace 3 semanas', respondida: 'hace 4 días' },
  { id: 'g1', tipo: 'gratitud', titulo: 'Por el día que tuvimos juntos en familia', estado: 'pendiente', creada: 'ayer' },
  { id: 'g2', tipo: 'gratitud', titulo: 'Por la fuerza para levantarme temprano esta semana', estado: 'pendiente', creada: 'hace 6 días' },
];

/* ── Calma / Modo Crisis (Sesión 5). Contenido CURADO — nunca IA presentada como
   voz de Dios. Neutro interdenominacional. Por emoción: pasaje + oración guiada
   corta (3 líneas para respirar). "ritual" VETADO. ── */
export type EmocionKey = 'ansiedad' | 'tristeza' | 'culpa' | 'gratitud';

export interface Emocion {
  key: EmocionKey;
  titulo: string;
  descripcion: string;
  versiculo: string;
  referencia: string;
  oracion: string[]; // 3 líneas cortas, una por respiración
}

/* ── Perfil (Sesión 5). Local hasta la Sesión 6 (Supabase + Hotmart). ── */
export const PERFIL = {
  nombre: 'María Alejandra',
  inicial: 'M',
  desde: 'hace 3 días',
  rachaActual: RACHA_ACTUAL,
  mejorRacha: 5,
  totalDias: 12,
  rutaProgreso: 42,
  rutaLugar: 'Marcos 4',
  hitos: [7, 30, 100],
  plan: 'prueba' as 'prueba' | 'pro',
  diasPrueba: 5,
};

export const CALMA: Emocion[] = [
  {
    key: 'ansiedad',
    titulo: 'Ansiedad',
    descripcion: 'La mente acelerada, el pecho apretado.',
    versiculo: 'Por nada estéis afanosos… y la paz de Dios guardará vuestros corazones.',
    referencia: 'Filipenses 4:6-7',
    oracion: ['Suelto lo que no puedo controlar.', 'Respiro tu paz.', 'Quédate conmigo este minuto.'],
  },
  {
    key: 'tristeza',
    titulo: 'Tristeza',
    descripcion: 'El peso que hoy no se va.',
    versiculo: 'Cercano está el Señor a los quebrantados de corazón.',
    referencia: 'Salmo 34:18',
    oracion: ['No tengo que fingir que estoy bien.', 'Tú estás cerca.', 'Sostén mi corazón hoy.'],
  },
  {
    key: 'culpa',
    titulo: 'Culpa',
    descripcion: 'Algo que hiciste te pesa.',
    versiculo: 'Si confesamos nuestros pecados, él es fiel y justo para perdonarnos.',
    referencia: '1 Juan 1:9',
    oracion: ['Reconozco lo que hice.', 'Recibo tu perdón.', 'Empiezo de nuevo desde aquí.'],
  },
  {
    key: 'gratitud',
    titulo: 'Gratitud',
    descripcion: 'Hoy quieres dar gracias.',
    versiculo: 'Bendice, alma mía, al Señor, y no olvides ninguno de sus beneficios.',
    referencia: 'Salmo 103:2',
    oracion: ['Gracias por lo que veo y lo que no veo.', 'Por este día.', 'Por ti.'],
  },
];
