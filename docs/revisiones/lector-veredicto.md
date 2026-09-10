# VEREDICTO revisor-visual — lector de capítulo bíblico
Fecha: 2026-09-10 14:00
Screenshot: docs/revisiones/lector-375.png
Usabilidad: 36/40
Craft: 14/20
Copy (si vende): N-A
Fidelidad (si hubo referencia): N-A
Veredicto: NO LISTA

Top defectos:
1. [fondo / margenes del lienzo] El 3er plano (radial de acento 9% + trama TRAMA_MAPA ~4% marron sobre crema) queda bajo el umbral perceptivo a 375px: el fondo se ve como un fill plano -> subir la trama a 7-9% con trazo mas oscuro y escala mayor, y el radial a 14-16% con radio mas amplio que llegue detras del header. El fix existe en codigo pero no entrega nada en pantalla.
2. [card del lector] La superficie elevada casi se funde con la base (#FFFDF8 sobre #FBF6EC, ~2 pts de luminancia): solo se leen 2 planos, no 3 -> bajar la base o aclarar la card y reforzar el spread ambiental de shadow-card para que la elevacion sea inequivoca a 375px.
3. [transicion entre capitulos] El cambio de capitulo -interaccion central del lector- es solo el texto "Abriendo capitulo..." -> agregar View Transition / crossfade suave del cuerpo (mitad del eje movimiento, la mejora mas barata).
4. [ornamento sendero] Sigue leyendose fino y palido a 375px pese al 75%/1.8: el dispositivo ownable no pesa -> engrosar estaciones o subir a 85%.
5. [borde degrade de la card] El degrade del borde es casi invisible en pantalla -> subir el tope del acento (32% -> ~45%) en la esquina de arranque.

Nota: usabilidad ya pasa (36/40). El unico bloqueo es craft 14/20 (faltan 2), concentrado en EJE 2 profundidad (defectos 1 y 2). Con esos dos resueltos y visibles en el screenshot, profundidad sube de 2 a 3-4 y el gate de craft (>=16) se alcanza.
