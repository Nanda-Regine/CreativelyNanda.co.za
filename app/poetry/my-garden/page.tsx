'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Sprout, Pencil, Check } from 'lucide-react';
import { POEMS, type Poem } from '@/lib/poems-data';
import { RoseCard } from '@/components/poetry/RoseCard';
import SerendipityButton from '@/components/poetry/SerendipityButton';
import RoomBackdrop from '@/components/room/RoomBackdrop';
import { PAGE_BACKDROPS } from '@/lib/house-assets';
import { useVisitStreak } from '@/hooks/useVisitStreak';
import {
  getPoetProfile,
  setPenName as savePenName,
  earnedBadges,
  nextBadge,
  PLANT_BADGES,
} from '@/lib/poet-profile';

/**
 * "My Garden" — the reader-writer's own plot: their poet card (pen name +
 * botanical milestones), and the poems they've saved. Lives on this device.
 */
export default function MyGarden() {
  const [saved, setSaved] = useState<Poem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const streak = useVisitStreak();

  const [penName, setPenNameState] = useState('');
  const [planted, setPlanted] = useState(0);
  const [editing, setEditing] = useState(false);
  const [draftName, setDraftName] = useState('');

  useEffect(() => {
    try {
      const slugs: string[] = JSON.parse(localStorage.getItem('savedPoems') || '[]');
      setSaved(POEMS.filter((p) => slugs.includes(p.slug)));
    } catch {
      setSaved([]);
    }
    const profile = getPoetProfile();
    setPenNameState(profile.penName);
    setDraftName(profile.penName);
    setPlanted(profile.planted);
    setHydrated(true);
  }, []);

  const commitName = () => {
    const p = savePenName(draftName.trim());
    setPenNameState(p.penName);
    setEditing(false);
  };

  const badges = earnedBadges(planted);
  const next = nextBadge(planted);
  const initial = (penName || '🌹').charAt(0).toUpperCase();

  return (
    <div className="min-h-screen text-cream">
      <RoomBackdrop image={PAGE_BACKDROPS.myGarden} wash="#0b1029" intensity={0.95} veil={0.2} fixed className="-z-10" />
      <section className="relative pt-24 pb-10 px-6">
        <div className="max-w-6xl mx-auto">
          <Link href="/poetry/collection" className="inline-flex items-center gap-2 text-cream/55 hover:text-cherry text-sm mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to the garden
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <Sprout className="w-6 h-6 text-cherry" />
            <span className="text-xs font-mono tracking-[0.3em] uppercase" style={{ color: '#C9A84C' }}>My Garden</span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-light italic mb-4 drop-shadow-[0_2px_16px_rgba(0,0,0,0.55)]" style={{ color: '#F5EFD6' }}>
            Your plot in the garden
          </h1>
          <p className="text-cream/60 max-w-2xl">
            The poems you keep, and the little garden your own writing grows. It lives on this
            device, just for you.
          </p>
        </div>
      </section>

      {/* Poet card */}
      {hydrated && (
        <section className="px-6 pb-8">
          <div className="max-w-6xl mx-auto rounded-[2rem] border border-white/10 bg-[#0d1330]/70 p-8 md:p-10">
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-display shrink-0 border border-cherry/40 bg-cherry/15 text-cream">
                {initial}
              </div>

              <div className="flex-1">
                {editing ? (
                  <div className="flex items-center gap-2">
                    <input
                      autoFocus
                      value={draftName}
                      maxLength={40}
                      onChange={(e) => setDraftName(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && commitName()}
                      placeholder="Your pen name"
                      className="bg-white/5 border border-white/15 rounded-xl px-4 py-2 text-cream placeholder:text-cream/30 focus:outline-none focus:border-cherry/60"
                    />
                    <button onClick={commitName} className="p-2 rounded-full bg-cherry text-white" aria-label="Save name">
                      <Check className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button onClick={() => setEditing(true)} className="group inline-flex items-center gap-2 text-left">
                    <span className="font-display text-2xl md:text-3xl text-cream">
                      {penName || 'Name yourself, poet'}
                    </span>
                    <Pencil className="w-4 h-4 text-cream/40 group-hover:text-cherry transition-colors" />
                  </button>
                )}
                <p className="text-cream/55 text-sm mt-2">
                  <span className="text-cream font-medium">{planted}</span> {planted === 1 ? 'poem' : 'poems'} planted
                  {streak > 1 && (
                    <> · <span className="text-cream font-medium">{streak}</span>-day streak 🌱</>
                  )}
                </p>
              </div>
            </div>

            {/* Badges */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {PLANT_BADGES.map((b) => {
                const earned = badges.some((e) => e.id === b.id);
                return (
                  <div
                    key={b.id}
                    title={b.hint}
                    className={`flex items-center gap-2 rounded-full px-4 py-2 border text-sm transition-all ${
                      earned ? 'border-cherry/40 bg-cherry/10 text-cream' : 'border-white/10 bg-white/[0.03] text-cream/35'
                    }`}
                  >
                    <span className={earned ? '' : 'grayscale opacity-60'}>{b.emoji}</span>
                    <span>{b.label}</span>
                  </div>
                );
              })}
            </div>
            {next && (
              <p className="text-cream/45 text-sm mt-4">
                {next.threshold - planted} more {next.threshold - planted === 1 ? 'poem' : 'poems'} to{' '}
                <span className="text-cream/70">{next.label} {next.emoji}</span> — plant one in{' '}
                <Link href="/poetry/community" className="text-cherry hover:text-cherry-dark">The Circle</Link>.
              </p>
            )}
          </div>
        </section>
      )}

      {/* Saved poems */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-xs font-mono tracking-[0.3em] uppercase" style={{ color: '#C9A84C' }}>Poems you&rsquo;ve kept</span>
            <div className="flex-1 h-px bg-cream/15" />
          </div>

          {!hydrated ? null : saved.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {saved.map((poem, index) => (
                <RoseCard key={poem.slug} poem={poem} index={index} likes={0} />
              ))}
            </div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16 rounded-[2rem] border border-dashed border-white/15">
              <div className="text-6xl mb-6">🌱</div>
              <h2 className="font-display text-2xl font-bold text-cream mb-3">Your garden is still soil</h2>
              <p className="text-cream/60 max-w-md mx-auto mb-8">
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
