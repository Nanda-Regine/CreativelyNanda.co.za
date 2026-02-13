import { createAdminClient } from '@/lib/supabase/server';

const BUCKET_NAME = 'products';
const DOWNLOAD_EXPIRY_SECONDS = 7 * 24 * 60 * 60; // 7 days

/**
 * Generate a signed download URL for a file in Supabase Storage.
 * The URL expires after 7 days by default.
 */
export async function generateSignedUrl(
  filePath: string,
  expiresIn: number = DOWNLOAD_EXPIRY_SECONDS,
): Promise<{ url: string | null; error: string | null }> {
  const supabase = createAdminClient();

  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .createSignedUrl(filePath, expiresIn);

  if (error) {
    console.error('Error generating signed URL:', error);
    return { url: null, error: error.message };
  }

  return { url: data.signedUrl, error: null };
}

/**
 * Generate signed download URLs for all items in an order.
 * Returns an array of {name, url} for each product with a file_path.
 */
export async function generateOrderDownloadLinks(
  items: Array<{ name: string; file_path?: string }>,
): Promise<Array<{ name: string; url: string }>> {
  const links: Array<{ name: string; url: string }> = [];

  for (const item of items) {
    if (!item.file_path) continue;

    const { url } = await generateSignedUrl(item.file_path);
    if (url) {
      links.push({ name: item.name, url });
    }
  }

  return links;
}

/**
 * Look up the file_path for a product by its slug from the database.
 */
export async function getProductFilePath(
  productSlug: string,
): Promise<string | null> {
  const supabase = createAdminClient();

  const { data } = await supabase
    .from('products')
    .select('file_path')
    .eq('slug', productSlug)
    .single();

  return data?.file_path || null;
}

/**
 * Validate a download token and return the associated order.
 * Returns null if the token is invalid, expired, or the order is not completed.
 */
export async function validateDownloadToken(token: string) {
  const supabase = createAdminClient();

  const { data: order, error } = await supabase
    .from('orders')
    .select('*, products(name, slug, file_path)')
    .eq('download_token', token)
    .eq('status', 'completed')
    .single();

  if (error || !order) {
    return null;
  }

  // Check expiry
  if (order.download_expires_at && new Date(order.download_expires_at) < new Date()) {
    return null;
  }

  return order;
}

/**
 * Increment the download count for an order.
 */
export async function incrementDownloadCount(orderId: string) {
  const supabase = createAdminClient();

  const { data: order } = await supabase
    .from('orders')
    .select('download_count')
    .eq('id', orderId)
    .single();

  if (order) {
    await supabase
      .from('orders')
      .update({ download_count: (order.download_count || 0) + 1 })
      .eq('id', orderId);
  }
}
