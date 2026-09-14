// Los 66 libros en orden canónico + datos para el navegador "Biblia" (Sesión 5).
// Estático — no hay backend. El TEXTO de la Biblia (importación con licencia libre)
// y el audio llegan en la Sesión 6; aquí solo el índice navegable + qué libros ya
// tienen la CAPA GUIADA de Jireh (conjunto de lanzamiento).

export type Testamento = 'AT' | 'NT';

export interface Libro {
  slug: string;
  nombre: string;
  testamento: Testamento;
  division: string;
  capitulos: number;
  guiada: boolean; // tiene la capa guiada de Jireh (infografía + enseñanza + audio)
}

// conjunto de lanzamiento con capa guiada (ESTADO.md): Evangelios + Hechos + Salmos + Génesis + Proverbios
const GUIADAS = new Set(['genesis', 'salmos', 'proverbios', 'mateo', 'marcos', 'lucas', 'juan', 'hechos']);

type Fila = [nombre: string, slug: string, division: string, capitulos: number];

const AT: Fila[] = [
  ['Génesis', 'genesis', 'Pentateuco', 50],
  ['Éxodo', 'exodo', 'Pentateuco', 40],
  ['Levítico', 'levitico', 'Pentateuco', 27],
  ['Números', 'numeros', 'Pentateuco', 36],
  ['Deuteronomio', 'deuteronomio', 'Pentateuco', 34],
  ['Josué', 'josue', 'Históricos', 24],
  ['Jueces', 'jueces', 'Históricos', 21],
  ['Rut', 'rut', 'Históricos', 4],
  ['1 Samuel', '1-samuel', 'Históricos', 31],
  ['2 Samuel', '2-samuel', 'Históricos', 24],
  ['1 Reyes', '1-reyes', 'Históricos', 22],
  ['2 Reyes', '2-reyes', 'Históricos', 25],
  ['1 Crónicas', '1-cronicas', 'Históricos', 29],
  ['2 Crónicas', '2-cronicas', 'Históricos', 36],
  ['Esdras', 'esdras', 'Históricos', 10],
  ['Nehemías', 'nehemias', 'Históricos', 13],
  ['Ester', 'ester', 'Históricos', 10],
  ['Job', 'job', 'Poéticos', 42],
  ['Salmos', 'salmos', 'Poéticos', 150],
  ['Proverbios', 'proverbios', 'Poéticos', 31],
  ['Eclesiastés', 'eclesiastes', 'Poéticos', 12],
  ['Cantares', 'cantares', 'Poéticos', 8],
  ['Isaías', 'isaias', 'Profetas mayores', 66],
  ['Jeremías', 'jeremias', 'Profetas mayores', 52],
  ['Lamentaciones', 'lamentaciones', 'Profetas mayores', 5],
  ['Ezequiel', 'ezequiel', 'Profetas mayores', 48],
  ['Daniel', 'daniel', 'Profetas mayores', 12],
  ['Oseas', 'oseas', 'Profetas menores', 14],
  ['Joel', 'joel', 'Profetas menores', 3],
  ['Amós', 'amos', 'Profetas menores', 9],
  ['Abdías', 'abdias', 'Profetas menores', 1],
  ['Jonás', 'jonas', 'Profetas menores', 4],
  ['Miqueas', 'miqueas', 'Profetas menores', 7],
  ['Nahúm', 'nahum', 'Profetas menores', 3],
  ['Habacuc', 'habacuc', 'Profetas menores', 3],
  ['Sofonías', 'sofonias', 'Profetas menores', 3],
  ['Hageo', 'hageo', 'Profetas menores', 2],
  ['Zacarías', 'zacarias', 'Profetas menores', 14],
  ['Malaquías', 'malaquias', 'Profetas menores', 4],
];

