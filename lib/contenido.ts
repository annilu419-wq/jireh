// Datos semilla de la app interna (Sesión 5). Local, sin backend todavía (Supabase
// llega en la Sesión 6) — igual que el resto del proyecto hasta ahora. Cuando exista
// Supabase, esto se reemplaza por lecturas de `chapters`/`infographics`/`teachings`
// sin tocar los componentes que los consumen.

import type { EscenaKey } from '@/components/app/EscenasContexto';
import type { ContextoFichaData } from '@/components/app/ContextoFicha';
import type { ParaTiHoyData } from '@/components/app/ParaTiHoy';

export interface CapituloHoy {
  ficha: ContextoFichaData;
  /** encabezado de la sección de enseñanza. NT: "Qué te quiso decir Jesús"; AT: "Qué enseña este capítulo" */
  tituloEnsenanza?: string;
  ensenanza: string[];
}

export const CAPITULO_DE_HOY: CapituloHoy = {
  ficha: {
    libro: 'Marcos',
    capitulo: 4,
    subtitulo: 'La parábola del sembrador',
    autor: 'Juan Marcos',
    epoca: '~55 d.C.',
    lugar: 'Galilea',
    escena: 'agua' as EscenaKey,
    captionEscena: 'La escena: Jesús enseña desde una barca a la orilla del mar de Galilea.',
    gancho: 'Jesús no explica la parábola de inmediato. Primero deja que te incomode.',
    quePasa: [
      'Junto al mar de Galilea se junta tanta gente que Jesús se sube a una barca para que todos lo vean y lo escuchen.',
      'Desde ahí cuenta la parábola del sembrador: una misma semilla cae en el camino, entre piedras, entre espinos y en buena tierra — y solo en uno de los cuatro terrenos da fruto. No habla de agricultura: habla de cómo recibes tú la palabra hoy.',
    ],
    enElMapa: 'Aquí Jesús empieza a enseñar en parábolas: historias sencillas que separan a los que solo escuchan de los que de verdad quieren entender.',
    paraHoy: '¿Cuál de los cuatro terrenos eres tú esta semana con lo que Dios te está diciendo?',
    progresoRuta: 42,
    duracionMin: 3,
  },
  ensenanza: [
    'La palabra es la semilla; tu corazón es la tierra.',
    'Lo que ahoga tu fe son los afanes del día, no la falta de tiempo.',
    'Lo sembrado con paciencia da fruto al ciento por uno.',
  ],
};

/* ── LA RUTA — recorrido cronológico. Arranca en Génesis. Semana 1 = D1-D7.
   AT: encabezado "Qué enseña este capítulo". Escenas dibujadas en código. ── */
