'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Code, Feather, TrendingUp, Clock, User } from 'lucide-react';
import { getCategoryTheme, getMagazineRadius, type BlogCategory } from '@/lib/blog-themes';
import { getCategoryPattern } from './DecorativePatterns';

interface ArticleCoverCardProps {
  article: {
    slug: string;
    title: string;
    excerpt?: string | null;
    coverImage?: string | null;
    category: string;
    publishedAt?: string | null;
    readingTime?: number | null;
    author?: {
      name: string;
      avatar?: string | null;
    } | null;
  };
  index?: number;
  variant?: 'default' | 'featured' | 'compact';
}

const categoryIcons = {
  dev: Code,
  writing: Feather,
  business: TrendingUp,
};

export function ArticleCoverCard({
  article,
  index = 0,
  variant = 'default',
}: ArticleCoverCardProps) {
  const theme = getCategoryTheme(article.category);
  const Pattern = getCategoryPattern(article.category);
  const Icon = categoryIcons[article.category as keyof typeof categoryIcons] || Code;
  const borderRadius = getMagazineRadius(index);

  const cardClasses = {
    default: 'group relative overflow-hidden',
    featured: 'group relative overflow-hidden col-span-full lg:col-span-2',
    compact: 'group relative overflow-hidden',
  };

  const imageHeight = {
    default: 'h-56',
    featured: 'h-80 lg:h-96',
    compact: 'h-40',
  };

  return (
    <Link href={`/blog/${article.category}/${article.slug}`}>
      <motion.article
        className={`${cardClasses[variant]} bg-white shadow-sm hover:shadow-xl transition-all duration-500`}
        style={{ borderRadius }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        whileHover={{ y: -8 }}
      >
        {/* Cover Image or Fallback */}
        <div className={`relative ${imageHeight[variant]} overflow-hidden`}>
          {article.coverImage ? (
            <>
              <Image
                src={article.coverImage}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t ${theme.bgDark} opacity-40 group-hover:opacity-30 transition-opacity duration-500`} />
            </>
          ) : (
            /* Themed Fallback Cover */
            <div className={`absolute inset-0 bg-gradient-to-br ${theme.bg}`}>
              {/* Decorative pattern */}
              <Pattern className={`${theme.text} opacity-60 group-hover:opacity-80 transition-opacity duration-500`} />

              {/* Decorative shapes */}
              <motion.div
                className={`absolute top-4 right-4 w-20 h-20 rounded-full bg-gradient-to-br ${theme.gradient} opacity-20`}
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <motion.div
                className={`absolute bottom-8 left-8 w-12 h-12 rounded-full bg-gradient-to-br ${theme.gradient} opacity-30`}
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.5,
                }}
              />

              {/* Title as typographic hero for fallback */}
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <h3
                  className={`font-display text-2xl ${variant === 'featured' ? 'lg:text-4xl' : ''} font-bold ${theme.text} text-center leading-tight opacity-90`}
                >
                  {article.title}
                </h3>
              </div>
            </div>
          )}

          {/* Category badge */}
          <div className="absolute top-4 left-4 z-10">
            <motion.span
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 ${theme.accent} text-white text-xs font-medium rounded-full shadow-lg`}
              whileHover={{ scale: 1.05 }}
            >
              <Icon className="w-3.5 h-3.5" />
              {theme.name}
            </motion.span>
          </div>

          {/* Reading time badge */}
          {article.readingTime && (
            <div className="absolute top-4 right-4 z-10">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/90 backdrop-blur-sm text-navy text-xs font-medium rounded-full">
                <Clock className="w-3 h-3" />
                {article.readingTime} min
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Only show title in content area if cover image exists */}
          {article.coverImage && (
            <h3 className={`font-display text-xl ${variant === 'featured' ? 'lg:text-2xl' : ''} font-bold text-navy mb-2 group-hover:text-cherry transition-colors line-clamp-2`}>
              {article.title}
            </h3>
          )}

          {/* For fallback covers, show a minimal excerpt */}
          {!article.coverImage && article.excerpt && (
            <p className={`text-sm ${theme.text} line-clamp-2 mb-3`}>
              {article.excerpt}
            </p>
          )}

          {article.excerpt && article.coverImage && (
            <p className="text-navy/60 text-sm line-clamp-2 mb-4">
              {article.excerpt}
            </p>
          )}

          {/* Author and date */}
          <div className="flex items-center justify-between pt-4 border-t border-navy/10">
            <div className="flex items-center gap-2">
              {article.author?.avatar ? (
                <Image
                  src={article.author.avatar}
                  alt={article.author.name}
                  width={28}
                  height={28}
                  className="rounded-full"
                />
              ) : (
                <div className={`w-7 h-7 rounded-full ${theme.accent} flex items-center justify-center`}>
                  <User className="w-3.5 h-3.5 text-white" />
                </div>
              )}
              <span className="text-sm text-navy/70">
                {article.author?.name || 'Nanda'}
              </span>
            </div>

            {article.publishedAt && (
              <span className="text-xs text-navy/50">
                {new Date(article.publishedAt).toLocaleDateString('en-ZA', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            )}
          </div>
        </div>

        {/* Hover accent line */}
        <motion.div
          className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${theme.gradient}`}
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
          style={{ originX: 0 }}
        />
      </motion.article>
    </Link>
  );
}

export default ArticleCoverCard;
