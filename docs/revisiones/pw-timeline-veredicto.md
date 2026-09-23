# VEREDICTO revisor-visual — pw_timeline
Fecha: 2026-09-23 00:00
Screenshot: docs/revisiones/pw-timeline-375.png
Usabilidad: 37/40
Craft: 16/20
Copy (si vende): 19/20
Fidelidad (si hubo referencia): N-A
Veredicto: LISTA
Top defectos:
1. [Fondo de toda la pantalla] El fondo se ve completamente plano (crema sólido) mientras FICHA-ARTE exige "mesh radial sutil + patrón de curvas de nivel muy tenue" — no se percibe ningún tinte/gradiente en el base → agregar el mesh sutil que ya usan otras pantallas del funnel (baja el eje Profundidad del craft).
2. [Línea de tiempo de 3 nodos] El propio comentario del código dice "patrón Blinkist" — es un stepper vertical de puntos genérico, intercambiable con cualquier app de trial; no retoma el dispositivo ownable de la ficha (ruta cartográfica ilustrada con curvas de nivel/estaciones) → dar textura propia a la línea (curva en vez de recta, o motivo de "sendero") para que se sienta Jireh y no un patrón prestado (baja el eje Identidad del craft).
3. [Header, comparado con PaywallPrecio] Esta pantalla solo tiene flecha de volver; `PaywallPrecio` tiene flecha + cerrar. Un usuario que quiera abandonar el funnel completo desde aquí no tiene esa salida directa → agregar el mismo control de cerrar/salir para consistencia total entre las 3 pantallas del paywall (heurística 3/4, no bloqueante).
4. [Toggle "Avísame por correo..."] Tiene `transition-colors` pero no `whileTap`, mientras el CTA principal sí usa `whileTap scale 0.97` — el toggle se siente menos "vivo" al tocarlo que el resto de controles táctiles de la pantalla → agregar el mismo micro-feedback de tap.
5. [CTA "Elegir mi plan"] No está en 1ª persona (vs. patrón de beneficio en 1ª persona pedido por la rúbrica de copy) → considerar "Quiero mi plan" o similar, coherente con el resto del funnel orientado al avatar.
