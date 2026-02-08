'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  Twitter,
  Linkedin,
  Link as LinkIcon,
  ChevronUp,
  BookOpen,
  Sparkles,
} from 'lucide-react';
import { Button, Badge } from '@/components/ui';
import {
  LikeButton,
  ViewCounter,
  ReaderReviews,
  getCategoryPattern,
  DecorativeBlob,
} from '@/components/blog';
import { blogCategoryThemes } from '@/lib/blog-themes';
import type { BlogPost } from '@/types/database';

interface ArticleData {
  post: BlogPost;
  tableOfContents: { id: string; title: string; level: number }[];
}

const categoryMeta = {
  dev: {
    label: 'Development',
    color: 'bg-blue-100 text-blue-700',
    gradient: 'from-blue-900 via-blue-800 to-cyan-900',
    accent: 'blue',
    bgPattern: 'from-blue-50/50 via-parchment to-cyan-50/30',
  },
  writing: {
    label: 'Writing',
    color: 'bg-purple-100 text-purple-700',
    gradient: 'from-purple-900 via-purple-800 to-pink-900',
    accent: 'purple',
    bgPattern: 'from-purple-50/50 via-parchment to-pink-50/30',
  },
  business: {
    label: 'Business',
    color: 'bg-emerald-100 text-emerald-700',
    gradient: 'from-emerald-900 via-emerald-800 to-teal-900',
    accent: 'emerald',
    bgPattern: 'from-emerald-50/50 via-parchment to-teal-50/30',
  },
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

// Generate table of contents from content
function generateTOC(content: string) {
  const headingRegex = /^(##|###)\s+(.+)$/gm;
  const toc: { id: string; title: string; level: number }[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const title = match[2].trim();
    toc.push({
      id: slugify(title),
      title,
      level,
    });
  }

  return toc;
}

// Render markdown content with magazine styling
function renderContent(content: string, category: string) {
  const theme = blogCategoryThemes[category as keyof typeof blogCategoryThemes];

  // Process content
  let html = content
    // Headers with IDs
    .replace(/^## (.+)$/gm, (_, title) =>
      `<h2 id="${slugify(title)}" class="article-h2">${title}</h2>`
    )
    .replace(/^### (.+)$/gm, (_, title) =>
      `<h3 id="${slugify(title)}" class="article-h3">${title}</h3>`
    )
    // Bold and italic
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Code blocks
    .replace(/```(\w+)?\n([\s\S]*?)```/g,
      '<pre class="article-code"><code>$2</code></pre>'
    )
    // Inline code
    .replace(/`([^`]+)`/g, '<code class="article-inline-code">$1</code>')
    // Blockquotes (pull quotes)
    .replace(/^>\s*(.+)$/gm,
      `<blockquote class="article-quote"><span class="quote-mark">"</span>$1</blockquote>`
    )
    // Lists
    .replace(/^\d+\.\s+(.+)$/gm, '<li class="article-li">$1</li>')
    .replace(/^-\s+(.+)$/gm, '<li class="article-li-bullet">$1</li>')
    // Paragraphs
    .replace(/\n\n/g, '</p><p class="article-p">');

  // Wrap in paragraph tags
  html = `<p class="article-p">${html}</p>`;

  return html;
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const category = params.category as 'dev' | 'writing' | 'business';

  const [articleData, setArticleData] = useState<ArticleData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [copied, setCopied] = useState(false);
  const [readProgress, setReadProgress] = useState(0);

  const meta = categoryMeta[category] || categoryMeta.dev;
  const theme = blogCategoryThemes[category] || blogCategoryThemes.dev;

  // Fetch article data
  useEffect(() => {
    async function fetchArticle() {
      try {
        const res = await fetch(`/api/blog/posts/${slug}`);
        if (!res.ok) throw new Error('Article not found');

        const post = await res.json();
        const tableOfContents = generateTOC(post.content);

        setArticleData({ post, tableOfContents });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load article');
      } finally {
        setLoading(false);
      }
    }

    fetchArticle();
  }, [slug]);

  // Scroll and progress tracking
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);

      // Calculate read progress
      const article = document.getElementById('article-content');
      if (article) {
        const rect = article.getBoundingClientRect();
        const articleTop = window.scrollY + rect.top;
        const articleHeight = article.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrolled = window.scrollY - articleTop + windowHeight;
        const progress = Math.min(100, Math.max(0, (scrolled / articleHeight) * 100));
        setReadProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-parchment flex items-center justify-center">
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-12 h-12 border-4 border-cherry/20 border-t-cherry rounded-full animate-spin" />
          <p className="text-navy/60">Loading article...</p>
        </motion.div>
      </div>
    );
  }

  if (error || !articleData) {
    return (
      <div className="min-h-screen bg-parchment flex items-center justify-center">
        <div className="text-center px-4">
          <div className="w-20 h-20 bg-cherry/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-10 h-10 text-cherry" />
          </div>
          <h1 className="text-3xl font-display font-bold text-navy mb-4">
            Article Not Found
          </h1>
          <p className="text-navy/60 mb-8 max-w-md mx-auto">
            The article you're looking for doesn't exist or hasn't been published yet.
          </p>
          <Link href="/blog">
            <Button variant="primary" className="rounded-full">
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const { post, tableOfContents } = articleData;
  const PatternComponent = getCategoryPattern(category);

  return (
    <div className={`min-h-screen bg-gradient-to-b ${meta.bgPattern}`}>
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-cherry z-50 origin-left"
        style={{ scaleX: readProgress / 100 }}
      />

      {/* Magazine Header */}
      <header className={`relative py-20 px-4 bg-gradient-to-br ${meta.gradient} overflow-hidden`}>
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-10">
          <PatternComponent className="w-full h-full" />
        </div>

        {/* Cover image overlay */}
        {post.cover_image && (
          <div className="absolute inset-0 opacity-20">
            <Image
              src={post.cover_image}
              alt=""
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Decorative blobs */}
        <DecorativeBlob
          className="absolute -top-20 -right-20 w-80 h-80 opacity-20"
          variant={0}
        />
        <DecorativeBlob
          className="absolute -bottom-20 -left-20 w-60 h-60 opacity-10"
          variant={1}
        />

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Back link */}
          <Link
            href={`/blog`}
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Magazine
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Issue badge */}
            <div className="flex items-center gap-3 mb-6">
              <Badge variant="secondary" size="sm" pill className={`${meta.color}`}>
                {meta.label}
              </Badge>
              <span className="text-white/50 text-sm">Issue 001</span>
            </div>

            {/* Title with drop shadow effect */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-[1.1] drop-shadow-lg">
              {post.title}
            </h1>

            {/* Excerpt as tagline */}
            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl font-serif italic">
              {post.excerpt}
            </p>

            {/* Author & Meta */}
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white/30 ring-2 ring-white/10 ring-offset-2 ring-offset-transparent">
                  <Image
                    src={post.contributor?.avatar || '/assets/professional/nanda-professional.png'}
                    alt={post.contributor?.name || 'Author'}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium text-white">
                    {post.contributor?.name || 'Nanda Kabali-Kagwa'}
                  </p>
                  <p className="text-sm text-white/60">
                    {post.contributor?.title || 'Creative Technologist'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-white/70 text-sm">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {formatDate(post.published_at || post.created_at)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {post.reading_time || 5} min read
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative">
        {/* Engagement Sidebar (Floating) */}
        <div className="hidden xl:block fixed left-8 top-1/2 -translate-y-1/2 z-40">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col items-center gap-4 bg-white/80 backdrop-blur-sm rounded-full py-4 px-2 shadow-lg border border-navy/5"
          >
            <LikeButton slug={slug} initialLikeCount={post.like_count} variant="floating" />
            <div className="w-8 h-px bg-navy/10" />
            <ViewCounter slug={slug} initialViewCount={post.view_count} variant="compact" />
          </motion.div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-[1fr_240px] gap-12">
            {/* Article Content */}
            <motion.article
              id="article-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="prose prose-lg max-w-none"
            >
              {/* Magazine Drop Cap for first paragraph */}
              <div
                className="article-content"
                dangerouslySetInnerHTML={{
                  __html: renderContent(post.content, category),
                }}
              />

              {/* Mobile engagement bar */}
              <div className="flex items-center justify-between py-6 mt-8 border-t border-navy/10 lg:hidden">
                <LikeButton slug={slug} initialLikeCount={post.like_count} />
                <ViewCounter slug={slug} initialViewCount={post.view_count} variant="badge" />
              </div>

              {/* Author Card at end */}
              <div className="mt-12 p-6 bg-gradient-to-br from-cream to-beige/50 rounded-2xl border border-navy/5">
                <div className="flex items-start gap-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={post.contributor?.avatar || '/assets/professional/nanda-professional.png'}
                      alt={post.contributor?.name || 'Author'}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-navy/50 mb-1">Written by</p>
                    <h4 className="font-display font-semibold text-navy text-lg">
                      {post.contributor?.name || 'Nanda Kabali-Kagwa'}
                    </h4>
                    <p className="text-navy/60 text-sm mt-2">
                      {post.contributor?.bio || 'Building beautiful digital experiences and writing poetry that heals.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Reader Reviews */}
              <ReaderReviews slug={slug} initialReviews={post.reviews} />
            </motion.article>

            {/* Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-6">
                {/* Table of Contents */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-sm border border-navy/5">
                  <div className="flex items-center gap-2 mb-4">
                    <div className={`w-1 h-4 rounded-full bg-gradient-to-b ${theme.gradient}`} />
                    <h3 className="font-display font-semibold text-navy text-sm uppercase tracking-wide">
                      In This Article
                    </h3>
                  </div>
                  <nav className="space-y-2">
                    {tableOfContents.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={`block text-sm text-navy/60 hover:text-cherry transition-colors ${
                          item.level === 3 ? 'pl-3 text-xs' : ''
                        }`}
                      >
                        {item.title}
                      </a>
                    ))}
                  </nav>
                </div>

                {/* Share */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-sm border border-navy/5">
                  <h3 className="font-display font-semibold text-navy text-sm uppercase tracking-wide mb-4 flex items-center gap-2">
                    <Share2 className="w-4 h-4" />
                    Share
                  </h3>
                  <div className="flex gap-2">
                    <a
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&text=${encodeURIComponent(post.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-navy/5 rounded-xl hover:bg-navy/10 transition-colors"
                    >
                      <Twitter className="w-5 h-5 text-navy" />
                    </a>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-navy/5 rounded-xl hover:bg-navy/10 transition-colors"
                    >
                      <Linkedin className="w-5 h-5 text-navy" />
                    </a>
                    <button
                      onClick={handleCopyLink}
                      className="p-3 bg-navy/5 rounded-xl hover:bg-navy/10 transition-colors relative"
                    >
                      <LinkIcon className="w-5 h-5 text-navy" />
                      {copied && (
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs bg-navy text-white px-2 py-1 rounded whitespace-nowrap">
                          Copied!
                        </span>
                      )}
                    </button>
                  </div>
                </div>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-sm border border-navy/5">
                    <h3 className="font-display font-semibold text-navy text-sm uppercase tracking-wide mb-4">
                      Topics
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-navy/5 text-navy/60 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </main>

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

      {/* Magazine Typography Styles */}
      <style jsx global>{`
        .article-content {
          font-family: var(--font-sans);
          color: #0A1128;
        }

        .article-content .article-p {
          font-size: 1.125rem;
          line-height: 1.9;
          margin-bottom: 1.5rem;
          color: rgba(10, 17, 40, 0.8);
        }

        /* Magazine-style drop cap for first paragraph */
        .article-content .article-p:first-of-type::first-letter {
          float: left;
          font-family: var(--font-display);
          font-size: 4.5rem;
          font-weight: 700;
          line-height: 0.8;
          padding-right: 0.75rem;
          padding-top: 0.25rem;
          color: ${category === 'dev' ? '#3B82F6' : category === 'writing' ? '#8B5CF6' : '#10B981'};
        }

        .article-h2 {
          font-family: var(--font-display);
          font-size: 2rem;
          font-weight: 700;
          color: #0A1128;
          margin-top: 3rem;
          margin-bottom: 1.25rem;
          position: relative;
          padding-left: 1rem;
        }

        .article-h2::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.25rem;
          bottom: 0.25rem;
          width: 4px;
          background: linear-gradient(to bottom, ${category === 'dev' ? '#3B82F6, #06B6D4' : category === 'writing' ? '#8B5CF6, #EC4899' : '#10B981, #14B8A6'});
          border-radius: 2px;
        }

        .article-h3 {
          font-family: var(--font-display);
          font-size: 1.35rem;
          font-weight: 600;
          color: #0A1128;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }

        /* Pull quote styling */
        .article-quote {
          position: relative;
          margin: 2.5rem 0;
          padding: 1.5rem 2rem;
          background: linear-gradient(135deg, rgba(196, 30, 58, 0.05), rgba(196, 30, 58, 0.02));
          border-left: 4px solid #C41E3A;
          border-radius: 0 1rem 1rem 0;
          font-style: italic;
          font-size: 1.25rem;
          line-height: 1.7;
          color: #0A1128;
        }

        .article-quote .quote-mark {
          font-family: var(--font-display);
          font-size: 3rem;
          font-style: normal;
          line-height: 0;
          position: absolute;
          left: 0.75rem;
          top: 1.5rem;
          color: #C41E3A;
          opacity: 0.3;
        }

        .article-code {
          background: linear-gradient(135deg, #0A1128, #1a2744);
          color: #F5F0E8;
          padding: 1.5rem;
          border-radius: 1rem;
          overflow-x: auto;
          margin: 1.5rem 0;
          font-size: 0.9rem;
          line-height: 1.6;
          box-shadow: 0 4px 20px rgba(10, 17, 40, 0.15);
        }

        .article-inline-code {
          background: rgba(10, 17, 40, 0.08);
          color: #C41E3A;
          padding: 0.2rem 0.5rem;
          border-radius: 0.35rem;
          font-size: 0.9em;
          font-weight: 500;
        }

        .article-li, .article-li-bullet {
          color: rgba(10, 17, 40, 0.8);
          margin-bottom: 0.75rem;
          line-height: 1.7;
          padding-left: 0.5rem;
        }

        .article-li-bullet::marker {
          color: ${category === 'dev' ? '#3B82F6' : category === 'writing' ? '#8B5CF6' : '#10B981'};
        }

        .article-content strong {
          color: #0A1128;
          font-weight: 600;
        }

        .article-content em {
          font-style: italic;
          color: rgba(10, 17, 40, 0.9);
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .article-content .article-p:first-of-type::first-letter {
            font-size: 3.5rem;
          }

          .article-h2 {
            font-size: 1.5rem;
          }

          .article-quote {
            padding: 1rem 1.25rem;
            font-size: 1.1rem;
            margin: 1.5rem 0;
          }
        }
      `}</style>
    </div>
  );
}
