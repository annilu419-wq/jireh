# VEREDICTO revisor-visual — lector de capítulo
Fecha: 2026-09-10 14:25
Screenshot: docs/revisiones/lector-375.png
Usabilidad: 27/40
Craft: 12/20
Copy (si vende): N-A
Fidelidad (si hubo referencia): N-A
Veredicto: NO LISTA

## Detalle usabilidad (Nielsen /40)
h1 visibilidad estado: 2 — skeleton y error OK, pero al tocar "Génesis 13" no hay ningún feedback inmediato mientras Next resuelve la navegación (acción >100ms sin indicador); sin aria-live, el lector de pantalla no anuncia carga ni error.
h2 lenguaje del usuario: 3 — copy de UI humano ("No pudimos cargar el capítulo"). Los arcaísmos ("EMPERO", "fuése") son la traducción RV1909, no se penalizan.
h3 control y libertad: 3 — "‹ Génesis" (volver al libro), prev/next de capítulo y tab-bar. Claro.
h4 consistencia: 3 — usa tokens/radios del kit, pero introduce una 2ª familia (serif) que NO está en el sistema y trata prev (neutro) y next (acento) con estilos distintos.
h5 prevención de errores: 3 — capítulo inválido → notFound(); prev/next se ocultan en los límites sin salto de layout.
h6 reconocer vs recordar: 3 — nombre de libro/capítulo, versión y nombres reales de capítulo adyacente visibles.
h7 flexibilidad y eficiencia: 2 — es la PRIMERA pantalla del tipo "lector de texto largo" y no hay control de tamaño de texto (A-/A+), ni navegación por teclado (←/→ entre capítulos), ni recordar posición de lectura. reduced-motion sí respetado.
h8 estético y minimalista: 3 — una sola misión, jerarquía limpia; leve amontonamiento entre la nav de capítulo y la tab-bar al fondo.
h9 errores claros: 3 — qué pasó + qué hacer + Reintentar; genérico (no distingue offline / 404 / servidor).
h10 ayuda contextual: 2 — cero ayuda con el español antiguo de RV1909 (sin glosario, sin nota de por qué suena así más allá del rótulo); sin pista de navegación.

## Detalle craft (/20)
jerarquía: 3 — display "Génesis 12" domina, rótulo y cuerpo se leen; el área de lectura no tiene ningún recurso de jerarquía (sin capitular / sin trato al primer versículo).
profundidad: 2 — el lienzo de lectura es un fill crema plano. La FICHA manda "mesh radial sutil del acento arriba + curvas de nivel muy tenue + grano ≤3%": no hay nada. Solo sombras leves en chips/pill.
identidad: 2 — crema + un azul + una serif genérica = intercambiable con cualquier app de lectura bíblica. Ausente el dispositivo ownable de la ficha (ruta cartográfica / curvas de nivel / eco de la brújula) fuera del logo del TopBar.
movimiento: 2 — la lista entra como bloque único (sin stagger 70ms por versículo); no hay transición entre capítulos (navegación dura); easing usado [0.16,1,0.3,1] ≠ el de la ficha (0.22,1,0.3,1). Tap con active:scale OK. reduced-motion OK.
encaje óptico: 3 — radios por token consistentes, padding px-4 simétrico, números de versículo alineados; prev/next con tratamiento asimétrico.

## GATE DOBLE: FALLA (usabilidad 27 < 36 · craft 12 < 16)

## TOP DEFECTOS (ordenados por impacto)
1. [fondo del lector] SEVERIDAD ALTA — fondo plano; la FICHA-ARTE manda textura cartográfica tenue (mesh radial del acento + curvas de nivel + grano ≤3%) y no aparece → aplicar el fondo con profundidad del brand kit al contenedor del lector.
2. [cuerpo de versículos] SEVERIDAD ALTA — el texto usa --font-serif, y la FICHA fija "Body: Sora — UNA sola familia" reservando la serif SOLO a tarjetas de compartir ("es contexto de cita impresa, no UI") → volver el cuerpo a Sora 400 con medida ~40ch e interlínea 1.7, o hacer que el usuario amplíe la ficha ANTES de meter una 2ª familia.
3. [preferencias de lectura] SEVERIDAD MEDIA-ALTA — plantilla nueva de "lector largo" sin control de tamaño de texto ni memoria de posición → añadir selector A-/A+ persistente en localStorage y navegación por teclado ←/→.
4. [nav de capítulo] SEVERIDAD MEDIA — botones ‹ Génesis 11 / Génesis 13 › a ~36px de alto (px-3 py-2 text-sm), bajo el mínimo táctil de 44px → subir a min-h-[48px] y darles ancho cómodo del pulgar en mobile.
5. [movimiento] SEVERIDAD MEDIA — sin stagger por versículo, sin transición entre capítulos, sin feedback de carga al tocar prev/next → stagger 70ms por li + View Transition al cambiar de capítulo + estado pendiente en el tap; usar el easing de la ficha.

## Correcciones para volver a pasar el gate
- Resueltos 1, 2 y 5 sube craft a ~16-17 (profundidad 3, identidad 3, movimiento 3).
- Resueltos 3 y 4 más aria-live en los cambios de estado (cargando/ok/error) sube usabilidad a ~34-36 (h1→3, h7→3, h4→3).
- Re-render a 375px y nueva pasada del revisor tras los cambios.
