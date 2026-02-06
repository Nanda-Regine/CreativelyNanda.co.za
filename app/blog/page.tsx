'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Code, Feather, TrendingUp, ArrowRight, Search } from 'lucide-react';
import { ArticleCard, Button, Badge } from '@/components/ui';
import type { Article } from '@/components/ui/ArticleCard';

// Sample articles - will be fetched from Supabase/MDX in production
const ARTICLES: Article[] = [
  {
    slug: 'building-notion-templates-that-sell',
    title: 'Building Notion Templates That Actually Sell',
    excerpt: 'A deep dive into creating Notion templates that solve real problems and generate passive income.',
    coverImage: '/assets/professional/nanda-consulting.jpg',
    category: 'business',
    publishedAt: '2024-02-01',
    readingTime: 8,
    author: { name: 'Nanda Kabali-Kagwa' },
  },
  {
    slug: 'nextjs-14-app-router-guide',
    title: 'Next.js 14 App Router: A Practical Guide',
    excerpt: 'Everything you need to know about the App Router, Server Components, and building modern React apps.',
    coverImage: '/assets/professional/nanda-consulting.jpg',
    category: 'dev',
    publishedAt: '2024-01-28',
    readingTime: 12,
    author: { name: 'Nanda Kabali-Kagwa' },
  },
  {
    slug: 'poetry-as-therapy',
    title: 'Poetry as Therapy: Writing Through Pain',
    excerpt: 'How writing poetry helped me process grief, trauma, and find healing through words.',
    coverImage: '/assets/poetry-book/book-cover-1.jpg',
    category: 'writing',
    publishedAt: '2024-01-20',
    readingTime: 6,
    author: { name: 'Nanda Kabali-Kagwa' },
  },
  {
    slug: 'freelancing-in-south-africa',
    title: 'Freelancing in South Africa: The Real Talk',
    excerpt: 'Navigating load-shedding, payments, and building a sustainable freelance career in SA.',
    coverImage: '/assets/professional/nanda-consulting.jpg',
    category: 'business',
    publishedAt: '2024-01-15',
    readingTime: 10,
    author: { name: 'Nanda Kabali-Kagwa' },
  },
  {
    slug: 'typescript-for-beginners',
    title: 'TypeScript for JavaScript Developers',
    excerpt: 'A gentle introduction to TypeScript that will make you wonder why you waited so long.',
    coverImage: '/assets/professional/nanda-consulting.jpg',
    category: 'dev',
    publishedAt: '2024-01-10',
    readingTime: 15,
    author: { name: 'Nanda Kabali-Kagwa' },
  },
  {
    slug: 'inside-her-roses-journey',
    title: 'The Journey of "Inside Her Roses"',
    excerpt: 'From late-night scribbles to a published book - the story behind my poetry collection.',
    coverImage: '/assets/poetry-book/book-cover-1.jpg',
    category: 'writing',
    publishedAt: '2024-01-05',
    readingTime: 7,
    author: { name: 'Nanda Kabali-Kagwa' },
  },
];

