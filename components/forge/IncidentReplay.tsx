'use client';

/**
 * ⏮ Incident Replay — one postmortem, played in the order it happened.
 *
 * BUILD_JOURNEY §19.2: "each postmortem as a 5-step scrubber; cause withheld
 * until you step to it; cost shown as a meter."
 *
 * The Scar Room already had the right *order* (broke → found → cause → fix →
 * cost). What it lacked was the one thing that order is for: the reader never
 * had to stand where the engineer stood, holding a symptom with no cause
 * attached. Laid out as five paragraphs, the cause is visible from the first
 * line, so nobody ever guesses. The replay hides the next step until you step
 * to it, and that small withholding turns a write-up into a thing you do.
 *
 * ── DECISIONS ─────────────────────────────────────────────────────────────────
 * - **Every step is in the DOM, always.** Inactive panels carry `hidden`, so the
 *   full text still reaches search engines, readers with no JavaScript, and
 *   anyone who presses "Read it straight". The replay is a way of reading the
 *   entry, not a gate on it.
 * - **The server renders step one.** Initial state is a constant, so server and
 *   client agree. That's the rule from this room's own hydration scar.
 * - **WAI-ARIA tabs.** Arrow keys move between steps and Home/End jump to the
 *   ends, with roving tabindex, because five buttons in a row is a tablist
 *   whether or not it is drawn as one.
 * - **The meter is a rank, and says so.** `reach` is read out of the entry's
 *   own `cost`. It is labelled with words, never a number.
 */

import { useCallback, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, AlignLeft, Play } from 'lucide-react';
import { track } from '@/lib/analytics';
import { REACH, type Scar } from '@/lib/data/forge-scars';
import { Artefact, ink } from './ForgeChrome';

type StepKey = 'broke' | 'found' | 'cause' | 'fix' | 'cost';

export const REPLAY_STEPS: { key: StepKey; label: string; short: string }[] = [
  { key: 'broke', label: 'What broke', short: 'Broke' },
  { key: 'found', label: 'How it was found', short: 'Found' },
  { key: 'cause', label: 'The actual cause', short: 'Cause' },
  { key: 'fix', label: 'The fix', short: 'Fix' },
  { key: 'cost', label: 'What it cost', short: 'Cost' },
];

