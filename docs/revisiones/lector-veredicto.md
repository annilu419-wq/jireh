# VEREDICTO revisor-visual — lector de capítulo bíblico
Fecha: 2026-09-10 14:35
Screenshot: docs/revisiones/lector-375.png
Usabilidad: 33/40
Craft: 14/20
Copy (si vende): N-A
Fidelidad (si hubo referencia): N-A
Veredicto: NO LISTA

Top defectos:
1. [Banda superior / textura cartográfica — page.tsx L28-29 y L178-188] Las curvas de nivel y la rosa de los vientos siguen imperceptibles a 375px (stroke-opacity 0.5 sobre crema #FBF6EC, máscara a transparent 80%). El dispositivo ownable no se lee de un vistazo — la queja de R2 no está resuelta. Fix: stroke-opacity 0.9-1.0, stroke-width ~1.4, tono #5A4A30, máscara a `transparent 95%` y rosa de los vientos a r≈26 anclada arriba-derecha junto al pill A−/A+.
2. [h1 "Génesis 12" — L223] 27px contra cuerpo de 17-21px = héroe poco dominante; al entrecerrar los ojos título y cuerpo pesan casi igual. Fix: display a 30-32px (o bajar el cuerpo por defecto al nivel 0).
3. [Preámbulo del encabezado — L190-260] Antes de la primera línea bíblica el usuario cruza 6 bloques (volver, A−/A+, título, versión+glifo, "¿Por qué suena así?", banner de tip) y el texto cae a ~1/3 del viewport. Fix: fundir el tip de una vez y el `<details>` en una sola tira dismissible; ≤3 elementos sobre la tarjeta de texto.
4. [Nav de capítulos — L315-342] No hay salto directo a otro capítulo/versículo desde el lector (solo ±1 o volver al libro). Fix: selector de capítulo tocando el h1, o lista con pin "aquí".
5. [Estado de error — L277-290] Mensaje único "Revisa tu conexión" para cualquier fallo (offline, 500, JSON inválido). Fix: diferenciar sin-conexión de error de servidor, cada uno con su acción.

Recheck acotado — lo que falta para LISTA:
- (A) CRAFT: que la textura del BANDA_MAPA SEA visible a simple vista a 375px (defecto 1) → eje identidad 2->3, craft ~16/20.
- (B) USABILIDAD: subir de 33 a 36 aplicando defectos 3, 4 y 5 (menos preámbulo + salto de capítulo + errores diferenciados).
Detalle usabilidad: h1:4 h2:3 h3:3 h4:3 h5:3 h6:4 h7:4 h8:3 h9:3 h10:3
Detalle craft: jerarquía:3 profundidad:3 identidad:2 movimiento:3 encaje:3
