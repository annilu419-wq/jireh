// En la Reina-Valera 1909, "criar" significa CREAR ("En el principio crió Dios los cielos y
// la tierra"). Hoy suena a error. Este script (se corre DESPUÉS de importar-biblia.mjs y
// normalizar-mayusculas.mjs) lo cambia a "crear" SOLO en los versículos de la lista CASOS,
// revisada una por una. NO se toca "criar" en el sentido de criar hijos ("criólo", "los
// que criaban") ni "criado/a" = sirviente.
//
// Uso:  node scripts/modernizar-crear.mjs          (reescribe public/biblia/*.json)
//       node scripts/modernizar-crear.mjs --ver     (solo muestra antes/después)

import { readFile, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'biblia');
const SOLO_VER = process.argv.includes('--ver');

// libro → versículos "capítulo:versículo" donde TODAS las formas de "criar" significan "crear"
const CASOS = {
  genesis: ['1:1', '1:21', '1:27', '2:3', '2:4', '5:1', '5:2', '6:7'],
  deuteronomio: ['4:32', '32:18'],
  job: ['26:13'],
  salmos: ['89:12', '89:47', '102:18', '119:91', '148:5'],
  eclesiastes: ['12:1'],
  isaias: ['4:5', '40:26', '40:28', '41:20', '42:5', '43:1', '43:15', '43:21', '45:7', '45:8', '45:12', '45:18', '48:7', '54:16', '57:16', '57:19', '65:17', '65:18'],
  jeremias: ['31:22'],
  ezequiel: ['28:15'],
  malaquias: ['2:10'],
  marcos: ['13:19'],
  romanos: ['1:25'],
  '1-corintios': ['11:9'],
  efesios: ['2:10', '3:9', '4:24'],
  colosenses: ['1:16', '3:10'],
  '1-timoteo': ['4:3', '4:4'],
  hebreos: ['3:4', '4:13'],
  '1-pedro': ['4:19'],
  apocalipsis: ['4:11', '10:6'],
};

const FORMAS = {
  crió: 'creó', crié: 'creé', criaste: 'creaste', criará: 'creará', crío: 'creo',
  criado: 'creado', criada: 'creada', criados: 'creados', criadas: 'creadas',
  criador: 'creador',
};
const RE = /(?<!\p{L})(crió|crié|criaste|criará|crío|criad[oa]s?|criador)(?!\p{L})/giu;

function convertir(v) {
  return v.replace(RE, (m) => {
    const nuevo = FORMAS[m.toLowerCase()];
    if (!nuevo) return m;
    return m[0] === m[0].toUpperCase() ? nuevo.charAt(0).toUpperCase() + nuevo.slice(1) : nuevo;
  });
}

let cambiados = 0;
const muestras = [];
for (const [libro, refs] of Object.entries(CASOS)) {
  const ruta = join(DIR, `${libro}.json`);
  const j = JSON.parse(await readFile(ruta, 'utf8'));
  for (const ref of refs) {
    const [c, v] = ref.split(':').map(Number);
    const antes = j[c]?.[v - 1];
    if (antes === undefined) throw new Error(`No existe ${libro} ${ref}`);
    const despues = convertir(antes);
    if (despues === antes) {
      console.log(`(sin cambio) ${libro} ${ref}`);
      continue;
    }
    j[c][v - 1] = despues;
    cambiados++;
    if (muestras.length < 12) muestras.push(`${libro} ${ref}\n   antes:   ${antes.slice(0, 90)}\n   después: ${despues.slice(0, 90)}`);
  }
  if (!SOLO_VER) await writeFile(ruta, JSON.stringify(j), 'utf8');
}
console.log(`${SOLO_VER ? '[solo ver] ' : ''}versículos modernizados: ${cambiados}\n\n${muestras.join('\n')}`);
