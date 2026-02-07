'use server';

import { createAdminClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import type { BlogPost } from '@/types/database';

export async function getPosts() {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error);
    return { data: null, error: error.message };
  }

  return { data, error: null };
}

export async function getPost(id: string) {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching post:', error);
    return { data: null, error: error.message };
  }

  return { data, error: null };
}

export async function createPost(post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>) {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from('blog_posts')
    .insert(post)
    .select()
    .single();

  if (error) {
    console.error('Error creating post:', error);
    return { data: null, error: error.message };
  }

  revalidatePath('/admin/blog');
  revalidatePath('/blog');

  return { data, error: null };
}

export async function updatePost(id: string, updates: Partial<BlogPost>) {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from('blog_posts')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating post:', error);
    return { data: null, error: error.message };
  }

  revalidatePath('/admin/blog');
  revalidatePath('/blog');
  revalidatePath(`/blog/${data.category}/${data.slug}`);

  return { data, error: null };
}

export async function deletePost(id: string) {
  const supabase = createAdminClient();

  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting post:', error);
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/blog');
  revalidatePath('/blog');

  return { success: true, error: null };
}

export async function publishPost(id: string) {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from('blog_posts')
    .update({
      is_published: true,
      published_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error publishing post:', error);
    return { data: null, error: error.message };
  }

  revalidatePath('/admin/blog');
  revalidatePath('/blog');

  return { data, error: null };
}

export async function unpublishPost(id: string) {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from('blog_posts')
    .update({
      is_published: false,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error unpublishing post:', error);
    return { data: null, error: error.message };
  }

  revalidatePath('/admin/blog');
  revalidatePath('/blog');

  return { data, error: null };
}
