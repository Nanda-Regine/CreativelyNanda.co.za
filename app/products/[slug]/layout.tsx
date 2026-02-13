import type { Metadata } from 'next';
import {
  createMetadata,
  generateProductJsonLd,
  generateBreadcrumbJsonLd,
  JsonLd,
} from '@/lib/seo';
import { getProductBySlug } from '@/lib/products-data';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const productData = getProductBySlug(params.slug);

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
    title: product.name,
    description: description ? description.slice(0, 160) : product.tagline,
    path: `/products/${product.slug}`,
    ogType: 'website',
    keywords: [product.category, 'Notion template', 'digital product', product.name, 'South Africa'],
  });
}

export default function ProductDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  const productData = getProductBySlug(params.slug);

  if (!productData) return <>{children}</>;

  const { product, description } = productData;

  const brand = product.slug.includes('inside-her-roses')
    ? 'Mirembe Muse'
    : 'CreativelyNanda';

  const productJsonLd = generateProductJsonLd({
    name: product.name,
    description: description || product.tagline,
    slug: product.slug,
    price: product.price,
    originalPrice: product.originalPrice,
    currency: 'ZAR',
    category: product.category,
    status: product.status || 'live',
    rating: product.rating,
    reviewCount: product.reviewCount,
    brand,
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
