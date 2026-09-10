# VEREDICTO revisor-visual — Hoy
Fecha: 2026-09-10 14:30
Screenshot: docs/revisiones/hoy-375.png
Usabilidad: 29/40
Craft: 15/20
Copy (si vende): N-A
Fidelidad (si hubo referencia): N-A
Veredicto: NO LISTA

Top defectos:
1. [Toda la pantalla / longitud] La Ficha de Contexto creció a ~13 bloques y empuja el CTA "Ver la enseñanza de hoy" ~4 alturas de pantalla hacia abajo; el eyebrow promete "CONTEXTO · 30 SEGUNDOS" pero leer todo toma 90s+ → recortar a máx 5 bloques antes del CTA: fusionar "Antes de leer" con el 1er párrafo de "Qué pasa aquí", colapsar "En el mapa" + "La línea de la promesa" tras un toggle, y quitar o cumplir el "30 segundos".
2. [Eficiencia usuario diario] Quien vuelve cada día debe re-scrollear toda la ficha para llegar al CTA; no hay atajo ni memoria de lectura → CTA primario arriba (bajo el gancho) o botón/anchor sticky "Ver la enseñanza" al entrar; la ficha queda como material de apoyo desplegable.
3. [Sistema de labels de sección] Los ~8 rótulos en mayúsculas mezclan color (azul/gris/ámbar), peso (semibold/bold), tracking (0.1em/0.12em/wide) y tamaño (11/12px); el hairline aparece solo bajo algunos → un único componente de label (mismo tamaño/peso/tracking, color por familia semántica) y hairline consistente.
4. [Uso de ámbar fuera de FICHA-ARTE] FICHA-ARTE limita el ámbar a "racha, hitos, celebración", pero "Para hoy" (pregunta reflexiva) y "Para ti hoy" lo usan como acento decorativo → devolver "Para hoy" a neutro o superficie hundida sin acento; reservar ámbar a racha/hito/celebración.
5. [Manejo de errores] `getResumenHoy`/`getRuta` hacen `.catch(() => {})`: si fallan, el usuario ve en silencio el capítulo por defecto (capítulo/racha posiblemente equivocados) sin aviso ni reintento → estado "No pudimos cargar tu avance · Reintentar" y bloquear "marcar día" con datos sin confirmar.

---

## Detalle de puntuación

USABILIDAD: 29/40  (h1:3 h2:3 h3:4 h4:3 h5:3 h6:3 h7:2 h8:2 h9:2 h10:4)
CRAFT:      15/20  (jerarquía:3 profundidad:3 identidad:3 movimiento:3 encaje:3)
COPY:       N/A (pantalla interna, no vende)
FIDELIDAD:  N/A (FICHA-ARTE declara sin referencia del usuario)

GATE DOBLE: FALLA ambos umbrales (usabilidad 29 < 36 · craft 15 < 16). La pantalla estaba LISTA
en la revisión anterior (36/40 · 17/20); el enriquecimiento de la Ficha de Contexto introdujo
deuda de densidad y de consistencia. NO LISTA.

### Usabilidad — notas por criterio
- h1 (3): render inmediato con datos por defecto, tap con feedback, celebración + racha +1 al
  completar; sin skeleton pero no hace falta (carga local). El `?celebra` es solo dev.
- h2 (3): español LATAM cálido, sin jerga, "ritual" no aparece en UI. Baja: "CONTEXTO · 30
  SEGUNDOS" es una promesa falsa — el contenido real es 90s+ de lectura.
- h3 (4, verificado en código): "Deshacer" revierte racha Y posición de la Ruta; marcar el día es
  acción aparte y reversible. Nav inferior siempre visible.
- h4 (3): dos estilos de CTA (relleno vs contorno) con lógica de jerarquía OK, pero el sistema de
  labels de sección es un patchwork (color/peso/tracking/tamaño distintos) y el hairline es
  intermitente.
- h5 (3): CTA siempre habilitado; el botón se reemplaza al completar (sin doble disparo). Pocas
  superficies de error.
