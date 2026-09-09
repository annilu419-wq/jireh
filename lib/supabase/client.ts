'use client';

// Cliente de Supabase para el NAVEGADOR. Usa la publishable key (pública por
// diseño — RLS protege cada fila). Todo acceso a datos pasa por RLS.

import { createBrowserClient } from '@supabase/ssr';
import { publicEnv } from '@/lib/env';

export function createClient() {
  return createBrowserClient(publicEnv.supabaseUrl, publicEnv.supabasePublishableKey);
}
