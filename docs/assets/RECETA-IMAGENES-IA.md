# RECETA DE IMÁGENES CON IA — Yireth

> Decisión del usuario (2026-09-01): **SOLO las 66 PORTADAS DE LIBRO** llevan imagen generada con IA
> (alcance elegido por costo: "lo que implique menos costos"). La ficha de contexto de cada CAPÍTULO
> NO lleva imagen de IA — va dibujada en código con una librería chica de vignetas genéricas
> reutilizables (Agua/Monte/Camino/Ciudad/Desierto/Casa), costo $0, ver `components/app/EscenasContexto.tsx`.
> Este documento es el contrato de estilo SOLO para las 66 portadas. Quien las genere debe seguirlo
> al pie de la letra para que las 66 se vean como UN solo set. Lista de prompts lista para usar:
> `docs/assets/prompts-portadas-libros.md`.

---

## 1. Para qué son (1 solo uso)

| Uso | Dónde | Formato | Cantidad |
|---|---|---|---|
| **Portada del intro de libro** | Primera lámina de la secuencia de intro al llegar a una estación de la Ruta | horizontal **16:9** (ej. 1792×1008) | **1 por libro** = 66 en total (una sola vez) |

NO se generan imágenes para: la ficha de contexto de cada capítulo (va dibujada en código, ver
`ESTADO.md`), navegación, botones, iconos, fondos de UI, ni tarjetas de versículo (tratamiento
propio de la FICHA-ARTE).

---

## 2. Estilo visual (fijo para TODAS)

- **Técnica:** ilustración pictórica suave, tipo gouache / acuarela digital con luz. NO fotorrealista,
  NO 3D, NO render brillante, NO estilo cómic, NO vector plano.