const CATEGORIES = [
  {
    name: 'Development',
    slug: 'dev',
    icon: Code,
    description: 'Tutorials, tips, and insights on web development, coding, and tech.',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-600',
  },
  {
    name: 'Writing',
    slug: 'writing',
    icon: Feather,
    description: 'Poetry, creative writing, and reflections on the craft of words.',
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-600',
  },
  {
    name: 'Business',
    slug: 'business',
    icon: TrendingUp,
    description: 'Entrepreneurship, freelancing, and building a sustainable creative business.',
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-600',
  },
];

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const featuredArticle = ARTICLES[0];
  const recentArticles = ARTICLES.slice(1, 5);

  const filteredArticles = searchQuery
    ? ARTICLES.filter(
        (a) =>
          a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-parchment via-cream to-beige">
      {/* Hero Section */}
      <section className="relative py-24 px-4 bg-gradient-to-br from-navy via-navy to-cherry/20 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cherry/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-beige/10 rounded-full blur-2xl" />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="secondary" size="lg" pill className="mb-6 shadow-lg">
              <Feather className="w-4 h-4 mr-2" />
              The Blog
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-beige mb-6">
              Thoughts &{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cherry to-beige">
                Stories
              </span>
            </h1>
            <p className="text-lg md:text-xl text-beige/80 max-w-2xl mx-auto leading-relaxed">
              Exploring code, creativity, and entrepreneurship through words.
              Technical tutorials, poetry, and business insights.
            </p>

            {/* Search */}
            <div className="mt-10 max-w-md mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-navy/40" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-cream rounded-full text-navy placeholder:text-navy/40 focus:outline-none focus:ring-2 focus:ring-cherry/50 shadow-lg"
              />
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" className="w-full h-16">
            <path
              d="M0,80 C360,120 720,40 1080,80 C1260,100 1380,60 1440,80 L1440,120 L0,120 Z"
              className="fill-parchment"
            />
          </svg>
        </div>
      </section>

      {/* Search Results */}
      {filteredArticles && (
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-display font-bold text-navy mb-8">
              Search Results ({filteredArticles.length})
            </h2>
            {filteredArticles.length === 0 ? (
              <p className="text-navy/60 text-center py-12">No articles found matching your search.</p>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.map((article) => (
                  <ArticleCard key={article.slug} article={article} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Categories Section */}
      {!filteredArticles && (
        <>
          <section className="py-16 px-4">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-display font-bold text-navy mb-4">
                  Explore by Category
                </h2>
                <p className="text-navy/60 max-w-xl mx-auto">
                  Dive into different aspects of my journey as a creative technologist
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-6">
                {CATEGORIES.map((category, i) => {
                  const Icon = category.icon;
                  const categoryArticles = ARTICLES.filter((a) => a.category === category.slug);
                  return (
                    <motion.div
                      key={category.slug}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Link href={`/blog/${category.slug}`}>
                        <div className="group bg-cream rounded-2xl p-6 shadow-md hover:shadow-xl transition-all border border-navy/5 hover:border-cherry/20">
                          <div
                            className={`w-14 h-14 rounded-xl ${category.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                          >
                            <Icon className={`w-7 h-7 ${category.textColor}`} />
                          </div>
                          <h3 className="text-xl font-display font-semibold text-navy mb-2 group-hover:text-cherry transition-colors">
                            {category.name}
                          </h3>
                          <p className="text-navy/60 text-sm mb-4">{category.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-navy/40">
                              {categoryArticles.length} articles
                            </span>
                            <ArrowRight className="w-5 h-5 text-cherry opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Featured Article */}
          <section className="py-8 px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl font-display font-bold text-navy mb-8">Featured</h2>
              <ArticleCard article={featuredArticle} variant="featured" />
            </div>
          </section>

          {/* Recent Articles */}
          <section className="py-16 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-display font-bold text-navy">Recent Articles</h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {recentArticles.map((article, i) => (
                  <motion.div
                    key={article.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <ArticleCard article={article} />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Newsletter CTA */}
          <section className="py-20 px-4 bg-gradient-to-br from-navy via-navy to-cherry/30 relative overflow-hidden">
            <div className="absolute top-1/2 left-0 w-72 h-72 bg-cherry/20 rounded-full blur-3xl -translate-y-1/2" />
            <div className="absolute top-1/2 right-0 w-96 h-96 bg-beige/10 rounded-full blur-3xl -translate-y-1/2" />

            <div className="max-w-3xl mx-auto text-center relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-5xl font-display font-bold text-beige mb-6">
                  Stay in the{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cherry to-beige">
                    loop
                  </span>
                </h2>
                <p className="text-lg text-beige/80 mb-10 max-w-xl mx-auto">
                  Get notified when I publish new articles. No spam, just good content.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="flex-1 px-6 py-3 rounded-full bg-cream text-navy placeholder:text-navy/40 focus:outline-none focus:ring-2 focus:ring-cherry/50"
                  />
                  <Button variant="primary" size="lg" className="rounded-full">
                    Subscribe
                  </Button>
                </div>
              </motion.div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
