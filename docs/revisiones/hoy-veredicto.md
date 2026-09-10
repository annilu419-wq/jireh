# VEREDICTO revisor-visual — Hoy (RECHECK 2)
Fecha: 2026-09-10 00:00
Screenshot: docs/revisiones/hoy-375.png
Usabilidad: 36/40
Craft: 16/20
Copy (si vende): N-A
Fidelidad (si hubo referencia): N-A
Veredicto: LISTA

## Detalle
USABILIDAD: 36/40 — NO re-auditada esta ronda (recheck acotado a craft). Se arrastra el
resultado de R2, que ya cruzaba el umbral (>=36). Sin regresiones visibles en el screenshot.
CRAFT: 16/20 (jerarquia:3 profundidad:3 identidad:3 movimiento:4 encaje:3)

## Verificacion de los 5 defectos de craft de R2
1. Escena de contexto — CORREGIDO (parcial-efectivo). EscenasContexto.tsx reescrito: la escena
   'desierto' dibuja animal de carga + 3 siluetas de espaldas + sendero punteado + sol bajo,
   horizonte a ~y62. Ya no es placeholder. Residual: los trazos siguen muy tenues a 375px
   (figuras a fillOpacity 0.66 sobre tertiary 64% transparente).
2. Fondo crema plano — CORREGIDO. MAPA_APP curvas 0.22 / circulos 0.18; amanecer accent 20% /
   accent-2 16%. En el screenshot se lee wash calido arriba + curvas de nivel tenues. Profundidad
   de 3 niveles (base / scene card elevada con sombra / superficie hundida PARA TI HOY) presente.
3. Racha sin count-up — CORREGIDO (verificado en codigo). TopBar ya tenia rAF ease-out;
   ahora el chip de celebracion envuelve la racha en <Contador> (hoy/page.tsx:195). Tambien
   "% de la Ruta" cuenta. No visible en el screenshot principal (estado colapsado).
4. Rotulos inconsistentes — CORREGIDO (mayoria). figcaption de LineaPromesa y encabezado de la
   ensenanza ahora 11px/bold/0.14em/text-tertiary + hairline, igual que el componente Rotulo.
   Residual menor: chip labels AUTOR/EPOCA/LUGAR usan tracking-wide (no 0.14em); "Contexto para
   hoy" y "Antes de leer" siguen en accent (defendible: kicker de pantalla / eyebrow de callout).
5. Pulso infinito del nodo "Vas por aqui" — CORREGIDO (verificado). repeat: 2 en LineaPromesa.tsx:74.

## Movimiento (eje 4 = 4): 7 baseline verificadas en codigo
stagger de entrada (useReveal) · count-up en 3 numeros heroe (racha x2 + % Ruta) · linea de
Ruta que se dibuja (pathLength 0->progreso) · whileTap 0.97 en CTAs primarios · transicion de
revelado + AnimatePresence en el colapsable · celebracion con Destellos + springs en hito ·
prefers-reduced-motion respetado en TODOS los componentes. Ambos defectos de motion de R2
cerrados. Gap menor: controles secundarios (toggle, "Leer capitulo", "Deshacer") sin whileTap.

## GATE DOBLE
Usabilidad 36/40 (>=36) Y Craft 16/20 (>=16) -> PASA. Pantalla LISTA.

## Top defectos (residuales, NO bloquean — pulido)
1. [escena / EscenasContexto.tsx desierto] siluetas y animal casi imperceptibles a 375px
   -> subir fill de figuras a ~0.8 y TINTA a 70% para que la caravana se lea sin buscarla.
2. [ficha / ContextoFicha.tsx:249] chip labels AUTOR/EPOCA/LUGAR con tracking-wide
   -> cambiar a tracking-[0.14em] para igualar el resto de rotulos.
3. [escena] composicion cargada a la izquierda (figuras x110-133, tercio derecho solo sol+brujula)
   -> desplazar el grupo de la caravana ~+30 en x o acercar sol/brujula para equilibrio optico.
4. [MapaFondo brujula] rosa de los vientos en translate(268 32) r13 queda a ~14px del borde
   superior del frame de 132 -> bajar a y38 para dar aire.
5. [controles secundarios] toggle "Conocer el contexto completo", "Leer el capitulo completo" y
   "Deshacer" sin feedback de tap -> anadir whileTap scale 0.98 para consistencia con los CTAs.
