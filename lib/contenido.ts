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
    citaVersiculos: 'Marcos 4:1-20',
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
      libro: 'Génesis', capitulo: 1, subtitulo: 'En el principio', citaVersiculos: 'Génesis 1:1-31',
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
      libro: 'Génesis', capitulo: 2, subtitulo: 'El jardín y el descanso', citaVersiculos: 'Génesis 2:1-25',
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
      libro: 'Génesis', capitulo: 3, subtitulo: 'Lo que se rompió', citaVersiculos: 'Génesis 3:1-24',
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
      libro: 'Génesis', capitulo: 4, subtitulo: 'Caín y Abel', citaVersiculos: 'Génesis 4:1-16',
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
      libro: 'Génesis', capitulo: 6, subtitulo: 'El diluvio (Génesis 6–9)', citaVersiculos: 'Génesis 6:9–9:17',
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
      libro: 'Génesis', capitulo: 11, subtitulo: 'La torre de Babel', citaVersiculos: 'Génesis 11:1-9',
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
      libro: 'Génesis', capitulo: 12, subtitulo: 'El llamado de Abram', citaVersiculos: 'Génesis 12:1-20',
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
  {
    ficha: {
      libro: 'Génesis', capitulo: 15, subtitulo: 'El pacto con Abram', citaVersiculos: 'Génesis 15:1-21',
      autor: 'Moisés (tradición)', epoca: 'compilado tras el éxodo', lugar: 'Canaán',
      escena: 'monte' as EscenaKey,
      captionEscena: 'La escena: cielo estrellado, un altar, una promesa en voz alta.',
      gancho: 'Diez años después de la promesa, Abram sigue sin hijos. Y le dice a Dios exactamente eso, de frente.',
      quePasa: [
        'Abram se anima a reclamar: «¿qué me vas a dar, si me voy a morir sin hijos?». Dios no se ofende — lo saca de la carpa, le muestra las estrellas y le dice: «así será tu descendencia». El texto dice que Abram le creyó a Dios, «y esto se le contó por justicia».',
        'Esa misma noche Dios sella la promesa con un pacto solemne, a la manera de la época: pasa como fuego entre los animales partidos, comprometiéndose Él solo — Abram ni siquiera participa del ritual completo. Es Dios quien se ata a su palabra.',
      ],
      enElMapa: 'Aquí queda registrado el principio que después Pablo va a usar para explicar cómo se salva cualquier persona: no por ganárselo, sino por creerle a Dios. Esta noche es el corazón teológico de toda la Ruta.',
      paraHoy: '¿Le has dicho a Dios de frente lo que todavía esperas, o se lo callas por miedo a reclamar?',
      progresoRuta: 4, duracionMin: 3,
    },
    tituloEnsenanza: 'Qué enseña este capítulo',
    ensenanza: [
      'Reclamarle a Dios con honestidad no es falta de fe. A veces es el principio de ella.',
      'Fuiste declarado en regla con Dios por creerle, no por una lista de méritos acumulados.',
      'Cuando Dios promete algo, el peso del compromiso lo carga Él, no tú.',
    ],
  },
  {
    ficha: {
      libro: 'Génesis', capitulo: 17, subtitulo: 'Un nombre nuevo', citaVersiculos: 'Génesis 17:1-27',
      autor: 'Moisés (tradición)', epoca: 'compilado tras el éxodo', lugar: 'Canaán',
      escena: 'desierto' as EscenaKey,
      captionEscena: 'La escena: un hombre de 99 años, de rodillas, riéndose de la noticia.',
      gancho: 'Dios le cambia el nombre a un hombre de 99 años sin hijos: de «padre enaltecido» a «padre de multitudes». Abram se ríe.',
      quePasa: [
        'Trece años después de Génesis 15, Dios vuelve a hablarle a Abram y le pone nombre nuevo: Abraham. A Sarai la llama Sara. Le confirma el pacto — «seré tu Dios y el de tu descendencia» — y le da una señal visible que la familia iba a llevar en el cuerpo por generaciones.',
        'Cuando Dios le dice que Sara, de 90 años, va a tener un hijo, Abraham se postra… y se ríe: «¿a los cien años me va a nacer un hijo?». Dios no lo regaña por reírse; le pone nombre al hijo antes de que nazca: Isaac, que significa «él se ríe».',
      ],
      enElMapa: 'El cambio de nombre marca el pacto como algo ya cerrado, no solo prometido. Desde aquí la Ruta cuenta oficialmente con «Abraham», el nombre que va a repetirse generación tras generación hasta Jesús.',
      paraHoy: '¿Qué promesa de Dios te suena tan imposible que tu primera reacción, como la de Abraham, sería reírte?',
      progresoRuta: 4, duracionMin: 3,
    },
    tituloEnsenanza: 'Qué enseña este capítulo',
    ensenanza: [
      'Dios a veces cambia cómo te llamas a ti mismo antes de cambiar tu situación.',
      'Reírte de una promesa por lo imposible que suena no te saca del plan de Dios.',
      'Dios pone nombre a lo que todavía no existe. Ya sabe cómo va a terminar tu historia.',
    ],
  },
  {
    ficha: {
      libro: 'Génesis', capitulo: 21, subtitulo: 'Nace el hijo prometido', citaVersiculos: 'Génesis 21:1-21',
      autor: 'Moisés (tradición)', epoca: 'compilado tras el éxodo', lugar: 'Beerseba',
      escena: 'casa' as EscenaKey,
      captionEscena: 'La escena: un bebé en brazos, veinticinco años de espera cumplidos.',
      gancho: 'Veinticinco años pasaron entre la promesa de Génesis 12 y esta mañana. Dios nunca llegó tarde: llegó a Su hora.',
      quePasa: [
        '«Y visitó el Señor a Sara, como había dicho» — así de simple lo cuenta el texto. Nace Isaac. Sara, que se había reído por incrédula, ahora dice: «Dios me ha hecho reír, y todo el que lo oiga se reirá conmigo». La risa cambió de sentido: de duda a alegría.',
        'El capítulo también cuenta la parte dura: por los celos entre los hijos, Agar e Ismael son enviados fuera. Es un pasaje triste, pero el texto es cuidadoso en mostrar que Dios no abandona a Agar ni a su hijo: los cuida en el desierto y también les promete futuro.',
      ],
      enElMapa: 'Esta es la primera vez que la promesa de Génesis 12 tiene un rostro y un nombre: Isaac. La línea que Dios prometió sigue viva. De aquí en adelante, cada generación de la promesa va a tener este mismo patrón: esperar, dudar, y ver a Dios cumplir.',
      lineaPromesa: 'Isaac',
      paraHoy: '¿Qué llevas veinticinco años (o veinticinco meses, o veinticinco días) esperando, y sigues creyendo que Dios no se olvidó?',
      progresoRuta: 5, duracionMin: 3,
    },
    tituloEnsenanza: 'Qué enseña este capítulo',
    ensenanza: [
      'La promesa de Dios no es «algún día». Tiene una hora exacta, aunque tú no la sepas.',
      'La misma risa que nace de la duda, Dios la puede convertir en risa de alegría.',
      'Aun en medio del dolor de esta familia, Dios sigue viendo y cuidando a los que quedan fuera del plan principal.',
    ],
  },
  {
    ficha: {
      libro: 'Génesis', capitulo: 22, subtitulo: 'La prueba de Abraham', citaVersiculos: 'Génesis 22:1-19',
      autor: 'Moisés (tradición)', epoca: 'compilado tras el éxodo', lugar: 'monte Moriah',
      escena: 'monte' as EscenaKey,
      captionEscena: 'La escena: un padre y un hijo subiendo un monte juntos, en silencio.',
      gancho: 'Dios le pide a Abraham lo único que no debería pedirle: el hijo de la promesa. Y Abraham camina tres días sin decir que no.',
      quePasa: [
        'Dios «probó» a Abraham (el texto lo aclara desde el primer versículo — no fue un capricho) y le pidió lo más difícil imaginable. Abraham obedece, camina hasta el monte con Isaac, y en el momento exacto Dios detiene su mano: «ya sé que me temes, porque no me negaste a tu hijo». Aparece un carnero en un matorral, y ese pasa a ser el sacrificio.',
        'Abraham le pone nombre al lugar: «el Señor proveerá». No fue una prueba para que Dios supiera algo de Abraham — fue para que Abraham (y nosotros, leyéndolo) supiéramos algo enorme de Dios: Él mismo provee lo que pide.',
      ],
      enElMapa: 'Un padre dispuesto a entregar a su único hijo, en el mismo monte donde siglos después otro Padre sí lo hizo, sin detener la mano. Este capítulo es la sombra más clara de la cruz en todo el Antiguo Testamento.',
      paraHoy: '¿Qué le estás confiando a Dios con la mano cerrada en vez de abierta, aunque Él te haya probado ser suficiente antes?',
      progresoRuta: 5, duracionMin: 3,
    },
    tituloEnsenanza: 'Qué enseña este capítulo',
    ensenanza: [
      'Dios no pide para quitarte algo. Prueba tu fe para mostrarte de qué está hecha.',
      '«El Señor proveerá» no es un lema bonito: es lo que Abraham comprobó con sus propias manos.',
      'Lo que más te cuesta soltar es, casi siempre, lo que más te está diciendo dónde está tu confianza real.',
    ],
  },
  {
    ficha: {
      libro: 'Génesis', capitulo: 25, subtitulo: 'Dos hermanos, una promesa', citaVersiculos: 'Génesis 25:19-34',
      autor: 'Moisés (tradición)', epoca: 'compilado tras el éxodo', lugar: 'Canaán',
      escena: 'camino' as EscenaKey,
      captionEscena: 'La escena: dos hermanos gemelos, un plato de guiso, una decisión de un minuto.',
      gancho: 'Esaú cambia todo su futuro por un plato de comida. No porque no lo valorara: porque tenía hambre AHORA.',
      quePasa: [
        'Después de la muerte de Abraham, la promesa sigue en su hijo Isaac. Nacen los gemelos de Isaac y Rebeca — Esaú, el mayor, y Jacob — y desde el vientre ya «luchaban». Dios le adelanta a Rebeca algo poco común para la época: «el mayor servirá al menor».',
        'Un día, Esaú llega hambriento del campo y le vende su primogenitura (el doble de herencia y la bendición familiar) a Jacob por un plato de guiso rojo. El texto es directo: «así menospreció Esaú la primogenitura».',
      ],
      enElMapa: 'La promesa no sigue por el orden natural (el hermano mayor), sino por la elección de Dios. Desde aquí el nombre que lleva la Ruta hacia adelante es Jacob, no Esaú — y así va a seguir pasando varias veces más en esta familia.',
      paraHoy: '¿Qué estás por cambiar hoy, por una urgencia de ahora mismo, que en realidad vale mucho más a largo plazo?',
      progresoRuta: 6, duracionMin: 3,
    },
    tituloEnsenanza: 'Qué enseña este capítulo',
    ensenanza: [
      'Dios elige por gracia, no por el orden que nosotros esperaríamos.',
      'Una decisión de un minuto de hambre puede costarte algo que tardaste toda una vida en construir.',
      'Lo urgente y lo valioso casi nunca son la misma cosa. Aprende a distinguirlos antes de decidir.',
    ],
  },
  {
    ficha: {
      libro: 'Génesis', capitulo: 28, subtitulo: 'La escalera de Jacob', citaVersiculos: 'Génesis 28:10-22',
      autor: 'Moisés (tradición)', epoca: 'compilado tras el éxodo', lugar: 'Betel',
      escena: 'desierto' as EscenaKey,
      captionEscena: 'La escena: un hombre dormido con una piedra por almohada, un cielo abierto.',
      gancho: 'Jacob huye de su hermano, duerme solo en el desierto con una piedra por almohada — y esa es la noche que Dios elige para hablarle.',
      quePasa: [
        'Jacob va escapando de Esaú (a quien acaba de engañar por la bendición de su padre) cuando, en medio de la nada, sueña con una escalera que conecta la tierra con el cielo, con ángeles subiendo y bajando. Dios se le presenta ahí mismo y le repite, palabra por palabra, la misma promesa que le hizo a Abraham y a Isaac.',
        'Jacob despierta y dice: «ciertamente el Señor está en este lugar, y yo no lo sabía». Le pone nombre al lugar — Betel, «casa de Dios» — y hace un voto: si Dios lo acompaña, Él será su Dios también.',
      ],
      enElMapa: 'La promesa a Abraham no dependió de que su nieto fuera perfecto. Jacob llega huyendo de su propio engaño, y ahí mismo Dios lo alcanza. La escalera es la imagen de que el cielo y la tierra ya no están tan separados como parece.',
      paraHoy: '¿En qué lugar de tu vida —quizás uno del que no estás orgulloso— podría estar Dios «y tú no lo sabías»?',
      progresoRuta: 6, duracionMin: 3,
    },
    tituloEnsenanza: 'Qué enseña este capítulo',
    ensenanza: [
      'Dios no espera a que tengas la vida ordenada para encontrarte. Va a tu desierto.',
      'La promesa de Dios pasa de generación en generación, no porque nadie la merezca, sino porque Él la sostiene.',
      'Un lugar cualquiera se puede volver «casa de Dios» el día que reconoces que Él estaba ahí.',
    ],
  },
  {
    ficha: {
      libro: 'Génesis', capitulo: 32, subtitulo: 'Jacob se convierte en Israel', citaVersiculos: 'Génesis 32:22-32',
      autor: 'Moisés (tradición)', epoca: 'compilado tras el éxodo', lugar: 'el vado de Jaboc',
      escena: 'agua' as EscenaKey,
      captionEscena: 'La escena: un hombre solo, de noche, junto a un río, luchando hasta el amanecer.',
      gancho: 'Veinte años después de huir de su hermano, Jacob vuelve a casa — y la noche antes de reencontrarse, alguien lucha con él hasta el amanecer.',
      quePasa: [
        'Jacob manda a su familia a cruzar el río y se queda solo. Un «varón» lucha con él toda la noche; al ver que no lo vence, le toca la cadera y se la disloca — y aun así Jacob no lo suelta: «no te dejaré, si no me bendices». El «varón» le cambia el nombre: ya no Jacob («el que suplanta»), sino Israel («el que lucha con Dios»).',
        'Jacob le pone nombre al lugar — Peniel, «rostro de Dios» — porque, dice, «vi a Dios cara a cara, y fue librada mi vida». Sale cojeando, pero sale bendecido, y al otro día se reconcilia con Esaú.',
      ],
      enElMapa: 'El nombre que le da título a todo el pueblo que va a cargar esta promesa —Israel— nace de una noche de lucha, no de una victoria fácil. La marca que Dios le deja (la cojera) queda como recordatorio de que fue transformado, no solo perdonado.',
      lineaPromesa: 'Jacob',
      paraHoy: '¿Hay algo con lo que llevas «luchando toda la noche» con Dios, sin soltarlo hasta que te bendiga?',
      progresoRuta: 7, duracionMin: 3,
    },
    tituloEnsenanza: 'Qué enseña este capítulo',
    ensenanza: [
      'A veces Dios no te quita la lucha. Te cambia el nombre en medio de ella.',
      'Salir «cojeando» de un encuentro real con Dios es señal de que algo verdadero pasó, no de que perdiste.',
      'La reconciliación con Esaú, al día siguiente, muestra que lo que Dios arregla primero es adentro.',
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