const NT: Fila[] = [
  ['Mateo', 'mateo', 'Evangelios', 28],
  ['Marcos', 'marcos', 'Evangelios', 16],
  ['Lucas', 'lucas', 'Evangelios', 24],
  ['Juan', 'juan', 'Evangelios', 21],
  ['Hechos', 'hechos', 'Historia', 28],
  ['Romanos', 'romanos', 'Cartas de Pablo', 16],
  ['1 Corintios', '1-corintios', 'Cartas de Pablo', 16],
  ['2 Corintios', '2-corintios', 'Cartas de Pablo', 13],
  ['Gálatas', 'galatas', 'Cartas de Pablo', 6],
  ['Efesios', 'efesios', 'Cartas de Pablo', 6],
  ['Filipenses', 'filipenses', 'Cartas de Pablo', 4],
  ['Colosenses', 'colosenses', 'Cartas de Pablo', 4],
  ['1 Tesalonicenses', '1-tesalonicenses', 'Cartas de Pablo', 5],
  ['2 Tesalonicenses', '2-tesalonicenses', 'Cartas de Pablo', 3],
  ['1 Timoteo', '1-timoteo', 'Cartas de Pablo', 6],
  ['2 Timoteo', '2-timoteo', 'Cartas de Pablo', 4],
  ['Tito', 'tito', 'Cartas de Pablo', 3],
  ['Filemón', 'filemon', 'Cartas de Pablo', 1],
  ['Hebreos', 'hebreos', 'Cartas generales', 13],
  ['Santiago', 'santiago', 'Cartas generales', 5],
  ['1 Pedro', '1-pedro', 'Cartas generales', 5],
  ['2 Pedro', '2-pedro', 'Cartas generales', 3],
  ['1 Juan', '1-juan', 'Cartas generales', 5],
  ['2 Juan', '2-juan', 'Cartas generales', 1],
  ['3 Juan', '3-juan', 'Cartas generales', 1],
  ['Judas', 'judas', 'Cartas generales', 1],
  ['Apocalipsis', 'apocalipsis', 'Profético', 22],
];

function construir(filas: Fila[], testamento: Testamento): Libro[] {
  return filas.map(([nombre, slug, division, capitulos]) => ({
    nombre,
    slug,
    testamento,
    division,
    capitulos,
    guiada: GUIADAS.has(slug),
  }));
}

export const LIBROS: Libro[] = [...construir(AT, 'AT'), ...construir(NT, 'NT')];

export const DIVISIONES_AT = ['Pentateuco', 'Históricos', 'Poéticos', 'Profetas mayores', 'Profetas menores'];
export const DIVISIONES_NT = ['Evangelios', 'Historia', 'Cartas de Pablo', 'Cartas generales', 'Profético'];

export function getLibro(slug: string): Libro | undefined {
  return LIBROS.find((l) => l.slug === slug);
}

/** Nombre del libro ("Génesis") → slug ("genesis"). Para enlazar al lector. */
export function slugDeNombre(nombre: string): string | undefined {
  return LIBROS.find((l) => l.nombre === nombre)?.slug;
}

/* ── La Ruta: dónde va el usuario en el recorrido cronológico (seed) ── */
export const RUTA = {
  libroActual: 'Marcos',
  capituloActual: 4,
  progreso: 42, // % de la Ruta recorrido
  // estaciones para el mini-mapa (nombre + si ya está iluminada)
  estaciones: [
    { libro: 'Génesis', hecha: true },
    { libro: 'Éxodo', hecha: true },
    { libro: 'Salmos', hecha: true },
    { libro: 'Isaías', hecha: true },
    { libro: 'Mateo', hecha: true },
    { libro: 'Marcos', hecha: false }, // aquí estás
    { libro: 'Hechos', hecha: false },
    { libro: 'Romanos', hecha: false },
  ],
};

/* ── "Sobre este libro" — 1-2 líneas por libro para la vista de detalle.
   Solo el conjunto de lanzamiento por ahora; el resto usa un texto genérico. ── */
export const SOBRE_LIBRO: Record<string, string> = {
  genesis: 'Los comienzos: la creación, las primeras familias y las promesas que arrancan toda la historia.',
  salmos: 'El cancionero de la Biblia: oraciones y poemas para cada estado del alma.',
  proverbios: 'Sabiduría práctica para la vida diaria, en frases cortas y memorables.',
  mateo: 'Jesús como el Rey prometido; conecta el Antiguo Testamento con su llegada.',
  marcos: 'El evangelio más ágil: Jesús en acción, servicio y camino a la cruz.',
  lucas: 'El evangelio del cuidado: Jesús con los olvidados, los pobres y los de afuera.',
  juan: 'Quién es Jesús en profundidad: señales, "Yo soy" y vida eterna.',
  hechos: 'Cómo empezó la iglesia y cómo el mensaje llegó del Templo al mundo.',
};

export function sobreLibro(l: Libro): string {
  return SOBRE_LIBRO[l.slug] ?? `${l.nombre} — ${l.division}, ${l.testamento === 'AT' ? 'Antiguo' : 'Nuevo'} Testamento. Su recorrido guiado llega muy pronto.`;
}
