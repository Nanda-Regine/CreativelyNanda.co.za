'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { getRandomPoem } from '@/lib/poems-data';

/**
 * "Let a poem find you" — plucks one poem at random and takes the reader to
 * it, framed like a rose offered by chance. Serendipity keeps people wandering.
 */
export default function SerendipityButton({
  className = '',
}: {
  className?: string;
}) {
  const router = useRouter();
  const [drawing, setDrawing] = useState(false);

  const draw = () => {
    setDrawing(true);
    const poem = getRandomPoem();
    // brief beat so the tap feels intentional, like drawing a card
    setTimeout(() => router.push(`/poetry/collection/${poem.slug}`), 350);
  };

  return (
    <motion.button
      onClick={draw}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      disabled={drawing}
      className={`inline-flex items-center gap-2 rounded-full bg-cherry text-white px-6 py-3 font-medium shadow-lg hover:bg-cherry-dark transition-colors disabled:opacity-70 ${className}`}
    >
      <motion.span
        animate={drawing ? { rotate: [0, -20, 20, 0] } : {}}
        transition={{ duration: 0.35 }}
      >
        🌹
      </motion.span>
      {drawing ? 'Finding your poem…' : 'Let a poem find you'}
    </motion.button>
  );
}
