'use client';

// Capa de datos del usuario (Sesión 6). Lee/escribe Supabase con la sesión del
// navegador → RLS garantiza que cada persona solo toca SUS filas. El CONTENIDO
// (capítulos, enseñanzas, libros, Calma) sigue en lib/contenido.ts / lib/biblia.ts:
// es pre-producido, no dato de usuario.

import { createClient } from '@/lib/supabase/client';
import type { Peticion } from '@/lib/contenido';

const hoyISO = () => new Date().toISOString().slice(0, 10);

/** Etiqueta relativa a partir de un timestamp ("hoy", "ayer", "hace 3 días", "12 ago"). */
export function fechaRelativa(ts: string | null): string {
  if (!ts) return '';
  const d = new Date(ts);
  const dias = Math.floor((Date.now() - d.getTime()) / 86_400_000);
  if (dias <= 0) return 'hoy';
  if (dias === 1) return 'ayer';
  if (dias < 7) return `hace ${dias} días`;
  if (dias < 30) return `hace ${Math.floor(dias / 7)} semanas`;
  return d.toLocaleDateString('es', { day: 'numeric', month: 'short' });
}

export async function usuarioActual() {
  const { data } = await createClient().auth.getUser();
  return data.user;
}

/* ─────────────────────────── Diario ─────────────────────────── */

type FilaPeticion = {
  id: string;
  tipo: 'peticion' | 'gratitud';
  titulo: string;
  nota: string | null;
  estado: 'pendiente' | 'respondida';
  creada_at: string;
  respondida_at: string | null;
};

const aPeticion = (r: FilaPeticion): Peticion => ({
  id: r.id,
  tipo: r.tipo,
  titulo: r.titulo,
  nota: r.nota ?? undefined,
  estado: r.estado,
  creada: fechaRelativa(r.creada_at),
  respondida: r.respondida_at ? fechaRelativa(r.respondida_at) : undefined,
});

export async function listarPeticiones(): Promise<Peticion[]> {
  const { data, error } = await createClient()
    .from('peticiones')
    .select('id,tipo,titulo,nota,estado,creada_at,respondida_at')
    .order('creada_at', { ascending: false });
  if (error) throw error;
  return (data as FilaPeticion[]).map(aPeticion);
}

export async function crearPeticion(input: {
  tipo: 'peticion' | 'gratitud';
  titulo: string;
  nota?: string;
}): Promise<Peticion> {
  const user = await usuarioActual();
  if (!user) throw new Error('sin sesión');
  const { data, error } = await createClient()
    .from('peticiones')
    .insert({ user_id: user.id, tipo: input.tipo, titulo: input.titulo, nota: input.nota ?? null })
    .select('id,tipo,titulo,nota,estado,creada_at,respondida_at')
    .single();
  if (error) throw error;
  return aPeticion(data as FilaPeticion);
}

export async function marcarRespondidaDB(id: string, respondida: boolean) {
  const { error } = await createClient()
    .from('peticiones')
    .update({
      estado: respondida ? 'respondida' : 'pendiente',
      respondida_at: respondida ? new Date().toISOString() : null,
    })
    .eq('id', id);
  if (error) throw error;
}

export async function borrarPeticion(id: string) {
  const { error } = await createClient().from('peticiones').delete().eq('id', id);
  if (error) throw error;
}

/** La petición pendiente más vieja (≥3 días) — para el recordatorio de "Hoy"
 * ("hace X días pediste por Y"). null si no hay ninguna que califique. */
export async function getPeticionParaRecordar(): Promise<Peticion | null> {
  const limite = new Date(Date.now() - 3 * 86_400_000).toISOString();
  const { data, error } = await createClient()
    .from('peticiones')
    .select('id,tipo,titulo,nota,estado,creada_at,respondida_at')
    .eq('tipo', 'peticion')
    .eq('estado', 'pendiente')
    .lte('creada_at', limite)
    .order('creada_at', { ascending: true })
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  return data ? aPeticion(data as FilaPeticion) : null;
}

/* ─────────────────────────── Racha / día completo ─────────────────────────── */

export interface ResumenHoy {
  racha: number;
  mejorRacha: number;
  totalDias: number;
  completadoHoy: boolean;
}

export async function getResumenHoy(): Promise<ResumenHoy> {
  const sb = createClient();
  const [{ data: s }, { data: dia }] = await Promise.all([
    sb.from('streak').select('actual,mejor,total_dias').maybeSingle(),
    sb.from('dia_completado').select('fecha').eq('fecha', hoyISO()).maybeSingle(),
  ]);
  return {
    racha: s?.actual ?? 0,
    mejorRacha: s?.mejor ?? 0,
    totalDias: s?.total_dias ?? 0,
    completadoHoy: !!dia,
  };
}

