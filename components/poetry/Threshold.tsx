'use client';

import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { MOODS, getPoemsByMood } from '@/lib/poems-data';
import { useMood } from './MoodProvider';
import { useVisitStreak } from '@/hooks/useVisitStreak';
import DailyBloom from './DailyBloom';
import SerendipityButton from './SerendipityButton';

/**
 * The Threshold — the emotional front gate to the garden. Instead of dropping
 * the reader into a grid, we ask how their heart arrives today. Choosing a
 * mood washes the entire section into that feeling and filters the poems below.
 */
export default function Threshold() {
  const { mood, setMood, hydrated } = useMood();
  const streak = useVisitStreak();

  const activeMood = MOODS.find((m) => m.key === mood) ?? null;

  const enterGarden = () => {
    document.getElementById('garden')?.scrollIntoView({ behavior: 'smooth' });
  };

  const chooseMood = (key: (typeof MOODS)[number]['key']) => {
    setMood(mood === key ? null : key);
  };

  return (
    <section className="relative min-h-[100dvh] flex flex-col justify-center px-6 pt-28 pb-16">
      <div className="max-w-6xl mx-auto w-full">
        {/* Kicker */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-6"
        >
          <div className="w-14 h-px bg-[var(--ancestral-gold,#C9A84C)]" />
          <span className="text-[var(--ancestral-gold,#C9A84C)] text-xs font-medium tracking-[0.35em] uppercase font-mono">
            Inside Her Roses · The Garden
          </span>
        </motion.div>

        {/* The question */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ease: [0.22, 1, 0.36, 1] }}
          className="font-display italic text-4xl sm:text-5xl lg:text-6xl text-cream font-light leading-[1.05] max-w-3xl"
          style={{ color: '#F5EFD6' }}
        >
          How does your heart<br />arrive today?
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="mt-5 text-base sm:text-lg text-cream/70 max-w-xl"
          style={{ color: 'rgba(245,239,214,0.72)' }}
        >
          Choose a feeling — I&rsquo;ll open the poems that meet you there, and wash
          the whole garden in that light.
        </motion.p>

        {/* Mood doors */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {MOODS.map((m, i) => {
            const isActive = mood === m.key;
            const count = getPoemsByMood(m.key).length;
            return (
              <motion.button
                key={m.key}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => chooseMood(m.key)}
                aria-pressed={isActive}
                className={`group relative overflow-hidden rounded-2xl p-4 text-left backdrop-blur-md border transition-all duration-300 ${
                  isActive
                    ? 'border-white/60 shadow-2xl ring-1 ring-white/40'
                    : 'border-white/10 hover:border-white/30 shadow-lg'
                }`}
                style={{
                  background: isActive
                    ? `linear-gradient(160deg, ${m.wash}f2, ${m.wash}cc)`
                    : `linear-gradient(160deg, ${m.wash}80, ${m.wash}40)`,
                }}
              >
                <span className="text-2xl block mb-2">{m.emoji}</span>
                <span className="block font-display text-lg font-semibold text-white">
                  {m.label}
                </span>
                <span className="block text-white/75 text-xs mt-1 leading-snug italic font-display">
                  {m.prompt}
                </span>
                <span className="block text-white/45 text-[11px] mt-2 font-mono tracking-wide">
                  {count} {count === 1 ? 'poem' : 'poems'}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Active-mood confirmation + enter */}
        <motion.div
          initial={false}
          animate={{ opacity: hydrated ? 1 : 0 }}
          className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2"
        >
          {activeMood ? (
            <>
              <p className="text-cream/80 text-sm" style={{ color: 'rgba(245,239,214,0.8)' }}>
                The garden is washed in{' '}
                <span className="font-semibold text-white">{activeMood.label}</span>.
              </p>
              <button
                onClick={() => setMood(null)}
                className="text-cream/50 hover:text-white text-sm underline underline-offset-4 transition-colors"
                style={{ color: 'rgba(245,239,214,0.55)' }}
              >
                wander all moods
              </button>
            </>
          ) : (
            <p className="text-cream/50 text-sm italic font-display" style={{ color: 'rgba(245,239,214,0.55)' }}>
              …or wander the whole garden below.
            </p>
          )}
        </motion.div>

        {/* Daily bloom + serendipity / streak */}
        <div className="mt-12 grid lg:grid-cols-2 gap-6 items-stretch">
          <DailyBloom />
          <div className="flex flex-col justify-center gap-3 rounded-3xl border border-white/10 bg-white/[0.06] backdrop-blur-md p-8">
            <p className="font-display italic text-2xl text-cream" style={{ color: '#F5EFD6' }}>
              Not sure where to begin?
            </p>
            <p className="text-cream/60 text-sm" style={{ color: 'rgba(245,239,214,0.6)' }}>
              Let the garden choose for you — one poem, plucked at random.
            </p>
            <SerendipityButton className="self-start mt-1" />
            {streak > 1 && (
              <p className="text-cream/55 text-sm mt-3" style={{ color: 'rgba(245,239,214,0.55)' }}>
                🌱 You&rsquo;ve visited {streak} days in a row. The garden remembers you.
              </p>
            )}
          </div>
        </div>

        {/* Enter the garden */}
        <div className="mt-12 flex justify-center">
          <motion.button
            onClick={enterGarden}
            whileHover={{ y: 3 }}
            className="group inline-flex flex-col items-center gap-2 text-cream/60 hover:text-white transition-colors"
            style={{ color: 'rgba(245,239,214,0.6)' }}
          >
            <span className="text-xs font-mono tracking-[0.3em] uppercase">Enter the garden</span>
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ArrowDown className="w-5 h-5" />
            </motion.span>
          </motion.button>
        </div>
      </div>
    </section>
  );
}
