'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Feather, ArrowLeft, Search } from 'lucide-react';
import { ArticleCoverCard } from '@/components/blog';
import type { BlogPost } from '@/types/database';
import { blogPosts as seedPosts } from '@/scripts/seed-blog-posts';

// Transform post to article card format
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

export default function WritingBlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [articles, setArticles] = useState<ReturnType<typeof transformPost>[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch articles
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/blog/posts');
        if (res.ok) {
          const posts = await res.json();
          if (posts && posts.length > 0) {
            // Filter for writing category only
            const writingPosts = posts.filter((p: BlogPost) => p.category === 'writing');
            setArticles(writingPosts.map(transformPost));
          } else {
            // Use seed data as fallback - filter for writing category
            const writingSeeds = seedPosts.filter((p) => p.category === 'writing');
            setArticles(writingSeeds.map((post) => ({
              slug: post.slug,
              title: post.title,
              excerpt: post.excerpt || '',
              coverImage: post.cover_image || '',
              category: post.category as 'dev' | 'writing' | 'business',
              publishedAt: post.published_at || new Date().toISOString(),
              readingTime: post.reading_time || 5,
              author: {
                name: 'Nanda Kabali-Kagwa',
                avatar: '/assets/professional/nanda-professional.jpg',
              },
              viewCount: 0,
              likeCount: 0,
            })));
          }
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        // Use seed data as fallback on error
        const writingSeeds = seedPosts.filter((p) => p.category === 'writing');
        setArticles(writingSeeds.map((post) => ({
          slug: post.slug,
          title: post.title,
          excerpt: post.excerpt || '',
          coverImage: post.cover_image || '',
          category: post.category as 'dev' | 'writing' | 'business',
          publishedAt: post.published_at || new Date().toISOString(),
          readingTime: post.reading_time || 5,
          author: {
            name: 'Nanda Kabali-Kagwa',
            avatar: '/assets/professional/nanda-professional.jpg',
          },
          viewCount: 0,
          likeCount: 0,
        })));
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const filteredArticles = searchQuery
    ? articles.filter(
        (a) =>
          a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : articles;

  const featuredArticle = filteredArticles[0];
  const otherArticles = filteredArticles.slice(1);

  if (loading) {
    return (
      <div className="min-h-screen bg-parchment flex items-center justify-center">
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-12 h-12 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
          <p className="text-navy/60">Loading articles...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-parchment via-cream to-beige">
      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden" style={{ background: 'linear-gradient(to bottom right, #581c87, #6b21a8, #831843)' }}>
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-400/20 rounded-full blur-2xl" />

        <div className="max-w-7xl mx-auto relative z-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-purple-200 hover:text-white mb-8 transition-colors"
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
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-6 shadow-lg">
              <Feather className="w-4 h-4" />
              Writing
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-white mb-6">
              Writing{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-200">
                Sanctuary
              </span>
            </h1>
            <p className="text-lg md:text-xl text-purple-100 max-w-2xl mx-auto leading-relaxed">
              Poetry, creative writing, and reflections on the craft of words and storytelling.
            </p>

            {/* Search */}
            <div className="mt-10 max-w-md mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-navy/40" />
              <input
                type="text"
                placeholder="Search writing articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-cream rounded-full text-navy placeholder:text-navy/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 shadow-lg"
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
          {articles.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <Feather className="w-16 h-16 text-purple-300 mx-auto mb-4" />
              <h2 className="text-2xl font-display font-bold text-navy mb-2">Coming Soon</h2>
              <p className="text-navy/60 max-w-md mx-auto">
                New writing articles are on their way. Check back soon for poetry, creative writing, and reflections on the craft.
              </p>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 mt-6 text-purple-600 hover:text-purple-700 font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                Browse all articles
              </Link>
            </motion.div>
          ) : filteredArticles.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Search className="w-12 h-12 text-navy/20 mx-auto mb-4" />
              <p className="text-navy/60">No articles found matching "{searchQuery}"</p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 text-purple-600 hover:underline"
              >
                Clear search
              </button>
            </motion.div>
          ) : (
            <>
              {/* Featured */}
              {featuredArticle && (
                <div className="mb-12">
                  <h2 className="text-2xl font-display font-bold text-navy mb-6">Latest</h2>
                  <ArticleCoverCard article={featuredArticle} index={0} variant="featured" />
                </div>
              )}

              {/* Grid */}
              {otherArticles.length > 0 && (
                <div>
                  <h2 className="text-2xl font-display font-bold text-navy mb-6">More Articles</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {otherArticles.map((article, i) => (
                      <ArticleCoverCard key={article.slug} article={article} index={i} />
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
