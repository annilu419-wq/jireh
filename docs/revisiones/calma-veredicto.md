# VEREDICTO revisor-visual — Calma / Modo Crisis (guiado / respiración)
Fecha: 2026-09-02 00:00
Screenshot: docs/revisiones/calma-375.png
Usabilidad: 36/40
Craft: 17/20
Copy (si vende): N-A
Fidelidad (si hubo referencia): N-A
Veredicto: LISTA

Detalle usabilidad: h1:4 h2:4 h3:4 h4:4 h5:3 h6:4 h7:3 h8:4 h9:3 h10:3
Detalle craft: jerarquia:3 profundidad:3 identidad:3 movimiento:4 encaje:4

GATE: exige >=36/40 Y >=16/20. Obtiene 36 y 17 -> PASA. Pantalla LISTA.
Historial: R1 34/40 · 16/20 (NO LISTA) -> R2 36/40 · 17/20 (LISTA).

--------------------------------------------------------------------------------
## Defectos de R1 — RESUELTOS (verificado en código + screenshots)

1. [Fase `elegir` — balance vertical] Se quitó el `flex-1 justify-center` que estaba
   SOLO sobre la rejilla; ahora el bloque completo (h1 + subtítulo + rejilla +
   disclaimer) se centra vertical como UNA unidad (L73 + `mt-6` en el wrap de la
   rejilla). En el screenshot el vacío de ~180px entre subtítulo y rejilla DESAPARECIÓ;
   el aire sobrante queda repartido arriba y abajo del bloque, lectura serena y
   conectada. -> h8 3->4, encaje 3->4.

2. [Feedback de tap] El back "← {emoción}" ahora es `motion.button` con `whileTap`
   scale 0.96 (L147); "Volver a Hoy" ahora es `MotionLink` con `whileTap` 0.97. Ya no
   hay dos botones adyacentes que responden distinto al toque. Consistente con
   Diario/Hoy/Biblia. -> h4 3->4.

+ Defecto 3 (no bloqueante): se quitó la promesa "60 segundos" del subtítulo ("Elige y
  respira un momento") y se añadió "Quédate el tiempo que necesites." sobre "Terminar"
  en la fase guiada. Cierra la ambigüedad de "¿cuándo terminé?".

--------------------------------------------------------------------------------
## FOCO — respuestas (se mantienen de R1, confirmadas)

1) ¿El círculo de respiración se lee como guía (no spinner)? SÍ. Disco azul relleno con
   la palabra sincronizada dentro (Inhala/Sostén/Exhala) + halos concéntricos que
   escalan muy lento (12 s, no rota). La palabra es el desambiguador. (Nit no bloqueante:
   fill plano tipo botón — un degradé radial suave lo alejaría del todo de "control" en
   frames estáticos.)

2) ¿El cierre sereno-SIN-ámbar es correcto para crisis? SÍ, y NO se siente frío: la
   calidez la lleva el copy ("Respiraste. Eso ya es algo." · "Vuelve aquí cada vez que
   lo necesites.") + spring suave sobre un check AZUL. Un burst ámbar aquí sería
   tonalmente erróneo. Coherente con la voz "mentor sereno" de FICHA-ARTE.

3) ¿La fase `elegir` tiene demasiado aire arriba? YA NO — resuelto (defecto 1).

--------------------------------------------------------------------------------
## VERIFICACIONES OK
- Contrato FICHA-ARTE: modo claro, crema, azul en emoción elegida / círculo / CTAs /
  ref del versículo; ámbar SOLO en el filete + wash de la tarjeta de versículo (estilo
  de componente sancionado por la ficha, igual que "Para ti hoy" en Hoy) — CERO ámbar
  de celebración/progreso, como pide el spec. Serif token SOLO en el versículo. Sora,
  radios del kit, `--shadow-card` + inset + fondo amanecer.
- Léxico vetado: "ritual" NO aparece. Copy humano, cálido, en el mundo emocional del
  usuario ("el pecho apretado", "No tengo que fingir que estoy bien"). Sin dark patterns.
- DISCLAIMER en la primera pantalla ("no para reemplazar ayuda profesional"), visible
  ANTES de comprometerse — correcto para una función adyacente a salud mental.
- 3 fases con `AnimatePresence mode="wait"`; cada fase tiene salida (back / Terminar en
  cualquier momento / Elegir otra / Volver a Hoy / BottomNav). No fuerza duración.
- Movimiento: stagger (emociones + oración, lento y deliberado), transición entre fases,
  LOOP de respiración multicapa sincronizado por keyframes (inhala 4 / sostén 2 /
  exhala 4 / pausa 2), spring del check en el cierre, `whileTap` ahora COMPLETO en toda
  superficie táctil.
- `prefers-reduced-motion`: cubierto a fondo — círculo estático con fallback "Respira
  con calma" (sigue guiando), oración sin delay, transiciones a solo-opacidad.
- tsc ✓ · build prod ✓ (reportado).

## SEGUIMIENTO NO BLOQUEANTE (no reabre el gate)
1. Disco de respiración con fill plano tipo botón: considerar degradé radial suave.
2. Sin audio ni háptica opcionales para la respiración (el avatar pide "escucharlo");
   camino de la Sesión 6. Limita h7.
3. Micro-instrucción de primera vez en la fase guiada ("sigue el círculo con tu
   respiración") suavizaría el primer uso. Limita h10.
4. Check del cierre en neutro cálido en vez de tinte azul (subjetivo).
5. Disclaimer solo en `elegir`; valorar una versión mínima persistente.
