'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { Search, Mail, ArrowRight, ArrowUpRight, Clock } from 'lucide-react';
import type { BlogPost, Contributor } from '@/types/database';
import { blogPosts as seedPosts } from '@/scripts/seed-blog-posts';

// ── House palette ───────────────────────────────────────────────
const NAVY = '#0A1128';
const GOLD = '#C9943A';
const CHERRY = '#C1292E';
const EMBER = '#E4572E';
const ROSE = '#6B0F20';
const CREAM = '#F5F0E8';

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const CATEGORY_LABEL: Record<string, string> = {
  dev: 'Development',
  writing: 'Writing',
  business: 'Business',
  notion: 'Notion Templates',
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC', // pin to UTC so server + client render the same date (no hydration mismatch)
  });
}

// Transform database post to article card format
function transformPost(post: BlogPost) {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt || '',
    coverImage: post.cover_image,
    category: post.category,
    publishedAt: post.published_at || post.created_at,
    readingTime: post.reading_time || 5,
    author: {
      name: post.contributor?.name || 'Nanda Kabali-Kagwa',
      avatar: post.contributor?.avatar || '/assets/professional/nanda-professional.jpg',
    },
    viewCount: post.view_count,
    likeCount: post.like_count,
  };
}

// Transform seed posts into the article card format
function transformSeedPost(post: typeof seedPosts[number]) {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt || '',
    coverImage: post.cover_image || '',
    category: post.category as 'dev' | 'writing' | 'business' | 'notion',
    publishedAt: post.published_at || new Date().toISOString(),
    readingTime: post.reading_time || 5,
    author: {
      name: 'Nanda Kabali-Kagwa',
      avatar: '/assets/professional/nanda-professional.jpg',
    },
    viewCount: 0,
    likeCount: 0,
  };
}

type Article = ReturnType<typeof transformPost>;

function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubscribe = async () => {
    if (!email || status === 'loading') return;
    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center gap-3 py-4">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center border"
          style={{ borderColor: `${GOLD}66`, background: `${GOLD}1a` }}
        >
          <span className="text-2xl" style={{ color: GOLD }}>✓</span>
        </div>
        <p className="font-display text-2xl italic" style={{ color: CREAM }}>
          You&apos;re in. Welcome to the letters.
        </p>
        <p className="text-sm" style={{ color: `${CREAM}80` }}>
          A confirmation is already on its way to your inbox.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
          placeholder="your@email.com"
          disabled={status === 'loading'}
          className="flex-1 px-6 py-4 bg-transparent border text-base focus:outline-none transition-all disabled:opacity-60"
          style={{
            borderColor: `${CREAM}33`,
            color: CREAM,
            borderRadius: 2,
          }}
        />
        <motion.button
          onClick={handleSubscribe}
          disabled={status === 'loading' || !email}
          className="px-8 py-4 font-mono text-xs uppercase tracking-[0.3em] transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
          style={{ background: GOLD, color: NAVY, borderRadius: 2 }}
          whileHover={{ scale: status === 'loading' ? 1 : 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {status === 'loading' ? (
            <><div className="w-4 h-4 border-2 rounded-full animate-spin" style={{ borderColor: `${NAVY}40`, borderTopColor: NAVY }} /> Sending</>
          ) : (
            <>Subscribe <ArrowRight className="w-4 h-4" /></>
          )}
        </motion.button>
      </div>
      {status === 'error' && (
        <p className="text-sm mt-3" style={{ color: EMBER }}>
          Something went wrong. Try again or write to nandaregine@gmail.com
        </p>
      )}
      <p className="text-xs mt-5 font-mono uppercase tracking-[0.25em]" style={{ color: `${CREAM}55` }}>
        No spam · Unsubscribe anytime
      </p>
    </>
  );
}

// ── Article card (editorial) ────────────────────────────────────
function ArticleCard({ article, index, reduce }: { article: Article; index: number; reduce: boolean | null }) {
  const href = `/blog/${article.category}/${article.slug}`;
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.06, 0.3), ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={href} className="group block">
        <div
          className="relative overflow-hidden mb-5"
          style={{ borderRadius: 3, background: `${NAVY}0a`, aspectRatio: '3 / 2' }}
        >
          {article.coverImage ? (
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
            />
          ) : (
            <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${NAVY}, ${ROSE})` }} />
          )}
          <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${NAVY}55, transparent 55%)` }} />
        </div>
        <div className="flex items-center gap-3 mb-3">
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.3em]" style={{ color: GOLD }}>
            {CATEGORY_LABEL[article.category] || article.category}
          </span>
          <span className="h-px flex-1" style={{ background: `${NAVY}1a` }} />
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] flex items-center gap-1" style={{ color: `${NAVY}66` }}>
            <Clock className="w-3 h-3" /> {article.readingTime}m
          </span>
        </div>
        <h3
          className="font-display text-2xl leading-snug mb-2 transition-colors"
          style={{ color: NAVY }}
        >
          <span className="bg-[length:0%_1px] bg-no-repeat bg-left-bottom group-hover:bg-[length:100%_1px] transition-all duration-500"
            style={{ backgroundImage: `linear-gradient(${GOLD}, ${GOLD})` }}>
            {article.title}
          </span>
        </h3>
        <p className="text-sm leading-relaxed line-clamp-3" style={{ color: `${NAVY}99` }}>
          {article.excerpt}
        </p>
        <p className="mt-4 font-mono text-[0.65rem] uppercase tracking-[0.25em]" style={{ color: `${NAVY}55` }}>
          {formatDate(article.publishedAt)}
        </p>
      </Link>
    </motion.div>
  );
}

