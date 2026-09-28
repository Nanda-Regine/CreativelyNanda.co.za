'use client';

/**
 * The Ledger — the learning curve drawn on the same axis as the shipping curve.
 *
 * Bars are real weekly commit counts: the 52-week `activity` histograms from
 * the GitHub API (`lib/data/forge-github.json`, via scripts/forge-github.mjs),
 * summed across every repo the Forge measures, in the server page. Pins are the
 * certificates in `lib/data/credentials.ts`. Nothing on this chart is typed by
 * hand, so nothing on it can drift.
 *
 * The honest edge: GitHub only returns the last 52 weeks, and the measured
 * repos are the production builds — her first SheCodes projects live in repos
 * the Forge does not track. So the chart does not draw zeros before the
 * measurement window; it hatches that stretch and says what it is.
 */

import { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { CREDENTIALS_BY_DATE, formatCredentialDate } from '@/lib/data/credentials';

export interface LedgerSeries {
  /** ISO date (a Sunday) that `weeks[0]` starts on. */
  start: string;
  /** Commits per week, summed across measured repos. */
  weeks: number[];
  repos: number;
  /** When the GitHub snapshot was taken. */
  measuredAt: string;
}

const INK = '#0A0F2C';
const GOLD = '#B8860B';
const RED = '#C1292E';
const DAY = 86_400_000;

const W = 1000;
const H = 300;
const PAD_L = 16;
const PAD_R = 16;
const BASE = 236; // the x-axis
const BAR_MAX = 130;
const LANE_TOP = 26;
const LANE_GAP = 24;

const t = (iso: string) => Date.parse(`${iso}T00:00:00Z`);

export default function LearningLedger({ series }: { series: LedgerSeries }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<string | null>(null);

  const model = useMemo(() => {
    const measureStart = t(series.start);
    const measureEnd = measureStart + series.weeks.length * 7 * DAY;
    // open the axis a fortnight before the first certificate
    const axisStart = Math.min(measureStart, t(CREDENTIALS_BY_DATE[0].date) - 14 * DAY);
    const axisEnd = measureEnd;
    const x = (ms: number) => PAD_L + ((ms - axisStart) / (axisEnd - axisStart)) * (W - PAD_L - PAD_R);

    const max = Math.max(1, ...series.weeks);
    const bars = series.weeks.map((n, i) => {
      const x0 = x(measureStart + i * 7 * DAY);
      const x1 = x(measureStart + (i + 1) * 7 * DAY);
      const h = (n / max) * BAR_MAX;
      return { x: x0 + 0.6, w: Math.max(1, x1 - x0 - 1.2), h, n, i };
    });

    // pins: certificates close in time step up into lanes so seals never overlap
    let lastX = -Infinity;
    let lane = 0;
    const pins = CREDENTIALS_BY_DATE.map((c) => {
      const px = x(t(c.date));
      lane = px - lastX < 18 ? lane + 1 : 0;
      lastX = px;
      return { c, x: px, y: LANE_TOP + lane * LANE_GAP };
    });

    // month ticks
    const ticks: { x: number; label: string; year?: string }[] = [];
    const d = new Date(axisStart);
    let m = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 1));
    while (m.getTime() <= axisEnd) {
      const month = m.getUTCMonth();
      ticks.push({
        x: x(m.getTime()),
        label: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][month],
        year: month === 0 || ticks.length === 0 ? String(m.getUTCFullYear()) : undefined,
      });
      m = new Date(Date.UTC(m.getUTCFullYear(), month + 1, 1));
    }

    return {
      bars,
      pins,
      ticks,
      preX0: x(axisStart),
      preX1: x(measureStart),
      total: series.weeks.reduce((a, n) => a + n, 0),
      peak: max,
    };
  }, [series]);

  const activePin = model.pins.find((p) => p.c.slug === active) ?? null;

  return (
    <section className="relative z-10 px-6 py-24" style={{ background: '#F3ECDF' }}>
      <div className="mx-auto max-w-5xl">
        <p className="font-mono text-[10px] uppercase tracking-[0.35em]" style={{ color: GOLD }}>
          The Ledger · learning, drawn against shipping
        </p>
        <h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold italic leading-[1.05] md:text-5xl" style={{ color: INK }}>
          She did not stop building to study. Here is the proof, week by week.
        </h2>
        <p className="mt-5 max-w-2xl text-[15px] font-light leading-[1.85]" style={{ color: '#4A3728' }}>
          Each bar is one week of commits — {model.total.toLocaleString('en-US')} across the {series.repos} repositories
          the Forge measures, straight from GitHub. Each pin is a certificate from the Hall above. Hover or tab through
          the pins to read them.
        </p>

        <div className="relative mt-12 -mx-6 overflow-x-auto px-6 pb-2 md:mx-0 md:px-0">
          <div className="relative min-w-[760px]">
            <svg viewBox={`0 0 ${W} ${H}`} className="block w-full" role="img" aria-labelledby="ledger-title ledger-desc">
              <title id="ledger-title">Weekly commits with certificate completion dates</title>
              <desc id="ledger-desc">
                {`Weekly commit counts from ${formatCredentialDate(series.start)} to ${formatCredentialDate(series.measuredAt)}, peaking at ${model.peak} commits in a week. Certificates: ${CREDENTIALS_BY_DATE.map((c) => `${c.title}, ${formatCredentialDate(c.date)}`).join('; ')}.`}
              </desc>
              <defs>
                <pattern id="ledger-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                  <line x1="0" y1="0" x2="0" y2="6" stroke={INK} strokeOpacity="0.12" strokeWidth="1.5" />
                </pattern>
              </defs>

              {/* before measurement: hatched, labelled, never drawn as zeros */}
              <rect x={model.preX0} y={BASE - BAR_MAX} width={model.preX1 - model.preX0} height={BAR_MAX} fill="url(#ledger-hatch)" />
              <text x={model.preX0 + 6} y={BASE - 8} fontSize="9" fontFamily="var(--font-mono)" fill={INK} fillOpacity="0.45" letterSpacing="1">
                BEFORE MEASUREMENT
              </text>

              {/* weekly commits */}
              {model.bars.map((b) => (
                <motion.rect
                  key={b.i}
                  x={b.x}
                  width={b.w}
                  fill={INK}
                  fillOpacity={0.78}
                  initial={{ y: BASE, height: 0 }}
                  whileInView={{ y: BASE - b.h, height: b.h }}
                  viewport={{ once: true }}
                  transition={reduce ? { duration: 0 } : { duration: 0.6, delay: b.i * 0.012, ease: [0.22, 1, 0.36, 1] }}
                >
                  <title>{`Week of ${formatCredentialDate(new Date(t(series.start) + b.i * 7 * DAY).toISOString().slice(0, 10))}: ${b.n} commits`}</title>
                </motion.rect>
              ))}

              {/* axis */}
              <line x1={PAD_L} x2={W - PAD_R} y1={BASE} y2={BASE} stroke={INK} strokeOpacity="0.35" />
              {model.ticks.map((tk) => (
                <g key={tk.x}>
                  <line x1={tk.x} x2={tk.x} y1={BASE} y2={BASE + 5} stroke={INK} strokeOpacity="0.35" />
                  <text x={tk.x} y={BASE + 18} fontSize="10" textAnchor="middle" fontFamily="var(--font-mono)" fill={INK} fillOpacity="0.6">
                    {tk.label}
                  </text>
                  {tk.year && (
                    <text x={tk.x} y={BASE + 32} fontSize="10" textAnchor="middle" fontFamily="var(--font-mono)" fill={GOLD}>
                      {tk.year}
                    </text>
                  )}
                </g>
              ))}

              {/* certificate pins */}
              {model.pins.map((p, i) => {
                const on = active === p.c.slug;
                const colour = p.c.tier === 'programme' ? RED : GOLD;
                return (
                  <g
                    key={p.c.slug}
                    tabIndex={0}
                    role="button"
                    aria-label={`${p.c.title}, ${p.c.issuer}, ${formatCredentialDate(p.c.date)}`}
                    onMouseEnter={() => setActive(p.c.slug)}
                    onMouseLeave={() => setActive(null)}
                    onFocus={() => setActive(p.c.slug)}
                    onBlur={() => setActive(null)}
                    onClick={() => setActive(on ? null : p.c.slug)}
                    style={{ cursor: 'pointer', outline: 'none' }}
                  >
                    <line x1={p.x} x2={p.x} y1={p.y + 8} y2={BASE} stroke={colour} strokeWidth={on ? 1.6 : 1} strokeDasharray={on ? undefined : '2 3'} />
                    <circle cx={p.x} cy={p.y} r={on ? 10 : 8} fill={on ? colour : '#F3ECDF'} stroke={colour} strokeWidth="1.5" />
                    <text x={p.x} y={p.y + 3.5} fontSize="9" textAnchor="middle" fontFamily="var(--font-mono)" fill={on ? '#F3ECDF' : colour} style={{ pointerEvents: 'none' }}>
                      {i + 1}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* the reading card for the active pin */}
            {activePin && (
              <div
                className="pointer-events-none absolute z-10 w-60 -translate-x-1/2 border px-4 py-3 shadow-xl"
                style={{
                  left: `${Math.min(88, Math.max(12, (activePin.x / W) * 100))}%`,
                  top: `${((activePin.y + 16) / H) * 100}%`,
                  background: INK,
                  borderColor: 'rgba(201,148,58,0.5)',
                }}
              >
                <p className="font-mono text-[9px] uppercase tracking-[0.2em]" style={{ color: '#C9943A' }}>
                  {activePin.c.issuer} · {formatCredentialDate(activePin.c.date)}
                </p>
                <p className="mt-1 font-display text-[15px] font-semibold italic leading-snug" style={{ color: '#F5EFD6' }}>
                  {activePin.c.title}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: '#4A3728' }}>
          <span className="inline-flex items-center gap-2">
            <span className="inline-block h-3 w-3" style={{ background: INK, opacity: 0.78 }} /> Commits per week
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="inline-block h-3 w-3 rounded-full border-[1.5px]" style={{ borderColor: RED }} /> The Path (SheCodes)
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="inline-block h-3 w-3 rounded-full border-[1.5px]" style={{ borderColor: GOLD }} /> The Cabinet
          </span>
        </div>

        <p className="mt-6 max-w-2xl border-l-2 pl-4 text-[12.5px] leading-[1.8]" style={{ borderColor: 'rgba(184,134,11,0.45)', color: 'rgba(74,55,40,0.8)' }}>
          Measured {formatCredentialDate(series.measuredAt)}. GitHub keeps 52 weeks of weekly activity, and the Forge
          measures the production repositories — her earliest SheCodes projects live elsewhere. So the hatched stretch
          is marked as unmeasured rather than drawn as weeks of nothing.
        </p>
      </div>
    </section>
  );
}