export default function IncidentReplay({
  scar,
  wound,
  woundInk,
}: {
  scar: Scar;
  wound: string;
  woundInk: string;
}) {
  const [step, setStep] = useState(0);
  const [straight, setStraight] = useState(false);
  const completed = useRef(false);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const artefactAt = scar.artefactAt ?? 'cause';
  const id = `replay-${scar.slug}`;
  const last = REPLAY_STEPS.length - 1;

  const go = useCallback(
    (next: number, focus = false) => {
      const i = Math.max(0, Math.min(last, next));
      setStep(i);
      if (focus) tabs.current[i]?.focus();
      // Reported once per scar per visit, the first time the reader reaches the
      // cost. Reaching the end is the signal. Every step would be noise.
      if (i === last && !completed.current) {
        completed.current = true;
        track('forge_replay_complete', { scar: scar.slug });
      }
    },
    [scar.slug, last]
  );

  const onKey = (e: React.KeyboardEvent) => {
    const map: Record<string, number> = {
      ArrowRight: step + 1,
      ArrowLeft: step - 1,
      Home: 0,
      End: last,
    };
    if (e.key in map) {
      e.preventDefault();
      go(map[e.key], true);
    }
  };

  const reach = scar.reach;

  return (
    <div className="mt-10">
      {/* ── The scrubber ─────────────────────────────────────────────────── */}
      {!straight ? (
        <div className="relative">
          {/* The track, and how far along it the reader has come. */}
          <div className="absolute left-[10%] right-[10%] top-[15px] h-px" style={{ background: ink(0.14) }} aria-hidden />
          <div
            className="absolute left-[10%] top-[15px] h-px transition-[width] duration-500"
            style={{ width: `${(step / last) * 80}%`, background: woundInk }}
            aria-hidden
          />
          <div role="tablist" aria-label={`Replay: ${scar.title}`} className="relative grid grid-cols-5" onKeyDown={onKey}>
            {REPLAY_STEPS.map((s, i) => {
              const active = i === step;
              const passed = i < step;
              return (
                <button
                  key={s.key}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`${id}-tab-${s.key}`}
                  aria-selected={active}
                  aria-controls={`${id}-panel-${s.key}`}
                  tabIndex={active ? 0 : -1}
                  onClick={() => go(i)}
                  className="flex flex-col items-center gap-2.5 rounded-md py-1 outline-none focus-visible:ring-2 focus-visible:ring-[#D98C9F]"
                >
                  <span
                    className="flex h-[31px] w-[31px] items-center justify-center rounded-full border font-mono text-[10px] transition-all duration-300"
                    style={{
                      borderColor: active || passed ? woundInk : ink(0.22),
                      background: active ? wound : passed ? 'rgba(139,30,63,0.14)' : 'var(--card)',
                      color: active ? '#fff' : passed ? woundInk : ink(0.45),
                      transform: active ? 'scale(1.12)' : 'scale(1)',
                    }}
                  >
                    {i + 1}
                  </span>
                  <span
                    className="font-mono text-[9.5px] uppercase tracking-[0.18em] transition-colors md:text-[10px]"
                    style={{ color: active ? 'rgb(var(--head-rgb))' : s.key === 'cause' ? woundInk : ink(0.42) }}
                  >
                    <span className="md:hidden">{s.short}</span>
                    <span className="hidden md:inline">{s.label}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      {/* ── The panels ───────────────────────────────────────────────────── */}
      <div className={straight ? 'space-y-8' : 'mt-8'}>
        {REPLAY_STEPS.map((s, i) => {
          const show = straight || i === step;
          return (
            <div
              key={s.key}
              id={`${id}-panel-${s.key}`}
              role={straight ? undefined : 'tabpanel'}
              aria-labelledby={straight ? undefined : `${id}-tab-${s.key}`}
              hidden={!show}
              className={straight ? 'grid gap-2 md:grid-cols-[9.5rem_1fr] md:gap-7' : 'min-h-[11rem]'}
            >
              <h3
                className={`font-mono text-[10px] uppercase tracking-[0.22em] ${straight ? 'pt-1' : 'mb-3'}`}
                style={{ color: s.key === 'cause' ? woundInk : ink(0.38) }}
              >
                {straight ? s.label : `${i + 1} of 5 · ${s.label}`}
              </h3>
              <div>
                <p
                  className="text-[16px] font-light leading-[1.85]"
                  style={{ color: s.key === 'cause' ? ink(0.92) : ink(0.72) }}
                >
                  {scar[s.key]}
                </p>

                {s.key === 'cost' && reach ? <ReachMeter reach={reach} wound={wound} woundInk={woundInk} /> : null}

                {scar.code && s.key === artefactAt ? (
                  <div className="mt-6">
                    <Artefact label="the artefact">{scar.code}</Artefact>
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Controls ─────────────────────────────────────────────────────── */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        {!straight ? (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => go(step - 1)}
              disabled={step === 0}
              className="inline-flex h-10 items-center gap-1.5 rounded-full border px-4 font-mono text-[10px] uppercase tracking-[0.18em] transition-opacity disabled:opacity-30"
              style={{ borderColor: ink(0.2), color: ink(0.7) }}
            >
              <ChevronLeft className="h-3.5 w-3.5" /> Back
            </button>
            <button
              type="button"
              onClick={() => go(step + 1)}
              disabled={step === last}
              className="inline-flex h-10 items-center gap-1.5 rounded-full px-5 font-mono text-[10px] uppercase tracking-[0.18em] text-white transition-opacity disabled:opacity-30"
              style={{ background: wound }}
            >
              {step < last ? REPLAY_STEPS[step + 1].short : 'The end'} <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        ) : (
          <span />
        )}
        <button
          type="button"
          onClick={() => setStraight((v) => !v)}
          aria-pressed={straight}
          className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] underline decoration-dotted underline-offset-4 transition-opacity hover:opacity-70"
          style={{ color: ink(0.5) }}
        >
          {straight ? (
            <>
              <Play className="h-3 w-3" /> Replay it step by step
            </>
          ) : (
            <>
              <AlignLeft className="h-3 w-3" /> Read it straight
            </>
          )}
        </button>
      </div>
    </div>
  );
}

/** Five notches, filled to the entry's reach, named in words. */
function ReachMeter({ reach, wound, woundInk }: { reach: 1 | 2 | 3 | 4 | 5; wound: string; woundInk: string }) {
  const notches = [1, 2, 3, 4, 5] as const;
  return (
    <div className="mt-7 rounded-lg border p-4" style={{ borderColor: 'rgba(139,30,63,0.3)', background: 'rgba(139,30,63,0.07)' }}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="font-mono text-[9.5px] uppercase tracking-[0.22em]" style={{ color: ink(0.42) }}>
          How far it reached
        </p>
        <p className="font-display text-[15px] italic" style={{ color: woundInk }}>
          {REACH[reach]}
        </p>
      </div>
      <div className="mt-3 grid grid-cols-5 gap-1.5" role="img" aria-label={`Reach: ${REACH[reach]}, notch ${reach} of 5`}>
        {notches.map((n) => (
          <span key={n} className="h-1.5 rounded-full" style={{ background: n <= reach ? wound : ink(0.1) }} title={REACH[n]} />
        ))}
      </div>
      <div className="mt-2 hidden grid-cols-5 gap-1.5 md:grid" aria-hidden>
        {notches.map((n) => (
          <span key={n} className="font-mono text-[8.5px] uppercase leading-snug tracking-[0.1em]" style={{ color: n === reach ? woundInk : ink(0.28) }}>
            {REACH[n]}
          </span>
        ))}
      </div>
    </div>
  );
}
