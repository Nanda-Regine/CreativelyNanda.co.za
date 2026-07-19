'use client';

import { motion } from 'framer-motion';

// DepthToggle — three ways to meet the poem.
// Plain: pure typography, everything present, no motion (the SEO-safe read).
// Room: the paced reveal + ambient + voice (the default "enter").
// Annotated: Nanda's line-anchored commentary + reader whispers.

export type Depth = 'plain' | 'room' | 'annotated';

const OPTIONS: { value: Depth; label: string }[] = [
  { value: 'plain', label: 'Plain' },
  { value: 'room', label: 'Room' },
  { value: 'annotated', label: 'Annotated' },
];

export default function DepthToggle({
  value,
  onChange,
}: {
  value: Depth;
  onChange: (d: Depth) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="Reading depth"
      className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-black/30 p-1 backdrop-blur"
    >
      {OPTIONS.map((opt) => {
        const selected = value === opt.value;
        return (
          <button
            key={opt.value}
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(opt.value)}
            className={`relative rounded-full px-4 py-1.5 text-xs font-mono uppercase tracking-[0.18em] transition-colors ${
              selected ? 'text-navy' : 'text-cream/60 hover:text-cream'
            }`}
          >
            {selected && (
              <motion.span
                layoutId="depth-pill"
                className="absolute inset-0 rounded-full bg-cream"
                transition={{ type: 'spring', stiffness: 320, damping: 30 }}
              />
            )}
            <span className="relative z-10">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
