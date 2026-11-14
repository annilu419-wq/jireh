'use client';

// Lista de espera de pre-lanzamiento. Solo pide el correo (sin cobro, sin cuenta).
// Es el enlace que va en la bio de Instagram/TikTok mientras la app no abre al público.
// Estados: idle / enviando / listo / error. Trampa anti-bots: campo "empresa" oculto.

import { useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { Compass, Clock, HeartHandshake, Check } from 'lucide-react';
import { FunnelBrand } from '@/components/funnel/ui';

const BENEFICIOS = [
  { Icon: Compass, titulo: 'En orden', texto: 'La historia de la Biblia de principio a fin, sin perderte.' },
  { Icon: Clock, titulo: '5 minutos al día', texto: 'Quién escribe, cuándo y a quién, antes de cada lectura.' },
  { Icon: HeartHandshake, titulo: 'Sin culpa', texto: 'Si un día fallas, vuelves donde te quedaste.' },
] as const;

export default function ListaDeEspera() {
  const reduce = useReducedMotion();
  const [email, setEmail] = useState('');
  const [nombre, setNombre] = useState('');
  const [empresa, setEmpresa] = useState(''); // trampa: una persona nunca lo ve ni lo llena
  const [estado, setEstado] = useState<'idle' | 'enviando' | 'listo' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const valido = /\S+@\S+\.\S+/.test(email);

  const enviar = async () => {
    if (!valido || estado === 'enviando') return;
    setEstado('enviando');
    setErrorMsg('');
    const o = new URLSearchParams(window.location.search).get('o') ?? 'directo';
    try {
      const res = await fetch('/api/lista-espera', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, nombre, empresa, origen: o }),
      });
      if (res.ok) {
        setEstado('listo');
        return;
      }
      setEstado('error');
      setErrorMsg(
        res.status === 400
          ? 'Revisa que tu correo esté bien escrito.'
          : res.status === 429
            ? 'Hiciste muchos intentos. Espera unos minutos y vuelve a probar.'
            : 'No pudimos guardar tu correo. Intenta de nuevo en un momento.',
      );
    } catch {
      setEstado('error');
      setErrorMsg('Sin conexión. Revisa tu internet e intenta de nuevo.');
    }
  };

  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
  } as const;

  return (
    <div className="relative mx-auto flex min-h-dvh w-full max-w-md flex-col overflow-hidden bg-[var(--bg)] px-4 text-[var(--text-primary)] [font-family:var(--font-body)]">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(520px 380px at 100% 0%, color-mix(in oklab, var(--accent) 12%, transparent), transparent 70%), radial-gradient(420px 320px at 0% 100%, color-mix(in oklab, var(--accent-2) 8%, transparent), transparent 70%)',
        }}
      />
      <div className="relative px-1 pt-5"><FunnelBrand /></div>

      {estado === 'listo' ? (
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex flex-1 flex-col items-center justify-center text-center"
        >
          <span aria-hidden="true" className="grid size-16 place-items-center rounded-full bg-[color-mix(in_oklab,var(--ok)_16%,transparent)]">
            <Check size={30} color="var(--ok)" strokeWidth={2.4} />
          </span>
          <h1 className="mt-6 text-[26px] font-bold leading-[1.15] tracking-[-0.02em] [font-family:var(--font-display)]">
            ¡Estás en la lista!
          </h1>
          <p className="mt-3 max-w-[30ch] text-[15px] leading-relaxed text-[var(--text-secondary)]">
            Te escribimos a <span className="font-semibold text-[var(--text-primary)]">{email.trim()}</span> el día que Jireh abra.
            Mientras tanto, síguenos en Instagram y TikTok:{' '}
            <span className="font-semibold text-[var(--accent)]">@jirehbibliaapp</span>
          </p>
        </motion.div>
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: reduce ? 0 : 0.07 }}
          className="relative flex flex-1 flex-col justify-center py-8"
        >
          <motion.p variants={item} className="text-[12px] font-bold uppercase tracking-[0.12em] text-[var(--accent)]">
            Muy pronto
          </motion.p>
          <motion.h1 variants={item} className="mt-2 text-[32px] font-extrabold leading-[1.1] tracking-[-0.03em] [font-family:var(--font-display)]">
            Entiende la Biblia <span className="text-[var(--accent)]">en orden</span>, en 5 minutos al día
          </motion.h1>
          <motion.p variants={item} className="mt-3 text-[15px] leading-relaxed text-[var(--text-secondary)]">
            No te falta fe: te faltaba un mapa. Apúntate y te avisamos primero cuando Jireh abra.
          </motion.p>

          <motion.ul variants={item} className="mt-6 space-y-3">
            {BENEFICIOS.map(({ Icon, titulo, texto }) => (
              <li key={titulo} className="flex items-start gap-3">
                <span aria-hidden="true" className="grid size-10 shrink-0 place-items-center rounded-[12px] bg-[color-mix(in_oklab,var(--accent)_10%,transparent)]">
                  <Icon size={20} color="var(--accent)" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[15px] font-semibold">{titulo}</span>
                  <span className="block text-[13px] leading-snug text-[var(--text-secondary)]">{texto}</span>
                </span>
              </li>
            ))}
          </motion.ul>

          <motion.form
            variants={item}
            noValidate
            onSubmit={(e) => { e.preventDefault(); enviar(); }}
            className="mt-7"
          >
            {/* trampa anti-bots: fuera de la vista y del teclado */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label>Empresa<input tabIndex={-1} autoComplete="off" value={empresa} onChange={(e) => setEmpresa(e.target.value)} /></label>
            </div>

            <input
              type="text"
              autoComplete="given-name"
              placeholder="Tu nombre (opcional)"
              value={nombre}
              maxLength={80}
              onChange={(e) => setNombre(e.target.value)}
              aria-label="Tu nombre (opcional)"
              className="h-[52px] w-full rounded-[var(--radius-button)] border border-[color-mix(in_oklab,var(--text-tertiary)_30%,transparent)] bg-[var(--surface)] px-4 text-[16px] outline-none focus-visible:border-[var(--accent)]"
            />
            <input
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="tu@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Tu correo"
              aria-invalid={estado === 'error'}
              className="mt-2.5 h-[52px] w-full rounded-[var(--radius-button)] border border-[color-mix(in_oklab,var(--text-tertiary)_30%,transparent)] bg-[var(--surface)] px-4 text-[16px] outline-none focus-visible:border-[var(--accent)]"
            />
            <motion.button
              type="submit"
              disabled={!valido || estado === 'enviando'}
              whileTap={{ scale: reduce ? 1 : 0.97 }}
              className="mt-3 flex h-[56px] w-full items-center justify-center rounded-[var(--radius-button)] bg-[var(--accent)] text-[16px] font-semibold text-[var(--bg)] shadow-[0_8px_24px_color-mix(in_oklab,var(--accent)_30%,transparent)] disabled:opacity-60 [touch-action:manipulation]"
            >
              {estado === 'enviando' ? 'Guardando…' : 'Avisarme cuando abra'}
            </motion.button>

            {estado === 'error' && (
              <p role="alert" className="mt-3 text-[13px] text-[var(--error)]">{errorMsg}</p>
            )}

            <p className="mt-4 text-[12px] leading-snug text-[var(--text-tertiary)]">
              Solo te escribimos cuando Jireh abra. Sin spam. Lee nuestra{' '}
              <Link href="/privacidad" className="underline underline-offset-2">política de privacidad</Link>.
            </p>
          </motion.form>
        </motion.div>
      )}
      <div className="pb-8" />
    </div>
  );
}
