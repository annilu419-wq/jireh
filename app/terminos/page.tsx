import { LegalLayout, H2, P, Ul } from '@/components/legal/LegalLayout';

export default function Page() {
  return (
    <LegalLayout titulo="Términos y condiciones" actualizado="23 de septiembre de 2026">
      <P>
        Estos términos regulan el uso de Jireh, una aplicación de devocional y lectura bíblica operada por{' '}
        <strong className="text-[var(--text-primary)]">Anni Carmona</strong>, con domicilio en Colombia. Al usar la app, aceptas
        estas condiciones.
      </P>

      <H2>Qué es Jireh</H2>
      <P>
        Jireh es una aplicación que te ayuda a leer la Biblia en orden cronológico, con el contexto de cada capítulo explicado y
        la enseñanza de Jesús resumida en ideas claras. Incluye un diario de oración, un modo de calma para momentos difíciles, y
        un seguimiento de tu racha de lectura.
      </P>
      <P>
        Jireh es una herramienta de acompañamiento espiritual, <strong className="text-[var(--text-primary)]">no un consejero
        pastoral, psicológico ni médico</strong>. El contenido es de carácter neutro e interdenominacional, centrado en los
        Evangelios y la vida de Jesús — no representa la doctrina de ninguna iglesia o denominación en particular.
      </P>

      <H2>Tu cuenta</H2>
      <Ul>
        <li>Necesitas un correo electrónico válido para crear tu cuenta.</li>
        <li>Eres responsable de mantener tu acceso seguro (no compartas el enlace de ingreso que te llega por correo).</li>
        <li>Puedes usar Jireh si tienes 18 años o más. Si eres menor de edad, necesitas el permiso y la supervisión de un adulto responsable.</li>
      </Ul>

      <H2>La suscripción</H2>
      <Ul>
        <li>Jireh se ofrece con una prueba gratuita de <strong className="text-[var(--text-primary)]">7 días</strong> en el plan anual. No necesitas tarjeta para empezar la prueba salvo que el flujo de pago lo requiera en el momento del checkout.</li>
        <li>Al terminar la prueba, se cobra automáticamente el precio del plan que elegiste ($29.99/año o $6.99/mes), salvo que canceles antes.</li>
        <li>Te avisamos por correo antes de cualquier cobro, con la fecha y el monto exactos.</li>
        <li>La suscripción se <strong className="text-[var(--text-primary)]">renueva automáticamente</strong> cada mes o cada año, según el plan que elegiste, hasta que la canceles.</li>
        <li>El pago se procesa a través de Hotmart. Jireh nunca ve ni guarda los datos de tu tarjeta.</li>
      </Ul>

      <H2>Cómo cancelar</H2>
      <P>
        Puedes cancelar cuando quieras desde <strong className="text-[var(--text-primary)]">Ajustes → Suscripción</strong> dentro
        de la app, o directamente desde tu área de compras en Hotmart. Al cancelar, conservas el acceso hasta el final del
        período ya pagado — no se corta de inmediato ni se hacen devoluciones parciales por los días que no uses.
      </P>

      <H2>Uso aceptable</H2>
      <P>Al usar Jireh, te comprometes a:</P>
      <Ul>
        <li>No intentar acceder a cuentas de otras personas ni a partes de la app que no te correspondan.</li>
        <li>No usar la app con fines ilegales o para distribuir contenido dañino.</li>
        <li>No copiar, revender o redistribuir el contenido de Jireh sin autorización.</li>
      </Ul>
      <P>Podemos suspender o cerrar cuentas que incumplan estas reglas, avisando por correo cuando sea razonable hacerlo.</P>

      <H2>Limitación de responsabilidad</H2>
      <P>
        Jireh se ofrece "tal cual". Hacemos nuestro mejor esfuerzo para que el contenido sea preciso y útil, pero no garantizamos
        que la app esté libre de errores en todo momento. El contenido de Jireh es orientación devocional y educativa —
        <strong className="text-[var(--text-primary)]"> no sustituye el consejo de un profesional de salud mental, un médico, ni
        el acompañamiento pastoral de tu propia comunidad de fe</strong>. Si estás pasando por una crisis emocional seria, por
        favor busca ayuda profesional o de emergencia — el "Modo Calma" de Jireh es un apoyo, no un servicio de crisis.
      </P>

      <H2>Ley aplicable</H2>
      <P>
        Estos términos se rigen por las leyes de Colombia. Cualquier disputa se resolverá ante las autoridades competentes de
        Colombia, salvo que la ley aplicable indique algo distinto para tu caso.
      </P>

      <H2>Cambios a estos términos</H2>
      <P>
        Podemos actualizar estos términos de vez en cuando. Si el cambio es importante, te avisamos por correo antes de que
        entre en vigencia.
      </P>
    </LegalLayout>
  );
}
