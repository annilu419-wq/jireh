# VEREDICTO revisor-visual — landing (página de ventas Jireh)
Fecha: 2026-08-31 17:40
Screenshot: docs/revisiones/landing-375.png
Usabilidad: 34/40
Craft: 16/20
Copy (si vende): 19/20
Fidelidad (si hubo referencia): N-A
Veredicto: NO LISTA

Usabilidad detalle: h1:3 h2:4 h3:3 h4:4 h5:3 h6:3 h7:3 h8:4 h9:3 h10:4
Craft detalle: jerarquia:3 profundidad:3 identidad:3 movimiento:4 encaje:3
Copy detalle: idea:4 especificidad:3 emocion:4 oferta:4 accion:4

## Lectura de esta 2ª pasada
El trabajo de DISEÑO Y ESCANEABILIDAD está RESUELTO. La landing NO llega a 36/40 por
DOS piezas de CONTENIDO que dependen de otras sesiones, no por defectos de diseño:
  - Páginas legales del footer (/privacidad, /terminos, /reembolsos, /aviso-contenido)
    → hoy son stubs → Sesión 6 / archivo 47.
  - Capturas reales de la app en §5 (hoy mocks ilustrados) → Sesión 5 (app interna).
Cuando ambas existan: re-render y la usabilidad debería alcanzar ~36/40 SIN más trabajo
de diseño (h3 3->4 con enlaces legales vivos; especificidad del copy 3->4 con demo real).
Craft (16/20) y Copy (19/20) YA PASAN el gate y no requieren cambios.

## Defectos de la 1ª pasada — estado
1. FOCO VISIBLE — RESUELTO. Verificado en código: CtaButton lleva
   `focus-visible:outline-none focus-visible:ring-2 ring-[var(--accent)] ring-offset-2
   ring-offset-[var(--bg)]`. Sticky + botones del FAQ + regla global a/button:focus-visible
   por reporte del coordinador (no observable en screenshot estático — pendiente de
   confirmar el anillo AA con foco de teclado real).
2. ENLACES LEGALES DEL FOOTER — NO tocado (fuera de alcance; Sesión 6). Sigue siendo el
   bloqueante #1 para "lista para tráfico". /onboarding SÍ existe (Sesión 4).
3. §3 dato-héroe sin tabular-nums — RESUELTO (`tabular-nums` en "5-6 intentos" / "≈50 al
   año"). Queda menor: el IconChip de 44px sigue algo más corto que el bloque
   dato(22px)+cuerpo(15px); alinear el chip al eje óptico del dato.
4. §2 ↔ §3 SE LEÍAN COMO UN BLOQUE — RESUELTO. §3 pasó a `elevacion="base"` sin flush;
   sus filas de `bg-[var(--bg)]` -> `bg-[var(--surface)]` + `shadow-1`; se quitó el
   `flush="bottom"` de §2. En el screenshot ahora se distinguen a simple vista:
   §2 = tarjetas sobre superficie clara, §3 = tarjetas claras sobre crema, con respiro
   real entre ambas. Sube h8 (jerarquia/ritmo) y h7.
5. §5 CARRUSEL CON MOCKS — NO tocado (Sesión 5). Mantiene débil la prueba "míralo
   funcionando"; baja copy especificidad a 3.

## Test "solo-titulares" — PASA
Hero -> ¿Te suena? -> Cada intento de 5 minutos termina igual -> Leíste la Biblia sin un
mapa -> Así se ve tu camino, día a día -> Una guía completa por toda la Biblia -> La
Garantía Sin Letra Chica -> Lo que quizá te estás preguntando -> Cierra la Biblia
entendiendo, no perdida. Narrativa entendible y convincente leyendo solo los headings.

## Secciones 3 y 7 (foco de la ronda) — ambas se ESCANEAN
- §3 Agitación: kicker + título + 3 filas ícono-chip + dato-héroe en acento con
  tabular-nums + contraste hoy/futuro. Resuelto el muro de 9 líneas grises y la fusión
  con §2.
- §7 Garantía: escudo SVG a la izquierda, nombre propio en acento, texto alineado a la
  izquierda, piso Hotmart con candado. Correcto.

## TOP DEFECTOS (por severidad — lo que impide 36/40)
1. [Footer §10] Enlaces legales a páginas stub inexistentes. Contenido de Sesión 6
   (archivo 47). Hasta que existan, la landing NO está lista para recibir tráfico pago.
2. [§5 App por dentro] Carrusel con mocks ilustrados en vez de capturas reales de la
   app. Contenido de Sesión 5. Limita la prueba visual y la especificidad del copy.
3. [§3 Agitación] IconChip 44px más corto que el bloque dato-héroe; alinear al eje
   óptico del dato o subir el chip a 48px (menor, cosmético).
4. [§9 CTA final] El PS (~55 palabras) sigue siendo un bloque denso en mobile; partir
   en 2 frases o acortar (menor).
5. [global] Confirmar con foco de teclado real el anillo `ring-2` AA en botones del
   acordeón FAQ y en el ancla del sticky (no verificable en screenshot estático).

## Camino para pasar el gate
No requiere más diseño. Publicar las 4 páginas legales (Sesión 6) y montar las capturas
reales de §5 (Sesión 5); luego re-render a 375px y re-puntuar — proyección ~36/40.
Craft 16/20 y Copy 19/20 ya pasan.
