import type { Metadata } from 'next';
import {
  createMetadata,
  generateBlogPostingJsonLd,
  generateBreadcrumbJsonLd,
  JsonLd,
} from '@/lib/seo';
import { createServerClient } from '@/lib/supabase/server';
import { blogPosts as seedPosts } from '@/scripts/seed-blog-posts';

const categoryLabels: Record<string, string> = {
  dev: 'Development',
  writing: 'Writing',
  business: 'Business',
};

function isSupabaseConfigured() {
  return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

async function getBlogPost(slug: string) {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createServerClient();
      const { data: post } = await supabase
        .from('blog_posts')
        .select('*, contributor:contributors(*)')
        .eq('slug', slug)
        .eq('is_published', true)
        .single();
      if (post) return post;
    } catch {
      // Fall through to seed data
    }
  }

  const seedPost = seedPosts.find(p => p.slug === slug);
  if (seedPost) {
    return {
      ...seedPost,
      id: seedPost.slug,
      created_at: seedPost.published_at,
      updated_at: seedPost.published_at,
      view_count: 0,
      like_count: 0,
      author_id: null,
      contributor: null,
    };
  }

  return null;
}

export async function generateMetadata({
  params,
}: {
  params: { category: string; slug: string };
}): Promise<Metadata> {
  const post = await getBlogPost(params.slug);

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
    description: post.excerpt || `Read "${post.title}" on Creatively Nanda`,
    path: `/blog/${params.category}/${params.slug}`,
    ogType: 'article',
    ogImage: post.cover_image || undefined,
    keywords: post.tags,
  });
}

export default async function BlogPostLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { category: string; slug: string };
}) {
  const post = await getBlogPost(params.slug);

  if (!post) return <>{children}</>;

  const blogPostingJsonLd = generateBlogPostingJsonLd({
    title: post.title,
    description: post.excerpt || '',
    slug: post.slug,
    category: params.category,
    publishedAt: post.published_at || post.created_at,
    updatedAt: post.updated_at,
    coverImage: post.cover_image,
    authorName: post.contributor?.name,
    readingTime: post.reading_time,
    tags: post.tags,
  });

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: categoryLabels[params.category] || params.category, path: `/blog/${params.category}` },
    { name: post.title, path: `/blog/${params.category}/${post.slug}` },
  ]);

  return (
    <>
      <JsonLd data={blogPostingJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      {children}
    </>
  );
}
