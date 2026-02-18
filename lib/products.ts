import { createServerClient } from '@/lib/supabase/server';
import type { Product, ProductFeature, ProductFAQ } from '@/types/database';
import type { ProductCoverData } from '@/components/marketplace';
import { ALL_PRODUCTS, PRODUCTS_DB, RELATED_PRODUCTS, type ProductDetail } from '@/lib/products-data';

/**
 * Convert a Supabase Product row to ProductCoverData for listing cards
 */
function toProductCoverData(p: Product): ProductCoverData {
  return {
    slug: p.slug,
    name: p.name,
    tagline: p.tagline || '',
    price: Math.round(p.price / 100), // DB stores cents, UI expects rands
    originalPrice: p.original_price ? Math.round(p.original_price / 100) : undefined,
    category: p.category.charAt(0).toUpperCase() + p.category.slice(1), // capitalize
    rating: p.rating || undefined,
    reviewCount: p.review_count || undefined,
    badge: (p.badge as ProductCoverData['badge']) || undefined,
    status: p.status === 'coming-soon' ? 'coming-soon' : p.status === 'live' ? 'live' : undefined,
  };
}

/**
 * Convert a Supabase Product row to full ProductDetail for detail pages
 */
function toProductDetail(p: Product): ProductDetail {
  return {
    product: toProductCoverData(p),
    description: p.description || p.tagline || '',
    features: (p.features as ProductFeature[]) || [],
    faqs: (p.faqs as ProductFAQ[]) || [],
    testimonials: [], // Reviews come from testimonials table separately
  };
}

/**
 * Fetch all live products from Supabase, falling back to hardcoded data
 */
export async function getAllProducts(): Promise<ProductCoverData[]> {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('status', 'live')
      .order('is_featured', { ascending: false })
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      console.warn('Supabase products fetch failed or empty, using hardcoded fallback');
      return ALL_PRODUCTS;
    }

    return data.map(toProductCoverData);
  } catch {
    console.warn('Supabase connection failed, using hardcoded fallback');
    return ALL_PRODUCTS;
  }
}

/**
 * Fetch a single product by slug from Supabase, falling back to hardcoded data
 */
export async function getProductBySlug(slug: string): Promise<ProductDetail | undefined> {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'live')
      .single();

    if (error || !data) {
      // Fallback to hardcoded
      return getHardcodedProduct(slug);
    }

    return toProductDetail(data);
  } catch {
    return getHardcodedProduct(slug);
  }
}

/**
 * Fetch related products (same category, excluding current), falling back to hardcoded
 */
export async function getRelatedProducts(slug: string, category: string): Promise<ProductCoverData[]> {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('status', 'live')
      .eq('category', category.toLowerCase())
      .neq('slug', slug)
      .limit(3);

    if (error || !data || data.length === 0) {
      // If no same-category results, try any category
      const { data: fallbackData } = await supabase
        .from('products')
        .select('*')
        .eq('status', 'live')
        .neq('slug', slug)
        .limit(3);

      if (fallbackData && fallbackData.length > 0) {
        return fallbackData.map(toProductCoverData);
      }

      return RELATED_PRODUCTS;
    }

    return data.map(toProductCoverData);
  } catch {
    return RELATED_PRODUCTS;
  }
}

/**
 * Hardcoded fallback for getProductBySlug
 */
function getHardcodedProduct(slug: string): ProductDetail | undefined {
  if (PRODUCTS_DB[slug]) return PRODUCTS_DB[slug];

  const listing = ALL_PRODUCTS.find(p => p.slug === slug);
  if (listing) {
    return {
      product: listing,
      description: listing.tagline,
      features: [],
      faqs: [],
      testimonials: [],
    };
  }

  return undefined;
}
