'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  Twitter,
  Linkedin,
  Link as LinkIcon,
  ChevronUp,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { ArticleCard, Button, Badge } from '@/components/ui';
import type { Article } from '@/components/ui/ArticleCard';

// Sample article database - will be fetched from Supabase/MDX in production
const ARTICLES_DB: Record<string, {
  article: Article;
  content: string;
  tableOfContents: { id: string; title: string; level: number }[];
}> = {
  'nextjs-14-app-router-guide': {
    article: {
      slug: 'nextjs-14-app-router-guide',
      title: 'Next.js 14 App Router: A Practical Guide',
      excerpt: 'Everything you need to know about the App Router, Server Components, and building modern React apps.',
      coverImage: '/assets/professional/nanda-consulting.jpg',
      category: 'dev',
      publishedAt: '2024-01-28',
      readingTime: 12,
      author: { name: 'Nanda Kabali-Kagwa', avatar: '/assets/professional/nanda-professional.jpg' },
    },
    content: `
## Introduction

The Next.js 14 App Router represents a paradigm shift in how we build React applications. Moving away from the pages directory, the App Router embraces React Server Components by default, offering better performance and a more intuitive mental model.

In this guide, I'll walk you through everything you need to know to get started with the App Router, based on my experience building several production applications with it.

## Understanding the App Router

The App Router uses a file-system based router where folders define routes. Each folder represents a route segment that maps to a URL segment.

### Key Concepts

- **Layouts**: Shared UI between routes that preserve state on navigation
- **Templates**: Similar to layouts but create a new instance on navigation
- **Loading States**: Built-in loading UI with React Suspense
- **Error Handling**: Error boundaries at the route level

## Server Components vs Client Components

By default, all components in the App Router are Server Components. This means they render on the server and send HTML to the client.

\`\`\`tsx
// This is a Server Component by default
export default function Page() {
  return <h1>Hello, World!</h1>
}
\`\`\`

To make a component interactive (useState, useEffect, event handlers), add the 'use client' directive:

\`\`\`tsx
'use client';

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
\`\`\`

## Data Fetching

One of the biggest improvements in the App Router is how data fetching works. You can fetch data directly in Server Components using async/await:

\`\`\`tsx
async function getData() {
  const res = await fetch('https://api.example.com/data');
  return res.json();
}

export default async function Page() {
  const data = await getData();
  return <div>{data.title}</div>
}
\`\`\`

## Best Practices

1. **Keep Client Components small** - Only add 'use client' where you need interactivity
2. **Use Server Components for data fetching** - Avoid waterfalls by fetching at the top
3. **Leverage parallel routes** - For complex layouts with independent loading states
4. **Use Route Handlers for APIs** - Replace API routes with route.ts files

## Conclusion

The App Router is a significant step forward for Next.js. While there's a learning curve, the benefits in performance and developer experience are worth it. Start small, migrate gradually, and embrace the new patterns.

Happy coding!
    `,
    tableOfContents: [
      { id: 'introduction', title: 'Introduction', level: 2 },
      { id: 'understanding-the-app-router', title: 'Understanding the App Router', level: 2 },
      { id: 'key-concepts', title: 'Key Concepts', level: 3 },
      { id: 'server-components-vs-client-components', title: 'Server vs Client Components', level: 2 },
      { id: 'data-fetching', title: 'Data Fetching', level: 2 },
      { id: 'best-practices', title: 'Best Practices', level: 2 },
      { id: 'conclusion', title: 'Conclusion', level: 2 },
    ],
  },
  'poetry-as-therapy': {
    article: {
      slug: 'poetry-as-therapy',
      title: 'Poetry as Therapy: Writing Through Pain',
      excerpt: 'How writing poetry helped me process grief, trauma, and find healing through words.',
      coverImage: '/assets/poetry-book/book-cover-1.jpg',
      category: 'writing',
      publishedAt: '2024-01-20',
      readingTime: 6,
      author: { name: 'Nanda Kabali-Kagwa', avatar: '/assets/professional/nanda-professional.jpg' },
    },
    content: `
## The Weight of Unspoken Words

There are moments in life when the weight of what we carry becomes unbearable. For me, those moments came in waves — loss, heartbreak, the quiet ache of existing in a world that doesn't always see you.

I didn't set out to become a poet. Poetry found me in the dark, when speaking felt impossible but writing felt like breathing.

## Finding Voice in Verse

My first poems were raw, unpolished, desperate. They weren't meant for anyone's eyes but my own. Late nights, tear-stained pages, words that tumbled out like confessions.

> "She writes because silence is too loud,
> because the words need somewhere to go,
> because healing happens in the telling."

These early pieces became the foundation of what would later become "Inside Her Roses."

## The Healing Process

Writing poetry isn't about finding the right words — it's about finding YOUR words. The ones that live in your chest, that keep you up at night, that demand to be released.

### What I Learned

1. **There's no wrong way to grieve** - Your process is yours alone
2. **Poetry doesn't have to be perfect** - Raw is real, and real heals
3. **Sharing is optional** - Write for yourself first
4. **Pain transforms** - What hurts today becomes wisdom tomorrow

## The Gift of Expression

Today, when I perform my poetry, I see tears in the audience. Not because my pain is unique, but because it's universal. We all carry weight. We all need release.

If you're struggling, I encourage you to write. Not for publication, not for praise — but for you. Let the words flow. Let them be messy. Let them heal you.

## Your Turn

You don't need permission to be a poet. You just need a pen, paper, and the courage to be honest with yourself.

Start with this prompt: *"The thing I've never told anyone is..."*

See where it takes you.
    `,
    tableOfContents: [
      { id: 'the-weight-of-unspoken-words', title: 'The Weight of Unspoken Words', level: 2 },
      { id: 'finding-voice-in-verse', title: 'Finding Voice in Verse', level: 2 },
      { id: 'the-healing-process', title: 'The Healing Process', level: 2 },
      { id: 'what-i-learned', title: 'What I Learned', level: 3 },
      { id: 'the-gift-of-expression', title: 'The Gift of Expression', level: 2 },
      { id: 'your-turn', title: 'Your Turn', level: 2 },
    ],
  },
  'building-notion-templates-that-sell': {
    article: {
      slug: 'building-notion-templates-that-sell',
      title: 'Building Notion Templates That Actually Sell',
      excerpt: 'A deep dive into creating Notion templates that solve real problems and generate passive income.',
      coverImage: '/assets/professional/nanda-consulting.jpg',
      category: 'business',
      publishedAt: '2024-02-01',
      readingTime: 8,
      author: { name: 'Nanda Kabali-Kagwa', avatar: '/assets/professional/nanda-professional.jpg' },
    },
    content: `
## Why Notion Templates?

The Notion template market has exploded. What started as a productivity tool has become a platform for digital entrepreneurs to build sustainable income streams.

I've sold over 1,000 templates in the past year, and I want to share what I've learned about creating templates that actually sell.

## Understanding Your Audience

Before you design anything, you need to understand who you're building for. The biggest mistake I see is building templates that solve YOUR problems, not your customer's problems.

### Ask Yourself

- Who is struggling with this problem?
- What have they already tried?
- What would their ideal solution look like?
- How much time/money would they save?

## Design Principles That Sell

### 1. First Impressions Matter

Your template thumbnail is your storefront. Invest time in making it look professional. Use consistent colors, clean typography, and show the template in action.

### 2. Solve One Problem Well

Don't try to build an "everything" template. The most successful templates solve one specific problem exceptionally well.

### 3. Include Instructions

Never assume your customers know how to use your template. Include a "Getting Started" section with clear steps.

## Pricing Strategy

Pricing is more art than science, but here's my framework:

- **$5-15**: Simple templates, single-page solutions
- **$19-49**: Multi-database systems, comprehensive solutions
- **$49-99**: Complex systems, business solutions
- **$99+**: Enterprise-grade, includes support

## Marketing Your Templates

Building is only half the battle. Here's how I market:

1. **Create a landing page** - Use Gumroad, Lemonsqueezy, or your own site
2. **Show, don't tell** - Video walkthroughs convert better than screenshots
3. **Leverage social proof** - Reviews and testimonials build trust
4. **Build in public** - Share your creation process on Twitter/X

## The Long Game

Template income isn't overnight success. It's about building a catalog, iterating on feedback, and consistently showing up.

Start with one template. Make it excellent. Then build the next one.

You've got this.
    `,
    tableOfContents: [
      { id: 'why-notion-templates', title: 'Why Notion Templates?', level: 2 },
      { id: 'understanding-your-audience', title: 'Understanding Your Audience', level: 2 },
      { id: 'design-principles-that-sell', title: 'Design Principles That Sell', level: 2 },
      { id: 'pricing-strategy', title: 'Pricing Strategy', level: 2 },
      { id: 'marketing-your-templates', title: 'Marketing Your Templates', level: 2 },
      { id: 'the-long-game', title: 'The Long Game', level: 2 },
    ],
  },
};

