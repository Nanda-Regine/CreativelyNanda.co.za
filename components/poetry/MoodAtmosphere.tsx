'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useMood } from './MoodProvider';
import { getAtmosphere, GRAIN_SVG } from '@/lib/moods-atmosphere';

/**
 * The living, mood-washed background behind the entire poetry section.
 * A full-bleed painting + colour-wash + film grain, fixed behind all content.
 * Cross-fades whenever the reader changes how their heart arrives.
 */
export default function MoodAtmosphere() {
  const { mood } = useMood();
  const atmo = getAtmosphere(mood);
  const layerKey = mood ?? 'threshold';

  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      style={{ background: '#0c0a12' }}
    >
      <AnimatePresence>
        <motion.div
          key={layerKey}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          {/* the painting */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url("${atmo.image}")`,
              opacity: atmo.imageOpacity,
              transform: 'scale(1.05)',
            }}
          />
          {/* the colour-wash of the mood */}
          <div className="absolute inset-0" style={{ background: atmo.gradient }} />
        </motion.div>
      </AnimatePresence>

      {/* a whisper of edge-vignette for editorial depth (the mood tint already
          carries most of it now, so this stays light — the image must breathe) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(130% 90% at 50% 5%, transparent 60%, rgba(0,0,0,0.22) 100%)',
        }}
      />

      {/* film grain — a material skin, tuned up to the level of the other sites */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: GRAIN_SVG,
          backgroundRepeat: 'repeat',
          backgroundSize: '240px 240px',
          opacity: 0.09,
        }}
      />
    </div>
  );
}
