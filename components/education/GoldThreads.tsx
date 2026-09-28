'use client';

/**
 * Gold Threads — "where the degree became code", made spatial.
 *
 * Modules hang on the left; the production decisions they became hang on the
 * right, deliberately NOT in the same order, so the threads between them cross
 * like a loom rather than running as a row of parallel rules. Every thread is
 * always faintly visible (the weave); the chosen one draws itself in gold.
 *
 * Desktop draws the threads in an SVG measured from the real card positions
 * (ResizeObserver, so it survives font loading and resizes). On narrow screens
 * there is no room for a loom, so each module opens its decision beneath it on
 * a short vertical thread instead.
 */

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

export interface Thread {
  subject: string;
  /** Which qualification the module belongs to. */
  qualification: string;
  code: string;
}

const INK = '#0A1128';
const GOLD = '#B8860B';
const RED = '#C1292E';

// the right-hand column's order — a fixed shuffle so every thread crosses
const WEAVE = [3, 0, 5, 1, 4, 2];

// useLayoutEffect warns during SSR; this is the standard isomorphic guard
const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

export default function GoldThreads({ threads }: { threads: Thread[] }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paths, setPaths] = useState<string[]>([]);
  const [box, setBox] = useState({ w: 0, h: 0 });
  const wrap = useRef<HTMLDivElement>(null);
  const left = useRef<(HTMLButtonElement | null)[]>([]);
  const right = useRef<(HTMLDivElement | null)[]>([]);

  const order = WEAVE.filter((i) => i < threads.length).concat(
    threads.map((_, i) => i).filter((i) => !WEAVE.includes(i)),
  );

  const measure = useCallback(() => {
    const root = wrap.current;
    if (!root) return;
    const r = root.getBoundingClientRect();
    setBox({ w: r.width, h: r.height });
    setPaths(
      threads.map((_, i) => {
        const a = left.current[i]?.getBoundingClientRect();
        const b = right.current[i]?.getBoundingClientRect();
        if (!a || !b) return '';
        const x1 = a.right - r.left;
        const y1 = a.top + a.height / 2 - r.top;
        const x2 = b.left - r.left;
        const y2 = b.top + b.height / 2 - r.top;
        const bend = (x2 - x1) * 0.55;
        return `M ${x1} ${y1} C ${x1 + bend} ${y1}, ${x2 - bend} ${y2}, ${x2} ${y2}`;
      }),
    );
  }, [threads]);

  useIsoLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (wrap.current) ro.observe(wrap.current);
    return () => ro.disconnect();
  }, [measure]);

  return (
    <>
      {/* ── desktop: the loom ─────────────────────────────────────── */}
      <div ref={wrap} className="relative hidden md:grid md:grid-cols-[minmax(0,5fr)_minmax(0,3fr)_minmax(0,6fr)]">
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-visible"
          width={box.w}
          height={box.h}
          viewBox={`0 0 ${box.w || 1} ${box.h || 1}`}
        >
          {paths.map((d, i) =>
            d ? <path key={`weave-${i}`} d={d} fill="none" stroke={GOLD} strokeOpacity={0.16} strokeWidth={1} /> : null,
          )}
          {paths[active] && (
            <motion.path
              key={`active-${active}`}
              d={paths[active]}
              fill="none"
              stroke={GOLD}
              strokeWidth={2}
              strokeLinecap="round"
              initial={{ pathLength: reduce ? 1 : 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: reduce ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{ filter: 'drop-shadow(0 0 4px rgba(201,148,58,0.55))' }}
            />
          )}
        </svg>

        <ul className="relative space-y-3" role="tablist" aria-label="University modules" aria-orientation="vertical">
          {threads.map((t, i) => {
            const on = i === active;
            return (
              <li key={t.subject}>
                <button
                  ref={(el) => {
                    left.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  aria-controls={`thread-code-${i}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className="w-full border px-5 py-4 text-left transition-all duration-300"
                  style={{
                    background: on ? INK : 'rgba(255,255,255,0.55)',
                    borderColor: on ? INK : 'rgba(26,26,46,0.12)',
                    boxShadow: on ? '0 14px 30px -18px rgba(10,17,40,0.8)' : 'none',
                  }}
                >
                  <span className="block font-mono text-[9px] uppercase tracking-[0.22em]" style={{ color: on ? '#E2B96A' : GOLD }}>
                    {t.qualification}
                  </span>
                  <span className="mt-1 block font-display text-lg font-semibold italic" style={{ color: on ? '#F5EFD6' : INK }}>
                    {t.subject}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* the gap the threads cross */}
        <div aria-hidden />

        <div className="relative space-y-3">
          {order.map((i) => {
            const on = i === active;
            return (
              <div
                key={threads[i].subject}
                id={`thread-code-${i}`}
                role="tabpanel"
                ref={(el) => {
                  right.current[i] = el;
                }}
                className="border px-5 py-4 transition-all duration-300"
                style={{
                  background: on ? '#FFFDF7' : 'rgba(255,255,255,0.35)',
                  borderColor: on ? GOLD : 'rgba(26,26,46,0.1)',
                  opacity: on ? 1 : 0.55,
                }}
              >
                <p className="font-mono text-[9px] uppercase tracking-[0.22em]" style={{ color: on ? RED : 'rgba(10,17,40,0.45)' }}>
                  → in the code
                </p>
                <p className="mt-1 font-display text-[15px] italic leading-[1.55]" style={{ color: '#4A3728' }}>
                  {threads[i].code}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── mobile: one thread at a time ──────────────────────────── */}
      <ul className="space-y-3 md:hidden">
        {threads.map((t, i) => {
          const on = i === active;
          return (
            <li key={t.subject}>
              <button
                type="button"
                aria-expanded={on}
                onClick={() => setActive(i)}
                className="w-full border px-5 py-4 text-left"
                style={{ background: on ? INK : 'rgba(255,255,255,0.55)', borderColor: on ? INK : 'rgba(26,26,46,0.12)' }}
              >
                <span className="block font-mono text-[9px] uppercase tracking-[0.22em]" style={{ color: on ? '#E2B96A' : GOLD }}>
                  {t.qualification}
                </span>
                <span className="mt-1 block font-display text-lg font-semibold italic" style={{ color: on ? '#F5EFD6' : INK }}>
                  {t.subject}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {on && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: reduce ? 0 : 0.35 }}
                    className="overflow-hidden"
                  >
                    <div className="ml-6 border-l-2 py-4 pl-5" style={{ borderColor: GOLD }}>
                      <p className="font-mono text-[9px] uppercase tracking-[0.22em]" style={{ color: RED }}>→ in the code</p>
                      <p className="mt-1 font-display text-[15px] italic leading-[1.55]" style={{ color: '#4A3728' }}>{t.code}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </>
  );
}
