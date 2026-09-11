# VEREDICTO revisor-visual — lector
Fecha: 2026-09-11 00:00
Screenshot: docs/revisiones/lector-375.png
Usabilidad: 36/40
Craft: 15/20
Copy (si vende): N-A
Fidelidad (si hubo referencia): N-A
Veredicto: NO LISTA
Top defectos: 1) Trama de mapa (franja superior del fondo) sigue imperceptible a 0.15 de opacidad en el screenshot real — se lee como fondo liso; sube a ~0.22-0.28 o usa más contraste tonal. 2) Tira hundida (RV1909 + sendero + ícono "?") — el inset shadow es tan sutil que se confunde con un chip normal de la app, no se percibe como un 3er plano diferenciado de la base; oscurece --surface-2 o refuerza el inset. 3) Card de lectura: la separación visual depende casi enteramente del contraste blanco-vs-crema, no del hairline accent-30% en sí (el borde por sí solo sigue siendo débil). 4) docs/revisiones/lector-picker.png no refleja el código actual (aún muestra "Sobre esta versión y cómo leer" como fila de texto separada; el código ya la fusionó en el ícono "?" dentro de la tira) — regenerar esa captura antes de cerrar el ciclo, invalida esa evidencia puntual.
