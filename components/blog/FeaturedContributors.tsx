'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Sparkles } from 'lucide-react';
import { ContributorCard } from './ContributorCard';
import { getCategoryTheme, blogCategoryThemes } from '@/lib/blog-themes';

interface Contributor {
  slug: string;
  name: string;
  title?: string | null;
  bio?: string | null;
  avatar?: string | null;
  website?: string | null;
  twitter?: string | null;
  linkedin?: string | null;
  instagram?: string | null;
  specialties?: string[];
  articleCount?: number;
}

interface FeaturedContributorsProps {
  contributors: Contributor[];
}

export function FeaturedContributors({ contributors }: FeaturedContributorsProps) {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filters = [
    { key: 'all', label: 'All Voices', emoji: '✨' },
    ...Object.entries(blogCategoryThemes).map(([key, theme]) => ({
      key,
      label: theme.name,
      emoji: theme.emoji,
    })),
  ];

  const filteredContributors = contributors.filter((contributor) => {
    if (activeFilter === 'all') return true;
    return contributor.specialties?.includes(activeFilter);
  });

  if (contributors.length === 0) return null;

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Decorative icon */}
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-cherry to-pink-500 mb-6"
            whileHover={{ scale: 1.1, rotate: 10 }}
          >
            <Users className="w-8 h-8 text-white" />
          </motion.div>

          <h2 className="font-display text-3xl md:text-5xl font-bold text-navy mb-4">
            The Voices Behind the Stories
          </h2>
          <p className="text-navy/60 max-w-2xl mx-auto">
            Meet the talented contributors who bring diverse perspectives, expertise, and creativity
            to our growing community of creators, developers, and entrepreneurs.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {filters.map((filter) => {
            const isActive = activeFilter === filter.key;
            const theme = filter.key !== 'all' ? getCategoryTheme(filter.key) : null;

            return (
              <motion.button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  isActive
                    ? theme
                      ? `${theme.accent} text-white shadow-lg`
                      : 'bg-cherry text-white shadow-lg'
                    : 'bg-white text-navy/70 hover:bg-navy/5 shadow-sm'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="mr-1.5">{filter.emoji}</span>
                {filter.label}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Contributors Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {filteredContributors.map((contributor, index) => (
              <ContributorCard
                key={contributor.slug}
                contributor={contributor}
                index={index}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty state */}
        {filteredContributors.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Sparkles className="w-12 h-12 text-navy/20 mx-auto mb-4" />
            <p className="text-navy/60">No contributors in this category yet.</p>
            <p className="text-sm text-navy/40 mt-2">
              Want to contribute? Reach out!
            </p>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-navy/60 mb-4">
            Interested in sharing your expertise with our community?
          </p>
          <motion.a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-navy text-beige rounded-full font-medium hover:bg-cherry transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Sparkles className="w-4 h-4" />
            Become a Contributor
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

export default FeaturedContributors;
