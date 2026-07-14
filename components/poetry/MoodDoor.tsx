'use client';

import { motion } from 'framer-motion';
import { MOODS, type MoodKey, getPoemsByMood } from '@/lib/poems-data';

interface MoodDoorProps {
  selected: MoodKey | null;
  onSelect: (mood: MoodKey | null) => void;
}

/**
 * The emotional entrance to the garden. Instead of a flat grid, the reader
 * arrives by choosing how their heart feels today. Selecting a mood filters
 * the collection; selecting the same mood again clears it.
 */
export default function MoodDoor({ selected, onSelect }: MoodDoorProps) {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-6">
        <p className="font-display text-2xl md:text-3xl text-navy italic">
          How does your heart arrive today?
        </p>
        <p className="text-navy/50 text-sm mt-1">
          Choose a feeling — I&rsquo;ll open the poems that meet you there.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {MOODS.map((mood, i) => {
          const isActive = selected === mood.key;
          const count = getPoemsByMood(mood.key).length;
          return (
            <motion.button
              key={mood.key}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onSelect(isActive ? null : mood.key)}
              className={`group relative overflow-hidden rounded-2xl p-4 text-left transition-shadow ${
                isActive ? 'shadow-xl ring-2 ring-white/60' : 'shadow-md hover:shadow-lg'
              }`}
              style={{ background: mood.wash }}
              aria-pressed={isActive}
            >
              <span className="text-2xl block mb-2">{mood.emoji}</span>
              <span className="block font-display text-lg font-semibold text-white">
                {mood.label}
              </span>
              <span className="block text-white/70 text-xs mt-1 leading-snug">
                {mood.prompt}
              </span>
              <span className="block text-white/50 text-[11px] mt-2">
                {count} {count === 1 ? 'poem' : 'poems'}
              </span>
            </motion.button>
          );
        })}
      </div>

      {selected && (
        <div className="text-center mt-4">
          <button
            onClick={() => onSelect(null)}
            className="text-cherry hover:text-cherry-dark text-sm font-medium"
          >
            Show all moods
          </button>
        </div>
      )}
    </div>
  );
}
