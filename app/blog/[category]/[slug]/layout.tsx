import type { Metadata } from 'next';
import {
  createMetadata,
  generateBlogPostingJsonLd,
  generateBreadcrumbJsonLd,
  JsonLd,
  SITE_URL,
} from '@/lib/seo';
import { getPressPost, imprintNameFor } from '@/lib/press';
import { issueFor, issueLabel, PRESS_NAME, PRESS_SHORT, STUDIO_CATEGORIES } from '@/lib/data/press-issues';

export async function generateMetadata({ params }: { params: { category: string; slug: string } }): Promise<Metadata> {
  const post = await getPressPost(params.slug);

  if (!post) {
    return createMetadata({
      title: 'Article Not Found',
      description: 'The article you are looking for could not be found.',
      path: `/blog/${params.category}/${params.slug}`,
      noIndex: true,
    });
  }

  return createMetadata({
    title: post.title,
    description: post.excerpt || `Read "${post.title}" in ${PRESS_NAME}`,
    // The post's own category, not the requested one: a wrong-category URL
    // redirects, and its canonical must never point at itself.
    path: `/blog/${post.category}/${post.slug}`,
    ogType: 'article',
    ogImage: post.cover_image || undefined,
    keywords: post.tags ?? undefined,
  });
}

export default async function BlogPostLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { category: string; slug: string };
}) {
  const post = await getPressPost(params.slug);
  if (!post) return <>{children}</>;

  const issue = issueFor(post.published_at);
  const imprint = imprintNameFor(post.category);

  const posting = {
    ...generateBlogPostingJsonLd({
      title: post.title,
      description: post.excerpt || '',
      slug: post.slug,
      category: post.category,
      publishedAt: post.published_at || post.created_at,
      updatedAt: post.updated_at ?? undefined,
      coverImage: post.cover_image,
      readingTime: post.reading_time ?? undefined,
      tags: post.tags ?? undefined,
    }),
    '@type': 'Article',
    articleSection: imprint,
    ...(issue && {
      isPartOf: {
        '@type': 'PublicationIssue',
        issueNumber: String(issue.number),
        name: `${issueLabel(issue.number)}: ${issue.title}`,
        isPartOf: { '@type': 'Periodical', name: PRESS_NAME, url: `${SITE_URL}/blog` },
      },
    }),
  };

  const breadcrumb = generateBreadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: PRESS_SHORT, path: '/blog' },
    { name: imprint, path: STUDIO_CATEGORIES[post.category]?.href ?? `/blog/${post.category}` },
    { name: post.title, path: `/blog/${post.category}/${post.slug}` },
  ]);

  return (
    <>
      <JsonLd data={posting} />
      <JsonLd data={breadcrumb} />
      {children}
    </>
  );
}