/** Marca el día como completo y recalcula la racha. Idempotente por día. */
export async function marcarDiaCompleto(libro: string, capitulo: number): Promise<ResumenHoy> {
  const user = await usuarioActual();
  if (!user) throw new Error('sin sesión');
  const sb = createClient();
  const hoy = hoyISO();

  const { data: yaHoy } = await sb.from('dia_completado').select('id').eq('fecha', hoy).maybeSingle();
  if (yaHoy) return getResumenHoy();

  await sb.from('dia_completado').insert({ user_id: user.id, fecha: hoy, libro, capitulo });

  const { data: s } = await sb.from('streak').select('actual,mejor,total_dias,ultimo_dia').maybeSingle();
  const ayer = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10);
  const seguido = s?.ultimo_dia === ayer;
  const actual = seguido ? (s?.actual ?? 0) + 1 : 1;
  const mejor = Math.max(s?.mejor ?? 0, actual);
  const total = (s?.total_dias ?? 0) + 1;

  await sb
    .from('streak')
    .upsert({ user_id: user.id, actual, mejor, total_dias: total, ultimo_dia: hoy, updated_at: new Date().toISOString() });

  return { racha: actual, mejorRacha: mejor, totalDias: total, completadoHoy: true };
}

export async function deshacerDiaCompleto(): Promise<ResumenHoy> {
  const user = await usuarioActual();
  if (!user) throw new Error('sin sesión');
  const sb = createClient();
  const hoy = hoyISO();

  await sb.from('dia_completado').delete().eq('fecha', hoy);

  const { data: s } = await sb.from('streak').select('actual,mejor,total_dias,ultimo_dia').maybeSingle();
  if (s?.ultimo_dia === hoy) {
    const actual = Math.max(0, (s.actual ?? 1) - 1);
    const total = Math.max(0, (s.total_dias ?? 1) - 1);
    const ayer = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10);
    await sb
      .from('streak')
      .update({ actual, total_dias: total, ultimo_dia: actual > 0 ? ayer : null, updated_at: new Date().toISOString() })
      .eq('user_id', user.id);
    return { racha: actual, mejorRacha: s.mejor ?? actual, totalDias: total, completadoHoy: false };
  }
  return getResumenHoy();
}

/* ─────────────────────────── Ruta ─────────────────────────── */

export interface RutaDB {
  libro: string;
  capitulo: number;
  progreso: number;
}

export async function getRuta(): Promise<RutaDB> {
  const { data } = await createClient()
    .from('ruta_progreso')
    .select('libro,capitulo,progreso')
    .maybeSingle();
  return { libro: data?.libro ?? 'Génesis', capitulo: data?.capitulo ?? 1, progreso: data?.progreso ?? 0 };
}

/** Avanza la Ruta al capítulo indicado. Se llama al completar el día. */
export async function avanzarRuta(libro: string, capitulo: number, progreso: number) {
  const user = await usuarioActual();
  if (!user) throw new Error('sin sesión');
  const { error } = await createClient()
    .from('ruta_progreso')
    .upsert({ user_id: user.id, libro, capitulo, progreso, updated_at: new Date().toISOString() });
  if (error) throw error;
}

/* ─────────────────────────── Perfil + ajustes ─────────────────────────── */

export interface Ajustes {
  recordatorio: boolean;
  hora: string;
  vibracion: boolean;
  avisoRacha: boolean;
}

export interface PerfilDB {
  nombre: string;
  inicial: string;
  ajustes: Ajustes;
  racha: number;
  mejorRacha: number;
  totalDias: number;
  ruta: RutaDB;
}

export async function getPerfil(): Promise<PerfilDB> {
  const sb = createClient();
  const [{ data: p }, { data: st }, { data: sk }, ruta] = await Promise.all([
    sb.from('profiles').select('nombre,inicial').maybeSingle(),
    sb.from('settings').select('recordatorio,hora,vibracion,aviso_racha').maybeSingle(),
    sb.from('streak').select('actual,mejor,total_dias').maybeSingle(),
    getRuta(),
  ]);
  return {
    nombre: p?.nombre ?? 'Amig@',
    inicial: p?.inicial ?? 'Y',
    ajustes: {
      recordatorio: st?.recordatorio ?? true,
      hora: st?.hora ?? '07:00',
      vibracion: st?.vibracion ?? true,
      avisoRacha: st?.aviso_racha ?? true,
    },
    racha: sk?.actual ?? 0,
    mejorRacha: sk?.mejor ?? 0,
    totalDias: sk?.total_dias ?? 0,
    ruta,
  };
}

export async function guardarAjustes(patch: Partial<Ajustes>) {
  const user = await usuarioActual();
  if (!user) throw new Error('sin sesión');
  const fila: Record<string, unknown> = { user_id: user.id, updated_at: new Date().toISOString() };
  if (patch.recordatorio !== undefined) fila.recordatorio = patch.recordatorio;
  if (patch.hora !== undefined) fila.hora = patch.hora;
  if (patch.vibracion !== undefined) fila.vibracion = patch.vibracion;
  if (patch.avisoRacha !== undefined) fila.aviso_racha = patch.avisoRacha;
  const { error } = await createClient().from('settings').upsert(fila);
  if (error) throw error;
}
