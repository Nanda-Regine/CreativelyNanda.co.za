'use server';

import { createAdminClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import type { Order } from '@/types/database';

export async function getOrders() {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from('orders')
    .select('*, products(name, slug)')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching orders:', error);
    return { data: null, error: error.message };
  }

  return { data, error: null };
}

export async function getOrder(id: string) {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from('orders')
    .select('*, products(name, slug, price)')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching order:', error);
    return { data: null, error: error.message };
  }

  return { data, error: null };
}

export async function updateOrderStatus(id: string, status: Order['status']) {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating order status:', error);
    return { data: null, error: error.message };
  }

  revalidatePath('/admin/orders');

  return { data, error: null };
}

export async function getOrderStats() {
  const supabase = createAdminClient();

  const { data: orders, error } = await supabase
    .from('orders')
    .select('status, amount');

  if (error) {
    console.error('Error fetching order stats:', error);
    return { data: null, error: error.message };
  }

  const stats = {
    total: orders.length,
    completed: orders.filter(o => o.status === 'completed').length,
    pending: orders.filter(o => o.status === 'pending').length,
    failed: orders.filter(o => o.status === 'failed').length,
    revenue: orders
      .filter(o => o.status === 'completed')
      .reduce((sum, o) => sum + o.amount, 0),
  };

  return { data: stats, error: null };
}
