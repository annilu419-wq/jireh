# VEREDICTO revisor-visual — lector de capítulo bíblico

Fecha: 2026-09-10 00:00
Screenshot: docs/revisiones/lector-375.png
Usabilidad: 36/40
Craft: 15/20
Copy (si vende): N-A
Fidelidad (si hubo referencia): N-A
Veredicto: NO LISTA

## Detalle usabilidad (36/40)
h1:4 h2:4 h3:3 h4:3 h5:3 h6:4 h7:4 h8:3 h9:4 h10:4
- h1 Estado: skeleton con forma de contenido + aria-live, "Abriendo capitulo..." con spinner en navegacion, stagger de versiculos, reintento automatico al volver online. OK.
- h2 Lenguaje: cero jerga; "El texto se abrira solo cuando vuelva tu internet", "Sobre esta version y como leer". Arcaismos = traduccion, no defecto.
- h3 Control (codigo): volver al libro, prev/next, salto directo, details colapsable, teclas <-/->. Baja a 3: el picker no tiene cierre explicito ni tecla Escape; solo se cierra volviendo a tocar el titulo.
- h4 Consistencia: 3. Tres estilos de borde conviven (pill A-/A+, card lectura hairline 10%, boton Reintentar borde acento 40%, pill next borde acento 45%); la diferenciacion prev neutro / next acento es intencional pero el conjunto de bordes no sigue un unico patron.
- h5 Prevencion: 3. A-/A+ deshabilitados en limites y capitulo actual como span no enlazable; pero el disabled de A-/A+ se comunica solo por color a ~45% de opacidad (poco perceptible por que no responde el tap).
- h8 Estetico: 3. Limpio y con una sola mision, pero dos botones de navegacion de igual peso y fondo plano restan al "cada elemento se gana su lugar".

## Detalle craft (15/20) — NO PASA EL GATE (necesita >=16)
jerarquia:3 profundidad:3 identidad:3 movimiento:3 encaje:3
- Jerarquia 3: h1 domina, pero cabecera con back + A-/A+ + label version + ornamento + link details compite; y el h1 a 30px se sale del rango de la FICHA-ARTE (display 24-28px, linea 33).
- Profundidad 3: solo se leen 2 planos reales (crema base + card elevada). El token hundido #F3EDDF y el mesh/curvas de nivel que la ficha exige NO se ven -> fondo plano.
- Identidad 3: el ornamento "sendero" ya es deliberado y visible (mejor que la banda de textura de R3), pero va a --text-tertiary al 50% -> se lee palido; es un unico SVG pequeno bajo un label, no un dispositivo que impregne la pantalla.
- Movimiento 3: stagger, whileTap 0.97, picker con AnimatePresence, skeleton, reduced-motion en todo. Correcto para un lector, sin nada ownable en el movimiento.
- Encaje 3: radios por token, celdas del picker h-9 uniformes, numero de versiculo con align optico. Sin desencajes; sin nada que suba a 4.

## Elemento exacto que falta para pasar (recheck acotado)
El bloqueo es CRAFT 15/20 (usabilidad ya pasa con 36). Falta cumplir la FICHA-ARTE en dos puntos que suben profundidad e identidad de 3 -> 4:

1. FONDO CON PROFUNDIDAD (FICHA-ARTE linea 36, sin implementar): agregar al fondo del lector el mesh radial sutil del acento arriba + patron de puntos/curvas de nivel de cartografia muy tenue (<=3-5% opacidad). Hoy el fondo es #FBF6EC plano. Esto da el 3er plano (base con tinte + elevado + trama) y refuerza el eco del mapa -> profundidad 3->4, identidad 3->4.
2. CARD CLAVE CON BORDE DEGRADE (FICHA-ARTE linea 35): la card de lectura usa un hairline gris al 10%; cambiarlo por el borde con degrade del acento (padding-box/border-box) que la ficha reserva a la card clave.

Ajuste menor (no bloquea, corregir de paso): bajar el h1 de 30px a 28px para respetar el rango display 24-28 de la ficha; la dominancia se sostiene con el fondo tramado detras.

Con (1) y (2) aplicados: craft estimado 17/20 y veredicto LISTA.