- **Paleta:** la de Yireth — crema cálido (#FBF6EC), ámbar de amanecer (#C98A0E / #E3A93A),
  azul cielo apagado (#2F6D8C), tierras y ocres suaves. Luz dorada de amanecer o media tarde.
  Nunca noche cerrada, nunca colores neón o saturados.
- **Luz y ánimo:** amanecer / luz cálida lateral, calma, esperanza, quietud. Sensación de "mapa de
  expedición antiguo cobrado vida". Bruma suave al fondo. Grano/textura de papel muy sutil.
- **Encuadre:** plano general / establecedor (wide shot). El paisaje y el momento, no un primer plano.
  Horizonte a ~⅓. Espacio "de aire" arriba (ahí van los chips de la ficha en la app).
- **Composición:** una sola idea clara por imagen. Profundidad en 3 capas (frente / medio / fondo).
- **Consistencia:** misma técnica, misma temperatura de color, misma calidad de luz en las 66.
  Si una imagen se sale del set, se descarta y se regenera.

## 3. Reglas duras (contenido) — NO negociables

- ❌ **NUNCA el rostro de Jesús ni de figuras bíblicas identificables en primer plano.** Se resuelven
  a **contraluz, de espaldas, a media distancia, o como silueta**. Nunca una cara reconocible que
  "fije" una doctrina.
- ❌ Sin texto, sin letras, sin números dentro de la imagen (el texto lo pone la app).
- ❌ Sin símbolos de una denominación concreta (cruces ornamentadas específicas, iconografía
  católica u ortodoxa marcada, etc.). Neutro e interdenominacional.
- ❌ Sin anacronismos (ropa moderna, edificios modernos, plástico).
- ❌ Sin violencia gráfica, sangre, ni sufrimiento explícito. El tono es sereno.
- ✅ Vestuario y arquitectura **históricamente plausibles** del Cercano Oriente del período (túnicas
  de lino/lana, casas de piedra, barcas de madera, olivos, trigo, colinas de Galilea, desierto de Judea).
- ✅ Personas siempre **pequeñas en el encuadre** o de espaldas: son parte del paisaje, no el foco.

## 4. Plantilla de prompt (rellenar los [corchetes])

```
Soft painterly illustration, digital gouache with visible brush texture, warm dawn light,
Near-Eastern landscape of the biblical period. SCENE: [describe la escena en 1-2 frases:
lugar + qué ocurre, p.ej. "the shore of the Sea of Galilee at dawn; a small wooden boat just
offshore with a few seated figures seen from behind; a scattered crowd of small figures standing
on the pebbled shore; low golden sun, soft mist over distant hills"].
Wide establishing shot, horizon on the lower third, generous calm sky above.
Palette: warm cream, soft amber and gold, muted slate blue, earthy ochre. Gentle, hopeful, quiet mood.
Subtle paper grain. Three depth layers (foreground / midground / background).
No text, no lettering. Figures small and distant or seen from behind — never a recognizable face.
No modern objects. Not photorealistic, not 3D, not cartoon, not flat vector.
--ar 16:9
```

Las 66 escenas (una por libro) ya están redactadas y listas para copiar en
`docs/assets/prompts-portadas-libros.md` — no hace falta escribir el SCENE a mano, solo generar.

## 4b. Herramientas GRATIS para generar (elige una)

| Herramienta | Cómo es gratis | El pero |
|---|---|---|
| **Bing Image Creator** (DALL·E 3) | Gratis con cuenta Microsoft; buena calidad | "Créditos rápidos" diarios; luego sigue más lento |
| **Google ImageFX** (Imagen) | Gratis con cuenta Google; excelente para paisajes | No disponible en todos los países |
| **Adobe Firefly** | ~25 imágenes gratis/mes | Pocas al mes, pero la **más segura para uso comercial** |
| **Ideogram** / **Leonardo.ai** | Free con límite diario (decenas/día) | Revisar términos: algunos planes gratis guardan derechos compartidos |
| **Stable Diffusion / Flux local o Colab** | 100% gratis e ilimitado; imágenes propias | Requiere instalación o notebook |

Recomendado: **Bing Image Creator** o **Google ImageFX** (mejor calidad gratis, repartir las 66 en ~1 semana);
**Firefly** para las más importantes si preocupa lo legal.
SIEMPRE antes de usar: (1) confirmar que el plan gratis permite USO COMERCIAL, (2) el aviso de IA de la §6 aplica igual.

## 5. Flujo de producción

1. Ir a `docs/assets/prompts-portadas-libros.md`, empezar por el **lote de lanzamiento** (Mateo,
   Marcos, Lucas, Juan, Salmos, Génesis, Proverbios, Hechos).
2. Generar 3-4 variantes por libro con el prompt ya escrito. Elegir 1. Descartar sin culpa las que se
   salen del set (mismo ejercicio: comparar contra la sección 3 de este documento).
3. **Revisión humana obligatoria** de cada imagen elegida contra la sección 3 (reglas duras).
4. Recortar a 16:9 y exportar a WebP ~1600px de ancho, <250 KB.
5. Subir a **Supabase Storage** (bucket `book-covers/`), guardar la URL en `books.intro_art`.
6. Mientras un libro no tenga portada: la app muestra el **marcador de reemplazo dibujado en código**
   (el compás + la Ruta) — ningún libro se ve vacío ni roto.

## 6. Legal (archivo 47 — pendiente Sesión 6)

- La página "Aviso sobre el contenido" debe decir, en simple: *"Algunas ilustraciones de contexto
  se crean con ayuda de inteligencia artificial y son revisadas por una persona antes de publicarse.
  Son representaciones artísticas, no registros históricos."*
- Nota breve del mismo tenor accesible desde la ficha (un "ⓘ" discreto).

## 7. Costo (alcance ya decidido: solo portadas)

- 66 portadas × ~3-4 intentos ≈ 200-260 generaciones. **Una sola vez**, no se repite.
- A ~$0.02-0.08 por imagen según la herramienta ≈ **US$5-20 en total**.
- Si el usuario más adelante quiere ilustrar además el lote de lanzamiento de capítulos, es una
  decisión nueva y separada — no está en este alcance.
