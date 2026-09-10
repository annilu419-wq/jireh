# VEREDICTO revisor-visual — lector de capítulo bíblico

Fecha: 2026-09-10 14:20
Screenshot: docs/revisiones/lector-375.png
Usabilidad: 36/40
Craft: 15/20
Copy (si vende): N-A
Fidelidad (si hubo referencia): N-A
Veredicto: NO LISTA

Top defectos:
1. Card de lectura — el borde degradé sigue sin leerse a 375px: 48% de acento SOLO en una esquina, el resto <14% sobre borde transparente. El dispositivo "borde con degradé del acento" de la FICHA-ARTE queda invisible. Fix: hairline sólido del acento al 28-35% en los 4 lados + refuerzo degradé 60-70% en la esquina de arranque.
2. Profundidad — solo hay 2 planos reales (base con tinte + card elevada). El 3er nivel "hundido #F3EDDF" que define la ficha no aparece en la vista. Fix: asentar la rejilla del picker y/o el bloque "Sobre esta versión" sobre superficie hundida para cerrar base/elevado/hundido.
3. Trama de mapa a opacidad 0.09 no se lee como cartografía a 375px, funciona como ruido plano. Fix: subir a 0.13-0.16 y enmascararla con gradiente para que solo aparezca en los márgenes, fuera de la card.
4. Cabecera saturada — topbar, "volver", A−/A+, título, "Reina-Valera 1909", sendero y "Sobre esta versión" = 7 elementos antes del versículo 1. Fix: fusionar versión + sendero en una fila y colapsar "Sobre esta versión" a un ícono.
5. Nav inferior — botones de ancho desigual y tratamiento asimétrico (solo el derecho con borde de acento, el izquierdo casi no eleva). Fix: igualar altura/borde/sombra de ambos y reservar el acento al texto del "siguiente".
