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
  {
    ficha: {
      libro: 'Génesis', capitulo: 37, subtitulo: 'José, el hijo vendido', citaVersiculos: 'Génesis 37:1-36',
      autor: 'Moisés (tradición)', epoca: 'compilado tras el éxodo', lugar: 'Canaán, camino a Egipto',
      escena: 'camino' as EscenaKey,
      captionEscena: 'La escena: un joven en el fondo de una cisterna vacía, mirando el cielo.',
      gancho: 'José tiene dos sueños donde su familia se inclina ante él. Se los cuenta a todos. Sus hermanos lo odian tanto que lo venden como esclavo.',
      quePasa: [
        'José es el favorito de su padre Jacob (Israel) — tiene una túnica especial y dos sueños que anuncian que un día gobernará sobre su familia. Sus hermanos, ya celosos por el favoritismo, lo odian todavía más por contarlo.',
        'Un día, lejos de casa, lo agarran, piensan matarlo, y terminan vendiéndolo a una caravana que va a Egipto por veinte piezas de plata. Mojan su túnica en sangre de cabrito y le hacen creer a Jacob que una fiera lo devoró. José, de 17 años, termina esclavo en un país extraño — sin saber que Dios ya está tejiendo algo enorme con este dolor.',
      ],
      enElMapa: 'Aquí arranca la historia que va a llevar a toda la familia de la promesa a Egipto — el escenario donde, siglos después, Dios va a rescatarlos en el Éxodo. Lo que parece el final de José es, en realidad, el principio del plan.',
      paraHoy: '¿Qué traición o injusticia estás cargando hoy, que Dios podría estar usando para algo que todavía no ves?',
      progresoRuta: 8, duracionMin: 3,
    },
    tituloEnsenanza: 'Qué enseña este capítulo',
    ensenanza: [
      'El favoritismo y los celos no son «cosas de familia disfuncional» de hace 4.000 años — son la misma herida de siempre.',
      'Un sueño de Dios puede tardar años en cumplirse, y el camino hacia él puede verse como un desastre total.',
      'Lo que otros piensan que es tu final, Dios lo puede estar usando como tu principio.',
    ],
  },
  {
    ficha: {
      libro: 'Génesis', capitulo: 39, subtitulo: 'Fiel en lo difícil', citaVersiculos: 'Génesis 39:1-23',
      autor: 'Moisés (tradición)', epoca: 'compilado tras el éxodo', lugar: 'Egipto, casa de Potifar',
      escena: 'casa' as EscenaKey,
      captionEscena: 'La escena: un joven esclavo, ascendido a administrador, eligiendo hacer lo correcto solo.',
      gancho: 'José hace todo bien — y termina en la cárcel de todos modos. El texto repite tres veces: «Jehová estaba con José».',
      quePasa: [
        'Esclavo en casa de Potifar, oficial de Faraón, José trabaja tan bien que lo ponen a cargo de toda la casa. Ahí, la esposa de Potifar intenta seducirlo día tras día. José se niega, incluso huyendo físicamente: «¿cómo, pues, haría yo este grande mal, y pecaría contra Dios?».',
        'Ella lo acusa en falso por venganza, y José termina en la cárcel — castigado por hacer lo correcto. Pero el texto insiste: incluso ahí, Dios estaba con él y le daba favor con el jefe de la cárcel.',
      ],
      enElMapa: 'Este capítulo es el puente entre la caída de José (vendido por sus hermanos) y su ascenso (segundo de Faraón). La integridad de José en lo oculto es lo que Dios usa para prepararlo para el poder público que viene.',
      paraHoy: '¿Sigues eligiendo hacer lo correcto cuando nadie te está mirando, aunque hacerlo te esté costando caro ahora mismo?',
      progresoRuta: 8, duracionMin: 3,
    },
    tituloEnsenanza: 'Qué enseña este capítulo',
    ensenanza: [
      'Hacer lo correcto no siempre te libra del problema. A veces te mete en uno distinto.',
      'La presencia de Dios no se mide por tu circunstancia — José la tuvo tanto de mayordomo como de preso.',
      'El carácter que construyes en lo escondido es, casi siempre, la preparación para lo que viene en público.',
    ],
  },
  {
    ficha: {
      libro: 'Génesis', capitulo: 41, subtitulo: 'De la cárcel al trono', citaVersiculos: 'Génesis 41:1-57',
      autor: 'Moisés (tradición)', epoca: 'compilado tras el éxodo', lugar: 'la corte de Faraón, Egipto',
      escena: 'ciudad' as EscenaKey,
      captionEscena: 'La escena: un preso, de pie ante el trono, a punto de cambiar de vida en un solo día.',
      gancho: 'José pasa trece años entre esclavitud y cárcel. Le toma a Faraón un solo día ponerlo al mando de todo Egipto.',
      quePasa: [
        'Faraón tiene dos sueños que nadie logra interpretar, hasta que se acuerdan de José (quien ya había interpretado sueños en la cárcel). José le explica: vienen siete años de abundancia y siete de hambre — y le propone un plan de ahorro nacional.',
        'Faraón queda tan impresionado que lo nombra segundo al mando de todo Egipto, en ese mismo momento. José, de 30 años, pasa de la celda al trono en un solo día — pero los trece años de fidelidad en lo pequeño no fueron en vano: lo formaron para gobernar bien.',
      ],
      enElMapa: 'Ahora José tiene el poder y la posición exacta que Dios necesita en el lugar exacto (Egipto) para lo que viene: salvar de la hambruna a la misma familia que lo vendió, y con ella, a la línea completa de la promesa.',
      paraHoy: '¿Confías en que los años de preparación silenciosa tienen sentido, aunque ahora mismo no veas el trono al final?',
      progresoRuta: 9, duracionMin: 3,
    },
    tituloEnsenanza: 'Qué enseña este capítulo',
    ensenanza: [
      'Dios no desperdicia los años difíciles. Los usa para prepararte para lo que viene.',
      'El don que Dios te dio (a José, interpretar sueños) sigue siendo tuyo aunque estés en el peor lugar posible.',
      'Un solo día puede cambiar todo lo que trece años de fidelidad construyeron en silencio.',
    ],
  },
  {
    ficha: {
      libro: 'Génesis', capitulo: 45, subtitulo: 'José se da a conocer', citaVersiculos: 'Génesis 45:1-15',
      autor: 'Moisés (tradición)', epoca: 'compilado tras el éxodo', lugar: 'Egipto',
      escena: 'ciudad' as EscenaKey,
      captionEscena: 'La escena: hermanos que se odiaban, veinte años después, llorando abrazados.',
      gancho: 'Los hermanos que lo vendieron están frente a él, pidiendo comida, sin reconocerlo. José podría vengarse con solo levantar la mano. En vez de eso, llora tan fuerte que lo oyen desde afuera.',
      quePasa: [
        'El hambre lleva a los hermanos de José hasta Egipto a comprar grano, sin saber que el segundo al mando es el hermano que vendieron veinte años atrás. Después de probarlos, José ya no aguanta: «yo soy José vuestro hermano, el que vendisteis para Egipto».',
        'En vez de reproche, les dice la frase que resume todo el capítulo: «no os entristezcáis... porque para preservaros la vida me envió Dios delante de vosotros». Manda traer a toda la familia a vivir a Egipto, donde va a cuidarlos durante los años de hambre que faltan.',
      ],
      enElMapa: 'Aquí toda la familia de la promesa —setenta personas— se muda a Egipto, sobrevive al hambre, y con el tiempo se multiplica ahí mismo hasta volverse un pueblo enorme. Este traslado es la puerta de entrada al próximo gran tramo de la Ruta: el Éxodo.',
      paraHoy: '¿A quién le debes un «no os entristezcáis», soltando una cuenta que llevas guardando hace años?',
      progresoRuta: 9, duracionMin: 3,
    },
    tituloEnsenanza: 'Qué enseña este capítulo',
    ensenanza: [
      'Lo que otros planearon para hacerte daño, Dios lo puede voltear para el bien de muchos.',
      'El perdón real no minimiza el daño — José no dice «no pasó nada», dice «Dios lo usó para bien».',
      'A veces el cierre de una herida no llega con una explicación, sino con un abrazo y una decisión de soltar.',
    ],
  },
  {
    ficha: {
      libro: 'Génesis', capitulo: 50, subtitulo: 'Lo que ustedes pensaron mal', citaVersiculos: 'Génesis 50:15-26',
      autor: 'Moisés (tradición)', epoca: 'compilado tras el éxodo', lugar: 'Egipto',
      escena: 'casa' as EscenaKey,
      captionEscena: 'La escena: un anciano, al final de su vida, mirando hacia una tierra que todavía no ve.',
      gancho: 'Muerto el padre, los hermanos de José le temen: ahora que no está Jacob para protegerlos, ¿se va a vengar? José responde con una de las frases más citadas de toda la Biblia.',
      quePasa: [
        'Al morir Jacob, los hermanos —por miedo— le mandan a José un mensaje pidiendo perdón, temiendo que ahora sí se cobre venganza. José llora al oírlos, y responde: «vosotros pensasteis mal contra mí, mas Dios lo encaminó a bien, para hacer lo que vemos hoy, para mantener en vida a mucho pueblo».',
        'El libro de Génesis termina con José, ya anciano, pidiendo que cuando Dios saque al pueblo de Egipto (algo que todavía faltaba mucho para pasar), se lleven sus huesos con ellos — muriendo con la misma fe de Abraham: creyendo en una promesa que no iba a ver cumplida en vida.',
      ],
      enElMapa: 'Génesis cierra donde el Éxodo va a abrir: toda la familia de la promesa, instalada en Egipto, esperando el rescate. El «vosotros pensasteis mal... Dios lo encaminó a bien» resume los 50 capítulos enteros del libro: Dios sostiene la promesa pase lo que pase.',
      paraHoy: '¿Puedes mirar tu propia historia difícil y decir, como José, que Dios la está encaminando a bien?',
      progresoRuta: 10, duracionMin: 3,
    },
    tituloEnsenanza: 'Qué enseña este capítulo',
    ensenanza: [
      'Perdonar de verdad no es solo un sentimiento — es una decisión que sostienes incluso cuando ya tienes el poder de vengarte.',
      'Dios trabaja en el «mientras tanto»: mientras tú planeabas mal, Él ya estaba encaminando el bien.',
      'La fe de José (pedir que se lleven sus huesos) fue creer en una promesa que él nunca vio cumplida. Esa es la fe que sostiene toda la Ruta.',
    ],
  },
  {
    ficha: {
      libro: 'Éxodo', capitulo: 2, subtitulo: 'El bebé de la canasta', citaVersiculos: 'Éxodo 2:1-25',
      autor: 'Moisés (tradición)', epoca: 'compilado en el desierto', lugar: 'Egipto y Madián',
      escena: 'agua' as EscenaKey,
      captionEscena: 'La escena: una canasta flotando entre los juncos, junto a la orilla del río.',
      gancho: 'Cuatrocientos años después de José, la misma familia que Egipto una vez rescató ahora es su esclava — y el faraón manda matar a sus bebés varones.',
      quePasa: [
        'Han pasado generaciones: los descendientes de Jacob se multiplicaron tanto que un nuevo faraón, que «no conocía a José», les teme y los esclaviza. Manda matar a todo bebé varón hebreo. Una madre, para salvar al suyo, lo mete en una canasta impermeabilizada y lo deja entre los juncos del río — donde, sin que ella lo planee, lo encuentra la hija del faraón y lo cría en el propio palacio.',
        'Ya adulto, Moisés mata a un egipcio que maltrataba a un hebreo y huye a Madián, donde se casa y pasa 40 años cuidando ovejas — lejos de cualquier plan de rescate. El capítulo cierra con una frase clave: Dios «oyó su clamor... y se acordó de su pacto» con Abraham, Isaac y Jacob.',
      ],
      enElMapa: 'La misma promesa de Génesis 12 — «haré de ti una nación grande» — ahora se ve amenazada por la esclavitud. Dios no se olvidó: solo estaba preparando, en el desierto, al hombre que iba a sacarlos.',
      paraHoy: '¿Qué parte de tu vida se siente como «40 años perdidos cuidando ovejas», que en realidad Dios está usando para prepararte?',
      progresoRuta: 11, duracionMin: 3,
    },
    tituloEnsenanza: 'Qué enseña este capítulo',
    ensenanza: [
      'Dios usa lo que el mundo intenta destruir (un bebé condenado a morir) como el centro de su plan de rescate.',
      'Los años que sientes «perdidos» o fuera del plan a veces son exactamente donde Dios te está formando.',
      '«Se acordó de su pacto» — la memoria de Dios hacia sus promesas no depende de que tú se lo recuerdes.',
    ],
  },
  {
    ficha: {
      libro: 'Éxodo', capitulo: 3, subtitulo: 'La zarza que ardía', citaVersiculos: 'Éxodo 3:1-15',
      autor: 'Moisés (tradición)', epoca: 'compilado en el desierto', lugar: 'el desierto, monte Horeb',
      escena: 'desierto' as EscenaKey,
      captionEscena: 'La escena: un arbusto ardiendo sin consumirse, un pastor descalzo frente a él.',
      gancho: 'Moisés se acerca solo por curiosidad —una zarza ardiendo que no se consume—. No sabe que está a punto de recibir la misión que va a cambiar el curso de toda la Biblia.',
      quePasa: [
        'Mientras pastorea, Moisés ve un arbusto envuelto en fuego que no se quema. Al acercarse, Dios le habla desde ahí: «quita tu calzado, porque el lugar en que tú estás, tierra santa es». Le anuncia que ha visto el sufrimiento de su pueblo y que Moisés va a sacarlo de Egipto.',
        'Moisés pone excusa tras excusa («¿quién soy yo?», «¿y si no me creen?», «no soy elocuente»). Dios responde a cada una — y cuando Moisés pregunta el nombre de Dios, recibe la respuesta más profunda de todo el Antiguo Testamento: «YO SOY EL QUE SOY».',
      ],
      enElMapa: 'Aquí Dios se presenta con su nombre propio (YHVH, «Yo soy») por primera vez de forma tan directa — el nombre que va a repetirse miles de veces en el resto de la Ruta. El rescate del Éxodo empieza con un encuentro, no con un plan.',
      paraHoy: '¿Cuál es tu «no soy elocuente», la excusa que usas para no obedecer lo que sientes que Dios te está pidiendo?',
      progresoRuta: 11, duracionMin: 3,
    },
    tituloEnsenanza: 'Qué enseña este capítulo',
    ensenanza: [
      'Dios ve el sufrimiento antes de que tú se lo cuentes — «he visto la aflicción de mi pueblo» viene antes de cualquier petición.',
      'Tus excusas no son nuevas para Dios. Tiene una respuesta para cada una.',
      '«Yo soy el que soy» significa que Dios no depende de nada ni de nadie para ser quien es — ni siquiera de que tú lo entiendas.',
    ],
  },
  {
    ficha: {
      libro: 'Éxodo', capitulo: 12, subtitulo: 'La noche de la Pascua', citaVersiculos: 'Éxodo 12:1-32',
      autor: 'Moisés (tradición)', epoca: 'compilado en el desierto', lugar: 'Egipto',
      escena: 'casa' as EscenaKey,
      captionEscena: 'La escena: una puerta marcada con sangre, protegida en medio de la noche.',
      gancho: 'Después de nueve señales que Faraón ignoró, Dios le da a cada familia hebrea una instrucción muy concreta: pinten su puerta, y esa noche estarán a salvo.',
      quePasa: [
        'Antes de la décima y última plaga, Dios instituye la Pascua: cada familia sacrifica un cordero sin defecto y pinta el marco de su puerta con su sangre. Esa noche, «la muerte» pasa por Egipto — pero pasa de largo (Pascua = «pasar por alto») en cada casa marcada.',
        'Faraón, quebrado por la pérdida, finalmente deja salir al pueblo. Dios ordena que esta noche se recuerde «por estatuto perpetuo» — generación tras generación, para siempre.',
      ],
      enElMapa: 'La sangre del cordero que protege de la muerte es la imagen central de todo el Antiguo Testamento — la misma noche que, siglos después, Jesús va a elegir para su última cena, llamándose a sí mismo «el Cordero».',
      paraHoy: '¿Confías en la protección que Dios ya proveyó, o sigues intentando protegerte tú mismo con tus propios esfuerzos?',
      progresoRuta: 12, duracionMin: 3,
    },
    tituloEnsenanza: 'Qué enseña este capítulo',
    ensenanza: [
      'La salvación en la Biblia casi siempre viene marcada por sangre inocente derramada en lugar de otro — un patrón que se repite hasta la cruz.',
      'Dios no pide que entiendas el plan completo — pide que confíes en la instrucción del día de hoy (pintar la puerta).',
      'Un evento puede marcar una noche, una vida, y una fe entera durante generaciones.',
    ],
  },
  {
    ficha: {
      libro: 'Éxodo', capitulo: 14, subtitulo: 'El mar que se abrió', citaVersiculos: 'Éxodo 14:1-31',
      autor: 'Moisés (tradición)', epoca: 'compilado en el desierto', lugar: 'el mar Rojo',
      escena: 'agua' as EscenaKey,
      captionEscena: 'La escena: un muro de agua a cada lado, un camino seco en medio del mar.',
      gancho: 'El pueblo recién liberado queda atrapado entre el ejército de Faraón y el mar. No hay a dónde correr — y ahí es exactamente donde Dios actúa.',
      quePasa: [
        'Faraón se arrepiente de haberlos dejado ir y persigue al pueblo con su ejército. Atrapados contra el mar Rojo, el pueblo entra en pánico y le reclama a Moisés: «¿nos sacaste para morir aquí?». Moisés responde con una de las frases más repetidas de la Biblia: «Jehová peleará por vosotros, y vosotros estaréis quietos».',
        'Dios abre un camino seco en medio del mar; el pueblo cruza entre dos muros de agua. Cuando el ejército egipcio los sigue, las aguas vuelven a su lugar. El pueblo, al ver esto, «creyó a Jehová y a Moisés su siervo».',
      ],
      enElMapa: 'Este es EL evento que define la identidad de Israel para siempre — la prueba histórica de que Dios cumple lo que promete, y el patrón que la fe del Antiguo Testamento va a recordar una y otra vez en momentos de miedo.',
      paraHoy: '¿Qué «mar» tienes enfrente hoy donde sientes que no hay salida, y podrías «estar quieto» confiando en vez de entrar en pánico?',
      progresoRuta: 12, duracionMin: 3,
    },
    tituloEnsenanza: 'Qué enseña este capítulo',
    ensenanza: [
      'El miedo y la fe pueden convivir en el mismo momento — el pueblo tenía miedo Y cruzó.',
      '«Estar quieto» no siempre significa no hacer nada — significa dejar de intentar resolverlo tú solo cuando ya es la hora de confiar.',
      'Ver a Dios actuar en grande construye una fe que ningún argumento puede quitarte después.',
    ],
  },
  {
    ficha: {
      libro: 'Éxodo', capitulo: 20, subtitulo: 'Diez palabras para vivir', citaVersiculos: 'Éxodo 20:1-21',
      autor: 'Moisés (tradición)', epoca: 'compilado en el desierto', lugar: 'monte Sinaí',
      escena: 'monte' as EscenaKey,
      captionEscena: 'La escena: una montaña envuelta en humo y fuego, un pueblo entero mirando desde abajo.',
      gancho: 'Antes de darles reglas, Dios les recuerda algo: «yo soy el Señor tu Dios, que te saqué de Egipto». Los mandamientos empiezan con un rescate, no con una exigencia.',
      quePasa: [
        'Tres meses después de salir de Egipto, en el monte Sinaí envuelto en fuego y humo, Dios le da al pueblo diez instrucciones centrales: no tener otros dioses, no hacer ídolos, honrar su nombre, guardar el descanso, honrar a los padres, y no matar, no cometer adulterio, no robar, no mentir, no codiciar.',
        'El pueblo, aterrado por los truenos y el humo, le pide a Moisés que hable él con Dios y les transmita el mensaje — con miedo de morir si Dios les habla directamente.',
      ],
      enElMapa: 'Estos diez mandamientos van a ser la columna vertebral moral de todo lo que sigue en la Ruta — desde los jueces hasta los profetas, todos van a medir la fidelidad del pueblo contra ellos.',
      paraHoy: '¿Ves los límites de Dios como una jaula, o como el mapa de alguien que ya te rescató y quiere cuidarte?',
      progresoRuta: 13, duracionMin: 3,
    },
    tituloEnsenanza: 'Qué enseña este capítulo',
    ensenanza: [
      'Los mandamientos de Dios vienen DESPUÉS del rescate, no antes — no son la condición para ser salvo, son la respuesta a ya estarlo.',
      'Guardar un día de descanso está en la misma lista que «no matar» — Dios se toma tu descanso muy en serio.',
      'El miedo del pueblo ante Dios muestra que necesitaban un mediador. Toda la Ruta va, poco a poco, hacia ese mediador final.',
    ],
  },

  /* ── Capítulo 1 del resto de los libros del CONJUNTO DE LANZAMIENTO (Evangelios +
     Hechos + Salmos + Proverbios). Aún NO están tejidos en el orden cronológico real
     de la Ruta (eso cruza estos libros con Génesis/Éxodo/reyes página a página — se
     define cuando se arme el plan de lectura cronológico completo); por ahora viven
     aquí como el capítulo de ENTRADA de cada libro para cuando la Biblia completa
     los muestre con su ficha guiada. `progresoRuta` es un valor provisional, no
     representa su posición real todavía. ── */
  {
    ficha: {
      libro: 'Mateo', capitulo: 1, subtitulo: 'El linaje del Rey prometido', citaVersiculos: 'Mateo 1:1-25',
      autor: 'Mateo (recaudador de impuestos, discípulo de Jesús)', epoca: '~70-85 d.C.', lugar: 'Judea/Galilea',
      escena: 'casa' as EscenaKey,
      captionEscena: 'La escena: José, dormido, recibe la noticia que le cambia los planes.',
      gancho: 'El primer capítulo del Nuevo Testamento es una lista de 42 nombres. Ahí, escondido, está el final feliz de toda la Biblia.',
      quePasa: [
        'Mateo abre con una genealogía que la mayoría se salta: de Abraham a David, de David al exilio, del exilio a José. No es relleno — es el recibo de que la promesa de Génesis 12 («por ti serán benditas todas las familias») sí llegó a alguien real, con nombre y apellido.',
        'Luego cuenta que María está embarazada antes de vivir con José, y que un ángel se le aparece a José en sueños: «no temas recibir a María... llamarás su nombre JESÚS, porque él salvará a su pueblo». Mateo aclara que esto cumple lo dicho por los profetas: «llamarán su nombre Emanuel», que significa «Dios con nosotros».',
      ],
      enElMapa: 'Esta lista de nombres es la línea de la promesa completa, de un vistazo: Abraham… Isaac… Jacob… hasta José y Jesús. Todo lo que la Ruta va a ir mostrando capítulo a capítulo, aquí llega a su nombre final.',
      paraHoy: 'Si Dios cumplió una promesa de 2.000 años a través de generaciones imperfectas, ¿qué te impide confiarle la tuya?',
      progresoRuta: 8, duracionMin: 3,
    },
    tituloEnsenanza: 'Qué te quiso decir Jesús',
    ensenanza: [
      'No naciste de un plan perfecto. Tampoco Jesús — su genealogía tiene tropiezos y escándalos, y aun así Dios la usó.',
      '«Dios con nosotros» no es un título lejano: es la promesa de que no te dejó solo.',
      'Lo que a ti te parece una lista aburrida de nombres, para Dios es la prueba de que Él cumple lo que dice, así tarde generaciones.',
    ],
  },
  {
    ficha: {
      libro: 'Marcos', capitulo: 1, subtitulo: 'El comienzo de las buenas noticias', citaVersiculos: 'Marcos 1:1-20',
      autor: 'Juan Marcos', epoca: '~55 d.C.', lugar: 'el río Jordán y Galilea',
      escena: 'agua' as EscenaKey,
      captionEscena: 'La escena: un hombre bautizándose en el río, el cielo abriéndose.',
      gancho: 'Marcos no pierde tiempo con genealogías ni pesebres. En un párrafo ya tiene a Jesús bautizándose, tentado y llamando pescadores.',
      quePasa: [
        'Marcos escribe el evangelio más corto y más rápido de los cuatro — su palabra favorita es «enseguida». Empieza con Juan el Bautista preparando el camino en el desierto, y enseguida Jesús se bautiza: se abren los cielos y una voz dice «tú eres mi Hijo amado».',
        'Después del desierto (tentado 40 días), Jesús empieza a predicar en Galilea con un mensaje de dos frases: «el tiempo se ha cumplido... arrepentíos, y creed en el evangelio». Camina por la orilla, ve a unos pescadores y les dice «venid en pos de mí» — y ellos, sin preguntas, dejan las redes.',
      ],
      enElMapa: 'Este es el arranque del ministerio público de Jesús: el punto donde toda la Ruta cronológica de los Evangelios se pone en marcha, después de 400 años de silencio profético.',
      paraHoy: '¿Qué redes (rutinas, miedos, excusas) tendrías que soltar hoy mismo si Jesús te dijera «ven»?',
      progresoRuta: 9, duracionMin: 3,
    },
    tituloEnsenanza: 'Qué te quiso decir Jesús',
    ensenanza: [
      'Jesús no pidió que estuvieran listos. Pidió que lo siguieran — listos se van haciendo en el camino.',
      'El mensaje central no cambió en 2.000 años: el momento es ahora, y la respuesta es creer.',
      'A Dios no le urge tu currículum. Le urge tu «sí».',
    ],
  },
  {
    ficha: {
      libro: 'Lucas', capitulo: 1, subtitulo: 'Dos anuncios, dos cantos', citaVersiculos: 'Lucas 1:26-56',
      autor: 'Lucas (médico, historiador)', epoca: '~60 d.C.', lugar: 'Judea y Nazaret',
      escena: 'casa' as EscenaKey,
      captionEscena: 'La escena: una joven recibe una noticia imposible y responde que sí.',
      gancho: 'Un ángel le anuncia a una adolescente sin recursos que va a ser madre del Rey eterno. Ella no pide pruebas: pregunta cómo, y luego dice que sí.',
      quePasa: [
        'Lucas, el más detallista de los cuatro escritores, cuenta primero cómo el ángel Gabriel le anuncia a un sacerdote anciano, Zacarías, que va a tener un hijo (Juan, el futuro Bautista) — y como duda, se queda mudo hasta que nace.',
        'Después el mismo ángel va a Nazaret, a María, y le anuncia que será madre de «el Hijo del Altísimo», sin haber estado con hombre. Su respuesta queda como una de las frases más valientes de la Biblia: «hágase conmigo conforme a tu palabra». Enseguida canta un poema —el Magníficat— sobre un Dios que exalta a los humildes.',
      ],
      enElMapa: 'La promesa de Génesis 3:15 —«la descendencia de la mujer»— llega aquí a su cumplimiento literal: una mujer, sin intervención humana, va a dar a luz al que aplastará al mal de una vez por todas.',
      paraHoy: '¿Qué «hágase conmigo conforme a tu palabra» te está costando decir esta semana?',
      progresoRuta: 10, duracionMin: 3,
    },
    tituloEnsenanza: 'Qué te quiso decir Jesús',
    ensenanza: [
      'Dios no elige según el currículum del mundo. Elige a los disponibles.',
      'Decir «sí» a Dios casi nunca viene con el plan completo — viene con una promesa y una decisión.',
      'La duda de Zacarías y la fe de María, lado a lado, muestran que Dios trabaja con los dos, pero solo uno se pierde el silencio.',
    ],
  },
  {
    ficha: {
      libro: 'Juan', capitulo: 1, subtitulo: 'En el principio era el Verbo', citaVersiculos: 'Juan 1:1-14',
      autor: 'Juan (apóstol, «el discípulo amado»)', epoca: '~90 d.C.', lugar: 'escrito en Éfeso (tradición)',
      escena: 'agua' as EscenaKey,
      captionEscena: 'La escena: luz entrando en la oscuridad, junto al río donde Juan bautizaba.',
      gancho: 'Juan no empieza con un pesebre ni con una genealogía. Empieza antes del tiempo mismo: «en el principio».',
      quePasa: [
        'Juan escribe el evangelio más tarde y más reflexivo de los cuatro. Abre con una frase que hace eco directo de Génesis 1: «en el principio era el Verbo, y el Verbo era con Dios, y el Verbo era Dios». Ese «Verbo» —la Palabra de Dios, activa desde antes de crear el mundo— es quien «se hizo carne, y habitó entre nosotros».',
        'Después el capítulo cuenta cómo Juan el Bautista señala a Jesús («he ahí el Cordero de Dios») y cómo los primeros discípulos —Andrés, Simón Pedro, Felipe, Natanael— lo empiezan a seguir, cada uno por su propio camino hacia la misma conclusión: «hemos hallado al Mesías».',
      ],
      enElMapa: 'El eco de Génesis 1 no es casualidad: Juan está diciendo que el mismo Dios que ordenó el caos al principio de la Ruta es quien ahora camina entre nosotros. El círculo, que empezó en «en el principio», se cierra aquí.',
      paraHoy: '¿Reconoces a Jesús como «la luz que brilla en la oscuridad» de tu situación actual, o todavía lo ves como un personaje lejano?',
      progresoRuta: 11, duracionMin: 3,
    },
    tituloEnsenanza: 'Qué te quiso decir Jesús',
    ensenanza: [
      'Jesús no empezó a existir en Belén. Estaba ahí «en el principio», antes de la primera página de la Ruta.',
      '«Habitó entre nosotros» significa que Dios no se quedó mirando desde lejos: se metió en tu misma calle.',
      'Encontrar a Jesús casi siempre empieza con alguien más que te señala el camino, como Juan a Andrés.',
    ],
  },
  {
    ficha: {
      libro: 'Hechos', capitulo: 1, subtitulo: 'La despedida y la promesa', citaVersiculos: 'Hechos 1:1-14',
      autor: 'Lucas (segunda parte de su obra, tras el evangelio)', epoca: '~62 d.C.', lugar: 'Jerusalén, monte de los Olivos',
      escena: 'monte' as EscenaKey,
      captionEscena: 'La escena: un grupo mirando al cielo, donde acaban de ver a alguien partir.',
      gancho: 'Jesús se va — literalmente, ante sus ojos — y en vez de dejarlos huérfanos, les hace la promesa que va a encender toda la iglesia.',
      quePasa: [
        'Cuarenta días después de resucitar, Jesús se reúne por última vez con sus discípulos y les da una instrucción concreta: no salgan de Jerusalén todavía, esperen «la promesa del Padre» — el Espíritu Santo, que los va a llenar de poder para ser testigos «hasta lo último de la tierra».',
        'Dicho esto, es levantado ante ellos y una nube lo oculta. Mientras se quedan mirando al cielo, dos ángeles les preguntan por qué siguen mirando arriba: «este mismo Jesús... vendrá de la misma manera». Vuelven a Jerusalén y se dedican a orar juntos, esperando.',
      ],
      enElMapa: 'Este es el gozne entre los Evangelios y el resto del Nuevo Testamento: la historia de Jesús no termina en una ausencia, sino en una promesa que arranca la historia de la iglesia — el siguiente tramo de la Ruta.',
      paraHoy: '¿Estás esperando activamente (orando, preparándote) o solo «mirando al cielo» sin moverte?',
      progresoRuta: 12, duracionMin: 3,
    },
    tituloEnsenanza: 'Qué enseña este capítulo',
    ensenanza: [
      'La ausencia física de Jesús no fue el final del plan. Fue el inicio de la siguiente etapa.',
      'Dios casi siempre pide esperar ANTES de actuar en grande — la espera también es parte de la obediencia.',
      'La promesa de Dios no te deja mirando al cielo con las manos vacías: te da algo concreto que hacer mientras esperas.',
    ],
  },
  {
    ficha: {
      libro: 'Salmos', capitulo: 1, subtitulo: 'El camino de los dos árboles', citaVersiculos: 'Salmos 1:1-6',
      autor: 'anónimo (introducción de todo el salterio)', epoca: 'compilado a lo largo de siglos', lugar: 'sin ubicación — poesía de sabiduría',
      escena: 'camino' as EscenaKey,
      captionEscena: 'La escena: un árbol firme junto a un río, y paja que el viento se lleva.',
      gancho: 'Todo el libro de Salmos arranca con una sola imagen: dos caminos, dos árboles, dos finales.',
      quePasa: [
        'El primer salmo funciona como la puerta de entrada a los otros 149: describe a la persona «bienaventurada» como la que no sigue el consejo de los malos, sino que se deleita en la Palabra de Dios «de día y de noche». La compara con «un árbol plantado junto a corrientes de aguas» — con raíces, con fruto, sin marchitarse.',
        'Al lado pone la imagen contraria: los impíos, «como el tamo que arrebata el viento» — sin raíz, sin peso, sin permanencia. El salmo cierra con una frase corta: «el Señor conoce el camino de los justos; mas la senda de los malos perecerá».',
      ],
      enElMapa: 'Este salmo es la lente con la que leer todos los demás: cada oración, lamento o alabanza que viene después parte de esta misma pregunta — ¿en qué raíces estás plantado?',
      paraHoy: '¿Tus raíces esta semana estuvieron más cerca del río (la Palabra) o del viento (todo lo que opina de ti)?',
      progresoRuta: 13, duracionMin: 3,
    },
    tituloEnsenanza: 'Qué enseña este capítulo',
    ensenanza: [
      'No es la ausencia de problemas lo que sostiene a un árbol — son sus raíces.',
      'Lo que meditas «de día y de noche» — lo que ves, escuchas, repites en tu mente — te va formando en un árbol o en paja.',
      'Dios «conoce» tu camino: no es un juez distante llevando la cuenta, es Alguien que camina contigo mirando hacia dónde vas.',
    ],
  },
  {
    ficha: {
      libro: 'Proverbios', capitulo: 1, subtitulo: 'El inicio de la sabiduría', citaVersiculos: 'Proverbios 1:1-9',
      autor: 'Salomón (tradición, con aportes posteriores)', epoca: '~siglo X a.C. (compilado después)', lugar: 'la corte real de Jerusalén',
      escena: 'ciudad' as EscenaKey,
      captionEscena: 'La escena: un padre aconsejando a su hijo antes de que salga al mundo.',
      gancho: 'El libro entero de Proverbios se resume en una frase de nueve palabras, en el versículo 7: «el temor del Señor es el principio de la sabiduría».',
      quePasa: [
        'Proverbios se presenta como un manual: «para entender sabiduría... para recibir el consejo de prudencia». No es un libro de teología abstracta — es sabiduría práctica para el día a día, escrita como consejo de un padre a un hijo que está por salir al mundo.',
        'Ya en el primer capítulo aparece la advertencia central: cuídate de los que te invitan a hacer el mal «en compañía», prometiendo ganancia fácil. El camino corto casi siempre termina emboscando al que lo toma.',
      ],
      enElMapa: 'Si los Salmos te enseñan a orar, Proverbios te enseña a decidir. Es la sabiduría de todo el Antiguo Testamento resumida en frases cortas, hechas para memorizar y usar hoy mismo.',
      paraHoy: '¿Qué «camino fácil» te están ofreciendo esta semana, que en el fondo sabes que es una emboscada?',
      progresoRuta: 14, duracionMin: 3,
    },
    tituloEnsenanza: 'Qué enseña este capítulo',
    ensenanza: [
      'Sabiduría no es saber mucho — es tomar buenas decisiones con lo que ya sabes.',
      '«El temor del Señor» no es terror: es el respeto que te hace tomar en serio lo que Dios dice, antes de decidir.',
      'Las malas compañías casi nunca se presentan como malas. Se presentan como una oportunidad.',
    ],
  },

  /* ── Capítulo 2 de los mismos 7 libros (crece el lote de lanzamiento). ── */
  {
    ficha: {
      libro: 'Mateo', capitulo: 2, subtitulo: 'Los sabios y la huida', citaVersiculos: 'Mateo 2:1-15',
      autor: 'Mateo (recaudador de impuestos, discípulo de Jesús)', epoca: '~70-85 d.C.', lugar: 'Belén y Egipto',
      escena: 'desierto' as EscenaKey,
      captionEscena: 'La escena: viajeros extranjeros siguiendo una estrella hacia un pueblo pequeño.',
      gancho: 'Los primeros en arrodillarse ante Jesús no son judíos religiosos — son astrólogos extranjeros que ni siquiera conocían las Escrituras. Y el primero en querer matarlo es un rey.',
      quePasa: [
        'Unos sabios de Oriente llegan a Jerusalén preguntando por «el rey de los judíos» que acaba de nacer, guiados por una estrella. Herodes, el rey de turno, se alarma y les pide que, al encontrarlo, le avisen «para yo también ir a adorarle» — mintiendo: en realidad planea matarlo.',
        'Los sabios encuentran al niño en Belén, lo adoran y le entregan regalos de gran valor. Advertidos en sueños, regresan por otro camino. Un ángel avisa a José que huya con su familia a Egipto — donde se quedan hasta que muere Herodes.',
      ],
      enElMapa: 'La familia de la promesa termina otra vez en Egipto, como en los días de José — pero esta vez para salvar al que va a cumplir toda la promesa. El patrón de Génesis se repite al inicio del Nuevo Testamento.',
      paraHoy: '¿Estás dispuesto a «recorrer un camino distinto» cuando Dios te avisa, aunque sea más incómodo que el que planeabas?',
      progresoRuta: 15, duracionMin: 3,
    },
    tituloEnsenanza: 'Qué te quiso decir Jesús',
    ensenanza: [
      'Dios revela a Jesús incluso a quienes están fuera del pueblo «correcto» — nadie está demasiado lejos para buscarlo y encontrarlo.',
      'El poder humano (Herodes) se siente amenazado por el niño más indefenso de la historia. El miedo del poderoso es una señal, no una autoridad a obedecer.',
      'Obedecer a Dios a veces significa cambiar de ruta sin explicación completa — los sabios y José lo hicieron por fe.',
    ],
  },
  {
    ficha: {
      libro: 'Marcos', capitulo: 2, subtitulo: 'El techo abierto', citaVersiculos: 'Marcos 2:1-17',
      autor: 'Juan Marcos', epoca: '~55 d.C.', lugar: 'Capernaúm',
      escena: 'casa' as EscenaKey,
      captionEscena: 'La escena: un techo abierto, una camilla bajando desde arriba hacia una casa llena.',
      gancho: 'Cuatro amigos no encuentran cómo entrar a la casa llena de gente — así que suben al techo, lo abren, y bajan a su amigo paralítico justo frente a Jesús.',
      quePasa: [
        'La casa donde enseña Jesús está tan llena que cuatro hombres, cargando a un amigo paralítico, no pueden entrar. Suben al techo, hacen un hueco, y lo bajan con cuerdas hasta ponerlo delante de Jesús. Jesús, viendo LA FE DE ELLOS, le dice al paralítico: «tus pecados te son perdonados» — y luego, para probar su autoridad, también lo sana físicamente.',
        'Más tarde ese mismo capítulo, Jesús llama a Leví (Mateo), un cobrador de impuestos despreciado por todos, y come en su casa con «publicanos y pecadores». Cuando lo critican, responde: «no tienen necesidad de médico los sanos, sino los enfermos... no he venido a llamar a justos, sino a pecadores».',
      ],
      enElMapa: 'Este capítulo muestra el patrón completo del ministerio de Jesús: perdona antes de sanar, y busca a los que la sociedad religiosa descartaba. Establece quién es su gente desde el principio.',
      paraHoy: '¿Tienes amigos dispuestos a «abrir el techo» por ti, o a quién podrías tú ayudar a llegar hasta Jesús esta semana?',
      progresoRuta: 15, duracionMin: 3,
    },
    tituloEnsenanza: 'Qué te quiso decir Jesús',
    ensenanza: [
      'La fe de otros (los cuatro amigos) puede abrirte un camino que tú solo no encontrarías.',
      'Jesús trata el perdón como más urgente que la sanidad física — lo que carga tu alma pesa más que lo que ves.',
      'Jesús busca activamente a los que todos los demás descartan. Si te sientes «descartable», eres exactamente a quien busca.',
    ],
  },
  {
    ficha: {
      libro: 'Lucas', capitulo: 2, subtitulo: 'Nace el Salvador', citaVersiculos: 'Lucas 2:1-20',
      autor: 'Lucas (médico, historiador)', epoca: '~60 d.C.', lugar: 'Belén',
      escena: 'casa' as EscenaKey,
      captionEscena: 'La escena: un pesebre humilde, y a lo lejos, pastores corriendo en la noche.',
      gancho: 'El nacimiento más importante de la historia no ocurre en un palacio, sino en un establo — y los primeros invitados no son reyes, son pastores, la gente más despreciada de su época.',
      quePasa: [
        'Un censo obliga a José y María a viajar a Belén, donde, sin lugar en el mesón, Jesús nace y es puesto en un pesebre. Esa misma noche, un ángel se les aparece a unos pastores —trabajadores mal vistos, casi al margen de la sociedad— con la noticia: «os ha nacido hoy... un Salvador, que es Cristo el Señor».',
        'De pronto aparece «una multitud de las huestes celestiales» alabando a Dios. Los pastores corren a Belén, encuentran todo tal como se les dijo, y salen contando lo que vieron a todo el que encuentran. María, en cambio, «guardaba todas estas cosas, meditándolas en su corazón».',
      ],
      enElMapa: 'El Rey del universo elige nacer sin lugar, sin comodidad, y anuncia su llegada primero a los más ignorados de la sociedad. Es el mismo patrón de toda la Ruta: Dios eligiendo lo pequeño para su plan más grande.',
      paraHoy: '¿A quién en tu vida, como a los pastores, subestimas — y podría ser exactamente a quien Dios le está por revelar algo grande?',
      progresoRuta: 16, duracionMin: 3,
    },
    tituloEnsenanza: 'Qué te quiso decir Jesús',
    ensenanza: [
      'Dios no necesitó comodidad para cumplir su promesa más grande. Tu situación humilde no es un obstáculo para Él.',
      'Las buenas noticias de Dios casi siempre llegan primero a los que el mundo menos espera.',
      'No toda respuesta a Dios es correr a contarlo — a veces, como María, es guardarlo y meditarlo en silencio.',
    ],
  },
  {
    ficha: {
      libro: 'Juan', capitulo: 2, subtitulo: 'El agua que se volvió vino', citaVersiculos: 'Juan 2:1-11',
      autor: 'Juan (apóstol, «el discípulo amado»)', epoca: '~90 d.C.', lugar: 'Caná de Galilea',
      escena: 'casa' as EscenaKey,
      captionEscena: 'La escena: seis tinajas de piedra, llenas hasta el borde, en medio de una fiesta.',
      gancho: 'A una boda se le acaba el vino — un problema pequeño, casi vergonzoso. Es ahí, en lo cotidiano, donde Jesús hace su primera señal pública.',
      quePasa: [
        'En una boda en Caná se acaba el vino. María le avisa a Jesús, quien al principio responde que «no ha llegado su hora» — pero igual actúa. Manda llenar seis tinajas de piedra (de las que se usaban para la purificación ritual) con agua, y cuando la sirven, se ha convertido en el mejor vino de la fiesta.',
        'Juan aclara que esta fue la PRIMERA señal de Jesús, y «manifestó su gloria; y sus discípulos creyeron en él». No fue un milagro para salvar vidas — fue una señal para revelar quién es.',
      ],
      enElMapa: 'Juan escribe su evangelio como una serie de «señales» (siete en total) que van revelando poco a poco quién es Jesús. Esta primera, en algo tan cotidiano como una boda, marca el tono: Dios se involucra en lo ordinario.',
      paraHoy: '¿Qué situación «pequeña» o cotidiana de tu semana podrías invitar a que Jesús transforme?',
      progresoRuta: 16, duracionMin: 3,
    },
    tituloEnsenanza: 'Qué te quiso decir Jesús',
    ensenanza: [
      'Jesús se involucra en los problemas cotidianos, no solo en las crisis grandes.',
      'Los milagros de Jesús tenían un propósito: revelar quién es, no solo resolver un problema.',
      'Lo que Dios provee suele ser mejor que lo que se había planeado — el mejor vino llegó al final.',
    ],
  },
  {
    ficha: {
      libro: 'Hechos', capitulo: 2, subtitulo: 'El viento y el fuego', citaVersiculos: 'Hechos 2:1-41',
      autor: 'Lucas (segunda parte de su obra, tras el evangelio)', epoca: '~62 d.C.', lugar: 'Jerusalén',
      escena: 'ciudad' as EscenaKey,
      captionEscena: 'La escena: una casa llena de gente, un viento fuerte, algo como fuego sobre cada uno.',
      gancho: 'Diez días después de que Jesús se fue, la promesa que dejó se cumple de golpe: un viento fuerte, algo como lenguas de fuego, y ciento veinte personas hablando idiomas que nunca aprendieron.',
      quePasa: [
        'En el día de Pentecostés, reunidos en un mismo lugar, los discípulos escuchan un viento recio y ven algo como lenguas de fuego posarse sobre cada uno — «fueron todos llenos del Espíritu Santo». Empiezan a hablar en idiomas distintos, y judíos de docenas de naciones que estaban ahí de visita, cada uno los escucha en SU propio idioma.',
        'Pedro, el mismo que había negado a Jesús semanas antes, se pone de pie y predica con tanta claridad que «unas tres mil personas» se bautizan ese mismo día. La iglesia —el próximo gran tramo de la Ruta— nace en un solo día.',
      ],
      enElMapa: 'Este es el cumplimiento exacto de la promesa de Hechos 1: el Espíritu Santo llega con poder. El mismo hombre que negó a Jesús tres veces ahora predica sin miedo — el patrón de transformación que define el resto del libro de Hechos.',
      paraHoy: '¿Qué «negación» o fracaso pasado sientes que te descalifica, cuando Dios podría estar por usarte de la manera más pública?',
      progresoRuta: 17, duracionMin: 3,
    },
    tituloEnsenanza: 'Qué enseña este capítulo',
    ensenanza: [
      'Dios cumple sus promesas en su tiempo exacto — diez días de espera, y después todo cambió de golpe.',
      'El Espíritu de Dios rompe barreras de idioma y cultura desde el primer día de la iglesia.',
      'Tu peor fracaso no es tu identidad final. Pedro negó a Jesús y terminó siendo la voz que convenció a miles.',
    ],
  },
  {
    ficha: {
      libro: 'Salmos', capitulo: 2, subtitulo: 'El Rey que Dios ungió', citaVersiculos: 'Salmos 2:1-12',
      autor: 'tradicionalmente David', epoca: 'compilado a lo largo de siglos', lugar: 'sin ubicación — poesía real',
      escena: 'monte' as EscenaKey,
      captionEscena: 'La escena: naciones lejanas conspirando, y un trono que no se mueve.',
      gancho: '¿Por qué se agitan tanto las naciones contra un rey que Dios mismo puso en su trono? El salmo se ríe de la idea: Dios «se reirá» de su intento.',
      quePasa: [
        'El salmo describe a reyes y naciones «conspirando» contra el Señor y «su Ungido» (en hebreo, Mashiaj — Mesías). En vez de preocuparse, Dios se ríe desde el cielo: ha puesto a su Rey en Sion, y nada de lo que los poderosos tramen lo va a mover.',
        'Dios le dice a este Rey: «mi hijo eres tú; yo te engendré hoy... te daré por herencia las naciones». El salmo cierra con una advertencia amable a los que se resisten: «servid al Señor con temor... bienaventurados los que en él confían».',
      ],
      enElMapa: 'Este salmo es una de las profecías mesiánicas más citadas del Nuevo Testamento — «mi hijo eres tú» se cita en el bautismo de Jesús y en Hebreos. El «Ungido» que ninguna conspiración humana puede derrocar es, al final de la Ruta, Jesús mismo.',
      paraHoy: '¿Qué oposición o «conspiración» en tu contra te tiene angustiado, que en realidad no puede mover el trono que Dios ya estableció?',
      progresoRuta: 17, duracionMin: 3,
    },
    tituloEnsenanza: 'Qué enseña este capítulo',
    ensenanza: [
      'Ningún plan humano, por grande que parezca, puede descarrilar lo que Dios ya decidió.',
      'La risa de Dios ante la conspiración de los poderosos no es burla — es la calma absoluta de quien ya tiene el control.',
      'Refugiarte en Dios («bienaventurados los que en él confían») es la respuesta sabia frente a cualquier amenaza.',
    ],
  },
  {
    ficha: {
      libro: 'Proverbios', capitulo: 2, subtitulo: 'El tesoro escondido', citaVersiculos: 'Proverbios 2:1-15',
      autor: 'Salomón (tradición, con aportes posteriores)', epoca: '~siglo X a.C. (compilado después)', lugar: 'la corte real de Jerusalén',
      escena: 'monte' as EscenaKey,
      captionEscena: 'La escena: alguien cavando con esfuerzo, buscando algo valioso bajo tierra.',
      gancho: 'La sabiduría de Dios no se recibe pasivamente — se BUSCA, dice este capítulo, «como quien busca plata» y «como quien busca tesoros escondidos».',
      quePasa: [
        'El padre le enseña a su hijo que la sabiduría no cae del cielo sin esfuerzo: hay que «recibir mis palabras», «guardar mis mandamientos», «inclinar tu oído», «clamar por inteligencia» y «buscarla como plata». Es una búsqueda activa, no una espera pasiva.',
        'La recompensa de esa búsqueda es concreta: entender el temor del Señor, ser guardado de «hombres que hablan perversidades» y de decisiones que arruinan la vida. La sabiduría, dice el capítulo, te «guardará» y te «preservará» como un escudo.',
      ],
      enElMapa: 'Este capítulo profundiza lo que arrancó en Proverbios 1: la sabiduría no es información — es protección. Es el mismo tesoro que, en el Nuevo Testamento, Jesús va a decir que vale más que todo lo demás que un hombre pueda vender.',
      paraHoy: '¿Estás buscando la sabiduría de Dios con el mismo esfuerzo con el que buscarías un tesoro enterrado, o esperas que te llegue sin esfuerzo?',
      progresoRuta: 18, duracionMin: 3,
    },
    tituloEnsenanza: 'Qué enseña este capítulo',
    ensenanza: [
      'La sabiduría se busca activamente — con el mismo esfuerzo que pondrías en buscar algo de gran valor.',
      'Entender a Dios no es solo información: es protección práctica contra decisiones que te destruyen.',
      'Lo que inviertes en buscar sabiduría hoy te «guarda» de trampas que ni siquiera ves venir todavía.',
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

export interface Pasaje {
  texto: string;
  referencia: string;
}

export interface Emocion {
  key: EmocionKey;
  titulo: string;
  descripcion: string;
  /** 2-3 versículos curados para esta emoción — van apareciendo uno a uno
   * mientras la persona respira, para acompañarla más allá del primero. */
  pasajes: Pasaje[];
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
    pasajes: [
      { texto: 'Por nada estéis afanosos… y la paz de Dios guardará vuestros corazones.', referencia: 'Filipenses 4:6-7' },
      { texto: 'No os afanéis por el día de mañana, porque el día de mañana traerá su afán.', referencia: 'Mateo 6:34' },
      { texto: 'Echa sobre el Señor tu carga, y él te sustentará.', referencia: 'Salmo 55:22' },
    ],
    oracion: ['Suelto lo que no puedo controlar.', 'Respiro tu paz.', 'Quédate conmigo este minuto.'],
  },
  {
    key: 'tristeza',
    titulo: 'Tristeza',
    descripcion: 'El peso que hoy no se va.',
    pasajes: [
      { texto: 'Cercano está el Señor a los quebrantados de corazón.', referencia: 'Salmo 34:18' },
      { texto: 'Bienaventurados los que lloran, porque ellos recibirán consolación.', referencia: 'Mateo 5:4' },
      { texto: 'Por la noche durará el lloro, y a la mañana vendrá la alegría.', referencia: 'Salmo 30:5' },
    ],
    oracion: ['No tengo que fingir que estoy bien.', 'Tú estás cerca.', 'Sostén mi corazón hoy.'],
  },
  {
    key: 'culpa',
    titulo: 'Culpa',
    descripcion: 'Algo que hiciste te pesa.',
    pasajes: [
      { texto: 'Si confesamos nuestros pecados, él es fiel y justo para perdonarnos.', referencia: '1 Juan 1:9' },
      { texto: 'Cuanto está lejos el oriente del occidente, hizo alejar de nosotros nuestras rebeliones.', referencia: 'Salmo 103:12' },
      { texto: 'Ninguna condenación hay para los que están en Cristo Jesús.', referencia: 'Romanos 8:1' },
    ],
    oracion: ['Reconozco lo que hice.', 'Recibo tu perdón.', 'Empiezo de nuevo desde aquí.'],
  },
  {
    key: 'gratitud',
    titulo: 'Gratitud',
    descripcion: 'Hoy quieres dar gracias.',
    pasajes: [
      { texto: 'Bendice, alma mía, al Señor, y no olvides ninguno de sus beneficios.', referencia: 'Salmo 103:2' },
      { texto: 'Dad gracias en todo, porque esta es la voluntad de Dios para con vosotros en Cristo Jesús.', referencia: '1 Tesalonicenses 5:18' },
      { texto: 'Este es el día que hizo el Señor; nos gozaremos y alegraremos en él.', referencia: 'Salmo 118:24' },
    ],
    oracion: ['Gracias por lo que veo y lo que no veo.', 'Por este día.', 'Por ti.'],
  },
];
