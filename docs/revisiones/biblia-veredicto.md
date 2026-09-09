# VEREDICTO revisor-visual — Biblia (navegador / índice)
Fecha: 2026-09-02 00:00
Screenshot: docs/revisiones/biblia-375.png
Usabilidad: 37/40
Craft: 17/20
Copy (si vende): N-A
Fidelidad (si hubo referencia): N-A
Veredicto: LISTA

Detalle usabilidad: h1:4 h2:4 h3:4 h4:4 h5:3 h6:4 h7:3 h8:4 h9:3 h10:4
Detalle craft: jerarquia:3 profundidad:3 identidad:4 movimiento:4 encaje:3

GATE: exige >=36/40 Y >=16/20. Obtiene 37 y 17 -> PASA. Pantalla LISTA.
Historial: R1 34/40 · 16/20 (NO LISTA) -> R2 37/40 · 17/20 (LISTA).

--------------------------------------------------------------------------------
## Defectos de R1 — RESUELTOS (verificado en código + screenshots)

1. [era BLOQUEANTE] Feedback de tap: ahora responde TODO.
   - Filas de libro: `whileTap` scale 0.985 + flash de fondo azul 7% en el `motion.li`
     (press-state de fila, apropiado para un target full-width). Verificado L144-150.
   - "Continuar en la Ruta": MotionLink con `whileTap` scale 0.97.
   - Pastillas del filtro: `motion.button` + `whileTap` scale 0.96 (L102-107).
   - X de limpiar búsqueda: `whileTap` scale 0.9 (L91). "Ver los 66 libros": 0.96 (L133).
   - Todo con guarda `reduce ? 1 : …`. -> h1 3->4, h4 3->4, movimiento 3->4.

2. Mini-mapa con rótulos: "Génesis" (inicio) y "Apocalipsis" (fin) tenues en los
   extremos + "aquí" en azul sobre el pin que late. En el screenshot ya se lee
   inequívocamente como RECORRIDO, no como gráfico abstracto. -> cierra el foco 2;
   sube h10 y afianza craft-identidad.

3. Filtro AT/NT: la pastilla activa ahora es AZUL (texto `--accent` + ring `--accent`
   28%) y la superficie se DESLIZA entre pastillas con `layoutId="biblia-filtro"`
   (spring 380/32). Cumple "azul -> filtro activo" del spec + baseline de tabs.
   Verificado L109-120.

+ Extra (defecto menor 5): línea de conteo dinámica — "66 libros en orden canónico ·
  8 con guía de Yireth por ahora" por defecto, "27 libros · Nuevo Testamento" al
  filtrar, "N libros" al buscar. Plural correcto. Verificado L74-78.

--------------------------------------------------------------------------------
## FOCO — respuestas tras R2

1) ¿La Ruta card domina como objeto principal sin que la lista de 66 la ahogue?
   SÍ. Primer y mayor elemento, único CTA azul relleno, borde con tinte de acento,
   mini-mapa + % que cuenta. La lista va debajo, callada, tras un salto claro. No
   compite. (Sigue vigente el caveat no bloqueante: la lista arranca 100% bajo el
   pliegue — ver seguimiento.)

2) ¿El mini-mapa se lee como "recorrido que se ilumina" o como gráfico abstracto?
   Ahora como RECORRIDO, sin ambigüedad: sendero sólido azul (recorrido) -> punteado
   gris (por venir), estaciones ámbar/huecas, anillo pulsante + rótulo "aquí",
   extremos rotulados "Génesis"/"Apocalipsis", curvas de nivel + cielo. RESUELTO.

3) ¿La densidad de la lista (grupos + badges) es escaneable a 390px?
   SÍ (sin cambio respecto a R1): agrupación por división en tarjetas con rótulo
   uppercase, filas de 2 líneas ~56px, chevron en todas, badge "Guía" discreto.

--------------------------------------------------------------------------------
## VERIFICACIONES OK
- Contrato FICHA-ARTE: modo claro, crema, azul en acción + filtro activo + badge
  "Guía" + "8 con guía", ámbar en % de la Ruta + estaciones hechas. Sora, radios del
  kit, `--shadow-card` + hairlines + fondo amanecer. Sin serif (correcto). Dispositivo
  ownable (la Ruta) como OBJETO PRINCIPAL y ya legible.
- Léxico vetado: "ritual" NO aparece.
- Copy trazado al avatar: "en orden canónico", "de principio a fin", "Retómala donde
  la dejaste" — responde al dolor #1 ("me pierdo entre reyes/guerras/profetas").
- Búsqueda ignora acentos ("genesis" -> "Génesis"); X para limpiar (con whileTap).
- Sin-resultados: icono + "Ningún libro coincide con «q»" (consulta real) + "Ver los
  66 libros" (resetea q + filtro). Qué pasó + qué hacer, sin tecnicismos.
- Movimiento: baseline COMPLETA — dibujo del sendero, conteo del %, anillo "aquí
  estás", stagger de filas (con tope), entrada de RutaCard, whileTap en todo lo
  táctil, slide del filtro con elemento compartido. `prefers-reduced-motion` cubierto.
- Agrupación en orden canónico; badge "Guía" solo en el conjunto de lanzamiento (8).
  BottomNav: activo con acento + fondo sutil distinto; contenido no tapado por la nav
  (min-h-dvh). Sin regresión en los divisores de fila (border movido a `li`
  con `first:border-t-0`).
- tsc ✓ · build prod ✓ (reportado).

## SEGUIMIENTO NO BLOQUEANTE (no reabre el gate)
1. Skeleton de carga: esta pantalla es estática (índice desde `lib/biblia.ts`).
   Definir el skeleton para cuando la Sesión 6 haga async `/app/biblia/[slug]`.
2. `role="tablist"/"tab"` en el filtro sin `tabpanel`/`aria-controls` (mismo detalle
   que el toggle del Diario): más propio de `radiogroup`. Unificar a nivel de app.
3. El usuario recurrente que solo quiere un libro scrollea la Ruta card entera cada
   vez. Vigilar en pruebas de usuario; opción: barra "Buscar un libro" sticky sobre
   la nav.
4. Estaciones del mini-mapa en coords "aproximadas sobre la curva": imperceptible a
   este tamaño; recalcular sobre el path si el mapa crece.
