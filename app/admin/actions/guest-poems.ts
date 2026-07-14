'use server';

import { createAdminClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { sendPoemBloomedEmail } from '@/lib/email/send-poem-bloomed';

export interface GuestPoem {
  id: string;
  title: string;
  content: string;
  author_name: string | null;
  author_email: string | null;
  is_anonymous: boolean;
  status: 'pending' | 'approved' | 'featured' | 'rejected';
  session_id: string | null;
  created_at: string;
}

export async function getGuestPoems() {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from('guest_poems')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching guest poems:', error);
    return { data: null, error: error.message };
  }

  return { data: data as GuestPoem[], error: null };
}

export async function setGuestPoemStatus(id: string, status: GuestPoem['status']) {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from('guest_poems')
    .update({ status })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating guest poem:', error);
    return { data: null, error: error.message };
  }

  const poem = data as GuestPoem;

  // The heartbeat: tell the writer their poem bloomed (best-effort, never blocks).
  if ((status === 'approved' || status === 'featured') && poem.author_email) {
    try {
      await sendPoemBloomedEmail({
        to: poem.author_email,
        authorName: poem.author_name,
        title: poem.title,
        featured: status === 'featured',
      });
    } catch (e) {
      console.error('poem-bloomed email failed (non-blocking):', e);
    }
  }

  revalidatePath('/admin/guest-poems');
  revalidatePath('/poetry/community');

  return { data: poem, error: null };
}

export async function deleteGuestPoem(id: string) {
  const supabase = createAdminClient();

  const { error } = await supabase.from('guest_poems').delete().eq('id', id);

  if (error) {
    console.error('Error deleting guest poem:', error);
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/guest-poems');
  revalidatePath('/poetry/community');

  return { success: true, error: null };
}
