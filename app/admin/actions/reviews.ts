'use server';

import { createAdminClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function getAllBlogReviews() {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from('blog_reviews')
    .select(`
      *,
      blog_posts (title, slug)
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching reviews:', error);
    return { data: null, error: error.message };
  }

  return { data, error: null };
}

export async function deleteBlogReview(id: string) {
  const supabase = createAdminClient();

  const { error } = await supabase
    .from('blog_reviews')
    .delete()
    .eq('id', id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/blog/reviews');
  return { success: true, error: null };
}

export async function toggleReviewFeatured(id: string, isFeatured: boolean) {
  const supabase = createAdminClient();

  const { error } = await supabase
    .from('blog_reviews')
    .update({ is_featured: isFeatured })
    .eq('id', id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/blog/reviews');
  return { success: true, error: null };
}

export async function getAllProductReviews() {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from('testimonials')
    .select(`
      *,
      products (name, slug)
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching product reviews:', error);
    return { data: null, error: error.message };
  }

  return { data, error: null };
}

export async function deleteProductReview(id: string) {
  const supabase = createAdminClient();

  const { error } = await supabase
    .from('testimonials')
    .delete()
    .eq('id', id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/reviews');
  return { success: true, error: null };
}
