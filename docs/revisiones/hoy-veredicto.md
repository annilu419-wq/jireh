# VEREDICTO revisor-visual — Hoy
Fecha: 2026-09-01 00:00
Screenshot: docs/revisiones/hoy-375.png
Usabilidad: 36/40
Craft: 18/20
Copy (si vende): N-A
Fidelidad (si hubo referencia): N-A
Veredicto: LISTA

Detalle usabilidad: h1:4 h2:4 h3:4 h4:4 h5:3 h6:4 h7:3 h8:4 h9:3 h10:3
Detalle craft: jerarquia:3 profundidad:4 identidad:3 movimiento:4 encaje:4

Gate doble: USABILIDAD 36/40 (>= 36) OK · CRAFT 18/20 (>= 16) OK. SIGUE LISTA.
Historial: R1 27/13 -> R2 33/15 -> R3 35/16 -> R4 36/17 -> R5 36/18 (pase de
profundidad) -> R6 36/18 (destellos al completar el día). Sin cambio de puntaje.

## Delta R6 — destellos de estrella al "Marcar mi día como completo"

¿Sigue LISTA? SÍ. Puntaje sin cambio (36/40 · 18/20).

FOCO — ¿el burst ámbar empuja demasiado ámbar a la vez, o sigue siendo susurro?
SIGUE SIENDO SUSURRO. Razones:
- Es TRANSITORIO: 1.8 s, una sola vez, sobre un hito REAL (la persona terminó su día).
  El 60-30-10 gobierna la composición en reposo, no un momento de celebración.
- El footprint de ámbar EN REPOSO no cambia: check pequeño + rótulo "completado" (texto
  chico ámbar oscuro) + chip de racha + borde 18% de la tarjeta de versículo — el mismo
  conjunto que ya se aprobó como "dentro de 60-30-10" en R5.
- El burst es ámbar-ONLY (sin arcoíris), contenido al bloque "completado", 10 estrellitas
  pequeñas con drop-shadow tenue. NO es paint-splash/confeti (lo que FICHA-ARTE veta).
- FICHA-ARTE prescribe exactamente este tratamiento para "capítulo completado / racha
  lograda": bloom + rayos ámbar escasos. El burst está DENTRO del contrato, no lo estira.
- reduced-motion lo desactiva; `deshacer` lo cancela; el hook de captura `?celebra`
  queda muerto en prod (`process.env.NODE_ENV`).

Reutilización correcta: `Destellos` extraído a `components/app/Destellos.tsx` y compartido
por Diario ("¡Respondida!") y Hoy ("día completo") — mismo token, mismo timing, misma regla
ámbar. Refuerza consistencia entre pantallas. Diario sin cambio de comportamiento.

tsc ✓ · build prod ✓ (reportado).

## Notas menores del delta (NO bloquean)
- Durante los ~1.8 s, 2-3 estrellitas pasan por encima de "Deshacer" y del texto del chip
  de racha: parpadeo de legibilidad transitorio (el tap NO se bloquea — `pointer-events-none`).
- 1-2 destellos rozan el borde interno de la tarjeta (mismo detalle que en el Diario).
- El burst flota sobre un bloque casi estático; en el Diario acompañaba un wash + check con
  spring. Considerar anclar un micro check-draw / pop del rótulo para que el burst acompañe
  un cambio de estado y no solo aparezca encima.

--------------------------------------------------------------------------------
## (R5) Foco previo — pase de profundidad

1. Profundidad elegante/calma sin romper "un objeto principal": SÍ. Contraste
   elevado/hundido con semántica clara (contenido actual sube; ambiental/recibido se
   asienta). Sombras en capas, sin bordes duros. Sigue siendo una narrativa vertical:
   el título "Marcos 4" lidera, UNA acción a la vez, el CTA se colapsa tras cumplir.
2. "Para ti hoy" con wash ámbar vs acción azul: respeta la ley de color. Es el
   tratamiento de TARJETA DE VERSÍCULO que FICHA-ARTE define (filete dorado-ámbar a baja
   opacidad). Wash 4% + borde 18% + inset: peso mínimo, va debajo del CTA, sin afordancia
   interactiva. El botón azul relleno es "la acción". Registros separados. No compiten.

Cambios R5 verificados: vignette con `--shadow-card` + hairline; rótulos de sección
uppercase + hairline degradé (mismo sistema que el Diario); tira de la Ruta hundida;
bloque de enseñanza con `--shadow-card` + hairline; "Marcar día completo" -> superficie
tangible; "Para ti hoy" -> tarjeta de versículo (serif token + wash/borde ámbar + inset).

## Verificaciones clave OK (sin regresión)
- Contrato FICHA-ARTE: modo claro, crema, azul SOLO en acción/nav activa/Ruta, ámbar SOLO
  en racha/hito + tarjeta de versículo (sancionada), Sora, radios del kit, 3 niveles de
  profundidad, serif SOLO en la tarjeta de versículo. Sin desvíos.
- Léxico vetado: "ritual" NO aparece.
- Loop cerrado: gatillo (racha) -> acción (Ver la enseñanza) -> recompensa (viñetas +
  "Para ti hoy" + eco de racha con pop + destellos) -> inversión (Marcar completo ->
  racha 3->4, reversible con Deshacer).
- Movimiento: 7 baseline presentes; `prefers-reduced-motion` cubierto en todos los
  componentes (incluidos los destellos).
- BottomNav: activo con acento + fondo sutil distinto, fila >=44px, safe-area; contenido
  no tapado por la nav (min-h-dvh + padding inferior).

## Pendientes NO bloqueantes (seguimiento, no reabren el gate)
1. Reproductor de audio real ("audio pronto" es honesto); construirlo sube h7 a 4.
2. app/app/error.tsx: boundary único genérico; diferenciar sin-conexión de error real
   con las llamadas async de la Sesión 6 y conservar el punto del loop al reintentar.
3. EscenasContexto.tsx: solo la vignette 'agua' afinada al frame de 132; re-afinar
   monte/camino/ciudad/desierto/casa antes de que un capítulo del lote las use.
4. CTA primario "Ver la enseñanza de hoy" bajo el pliegue en la carga inicial: coherente
   con "30 segundos de contexto ANTES de leer", pero vigilar en pruebas de usuario.
