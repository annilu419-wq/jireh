# VEREDICTO revisor-visual — Hoy
Fecha: 2026-09-10 17:20
Screenshot: docs/revisiones/hoy-375.png
Usabilidad: 36/40
Craft: 15/20
Copy (si vende): N-A
Fidelidad (si hubo referencia): N-A
Veredicto: NO LISTA

Top defectos:
1. [Escena de contexto, sobre el pliegue] La ilustración en código lee sparse y desbalanceada:
   rosa de los vientos recortada en la esquina superior derecha, un círculo suelto flotando al
   centro-derecha, "X" diminuta abajo, curvas de nivel casi invisibles. Es el elemento ownable
   visible al entrar y parece placeholder → componer la viñeta sobre una grilla, anclar los
   elementos, subir contraste de las líneas y hacer legible la silueta "familia saliendo hacia
   tierra desconocida".
2. [Fondo de toda la pantalla] El mesh radial del acento + las curvas de nivel (FICHA-ARTE:
   "mesh radial sutil + curvas de nivel") siguen casi imperceptibles a 375px en el cuerpo; se ve
   crema plano salvo un tinte tenue arriba → subir opacidad hasta que se perciban 3 planos sin
   mirar con lupa.
3. [TopBar · racha] El conteo animado se aplicó al "% de la Ruta" pero NO a la racha; el número
   que el usuario ve cada día sigue estático. La corrección pedía ambos → añadir count-up a la
   racha (baseline de movimiento #2).
4. [Sistema de rótulos] Aún no unificado del todo: "La línea de la promesa" (ámbar, tracking
   0.12em) y el eyebrow de la enseñanza revelada (13px, tracking-wide, acento) difieren del
   componente Rotulo canónico (11px, 0.14em, text-tertiary, hairline) → unificar los tres bajo
   el mismo componente.
5. [Nodo "Vas por aquí" en LineaPromesa] Anillo que pulsa con repeat:Infinity = ruido de fondo
   permanente en la vista → limitar a 2-3 pulsos y detener, o eliminar.

---

## Detalle de puntuación

USABILIDAD: 36/40  (h1:4 h2:4 h3:4 h4:3 h5:4 h6:3 h7:3 h8:3 h9:4 h10:4)
CRAFT:      15/20  (jerarquía:3 profundidad:3 identidad:3 movimiento:3 encaje:3)
COPY:       N/A (pantalla interna, no vende)
FIDELIDAD:  N/A (FICHA-ARTE declara sin referencia del usuario)

GATE DOBLE: usabilidad 36 ≥ 36 PASA · craft 15 < 16 NO PASA → NO LISTA por 1 punto de craft.

### Qué SÍ quedó resuelto (contra las 7 correcciones)
1. Densidad: 5 bloques antes del CTA (título · gancho · chips · escena · CTA); todo el contexto
   profundo colapsado tras un toggle. Verificado en screenshot y en ContextoFicha.tsx. El CTA ya
   no queda enterrado. → h7 2→3, h8 2→3.
2. Eyebrow "CONTEXTO PARA HOY" sin promesa de tiempo falsa. → h2 3→4.
3. Rótulos de sección de la ficha (Qué pasa aquí / En el mapa / Para hoy): 11px, bold, 0.14em,
   text-tertiary. Unificados dentro de la ficha (queda pendiente alinear LineaPromesa y la
   enseñanza revelada — defecto 4).
4. "Para hoy" devuelto a neutro (surface-2, sin ámbar). Ámbar ahora solo en racha, hito
   (LineaPromesa "Vas por aquí"), celebración y la tarjeta de versículo "Para ti hoy" (excepción
   ya aprobada). Coherente con FICHA-ARTE. → defecto de ámbar resuelto.
5. Estado de error visible: banner "No pudimos cargar tu avance" + explicación + "Reintentar";
   "Marcar mi día como completo" se deshabilita con la línea "Disponible cuando recuperemos tu
   avance"; marcarCompleto hace early-return si estado !== 'ok'. Verificado en hoy/page.tsx. →
   h9 2→4, h5 3→4, h1 3→4.
6. Conteo animado en "% de la Ruta" (Contador, rAF ease-out 700ms). Curvas de nivel subidas
   (parcial: el efecto sigue sin leerse — defecto 2). Falta el count-up de la racha (defecto 3).
7. "José de Nazaret · esposo de María, el carpintero" — desambiguado. Verificado.

### Por qué craft se queda en 15
- Jerarquía (3): H1 "Génesis 12" domina bien y la escala está disciplinada, pero conviven 4
  familias de micro-rótulos en mayúsculas (eyebrow acento, "ANTES DE LEER" acento, AUTOR/ÉPOCA/
  LUGAR tertiary, "PARA TI HOY" ámbar) que aplanan levemente la lectura al entrecerrar los ojos.
- Profundidad (3): base/elevado/hundido presente (sombras + inset), pero el fondo cartográfico
  (mesh + curvas) sigue casi invisible; no se leen 3 planos sin lupa (defecto 2).
- Identidad (3): la Ruta cartográfica, el sendero SVG que se dibuja y la timeline "Vas por aquí"
  son ownables y no clonables — pero en la vista colapsada (lo que el usuario ve al entrar) el
  único dispositivo visible es la escena, y lee débil/placeholder (defecto 1). El resto es pila
  de tarjetas de texto.
- Movimiento (3, mitad código): stagger de entrada, path pathLength 0→progreso, whileTap 0.97,
  Contador en "% Ruta", AnimatePresence del toggle, spring + Destellos al completar,
  prefers-reduced-motion en todo. Falta el conteo del número héroe visible cada día (racha,
  defecto 3) y el anillo pulsante infinito del nodo "Vas por aquí" es ruido (defecto 5).
- Encaje (3): radios por token consistentes, padding de "Antes de leer" ya simétrico (px-3.5
  py-3), CTA 52px full-width, chips alineados. Baja: la composición interna de la escena está
  desencajada a simple vista (rosa de los vientos recortada en la esquina, círculo suelto) y el
  -mx-2 de la banda "Vas por aquí" queda algo flotante.

### CTA héroe — vivo (cumple los 4)
- Contraste: #2F6D8C sobre crema, texto --bg → ≥3:1. OK.
- Tap: whileTap scale 0.97. OK.
- Nunca disabled por defecto: el CTA de la ficha siempre habilitado; el "Marcar día" solo se
  deshabilita en estado de error, con hint. OK.
- Área: h-[52px] · w-full. OK.

### Lista corta para volver a LISTA (solo craft — usabilidad ya pasa)
1. Recomponer la escena de contexto: grilla, anclajes, contraste de líneas, silueta legible.
2. Subir el mesh radial + curvas de nivel del fondo hasta que se perciban 3 planos sin lupa.
3. Conteo animado también en la racha del TopBar.
4. Unificar LineaPromesa (figcaption ámbar 0.12em) y el eyebrow de la enseñanza revelada (13px
   tracking-wide) bajo el mismo componente Rotulo.
5. Anillo del nodo "Vas por aquí": finito (2-3 pulsos), no repeat:Infinity.