export default function BlogPage() {
  const reduce = useReducedMotion();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [articles, setArticles] = useState<Article[]>(
    () => seedPosts.map(transformSeedPost)
  );
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(false);

  // Try to fetch live articles from Supabase (seed data is already loaded)
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/blog/posts');
        if (res.ok) {
          const posts = await res.json();
          if (posts && posts.length > 0) {
            setArticles(posts.map(transformPost));

            // Extract unique contributors
            const uniqueContributors = posts
              .filter((p: BlogPost) => p.contributor)
              .map((p: BlogPost) => p.contributor)
              .filter((c: Contributor, i: number, arr: Contributor[]) =>
                arr.findIndex((a) => a?.id === c?.id) === i
              );
            setContributors(uniqueContributors);
          }
        }
      } catch (error) {
        // Seed data is already loaded, so no action needed
        console.error('Error fetching posts:', error);
      }
    }

    fetchData();
  }, []);

  // Get featured article (first one with cover image, or first one)
  const featuredArticle = articles.find(a => a.coverImage) || articles[0];

  // Filter articles if searching
  const filteredArticles = searchQuery
    ? articles.filter(
        (a) =>
          a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : null;

  // Group articles by category
  const devArticles = articles.filter(a => a.category === 'dev');
  const writingArticles = articles.filter(a => a.category === 'writing');
  const businessArticles = articles.filter(a => a.category === 'business');
  const notionArticles = articles.filter(a => a.category === 'notion');

  // Categories that actually have posts — for the filter rail
  const categoryChips = [
    { key: 'all', label: 'All Writing', count: articles.length },
    { key: 'dev', label: CATEGORY_LABEL.dev, count: devArticles.length },
    { key: 'writing', label: CATEGORY_LABEL.writing, count: writingArticles.length },
    { key: 'business', label: CATEGORY_LABEL.business, count: businessArticles.length },
    { key: 'notion', label: CATEGORY_LABEL.notion, count: notionArticles.length },
  ].filter(c => c.count > 0);

  // The rest of the contents (excludes the lead), honouring the active chip
  const restArticles = articles
    .filter(a => a.slug !== featuredArticle?.slug)
    .filter(a => activeCategory === 'all' || a.category === activeCategory);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: NAVY }}>
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-12 h-12 border-2 rounded-full animate-spin" style={{ borderColor: `${GOLD}30`, borderTopColor: GOLD }} />
          <p className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: `${CREAM}80` }}>Loading the journal</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative" style={{ background: CREAM }}>
      {/* Grain texture */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{ backgroundImage: GRAIN, opacity: 0.14 }}
      />

      {/* ── Masthead ──────────────────────────────────────────── */}
      <header className="relative overflow-hidden" style={{ background: NAVY, color: CREAM }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: GRAIN, opacity: 0.12 }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(120% 80% at 80% -10%, ${ROSE}66, transparent 60%)` }}
        />
        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-16">
          <motion.p
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-mono text-xs uppercase tracking-[0.4em] mb-8"
            style={{ color: GOLD }}
          >
            The Journal · Field Notes from the Studio
          </motion.p>

          <motion.h1
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="font-display leading-[0.95]"
            style={{ fontSize: 'clamp(3.5rem, 11vw, 8rem)', color: CREAM }}
          >
            Writing
          </motion.h1>

          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="mt-8 grid md:grid-cols-[1fr_auto] gap-8 items-end"
          >
            <p className="font-display italic max-w-xl" style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.6rem)', color: `${CREAM}cc`, lineHeight: 1.5 }}>
              Essays on code and craft, poems in progress, and the quiet mechanics of building a
              creative life — written between the studio and the stage.
            </p>
            <div className="flex md:flex-col md:items-end gap-4 md:gap-1 font-mono text-xs uppercase tracking-[0.25em]" style={{ color: `${CREAM}80` }}>
              <span style={{ color: GOLD }}>Issue 001</span>
              <span>{articles.length} pieces</span>
              <span>Nandawula Regine</span>
            </div>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 max-w-md"
          >
            <div
              className="flex items-center gap-3 px-5 py-3 border"
              style={{ borderColor: `${CREAM}2e`, borderRadius: 2 }}
            >
              <Search className="w-4 h-4" style={{ color: GOLD }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search the archive…"
                className="flex-1 bg-transparent text-sm focus:outline-none"
                style={{ color: CREAM }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="font-mono text-[0.65rem] uppercase tracking-[0.2em]"
                  style={{ color: `${CREAM}80` }}
                >
                  Clear
                </button>
              )}
            </div>
          </motion.div>
        </div>
        {/* Gold hairline foot */}
        <div className="h-px w-full" style={{ background: `linear-gradient(to right, transparent, ${GOLD}80, transparent)` }} />
      </header>

      <div className="relative z-10">
        {/* ── Search results ────────────────────────────────── */}
        {filteredArticles && (
          <section className="py-16 px-6">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-end justify-between mb-10 pb-4 border-b" style={{ borderColor: `${NAVY}1a` }}>
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.3em] mb-2" style={{ color: GOLD }}>
                    Archive Search
                  </p>
                  <h2 className="font-display text-3xl" style={{ color: NAVY }}>
                    &ldquo;{searchQuery}&rdquo;
                    <span className="ml-3 text-lg" style={{ color: `${NAVY}55` }}>
                      {filteredArticles.length} result{filteredArticles.length === 1 ? '' : 's'}
                    </span>
                  </h2>
                </div>
                <button
                  onClick={() => setSearchQuery('')}
                  className="font-mono text-xs uppercase tracking-[0.2em] hover:opacity-70 transition-opacity"
                  style={{ color: CHERRY }}
                >
                  Clear search
                </button>
              </div>

              {filteredArticles.length === 0 ? (
                <div className="text-center py-24">
                  <Search className="w-12 h-12 mx-auto mb-5" style={{ color: `${NAVY}22` }} />
                  <p className="font-display text-2xl italic" style={{ color: `${NAVY}99` }}>
                    Nothing in the archive matches that yet.
                  </p>
                  <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em]" style={{ color: `${NAVY}55` }}>
                    Try a different word
                  </p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
                  {filteredArticles.map((article, i) => (
                    <ArticleCard key={article.slug} article={article} index={i} reduce={reduce} />
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* ── Contents (when not searching) ─────────────────── */}
        {!filteredArticles && (
          <>
            {/* Featured lead */}
            {featuredArticle && (
              <section className="py-16 px-6">
                <div className="max-w-6xl mx-auto">
                  <div className="flex items-center gap-4 mb-10">
                    <span className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: GOLD }}>
                      The Lead
                    </span>
                    <span className="h-px flex-1" style={{ background: `${NAVY}1a` }} />
                  </div>

                  <motion.div
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={`/blog/${featuredArticle.category}/${featuredArticle.slug}`}
                      className="group grid lg:grid-cols-2 gap-8 lg:gap-12 items-center"
                    >
                      <div
                        className="relative overflow-hidden order-1 lg:order-none"
                        style={{ borderRadius: 4, aspectRatio: '4 / 3', background: `${NAVY}0a` }}
                      >
                        {featuredArticle.coverImage ? (
                          <Image
                            src={featuredArticle.coverImage}
                            alt={featuredArticle.title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            priority
                            className="object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-[1.03]"
                          />
                        ) : (
                          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${NAVY}, ${ROSE})` }} />
                        )}
                        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${NAVY}4d, transparent 60%)` }} />
                      </div>

                      <div>
                        <div className="flex items-center gap-3 mb-5">
                          <span className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: CHERRY }}>
                            {CATEGORY_LABEL[featuredArticle.category] || featuredArticle.category}
                          </span>
                          <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] flex items-center gap-1" style={{ color: `${NAVY}66` }}>
                            <Clock className="w-3 h-3" /> {featuredArticle.readingTime} min read
                          </span>
                        </div>
                        <h2
                          className="font-display leading-[1.05] mb-5"
                          style={{ fontSize: 'clamp(2.25rem, 4.5vw, 3.75rem)', color: NAVY }}
                        >
                          {featuredArticle.title}
                        </h2>
                        <p className="font-display italic mb-8" style={{ fontSize: '1.35rem', lineHeight: 1.6, color: `${NAVY}b3` }}>
                          {featuredArticle.excerpt}
                        </p>
                        <span
                          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] pb-1 border-b transition-colors"
                          style={{ color: NAVY, borderColor: GOLD }}
                        >
                          Read the feature
                          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" style={{ color: GOLD }} />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                </div>
              </section>
            )}

            {/* Filter rail + grid */}
            <section className="py-12 px-6 pb-24">
              <div className="max-w-6xl mx-auto">
                <div className="flex flex-wrap items-center gap-4 mb-14 pb-6 border-b" style={{ borderColor: `${NAVY}1a` }}>
                  <span className="font-mono text-xs uppercase tracking-[0.3em] mr-2" style={{ color: `${NAVY}66` }}>
                    Sections
                  </span>
                  {categoryChips.map((chip) => {
                    const active = activeCategory === chip.key;
                    return (
                      <button
                        key={chip.key}
                        onClick={() => setActiveCategory(chip.key)}
                        className="font-mono text-xs uppercase tracking-[0.2em] px-4 py-2 border transition-all"
                        style={{
                          borderRadius: 2,
                          color: active ? CREAM : NAVY,
                          background: active ? NAVY : 'transparent',
                          borderColor: active ? NAVY : `${NAVY}22`,
                        }}
                      >
                        {chip.label}
                        <span className="ml-2" style={{ color: active ? GOLD : `${NAVY}55` }}>{chip.count}</span>
                      </button>
                    );
                  })}
                </div>

                {restArticles.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                    {restArticles.map((article, i) => (
                      <ArticleCard key={article.slug} article={article} index={i} reduce={reduce} />
                    ))}
                  </div>
                ) : (
                  <p className="font-display text-2xl italic text-center py-16" style={{ color: `${NAVY}88` }}>
                    More from this section is on the way.
                  </p>
                )}
              </div>
            </section>

            {/* ── Newsletter ─────────────────────────────────── */}
            <section className="relative px-6 py-28 overflow-hidden" style={{ background: NAVY }}>
              <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: GRAIN, opacity: 0.12 }} />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: `radial-gradient(90% 60% at 50% 120%, ${ROSE}66, transparent 60%)` }}
              />
              <div className="relative z-10 max-w-2xl mx-auto text-center">
                <motion.div
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                >
                  <div
                    className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-8 border"
                    style={{ borderColor: `${GOLD}66`, background: `${GOLD}12` }}
                  >
                    <Mail className="w-6 h-6" style={{ color: GOLD }} />
                  </div>
                  <p className="font-mono text-xs uppercase tracking-[0.4em] mb-6" style={{ color: GOLD }}>
                    Letters from the Studio
                  </p>
                  <h2 className="font-display leading-tight mb-6" style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', color: CREAM }}>
                    New writing, <span className="italic" style={{ color: GOLD }}>delivered by hand.</span>
                  </h2>
                  <p className="text-base mb-10 max-w-lg mx-auto" style={{ color: `${CREAM}b3`, lineHeight: 1.7 }}>
                    Every new essay, poem, and template — sent the moment it&apos;s finished.
                    No noise, no schedule. Only the work.
                  </p>
                  <SubscribeForm />
                </motion.div>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
