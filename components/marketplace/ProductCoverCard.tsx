'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Star, ShoppingBag, Sparkles, ArrowRight } from 'lucide-react';
import { cn, formatPrice } from '@/lib/utils';
import { getShopTheme, getProductRadius, getProductShape } from '@/lib/shop-themes';
import { getShopPattern } from './ShopPatterns';
import { Badge } from '@/components/ui';

export interface ProductCoverData {
  slug: string;
  name: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  category: string;
  rating?: number;
  reviewCount?: number;
  badge?: 'NEW' | 'BESTSELLER' | 'POPULAR' | 'LAUNCHING';
  status?: 'live' | 'beta' | 'coming-soon';
  thumbnail?: string;
}

interface ProductCoverCardProps {
  product: ProductCoverData;
  index?: number;
  variant?: 'default' | 'featured' | 'compact';
  className?: string;
}

const badgeStyles: Record<string, string> = {
  NEW: 'bg-violet-500 text-white',
  BESTSELLER: 'bg-amber-500 text-white',
  POPULAR: 'bg-rose-500 text-white',
  LAUNCHING: 'bg-cyan-500 text-white',
};

export function ProductCoverCard({
  product,
  index = 0,
  variant = 'default',
  className,
}: ProductCoverCardProps) {
  const theme = getShopTheme(product.category);
  const Pattern = getShopPattern(product.category);
  const borderRadius = getProductRadius(index);
  const shapePath = getProductShape(index);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  if (variant === 'featured') {
    return (
      <Link href={`/products/${product.slug}`}>
        <motion.div
          whileHover={{ y: -8, scale: 1.01 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className={cn(
            'group relative overflow-hidden shadow-xl hover:shadow-2xl transition-all',
            className
          )}
          style={{ borderRadius }}
        >
          {/* Gradient Background */}
          <div className={`relative aspect-[16/9] bg-gradient-to-br ${theme.bgDark} overflow-hidden`}>
            {/* Animated gradient overlay */}
            <motion.div
              className={`absolute inset-0 bg-gradient-to-br ${theme.bgMagazine} opacity-40`}
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              style={{ backgroundSize: '200% 200%' }}
            />

            {/* Pattern overlay */}
            <Pattern className={`${theme.textLight} opacity-30`} />

            {/* Decorative shape */}
            <svg
              className="absolute bottom-0 left-0 right-0 h-24"
              viewBox="0 0 120 100"
              preserveAspectRatio="none"
              fill="none"
            >
              <path d={shapePath} fill="white" opacity="0.1" />
            </svg>

            {/* Floating orbs */}
            <motion.div
              className={`absolute top-10 right-10 w-32 h-32 bg-gradient-to-br ${theme.gradient} rounded-full opacity-30 blur-2xl`}
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.4, 0.3] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            <motion.div
              className={`absolute bottom-20 left-10 w-24 h-24 bg-white rounded-full opacity-10 blur-xl`}
              animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.15, 0.1] }}
              transition={{ duration: 7, repeat: Infinity }}
            />

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-between p-8">
              {/* Top row */}
              <div className="flex items-start justify-between">
                <div className="flex gap-2">
                  {product.badge && (
                    <span className={`px-3 py-1 text-xs font-bold uppercase rounded-full ${badgeStyles[product.badge]}`}>
                      {product.badge}
                    </span>
                  )}
                  {discount > 0 && (
                    <span className="px-3 py-1 text-xs font-bold uppercase rounded-full bg-emerald-500 text-white">
                      -{discount}%
                    </span>
                  )}
                </div>
                <span className={`px-3 py-1 text-xs font-medium uppercase tracking-wider rounded-full bg-white/20 backdrop-blur-sm text-white`}>
                  {product.category}
                </span>
              </div>

              {/* Center - Title */}
              <div className="text-center py-8">
                <motion.h3
                  className="text-4xl md:text-5xl font-display font-bold text-white leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {product.name}
                </motion.h3>
                <p className="mt-4 text-lg text-white/70 max-w-lg mx-auto">
                  {product.tagline}
                </p>
              </div>

              {/* Bottom row */}
              <div className="flex items-end justify-between">
                {/* Rating */}
                {product.rating && (
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating!) ? 'text-amber-400 fill-amber-400' : 'text-white/30'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-white/70">
                      ({product.reviewCount})
                    </span>
                  </div>
                )}

                {/* Price */}
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-white">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-white/50 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Hover CTA */}
            <motion.div
              className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300"
            >
              <span className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full text-sm font-bold text-navy shadow-xl">
                <ShoppingBag className="w-4 h-4" />
                View Product
                <ArrowRight className="w-4 h-4" />
              </span>
            </motion.div>
          </div>
        </motion.div>
      </Link>
    );
  }

  // Default variant - Magazine cover style
  return (
    <Link href={`/products/${product.slug}`}>
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className={cn(
          'group relative overflow-hidden shadow-lg hover:shadow-2xl transition-all',
          className
        )}
        style={{ borderRadius }}
      >
        {/* Gradient Background with themed cover - More vibrant */}
        <div className={`relative aspect-[3/4] bg-gradient-to-br ${theme.bgMagazine} overflow-hidden`}>
          {/* Dark gradient overlay for depth */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20`} />

          {/* Animated shimmer effect */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent`}
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 5 }}
          />

          {/* Pattern overlay */}
          <Pattern className="text-white opacity-30" />

          {/* Decorative organic shape at bottom */}
          <svg
            className="absolute bottom-0 left-0 right-0 h-20"
            viewBox="0 0 120 100"
            preserveAspectRatio="none"
            fill="none"
          >
            <path d={shapePath} fill="white" opacity="0.08" />
          </svg>

          {/* Floating accents - more prominent */}
          <motion.div
            className={`absolute top-8 right-8 w-24 h-24 bg-white rounded-full opacity-20 blur-2xl`}
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          <motion.div
            className={`absolute bottom-20 left-4 w-16 h-16 bg-white rounded-full opacity-15 blur-xl`}
            animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.25, 0.15] }}
            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
          />

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col p-5">
            {/* Top badges */}
            <div className="flex items-start justify-between mb-auto">
              {product.badge && (
                <span className={`px-2.5 py-1 text-xs font-bold uppercase rounded-full ${badgeStyles[product.badge]} shadow-lg`}>
                  {product.badge}
                </span>
              )}
              {discount > 0 && (
                <span className="px-2.5 py-1 text-xs font-bold uppercase rounded-full bg-emerald-500 text-white shadow-lg">
                  Save {discount}%
                </span>
              )}
            </div>

            {/* Center title */}
            <div className="my-auto text-center px-2">
              <motion.div
                className={`inline-block px-3 py-1 mb-3 text-xs font-medium uppercase tracking-wider rounded-full bg-white/20 backdrop-blur-sm text-white`}
              >
                {product.category}
              </motion.div>
              <h3 className="text-2xl font-display font-bold text-white leading-tight mb-2 drop-shadow-lg">
                {product.name}
              </h3>
              <p className="text-sm text-white/70 line-clamp-2">
                {product.tagline}
              </p>
            </div>

            {/* Bottom section */}
            <div className="mt-auto space-y-3">
              {/* Rating */}
              {product.rating && (
                <div className="flex items-center justify-center gap-1.5">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(product.rating!) ? 'text-amber-400 fill-amber-400' : 'text-white/30'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-white/60">
                    {product.rating} ({product.reviewCount})
                  </span>
                </div>
              )}

              {/* Price */}
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-2xl font-bold text-white drop-shadow-lg">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-white/50 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Hover overlay */}
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center"
          >
            <motion.span
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white rounded-full text-sm font-bold text-navy shadow-xl"
              initial={{ y: 10, opacity: 0 }}
              whileHover={{ scale: 1.05 }}
            >
              <ShoppingBag className="w-4 h-4" />
              View Details
            </motion.span>
          </motion.div>
        </div>
      </motion.div>
    </Link>
  );
}

export default ProductCoverCard;
