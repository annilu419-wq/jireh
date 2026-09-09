'use client';

// Login (blueprint E de 50) — último paso del funnel, después del paywall.
// Sin contraseñas: enlace de acceso por email (magic link, Supabase) + Google OAuth.
// Estados: idle / enviando / enviado / error.

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, useReducedMotion } from 'motion/react';
import { Lock } from 'lucide-react';
import { FunnelBrand } from '@/components/funnel/ui';
import { createClient } from '@/lib/supabase/client';

function EntrarInner() {
  const params = useSearchParams();
  const from = params.get('from');
  const reduce = useReducedMotion();
  const [email, setEmail] = useState('');
  const [estado, setEstado] = useState<'idle' | 'enviando' | 'enviado' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [cd, setCd] = useState(0);

  useEffect(() => {
    if (params.get('error') === 'enlace') {
      setEstado('error');
      setErrorMsg('Ese enlace ya venció o se usó. Pide uno nuevo.');
    }
  }, [params]);

  useEffect(() => {
    if (cd <= 0) return;
    const t = window.setTimeout(() => setCd((c) => c - 1), 1000);
    return () => window.clearTimeout(t);
  }, [cd]);

  const valido = /\S+@\S+\.\S+/.test(email);
  const redirectTo =
    typeof window !== 'undefined' ? `${window.location.origin}/auth/callback` : undefined;

  const enviar = async () => {
    if (!valido || estado === 'enviando') return;
    setEstado('enviando');
    setErrorMsg('');
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: redirectTo },
    });
    if (error) {
      setEstado('error');
      setErrorMsg('No pudimos enviar el enlace. Revisa el correo e intenta de nuevo.');
      return;
    }
    setEstado('enviado');
    setCd(60);
  };

  const conGoogle = async () => {
    setErrorMsg('');
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo },
    });
    if (error) {
      setEstado('error');
      setErrorMsg('El acceso con Google aún no está disponible. Usa tu correo por ahora.');
    }
  };

  const porque =
    from === 'pago'
      ? 'Para guardar tu prueba y ver tu Ruta en cualquier dispositivo.'
      : from === 'gratis'
        ? 'Para guardar tu Ruta y empezar gratis con un capítulo cada pocos días.'
        : 'Para guardarla y verla en cualquier dispositivo.';

  const stagger = {
    hidden: { opacity: 0, y: reduce ? 0 : 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
  } as const;

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col bg-[var(--bg)] px-4 text-[var(--text-primary)] [font-family:var(--font-body)]">
      <div className="px-1 pt-5"><FunnelBrand /></div>

      {estado === 'enviado' ? (
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <span aria-hidden="true" className="grid size-14 place-items-center rounded-full bg-[color-mix(in_oklab,var(--accent)_14%,transparent)]">
            <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16v16H4Z" /><path d="m4 6 8 7 8-7" /></svg>
          </span>
          <h1 className="mt-5 text-[24px] font-bold tracking-[-0.02em] [font-family:var(--font-display)]">Revisa tu correo</h1>
          <p className="mt-2 max-w-[32ch] text-[15px] leading-relaxed text-[var(--text-secondary)]">
            Te enviamos un enlace de acceso a <span className="font-semibold text-[var(--text-primary)]">{email}</span>. Ábrelo desde este teléfono.
          </p>
          <button
            type="button"
            disabled={cd > 0}
            onClick={enviar}
            className="mt-6 text-[13px] font-semibold text-[var(--accent)] disabled:text-[var(--text-tertiary)] [touch-action:manipulation]"
          >
            {cd > 0 ? `Reenviar en ${cd}s` : 'Reenviar enlace'}
          </button>
          <p className="mt-8 max-w-[34ch] text-[11px] text-[var(--text-tertiary)]">
            ¿No llega? Revisa la carpeta de spam. El enlace vale 1 hora y un solo uso.
          </p>
        </div>
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: reduce ? 0 : 0.06 }}
          className="flex flex-1 flex-col justify-center"
        >
          <motion.h1 variants={stagger} className="text-[26px] font-bold leading-[1.14] tracking-[-0.02em] [font-family:var(--font-display)]">
            Entra a tu <span className="text-[var(--accent)]">Ruta</span>
          </motion.h1>
          <motion.p variants={stagger} className="mt-2 text-[15px] text-[var(--text-secondary)]">{porque}</motion.p>

          <motion.input
            variants={stagger}
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="tu@correo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') enviar(); }}
            aria-label="Tu correo"
            className="mt-6 h-[52px] w-full rounded-[var(--radius-button)] border border-[color-mix(in_oklab,var(--text-tertiary)_30%,transparent)] bg-[var(--surface)] px-4 text-[15px] outline-none focus-visible:border-[var(--accent)]"
          />

          <motion.button
            variants={stagger}
            type="button"
            onClick={enviar}
            disabled={!valido || estado === 'enviando'}
            whileTap={{ scale: reduce ? 1 : 0.97 }}
            className="mt-3 flex h-[54px] w-full items-center justify-center rounded-[var(--radius-button)] bg-[var(--accent)] text-[16px] font-semibold text-[var(--bg)] shadow-[0_8px_24px_color-mix(in_oklab,var(--accent)_30%,transparent)] disabled:opacity-60 [touch-action:manipulation]"
          >
            {estado === 'enviando' ? 'Enviando…' : 'Enviarme mi enlace de acceso'}
          </motion.button>

          <motion.button
            variants={stagger}
            type="button"
            onClick={conGoogle}
            whileTap={{ scale: reduce ? 1 : 0.97 }}
            className="mt-3 flex h-[52px] w-full items-center justify-center gap-2.5 rounded-[var(--radius-button)] border border-[color-mix(in_oklab,var(--text-tertiary)_30%,transparent)] bg-[var(--surface)] text-[15px] font-semibold text-[var(--text-primary)] [touch-action:manipulation]"
          >
            <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.57c2.08-1.92 3.28-4.74 3.28-8.09Z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.76c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" /><path fill="#FBBC05" d="M5.84 14.09a6.6 6.6 0 0 1 0-4.18V7.07H2.18a11 11 0 0 0 0 9.86l3.66-2.84Z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z" /></svg>
            Continuar con Google
          </motion.button>

          {estado === 'error' && (
            <motion.p variants={stagger} role="alert" className="mt-3 text-[13px] text-[var(--error)]">
              {errorMsg || 'Algo salió mal. Intenta de nuevo.'}
            </motion.p>
          )}

          <motion.p variants={stagger} className="mt-6 flex items-center gap-1.5 text-[12px] text-[var(--text-tertiary)]">
            <Lock size={13} aria-hidden="true" />
            Sin contraseñas: te llega un enlace de un solo uso.
          </motion.p>
        </motion.div>
      )}
      <div className="pb-8" />
    </div>
  );
}

export default function Entrar() {
  return (
    <Suspense fallback={<div className="min-h-dvh bg-[var(--bg)]" />}>
      <EntrarInner />
    </Suspense>
  );
}
