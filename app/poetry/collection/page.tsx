'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { RoseCard, FeaturedRoseCard } from '@/components/poetry/RoseCard';
import { POEMS, CATEGORIES, MOODS, type Poem, getMoodKeyForPoem } from '@/lib/poems-data';
import { Search, Filter, BookOpen, Sparkles } from 'lucide-react';
import Threshold from '@/components/poetry/Threshold';
import { useMood } from '@/components/poetry/MoodProvider';

export default function PoetryCollection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [likes, setLikes] = useState<Record<string, number>>({});
  const [userLikes, setUserLikes] = useState<string[]>([]);

  // The chosen mood now lives in the shared atmosphere context, so selecting a
  // door at the Threshold both washes the garden and filters it here.
  const { mood: selectedMood, setMood: setSelectedMood } = useMood();

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

    if (selectedMood) {
      filtered = filtered.filter((p) => getMoodKeyForPoem(p) === selectedMood);
    }

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
  }, [searchQuery, selectedCategory, selectedMood]);

  // Featured poems - top liked from each category
  const featuredPoems = useMemo(() => {
    const featured: Poem[] = [];
    const categories = ['Romance', 'Empowering', 'Depth', 'Sensual'];
    categories.forEach((cat) => {
      const catPoems = POEMS.filter((p) => p.category === cat);
      if (catPoems.length > 0) {
        const sorted = [...catPoems].sort((a, b) => (likes[b.slug] || 0) - (likes[a.slug] || 0));
        featured.push(sorted[0]);
      }
    });
    return featured;
  }, [likes]);

  const totalPoems = POEMS.length;
  const categoryCount = (cat: string) =>
    cat === 'All' ? totalPoems : POEMS.filter((p) => p.category === cat).length;
  const moodCount = (key: string) =>
    POEMS.filter((p) => getMoodKeyForPoem(p) === key).length;
  const activeMoodPrompt = selectedMood
    ? MOODS.find((m) => m.key === selectedMood)?.prompt
    : null;

  const hasFilter = selectedCategory !== 'All' || !!searchQuery || !!selectedMood;

  return (
    <div className="min-h-screen text-beige">
      {/* Breadcrumb (floats over the atmosphere) */}
      <div className="max-w-6xl mx-auto px-6 pt-24">
        <div className="flex items-center gap-2 text-sm text-cream/50">
          <Link href="/poetry" className="hover:text-cherry transition-colors">Poetry</Link>
          <span>/</span>
          <span className="text-[var(--ancestral-gold,#C9A84C)]">Inside Her Roses</span>
        </div>
      </div>

      {/* ── THE THRESHOLD — the emotional front gate ── */}
      <Threshold />

      {/* ── ROOMS of the garden ── */}
      <nav className="px-6 pb-2">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center gap-3">
          {[
            { href: '/poetry/community', label: 'The Circle', hint: 'Write with us' },
            { href: '/poetry/games', label: 'The Play Room', hint: 'Poetry games & word play' },
            { href: '/poetry/lineage', label: 'The Lineage Room', hint: 'Where I come from' },
            { href: '/poetry/poet-who-codes', label: 'The Poet Who Codes', hint: 'Two tongues, one mind' },
            { href: '/poetry/stage', label: 'The Stage', hint: 'The voice behind the verse' },
            { href: '/poetry/my-garden', label: 'My Garden', hint: 'Your plot' },
          ].map((room) => (
            <Link
              key={room.href}
              href={room.href}
              className="group flex-1 min-w-[200px] rounded-2xl border border-white/10 bg-white/[0.05] hover:bg-white/[0.09] hover:border-white/25 transition-all px-5 py-4"
            >
              <p className="font-display text-lg text-cream group-hover:text-cherry transition-colors">{room.label}</p>
              <p className="text-cream/45 text-xs mt-0.5">{room.hint}</p>
            </Link>
          ))}
        </div>
      </nav>

      {/* ── THE GARDEN — the poems themselves ── */}
      <section id="garden" className="scroll-mt-8 px-6 pt-8 pb-16">
        <div className="max-w-6xl mx-auto">
          {/* Section head */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-[var(--ancestral-gold,#C9A84C)] text-sm font-medium tracking-[0.3em] uppercase font-mono">
              The Garden
            </span>
            <div className="flex-1 h-px bg-cream/15" />
            <span className="text-cream/50 text-sm">{totalPoems} poems · 6 chapters</span>
          </div>

          {/* Search + chapters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-navy/40" />
              <input
                type="text"
                placeholder="Search poems by title or words…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-cream/90 backdrop-blur border border-white/10 rounded-full text-navy placeholder:text-navy/40 focus:outline-none focus:border-cherry/50 focus:ring-2 focus:ring-cherry/20 transition-all"
              />
            </div>
            <Button
              variant={showFilters ? 'primary' : 'outline'}
              size="lg"
              className="rounded-full border-cream/30 text-cream hover:bg-cream hover:text-navy"
              leftIcon={<Filter className="w-5 h-5" />}
              onClick={() => setShowFilters(!showFilters)}
            >
              Chapters
            </Button>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="pb-2 flex flex-wrap gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.name}
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 backdrop-blur ${
                        selectedCategory === cat.name
                          ? 'bg-cherry text-white shadow-lg'
                          : 'bg-white/10 text-cream hover:bg-cherry/20 border border-white/10'
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

          {/* ── Browse by feeling ── selecting a feeling both filters the garden
               and washes the whole atmosphere into that mood (shared context). */}
          <div className="mt-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[var(--ancestral-gold,#C9A84C)] text-xs font-medium tracking-[0.3em] uppercase font-mono">
                Browse by feeling
              </span>
              <div className="flex-1 h-px bg-cream/15" />
            </div>
            <div className="flex flex-wrap gap-2">
              {MOODS.map((m) => {
                const active = selectedMood === m.key;
                return (
                  <button
                    key={m.key}
                    onClick={() => setSelectedMood(active ? null : m.key)}
                    aria-pressed={active}
                    className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium backdrop-blur transition-all border ${
                      active
                        ? 'text-white shadow-lg border-transparent'
                        : 'bg-white/10 text-cream hover:bg-white/20 border-white/10'
                    }`}
                    style={active ? { background: m.wash } : undefined}
                  >
                    <span>{m.emoji}</span>
                    <span>{m.label}</span>
                    <span className="text-xs opacity-70">({moodCount(m.key)})</span>
                  </button>
                );
              })}
            </div>
            <AnimatePresence>
              {activeMoodPrompt && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-3 font-display italic text-lg text-cream/70"
                >
                  &ldquo;{activeMoodPrompt}&rdquo;
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Results row */}
          <div className="flex items-center justify-between my-8">
            <p className="text-cream/60">
              {selectedCategory !== 'All' && (
                <span className="mr-2">
                  {CATEGORIES.find((c) => c.name === selectedCategory)?.icon}
                </span>
              )}
              Showing <span className="font-bold text-cream">{filteredPoems.length}</span>
              {selectedCategory !== 'All' && ` ${selectedCategory.toLowerCase()}`} poems
            </p>
            {hasFilter && (
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                  setSelectedMood(null);
                }}
                className="text-cherry hover:text-cherry-dark text-sm font-medium"
              >
                Clear filters
              </button>
            )}
          </div>

          {/* Featured — only in the unfiltered garden */}
          {!hasFilter && (
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-5 h-5 text-[var(--ancestral-gold,#C9A84C)]" />
                <h2 className="font-display text-2xl font-bold text-cream">Featured blooms</h2>
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
          )}

          {/* The grid */}
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
              <BookOpen className="w-16 h-16 text-cream/20 mx-auto mb-4" />
              <h3 className="font-display text-2xl font-bold text-cream mb-2">No poems found</h3>
              <p className="text-cream/60 mb-6">Try a different search, chapter, or mood</p>
              <Button
                variant="primary"
                className="rounded-full"
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                  setSelectedMood(null);
                }}
              >
                View all poems
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA */}
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
              Get &ldquo;Inside Her Roses&rdquo; in print or digital format. Available worldwide through major retailers.
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
