'use client';

// Página de ventas de Yireth — 10 secciones canónicas (19) con el kit (55) y el
// copy MARCADO de docs/copy/landing.md, trazado a FICHA-AVATAR.md.
// Modelo 2 (onboarding-first anónimo): el CTA lleva a /onboarding, nunca al checkout.

import { MapPinOff, HelpCircle, CloudRain, Users, RefreshCw, CalendarX, FileText } from 'lucide-react';
import { Hero } from '@/components/landing/Hero';
import { Problema } from '@/components/landing/Problema';
import { Agitacion } from '@/components/landing/Agitacion';
import { Solucion } from '@/components/landing/Solucion';
import { AppPorDentro } from '@/components/landing/AppPorDentro';
import { Oferta } from '@/components/landing/Oferta';
import { Garantia } from '@/components/landing/Garantia';
import { Faq } from '@/components/landing/Faq';
import { CtaFinal } from '@/components/landing/CtaFinal';
import { FooterLegal } from '@/components/landing/FooterLegal';
import { StickyCtaMobile } from '@/components/landing/ui';
import { YirethMark } from '@/components/landing/Logo';
import { RutaIllustration } from '@/components/landing/RutaIllustration';
import { ScreenHoy, ScreenRuta, ScreenOracion, ScreenCrisis } from '@/components/landing/MiniScreens';

const CTA_HREF = '/onboarding';
const CTA_LABEL = 'Empezar mi Ruta — 7 días gratis';

