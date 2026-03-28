'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Code, ArrowLeft, Search } from 'lucide-react';
import { ArticleCard, Button, Badge } from '@/components/ui';
import type { Article } from '@/components/ui/ArticleCard';

// Sample dev articles - will be fetched from Supabase/MDX in production
const DEV_ARTICLES: Article[] = [
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
    slug: 'framer-motion-animations',
    title: 'Beautiful Animations with Framer Motion',
    excerpt: 'Learn how to create smooth, performant animations in React with Framer Motion.',
    coverImage: '/assets/professional/nanda-consulting.jpg',
    category: 'dev',
    publishedAt: '2024-01-05',
    readingTime: 10,
    author: { name: 'Nanda Kabali-Kagwa' },
  },
  {
    slug: 'supabase-auth-nextjs',
    title: 'Supabase Auth with Next.js 14',
    excerpt: 'Implementing authentication in Next.js using Supabase - from setup to protected routes.',
    coverImage: '/assets/professional/nanda-consulting.jpg',
    category: 'dev',
    publishedAt: '2023-12-20',
    readingTime: 18,
    author: { name: 'Nanda Kabali-Kagwa' },
  },
  {
    slug: 'tailwind-css-tips',
    title: '10 Tailwind CSS Tips I Wish I Knew Earlier',
    excerpt: 'Productivity boosters and patterns that will level up your Tailwind workflow.',
    coverImage: '/assets/professional/nanda-consulting.jpg',
    category: 'dev',
    publishedAt: '2023-12-15',
    readingTime: 8,
    author: { name: 'Nanda Kabali-Kagwa' },
  },
];

export default function DevBlogPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = DEV_ARTICLES.filter(
    (a) =>
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const featuredArticle = filteredArticles[0];
  const otherArticles = filteredArticles.slice(1);

  return (
    <div className="min-h-screen bg-gradient-to-b from-parchment via-cream to-beige">
      {/* Hero Section */}
      <section className="relative py-24 px-4 bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/20 rounded-full blur-2xl" />

        <div className="max-w-7xl mx-auto relative z-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-blue-200 hover:text-white mb-8 transition-colors"
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
            <Badge variant="secondary" size="lg" pill className="mb-6 shadow-lg bg-blue-100 text-blue-700">
              <Code className="w-4 h-4 mr-2" />
              Development
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-white mb-6">
              Dev{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-200">
                Blog
              </span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Tutorials, tips, and deep dives into web development, React, Next.js, and modern tech.
            </p>

            {/* Search */}
            <div className="mt-10 max-w-md mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-navy/40" />
              <input
                type="text"
                placeholder="Search dev articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-cream rounded-full text-navy placeholder:text-navy/40 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 shadow-lg"
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
