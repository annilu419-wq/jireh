// La Reina-Valera 1909 imprime en MAYÚSCULAS las primeras palabras de cada capítulo
// ("Y OTRA vez comenzó…", "PABLO, llamado a ser apóstol…"). En pantalla se ve como un
// error. Este script (se corre DESPUÉS de importar-biblia.mjs) las pasa a minúsculas,
// conservando la mayúscula de los nombres propios: una palabra en mayúsculas se deja
// como Nombre solo si ese nombre aparece en medio de frases del propio texto, con
// mayúscula inicial, más veces que en minúscula.
//
// Uso:  node scripts/normalizar-mayusculas.mjs        (reescribe public/biblia/*.json)
//       node scripts/normalizar-mayusculas.mjs --ver   (solo muestra ejemplos, no escribe)

import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'biblia');
const SOLO_VER = process.argv.includes('--ver');

const TOKEN = /^([^\p{L}]*)(\p{L}[\p{L}'’-]*)(.*)$/u;
const partes = (tok) => {
  const m = TOKEN.exec(tok);
  return m ? { pre: m[1], pal: m[2], post: m[3] } : null;
};
const esMayus = (p) => p.length >= 2 && p === p.toUpperCase() && p !== p.toLowerCase();
const titulo = (p) => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase();

const archivos = (await readdir(DIR)).filter((f) => f.endsWith('.json'));
const libros = {};
for (const f of archivos) libros[f] = JSON.parse(await readFile(join(DIR, f), 'utf8'));

// 1) estadística de nombres propios: palabra en medio de frase con/sin mayúscula inicial
const conMayus = new Map();
const sinMayus = new Map();
for (const j of Object.values(libros)) {
  for (const versos of Object.values(j)) {
    for (const v of versos) {
      const toks = v.split(' ');
      for (let i = 1; i < toks.length; i++) {
        if (/[.?!:¿«]$/.test(toks[i - 1]) || /^[¿«"]/.test(toks[i - 1])) continue; // inicio de frase
        const p = partes(toks[i]);
        if (!p || p.pal.length < 2) continue;
        const k = p.pal.toLowerCase();
        if (p.pal === titulo(p.pal)) conMayus.set(k, (conMayus.get(k) ?? 0) + 1);
        else if (p.pal === p.pal.toLowerCase()) sinMayus.set(k, (sinMayus.get(k) ?? 0) + 1);
      }
    }
  }
}
// nombres que casi no aparecen en medio de frase y la estadística no alcanza a detectar
const NOMBRES_EXTRA = new Set(['achab']);
// ortografía antigua que importar-biblia.mjs ya modernizaba en minúsculas
const MODERNA = { fué: 'fue', vió: 'vio', dió: 'dio', fé: 'fe', fuí: 'fui', ví: 'vi', dí: 'di' };
const esNombre = (k) =>
  NOMBRES_EXTRA.has(k) || ((conMayus.get(k) ?? 0) >= 2 && (conMayus.get(k) ?? 0) > (sinMayus.get(k) ?? 0));

// 2) corregir la racha inicial de palabras en MAYÚSCULAS de cada versículo
function corregir(v) {
  const toks = v.split(' ');
  const primero = partes(toks[0]);
  if (!primero) return v;
  const empiezaMayus = esMayus(primero.pal) || (primero.pal.length === 1 && toks[1] && partes(toks[1]) && esMayus(partes(toks[1]).pal));
  if (!empiezaMayus) return v;
  let cambiado = false;
  for (let i = 0; i < toks.length; i++) {
    const p = partes(toks[i]);
    if (!p) break;
    if (p.pal.length === 1 && i === 0) continue; // "Y", "E", "O", "A": ya van bien
    if (!esMayus(p.pal)) break; // se acabó la racha en mayúsculas
    const k = p.pal.toLowerCase();
    const nuevo = i === 0 || esNombre(k) ? titulo(p.pal) : (MODERNA[k] ?? k);
    if (i > 0 && nuevo === k && (sinMayus.get(k) ?? 0) < 3) sospechosas.add(k + ' (' + (sinMayus.get(k) ?? 0) + ' en minúscula, ' + (conMayus.get(k) ?? 0) + ' con mayúscula)');
    toks[i] = p.pre + nuevo + p.post;
    cambiado = true;
  }
  return cambiado ? toks.join(' ') : v;
}

let total = 0;
const sospechosas = new Set();
const ejemplos = [];
const nombresConservados = new Set();
for (const [f, j] of Object.entries(libros)) {
  let toco = false;
  for (const [cap, versos] of Object.entries(j)) {
    versos.forEach((v, i) => {
      const n = corregir(v);
      if (n !== v) {
        total++;
        toco = true;
        versos[i] = n;
        if (ejemplos.length < 14 && (total % 90 === 1 || /^[^ ]+ [A-ZÁÉÍÓÚÑ]/.test(n.slice(0, 20)))) {
          ejemplos.push(`${f.replace('.json', '')} ${cap}:${i + 1}\n   antes:   ${v.slice(0, 60)}\n   después: ${n.slice(0, 60)}`);
        }
        for (const t of n.split(' ').slice(1, 6)) {
          const p = partes(t);
          if (p && p.pal === titulo(p.pal) && esMayus(partes(v.split(' ')[n.split(' ').indexOf(t)] ?? '')?.pal ?? '')) nombresConservados.add(p.pal);
        }
      }
    });
  }
  if (toco && !SOLO_VER) await writeFile(join(DIR, f), JSON.stringify(j), 'utf8');
}

console.log(`${SOLO_VER ? '[solo ver] ' : ''}versículos corregidos: ${total}`);
console.log('nombres propios conservados (muestra):', [...nombresConservados].slice(0, 25).join(', '));
console.log('\nPalabras que quedan en minúscula y casi no existen así (revisar):', [...sospechosas].join(' | ') || 'ninguna');
console.log('\nEjemplos:\n' + ejemplos.join('\n'));