export default function LandingYireth() {
  return (
    <div className="min-h-dvh bg-[var(--bg)] text-[var(--text-primary)] [font-family:var(--font-body)]">
      {/* 1 · HERO */}
      <Hero
        appName="Yireth"
        logo={<YirethMark className="size-7" />}
        loginHref="/entrar"
        h1Marked="Entiende la Biblia [acento]en orden[/acento], en [acento]5 minutos[/acento] al día"
        subtitleMarked="Sin perderte entre reyes y profetas. Y sin la [b]culpa[/b] de abandonarla otra vez."
        ctaLabel={CTA_LABEL}
        ctaHref={CTA_HREF}
        socialProof={<span>Sin tarjeta para empezar · Cancelas con un correo · Contenido centrado en Jesús</span>}
        visual={<RutaIllustration />}
      />

      {/* 2 · PROBLEMA */}
      <Problema
        titulo="¿Te suena?"
        preguntas={[
          { icon: MapPinOff, textoMarked: '¿Empiezas la Biblia y a los días la dejas porque te pierdes?' },
          { icon: HelpCircle, textoMarked: "¿Terminas un capítulo y piensas 'y esto qué tiene que ver conmigo'?" },
          { icon: CloudRain, textoMarked: '¿Sientes culpa cuando pasa una semana sin orar ni leer?' },
          { icon: Users, textoMarked: '¿Te da pena no entender de qué se habla en el grupo?' },
        ]}
      />

      {/* 3 · AGITACIÓN */}
      <Agitacion
        titulo="Cada intento de 5 minutos termina igual"
        puntos={[
          {
            icon: RefreshCw,
            dato: '5–6 intentos',
            textoMarked: "por semana que terminan en la misma frase: 'otra vez no pude'.",
          },
          {
            icon: CalendarX,
            dato: '≈50 al año',
            textoMarked: 'arranques [acento]abandonados[/acento] — y la sensación de estar más lejos de Dios.',
          },
          {
            icon: FileText,
            textoMarked: 'Los planes en papel y los videos largos fallan por lo mismo: te dan [b]texto, no un mapa[/b].',
          },
        ]}
        contraste={{
          labelHoy: 'Hoy',
          hoy: 'Abres en Génesis, llegas a Levítico y cierras el libro.',
          labelFuturo: 'En un año, si nada cambia',
          futuro: 'El mismo desánimo — con un año menos.',
        }}
      />

      {/* 4 · SOLUCIÓN */}
      <Solucion
        tituloMarked="Leíste la Biblia [acento]sin un mapa[/acento]"
        mecanismo="la Ruta"
        bigIdeaMarked="No es que te falte fe ni disciplina. La Ruta ordena toda la Biblia como un camino y te [b]explica cada capítulo antes de leerlo[/b]."
        pasos={[
          { titulo: 'Ves el contexto en 30 segundos', detalle: 'Quién lo escribió, cuándo y dónde. Dejas de leer un libro ajeno.' },
          { titulo: 'Lees o escuchas el capítulo', detalle: 'Tres minutos, en orden cronológico. Sin saltos, sin perderte.' },
          { titulo: 'Entiendes qué te quiso decir Jesús', detalle: 'La enseñanza del capítulo en 3 ideas claras, para tu vida de hoy.' },
        ]}
        antesDespues={{
          labelAntes: 'Antes',
          antes: 'Abres en Génesis, llegas a Levítico y cierras.',
          labelDespues: 'Después',
          despues: 'Sabes dónde estás en la historia y qué significa para ti.',
        }}
      />

      {/* 5 · LA APP POR DENTRO — placeholders honestos hasta construir la app (pendiente en ESTADO.md) */}
      <AppPorDentro
        tituloMarked="Así se ve tu [acento]camino[/acento], día a día"
        frames={[
          { label: 'Tu momento de hoy', render: () => <ScreenHoy /> },
          { label: 'Tu ruta por toda la Biblia', render: () => <ScreenRuta /> },
          { label: 'Tus oraciones respondidas', render: () => <ScreenOracion /> },
          { label: 'Cuando el día pesa', render: () => <ScreenCrisis /> },
        ]}
        ctaLabel={CTA_LABEL}
        ctaHref={CTA_HREF}
      />

      {/* 6 · OFERTA */}
      <Oferta
        tituloMarked="Una guía completa por [acento]toda la Biblia[/acento]"
        trialDias={7}
        stack={{
          lineas: [
            { resultado: 'Yireth con la Ruta — toda la Biblia en orden, con contexto y enseñanza', valor: '$96/año' },
            { resultado: 'Modo audio: escucha tu devocional mientras alistas el día', valor: 'incluido' },
            { resultado: 'Modo Crisis por emociones + Cápsula de 60 s para dormir', valor: '$24' },
            { resultado: 'Diario de oraciones respondidas', valor: '$18' },
          ],
          totalTachado: '$138',
          nota: 'Hoy: $2.49/mes (se cobra $29.99/año)',
        }}
        anual={{
          nombre: 'Anual',
          badge: 'MEJOR VALOR',
          precioMes: '$2.49',
          totalAnual: 'Se cobra $29.99/año',
          ahorro: 'Pagas 4 meses, tienes 12',
          descomposicionDia: 'menos de $0.09 al día',
          ctaLabel: CTA_LABEL,
          ctaHref: CTA_HREF,
          features: [
            'Toda la Biblia en orden, con contexto por capítulo',
            'La enseñanza de Jesús en 3 ideas, cada día',
            'Modo audio para escuchar en 3 minutos',
            'Diario de oración y racha que te sostiene',
            'Modo Crisis para los días difíciles',
          ],
        }}
        mensual={{
          nombre: 'Mensual',
          precioMes: '$6.99',
          ctaLabel: 'Elegir mensual',
          ctaHref: CTA_HREF,
          features: [
            'Toda la Biblia en orden, con contexto por capítulo',
            'La enseñanza de Jesús en 3 ideas, cada día',
            'Modo audio y diario de oración',
            'Cancelas cuando quieras',
          ],
        }}
      />

      {/* 7 · GARANTÍA */}
      <Garantia
        nombre="La Garantía Sin Letra Chica"
        condicionMarked="Tienes [b]30 días[/b] desde tu primer pago. Si Yireth no te ayuda a entender la Biblia, escribes un correo y te devolvemos todo."
        pisoLegal="Respaldada por la garantía de Hotmart de 30 días"
      />

      {/* 8 · FAQ — las objeciones de FICHA-AVATAR.md */}
      <Faq
        items={[
          {
            pregunta: '¿Por qué pagar si YouVersion es gratis?',
            respuestaMarked:
              'YouVersion te da el texto. Yireth te da el [b]orden[/b], el contexto en 30 segundos y la enseñanza de cada capítulo explicada.',
          },
          {
            pregunta: 'No tengo tiempo para leer.',
            respuestaMarked:
              'Son 5 minutos, o lo escuchas en audio mientras alistas tu día. Está hecho para una rutina ocupada.',
          },
          {
            pregunta: '¿Es una doctrina rara?',
            respuestaMarked:
              'No. Contenido neutro e interdenominacional, centrado en los Evangelios, las enseñanzas de Jesús y el contexto histórico.',
          },
          {
            pregunta: 'Ya probé apps y planes así y los abandono.',
            respuestaMarked:
              'Los abandonaste porque te pedían 20 o 45 minutos. La Ruta te pide 5, en orden, y [b]sin culpa[/b] si fallas un día.',
          },
          {
            pregunta: '¿Está la Biblia completa?',
            respuestaMarked:
              'Sí, los 66 libros para leer libremente. La Ruta guiada arranca con los Evangelios, Salmos y más, y crece cada mes.',
          },
          {
            pregunta: '¿Y si me cobran sin avisar?',
            respuestaMarked:
              'Te avisamos por correo antes del primer cobro, con la fecha y el monto. Cancelas con un solo correo.',
          },
        ]}
      />

      {/* 9 · CTA FINAL */}
      <CtaFinal
        h2Marked="Cierra la Biblia [acento]entendiendo[/acento], no perdida"
        futurePacingMarked="Es de mañana. Abres Yireth, ves de dónde vienes en la historia, entiendes el capítulo de hoy, y sigues en paz."
        ctaLabel={CTA_LABEL}
        ctaHref={CTA_HREF}
        recap="7 días gratis · $2.49/mes en el plan anual · Garantía Sin Letra Chica"
        psMarked="PS: Yireth ordena toda la Biblia como un camino y te explica el contexto y el mensaje de cada capítulo en 5 minutos al día. Hoy empiezas con 7 días gratis y, si sigues, $2.49/mes en el plan anual, con la Garantía Sin Letra Chica. Sin perderte. Sin culpa."
      />

      {/* 10 · FOOTER LEGAL — páginas stub por ahora (contenido con el archivo 47, pendiente en ESTADO.md) */}
      <FooterLegal
        appName="Yireth"
        logo={<YirethMark className="size-5" mono />}
        soporteEmail="hola@yireth.app"
        enlaces={[
          { label: 'Privacidad', href: '/privacidad' },
          { label: 'Términos', href: '/terminos' },
          { label: 'Reembolsos', href: '/reembolsos' },
          { label: 'Aviso sobre el contenido', href: '/aviso-contenido' },
        ]}
      />

      <StickyCtaMobile labelComercial={CTA_LABEL} href={CTA_HREF} />
    </div>
  );
}
