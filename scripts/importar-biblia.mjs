// Importa el texto bíblico (Reina-Valera 1909, dominio público) desde getBible v2
// y lo deja como un JSON por libro en public/biblia/<slug>.json.
//
//   node scripts/importar-biblia.mjs
//
// Formato de salida por archivo: { "<capitulo>": ["texto v1", "texto v2", ...] }
// (índice 0 = versículo 1). Se corre UNA vez; el resultado se commitea.

import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..');
const SALIDA = join(RAIZ, 'public', 'biblia');
const FUENTE = 'https://api.getbible.net/v2/valera'; // "Reina Valera (1909)"

// 66 libros en orden canónico — MISMO orden que LIBROS en lib/biblia.ts y que el
// número de libro (nr 1..66) de getBible.
const SLUGS = [
  'genesis', 'exodo', 'levitico', 'numeros', 'deuteronomio', 'josue', 'jueces', 'rut',
  '1-samuel', '2-samuel', '1-reyes', '2-reyes', '1-cronicas', '2-cronicas', 'esdras',
  'nehemias', 'ester', 'job', 'salmos', 'proverbios', 'eclesiastes', 'cantares', 'isaias',
  'jeremias', 'lamentaciones', 'ezequiel', 'daniel', 'oseas', 'joel', 'amos', 'abdias',
  'jonas', 'miqueas', 'nahum', 'habacuc', 'sofonias', 'hageo', 'zacarias', 'malaquias',
  'mateo', 'marcos', 'lucas', 'juan', 'hechos', 'romanos', '1-corintios', '2-corintios',
  'galatas', 'efesios', 'filipenses', 'colosenses', '1-tesalonicenses', '2-tesalonicenses',
  '1-timoteo', '2-timoteo', 'tito', 'filemon', 'hebreos', 'santiago', '1-pedro', '2-pedro',
  '1-juan', '2-juan', '3-juan', 'judas', 'apocalipsis',
];

const dormir = (ms) => new Promise((r) => setTimeout(r, ms));

// Modernización SOLO ortográfica (no cambia ninguna palabra ni el sentido):
// las partículas de una letra con tilde antigua (á/é/ó → a/e/o) y unos pocos
// acentos que la RAE ya eliminó en monosílabos verbales. La RV1909 es de dominio
// público. Se usa /u + \p{L} para que un límite de palabra reconozca las
// vocales acentuadas (el \b de JS no lo hace) y NO se toquen letras dentro de
// una palabra (p. ej. "pasóse", "adiós", "oí" quedan intactas).
const MONOSILABOS = [
  ['fué', 'fue'], ['fuí', 'fui'], ['fé', 'fe'],
  ['vió', 'vio'], ['dió', 'dio'], ['ví', 'vi'],
];
function modernizarOrtografia(t) {
  const solas = { 'á': 'a', 'é': 'e', 'ó': 'o', 'Á': 'A', 'É': 'E', 'Ó': 'O' };
  let out = t.replace(/(?<!\p{L})([áéóÁÉÓ])(?!\p{L})/gu, (_, c) => solas[c]);
  for (const [viejo, nuevo] of MONOSILABOS) {
    const cap = (s) => s[0].toUpperCase() + s.slice(1);
    out = out.replace(new RegExp(`(?<!\\p{L})${viejo}(?!\\p{L})`, 'gu'), nuevo);
    out = out.replace(new RegExp(`(?<!\\p{L})${cap(viejo)}(?!\\p{L})`, 'gu'), cap(nuevo));
  }
  return out;
}

function limpiar(texto) {
  const base = String(texto).replace(/\s+/g, ' ').replace(/\s+([,.;:!?»])/g, '$1').trim();
  return modernizarOrtografia(base);
}

async function libro(nr) {
  const url = `${FUENTE}/${nr}.json`;
  for (let intento = 1; intento <= 4; intento++) {
    try {
      const res = await fetch(url, { headers: { 'user-agent': 'yireth-import/1.0' } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      if (intento === 4) throw err;
      await dormir(1500 * intento);
    }
  }
}

async function main() {
  await mkdir(SALIDA, { recursive: true });
  let totalVersiculos = 0;
  const resumen = [];

  for (let nr = 1; nr <= 66; nr++) {
    const slug = SLUGS[nr - 1];
    const data = await libro(nr);
    const capitulos = data.chapters ?? [];
    const salida = {};
    let vLibro = 0;

    for (const cap of capitulos) {
      const versos = (cap.verses ?? []).map((v) => limpiar(v.text));
      salida[String(cap.chapter)] = versos;
      vLibro += versos.length;
    }

    if (Object.keys(salida).length === 0) throw new Error(`${slug}: 0 capítulos`);
    await writeFile(join(SALIDA, `${slug}.json`), JSON.stringify(salida), 'utf8');

    totalVersiculos += vLibro;
    resumen.push(`${String(nr).padStart(2)} ${slug.padEnd(18)} ${Object.keys(salida).length} cap · ${vLibro} v`);
    process.stdout.write(`\r  ${nr}/66  ${slug}            `);
    await dormir(120);
  }

  console.log('\n');
  console.log(resumen.join('\n'));
  console.log(`\nOK — 66 libros · ${totalVersiculos} versículos → public/biblia/`);
}

main().catch((e) => {
  console.error('\nFALLÓ:', e.message);
  process.exit(1);
});
