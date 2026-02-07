'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Code, Feather, TrendingUp, ArrowRight } from 'lucide-react';
import { getCategoryTheme, type BlogCategory } from '@/lib/blog-themes';

interface CategorySectionHeaderProps {
  category: string;
  articleCount?: number;
  showSeeAll?: boolean;
}

const categoryIcons = {
  dev: Code,
  writing: Feather,
  business: TrendingUp,
};

export function CategorySectionHeader({
  category,
  articleCount,
  showSeeAll = true,
}: CategorySectionHeaderProps) {
  const theme = getCategoryTheme(category);
  const Icon = categoryIcons[category as keyof typeof categoryIcons] || Code;

  return (
    <motion.div
      className="flex items-center justify-between mb-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Left side: Icon, title, count */}
      <div className="flex items-center gap-4">
        {/* Decorative icon container */}
        <motion.div
          className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${theme.gradient} flex items-center justify-center shadow-lg`}
          whileHover={{ scale: 1.05, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <Icon className="w-7 h-7 text-white" />
          {/* Decorative ring */}
          <motion.div
            className="absolute inset-0 rounded-2xl border-2 border-white/30"
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        <div>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-navy">
            {theme.name}
          </h2>
          <p className={`text-sm ${theme.text}`}>
            {theme.description}
            {articleCount !== undefined && (
              <span className="ml-2 text-navy/40">
                ({articleCount} article{articleCount !== 1 ? 's' : ''})
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Right side: See all link */}
      {showSeeAll && (
        <Link href={`/blog/${category}`}>
          <motion.div
            className={`group flex items-center gap-2 px-4 py-2 rounded-full ${theme.accent} ${theme.accentHover} text-white text-sm font-medium transition-colors`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>See All</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.div>
        </Link>
      )}
    </motion.div>
  );
}

// Compact divider version
export function CategoryDivider({ category }: { category: string }) {
  const theme = getCategoryTheme(category);
  const Icon = categoryIcons[category as keyof typeof categoryIcons] || Code;

  return (
    <motion.div
      className="flex items-center gap-4 my-12"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className={`h-px flex-1 bg-gradient-to-r from-transparent ${theme.border}`} />
      <div className={`flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${theme.bg}`}>
        <Icon className={`w-4 h-4 ${theme.text}`} />
        <span className={`text-sm font-medium ${theme.text}`}>{theme.name}</span>
      </div>
      <div className={`h-px flex-1 bg-gradient-to-l from-transparent ${theme.border}`} />
    </motion.div>
  );
}

export default CategorySectionHeader;
