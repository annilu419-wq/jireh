# FICHA DE DIRECCIÓN DE ARTE — Jireh (Biblia & Devocional)

## Referencia del usuario (CONTRATO)
- ¿Hay imagen(es) de referencia del usuario?: NO. El usuario no dio imagen ni nombró una app como referencia-mandato.
- Prohibiciones anti-IA que la referencia LEVANTA: ninguna (no hubo referencia) — la capa anti-IA aplica íntegra.

## Identidad derivada (FUSIÓN de líderes — 16 PASO 0.2bis — + protocolo A/B/C del 54)
- TABLA DE LÍDERES (qué tomé de cada una):
  - BibleProject / Proyecto Biblia → lógica de color clara y cálida + ilustración de contexto por capas (autor/época/lugar). Es la referencia de la "capa visual explicada".
  - Headspace / Calm → UNA sola familia tipográfica geométrica cálida; degradé tonal; onboarding sereno.
  - Duolingo → la RUTA con estaciones como columna vertebral + racha amable + progreso visible como logro.
  - Hallow / Glorify → modelo de negocio (trial + anual), celebraciones suaves, onboarding emocional B2C.
  - YouVersion → navegación de libros / plan de lectura; qué EVITAR: texto plano sin didáctica y UI recargada.
- FUSIÓN: color claro+cálido e ilustración de contexto (BibleProject) · una sola sans geométrica (Headspace) · ruta+estaciones+racha (Duolingo) · funnel trial/anual (Hallow/Glorify).
- Combinación tipográfica probada usada: fila "Bienestar / meditación" del 29 ("geométrica cálida, UNA familia") → **Sora**. Validada contra líderes: SÍ (Headspace/Calm usan una geométrica cálida única).
- Arquetipo: Sabio (enseña / guía) con un toque de Cuidador (calma, sin culpa). Mundo del sujeto (0.45): cartografía y expedición — mapa, ruta, estaciones, brújula, curvas de nivel, amanecer/luz de la mañana, el "kilómetro cero" de la historia bíblica.
- Dirección elegida por el PROTOCOLO A/B/C: **Opción B — "Amanecer y ruta clara"** (el usuario eligió B el 2026-08-28). Dispositivo ownable NO del banco 54: propio → la RUTA CRONOLÓGICA ilustrada (sendero curvo con estaciones + pines + curvas de nivel de fondo, estética de mapa de expedición). Paleta tomada de la lógica de color de BibleProject (claro, cálido, plano), sin desafinar.

## Personalidad compilada (COMPILADOR DE PERSONALIDAD — 11)
- 3 adjetivos: **Cálido (dominante) · Claro · Alentador**
- Compilación: spring bounce ~0.15 / stiffness ~250 · duración base 280ms · exclamaciones máx 1/pantalla
- Celebración N1: check suave con el nombre ("Bien, María") · N2: banner cálido con luz, poco o cero confetti · N3: hito de ruta iluminándose + share card con la infografía
- Celebración de FIN DEL DÍA / racha lograda (pedida por el usuario 2026-08-31, "elegante y premium"): el LOGO (brújula) al centro con spring suave + bloom de luz cálida ámbar detrás + 1-2 anillos hairline que se expanden y desvanecen + rayos finos escasos (ámbar, 1 de cada 5 azul) + pocas chispas ámbar → luego sube "Listo por hoy" + el capítulo + el chip de racha. NUNCA confeti multicolor tipo paint-splash (la referencia del usuario `docs/assets/ref-celebracion-splash.json` es SOLO de energía/timing, no de estilo). Concepto navegable: `docs/revisiones/demo-celebracion.html`. Se construye en la Sesión 5 (archivo 56) con `motion` o Lottie propio.
- radius tendencial: 16-20px · color emocional: acento cálido (azul cielo) + 2ª nota ámbar SOLO en celebración
- Arquetipo de voz: **mentor sereno** (guía que acompaña, nunca regaña — coherente con "retoma sin culpa")

## Brand kit final (los valores que viven en globals.css / @theme)
- Fondo base: #FBF6EC (crema cálida) · Superficie/elevado: #FFFDF8 (blanco cálido, NUNCA #FFF) · Hundido/secundario: #F3EDDF
- Texto 1º: #221E17 · Texto 2º: #7E7565
- Acento (marca): #2F6D8C (azul cielo / amanecer) — SOLO en: acción primaria (CTA, botones), el elemento activo de navegación, y "La Ruta/guía". Variante clara para degradés de botón: #4E93B2
- 2ª nota: #C98A0E (ámbar) — SOLO en: racha, hitos, celebración. Porqué: separa "avanzar/logro" (ámbar) de "actuar/navegar" (azul).
- Semánticos: éxito #2E9E6B · error #C15542 · aviso #C98A0E
- Display: Sora (pesos 600/700) · Body: Sora (pesos 400/500/600) — UNA sola familia; jerarquía por tamaño y peso. Escala: display 24-28px / title 19-20px / body 15-16px / label 11-13px. Tracking -0.02em en display; tabular-nums en cifras.
- Radio: 20px cards / 14px botones / 12px chips (consistente en toda la app)
- Profundidad: SOMBRAS suaves (modo claro), NO bordes duros — `0 1px 2px rgba(47,60,74,.08), 0 16px 32px -16px rgba(47,60,74,.24)`; hairline de refuerzo opcional `rgba(126,117,101,.2)`. Card clave: borde con degradé (padding-box/border-box) del acento.
- Fondo con profundidad: mesh radial sutil del acento arriba + patrón de puntos/curvas de nivel muy tenue (cartografía). Grano ≤3% opcional.
- Dispositivo ownable: la RUTA CRONOLÓGICA ilustrada (sendero curvo + estaciones + pines + curvas de nivel de fondo). El LOGO (brújula) es su eco.
- Motion signature: easing `cubic-bezier(0.22, 1, 0.3, 1)` (ease-out suave) · duración base 280ms · stagger 70ms · UN spring (bounce ~0.15) reservado a "capítulo completado / avanzar en el mapa" · `prefers-reduced-motion` siempre.

