'use server';

import { createAdminClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import type { Poem } from '@/types/database';

export async function getPoems() {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from('poems')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching poems:', error);
    return { data: null, error: error.message };
  }

  return { data, error: null };
}

export async function getPoem(id: string) {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from('poems')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching poem:', error);
    return { data: null, error: error.message };
  }

  return { data, error: null };
}

export async function createPoem(poem: Omit<Poem, 'id' | 'created_at' | 'heart_count'>) {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from('poems')
    .insert({ ...poem, heart_count: 0 })
    .select()
    .single();

  if (error) {
    console.error('Error creating poem:', error);
    return { data: null, error: error.message };
  }

  revalidatePath('/admin/poetry');
  revalidatePath('/poetry/collection');

  return { data, error: null };
}

export async function updatePoem(id: string, updates: Partial<Poem>) {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from('poems')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating poem:', error);
    return { data: null, error: error.message };
  }

  revalidatePath('/admin/poetry');
  revalidatePath('/poetry/collection');
  revalidatePath(`/poetry/collection/${data.slug}`);

  return { data, error: null };
}

export async function deletePoem(id: string) {
  const supabase = createAdminClient();

  const { error } = await supabase
    .from('poems')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting poem:', error);
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/poetry');
  revalidatePath('/poetry/collection');

  return { success: true, error: null };
}

export async function getPoemStats() {
  const supabase = createAdminClient();

  const { data: poems, error } = await supabase
    .from('poems')
    .select('heart_count, is_published');

  if (error) {
    console.error('Error fetching poem stats:', error);
    return { data: null, error: error.message };
  }

  const stats = {
    total: poems.length,
    published: poems.filter(p => p.is_published).length,
    totalHearts: poems.reduce((sum, p) => sum + (p.heart_count || 0), 0),
  };

  return { data: stats, error: null };
}
