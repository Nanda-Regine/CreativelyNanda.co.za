'use server';

import { createAdminClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import type { Product } from '@/types/database';

export async function getProducts() {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .neq('status', 'archived')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error);
    return { data: null, error: error.message };
  }

  return { data, error: null };
}

export async function getProduct(id: string) {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching product:', error);
    return { data: null, error: error.message };
  }

  return { data, error: null };
}

export async function createProduct(product: Omit<Product, 'id' | 'created_at' | 'updated_at'>) {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from('products')
    .insert(product)
    .select()
    .single();

  if (error) {
    console.error('Error creating product:', error);
    return { data: null, error: error.message };
  }

  revalidatePath('/admin/products');
  revalidatePath('/products');

  return { data, error: null };
}

export async function updateProduct(id: string, updates: Partial<Product>) {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from('products')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating product:', error);
    return { data: null, error: error.message };
  }

  revalidatePath('/admin/products');
  revalidatePath('/products');
  revalidatePath(`/products/${data.slug}`);

  return { data, error: null };
}

export async function deleteProduct(id: string) {
  const supabase = createAdminClient();

  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting product:', error);
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/products');
  revalidatePath('/products');

  return { success: true, error: null };
}
