'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { RoseCard, FeaturedRoseCard } from '@/components/poetry/RoseCard';
import { POEMS, CATEGORIES, type Poem } from '@/lib/poems-data';
import { Search, Filter, BookOpen, Sparkles } from 'lucide-react';

export default function PoetryCollection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [likes, setLikes] = useState<Record<string, number>>({});
  const [userLikes, setUserLikes] = useState<string[]>([]);

  // Load likes from localStorage on mount
  useEffect(() => {
    const storedLikes = localStorage.getItem('poemLikes');
    if (storedLikes) setLikes(JSON.parse(storedLikes));

    const storedUserLikes = localStorage.getItem('userLikedPoems');
    if (storedUserLikes) setUserLikes(JSON.parse(storedUserLikes));
  }, []);

  const handleLike = (slug: string) => {
    const isLiked = userLikes.includes(slug);
    const newUserLikes = isLiked
      ? userLikes.filter((s) => s !== slug)
      : [...userLikes, slug];

    setUserLikes(newUserLikes);
    localStorage.setItem('userLikedPoems', JSON.stringify(newUserLikes));

    const newCount = (likes[slug] || 0) + (isLiked ? -1 : 1);
    const newLikes = { ...likes, [slug]: Math.max(0, newCount) };
    setLikes(newLikes);
    localStorage.setItem('poemLikes', JSON.stringify(newLikes));
  };

  const filteredPoems = useMemo(() => {
    let filtered = selectedCategory === 'All'
      ? POEMS
      : POEMS.filter((p) => p.category === selectedCategory);

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.excerpt.toLowerCase().includes(query) ||
          p.content.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [searchQuery, selectedCategory]);

  // Featured poems - top liked from each category
  const featuredPoems = useMemo(() => {
    const featured: Poem[] = [];
    const categories = ['Romance', 'Empowering', 'Depth', 'Sensual'];
    categories.forEach((cat) => {
      const catPoems = POEMS.filter((p) => p.category === cat);
      if (catPoems.length > 0) {
        // Get the one with most likes or random
        const sorted = [...catPoems].sort((a, b) => (likes[b.slug] || 0) - (likes[a.slug] || 0));
        featured.push(sorted[0]);
      }
    });
    return featured;
  }, [likes]);

  const totalPoems = POEMS.length;
  const categoryCount = (cat: string) =>
    cat === 'All' ? totalPoems : POEMS.filter((p) => p.category === cat).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-parchment via-cream to-parchment">
      {/* Hero Section */}
      <section className="relative pt-32 pb-12 px-6 overflow-hidden">
        {/* Decorative roses */}
        <motion.div
          animate={{ rotate: [0, 10, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute top-20 right-10 w-[400px] h-[400px] opacity-5"
        >
          <svg viewBox="0 0 200 200" className="w-full h-full text-cherry">
            <path
              d="M100 20 C60 20, 30 50, 30 90 C30 130, 60 160, 100 180 C140 160, 170 130, 170 90 C170 50, 140 20, 100 20"
              fill="currentColor"
            />
          </svg>
        </motion.div>

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-navy/60 mb-8"
          >
            <Link href="/poetry" className="hover:text-cherry transition-colors">Poetry</Link>
            <span>/</span>
            <span className="text-cherry">Inside Her Roses</span>
          </motion.div>

          {/* Header */}
          <div className="flex items-center gap-6 mb-6">
            <div className="w-16 h-px bg-cherry" />
            <span className="text-cherry text-sm font-medium tracking-[0.3em] uppercase">Collection</span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-navy mb-4"
          >
            Inside Her <span className="text-cherry">Roses</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-navy/70 max-w-2xl mb-2"
          >
            A poetry collection by <span className="font-semibold text-navy">Nanda Regine</span> — exploring love, identity, healing, and Black womanhood.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-navy/50 text-sm mb-8"
          >
            {totalPoems} poems across 6 chapters
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-navy/40" />
              <input
                type="text"
                placeholder="Search poems by title or words..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur border border-navy/10 rounded-full text-navy placeholder:text-navy/40 focus:outline-none focus:border-cherry/50 focus:ring-2 focus:ring-cherry/20 transition-all"
              />
            </div>
            <Button
              variant={showFilters ? 'primary' : 'outline'}
              size="lg"
              className="rounded-full"
              leftIcon={<Filter className="w-5 h-5" />}
              onClick={() => setShowFilters(!showFilters)}
            >
              Chapters
            </Button>
          </motion.div>

          {/* Category Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="pt-6 flex flex-wrap gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.name}
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                        selectedCategory === cat.name
                          ? 'bg-cherry text-white shadow-lg'
                          : 'bg-white/60 text-navy hover:bg-cherry/10 hover:text-cherry'
                      }`}
                    >
                      <span>{cat.icon}</span>
                      <span>{cat.name}</span>
                      <span className="text-xs opacity-70">({categoryCount(cat.name)})</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Featured Poems - only show when no search/filter */}
      {!searchQuery && selectedCategory === 'All' && (
        <section className="py-12 px-6 bg-navy">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <Sparkles className="w-5 h-5 text-gold" />
              <h2 className="font-display text-2xl font-bold text-beige">Featured Poems</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {featuredPoems.map((poem, index) => (
                <FeaturedRoseCard
                  key={poem.slug}
                  poem={poem}
                  index={index}
                  likes={likes[poem.slug] || 0}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Poems Grid */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Results count */}
          <div className="flex items-center justify-between mb-8">
            <p className="text-navy/60">
              {selectedCategory !== 'All' && (
                <span className="mr-2">
                  {CATEGORIES.find((c) => c.name === selectedCategory)?.icon}
                </span>
              )}
              Showing <span className="font-bold text-navy">{filteredPoems.length}</span>
              {selectedCategory !== 'All' && ` ${selectedCategory.toLowerCase()}`} poems
            </p>
            {(selectedCategory !== 'All' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="text-cherry hover:text-cherry-dark text-sm font-medium"
              >
                Clear filters
              </button>
            )}
          </div>

          {/* Poems Grid */}
          {filteredPoems.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredPoems.map((poem, index) => (
                <RoseCard
                  key={poem.slug}
                  poem={poem}
                  index={index}
                  likes={likes[poem.slug] || 0}
                  isLiked={userLikes.includes(poem.slug)}
                  onLike={() => handleLike(poem.slug)}
                />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <BookOpen className="w-16 h-16 text-navy/20 mx-auto mb-4" />
              <h3 className="font-display text-2xl font-bold text-navy mb-2">No poems found</h3>
              <p className="text-navy/60 mb-6">Try a different search or chapter</p>
              <Button
                variant="primary"
                className="rounded-full"
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
              >
                View All Poems
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-cherry to-cherry-dark">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Own the Full Collection
            </h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              Get "Inside Her Roses" in print or digital format. Available worldwide through major retailers.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="rounded-full bg-white text-cherry hover:bg-cream"
                onClick={() => window.open('https://books2read.com/Nrkk-insideherroses', '_blank')}
              >
                Get the Book
              </Button>
              <Link href="/poetry/community">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full border-white text-white hover:bg-white/10"
                >
                  Join Community
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
