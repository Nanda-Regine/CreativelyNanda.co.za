'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { cn, formatDate, getInitials } from '@/lib/utils';
import { Badge } from './Badge';

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  category: 'dev' | 'writing' | 'business';
  publishedAt: string;
  readingTime: number;
  author: {
    name: string;
    avatar?: string;
  };
}

export interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'featured' | 'horizontal';
  className?: string;
}

const categoryColors = {
  dev: 'bg-blue-100 text-blue-700',
  writing: 'bg-purple-100 text-purple-700',
  business: 'bg-emerald-100 text-emerald-700',
};

const categoryLabels = {
  dev: 'Development',
  writing: 'Writing',
  business: 'Business',
};

export function ArticleCard({
  article,
  variant = 'default',
  className,
}: ArticleCardProps) {
  const blogPath = `/blog/${article.category}/${article.slug}`;

  if (variant === 'horizontal') {
    return (
      <Link href={blogPath}>
        <motion.article
          whileHover={{ y: -2 }}
          className={cn(
            'flex gap-4 bg-cream rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow',
            className
          )}
        >
          {/* Image */}
          <div className="relative w-48 h-32 flex-shrink-0">
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center py-3 pr-4">
            <div className="flex items-center gap-2 mb-2">
              <span
                className={cn(
                  'text-xs font-medium px-2 py-0.5 rounded-full',
                  categoryColors[article.category]
                )}
              >
                {categoryLabels[article.category]}
              </span>
              <span className="text-xs text-navy/50">
                {article.readingTime} min read
              </span>
            </div>

            <h3 className="font-semibold text-navy line-clamp-2">{article.title}</h3>
            <p className="text-sm text-navy/60 mt-1 line-clamp-1">{article.excerpt}</p>
          </div>
        </motion.article>
      </Link>
    );
  }

  if (variant === 'featured') {
    return (
      <Link href={blogPath}>
        <motion.article
          whileHover={{ y: -6 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className={cn(
            'group relative bg-cream rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow',
            className
          )}
        >
          {/* Image */}
          <div className="relative aspect-[16/9] overflow-hidden">
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />

            {/* Category badge */}
            <div className="absolute top-4 left-4">
              <span
                className={cn(
                  'text-sm font-medium px-3 py-1 rounded-full',
                  categoryColors[article.category]
                )}
              >
                {categoryLabels[article.category]}
              </span>
            </div>

            {/* Content overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-2xl font-display font-semibold text-cream">
                {article.title}
              </h3>
              <p className="text-cream/80 mt-2 line-clamp-2">{article.excerpt}</p>

              <div className="flex items-center gap-4 mt-4">
                {/* Author */}
                <div className="flex items-center gap-2">
                  {article.author.avatar ? (
                    <div className="relative w-8 h-8 rounded-full overflow-hidden">
                      <Image
                        src={article.author.avatar}
                        alt={article.author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-cherry flex items-center justify-center text-cream text-xs font-medium">
                      {getInitials(article.author.name)}
                    </div>
                  )}
                  <span className="text-sm text-cream/80">{article.author.name}</span>
                </div>

                <span className="text-cream/50">|</span>

                <span className="text-sm text-cream/60">
                  {formatDate(article.publishedAt)}
                </span>

                <span className="text-cream/50">|</span>

                <span className="text-sm text-cream/60">
                  {article.readingTime} min read
                </span>
              </div>
            </div>
          </div>
        </motion.article>
      </Link>
    );
  }

  // Default variant
  return (
    <Link href={blogPath}>
      <motion.article
        whileHover={{ y: -4 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className={cn(
          'group bg-cream rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow',
          className
        )}
      >
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <span
              className={cn(
                'text-xs font-medium px-2 py-1 rounded-full',
                categoryColors[article.category]
              )}
            >
              {categoryLabels[article.category]}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-semibold text-navy line-clamp-2 group-hover:text-cherry transition-colors">
            {article.title}
          </h3>
          <p className="text-sm text-navy/60 mt-2 line-clamp-2">{article.excerpt}</p>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-navy/10">
            {/* Author */}
            <div className="flex items-center gap-2">
              {article.author.avatar ? (
                <div className="relative w-6 h-6 rounded-full overflow-hidden">
                  <Image
                    src={article.author.avatar}
                    alt={article.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-6 h-6 rounded-full bg-cherry flex items-center justify-center text-cream text-xs font-medium">
                  {getInitials(article.author.name)}
                </div>
              )}
              <span className="text-sm text-navy/70">{article.author.name}</span>
            </div>

            {/* Meta */}
            <span className="text-xs text-navy/50">
              {article.readingTime} min read
            </span>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}

export default ArticleCard;
