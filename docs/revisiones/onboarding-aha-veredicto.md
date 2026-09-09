# VEREDICTO revisor-visual — onboarding-aha (PrimeraVictoria)
Fecha: 2026-09-09 16:40
Screenshot: docs/revisiones/onboarding-aha-375.png
Usabilidad: 34/40
Craft: 15/20
Copy (si vende): 18/20
Fidelidad (si hubo referencia): N-A
Veredicto: NO LISTA

Top defectos:
1. Fichas de dato de la card (CONTEXTO): labels "AUTOR/EPOCA/LUGAR" a ~9px y valores a ~10px, por debajo del piso 11-13px de FICHA-ARTE (linea 33) y de la regla de legibilidad del SO. Fix: subir labels a 11px minimo, valores a 12-13px y dar min-h igual a las 3 fichas.
2. Barra superior: el "volver" es un icono de 36px (size-9) sin etiqueta visible; queda por debajo del area tactil >=44px y su afordancia como "volver al quiz" es debil. Fix: area tactil >=44px + texto "Volver" junto a FunnelBrand, consistente con PaywallPrecio.
3. Movimiento: la EscenaContexto entra solo con el fade del contenedor padre; ninguna baseline de "dibujado" ocurre en pantalla (sin conteo de numero heroe, sin trazo que se dibuja). Fix: animar el sendero punteado / la barca con pathLength en la entrada (respetando reduced-motion).
4. Fondo de pagina: no se percibe el mesh radial del acento + patron de curvas de nivel que exige FICHA-ARTE (linea 36); bajo la card la pagina se lee como fill crema plano. Fix: sumar el fondo con profundidad (mesh acento arriba + puntos/curvas <=3%).
5. Jerarquia nivel-4: dos kickers de 13px adyacentes con tratamiento distinto ("EL RELATO" en acento vs "Que te quiso decir Jesus" en tinta) compiten como el mismo nivel y enturbian el squint test. Fix: diferenciar tamano/tracking o unificar el estilo de encabezado de sub-bloque.
