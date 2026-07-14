'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Sprout } from 'lucide-react';
import { POEMS, type Poem } from '@/lib/poems-data';
import { RoseCard } from '@/components/poetry/RoseCard';
import SerendipityButton from '@/components/poetry/SerendipityButton';

/**
 * "My Garden" — the poems this reader has saved (hearted/bookmarked). Reads the
 * existing `savedPoems` localStorage key written by the poem page. Gives the
 * reader a personal, growing corner they return to tend.
 */
export default function MyGarden() {
  const [saved, setSaved] = useState<Poem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const slugs: string[] = JSON.parse(localStorage.getItem('savedPoems') || '[]');
      setSaved(POEMS.filter((p) => slugs.includes(p.slug)));
    } catch {
      setSaved([]);
    }
    setHydrated(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-parchment via-cream to-parchment">
      <section className="relative pt-32 pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          <Link href="/poetry/collection" className="inline-flex items-center gap-2 text-navy/60 hover:text-cherry text-sm mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to the collection
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <Sprout className="w-6 h-6 text-cherry" />
            <span className="text-cherry text-sm font-medium tracking-[0.3em] uppercase">My Garden</span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-navy mb-4">
            The poems you&rsquo;ve <span className="text-cherry">kept</span>
          </h1>
          <p className="text-navy/60 max-w-2xl">
            Every poem you save is planted here — a private garden that grows with you.
            It lives on this device, just for you.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          {!hydrated ? null : saved.length > 0 ? (
            <>
              <p className="text-navy/60 mb-8">
                <span className="font-bold text-navy">{saved.length}</span>{' '}
                {saved.length === 1 ? 'poem' : 'poems'} in your garden
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {saved.map((poem, index) => (
                  <RoseCard key={poem.slug} poem={poem} index={index} likes={0} />
                ))}
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-6">🌱</div>
              <h2 className="font-display text-2xl font-bold text-navy mb-3">Your garden is still soil</h2>
              <p className="text-navy/60 max-w-md mx-auto mb-8">
                Tap the bookmark on any poem to plant it here. Not sure where to start?
              </p>
              <SerendipityButton />
              <div className="mt-6">
                <Link href="/poetry/collection" className="text-cherry hover:text-cherry-dark font-medium">
                  Or wander the whole collection →
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
