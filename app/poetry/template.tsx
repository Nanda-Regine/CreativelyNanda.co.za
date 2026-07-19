'use client';

import { motion, useReducedMotion } from 'framer-motion';

// PoetryTemplate — the connective tissue of the House.
// A `template` re-mounts on every navigation (unlike a `layout`, which persists),
// so each room's content dissolves in while the PoetryAtmosphereShell in the
// layout above keeps the mood-wash and petals alive across the move — the House
// feels continuous, not cut. Opacity-only on purpose: a `transform` here would
// re-anchor the Reading Room's `position: fixed` overlay, so we never use one.
// Honors prefers-reduced-motion (no animation at all).

export default function PoetryTemplate({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();

  if (reduce) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
