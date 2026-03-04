'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Check, Globe, ArrowRight, ShoppingBag } from 'lucide-react';
import { cn, formatPrice } from '@/lib/utils';
import { getShopTheme } from '@/lib/shop-themes';

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
  impact?: string;
  topFeatures?: string[];
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

  if (variant === 'featured') {
    return (
      <Link href={`/products/${product.slug}`}>
        <motion.div
          whileHover={{ y: -4, scale: 1.005 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className={cn(
            'group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl bg-white border border-navy/8 transition-shadow',
            className
          )}
        >
          {/* Landscape image */}
          <div className="relative aspect-[16/7] overflow-hidden bg-navy/5">
            {product.thumbnail ? (
              <Image
                src={product.thumbnail}
                alt={product.name}
                fill
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 1200px"
                priority
              />
            ) : (
              <div className={`absolute inset-0 bg-gradient-to-br ${theme.bgDark}`} />
            )}
            {/* Gradient fade into card body */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent" />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              {product.badge && (
                <span className={`px-3 py-1 text-xs font-bold uppercase rounded-full shadow ${badgeStyles[product.badge]}`}>
                  {product.badge}
                </span>
              )}
            </div>
            <div className="absolute top-4 right-4">
              <span className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-white/90 text-navy shadow`}>
                {product.category}
              </span>
            </div>
          </div>

          {/* Info panel */}
          <div className="p-6">
            <div className="flex items-start justify-between gap-4 mb-2">
              <h3 className="text-xl font-display font-bold text-navy leading-tight group-hover:text-cherry transition-colors">
                {product.name}
              </h3>
              <div className="flex-shrink-0 text-right">
                <p className="text-2xl font-bold text-cherry">{formatPrice(product.price / 100)}</p>
                {product.originalPrice && (
                  <p className="text-sm text-navy/40 line-through">{formatPrice(product.originalPrice / 100)}</p>
                )}
              </div>
            </div>

            <p className="text-sm text-navy/60 mb-3 line-clamp-2">{product.tagline}</p>

            {product.impact && (
              <div className="flex items-center gap-1.5 mb-4">
                <Globe className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                <span className="text-xs font-medium text-emerald-700">{product.impact}</span>
              </div>
            )}

            {product.topFeatures && product.topFeatures.length > 0 && (
              <ul className="space-y-1.5 mb-5">
                {product.topFeatures.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-navy/70">
                    <Check className="w-3.5 h-3.5 text-cherry flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            )}

            <motion.div
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r ${theme.gradient} shadow group-hover:shadow-lg transition-shadow`}
              whileHover={{ scale: 1.02 }}
            >
              View Details
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </div>
        </motion.div>
      </Link>
    );
  }

  // Default — compact landscape card
  return (
    <Link href={`/products/${product.slug}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.05 }}
        whileHover={{ y: -4, scale: 1.01 }}
        className={cn(
          'group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl bg-white border border-navy/8 transition-shadow flex flex-col',
          className
        )}
      >
        {/* Landscape image */}
        <div className="relative aspect-video overflow-hidden bg-navy/5 flex-shrink-0">
          {product.thumbnail ? (
            <Image
              src={product.thumbnail}
              alt={product.name}
              fill
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className={`absolute inset-0 bg-gradient-to-br ${theme.bgDark} flex items-center justify-center`}>
              <ShoppingBag className="w-12 h-12 text-white/40" />
            </div>
          )}

          {/* Badges */}
          {product.badge && (
            <span className={`absolute top-3 left-3 px-2.5 py-0.5 text-xs font-bold uppercase rounded-full shadow ${badgeStyles[product.badge]}`}>
              {product.badge}
            </span>
          )}
          <span className="absolute top-3 right-3 px-2.5 py-0.5 text-xs font-semibold rounded-full bg-white/90 text-navy shadow">
            {product.category}
          </span>
        </div>

        {/* Info panel */}
        <div className="p-4 flex flex-col flex-1">
          {/* Name + Price */}
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="text-sm font-display font-bold text-navy leading-snug group-hover:text-cherry transition-colors line-clamp-2">
              {product.name}
            </h3>
            <span className="flex-shrink-0 text-base font-bold text-cherry">
              {formatPrice(product.price / 100)}
            </span>
          </div>

          {/* Tagline */}
          <p className="text-xs text-navy/55 mb-3 line-clamp-2 leading-relaxed">{product.tagline}</p>

          {/* Impact */}
          {product.impact && (
            <div className="flex items-center gap-1 mb-3">
              <Globe className="w-3 h-3 text-emerald-500 flex-shrink-0" />
              <span className="text-xs font-medium text-emerald-700 leading-tight">{product.impact}</span>
            </div>
          )}

          {/* Top features */}
          {product.topFeatures && product.topFeatures.length > 0 && (
            <ul className="space-y-1 mb-4 flex-1">
              {product.topFeatures.map((f) => (
                <li key={f} className="flex items-center gap-1.5 text-xs text-navy/65">
                  <Check className="w-3 h-3 text-cherry flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          )}

          {/* CTA */}
          <div className="mt-auto pt-3 border-t border-navy/8">
            <span className={`inline-flex items-center gap-1.5 text-xs font-semibold text-cherry group-hover:gap-2.5 transition-all`}>
              View Details
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export default ProductCoverCard;
