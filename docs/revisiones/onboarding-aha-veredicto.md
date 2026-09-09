# VEREDICTO revisor-visual — onboarding-aha (PrimeraVictoria)
Fecha: 2026-09-09 14:20
Screenshot: docs/revisiones/onboarding-aha-375.png
Usabilidad: 33/40
Craft: 16/20
Copy (si vende): 18/20
Fidelidad (si hubo referencia): N-A
Veredicto: NO LISTA

Top defectos:
1. Seccion "Que pasa aqui" (la narrativa nueva, el objetivo del cambio) esta en color secundario gris a 14px mientras las 3 vinetas de ensenanza van en tinta plena con chips de acento: la "probada del relato" queda visualmente subordinada a la ficha de datos. Fix: subir la narrativa a --text-primary 15-16px y bajar el peso visual de las vinetas (o moverlas debajo del relato).
2. Motion no integrado: header y CheckRows entran con stagger, pero la tarjeta de contexto, la EscenaContexto y los 2 parrafos aparecen estaticos, rompiendo la coreografia de entrada. Fix: sumar los bloques nuevos al stagger (fade+y 70ms) + fade/draw sutil de la escena.
3. Chip "Lugar / Mar de Galilea" hace wrap a 2 lineas mientras "Autor" y "Epoca" van en 1: desencaje optico visible entre los 3 chips. Fix: "Galilea" en una linea o min-h igual en los 3 chips.
4. Sin control de retroceso: la pantalla ahora hace scroll y no tiene "volver" al quiz ni afordancia de salida (solo el CTA hacia adelante). Fix: chevron de retroceso en la barra superior junto a FunnelBrand, consistente con PaywallPrecio.
5. Segundo parrafo de "Que pasa aqui" ocupa ~6 lineas (supera el max 3-4 por bloque) y la escena "agua" se ve muy tenue/abstracta a 375px. Fix: partir el parrafo en frases cortas; subir contraste/definicion de la escena o reforzar la caption.
