import { notFound } from 'next/navigation';
import { getProductBySlug, getRelatedProducts } from '@/lib/products';
import ProductDetailClient from './ProductDetailClient';

export const dynamic = 'force-dynamic';

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
    productData.product.category
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
