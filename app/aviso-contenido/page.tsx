import { LegalLayout, H2, P, Ul } from '@/components/legal/LegalLayout';

export default function Page() {
  return (
    <LegalLayout titulo="Aviso sobre el contenido" actualizado="23 de septiembre de 2026">
      <P>
        Queremos ser transparentes sobre cómo se hace el contenido dentro de Jireh, y qué tipo de acompañamiento puedes esperar
        de la app.
      </P>

      <H2>Texto bíblico</H2>
      <P>
        El texto completo de la Biblia dentro de Jireh usa la versión <strong className="text-[var(--text-primary)]">Reina-Valera
        1909</strong>, de dominio público, con una modernización mínima y solo ortográfica (por ejemplo, tildes antiguas
        eliminadas) que no cambia ni una palabra del sentido original.
      </P>

      <H2>Contexto y enseñanza de cada capítulo</H2>
      <P>
        Las fichas de contexto (autor, época, lugar) y las enseñanzas de cada capítulo son escritas y revisadas por personas.
        Pueden usar herramientas de Inteligencia Artificial como apoyo en el proceso de redacción de borradores, pero todo el
        contenido final es revisado y aprobado antes de publicarse — no se genera ni se muestra en tiempo real sin revisión
        humana.
      </P>

      <H2>Imágenes generadas con Inteligencia Artificial</H2>
      <P>
        Las portadas ilustradas de los libros de la Biblia dentro de Jireh se generan con herramientas de Inteligencia
        Artificial, siguiendo reglas estrictas: nunca muestran el rostro de Jesús ni de figuras bíblicas en primer plano, no
        incluyen texto, y buscan un estilo sereno y respetuoso, sin escenas violentas. Cada imagen es revisada antes de
        publicarse.
      </P>

      <H2>Enfoque neutro e interdenominacional</H2>
      <P>
        Jireh no representa a ninguna iglesia, denominación o corriente teológica en particular. El contenido se centra en los
        Evangelios, la vida de Jesús y el contexto histórico de cada capítulo, evitando tomar posición en debates doctrinales
        específicos entre distintas tradiciones cristianas.
      </P>

      <H2>El "Modo Calma"</H2>
      <P>
        El Modo Calma de Jireh ofrece un pasaje bíblico, una respiración guiada y una oración corta para momentos de ansiedad,
        tristeza o culpa. Es un espacio de acompañamiento, <strong className="text-[var(--text-primary)]">no reemplaza ayuda
        profesional de salud mental</strong>. Si estás pasando por una crisis emocional o de salud mental seria, por favor
        contacta a un profesional o a una línea de ayuda de emergencia en tu país.
      </P>

      <H2>No es consejo profesional</H2>
      <Ul>
        <li>Jireh no ofrece consejo médico, psicológico, legal ni financiero.</li>
        <li>El contenido devocional es orientación espiritual general, no dirección personalizada para tu situación específica.</li>
        <li>Para decisiones importantes de salud, dinero o relaciones, siempre consulta con un profesional calificado o con líderes de tu propia comunidad de fe.</li>
      </Ul>
    </LegalLayout>
  );
}
