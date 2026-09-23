import { LegalLayout, H2, P, Ul } from '@/components/legal/LegalLayout';

export default function Page() {
  return (
    <LegalLayout titulo="Política de privacidad" actualizado="23 de septiembre de 2026">
      <P>
        Jireh es operada por <strong className="text-[var(--text-primary)]">Anni Carmona</strong>, con domicilio en Colombia. Esta
        política explica, en lenguaje simple, qué datos recogemos cuando usas la app, para qué los usamos y qué puedes hacer al respecto.
      </P>

      <H2>Qué datos recogemos</H2>
      <P>Solo pedimos lo necesario para que la app funcione:</P>
      <Ul>
        <li><strong className="text-[var(--text-primary)]">Tu correo electrónico</strong> — para crear tu cuenta y enviarte el enlace de acceso (magic link).</li>
        <li><strong className="text-[var(--text-primary)]">Tu nombre</strong> — si lo compartes al registrarte, para personalizar tu saludo dentro de la app.</li>
        <li><strong className="text-[var(--text-primary)]">Tu progreso en la app</strong> — qué capítulo vas, tu racha, tus peticiones de oración y tus ajustes — para que la app recuerde dónde te quedaste.</li>
        <li><strong className="text-[var(--text-primary)]">Datos técnicos básicos</strong> — como qué tan seguido abres la app, para saber si algo no está funcionando bien.</li>
      </Ul>
      <P>No te pedimos ni guardamos datos de tarjetas o de pago — eso lo procesa directamente Hotmart (ver abajo).</P>

      <H2>Con quién compartimos tus datos</H2>
      <P>Nunca vendemos tus datos. Los únicos que los tocan son las herramientas que hacen que Jireh funcione:</P>
      <Ul>
        <li><strong className="text-[var(--text-primary)]">Supabase</strong> (Estados Unidos) — guarda tu cuenta y tu progreso en la app.</li>
        <li><strong className="text-[var(--text-primary)]">Vercel</strong> (Estados Unidos) — aloja la aplicación web.</li>
        <li><strong className="text-[var(--text-primary)]">Hotmart</strong> (Brasil) — procesa tu pago cuando compras la suscripción; nunca vemos ni guardamos los datos de tu tarjeta.</li>
        <li><strong className="text-[var(--text-primary)]">Resend</strong> (Estados Unidos) — envía los correos de la app (el enlace de acceso, avisos de cobro).</li>
      </Ul>
      <P>
        Como algunas de estas herramientas están fuera de Colombia, tus datos pueden viajar internacionalmente para poder
        prestarte el servicio. Todas operan bajo sus propias políticas de seguridad y privacidad.
      </P>

      <H2>El contenido devocional y la Inteligencia Artificial</H2>
      <P>
        Las imágenes de portada de los libros de la Biblia dentro de Jireh se generan con Inteligencia Artificial, revisadas y
        curadas antes de publicarse. El texto bíblico, el contexto de cada capítulo y las enseñanzas son escritos y revisados por
        personas — la IA no genera contenido en tiempo real ni procesa lo que tú escribes en tu diario de oración para producir
        respuestas automáticas.
      </P>

      <H2>Cuánto tiempo guardamos tus datos</H2>
      <P>
        Mientras tu cuenta esté activa, guardamos tu información para que la app funcione con normalidad. Si cancelas o pides que
        eliminemos tu cuenta, borramos tus datos personales en un plazo máximo de 30 días, salvo la información que estemos
        obligados a conservar por ley (por ejemplo, registros de facturación).
      </P>

      <H2>Tus derechos</H2>
      <P>De acuerdo con la Ley 1581 de 2012 de Colombia (protección de datos personales), tienes derecho a:</P>
      <Ul>
        <li>Conocer, actualizar y rectificar tus datos.</li>
        <li>Pedir que eliminemos tu cuenta y tus datos personales.</li>
        <li>Retirar tu autorización para el tratamiento de tus datos en cualquier momento.</li>
        <li>Presentar quejas ante la Superintendencia de Industria y Comercio (SIC) si consideras que tus datos no se están manejando bien.</li>
      </Ul>
      <P>
        Para ejercer cualquiera de estos derechos, escríbenos a{' '}
        <a href="mailto:hola@jireh.app" className="font-semibold text-[var(--accent)] underline-offset-2 hover:underline">hola@jireh.app</a>.
        También puedes borrar tu cuenta desde <strong className="text-[var(--text-primary)]">Ajustes → Cuenta</strong> dentro de la app.
      </P>

      <H2>Autorización</H2>
      <P>
        Al crear tu cuenta en Jireh, autorizas el tratamiento de tus datos personales de acuerdo con esta política de privacidad.
      </P>

      <H2>Cambios a esta política</H2>
      <P>
        Si hacemos cambios importantes a esta política, te avisaremos por correo antes de que entren en vigencia. La fecha de
        arriba siempre indica la última actualización.
      </P>
    </LegalLayout>
  );
}