// Related articles by category
const RELATED_ARTICLES: Record<string, Article[]> = {
  dev: [
    {
      slug: 'typescript-for-beginners',
      title: 'TypeScript for JavaScript Developers',
      excerpt: 'A gentle introduction to TypeScript.',
      coverImage: '/assets/professional/nanda-consulting.jpg',
      category: 'dev',
      publishedAt: '2024-01-10',
      readingTime: 15,
      author: { name: 'Nanda Kabali-Kagwa' },
    },
    {
      slug: 'framer-motion-animations',
      title: 'Beautiful Animations with Framer Motion',
      excerpt: 'Create smooth animations in React.',
      coverImage: '/assets/professional/nanda-consulting.jpg',
      category: 'dev',
      publishedAt: '2024-01-05',
      readingTime: 10,
      author: { name: 'Nanda Kabali-Kagwa' },
    },
  ],
  writing: [
    {
      slug: 'inside-her-roses-journey',
      title: 'The Journey of "Inside Her Roses"',
      excerpt: 'The story behind my poetry collection.',
      coverImage: '/assets/poetry-book/book-cover-1.jpg',
      category: 'writing',
      publishedAt: '2024-01-05',
      readingTime: 7,
      author: { name: 'Nanda Kabali-Kagwa' },
    },
    {
      slug: 'finding-your-voice',
      title: 'Finding Your Voice as a Writer',
      excerpt: 'Discovering your unique style.',
      coverImage: '/assets/poetry-book/book-cover-1.jpg',
      category: 'writing',
      publishedAt: '2023-12-28',
      readingTime: 8,
      author: { name: 'Nanda Kabali-Kagwa' },
    },
  ],
  business: [
    {
      slug: 'freelancing-in-south-africa',
      title: 'Freelancing in South Africa',
      excerpt: 'Building a sustainable freelance career.',
      coverImage: '/assets/professional/nanda-consulting.jpg',
      category: 'business',
      publishedAt: '2024-01-15',
      readingTime: 10,
      author: { name: 'Nanda Kabali-Kagwa' },
    },
    {
      slug: 'pricing-digital-products',
      title: 'How to Price Your Digital Products',
      excerpt: 'Stop undercharging for your work.',
      coverImage: '/assets/professional/nanda-consulting.jpg',
      category: 'business',
      publishedAt: '2024-01-08',
      readingTime: 7,
      author: { name: 'Nanda Kabali-Kagwa' },
    },
  ],
};

