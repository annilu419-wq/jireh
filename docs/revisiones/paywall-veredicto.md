# VEREDICTO revisor-visual — paywall

Fecha: 2026-08-29 00:00
Screenshot: docs/revisiones/paywall-375.png
Usabilidad: 37/40
Craft: 17/20
Copy (si vende): 17/20
Copy: 17/20
Fidelidad (si hubo referencia): N-A
Veredicto: LISTA

Detalle usabilidad: h1:4 h2:4 h3:4 h4:4 h5:4 h6:4 h7:3 h8:3 h9:4 h10:3
Detalle craft: jerarquia:3 profundidad:4 identidad:3 movimiento:4 encaje:3
Detalle copy: idea:3 especificidad:3 emocion:3 oferta:4 accion:4

Gate doble: PASA usabilidad (37 >= 36) · PASA craft (17 >= 16) · PASA copy (17 >= 16, sin ejes <=2).
Trayectoria: 31/13/15 -> 33/15/16 -> 35/15/17 -> 37/17/17.

## Por que pasa (verificado en screenshot + codigo)

- CTA heroe vivo: contraste azul #2F6D8C sobre crema #FBF6EC > 3:1 · whileTap scale 0.97
  (anulado en 'enviando') · habilitado hasta que arranca el request · h-54 w-full.
- Estado del sistema completo: CountUp en ambos precios, stagger de beneficios y
  tarjetas, trazo del sendero con pathLength, estado 'enviando' (spinner + label +
  disabled + aria-busy), y estado 'error' alcanzable a 3.5s con AnimatePresence (fade
  in/out) + boton "Reintentar" (RotateCw). reduced-motion respetado en TODOS los
  animadores, incluido el pathLength inicial.
- Control y libertad: flecha "Atras" (izquierda -> PaywallTimeline, conserva avance) +
  X (derecha -> salida sin culpa) + "Ahora no" + error recuperable con reintento.
- Prevencion de error / claridad de oferta: primer cobro explicito en ESTA pantalla
  ("hoy $0 · el dia 7 se cobra $29.99/ano · cancelas antes sin costo"), garantia
  nombrada bajo el CTA ("La Garantia Sin Letra Chica · 30 dias"), aviso el dia 6,
  cancelas en 1 tap. Desactiva la objecion de oro del avatar (cobro enganoso).
- Profundidad de 3 niveles legible: base crema + mesh · panel hundido (surface-2 +
  inset shadow + ring-inset, se lee como recesado) · tarjetas elevadas con
  --shadow-chip; radios anidados (panel 20 / card ~12 / inner 10).
- Consistencia: PlanCard unico para ambos planes; badge "Mejor valor" en ambar
  (--accent-2) = realce de valor, coherente con FICHA-ARTE (azul solo accion).
- Copy trazado a FICHA-AVATAR: subtitulo con el dolor literal ("no la vas a abandonar
  a los cuatro dias") + ancla ("en orden y sin culpa", "5 minutos"); mecanismo "la
  Ruta" nombrado y consistente con la landing. Una sola accion primaria en 1a persona.

## PULIDO RESIDUAL (no bloqueante — subir de "listo" a sobresaliente)

1. [aire panel -> CTA] Queda una banda de aire entre el panel hundido y el bloque del
   CTA: la mitad inferior se ve mas vacia que la superior. Equilibrar (centrar el
   conjunto, reducir el mt-auto, o sumar un elemento ligero). Afecta craft encaje (3).
2. [identidad ownable, craft eje 3 = 3] El motivo cartografico solo vive en la franja
   de 40px; la marca de agua de mapa del fondo casi no se percibe a 375px. Llevar la
   textura de mapa a las tarjetas o reforzar el watermark para que la identidad se
   registre sin buscarla -> eje 3 a 4.
3. [micro-linea bajo el CTA] "Menos de $0.09 al dia · aviso el dia 6 · cancelas en 1
   tap" mete tres ideas distintas en un renglon con puntos medios; se lee pero es
   denso. Partir en 2 renglones o soltar una.
4. [copy emocion, eje 3 = 3] El subtitulo resuelve muy rapido. Para llegar a 4: agitar
   un beat la escena exacta del avatar (10 PM, se duerme en el 2o capitulo, con culpa)
   antes del "esta vez no".
5. [label del eco de la Ruta] "tu Ruta te espera" queda opticamente alto respecto a la
   masa visual del SVG (el trazo curva por la mitad baja). Alinear a la linea del
   sendero.
6. [ayuda contextual, h10 = 3] "pagas 4 meses, tienes 12" podria llevar un tooltip o
   reformularse; considerar una micro-aclaracion de que es Hotmart para el avatar
   LATAM menos habituado.

Ninguno de estos seis bloquea el lanzamiento. La pantalla cumple el gate doble y los
tests de la casa (squint 1->2->3->4; sin el logo NO parece template — el motivo de mapa
de expedicion + panel cartografico + ambar de valor la identifican).
