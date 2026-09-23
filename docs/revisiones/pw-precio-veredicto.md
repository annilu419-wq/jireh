# VEREDICTO revisor-visual — pw_precio
Fecha: 2026-09-23 00:00
Screenshot: docs/revisiones/pw-precio-375.png
Usabilidad: 38/40
Craft: 18/20
Copy (si vende): 20/20
Fidelidad (si hubo referencia): N-A
Veredicto: LISTA
Top defectos:
1. [Header, comparado con pw_timeline] Esta pantalla tiene flecha+cerrar mientras `PaywallTimeline` no tiene ningún control de salida — corregir ahí (no bloquea esta pantalla, pero rompe consistencia global del funnel de 3 pasos).
2. [Titular "No dejes tu Ruta a medias"] En 375px el titular parte en 2 líneas dejando "a medias" solo en la segunda línea — revisar salto de línea manual o `max-w` para evitar una línea huérfana de 2 palabras (defecto menor, no bloqueante).
3. [Badge "MEJOR VALOR"] Se posiciona con `absolute -top-2.5 left-4` sobre el borde de la tarjeta anual — confirmar en dispositivos reales que no se recorta contra el padding del contenedor `surface-2` que lo envuelve (riesgo visual menor, no observado como roto en el screenshot).
