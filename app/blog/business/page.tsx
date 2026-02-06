'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { TrendingUp, ArrowLeft, Search } from 'lucide-react';
import { ArticleCard, Button, Badge } from '@/components/ui';
import type { Article } from '@/components/ui/ArticleCard';

// Sample business articles - will be fetched from Supabase/MDX in production
const BUSINESS_ARTICLES: Article[] = [
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
    slug: 'pricing-digital-products',
    title: 'How to Price Your Digital Products',
    excerpt: 'Stop undercharging. Learn the psychology and strategy behind pricing digital goods.',
    coverImage: '/assets/professional/nanda-consulting.jpg',
    category: 'business',
    publishedAt: '2024-01-08',
    readingTime: 7,
    author: { name: 'Nanda Kabali-Kagwa' },
  },
  {
    slug: 'building-personal-brand',
    title: 'Building a Personal Brand as a Creative',
    excerpt: 'How I built my brand across poetry, tech, and entrepreneurship without losing myself.',
    coverImage: '/assets/professional/nanda-consulting.jpg',
    category: 'business',
    publishedAt: '2023-12-22',
    readingTime: 9,
    author: { name: 'Nanda Kabali-Kagwa' },
  },
  {
    slug: 'multiple-income-streams',
    title: 'Creating Multiple Income Streams as a Creator',
    excerpt: 'From templates to consulting to books - diversifying revenue as a solo entrepreneur.',
    coverImage: '/assets/professional/nanda-consulting.jpg',
    category: 'business',
    publishedAt: '2023-12-10',
    readingTime: 11,
    author: { name: 'Nanda Kabali-Kagwa' },
  },
];

export default function BusinessBlogPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = BUSINESS_ARTICLES.filter(
    (a) =>
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const featuredArticle = filteredArticles[0];
  const otherArticles = filteredArticles.slice(1);

  return (
    <div className="min-h-screen bg-gradient-to-b from-parchment via-cream to-beige">
      {/* Hero Section */}
      <section className="relative py-24 px-4 bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-400/20 rounded-full blur-2xl" />

        <div className="max-w-7xl mx-auto relative z-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-emerald-200 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All Articles
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Badge variant="secondary" size="lg" pill className="mb-6 shadow-lg bg-emerald-100 text-emerald-700">
              <TrendingUp className="w-4 h-4 mr-2" />
              Business
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-white mb-6">
              Business{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-200">
                Insights
              </span>
            </h1>
            <p className="text-lg md:text-xl text-emerald-100 max-w-2xl mx-auto leading-relaxed">
              Entrepreneurship, freelancing, and lessons from building a sustainable creative business.
            </p>

            {/* Search */}
            <div className="mt-10 max-w-md mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-navy/40" />
              <input
                type="text"
                placeholder="Search business articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-cream rounded-full text-navy placeholder:text-navy/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 shadow-lg"
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

      {/* Articles */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {filteredArticles.length === 0 ? (
            <p className="text-navy/60 text-center py-12">No articles found matching your search.</p>
          ) : (
            <>
              {/* Featured */}
              {featuredArticle && (
                <div className="mb-12">
                  <h2 className="text-2xl font-display font-bold text-navy mb-6">Latest</h2>
                  <ArticleCard article={featuredArticle} variant="featured" />
                </div>
              )}

              {/* Grid */}
              {otherArticles.length > 0 && (
                <div>
                  <h2 className="text-2xl font-display font-bold text-navy mb-6">More Articles</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {otherArticles.map((article, i) => (
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
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