- h6 (3): todo visible, cero memoria; la timeline muestra dónde vas. Baja: tras revelar, el CTA se
  reduce a un "↓ abajo" que obliga a scrollear para encontrar la enseñanza.
- h7 (2, verificado en código): buen default (carga el capítulo de hoy), pero CERO ruta rápida —
  el usuario diario re-scrollea toda la ficha cada día; no hay atajo ni "ir a la enseñanza".
- h8 (2): ~13 bloques alrededor de una sola acción; "Antes de leer" + "Para hoy" + "Para ti hoy"
  son tres momentos reflexivos que se solapan; varios bloques de cuerpo superan 3-4 líneas. La
  longitud se percibe de inmediato. Minimalismo violado.
- h9 (2): errores de fetch tragados en silencio; sin estado de error ni reintento en la pantalla
  principal que sincroniza racha y Ruta.
- h10 (4): la pantalla enseña de verdad — gancho, "En el mapa", timeline del arco, caption de la
  escena. Cero pantalla muda.

### Craft — notas por eje
- Jerarquía (3): H1 "Génesis 12" domina bien y la escala de tamaños está disciplinada, pero ~8
  eyebrows en mayúsculas de 3 colores distintos y una columna de tarjetas de peso visual similar
  aplanan la lectura al entrecerrar los ojos.
- Profundidad (3): sistema base/elevado/hundido presente (escena con sombra, "En el mapa" y
  "línea de la promesa" con inset), pero el contraste hundido es apenas perceptible y el fondo no
  muestra el mesh radial + curvas de nivel que pide FICHA-ARTE (se ve crema plano).
- Identidad (3): el dispositivo ownable (ruta cartográfica, camino SVG que se dibuja, timeline
  "Vas por aquí", rosa de los vientos) es real y distintivo — pero la escena beige queda casi
  ilegible y buena parte de la pantalla es una pila de tarjetas de texto que podría ser cualquier
  app de lectura. Duda entre 3 y 4 → baja a 3.
- Movimiento (3, mitad código): stagger de entrada (useReveal), path con pathLength 0→progreso,
  whileTap 0.97, reveal con opacity/y, Destellos + spring al completar, prefers-reduced-motion en
  todo. Falta el conteo animado del número héroe ("3% de la Ruta" y la racha son estáticos); el
  anillo pulsante infinito del nodo "Vas por aquí" es un detalle al borde del ruido.
- Encaje (3): radios por token consistentes, CTA 52px full-width. Baja: padding asimétrico en
  "Antes de leer" (pl-3.5 pr-3), la banda ámbar del nodo "Vas por aquí" (-mx-2) queda algo suelta,
  chips con altura desigual por wrap a 2 líneas.

### CTA héroe — vivo (cumple los 4)
- Contraste: #2F6D8C sobre crema, texto blanco → ≥3:1. OK.
- Tap: whileTap scale 0.97. OK.
- Nunca disabled: siempre habilitado. OK.
- Área: h-[52px] · w-full. OK.
- Observación: el CTA está VIVO pero ENTERRADO (ver defecto #1/#2) — problema de encaje/estética,
  no de estado del botón.

### Correcciones para volver a LISTA (recheck tras aplicarlas)
1. Reducir la ficha a máx 5 bloques antes del CTA; colapsar "En el mapa" + "La línea de la
   promesa" tras un toggle; el CTA primario visible sin scroll largo (o sticky).
2. Quitar o cumplir literalmente el eyebrow "30 SEGUNDOS".
3. Unificar el componente de label de sección (tamaño/peso/tracking/color) y el hairline.
4. Devolver el ámbar a racha/hito/celebración; "Para hoy" a neutro.
5. Estados de error visibles para getResumenHoy/getRuta con reintento.
6. Añadir conteo animado al "% de la Ruta" y a la racha; añadir mesh + curvas de nivel al fondo.
7. Desambiguar "José · el carpintero de Nazaret" del José de Génesis (p. ej. "José de Nazaret ·
   esposo de María").
