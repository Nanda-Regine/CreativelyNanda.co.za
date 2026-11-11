'use client';

/**
 * Evidence Wing: the clickable wing map. Pick a wing, see its room name, what it does and its real screen.
 * Plain buttons with aria-pressed, 44px targets, no motion beyond the shared FadeUp. Text comes from the case file.
 */

import { useState } from 'react';
import type { Wing } from '@/lib/data/evidence/types';
import { track } from '@/lib/analytics';
import { SCREEN_BY_ID } from '@/lib/data/evidence/screens';
import DeskFrame from './DeskFrame';
import { Rule } from '../ForgeChrome';

const GOLD_INK = 'var(--gold-ink)';
const ink = (a: number) => `rgb(var(--ink-rgb) / ${a})`;

export default function WingMap({ wings, title, app }: { wings: Wing[]; title: string; app: string }) {
  const [activeId, setActiveId] = useState(wings[0]?.id ?? '');
  const active = wings.find((w) => w.id === activeId) ?? wings[0];
  if (!active) return null;
  const caption = SCREEN_BY_ID[active.screen]?.caption;

  return (
    <section aria-labelledby="wings-title" className="px-5 py-14 sm:px-8 md:py-20">
      <div className="mx-auto max-w-5xl">
        <Rule label="The wings" />
        <h2 id="wings-title" className="mt-4 font-display text-3xl italic leading-tight sm:text-4xl" style={{ color: ink(0.95) }}>
          {title}
        </h2>

        <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Choose a wing">
          {wings.map((w) => {
            const on = w.id === active.id;
            return (
              <button
                key={w.id}
                type="button"
                aria-pressed={on}
                onClick={() => {
                  setActiveId(w.id);
                  track('evidence_wing_pick', { app, wing: w.id });
                }}
                className="min-h-[44px] rounded-full border px-4 font-mono text-xs uppercase tracking-widest transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{
                  borderColor: on ? '#C9943A' : ink(0.3),
                  background: on ? 'rgb(201 148 58 / 0.18)' : 'transparent',
                  color: ink(on ? 0.98 : 0.8),
                }}
              >
                {w.name}
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid items-start gap-8 md:grid-cols-12" aria-live="polite">
          <div className="md:col-span-5">
            <p className="font-mono text-xs uppercase tracking-widest" style={{ color: GOLD_INK }}>
              {active.name} wing
            </p>
            <h3 className="mt-2 font-display text-3xl leading-tight sm:text-4xl" style={{ color: ink(0.95) }}>
              {active.room}
            </h3>
            <p className="mt-4 text-base leading-relaxed" style={{ color: ink(0.85) }}>
              {active.what}
            </p>
            {caption ? (
              <p className="mt-4 border-l-2 pl-4 text-sm leading-relaxed" style={{ borderColor: '#C9943A', color: ink(0.8) }}>
                {caption}
              </p>
            ) : null}
          </div>
          <div className="md:col-span-7">
            <DeskFrame key={active.screen} screenId={active.screen} />
          </div>
        </div>
      </div>
    </section>
  );
}
