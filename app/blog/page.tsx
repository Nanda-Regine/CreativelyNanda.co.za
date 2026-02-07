'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Search, Mail, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui';
import {
  MagazineHero,
  ArticleCoverCard,
  FeaturedContributors,
  CategorySectionHeader,
} from '@/components/blog';
import { blogCategoryThemes } from '@/lib/blog-themes';

// Sample articles - will be fetched from Supabase in production
const ARTICLES = [
  {
    slug: 'building-notion-templates-that-sell',
    title: 'Building Notion Templates That Actually Sell',
    excerpt: 'A deep dive into creating Notion templates that solve real problems and generate passive income for creators.',
    coverImage: '/assets/professional/nanda-consulting.jpg',
    category: 'business',
    publishedAt: '2024-02-01',
    readingTime: 8,
    author: { name: 'Nanda Kabali-Kagwa', avatar: null },
  },
  {
    slug: 'nextjs-14-app-router-guide',
    title: 'Next.js 14 App Router: A Practical Guide',
    excerpt: 'Everything you need to know about the App Router, Server Components, and building modern React applications.',
    coverImage: null, // Will show themed fallback
    category: 'dev',
    publishedAt: '2024-01-28',
    readingTime: 12,
    author: { name: 'Nanda Kabali-Kagwa', avatar: null },
  },
  {
    slug: 'poetry-as-therapy',
    title: 'Poetry as Therapy: Writing Through Pain',
    excerpt: 'How writing poetry helped me process grief, trauma, and find healing through the power of words.',
    coverImage: '/assets/poetry-book/book-cover-1.jpg',
    category: 'writing',
    publishedAt: '2024-01-20',
    readingTime: 6,
    author: { name: 'Nanda Kabali-Kagwa', avatar: null },
  },
  {
    slug: 'freelancing-in-south-africa',
    title: 'Freelancing in South Africa: The Real Talk',
    excerpt: 'Navigating load-shedding, payments, and building a sustainable freelance career in SA.',
    coverImage: null,
    category: 'business',
    publishedAt: '2024-01-15',
    readingTime: 10,
    author: { name: 'Nanda Kabali-Kagwa', avatar: null },
  },
  {
    slug: 'typescript-for-beginners',
    title: 'TypeScript for JavaScript Developers',
    excerpt: 'A gentle introduction to TypeScript that will make you wonder why you waited so long to make the switch.',
    coverImage: '/assets/professional/nanda-consulting.jpg',
    category: 'dev',
    publishedAt: '2024-01-10',
    readingTime: 15,
    author: { name: 'Nanda Kabali-Kagwa', avatar: null },
  },
  {
    slug: 'inside-her-roses-journey',
    title: 'The Journey of "Inside Her Roses"',
    excerpt: 'From late-night scribbles to a published book - the story behind my debut poetry collection.',
    coverImage: null,
    category: 'writing',
    publishedAt: '2024-01-05',
    readingTime: 7,
    author: { name: 'Nanda Kabali-Kagwa', avatar: null },
  },
  {
    slug: 'react-server-components-deep-dive',
    title: 'React Server Components: A Deep Dive',
    excerpt: 'Understanding the paradigm shift in React development and how RSC changes everything we know.',
    coverImage: null,
    category: 'dev',
    publishedAt: '2024-01-02',
    readingTime: 18,
    author: { name: 'Nanda Kabali-Kagwa', avatar: null },
  },
  {
    slug: 'black-girl-magic-poetry',
    title: 'Writing Black Girl Magic: Celebrating Identity',
    excerpt: 'Exploring themes of identity, heritage, and empowerment through contemporary African poetry.',
    coverImage: '/assets/poetry-book/book-cover-1.jpg',
    category: 'writing',
    publishedAt: '2023-12-28',
    readingTime: 5,
    author: { name: 'Nanda Kabali-Kagwa', avatar: null },
  },
  {
    slug: 'digital-products-passive-income',
    title: 'Digital Products: Building Passive Income Streams',
    excerpt: 'How I built multiple revenue streams through digital products while working a full-time job.',
    coverImage: null,
    category: 'business',
    publishedAt: '2023-12-20',
    readingTime: 12,
    author: { name: 'Nanda Kabali-Kagwa', avatar: null },
  },
];

// Sample contributors - will be fetched from Supabase in production
const CONTRIBUTORS = [
  {
    slug: 'nanda-kabali-kagwa',
    name: 'Nanda Kabali-Kagwa',
    title: 'Creative Technologist & Poet',
    bio: 'Building beautiful digital experiences and writing poetry that heals. Author of "Inside Her Roses".',
    avatar: '/assets/professional/nanda-professional.png',
    twitter: 'https://twitter.com/creativelynanda',
    linkedin: 'https://linkedin.com/in/nanda-kabali-kagwa',
    instagram: 'https://instagram.com/creativelynanda',
    website: 'https://creativelynanda.co.za',
    specialties: ['dev', 'writing', 'business'],
    articleCount: 9,
  },
  // More contributors will be added as the community grows
];

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');

  // Get featured article (first one with cover image, or first one)
  const featuredArticle = ARTICLES.find(a => a.coverImage) || ARTICLES[0];

  // Filter articles if searching
  const filteredArticles = searchQuery
    ? ARTICLES.filter(
        (a) =>
          a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : null;

  // Group articles by category
  const devArticles = ARTICLES.filter(a => a.category === 'dev');
  const writingArticles = ARTICLES.filter(a => a.category === 'writing');
  const businessArticles = ARTICLES.filter(a => a.category === 'business');

  return (
    <div className="min-h-screen bg-parchment">
      {/* Magazine Hero */}
      <MagazineHero
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        featuredArticle={{
          title: featuredArticle.title,
          excerpt: featuredArticle.excerpt,
          category: featuredArticle.category,
          slug: featuredArticle.slug,
        }}
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
          <FeaturedContributors contributors={CONTRIBUTORS} />

          {/* Featured Article Spotlight */}
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

          {/* Development Articles */}
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

          {/* Writing Articles */}
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

          {/* Business Articles */}
          <section className="py-16 px-6 bg-gradient-to-b from-purple-50/30 to-emerald-50/30">
            <div className="max-w-7xl mx-auto">
              <CategorySectionHeader
                category="business"
                articleCount={businessArticles.length}
              />
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {businessArticles.slice(0, 3).map((article, i) => (
                  <ArticleCoverCard key={article.slug} article={article} index={i} />
                ))}
              </div>
            </div>
          </section>

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

                <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="flex-1 px-6 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-beige/20 text-beige placeholder:text-beige/40 focus:outline-none focus:border-cherry/50 focus:ring-2 focus:ring-cherry/20 transition-all"
                  />
                  <motion.button
                    className="px-8 py-4 bg-cherry text-white rounded-full font-medium hover:bg-cherry-dark transition-colors flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Subscribe
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>

                <p className="text-xs text-beige/40 mt-4">
                  No spam. Unsubscribe anytime. We respect your inbox.
                </p>
              </motion.div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
