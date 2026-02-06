'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import type { Poem } from '@/lib/poems-data';

// Rose outline SVG background
const RoseOutline = ({ className = '' }: { className?: string }) => (
  <svg
    viewBox="0 0 200 200"
    className={`absolute inset-0 w-full h-full ${className}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Outer petals */}
    <path
      d="M100 20 C60 20, 30 50, 30 90 C30 130, 60 160, 100 180 C140 160, 170 130, 170 90 C170 50, 140 20, 100 20"
      stroke="currentColor"
      strokeWidth="1"
      opacity="0.15"
    />
    {/* Middle petals layer 1 */}
    <path
      d="M100 35 C70 35, 45 60, 45 95 C45 130, 70 155, 100 170 C130 155, 155 130, 155 95 C155 60, 130 35, 100 35"
      stroke="currentColor"
      strokeWidth="0.8"
      opacity="0.12"
    />
    {/* Middle petals layer 2 */}
    <path
      d="M100 50 C80 50, 60 70, 60 100 C60 130, 80 150, 100 160 C120 150, 140 130, 140 100 C140 70, 120 50, 100 50"
      stroke="currentColor"
      strokeWidth="0.6"
      opacity="0.1"
    />
    {/* Inner spiral - petal 1 */}
    <path
      d="M100 65 C85 70, 75 85, 80 100 C85 115, 100 120, 100 120"
      stroke="currentColor"
      strokeWidth="0.5"
      opacity="0.08"
    />
    {/* Inner spiral - petal 2 */}
    <path
      d="M100 65 C115 70, 125 85, 120 100 C115 115, 100 120, 100 120"
      stroke="currentColor"
      strokeWidth="0.5"
      opacity="0.08"
    />
    {/* Center bud */}
    <circle cx="100" cy="95" r="15" stroke="currentColor" strokeWidth="0.4" opacity="0.06" />
    <circle cx="100" cy="95" r="8" stroke="currentColor" strokeWidth="0.3" opacity="0.04" />
  </svg>
);

// Category colors mapping
const categoryColors: Record<string, { bg: string; text: string; accent: string }> = {
  Romance: { bg: 'from-pink-50 to-rose-100', text: 'text-pink-700', accent: 'bg-pink-500' },
  Sensual: { bg: 'from-red-50 to-rose-100', text: 'text-red-600', accent: 'bg-red-500' },
  Life: { bg: 'from-emerald-50 to-green-100', text: 'text-emerald-700', accent: 'bg-emerald-500' },
  Personal: { bg: 'from-purple-50 to-violet-100', text: 'text-purple-700', accent: 'bg-purple-500' },
  Depth: { bg: 'from-blue-50 to-indigo-100', text: 'text-blue-700', accent: 'bg-blue-500' },
  Empowering: { bg: 'from-amber-50 to-yellow-100', text: 'text-amber-700', accent: 'bg-amber-500' },
};

interface RoseCardProps {
  poem: Poem;
  index: number;
  likes?: number;
  isLiked?: boolean;
  onLike?: () => void;
}

export function RoseCard({ poem, index, likes = 0, isLiked = false, onLike }: RoseCardProps) {
  const colors = categoryColors[poem.category] || categoryColors.Romance;
  const borderRadius = index % 2 === 0 ? '28px 10px 28px 10px' : '10px 28px 10px 28px';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.03 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group"
    >
      <Link href={`/poetry/collection/${poem.slug}`}>
        <div
          className={`relative overflow-hidden bg-gradient-to-br ${colors.bg} p-6 h-[280px] flex flex-col cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500`}
          style={{ borderRadius }}
        >
          {/* Rose outline background */}
          <RoseOutline className={`${colors.text} opacity-60 group-hover:opacity-100 transition-opacity duration-500`} />

          {/* Decorative corner accent */}
          <div
            className={`absolute top-0 right-0 w-20 h-20 ${colors.accent} opacity-10 group-hover:opacity-20 transition-opacity`}
            style={{ borderRadius: '0 10px 0 100%' }}
          />

          {/* Category badge */}
          <div className="relative z-10 flex items-center justify-between mb-3">
            <span className={`text-xs font-medium tracking-wider uppercase ${colors.text} opacity-70`}>
              {poem.category}
            </span>

            {/* Like button */}
            {onLike && (
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onLike();
                }}
                className={`flex items-center gap-1 text-xs ${isLiked ? 'text-cherry' : 'text-navy/40'} hover:text-cherry transition-colors`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-cherry' : ''}`} />
                <span>{likes}</span>
              </motion.button>
            )}
          </div>

          {/* Title */}
          <h3 className="relative z-10 font-display text-xl md:text-2xl font-bold text-navy mb-3 group-hover:text-cherry transition-colors line-clamp-2">
            {poem.title}
          </h3>

          {/* Excerpt */}
          <p className="relative z-10 text-navy/60 text-sm leading-relaxed line-clamp-3 flex-1">
            {poem.excerpt}
          </p>

          {/* Read more indicator */}
          <div className="relative z-10 mt-auto pt-4">
            <span className="text-cherry text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
              Read poem <span className="group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </div>

          {/* Bottom gradient fade */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/30 to-transparent pointer-events-none" />
        </div>
      </Link>
    </motion.div>
  );
}

// Featured card variant with larger size
export function FeaturedRoseCard({ poem, index, likes = 0 }: RoseCardProps) {
  const colors = categoryColors[poem.category] || categoryColors.Romance;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <Link href={`/poetry/collection/${poem.slug}`}>
        <div
          className={`relative overflow-hidden bg-gradient-to-br ${colors.bg} p-8 h-[320px] flex flex-col cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500`}
          style={{ borderRadius: '32px 12px 32px 12px' }}
        >
          {/* Large rose outline */}
          <RoseOutline className={`${colors.text} scale-150 -translate-x-1/4 -translate-y-1/4`} />

          {/* Floating decorative elements */}
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className={`absolute top-4 right-4 w-12 h-12 border ${colors.text} border-opacity-20 rounded-full`}
          />

          <div className="relative z-10 flex-1 flex flex-col">
            {/* Category */}
            <span className={`inline-block px-3 py-1 ${colors.accent} text-white text-xs font-medium rounded-full mb-4 w-fit`}>
              {poem.category}
            </span>

            {/* Title */}
            <h3 className="font-display text-2xl md:text-3xl font-bold text-navy mb-3 group-hover:text-cherry transition-colors">
              {poem.title}
            </h3>

            {/* Excerpt */}
            <p className="text-navy/70 leading-relaxed line-clamp-3 flex-1">
              {poem.excerpt}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-navy/10">
              <div className="flex items-center gap-1 text-navy/50">
                <Heart className="w-4 h-4" />
                <span className="text-sm">{likes}</span>
              </div>
              <span className="text-cherry font-medium text-sm group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                Read <span>→</span>
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default RoseCard;
