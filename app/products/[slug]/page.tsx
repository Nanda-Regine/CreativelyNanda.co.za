import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getProductBySlug, getRelatedProducts } from '@/lib/products';
import ProductDetailClient from './ProductDetailClient';
import { formatPrice } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const productData = await getProductBySlug(params.slug);
  if (!productData) return {};

  const { product } = productData;
  const title = `${product.name} | Mirembe Muse — Notion Templates for Africa`;
  const description = `${product.tagline ?? product.name}. ${formatPrice(product.price)}. Instant delivery, lifetime access. Built for African students, entrepreneurs, and creators.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      images: product.thumbnail ? [{ url: product.thumbnail }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const productData = await getProductBySlug(params.slug);

  if (!productData) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(
    params.slug,
    productData.product.category,
  );

  return (
    <ProductDetailClient
      slug={params.slug}
      product={productData.product}
      description={productData.description}
      features={productData.features}
      faqs={productData.faqs}
      relatedProducts={relatedProducts}
      images={productData.images || []}
    />
  );
}
