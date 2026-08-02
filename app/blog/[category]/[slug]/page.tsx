'use client';

import { useParams } from 'next/navigation';
import { motion, useReducedMotion } from 'framer-motion';
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
} from 'lucide-react';
import {
  LikeButton,
  ViewCounter,
  ReaderReviews,
} from '@/components/blog';
import type { BlogPost } from '@/types/database';
import { blogPosts as seedPosts } from '@/scripts/seed-blog-posts';

// ── House palette ───────────────────────────────────────────────
const NAVY = '#0A1128';
const GOLD = '#C9943A';
const CHERRY = '#C1292E';
const ROSE = '#6B0F20';
const CREAM = '#F5F0E8';

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

interface ArticleData {
  post: BlogPost;
  tableOfContents: { id: string; title: string; level: number }[];
}

const categoryMeta: Record<string, { label: string }> = {
  dev: { label: 'Development' },
  writing: { label: 'Writing' },
  business: { label: 'Business' },
  notion: { label: 'Notion Templates' },
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC', // pin to UTC so server + client render the same date (no hydration mismatch)
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

// Escape raw HTML characters to prevent XSS before markdown processing
function escapeHtml(raw: string): string {
  return raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

// Render markdown content with magazine styling
// Input is first HTML-escaped so that user content cannot inject arbitrary tags.
function renderContent(content: string, _category: string) {
  // Escape raw user content first — prevents XSS via dangerouslySetInnerHTML
  const safe = escapeHtml(content);

  let html = safe
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
    .replace(/^&gt;\s*(.+)$/gm,
      `<blockquote class="article-quote"><span class="quote-mark">&ldquo;</span>$1</blockquote>`
    )
    // Lists
    .replace(/^\d+\.\s+(.+)$/gm, '<li class="article-li">$1</li>')
    .replace(/^-\s+(.+)$/gm, '<li class="article-li-bullet">$1</li>')
    // Paragraphs
    .replace(/\n\n/g, '</p><p class="article-p">');

  html = `<p class="article-p">${html}</p>`;

  return html;
}

export default function BlogPostPage() {
  const reduce = useReducedMotion();
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

  // Fetch article data
  useEffect(() => {
    async function fetchArticle() {
      try {
        const res = await fetch(`/api/blog/posts/${slug}`);
        if (res.ok) {
          const post = await res.json();
          if (post && post.content) {
            const tableOfContents = generateTOC(post.content);
            setArticleData({ post, tableOfContents });
            setLoading(false);
            return;
          }
        }

        // Fallback to seed data
        const seedPost = seedPosts.find(p => p.slug === slug);
        if (seedPost) {
          const post: BlogPost = {
            id: seedPost.slug,
            slug: seedPost.slug,
            title: seedPost.title,
            excerpt: seedPost.excerpt,
            content: seedPost.content,
            cover_image: seedPost.cover_image,
            category: seedPost.category as 'dev' | 'writing' | 'business',
            tags: seedPost.tags,
            reading_time: seedPost.reading_time,
            is_published: seedPost.is_published,
            is_featured: seedPost.is_featured,
            published_at: seedPost.published_at,
            created_at: seedPost.published_at || new Date().toISOString(),
            updated_at: new Date().toISOString(),
            view_count: 0,
            like_count: 0,
            author_id: null,
          };
          const tableOfContents = generateTOC(post.content);
          setArticleData({ post, tableOfContents });
        } else {
          setError('Article not found');
        }
      } catch (err) {
        // Fallback to seed data on error
        const seedPost = seedPosts.find(p => p.slug === slug);
        if (seedPost) {
          const post: BlogPost = {
            id: seedPost.slug,
            slug: seedPost.slug,
            title: seedPost.title,
            excerpt: seedPost.excerpt,
            content: seedPost.content,
            cover_image: seedPost.cover_image,
            category: seedPost.category as 'dev' | 'writing' | 'business',
            tags: seedPost.tags,
            reading_time: seedPost.reading_time,
            is_published: seedPost.is_published,
            is_featured: seedPost.is_featured,
            published_at: seedPost.published_at,
            created_at: seedPost.published_at || new Date().toISOString(),
            updated_at: new Date().toISOString(),
            view_count: 0,
            like_count: 0,
            author_id: null,
          };
          const tableOfContents = generateTOC(post.content);
          setArticleData({ post, tableOfContents });
        } else {
          setError(err instanceof Error ? err.message : 'Failed to load article');
        }
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
      <div className="min-h-screen flex items-center justify-center" style={{ background: NAVY }}>
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-12 h-12 border-2 rounded-full animate-spin" style={{ borderColor: `${GOLD}30`, borderTopColor: GOLD }} />
          <p className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: `${CREAM}80` }}>Turning the page</p>
        </motion.div>
      </div>
    );
  }

  if (error || !articleData) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6" style={{ background: CREAM }}>
        <div className="text-center max-w-md">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 border"
            style={{ borderColor: `${GOLD}66`, background: `${GOLD}12` }}
          >
            <BookOpen className="w-8 h-8" style={{ color: GOLD }} />
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.3em] mb-4" style={{ color: CHERRY }}>
            Missing Page
          </p>
          <h1 className="font-display text-4xl mb-4" style={{ color: NAVY }}>
            This story isn&apos;t here.
          </h1>
          <p className="mb-8" style={{ color: `${NAVY}99` }}>
            The article you&apos;re looking for doesn&apos;t exist or hasn&apos;t been published yet.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] px-6 py-3"
            style={{ background: NAVY, color: CREAM, borderRadius: 2 }}
          >
            <ArrowLeft className="w-4 h-4" /> Back to the Journal
          </Link>
        </div>
      </div>
    );
  }

  const { post, tableOfContents } = articleData;

  return (
    <div className="min-h-screen relative" style={{ background: CREAM }}>
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-50 origin-left"
        style={{ scaleX: readProgress / 100, background: GOLD }}
      />

      {/* Page grain */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{ backgroundImage: GRAIN, opacity: 0.13 }} />

      {/* ── Full-bleed magazine hero ──────────────────────────── */}
      <header className="relative overflow-hidden" style={{ background: NAVY, minHeight: '78vh' }}>
        {/* Cover image */}
        {post.cover_image && (
          <div className="absolute inset-0">
            <Image
              src={post.cover_image}
              alt=""
              fill
              priority
              className="object-cover"
            />
          </div>
        )}
        {/* Warm dark veil */}
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(to top, ${NAVY} 8%, ${NAVY}d9 38%, ${ROSE}55 78%, ${NAVY}66)` }}
        />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: GRAIN, opacity: 0.15 }} />

        <div className="relative z-10 max-w-4xl mx-auto px-6 pt-24 pb-16 flex flex-col justify-end" style={{ minHeight: '78vh' }}>
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.3em] mb-10 transition-colors group w-fit"
            style={{ color: `${CREAM}b3` }}
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            The Journal
          </Link>

          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Kicker */}
            <div className="flex items-center gap-4 mb-6">
              <span className="font-mono text-xs uppercase tracking-[0.4em]" style={{ color: GOLD }}>
                {meta.label}
              </span>
              <span className="h-px w-12" style={{ background: `${GOLD}80` }} />
              <span className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: `${CREAM}80` }}>
                Issue 001
              </span>
            </div>

            {/* Title */}
            <h1
              className="font-display italic leading-[1.02] mb-7 break-words"
              style={{ fontSize: 'clamp(2.5rem, 6.5vw, 5rem)', color: CREAM }}
            >
              {post.title}
            </h1>

            {/* Excerpt */}
            {post.excerpt && (
              <p
                className="font-display mb-10 max-w-2xl"
                style={{ fontSize: 'clamp(1.15rem, 2vw, 1.5rem)', color: `${CREAM}cc`, lineHeight: 1.55 }}
              >
                {post.excerpt}
              </p>
            )}

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-4 pt-6 border-t" style={{ borderColor: `${CREAM}26` }}>
              <div className="flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-full overflow-hidden" style={{ boxShadow: `0 0 0 1px ${GOLD}80` }}>
                  <Image
                    src={post.contributor?.avatar || '/assets/professional/nanda-professional.jpg'}
                    alt={post.contributor?.name || 'Author'}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-display text-lg leading-tight" style={{ color: CREAM }}>
                    {post.contributor?.name || 'Nandawula Regine'}
                  </p>
                  <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em]" style={{ color: `${CREAM}80` }}>
                    {post.contributor?.title || 'Poet · Performer · AI Engineer'}
                  </p>
                </div>
              </div>

              <span className="h-8 w-px hidden sm:block" style={{ background: `${CREAM}26` }} />

              <div className="flex items-center gap-5 font-mono text-[0.7rem] uppercase tracking-[0.2em]" style={{ color: `${CREAM}b3` }}>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" style={{ color: GOLD }} />
                  {formatDate(post.published_at || post.created_at)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" style={{ color: GOLD }} />
                  {post.reading_time || 5} min read
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* ── Main Content Area ─────────────────────────────────── */}
      <main className="relative z-10">
        {/* Engagement Sidebar (Floating) */}
        <div className="hidden xl:block fixed left-8 top-1/2 -translate-y-1/2 z-40">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col items-center gap-4 py-4 px-2 border"
            style={{ background: `${CREAM}f2`, borderColor: `${NAVY}14`, borderRadius: 999 }}
          >
            <LikeButton slug={slug} initialLikeCount={post.like_count} variant="floating" />
            <div className="w-8 h-px" style={{ background: `${NAVY}1a` }} />
            <ViewCounter slug={slug} initialViewCount={post.view_count} variant="compact" />
          </motion.div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-[1fr_240px] gap-14">
            {/* Article Content */}
            <motion.article
              id="article-content"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-none min-w-0"
            >
              {/* Magazine Drop Cap for first paragraph */}
              <div
                className="article-content"
                dangerouslySetInnerHTML={{
                  __html: renderContent(post.content, category),
                }}
              />

              {/* Mobile engagement bar */}
              <div className="flex items-center justify-between py-6 mt-10 border-t lg:hidden" style={{ borderColor: `${NAVY}1a` }}>
                <LikeButton slug={slug} initialLikeCount={post.like_count} />
                <ViewCounter slug={slug} initialViewCount={post.view_count} variant="badge" />
              </div>

              {/* Section rule */}
              <div className="flex items-center gap-4 mt-16 mb-10">
                <span className="h-px flex-1" style={{ background: `${NAVY}1a` }} />
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.3em]" style={{ color: GOLD }}>
                  The Author
                </span>
                <span className="h-px flex-1" style={{ background: `${NAVY}1a` }} />
              </div>

              {/* Author Card at end */}
              <div className="p-8 border" style={{ background: NAVY, borderColor: `${GOLD}33`, borderRadius: 4 }}>
                <div className="flex items-start gap-5">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0" style={{ boxShadow: `0 0 0 1px ${GOLD}80` }}>
                    <Image
                      src={post.contributor?.avatar || '/assets/professional/nanda-professional.jpg'}
                      alt={post.contributor?.name || 'Author'}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-mono text-[0.65rem] uppercase tracking-[0.3em] mb-2" style={{ color: GOLD }}>Written by</p>
                    <h4 className="font-display text-2xl" style={{ color: CREAM }}>
                      {post.contributor?.name || 'Nandawula Regine'}
                    </h4>
                    <p className="text-sm mt-2" style={{ color: `${CREAM}b3`, lineHeight: 1.7 }}>
                      {post.contributor?.bio || 'Poet, performer, and AI engineer building beautiful digital experiences and writing verse that heals.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Reader Reviews */}
              <ReaderReviews slug={slug} initialReviews={post.reviews} />

              {/* Back to writing */}
              <div className="mt-16 pt-8 border-t" style={{ borderColor: `${NAVY}1a` }}>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] pb-1 border-b transition-opacity hover:opacity-70"
                  style={{ color: NAVY, borderColor: GOLD }}
                >
                  <ArrowLeft className="w-4 h-4" style={{ color: GOLD }} />
                  Back to all writing
                </Link>
              </div>
            </motion.article>

            {/* Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-8">
                {/* Table of Contents */}
                {tableOfContents.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="w-6 h-px" style={{ background: GOLD }} />
                      <h3 className="font-mono text-[0.65rem] uppercase tracking-[0.3em]" style={{ color: `${NAVY}99` }}>
                        In This Piece
                      </h3>
                    </div>
                    <nav className="space-y-2.5 border-l" style={{ borderColor: `${NAVY}14` }}>
                      {tableOfContents.map((item) => (
                        <a
                          key={item.id}
                          href={`#${item.id}`}
                          className={`block text-sm transition-colors hover:opacity-100 pl-4 -ml-px border-l-2 border-transparent hover:border-current ${
                            item.level === 3 ? 'pl-7 text-xs' : ''
                          }`}
                          style={{ color: `${NAVY}99` }}
                        >
                          {item.title}
                        </a>
                      ))}
                    </nav>
                  </div>
                )}

                {/* Share */}
                <div>
                  <h3 className="font-mono text-[0.65rem] uppercase tracking-[0.3em] mb-4 flex items-center gap-2" style={{ color: `${NAVY}99` }}>
                    <Share2 className="w-3.5 h-3.5" />
                    Share
                  </h3>
                  <div className="flex gap-2">
                    <a
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&text=${encodeURIComponent(post.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 border transition-colors hover:opacity-70"
                      style={{ borderColor: `${NAVY}1a`, borderRadius: 2 }}
                    >
                      <Twitter className="w-4 h-4" style={{ color: NAVY }} />
                    </a>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 border transition-colors hover:opacity-70"
                      style={{ borderColor: `${NAVY}1a`, borderRadius: 2 }}
                    >
                      <Linkedin className="w-4 h-4" style={{ color: NAVY }} />
                    </a>
                    <button
                      onClick={handleCopyLink}
                      className="p-3 border transition-colors hover:opacity-70 relative"
                      style={{ borderColor: `${NAVY}1a`, borderRadius: 2 }}
                    >
                      <LinkIcon className="w-4 h-4" style={{ color: NAVY }} />
                      {copied && (
                        <span
                          className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs px-2 py-1 whitespace-nowrap"
                          style={{ background: NAVY, color: CREAM, borderRadius: 2 }}
                        >
                          Copied!
                        </span>
                      )}
                    </button>
                  </div>
                </div>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div>
                    <h3 className="font-mono text-[0.65rem] uppercase tracking-[0.3em] mb-4" style={{ color: `${NAVY}99` }}>
                      Topics
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.15em] border"
                          style={{ color: `${NAVY}99`, borderColor: `${NAVY}1a`, borderRadius: 2 }}
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
          className="fixed bottom-8 right-8 p-3 shadow-lg transition-colors z-50"
          style={{ background: GOLD, color: NAVY, borderRadius: 999 }}
        >
          <ChevronUp className="w-6 h-6" />
        </motion.button>
      )}

      {/* Magazine Typography Styles */}
      <style jsx global>{`
        .article-content {
          font-family: var(--font-dm-sans), sans-serif;
          color: ${NAVY};
          /* Keep long words / URLs from pushing past the viewport on mobile */
          overflow-wrap: break-word;
          word-wrap: break-word;
          hyphens: auto;
        }

        .article-content .article-p {
          font-size: 1.15rem;
          line-height: 1.95;
          margin-bottom: 1.6rem;
          color: rgba(10, 17, 40, 0.82);
          max-width: 65ch;
        }

        /* Magazine-style drop cap for first paragraph */
        .article-content .article-p:first-of-type::first-letter {
          float: left;
          font-family: var(--font-cormorant), serif;
          font-size: 5rem;
          font-weight: 600;
          line-height: 0.72;
          padding-right: 0.75rem;
          padding-top: 0.4rem;
          color: ${GOLD};
        }

        .article-h2 {
          font-family: var(--font-cormorant), serif;
          font-size: 2.25rem;
          font-style: italic;
          font-weight: 600;
          color: ${NAVY};
          margin-top: 3.25rem;
          margin-bottom: 1.25rem;
          position: relative;
          padding-left: 1.1rem;
          max-width: 65ch;
        }

        .article-h2::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.4rem;
          bottom: 0.4rem;
          width: 3px;
          background: ${GOLD};
          border-radius: 2px;
        }

        .article-h3 {
          font-family: var(--font-cormorant), serif;
          font-size: 1.5rem;
          font-weight: 600;
          color: ${NAVY};
          margin-top: 2.25rem;
          margin-bottom: 1rem;
          max-width: 65ch;
        }

        /* Pull quote styling */
        .article-quote {
          position: relative;
          margin: 3rem 0;
          padding: 0.5rem 0 0.5rem 2.5rem;
          border-left: 2px solid ${GOLD};
          font-family: var(--font-cormorant), serif;
          font-style: italic;
          font-size: 1.75rem;
          line-height: 1.5;
          color: ${NAVY};
          max-width: 65ch;
        }

        .article-quote .quote-mark {
          font-family: var(--font-cormorant), serif;
          font-size: 3.5rem;
          font-style: normal;
          line-height: 0;
          position: absolute;
          left: 0.5rem;
          top: 1.75rem;
          color: ${CHERRY};
          opacity: 0.35;
        }

        .article-code {
          background: ${NAVY};
          color: ${CREAM};
          padding: 1.5rem;
          border-radius: 4px;
          overflow-x: auto;
          margin: 1.75rem 0;
          font-family: var(--font-mono), monospace;
          font-size: 0.9rem;
          line-height: 1.65;
          border: 1px solid ${GOLD}33;
          max-width: 65ch;
        }

        .article-inline-code {
          background: rgba(10, 17, 40, 0.06);
          color: ${CHERRY};
          padding: 0.15rem 0.5rem;
          border-radius: 3px;
          font-family: var(--font-mono), monospace;
          font-size: 0.85em;
          /* Long tokens (paths, identifiers) must wrap, not overflow */
          overflow-wrap: anywhere;
          word-break: break-word;
        }

        .article-li, .article-li-bullet {
          color: rgba(10, 17, 40, 0.82);
          margin-bottom: 0.75rem;
          line-height: 1.75;
          padding-left: 0.5rem;
          font-size: 1.1rem;
          max-width: 63ch;
        }

        .article-li-bullet::marker {
          color: ${GOLD};
        }

        .article-content a {
          color: ${CHERRY};
          text-decoration: underline;
          text-decoration-color: ${GOLD}80;
          text-underline-offset: 3px;
          transition: color 0.2s;
        }

        .article-content a:hover {
          color: ${ROSE};
        }

        .article-content strong {
          color: ${NAVY};
          font-weight: 700;
        }

        .article-content em {
          font-style: italic;
          color: rgba(10, 17, 40, 0.92);
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .article-content .article-p:first-of-type::first-letter {
            font-size: 3.75rem;
          }

          .article-h2 {
            font-size: 1.75rem;
          }

          .article-quote {
            padding-left: 1.5rem;
            font-size: 1.4rem;
            margin: 2rem 0;
          }
        }
      `}</style>
    </div>
  );
}
