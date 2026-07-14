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
      style={{ background: '#06091a' }}
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

      {/* soft vignette for editorial depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 80% at 50% 0%, transparent 40%, rgba(0,0,0,0.45) 100%)',
        }}
      />

      {/* film grain — plain composite (no blend mode) to stay cheap on mobile
          GPUs; the grain is subtle enough that straight opacity reads the same */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: GRAIN_SVG,
          backgroundRepeat: 'repeat',
          backgroundSize: '240px 240px',
          opacity: 0.06,
        }}
      />
    </div>
  );
}
