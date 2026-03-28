'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { cn, formatPrice } from '@/lib/utils';
import { Badge, NewBadge, BestsellerBadge, PopularBadge, LaunchingBadge, ComingSoonBadge, BetaBadge, LiveBadge } from './Badge';

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  thumbnail: string;
  category: string;
  rating?: number;
  reviewCount?: number;
  badge?: 'NEW' | 'BESTSELLER' | 'POPULAR' | 'LAUNCHING';
  status?: 'live' | 'beta' | 'coming-soon';
}

export interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'featured' | 'compact';
  showQuickView?: boolean;
  onQuickView?: () => void;
  className?: string;
}

const BadgeComponent: Record<string, ReactNode> = {
  NEW: <NewBadge />,
  BESTSELLER: <BestsellerBadge />,
  POPULAR: <PopularBadge />,
  LAUNCHING: <LaunchingBadge />,
};

const StatusBadge: Record<string, ReactNode> = {
  live: <LiveBadge />,
  beta: <BetaBadge />,
  'coming-soon': <ComingSoonBadge />,
};

export function ProductCard({
  product,
  variant = 'default',
  showQuickView = false,
  onQuickView,
  className,
}: ProductCardProps) {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  if (variant === 'compact') {
    return (
      <Link href={`/products/${product.slug}`}>
        <motion.div
          whileHover={{ y: -2 }}
          className={cn(
            'flex gap-3 p-3 bg-cream rounded-lg hover:shadow-md transition-shadow',
            className
          )}
        >
          <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
            <Image
              src={product.thumbnail}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-navy truncate">{product.name}</h4>
            <p className="text-sm text-navy/60 truncate">{product.tagline}</p>
            <p className="text-cherry font-semibold mt-1">{formatPrice(product.price)}</p>
          </div>
        </motion.div>
      </Link>
    );
  }

  if (variant === 'featured') {
    return (
      <Link href={`/products/${product.slug}`}>
        <motion.div
          whileHover={{ y: -8 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className={cn(
            'group relative bg-cream rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow',
            className
          )}
        >
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={product.thumbnail}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              {product.badge && BadgeComponent[product.badge]}
              {product.status && StatusBadge[product.status]}
            </div>

            {/* Quick view button */}
            {showQuickView && (
              <motion.button
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                onClick={(e) => {
                  e.preventDefault();
                  onQuickView?.();
                }}
                className="absolute bottom-4 right-4 px-4 py-2 bg-cream/90 backdrop-blur-sm text-navy rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Quick View
              </motion.button>
            )}
          </div>

          {/* Content */}
          <div className="p-6">
            <span className="text-sm text-cherry font-medium uppercase tracking-wide">
              {product.category}
            </span>
            <h3 className="text-xl font-display font-semibold text-navy mt-1">
              {product.name}
            </h3>
            <p className="text-navy/70 mt-2 line-clamp-2">{product.tagline}</p>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-2 mt-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={cn(
                        'w-4 h-4',
                        i < Math.floor(product.rating!) ? 'text-amber-400' : 'text-navy/20'
                      )}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-navy/60">
                  ({product.reviewCount} reviews)
                </span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-2 mt-4">
              <span className="text-2xl font-bold text-cherry">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-navy/50 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <Badge variant="success" size="sm">
                    -{discount}%
                  </Badge>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </Link>
    );
  }

  // Default variant
  return (
    <Link href={`/products/${product.slug}`}>
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className={cn(
          'group relative bg-gradient-to-br from-cream to-beige/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-cherry/10',
          className
        )}
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={product.thumbnail || '/assets/professional/nanda-consulting.jpg'}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {product.badge && BadgeComponent[product.badge]}
          </div>

          {/* Discount badge */}
          {discount > 0 && (
            <div className="absolute top-3 right-3">
              <Badge variant="success" size="sm" pill className="shadow-md">
                -{discount}%
              </Badge>
            </div>
          )}

          {/* Hover CTA */}
          <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-cream/95 backdrop-blur-sm rounded-full text-sm font-medium text-navy shadow-lg">
              View Details
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 bg-gradient-to-b from-transparent to-cream/50">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs text-cherry font-semibold uppercase tracking-wider px-2 py-0.5 bg-cherry/10 rounded-full">
              {product.category}
            </span>
            {product.rating && (
              <span className="flex items-center gap-1 text-xs text-amber-600">
                <svg className="w-3.5 h-3.5 fill-amber-400" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {product.rating}
              </span>
            )}
          </div>
          <h3 className="font-display font-semibold text-navy text-lg group-hover:text-cherry transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-sm text-navy/60 mt-1.5 line-clamp-2 leading-relaxed">{product.tagline}</p>

          {/* Price */}
          <div className="flex items-baseline gap-2 mt-4 pt-4 border-t border-navy/10">
            <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cherry to-cherry/70">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-navy/40 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export default ProductCard;
