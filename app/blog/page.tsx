'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Mail, Sparkles, ArrowRight } from 'lucide-react';
import {
  MagazineHero,
  ArticleCoverCard,
  FeaturedContributors,
  CategorySectionHeader,
  AuthorBioCard,
} from '@/components/blog';
import type { BlogPost, Contributor } from '@/types/database';
import { blogPosts as seedPosts } from '@/scripts/seed-blog-posts';

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
        <div className="w-14 h-14 bg-emerald-500/20 rounded-full flex items-center justify-center">
          <span className="text-2xl">✓</span>
        </div>
        <p className="text-beige font-semibold text-lg">You&apos;re in! Check your inbox ✨</p>
        <p className="text-beige/50 text-sm">Welcome to The Current. A confirmation email is on its way.</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
          placeholder="your@email.com"
          disabled={status === 'loading'}
          className="flex-1 px-6 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-beige/20 text-beige placeholder:text-beige/40 focus:outline-none focus:border-cherry/50 focus:ring-2 focus:ring-cherry/20 transition-all disabled:opacity-60"
        />
        <motion.button
          onClick={handleSubscribe}
          disabled={status === 'loading' || !email}
          className="px-8 py-4 bg-cherry text-white rounded-full font-medium hover:bg-cherry-dark transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
          whileHover={{ scale: status === 'loading' ? 1 : 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          {status === 'loading' ? (
            <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Subscribing...</>
          ) : (
            <>Subscribe <ArrowRight className="w-4 h-4" /></>
          )}
        </motion.button>
      </div>
      {status === 'error' && (
        <p className="text-red-400 text-sm mt-3">Something went wrong. Try again or email nandaregine@gmail.com</p>
      )}
      <p className="text-xs text-beige/40 mt-4">
        No spam. Unsubscribe anytime. We respect your inbox.
      </p>
    </>
  );
}

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [articles, setArticles] = useState<ReturnType<typeof transformPost>[]>(
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

  // Default contributor if no posts yet
  const defaultContributor = {
    slug: 'nanda-kabali-kagwa',
    name: 'Nanda Kabali-Kagwa',
    title: 'Creative Technologist & Poet',
    bio: 'Building beautiful digital experiences and writing poetry that heals. Author of "Inside Her Roses".',
    avatar: '/assets/professional/nanda-professional.jpg',
    twitter: 'https://twitter.com/creativelynanda',
    linkedin: 'https://linkedin.com/in/nanda-kabali-kagwa',
    instagram: 'https://instagram.com/creativelynanda',
    website: 'https://creativelynanda.co.za',
    specialties: ['dev', 'writing', 'business'] as ('dev' | 'writing' | 'business')[],
    articleCount: articles.length,
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
          <p className="text-navy/60">Loading magazine...</p>
        </motion.div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-parchment">
      {/* Grain texture */}
      <div
        className="fixed inset-0 pointer-events-none opacity-30 z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      {/* Magazine Hero */}
      <MagazineHero
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        featuredArticle={featuredArticle ? {
          title: featuredArticle.title,
          excerpt: featuredArticle.excerpt,
          category: featuredArticle.category,
          slug: featuredArticle.slug,
        } : undefined}
        issueNumber={1}
      />

      {/* Search Results */}
      {filteredArticles && (
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between mb-8"
            >
              <h2 className="text-2xl font-display font-bold text-navy">
                Search Results
                <span className="ml-2 text-navy/40">({filteredArticles.length})</span>
              </h2>
              <button
                onClick={() => setSearchQuery('')}
                className="text-sm text-cherry hover:underline"
              >
                Clear search
              </button>
            </motion.div>

            {filteredArticles.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <Search className="w-16 h-16 text-navy/20 mx-auto mb-4" />
                <p className="text-navy/60 text-lg">No articles found matching "{searchQuery}"</p>
                <p className="text-navy/40 mt-2">Try a different search term</p>
              </motion.div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.map((article, i) => (
                  <ArticleCoverCard key={article.slug} article={article} index={i} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Main Content (when not searching) */}
      {!filteredArticles && (
        <>
          {/* Featured Contributors */}
          <FeaturedContributors
            contributors={contributors.length > 0 ? contributors : [defaultContributor as unknown as Contributor]}
          />

          {/* Featured Article Spotlight */}
          {featuredArticle && (
            <section className="py-16 px-6">
              <div className="max-w-7xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center mb-8"
                >
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-cherry/10 text-cherry rounded-full text-sm font-medium mb-4">
                    <Sparkles className="w-4 h-4" />
                    Editor's Pick
                  </span>
                  <h2 className="text-2xl font-display font-bold text-navy">
                    Featured This Issue
                  </h2>
                </motion.div>

                <ArticleCoverCard
                  article={featuredArticle}
                  index={0}
                  variant="featured"
                />
              </div>
            </section>
          )}

          {/* Development Articles */}
          {devArticles.length > 0 && (
            <section className="py-16 px-6 bg-gradient-to-b from-parchment to-blue-50/30">
              <div className="max-w-7xl mx-auto">
                <CategorySectionHeader
                  category="dev"
                  articleCount={devArticles.length}
                />
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {devArticles.slice(0, 3).map((article, i) => (
                    <ArticleCoverCard key={article.slug} article={article} index={i} />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Writing Articles */}
          {writingArticles.length > 0 && (
            <section className="py-16 px-6 bg-gradient-to-b from-blue-50/30 via-parchment to-purple-50/30">
              <div className="max-w-7xl mx-auto">
                <CategorySectionHeader
                  category="writing"
                  articleCount={writingArticles.length}
                />
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {writingArticles.slice(0, 3).map((article, i) => (
                    <ArticleCoverCard key={article.slug} article={article} index={i} />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Notion Template Articles */}
          {notionArticles.length > 0 && (
            <section className="py-16 px-6 bg-gradient-to-b from-parchment to-amber-50/30">
              <div className="max-w-7xl mx-auto">
                <CategorySectionHeader
                  category={'business' as 'dev' | 'writing' | 'business'}
                  articleCount={notionArticles.length}
                />
                <div className="mb-4 -mt-4">
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-semibold">
                    🗂️ Notion Templates — Mirembe Muse
                  </span>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {notionArticles.slice(0, 6).map((article, i) => (
                    <ArticleCoverCard key={article.slug} article={article} index={i} />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Business Articles */}
          {businessArticles.length > 0 && (
            <section className="py-16 px-6 bg-gradient-to-b from-purple-50/30 to-emerald-50/30">
              <div className="max-w-7xl mx-auto">
                <CategorySectionHeader
                  category="business"
                  articleCount={businessArticles.length}
                />

                {/* Author Bio Card */}
                <AuthorBioCard
                  author={{
                    name: 'Nanda Kabali-Kagwa',
                    title: 'Creative Technologist & Entrepreneur',
                    bio: 'I share insights on freelancing, digital products, and building sustainable businesses in South Africa. From Notion templates to passive income strategies, I write about what I\'ve learned building multiple revenue streams while pursuing creative work.',
                    avatar: '/assets/professional/nanda-professional.jpg',
                    twitter: 'https://twitter.com/creativelynanda',
                    linkedin: 'https://linkedin.com/in/nanda-kabali-kagwa',
                    instagram: 'https://instagram.com/creativelynanda',
                    website: 'https://creativelynanda.co.za',
                  }}
                  category="business"
                />

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {businessArticles.slice(0, 3).map((article, i) => (
                    <ArticleCoverCard key={article.slug} article={article} index={i} />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Newsletter CTA */}
          <section className="relative py-24 px-6 bg-navy overflow-hidden">
            {/* Animated orbs */}
            <motion.div
              className="absolute top-1/2 left-0 w-96 h-96 bg-cherry/20 rounded-full blur-3xl -translate-y-1/2"
              animate={{
                x: [-50, 50, -50],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div
              className="absolute top-1/2 right-0 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2"
              animate={{
                x: [50, -50, 50],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{ duration: 10, repeat: Infinity }}
            />

            {/* Grain overlay */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              }}
            />

            <div className="max-w-3xl mx-auto text-center relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                {/* Mail icon */}
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-cherry to-pink-500 mb-8"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                >
                  <Mail className="w-8 h-8 text-white" />
                </motion.div>

                <h2 className="text-3xl md:text-5xl font-display font-bold text-beige mb-6">
                  Never Miss an{' '}
                  <motion.span
                    className="text-transparent bg-clip-text bg-gradient-to-r from-cherry via-pink-400 to-cherry bg-[length:200%_auto]"
                    animate={{ backgroundPosition: ['0%', '200%'] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                  >
                    Issue
                  </motion.span>
                </h2>
                <p className="text-lg text-beige/70 mb-10 max-w-xl mx-auto">
                  Join the community. Get exclusive articles, early access to new content,
                  and insights delivered straight to your inbox.
                </p>

                <SubscribeForm />
              </motion.div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
