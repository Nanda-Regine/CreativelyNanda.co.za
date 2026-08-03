'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import WordSearch from '@/components/games/WordSearch';
import MagneticPoetry from '@/components/games/MagneticPoetry';
import FinishTheLine from '@/components/games/FinishTheLine';
import TexturedSection, { TEXTURES } from '@/components/ui/TexturedSection';

const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const GAMES = [
  { key: 'search', label: 'Word Search', tag: 'find the garden', el: <WordSearch /> },
  { key: 'magnet', label: 'Magnetic Poetry', tag: 'make a line', el: <MagneticPoetry /> },
  { key: 'finish', label: 'Finish the Line', tag: 'write the rest', el: <FinishTheLine /> },
] as const;

export default function GamesPage() {
  const [active, setActive] = useState<(typeof GAMES)[number]['key']>('search');

  return (
    <main className="min-h-screen bg-[#0A1128] text-[#F5F0E8]">
      <div className="fixed inset-0 pointer-events-none opacity-[0.14] z-0" style={{ backgroundImage: GRAIN }} />
      <div className="pointer-events-none fixed -top-40 left-1/2 -translate-x-1/2 h-[520px] w-[520px] rounded-full bg-[#C9943A]/10 blur-3xl" />

      {/* header */}
      <section className="relative z-10 px-6 pt-36 pb-10 text-center">
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="font-mono text-xs tracking-[0.35em] uppercase text-[#C9943A] mb-5">
          The play room
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.05 }}
          className="font-display text-6xl md:text-8xl font-bold italic leading-[0.9] mb-6">
          Poetry Games
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, delay: 0.15 }}
          className="mx-auto max-w-xl text-white/60 text-lg font-light leading-relaxed">
          Small, addictive ways to fall for words. For poets, aspiring writers, and anyone who has ever
          loved a good line. No score to chase — just the pleasure of the language.
        </motion.p>

        {/* tabs */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {GAMES.map((g) => (
            <button key={g.key} onClick={() => setActive(g.key)}
              className="rounded-full border px-6 py-3 text-left transition-all"
              style={{
                background: active === g.key ? '#C1292E' : 'transparent',
                borderColor: active === g.key ? '#C1292E' : 'rgba(245,240,232,0.2)',
              }}>
              <span className="block text-sm font-semibold text-white">{g.label}</span>
              <span className="block font-mono text-[9px] uppercase tracking-[0.2em]" style={{ color: active === g.key ? 'rgba(255,255,255,0.7)' : '#C9943A' }}>{g.tag}</span>
            </button>
          ))}
        </div>
      </section>

      {/* active game */}
      <section className="relative z-10 px-6 pb-24 pt-6">
        <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-10">
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
              {GAMES.find((g) => g.key === active)!.el}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* close */}
      <TexturedSection texture={TEXTURES.marble} tone="wine" className="relative z-10 px-6 pb-28 pt-6 text-center">
        <p className="mx-auto mb-8 max-w-xl font-display text-2xl md:text-3xl italic text-white/85">
          When you find the line you love, it stops being a game.
        </p>
        <Link href="/poetry/collection" className="rounded-full bg-[#C1292E] px-8 py-4 font-semibold text-white transition-all hover:scale-105">
          Read hers →
        </Link>
      </TexturedSection>
    </main>
  );
}
