# VEREDICTO revisor-visual — onboarding (funnel: P1 dolor · P4 slider q_dias)
Fecha: 2026-08-29 21:30
Screenshot: docs/revisiones/onboarding-375.png
Usabilidad: 37/40
Craft: 18/20
Copy: 16/20
Fidelidad (si hubo referencia): N-A
Veredicto: LISTA

---

VEREDICTO: LISTA
USABILIDAD: 37/40  (detalle: h1:4 h2:4 h3:4 h4:4 h5:4 h6:3 h7:3 h8:4 h9:3 h10:4)
CRAFT:      18/20  (detalle: jerarquía:4 profundidad:3 identidad:4 movimiento:4 encaje:3)
COPY:       16/20  (detalle: idea:3 especificidad:3 emoción:4 oferta:3 acción:3)
FIDELIDAD:  N/A (sin referencia del usuario — FICHA-ARTE lo confirma)

Evolución: 30/14/15 → 34/15/16 → 35/17/16 → 37/18/16.
Gate doble: PASA usabilidad (37 ≥ 36), PASA craft (18 ≥ 16), PASA copy (16, ningún eje ≤2).
La pantalla queda LISTA. Los defectos que restan son PULIDO, no bloquean.

---

## VERIFICACIÓN DE LAS 3 CORRECCIONES DE ESTA RONDA — todas OK

1. q_dias: `Compromiso` centra número+slider+feedback con `flex-1 justify-center` (se cerró el
   ~35% de crema muerta) y acepta `footer`; q_dias le pasa la `RutaBand` de pie → deja de ser la
   variante accidental sin banda. Verificado en código y en ob-slider.png. ✓
   → h8 (3 → 4) y h4 (3 → 4); craft identidad (3 → 4).
2. Chip "Sugerida": la píldora salió del span del label, ahora es elemento propio `shrink-0`
   alineado a la derecha antes del check, con guarda `!activo`. Ya no baja a 2ª línea. (código) ✓
3. `--shadow-chip` → `0 6px 18px -6px /0.26`: los chips flotan claramente sobre el fondo en P1;
   marca de agua + mesh +8pts respecto a la ronda anterior. ✓

Sin regresiones: P1 sigue limpia; el layout del slider queda balanceado (contenido centrado,
banda + CTA anclados); el badge se oculta al seleccionar.

---

## TOP DEFECTOS (pulido — NO bloquean el gate, backlog priorizado)

1. [q_dias / slider] Ritmo vertical algo desparejo: el `justify-center` deja más aire entre la
   pregunta y el bloque centrado (número+slider+feedback) que entre el feedback y la banda; el
   hueco superior se ve mayor de lo que parece deliberado.
   → Fix menor: acotar el crecimiento del espaciador superior (padding-top calculado o
   `max-height` al hueco) para repartir el aire parejo arriba/abajo del bloque.

2. [profundidad — todas las pantallas] La marca de agua cartográfica + mesh siguen muy tenues a
   375px; el nivel "base con tinte/gradiente sutil" casi no trabaja y la profundidad la carga casi
   solo la sombra del chip. Los 3 niveles existen, pero la base es casi plana. (mantiene Eje 2 en 3)
   → Fix: subir la marca de agua otros ~4-6pts o un mesh radial algo más presente detrás del héroe.

3. [q_dias] El "5" de 44px es un 4º tamaño de texto en esa vista (44 / 26 / 15 / 14). Aceptable
   como dato-héroe (no bloquea), pero rompe el rigor de "3 tamaños por pantalla" de FICHA-ARTE.
   → Fix opcional: bajar la pregunta a ~22px/peso menor SOLO en el paso del slider, o el número a 40px.

4. [copy — eje oferta en 3] En las pantallas de pregunta la oferta se insinúa (trial + cancelación
   por correo) pero el precio/ancla vive solo en el paywall — correcto para el funnel. Si se
   quiere subir el eje, una micro-línea con el ancla ("desde $2.49/mes") en un paso intermedio.
   (opcional)

5. [h6 / h7 en 3] Sin atajos para el experto más allá del auto-avance; `recomendada` solo marca 1
   opción. Sin impacto de gate — mejora futura.

## LO QUE QUEDÓ SÓLIDO (no tocar)

- Copy de dolor (h2:4 · emoción:4): titular "sola" + las 4 opciones trazan casi literales a los
  dolores #1/#2/#3/#5 de FICHA-AVATAR; la palabra vetada "ritual" no aparece.
- Control y libertad (h3:4): "✕ Salir" explícito en P1 + "Atrás" en cada paso posterior.
- Prevención de error (h5:4): selección única, guarda anti doble-disparo, ventana de 520ms.
- Consistencia (h4:4): los 6 pasos de pregunta muestran la banda "Tu Ruta se va armando" de pie;
  "Sugerida" con posición fija; radios 12px unificados; tokens de sombra consistentes.
- Estado del sistema (h1:4): barra de progreso persistente y animada, check visible antes de la
  transición, conteo 0→v en el slider con freeze-on-touch, sendero que se dibuja, whileTap.
- Ayuda contextual (h10:4): hint + tira de reaseguro con ShieldCheck trazada a la objeción #5 +
  narrativa de progreso + feedback validante del slider; ninguna pantalla muda.
- Composición (h8:4): una decisión por pantalla, contenido centrado o anclado, cero vacío muerto.
- Movimiento (craft Eje 4:4): baseline completa (stagger, conteo de héroe, dibujado del sendero,
  tap <150ms, transición de pasos, `prefers-reduced-motion`).
- Jerarquía (craft Eje 1:4): 3 tamaños en las pantallas de pregunta, 4 niveles legibles al
  entrecerrar los ojos, acento solo en la palabra clave y la acción.
- Identidad (craft Eje 3:4): banda-mapa en todos los pasos + marca de agua cartográfica + eco del
  logo brújula; no coincide con ninguna paleta canónica vetada; kit no intercambiable.
