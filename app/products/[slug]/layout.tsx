import type { Metadata } from 'next';
import {
  createMetadata,
  generateProductJsonLd,
  generateBreadcrumbJsonLd,
  JsonLd,
} from '@/lib/seo';
import { getProductBySlug } from '@/lib/products';
import { createServerClient } from '@/lib/supabase/server';

async function getProductReviews(slug: string) {
  try {
    const supabase = createServerClient();

    // Get product ID
    const { data: product } = await supabase
      .from('products')
      .select('id, rating, review_count, purchase_count')
      .eq('slug', slug)
      .single();

    if (!product) return { reviews: [], rating: 0, reviewCount: 0, purchaseCount: 0 };

    // Get approved reviews
    const { data: reviews } = await supabase
      .from('testimonials')
      .select('author_name, rating, content, created_at')
      .eq('product_id', product.id)
      .eq('is_approved', true)
      .order('created_at', { ascending: false })
      .limit(50);

    return {
      reviews: reviews || [],
      rating: product.rating || 0,
      reviewCount: product.review_count || 0,
      purchaseCount: product.purchase_count || 0,
    };
  } catch {
    return { reviews: [], rating: 0, reviewCount: 0, purchaseCount: 0 };
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const productData = await getProductBySlug(params.slug);

  if (!productData) {
    return createMetadata({
      title: 'Product Not Found',
      description: 'The product you are looking for could not be found.',
      path: `/products/${params.slug}`,
      noIndex: true,
    });
  }

  const { product, description } = productData;

  return createMetadata({
    title: `${product.name} — Notion Template | Mirembe Muse`,
    description: description ? description.slice(0, 160) : product.tagline,
    path: `/products/${product.slug}`,
    ogType: 'website',
    ogImage: product.thumbnail || product.images?.[0] || undefined,
    keywords: [
      product.name,
      'Notion template South Africa',
      `${product.category} Notion template`,
      'digital product South Africa',
      'Mirembe Muse',
      'buy Notion template ZAR',
      'South African productivity tools',
      'CreativelyNanda',
    ],
  });
}

export default async function ProductDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  const productData = await getProductBySlug(params.slug);

  if (!productData) return <>{children}</>;

  const { product, description } = productData;

  // All products sold on this site are Mirembe Muse branded (Notion templates + creative work)
  const brand = 'Mirembe Muse';

  // Fetch real reviews from Supabase for structured data
  const { reviews, rating, reviewCount, purchaseCount } = await getProductReviews(params.slug);

  const productJsonLd = generateProductJsonLd({
    name: product.name,
    description: description || product.tagline,
    slug: product.slug,
    price: product.price,
    originalPrice: product.originalPrice,
    currency: 'ZAR',
    category: product.category,
    status: product.status || 'live',
    rating: rating || product.rating,
    reviewCount: reviewCount || product.reviewCount,
    brand,
    purchaseCount,
    reviews: reviews.map((r) => ({
      authorName: r.author_name,
      rating: r.rating || 5,
      content: r.content,
      datePublished: r.created_at,
    })),
  });

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: product.name, path: `/products/${product.slug}` },
  ]);

  return (
    <>
      <JsonLd data={productJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      {children}
    </>
  );
}