export const RUTA_CAPITULOS: CapituloHoy[] = [
  {
    ficha: {
      libro: 'Génesis', capitulo: 1, subtitulo: 'En el principio',
      autor: 'Moisés (tradición)', epoca: 'compilado tras el éxodo', lugar: 'los comienzos',
      escena: 'agua' as EscenaKey,
      captionEscena: 'La escena: oscuridad y agua sin forma; entonces, la primera luz.',
      gancho: 'Todo el mundo cita la primera frase. Casi nadie se fija en la palabra que más se repite: «bueno».',
      quePasa: [
        'Al inicio no hay nada que contar: oscuridad y agua sin forma. Entonces Dios habla, y hay luz. Día tras día pone orden y llena el vacío — cielo, mar, tierra, plantas, animales — y al final hace a las personas «a su imagen» y les entrega el mundo para cuidarlo.',
        'No es un round entre ciencia y fe. Es una declaración sobre quién está detrás de todo: un Dios que ordena el caos con su palabra, y que llama «bueno» a lo que hace.',
      ],
      enElMapa: 'Es la primera página de la historia. Todo lo que viene después —la promesa, el rescate, la cruz— es Dios devolviéndole el orden y lo «bueno» a un mundo que se rompió.',
      paraHoy: '¿Qué parte de tu vida estás mirando como un desastre, que Dios podría estar llamando «el principio de algo»?',
      progresoRuta: 1, duracionMin: 3,
    },
    tituloEnsenanza: 'Qué enseña este capítulo',
    ensenanza: [
      'Existes por una decisión, no por un accidente.',
      'Llevas la imagen de Dios: tu valor no te lo dan tus resultados de esta semana.',
      'Cuando tu vida se siente como «caos sin forma», ese es el material con el que Dios trabaja.',
    ],
  },
  {
    ficha: {
      libro: 'Génesis', capitulo: 2, subtitulo: 'El jardín y el descanso',
      autor: 'Moisés (tradición)', epoca: 'compilado tras el éxodo', lugar: 'Edén',
      escena: 'casa' as EscenaKey,
      captionEscena: 'La escena: un jardín para trabajar y cuidar, con un solo límite.',
      gancho: 'Lo primero que Dios llama «no bueno» no es un pecado. Es la soledad.',
      quePasa: [
        'El capítulo 1 mira todo desde lejos; este se acerca. Dios forma al primer hombre del polvo y le da su aliento, lo pone en un jardín para trabajarlo y cuidarlo, y le da libertad con un solo límite. Luego dice: «no es bueno que el hombre esté solo», y hace a la mujer, de su misma carne, para caminar a la par.',
        'Y en medio de todo, Dios descansa. Y bendice ese descanso. Desde el primer día, trabajo y pausa van juntos.',
      ],
      enElMapa: 'Aquí se ve el diseño original, antes de que nada se dañara: propósito, compañía y descanso. Todo lo que la Biblia intenta restaurar después ya está en este capítulo.',
      paraHoy: 'Si Dios bendijo el descanso desde el primer día, ¿por qué tú lo tratas como lo último de la lista?',
      progresoRuta: 1, duracionMin: 3,
    },
    tituloEnsenanza: 'Qué enseña este capítulo',
    ensenanza: [
      'Fuiste hecho para un propósito (cuidar algo) y para vínculos reales, no para funcionar solo.',
      'El descanso no es premio por rendir. Dios lo hizo parte del diseño.',
      'Los límites de Dios no son cárcel. Son las paredes que sostienen la casa.',
    ],
  },
  {
    ficha: {
      libro: 'Génesis', capitulo: 3, subtitulo: 'Lo que se rompió',
      autor: 'Moisés (tradición)', epoca: 'compilado tras el éxodo', lugar: 'Edén',
      escena: 'camino' as EscenaKey,
      captionEscena: 'La escena: el camino de salida del jardín.',
      gancho: 'La primera frase que dice la serpiente en la Biblia no es una mentira. Es una pregunta: «¿De verdad Dios dijo…?».',
      quePasa: [
        'El hombre y la mujer tienen todo un jardín y un solo límite. La serpiente no les ordena nada: solo les hace dudar de que Dios sea bueno. Cruzan el límite, y algo se quiebra por dentro — se esconden, se tapan, se echan la culpa uno al otro. Hay consecuencias reales y salen del jardín.',
        'Pero en medio del castigo, Dios suelta una promesa: de la descendencia de la mujer vendrá Alguien que le va a aplastar la cabeza a la serpiente.',
      ],
      enElMapa: 'Aquí empieza el hilo más largo de toda la Biblia: la promesa de un rescate. No se corta hasta la cruz.',
      paraHoy: '¿Qué límite que Dios te puso estás tratando como una jaula, cuando en realidad te está cuidando?',
      progresoRuta: 1, duracionMin: 3,
    },
    tituloEnsenanza: 'Qué enseña este capítulo',
    ensenanza: [
      'El pecado casi nunca toca la puerta de frente. Entra como una duda razonable a las 11 de la noche.',
      'Esconderte y culpar a otro es la reacción más vieja del mundo. Y la que menos te sirve.',
      'Antes de que pidieras perdón, Dios ya tenía el plan de rescate en marcha.',
    ],
  },
  {
    ficha: {
      libro: 'Génesis', capitulo: 4, subtitulo: 'Caín y Abel',
      autor: 'Moisés (tradición)', epoca: 'compilado tras el éxodo', lugar: 'afuera del Edén',
      escena: 'camino' as EscenaKey,
      captionEscena: 'La escena: dos hermanos, dos ofrendas, un campo.',
      gancho: 'Dios le hace a Caín una pregunta que parece de otra época pero es de esta mañana: «¿Por qué estás enojado?».',
      quePasa: [
        'Dos hermanos traen una ofrenda. La de Abel agrada a Dios; la de Caín, no. En vez de preguntar por qué, Caín se llena de rabia. Dios le advierte directo: «el pecado está a la puerta… pero tú puedes dominarlo». Caín no escucha. Lleva a su hermano al campo y lo mata.',
        'Cuando Dios le pregunta dónde está Abel, responde con la frase más fría de la Biblia: «¿Acaso soy yo el guarda de mi hermano?». Aun así, Dios no lo destruye: le pone una marca de protección y lo deja vivir.',
      ],
      enElMapa: 'Génesis 3 mostró el pecado entrando al corazón. Aquí lo vemos salir a la calle: en una generación ya hay envidia, mentira y sangre.',
      paraHoy: '¿A quién estás tratando como «no es mi problema» cuando Dios te puso ahí para cuidarlo?',
      progresoRuta: 2, duracionMin: 3,
    },
    tituloEnsenanza: 'Qué enseña este capítulo',
    ensenanza: [
      'La envidia rara vez empieza grande. Empieza comparándote con alguien en el trabajo o en redes.',
      'Dios te avisa antes, no después. «El pecado está a la puerta» casi siempre lo sentimos venir.',
      '«No es mi problema» es la mentira que nos contamos para no cuidar a la gente que Dios puso cerca.',
    ],
  },
  {
    ficha: {
      libro: 'Génesis', capitulo: 6, subtitulo: 'El diluvio (Génesis 6–9)',
      autor: 'Moisés (tradición)', epoca: 'compilado tras el éxodo', lugar: 'la tierra entera',
      escena: 'agua' as EscenaKey,
      captionEscena: 'La escena: una barca enorme, una familia adentro, el agua subiendo.',
      gancho: 'Antes de mandar el diluvio, el texto dice algo incómodo: a Dios «le dolió en el corazón». No fue rabia fría. Fue dolor.',
      quePasa: [
        'La maldad de la humanidad llega a un punto sin retorno. Dios decide empezar de nuevo, pero no desde cero: rescata a Noé, su familia y a los animales en un arca enorme que Noé construye por años mientras todos se ríen.',
        'Cae el diluvio. Cuando las aguas bajan, Dios hace un pacto y lo firma con un arcoíris: nunca más.',
      ],
      enElMapa: 'Es el primer «rescate en medio del juicio» de la Biblia. Una puerta, una familia adentro, el resto afuera. El patrón se repite —en el éxodo, en la cruz— hasta que quede claro de qué se trata.',
      paraHoy: '¿Qué te pidió Dios que hicieras hace tiempo y sigues sin empezar porque «nadie más lo está haciendo»?',
      progresoRuta: 2, duracionMin: 3,
    },
    tituloEnsenanza: 'Qué enseña este capítulo',
    ensenanza: [
      'El mal real le duele a Dios. No es un juez que disfruta el castigo.',
      'Noé obedeció años sin ver resultados, con todos burlándose. La fe casi siempre se ve así.',
      'El arcoíris no es decoración: es Dios comprometiéndose por escrito a no soltarnos.',
    ],
  },
  {
    ficha: {
      libro: 'Génesis', capitulo: 11, subtitulo: 'La torre de Babel',
      autor: 'Moisés (tradición)', epoca: 'compilado tras el éxodo', lugar: 'Sinar (Babilonia)',
      escena: 'ciudad' as EscenaKey,
      captionEscena: 'La escena: una torre a medio construir bajo un cielo enorme.',
      gancho: 'La frase que arruina todo en este capítulo es: «hagámonos un nombre».',
      quePasa: [
        'La humanidad, otra vez unida, decide construir una torre «que llegue al cielo»: un monumento a sí misma para no depender de nadie. Dios baja a ver —con cierta ironía, porque la torre «altísima» le queda lejísimos—, confunde el idioma y los dispersa.',
        'El proyecto no se derrumba por falta de recursos, sino de humildad.',
      ],
      enElMapa: 'Babel es la humanidad tratando de subir al cielo por su cuenta. El resto de la Biblia es Dios bajando a nosotros. Justo después, Dios llama a un solo hombre y arranca el plan de verdad.',
      paraHoy: '¿Estás construyendo algo para servir a Dios, o para no necesitarlo?',
      progresoRuta: 3, duracionMin: 3,
    },
    tituloEnsenanza: 'Qué enseña este capítulo',
    ensenanza: [
      '«Hacerme un nombre» suena a ambición sana hasta que ves que es querer no necesitar a Dios.',
      'La unidad sin Dios no es virtud; puede ser solo un grupo grande equivocándose junto.',
      'Cuando un plan tuyo se cae, a veces es Dios cerrando un camino para abrir el suyo.',
    ],
  },
  {
    ficha: {
      libro: 'Génesis', capitulo: 12, subtitulo: 'El llamado de Abram',
      autor: 'Moisés (tradición)', epoca: 'compilado tras el éxodo', lugar: 'de Harán a Canaán',
      escena: 'desierto' as EscenaKey,
      captionEscena: 'La escena: un hombre y su familia saliendo hacia una tierra que no conocen.',
      gancho: 'Dios le promete a Abram cinco cosas enormes. Abram tiene 75 años, cero hijos y ninguna razón para creerle.',
      quePasa: [
        'Dios le dice a Abram: «vete de tu tierra… a la tierra que te mostraré». No le da mapa, ni fecha, ni detalles. Solo una promesa: «haré de ti una nación grande… y en ti serán benditas todas las familias de la tierra». Y Abram, sin garantías, empaca y sale.',
        'Más adelante en el capítulo tiene un tropiezo feo por miedo. Y Dios igual sigue con él.',
      ],
      enElMapa: 'Este es el capítulo bisagra del Antiguo Testamento. La promesa que empezó en Génesis 3 ahora tiene nombre y dirección: por la familia de Abram llega la bendición para todos. Ese «todos» te incluye.',
      lineaPromesa: 'Abraham',
      paraHoy: '¿Qué «primer paso» te está pidiendo Dios que no das porque todavía no ves a dónde lleva?',
      progresoRuta: 3, duracionMin: 3,
    },
    tituloEnsenanza: 'Qué enseña este capítulo',
    ensenanza: [
      'Dios muchas veces te da el primer paso, no el itinerario completo. Salir es la fe.',
      'Abram falló apenas llegó, por miedo, y no perdió la promesa. Tu tropiezo no cancela el plan de Dios.',
      'Desde el día uno, el plan de Dios nunca fue solo para unos pocos.',
    ],
  },
];

/** Devuelve el capítulo de la Ruta para {libro, capitulo}; si no está producido, cae a Marcos 4. */
export function capituloPorRuta(libro: string, capitulo: number): CapituloHoy {
  return (
    RUTA_CAPITULOS.find((c) => c.ficha.libro === libro && c.ficha.capitulo === capitulo) ??
    CAPITULO_DE_HOY
  );
}

/** El siguiente capítulo de la Ruta, o null si ya es el último producido. */
export function siguienteEnRuta(libro: string, capitulo: number): { libro: string; capitulo: number; progreso: number } | null {
  const i = RUTA_CAPITULOS.findIndex((c) => c.ficha.libro === libro && c.ficha.capitulo === capitulo);
  if (i < 0 || i + 1 >= RUTA_CAPITULOS.length) return null;
  const sig = RUTA_CAPITULOS[i + 1].ficha;
  return { libro: sig.libro, capitulo: sig.capitulo, progreso: sig.progresoRuta };
}

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
