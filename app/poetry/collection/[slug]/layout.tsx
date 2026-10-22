import type { Metadata } from 'next';
import {
  createMetadata,
  generatePoemJsonLd,
  generateBreadcrumbJsonLd,
  JsonLd,
} from '@/lib/seo';
import { getPoemBySlug } from '@/lib/poems-data';

export async function generateMetadata({
  params: paramsPromise,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await paramsPromise;
  const poem = getPoemBySlug(params.slug);

  if (!poem) {
    return createMetadata({
      title: 'Poem Not Found',
      description: 'The poem you are looking for could not be found.',
      path: `/poetry/collection/${params.slug}`,
      noIndex: true,
    });
  }

  return createMetadata({
    title: `${poem.title} - Inside Her Roses`,
    description: poem.excerpt || `Read "${poem.title}" from Inside Her Roses by Nanda Regine`,
    path: `/poetry/collection/${poem.slug}`,
    keywords: ['poetry', poem.category, 'Inside Her Roses', 'Nanda Regine'],
  });
}

export default async function PoemDetailLayout({
  children,
  params: paramsPromise,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const params = await paramsPromise;
  const poem = getPoemBySlug(params.slug);

  if (!poem) return <>{children}</>;

  const poemJsonLd = generatePoemJsonLd({
    title: poem.title,
    slug: poem.slug,
    excerpt: poem.excerpt || '',
    category: poem.category,
  });

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Poetry', path: '/poetry' },
    { name: 'Collection', path: '/poetry/collection' },
    { name: poem.title, path: `/poetry/collection/${poem.slug}` },
  ]);

  return (
    <>
      <JsonLd data={poemJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      {children}
    </>
  );
}
