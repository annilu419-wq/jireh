import 'server-only';

// Cliente de Supabase para el SERVIDOR (Server Components, Route Handlers, Server
// Actions). Lee/escribe la sesión en cookies. Sigue usando la publishable key +
// el JWT del usuario en la cookie → RLS aplica con su identidad real.

import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { publicEnv } from '@/lib/env';

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(publicEnv.supabaseUrl, publicEnv.supabasePublishableKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Llamado desde un Server Component: lo ignoramos. El refresh de sesión
          // lo hace el middleware (proxy.ts).
        }
      },
    },
  });
}

// Cliente con la SECRET key — salta RLS. Solo para tareas de servidor de confianza
// (webhooks de Hotmart, jobs). NUNCA para responder peticiones del usuario final.
export async function createAdminClient() {
  const { serverEnv } = await import('@/lib/env');
  const { supabaseUrl, supabaseSecretKey } = serverEnv();
  const { createClient: createRawClient } = await import('@supabase/supabase-js');
  return createRawClient(supabaseUrl, supabaseSecretKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
