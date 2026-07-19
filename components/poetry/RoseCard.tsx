'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { type Poem, getMoodKeyForPoem, getMood } from '@/lib/poems-data';
import { MOOD_TO_TONE, backdropForTone, assetUrl } from '@/lib/house-assets';

// Each poem wears a different textured background drawn from its mood's pool —
// so the garden reads as a living wall of images, not a grid of coloured boxes.
// Deterministic by the poem's id, so a card is stable across renders.
function poemSeed(poem: Poem): number {
  const n = parseInt(poem.id, 10);
  return Number.isFinite(n) ? n : poem.slug.length;
}
function poemBackdrop(poem: Poem): string {
  const tone = MOOD_TO_TONE[getMoodKeyForPoem(poem)];
  return assetUrl(backdropForTone(tone, poemSeed(poem)));
}

interface RoseCardProps {
  poem: Poem;
  index: number;
  likes?: number;
  isLiked?: boolean;
  onLike?: () => void;
}

export function RoseCard({ poem, index, likes = 0, isLiked = false, onLike }: RoseCardProps) {
  const wash = getMood(getMoodKeyForPoem(poem))?.wash ?? '#0A0F2C';
  const bg = poemBackdrop(poem);
  const borderRadius = index % 2 === 0 ? '28px 10px 28px 10px' : '10px 28px 10px 28px';

  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: (index % 12) * 0.05, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -10 }}
      className="group"
    >
      <Link href={`/poetry/collection/${poem.slug}`}>
        <div
          className="relative flex h-[300px] cursor-pointer flex-col overflow-hidden shadow-lg transition-shadow duration-500 hover:shadow-2xl"
          style={{ borderRadius }}
        >
          {/* Textured photograph — the card's real skin */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={bg}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="absolute inset-0 h-full w-full scale-105 object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.14]"
          />

          {/* Mood-tinted, bottom-weighted veil — colour shows at the top,
              the words stay legible at the foot. No flat navy. */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top, ${wash}f7 0%, ${wash}c2 34%, ${wash}40 68%, ${wash}10 100%)`,
            }}
          />
          {/* a whisper of gold at the top edge that warms on hover */}
          <div className="absolute inset-x-0 top-0 h-1 bg-[#C9A84C]/0 transition-colors duration-500 group-hover:bg-[#C9A84C]/70" />

          <div className="relative z-10 flex h-full flex-col p-6">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-black/25 px-3 py-1 text-[0.62rem] font-mono uppercase tracking-[0.22em] text-cream/90 backdrop-blur-sm">
                {poem.category}
              </span>
              {onLike && (
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onLike();
                  }}
                  className={`flex items-center gap-1 text-xs ${isLiked ? 'text-cherry' : 'text-cream/70'} transition-colors hover:text-cherry`}
                >
                  <Heart className={`h-4 w-4 ${isLiked ? 'fill-cherry' : ''}`} />
                  <span>{likes}</span>
                </motion.button>
              )}
            </div>

            <div className="mt-auto">
              <h3 className="font-display text-2xl font-bold leading-tight text-cream drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] transition-colors line-clamp-2 group-hover:text-white md:text-[1.7rem]">
                {poem.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-cream/75 line-clamp-2 drop-shadow-[0_1px_6px_rgba(0,0,0,0.5)]">
                {poem.excerpt}
              </p>
              <span className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-[#E7C86A] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                Read poem <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// Featured card variant — larger, with a slow-turning ring.
export function FeaturedRoseCard({ poem, index, likes = 0 }: RoseCardProps) {
  const wash = getMood(getMoodKeyForPoem(poem))?.wash ?? '#0A0F2C';
  const bg = poemBackdrop(poem);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
      className="group"
    >
      <Link href={`/poetry/collection/${poem.slug}`}>
        <div
          className="relative flex h-[380px] cursor-pointer flex-col overflow-hidden shadow-xl transition-shadow duration-500 hover:shadow-2xl"
          style={{ borderRadius: '32px 12px 32px 12px' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={bg}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="absolute inset-0 h-full w-full scale-105 object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.12]"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top, ${wash}f7 0%, ${wash}c8 38%, ${wash}45 72%, ${wash}12 100%)`,
            }}
          />

          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
            className="absolute right-5 top-5 h-14 w-14 rounded-full border border-cream/25"
          />

          <div className="relative z-10 flex h-full flex-col p-8">
            <span className="w-fit rounded-full bg-black/25 px-3 py-1 text-[0.62rem] font-mono uppercase tracking-[0.22em] text-cream/90 backdrop-blur-sm">
              {poem.category}
            </span>

            <div className="mt-auto">
              <h3 className="font-display text-3xl font-bold leading-tight text-cream drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)] transition-colors group-hover:text-white">
                {poem.title}
              </h3>
              <p className="mt-3 leading-relaxed text-cream/80 line-clamp-2 drop-shadow-[0_1px_6px_rgba(0,0,0,0.5)]">
                {poem.excerpt}
              </p>
              <div className="mt-4 flex items-center justify-between border-t border-cream/15 pt-4">
                <div className="flex items-center gap-1 text-cream/60">
                  <Heart className="h-4 w-4" />
                  <span className="text-sm">{likes}</span>
                </div>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-[#E7C86A] transition-transform group-hover:translate-x-1">
                  Read <span>→</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default RoseCard;
