'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { FEELINGS, getFeeling } from '@/lib/feelings';
import type { Doorway } from '@/lib/reading-room';
import { useSessionId } from '@/hooks/useSessionId';

interface Bloom {
  petalCount: number;
  feelings: { feeling: string; count: number }[];
  dominantFeeling: string | null;
  hasPetaled: boolean;
  myFeeling: string | null;
}

// PetalEnding — how the reading closes. Leave a petal, name how it left you, and
// be handed onward through the doorway word. The petal count is the poem's bloom;
// the feelings are its aura.

export default function PetalEnding({ slug, doorway }: { slug: string; doorway: Doorway }) {
  const sessionId = useSessionId();
  const [bloom, setBloom] = useState<Bloom | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!sessionId) return;
    fetch(`/api/poetry/poems/${slug}/petal?sessionId=${sessionId}`)
      .then((r) => r.json())
      .then(setBloom)
      .catch(() => {});
  }, [slug, sessionId]);

  const leavePetal = async (feeling: string) => {
    if (!sessionId || busy) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/poetry/poems/${slug}/petal`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, feeling }),
      });
      const data = await res.json();
      if (res.ok) setBloom(data);
    } catch {
      /* silent — the room stays serene */
    } finally {
      setBusy(false);
    }
  };

  const aura = getFeeling(bloom?.dominantFeeling);
  const petaled = bloom?.hasPetaled;

  return (
    <div className="mx-auto max-w-2xl px-6 py-16 text-center">
      {/* Leave a petal / feeling chooser */}
      <AnimatePresence mode="wait">
        {!petaled ? (
          <motion.div key="choose" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
            <p className="mb-2 font-display text-2xl italic text-cream/85">How did it leave you?</p>
            <p className="mb-7 text-sm text-cream/45">Leave a petal — name the feeling it planted.</p>
            <div className="flex flex-wrap justify-center gap-3">
              {FEELINGS.map((f) => (
                <button
                  key={f.key}
                  onClick={() => leavePetal(f.key)}
                  disabled={busy}
                  className="group flex flex-col items-center gap-1 rounded-2xl border border-white/12 bg-white/[0.04] px-5 py-4 transition-all hover:-translate-y-0.5 hover:border-white/30 disabled:opacity-50"
                  style={{ boxShadow: `inset 0 -2px 0 ${f.color}` }}
                >
                  <span className="text-2xl transition-transform group-hover:scale-110">{f.emoji}</span>
                  <span className="text-sm font-medium text-cream">{f.label}</span>
                  <span className="text-[0.7rem] text-cream/45">{f.caption}</span>
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div key="bloomed" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="mb-3 flex items-center justify-center gap-2 text-emerald-300">
              <Check className="h-5 w-5" />
              <span className="font-mono text-xs uppercase tracking-[0.2em]">Petal left</span>
            </div>
            <p className="font-display text-2xl italic text-cream/85">
              This poem has bloomed <span style={{ color: aura?.color ?? '#C9A84C' }}>{bloom?.petalCount}</span>{' '}
              {bloom?.petalCount === 1 ? 'time' : 'times'}.
            </p>
            {aura && (
              <p className="mt-2 text-sm text-cream/50">
                Its aura is <span style={{ color: aura.color }}>{aura.emoji} {aura.label.toLowerCase()}</span>.
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* The doorway — the last word opens the next room */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-14 border-t border-white/10 pt-10">
        {doorway.word && (
          <p className="mb-4 text-sm text-cream/45">
            The last word was <span className="font-serif text-lg italic text-[#C9A84C]">{doorway.word}</span>.
          </p>
        )}
        {doorway.room ? (
          <Link
            href={doorway.room.href}
            className="group inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/[0.04] px-7 py-3 text-cream transition-all hover:border-[#C9A84C]/60 hover:bg-white/[0.08]"
          >
            <span className="font-display text-lg">Enter {doorway.room.label}</span>
            <span className="text-cream/40 group-hover:text-cream/70">— {doorway.room.blurb}</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        ) : doorway.nextPoem ? (
          <Link
            href={`/poetry/collection/${doorway.nextPoem.slug}/room`}
            className="group inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/[0.04] px-7 py-3 text-cream transition-all hover:border-[#C9A84C]/60 hover:bg-white/[0.08]"
          >
            <span className="text-cream/50">Follow it into</span>
            <span className="font-display text-lg">{doorway.nextPoem.title}</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        ) : null}

        <div className="mt-6">
          <Link href={`/poetry/collection/${slug}`} className="text-sm text-cream/45 transition-colors hover:text-cream/80">
            or return to the plain reading →
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
