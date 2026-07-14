'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { getDailyBloom, type Poem } from '@/lib/poems-data';

/**
 * One poem chosen for today — the same for every reader, turning over at
 * SAST midnight. The reason to come back tomorrow. Computed on the client to
 * avoid any hydration mismatch around the date boundary.
 */
export default function DailyBloom() {
  const [poem, setPoem] = useState<Poem | null>(null);

  useEffect(() => {
    setPoem(getDailyBloom());
  }, []);

  if (!poem) return null;

  const preview = poem.content.split('\n').slice(0, 4);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-3xl bg-navy text-beige p-8 md:p-10"
    >
      {/* soft rose glow */}
      <div className="pointer-events-none absolute -right-16 -top-16 w-64 h-64 rounded-full bg-cherry/20 blur-3xl" />

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-4 h-4 text-gold" />
          <span className="text-gold text-xs font-medium tracking-[0.3em] uppercase">
            Today&rsquo;s Bloom
          </span>
        </div>

        <Link href={`/poetry/collection/${poem.slug}`} className="group block">
          <h3 className="font-display text-3xl md:text-4xl font-bold mb-4 group-hover:text-cherry transition-colors">
            {poem.title}
          </h3>
          <div className="font-display text-lg text-beige/80 italic leading-relaxed">
            {preview.map((line, i) => (
              <p key={i}>{line || ' '}</p>
            ))}
            <p className="text-beige/40 not-italic text-sm mt-3">…</p>
          </div>
          <span className="inline-block mt-5 text-cherry font-medium group-hover:translate-x-1 transition-transform">
            Read today&rsquo;s poem →
          </span>
        </Link>
      </div>
    </motion.div>
  );
}
