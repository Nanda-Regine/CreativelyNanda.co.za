'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface Poem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  collection: string;
  mood?: string;
  hasAudio: boolean;
  heartCount: number;
  roseCount: number;
}

export interface PoemCardProps {
  poem: Poem;
  variant?: 'default' | 'featured' | 'minimal';
  className?: string;
}

const moodColors: Record<string, string> = {
  love: 'from-pink-500/20 to-rose-500/20 border-rose-300',
  melancholy: 'from-blue-500/20 to-indigo-500/20 border-indigo-300',
  hope: 'from-amber-500/20 to-orange-500/20 border-amber-300',
  nature: 'from-green-500/20 to-emerald-500/20 border-emerald-300',
  empowerment: 'from-purple-500/20 to-violet-500/20 border-violet-300',
  sensual: 'from-red-500/20 to-cherry/20 border-cherry/50',
  depth: 'from-navy/20 to-slate-500/20 border-navy/30',
  default: 'from-cream to-white border-navy/20',
};

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function RoseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C9.38 2 7.25 4.13 7.25 6.75c0 1.34.56 2.56 1.45 3.44C7.26 10.79 6.25 12.15 6.25 13.75c0 2.62 2.13 4.75 4.75 4.75h2c2.62 0 4.75-2.13 4.75-4.75 0-1.6-1.01-2.96-2.45-3.56.89-.88 1.45-2.1 1.45-3.44C16.75 4.13 14.62 2 12 2zm0 2c1.52 0 2.75 1.23 2.75 2.75S13.52 9.5 12 9.5 9.25 8.27 9.25 6.75 10.48 4 12 4zm1 12.5h-2c-1.52 0-2.75-1.23-2.75-2.75S9.48 11 11 11h2c1.52 0 2.75 1.23 2.75 2.75s-1.23 2.75-2.75 2.75zM12 20v2" />
    </svg>
  );
}

function AudioIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
      />
    </svg>
  );
}

export function PoemCard({ poem, variant = 'default', className }: PoemCardProps) {
  const moodClass = poem.mood ? moodColors[poem.mood] || moodColors.default : moodColors.default;

  if (variant === 'minimal') {
    return (
      <Link href={`/poetry/${poem.slug}`}>
        <motion.div
          whileHover={{ x: 4 }}
          className={cn(
            'flex items-center justify-between py-3 border-b border-navy/10 hover:bg-navy/5 px-2 -mx-2 rounded transition-colors',
            className
          )}
        >
          <div className="flex items-center gap-3">
            {poem.hasAudio && (
              <AudioIcon className="w-4 h-4 text-cherry" />
            )}
            <span className="text-navy font-medium">{poem.title}</span>
          </div>
          <div className="flex items-center gap-3 text-navy/50">
            <span className="flex items-center gap-1 text-sm">
              <HeartIcon className="w-3 h-3" />
              {poem.heartCount}
            </span>
            <span className="flex items-center gap-1 text-sm">
              <RoseIcon className="w-3 h-3 text-cherry" />
              {poem.roseCount}
            </span>
          </div>
        </motion.div>
      </Link>
    );
  }

  if (variant === 'featured') {
    return (
      <Link href={`/poetry/${poem.slug}`}>
        <motion.div
          whileHover={{ y: -6, scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className={cn(
            'relative bg-gradient-to-br rounded-2xl p-8 border-2 shadow-lg hover:shadow-2xl transition-shadow overflow-hidden',
            moodClass,
            className
          )}
        >
          {/* Decorative quote marks */}
          <span className="absolute top-4 left-4 text-6xl text-navy/10 font-serif leading-none">
            "
          </span>
          <span className="absolute bottom-4 right-4 text-6xl text-navy/10 font-serif leading-none rotate-180">
            "
          </span>

          <div className="relative">
            {/* Collection tag */}
            <span className="text-xs font-medium text-cherry uppercase tracking-wider">
              {poem.collection}
            </span>

            {/* Title */}
            <h3 className="text-2xl font-display font-semibold text-navy mt-2">
              {poem.title}
            </h3>

            {/* Excerpt */}
            <p className="text-navy/70 mt-4 italic leading-relaxed line-clamp-4">
              {poem.excerpt}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-navy/10">
              <div className="flex items-center gap-4">
                {poem.hasAudio && (
                  <span className="flex items-center gap-1.5 text-sm text-cherry">
                    <AudioIcon className="w-4 h-4" />
                    Audio
                  </span>
                )}
                {poem.mood && (
                  <span className="text-sm text-navy/60 capitalize">
                    {poem.mood}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-navy/60">
                  <HeartIcon className="w-4 h-4" />
                  {poem.heartCount}
                </span>
                <span className="flex items-center gap-1.5 text-cherry">
                  <RoseIcon className="w-4 h-4" />
                  {poem.roseCount}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    );
  }

  // Default variant
  return (
    <Link href={`/poetry/${poem.slug}`}>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className={cn(
          'bg-gradient-to-br rounded-xl p-5 border shadow-md hover:shadow-lg transition-shadow',
          moodClass,
          className
        )}
      >
        {/* Collection tag */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-cherry uppercase tracking-wider">
            {poem.collection}
          </span>
          {poem.hasAudio && (
            <AudioIcon className="w-4 h-4 text-cherry" />
          )}
        </div>

        {/* Title */}
        <h3 className="font-display font-semibold text-navy mt-2">{poem.title}</h3>

        {/* Excerpt */}
        <p className="text-sm text-navy/70 mt-2 italic line-clamp-3">{poem.excerpt}</p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-navy/10">
          {poem.mood && (
            <span className="text-xs text-navy/50 capitalize">{poem.mood}</span>
          )}
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-xs text-navy/50">
              <HeartIcon className="w-3 h-3" />
              {poem.heartCount}
            </span>
            <span className="flex items-center gap-1 text-xs text-cherry">
              <RoseIcon className="w-3 h-3" />
              {poem.roseCount}
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export default PoemCard;
