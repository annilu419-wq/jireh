# VEREDICTO revisor-visual — lector de capítulo
Fecha: 2026-09-10 17:40
Screenshot: docs/revisiones/lector-375.png
Usabilidad: 28/40
Craft: 14/20
Copy (si vende): N-A
Fidelidad (si hubo referencia): N-A
Veredicto: NO LISTA

## Detalle usabilidad (Nielsen /40)
h1 visibilidad del estado: 2 — skeleton de carga y estado de error con Reintentar OK. Pero al tocar "Génesis 13 ›" / "‹ Génesis 11" no hay indicador mientras Next resuelve la ruta + fetch del JSON (300 ms-1 s sin feedback salvo el whileTap); y ningún cambio de estado (cargando/ok/error) lleva aria-live/role, el lector de pantalla queda mudo. La condición "más aria-live" de R1 quedó SIN aplicar.
h2 lenguaje del usuario: 3 — copy de UI humano; los arcaísmos son la traducción RV1909, no se penalizan.
h3 control y libertad: 3 — volver al libro, prev/next de capítulo, tab-bar y ahora teclas ←/→ (verificado en código, líneas 97-107).
h4 consistencia: 3 — resuelto el desvío de la 2ª familia: el cuerpo volvió a Sora, una sola familia, tokens/radios del kit. Persiste el trato asimétrico prev (neutro, shadow-1) vs next (acento, shadow-card) sin jerarquía declarada y el pill A−/A+ con glifos de distinto tamaño.
h5 prevención de errores: 3 — capítulo inválido → notFound(); prev/next se ocultan en los límites con placeholder (sin salto de layout); A−/A+ deshabilitados en los topes con color claro.
h6 reconocer vs recordar: 3 — libro, capítulo, versión y nombres reales de los capítulos adyacentes visibles.
h7 flexibilidad y eficiencia: 3 — ahora hay A−/A+ (4 tamaños, persistido en localStorage), teclas ←/→ y memoria de posición de lectura por capítulo (verificado en código). Falta gesto de swipe en mobile (las teclas no ayudan a quien solo usa el pulgar) y salto directo a versículo.
h8 estético y minimalista: 3 — una sola misión, jerarquía limpia, tarjeta con aire; leve cercanía entre la nav de capítulo y la tab-bar.
h9 errores claros: 3 — qué pasó + qué hacer + Reintentar; sigue genérico (no distingue offline / 404 / servidor).
h10 ayuda contextual: 2 — cero apoyo con el español de RV1909 ("EMPERO", "fuése", "Jehová") en una app devocional para público general; sin nota de "por qué suena así", sin glosario, y sin pista de una vez de que existen A−/A+ o ←/→.

## Detalle craft (/20)
jerarquía: 3 — display "Génesis 12" domina → rótulo "REINA-VALERA 1909" → cuerpo 17px → número de versículo; 3 tamaños, se lee al entrecerrar. El lienzo de lectura no usa ningún recurso de jerarquía propio (sin trato al primer versículo), pero es opcional.
profundidad: 3 — resuelto lo plano: tarjeta --surface con --shadow-card sobre base texturada + resplandor cálido (amanecer) arriba. Falta el tercer nivel (hundido) y el grano; queda en 3, no 4.
identidad: 2 — la textura cartográfica (MAPA_APP, stroke-opacity 0.18-0.22 sobre crema) es imperceptible en el render: no aporta identidad visible. Con el logo tapado, la pantalla es un lector bíblico genérico (crema + un azul + card blanca). El dispositivo ownable de la ficha (ruta / curvas de nivel / eco de la brújula) no está presente en el propio lienzo.
movimiento: 3 — stagger por versículo (delay min(i*0.02, 0.5)), easing corregido al de la ficha [0.22,1,0.3,1], whileTap scale 0.97 en prev/next, reduced-motion respetado (initial:false). La transición entre capítulos depende de app/app/template.tsx (no verificable en este paquete): si no aplica una View Transition al cambiar de ruta, la navegación se siente dura.
encaje óptico: 3 — radios por token consistentes, padding px-4 simétrico, números de versículo alineados (align-[0.35em] tabular-nums). Desequilibrios menores: el pill A−/A+ usa 13px vs 15px por celda; prev/next con sombras distintas.

## GATE DOBLE: FALLA (usabilidad 28 < 36 · craft 14 < 16)

## Qué elemento y qué ajuste puntual falta (para pasar el gate)

1. [textura de fondo / márgenes del lector] La capa cartográfica está pero NO SE VE. Ajuste: subir stroke-opacity de las curvas de nivel a ~0.5-0.7 en la banda superior y desvanecer hacia abajo (mask lineal), para que lea como profundidad Y como dispositivo ownable en los márgenes de la tarjeta. Esto sube identidad 2→3 y afianza profundidad.

2. [identidad — dentro del lienzo] Añadir un eco VISIBLE del dispositivo ownable en el encabezado: un hairline curvo (sendero) de 1-2px en ámbar o azul junto a "Génesis 12", o un pin/estación mínimo. Con eso la pantalla deja de ser intercambiable con cualquier lector bíblico. identidad → 3.

3. [h1 — estado del sistema] Dos ajustes puntuales: (a) estado pendiente en "‹ Génesis 11" / "Génesis 13 ›" al hacer tap (opacidad + spinner inline de 13px) hasta que arranca la navegación; (b) `role="status" aria-live="polite"` en el contenedor de estado del lector y `role="alert"` en el bloque de error. h1 → 3.

4. [h10 — ayuda contextual] Nota breve plegable "¿Por qué suena así?" bajo el rótulo "Reina-Valera 1909" (1-2 frases: traducción de 1909, dominio público) + hint de una sola vez sobre A−/A+ y ←/→. h10 → 3.

5. [encaje / consistencia h4] Igualar el glifo del pill A−/A+ a un solo tamaño (14px, diferenciar solo por el signo) y unificar la sombra de los dos botones de capítulo (misma --shadow-1), dejando el acento solo en texto/borde de "siguiente". h4 → 4, encaje se afianza.

## Proyección
- Aplicados 1, 2 y verificada la transición de ruta de template.tsx: craft sube a ~17 (profundidad 3, identidad 3, movimiento 3, jerarquía 3, encaje 3-4).
- Aplicados 3, 4 y 5: usabilidad sube a ~35-37 (h1→3, h10→3, h4→4).
- Re-render a 375px y nueva pasada del revisor tras los cambios.
