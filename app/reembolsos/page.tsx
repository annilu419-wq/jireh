import { LegalLayout, H2, P, Ul } from '@/components/legal/LegalLayout';

export default function Page() {
  return (
    <LegalLayout titulo="Política de reembolso" actualizado="23 de septiembre de 2026">
      <P>
        Queremos que pruebes Jireh sin riesgo. Por eso tienes una prueba gratuita, y si aun así no es lo que esperabas después de
        pagar, te devolvemos tu dinero — sin letra chica.
      </P>

      <H2>La garantía de 30 días</H2>
      <P>
        Tienes <strong className="text-[var(--text-primary)]">30 días desde tu primer pago</strong> para pedir la devolución
        completa de tu dinero, sin tener que explicar por qué. Solo escríbenos a{' '}
        <a href="mailto:hola@jireh.app" className="font-semibold text-[var(--accent)] underline-offset-2 hover:underline">hola@jireh.app</a>{' '}
        o solicita el reembolso directamente desde tu compra en Hotmart, y procesamos la devolución.
      </P>

      <H2>El derecho de retracto de 7 días</H2>
      <P>
        Además de nuestra garantía de 30 días, como comprador tienes el <strong className="text-[var(--text-primary)]">derecho
        de retracto de 7 días</strong> que aplica a las compras hechas a través de Hotmart, independiente de nuestra política.
        Este derecho lo opera directamente Hotmart como la plataforma que procesa tu pago.
      </P>

      <H2>Cómo pedir tu reembolso</H2>
      <Ul>
        <li>Escríbenos a <a href="mailto:hola@jireh.app" className="font-semibold text-[var(--accent)] underline-offset-2 hover:underline">hola@jireh.app</a> con el correo que usaste para pagar, o</li>
        <li>Entra a tu área de compras en Hotmart y solicita el reembolso ahí directamente.</li>
      </Ul>
      <P>Procesamos tu solicitud en un plazo de hasta 5 días hábiles. El dinero puede tardar unos días más en reflejarse, según tu banco o método de pago.</P>

      <H2>Qué pasa con tu cuenta al reembolsar</H2>
      <P>
        Al confirmarse un reembolso o una devolución (chargeback), tu acceso a las funciones de pago de Jireh se cierra
        automáticamente. Tu diario de oración y tu progreso quedan guardados por si decides volver más adelante.
      </P>

      <H2>Suscripciones renovadas</H2>
      <P>
        Esta garantía de 30 días aplica a tu <strong className="text-[var(--text-primary)]">primer pago</strong>. Si tu
        suscripción se renovó automáticamente y quieres cancelar para que no se cobre de nuevo, hazlo antes de la fecha de
        renovación desde <strong className="text-[var(--text-primary)]">Ajustes → Suscripción</strong> en la app.
      </P>
    </LegalLayout>
  );
}