## Logo
- Concepto elegido: **2 — "La brújula guía"** (el usuario eligió el 2026-08-28). Estrella-brújula de 4 puntas; punta NORTE en ámbar (#C98A0E), resto en azul (#2F6D8C); aguja SUR alargada = el camino que baja hasta el usuario; centro con hueco en color del fondo. Contiene una "Y" implícita.
- Entregables pendientes (Sesión 2/assets, archivo 20): versión a color · un solo color (azul) · negativo (sobre azul/oscuro) · favicon 32/16 · ícono de tienda 512. SVG borrador en docs/revisiones/logo-b.artifact.html y en el artifact final.
- Wordmark: "Jireh" en Sora 600, tracking -0.02em.

## Trazabilidad y vetos
- Protocolo A/B/C: opción elegida **B** · descartadas: A "Manuscrito iluminado" (claro cálido / serif Fraunces / filigrana + capitular), C "Noche de oración" (oscuro índigo / serif Spectral / constelación + halo). Página comparativa: docs/revisiones/direcciones-abc.html · artifact: https://claude.ai/code/artifact/82ff5cf5-a222-4103-84b0-ff24a1e4512e · logo: https://claude.ai/code/artifact/3f69585f-1be4-4688-8a5f-e47570026a7a
- Paleta derivada de: lógica de color de BibleProject (líder del nicho — claro, cálido, plano), tomada tal cual. Dispositivo ownable: propio (ruta cartográfica ilustrada), no del banco 54.
- Registro anti-repetición (para el PRÓXIMO proyecto del SO): VETADO → modo CLARO + acento familia azul-cian (#2F6D8C) + tipografía Sora (una sola sans geométrica). Estilo/dispositivo: ruta cartográfica ilustrada + logo brújula.
- Modo (claro) DERIVADO por: arquetipo Sabio/guía diurna + mundo del sujeto (amanecer, mapa de expedición) + evita el default oscuro de IA + hoy el claro es más distintivo. NUNCA "asumido".

## Imágenes de contexto (decisión del usuario 2026-09-01)
- La ESCENA DE CONTEXTO de cada capítulo y la PORTADA de cada libro se hacen **con IA**, pre-generadas y curadas (nunca en runtime).
- Estilo fijo: ilustración pictórica suave (gouache/acuarela digital con textura), luz de amanecer, paleta Jireh (crema, ámbar, azul apagado, ocres), plano general sereno, "mapa de expedición cobrado vida". NO fotorrealista, NO 3D, NO vector plano, NO neón.
- Guardarraíl duro: NUNCA rostro de Jesús/figuras identificables en primer plano (contraluz/espaldas/silueta/distancia). Sin texto en la imagen. Neutro interdenominacional. Sereno, sin violencia gráfica.
- Contrato completo + plantilla de prompt + flujo de producción: **docs/assets/RECETA-IMAGENES-IA.md**.
- Fallback mientras no hay imagen: marcador esquemático dibujado en código (ningún capítulo vacío).

## Tarjetas de versículo / compartir (decisión del usuario 2026-08-28, tras ver ref. Prayfully)
- La dirección B se mantiene INTACTA (el usuario descartó cambiar a cálida-editorial: "se ve muy cargada").
- PERO las TARJETAS (shareable quotes, la Cápsula nocturna, el verso del Modo Crisis) llevan un tratamiento propio más refinado: "suaves, elegantes, como de la época, que muestren paz".
- Receta de la tarjeta (dentro de la paleta B): fondo crema (--surf / #FFFDF8 o un crema apenas más cálido) · MUCHO aire · una serif clásica SOLO para el texto del versículo (excepción del "una sola sans" — es contexto de cita impresa, no UI) · filete fino dorado-ámbar (#C98A0E a baja opacidad) · susurro botánico o textura de papel al 3-5% · el acento azul solo en la cita de referencia o un detalle mínimo · nada de degradés fuertes ni sombras duras. Timeless, no recargado.
- Se construyen en la Sesión 5 (shareable quotes + momentos de verso de la app).

## Idioma UI: español (LATAM neutro), mono-idioma · Fecha de cierre de la ficha: 2026-08-28 · Aprobada por el usuario: SÍ (estilo B + logo 2, 2026-08-28)