const categoryMeta = {
  dev: { label: 'Development', color: 'bg-blue-100 text-blue-700', gradient: 'from-blue-900 to-cyan-900' },
  writing: { label: 'Writing', color: 'bg-purple-100 text-purple-700', gradient: 'from-purple-900 to-pink-900' },
  business: { label: 'Business', color: 'bg-emerald-100 text-emerald-700', gradient: 'from-emerald-900 to-teal-900' },
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const category = params.category as 'dev' | 'writing' | 'business';

  const [showScrollTop, setShowScrollTop] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const articleData = ARTICLES_DB[slug];
  const meta = categoryMeta[category] || categoryMeta.dev;
  const relatedArticles = RELATED_ARTICLES[category] || [];

  if (!articleData) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-display font-bold text-navy mb-4">Article Not Found</h1>
          <p className="text-navy/60 mb-8">The article you're looking for doesn't exist.</p>
          <Link href="/blog">
            <Button variant="primary" className="rounded-full">
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const { article, content, tableOfContents } = articleData;

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-beige">
      {/* Hero */}
      <section className={`relative py-20 px-4 bg-gradient-to-br ${meta.gradient} overflow-hidden`}>
        <div className="absolute inset-0 opacity-20">
          <Image
            src={article.coverImage}
            alt=""
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        <div className="max-w-4xl mx-auto relative z-10">
          <Link
            href={`/blog/${category}`}
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to {meta.label}
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="secondary" size="sm" pill className={`mb-6 ${meta.color}`}>
              {meta.label}
            </Badge>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-6 leading-tight">
              {article.title}
            </h1>

            <p className="text-lg text-white/80 mb-8 max-w-2xl">
              {article.excerpt}
            </p>

            {/* Author & Meta */}
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-3">
                {article.author.avatar ? (
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white/30">
                    <Image
                      src={article.author.avatar}
                      alt={article.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white font-medium">
                    {article.author.name.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="font-medium text-white">{article.author.name}</p>
                  <p className="text-sm text-white/60">Author</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-white/70 text-sm">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formatDate(article.publishedAt)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {article.readingTime} min read
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_250px] gap-12">
            {/* Article Content */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="prose prose-lg prose-navy max-w-none"
            >
              {/* Render content as HTML (in production, use MDX) */}
              <div
                className="article-content"
                dangerouslySetInnerHTML={{
                  __html: content
                    .replace(/## (.*)/g, '<h2 id="$1">$1</h2>')
                    .replace(/### (.*)/g, '<h3 id="$1">$1</h3>')
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\*(.*?)\*/g, '<em>$1</em>')
                    .replace(/`{3}(\w+)?\n([\s\S]*?)`{3}/g, '<pre><code class="language-$1">$2</code></pre>')
                    .replace(/`([^`]+)`/g, '<code>$1</code>')
                    .replace(/> (.*)/g, '<blockquote>$1</blockquote>')
                    .replace(/^\d+\. (.*)/gm, '<li>$1</li>')
                    .replace(/^- (.*)/gm, '<li>$1</li>')
                    .replace(/\n\n/g, '</p><p>')
                    .replace(/^/, '<p>')
                    .replace(/$/, '</p>')
                }}
              />
            </motion.article>

            {/* Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-28 space-y-8">
                {/* Table of Contents */}
                <div className="bg-cream rounded-xl p-6 shadow-sm border border-navy/5">
                  <h3 className="font-display font-semibold text-navy mb-4">On This Page</h3>
                  <nav className="space-y-2">
                    {tableOfContents.map((item) => (
                      <a
                        key={item.id}
                        href={`#${slugify(item.title)}`}
                        className={`block text-sm text-navy/60 hover:text-cherry transition-colors ${
                          item.level === 3 ? 'pl-4' : ''
                        }`}
                      >
                        {item.title}
                      </a>
                    ))}
                  </nav>
                </div>

                {/* Share */}
                <div className="bg-cream rounded-xl p-6 shadow-sm border border-navy/5">
                  <h3 className="font-display font-semibold text-navy mb-4 flex items-center gap-2">
                    <Share2 className="w-4 h-4" />
                    Share
                  </h3>
                  <div className="flex gap-2">
                    <a
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(article.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-navy/5 rounded-lg hover:bg-navy/10 transition-colors"
                    >
                      <Twitter className="w-5 h-5 text-navy" />
                    </a>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-navy/5 rounded-lg hover:bg-navy/10 transition-colors"
                    >
                      <Linkedin className="w-5 h-5 text-navy" />
                    </a>
                    <button
                      onClick={handleCopyLink}
                      className="p-3 bg-navy/5 rounded-lg hover:bg-navy/10 transition-colors relative"
                    >
                      <LinkIcon className="w-5 h-5 text-navy" />
                      {copied && (
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs bg-navy text-white px-2 py-1 rounded">
                          Copied!
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="py-16 px-4 bg-cream/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-display font-bold text-navy mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {relatedArticles.map((related, i) => (
                <motion.div
                  key={related.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <ArticleCard article={related} variant="horizontal" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Scroll to Top */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-cherry text-white rounded-full shadow-lg hover:bg-cherry-dark transition-colors z-50"
        >
          <ChevronUp className="w-6 h-6" />
        </motion.button>
      )}

      {/* Article Styles */}
      <style jsx global>{`
        .article-content h2 {
          font-family: var(--font-display);
          font-size: 1.75rem;
          font-weight: 700;
          color: #0A1128;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
        }
        .article-content h3 {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 600;
          color: #0A1128;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
        }
        .article-content p {
          color: #0A1128;
          opacity: 0.8;
          line-height: 1.8;
          margin-bottom: 1.25rem;
        }
        .article-content blockquote {
          border-left: 4px solid #C41E3A;
          padding-left: 1.5rem;
          margin: 2rem 0;
          font-style: italic;
          color: #0A1128;
          opacity: 0.9;
        }
        .article-content pre {
          background: #0A1128;
          color: #F5F0E8;
          padding: 1.5rem;
          border-radius: 0.75rem;
          overflow-x: auto;
          margin: 1.5rem 0;
        }
        .article-content code {
          background: #0A1128;
          color: #F5F0E8;
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-size: 0.875rem;
        }
        .article-content pre code {
          background: none;
          padding: 0;
        }
        .article-content ul, .article-content ol {
          margin: 1rem 0 1.5rem 1.5rem;
        }
        .article-content li {
          color: #0A1128;
          opacity: 0.8;
          margin-bottom: 0.5rem;
          line-height: 1.7;
        }
        .article-content strong {
          color: #0A1128;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
