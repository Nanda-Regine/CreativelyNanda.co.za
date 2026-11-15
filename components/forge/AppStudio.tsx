'use client';

/**
 * The App Studio: /forge/studio
 *
 * The room is now the front of the building: a masthead with a mixed pile of
 * real screens (desk and phone, several products), the ledger, the shelf of
 * every live product, then the journeys and anatomy. Each product's screens
 * live on its own floor, /forge/studio/[app], so this page no longer carries
 * a hundred phones.
 *
 * Paper: navy masthead, parchment ledger; the shelf prints its own bands.
 */

import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { Journeys, AnatomyRoom } from './StudioDeep';
import { FadeUp, GOLD, GOLD_INK, Doors } from './ForgeChrome';
import Stock from '@/components/ui/Stock';
import MixFan from './studio/MixFan';
import type { MixItem } from '@/lib/data/studio-floor';

export interface FloorLink {
  key: string;
  name: string;
  accent: string;
  count: number;
}

export default function AppStudio({ figures, shelf, liveCount, mix, floors, total }: { figures: { value: string; label: string }[]; shelf: React.ReactNode; liveCount: number; mix: MixItem[]; floors: FloorLink[]; total: number }) {
  return (
    <main className="stock-parchment min-h-screen overflow-x-clip">
      {/* ═══ MASTHEAD: the navy band, and the mixed pile ════════════════════ */}
      <Stock paper="navy" as="header" className="-mt-20 px-6 pb-20 pt-32 md:pb-24 md:pt-40">
        <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: `radial-gradient(60% 60% at 78% 45%, ${GOLD}26, transparent 65%), radial-gradient(40% 40% at 10% 100%, #C21E5626, transparent 70%)` }} />
        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <FadeUp>
              <Link href="/forge" className="kicker inline-flex min-h-[44px] items-center gap-2 transition-opacity hover:opacity-70" style={{ color: GOLD_INK }}>
                <ChevronLeft className="h-3 w-3" /> The Forge
              </Link>
            </FadeUp>
            <FadeUp delay={0.08}>
              <h1 className="display-xxl mt-4 font-display font-bold italic t-head">
                The App
                <br />
                <span className="pl-[0.6em]">Studio</span>
              </h1>
            </FadeUp>
            <FadeUp delay={0.16}>
              <p className="mt-7 max-w-md font-display text-xl italic leading-relaxed t-ink md:text-2xl">
                {liveCount} live products on the shelf, {total} real screens on {floors.length} floors, on the phone and on the desk. Pick one up.
              </p>
            </FadeUp>
            <FadeUp delay={0.24}>
              <ol className="m-0 mt-10 max-w-md list-none border-t p-0" style={{ borderColor: 'var(--rule)' }}>
                {floors.map((f, i) => (
                  <li key={f.key} className="border-b" style={{ borderColor: 'var(--rule)' }}>
                    <Link href={`/forge/studio/${f.key}`} prefetch={false} className="group flex min-h-[44px] w-full items-baseline gap-5 py-3 text-left">
                      <span className="font-mono text-[11px] tracking-[0.2em]" style={{ color: f.accent }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="flex-1 font-display text-2xl italic t-head transition-transform duration-500 group-hover:translate-x-1.5">{f.name}</span>
                      <span className="font-mono text-[11px] uppercase tracking-[0.2em] t-soft">{f.count} screens</span>
                    </Link>
                  </li>
                ))}
              </ol>
            </FadeUp>
          </div>
          <FadeUp delay={0.2}>
            <MixFan items={mix} />
          </FadeUp>
        </div>
      </Stock>

      {/* ═══ THE LEDGER ═════════════════════════════════════════════════════ */}
      <Stock paper="parchment" edge="slant-r" className="px-6 pb-4">
        <div className="mx-auto grid max-w-6xl gap-10 pt-16 md:grid-cols-[1.4fr_1fr] md:items-end md:pt-20">
          <dl className="grid grid-cols-2 gap-x-10 gap-y-8 sm:grid-cols-4">
            {figures.map((f) => (
              <div key={f.label} className="sd-rise">
                <dt className="sr-only">{f.label}</dt>
                <dd className="font-display text-5xl font-bold italic md:text-6xl" style={{ color: GOLD_INK }}>
                  {f.value}
                </dd>
                <p aria-hidden className="kicker mt-2 t-soft">
                  {f.label}
                </p>
              </div>
            ))}
          </dl>
          <p className="border-l-2 pl-5 font-display text-lg italic leading-relaxed t-ink" style={{ borderColor: GOLD }}>
            Screenshots of the running products. Nothing here is a mock-up.
          </p>
        </div>
      </Stock>

      {/* ═══ THE SHELF (server-rendered) ════════════════════════════════════ */}
      {shelf}

      {/* ═══ WHAT IT IS LIKE TO USE, AND WHY IT IS LIKE THAT ════════════════ */}
      <Journeys />
      <AnatomyRoom />

      <Doors
        doors={[
          { href: '/forge/floor', label: 'The Workshop Floor', line: 'The dossier behind each of these builds.' },
          { href: '/forge/scars', label: 'The Scar Room', line: 'What broke while they were being made.' },
          { href: '/forge', label: 'The Forge', line: 'Back to the threshold.' },
        ]}
      />
    </main>
  );
}
