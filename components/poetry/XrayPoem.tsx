'use client';

// X-ray: the poem on a light box. Pick a device and the lines that use it
// light up in cherry while the rest of the poem steps back. The syllable bars
// in the left margin draw the poem's shape; the letters in the right margin
// are its rhyme scheme. Everything shown is measured (lib/poem-xray.ts);
// Nanda's own notes, when she writes them, appear as "In her words".

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Poem } from '@/lib/poems-data';
import { xray, type Device, type Mark } from '@/lib/poem-xray';
import { track } from '@/lib/analytics';

const NAVY = '#0A1128';
const CHERRY = '#C21E56';
const BONE = '#FBF8F2';
const GOLD_INK = '#8F6418';

interface HerNote {
  line: number;
  story: string;
}

function renderLine(text: string, marks: Mark[]) {
  if (!marks.length) return text;
  const sorted = [...marks].sort((a, b) => a.start - b.start);
  const out: React.ReactNode[] = [];
  let at = 0;
  sorted.forEach((m, k) => {
    if (m.start < at) return; // overlapping marks: first one wins
    if (m.start > at) out.push(text.slice(at, m.start));
    out.push(
      <mark
        key={k}
        className="rounded-[3px] px-[1px]"
        style={{
          background: 'rgba(194,30,86,0.12)',
          color: CHERRY,
          boxShadow: `inset 0 -2px 0 ${CHERRY}`,
        }}
      >
        {text.slice(m.start, m.end)}
      </mark>,
    );
    at = m.end;
  });
  if (at < text.length) out.push(text.slice(at));
  return out;
}

export default function XrayPoem({ poem }: { poem: Poem }) {
  const x = useMemo(() => xray(poem), [poem]);
  const notes: HerNote[] = useMemo(
    () => (poem.annotations ?? []).map((a) => ({ line: a.line, story: a.story })),
    [poem.annotations],
  );

  const [active, setActive] = useState<string>(x.devices[0]?.id ?? 'shape');
  const device: Device | undefined = x.devices.find((d) => d.id === active);
  const lit = new Set(device?.lines ?? []);
  const maxSyl = Math.max(...x.lines.map((l) => l.syllables), 1);
  const showRhyme = device?.kind === 'rhyme';

  const choose = (id: string, kind: string) => {
    setActive(id);
    track('poem_xray_device', { poem: poem.slug, device: kind });
  };

  // Group lines back into stanzas for display.
  const stanzas: typeof x.lines[] = [];
  x.lines.forEach((l) => (stanzas[l.stanza] ??= []).push(l));

  return (
    <div
      className="relative overflow-hidden rounded-[2rem] shadow-2xl"
      style={{ background: BONE, color: NAVY }}
    >
      {/* the light box: a navy header band */}
      <div className="px-7 pt-7 pb-6 md:px-10" style={{ background: NAVY, color: '#F5F0E8' }}>
        <p className="font-mono text-[10.5px] uppercase tracking-[0.32em]" style={{ color: '#D6A44A' }}>
          X-ray · {x.lines.length} lines · {x.stanzas} {x.stanzas === 1 ? 'stanza' : 'stanzas'} · {x.meanSyllables} syllables a line
        </p>
        <p className="mt-3 max-w-xl text-[14px] leading-relaxed" style={{ color: 'rgba(245,240,232,0.72)' }}>
          The craft under the poem, measured from the text by this site: nothing here is typed in by hand.
          Choose what to look for.
        </p>

        <div className="mt-5 flex flex-wrap gap-2" role="tablist" aria-label="What the X-ray found">
          {x.devices.map((d) => (
            <button
              key={d.id}
              role="tab"
              aria-selected={d.id === active}
              onClick={() => choose(d.id, d.kind)}
              className="rounded-full px-4 py-1.5 text-[13px] font-medium transition-all"
              style={
                d.id === active
                  ? { background: CHERRY, color: '#fff' }
                  : { background: 'rgba(245,240,232,0.08)', color: 'rgba(245,240,232,0.8)', boxShadow: 'inset 0 0 0 1px rgba(245,240,232,0.18)' }
              }
            >
              {d.title}
            </button>
          ))}
          {notes.length > 0 && (
            <button
              role="tab"
              aria-selected={active === 'hers'}
              onClick={() => choose('hers', 'hers')}
              className="rounded-full px-4 py-1.5 text-[13px] font-medium italic transition-all"
              style={
                active === 'hers'
                  ? { background: '#D6A44A', color: NAVY }
                  : { background: 'transparent', color: '#D6A44A', boxShadow: 'inset 0 0 0 1px rgba(214,164,74,0.5)' }
              }
            >
              In her words
            </button>
          )}
        </div>
      </div>

      {/* the finding */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.25 }}
          className="px-7 pt-6 md:px-10"
          aria-live="polite"
        >
          {device ? (
            <>
              <p className="font-display text-xl md:text-2xl leading-snug" style={{ color: NAVY }}>
                {device.finding}
              </p>
              <p className="mt-2 max-w-2xl text-[14.5px] leading-relaxed" style={{ color: 'rgba(10,17,40,0.62)' }}>
                {device.craft}
              </p>
            </>
          ) : active === 'hers' ? (
            <p className="font-display italic text-xl leading-snug" style={{ color: GOLD_INK }}>
              Nanda&rsquo;s own notes on this poem, beside the lines they belong to.
            </p>
          ) : null}
        </motion.div>
      </AnimatePresence>

      {/* the poem on the light box */}
      <div className="px-4 pt-6 pb-9 md:px-8">
        {stanzas.map((st, si) => (
          <div key={si} className={si ? 'mt-6' : ''}>
            {st.map((l) => {
              const on = active === 'hers' ? notes.some((n) => n.line === l.index) : lit.has(l.index);
              const marks = device ? device.marks.filter((m) => m.line === l.index) : [];
              const note = active === 'hers' ? notes.find((n) => n.line === l.index) : undefined;
              return (
                <div key={l.index}>
                  <div
                    className="grid items-baseline gap-3 transition-opacity duration-300"
                    style={{
                      gridTemplateColumns: '3.25rem 1fr 1.25rem',
                      opacity: on || (!device && active !== 'hers') ? 1 : 0.34,
                    }}
                  >
                    {/* shape: a syllable bar and its count */}
                    <span className="flex items-center justify-end gap-1.5" aria-hidden>
                      <span
                        className="hidden h-[3px] rounded-full sm:block"
                        style={{ width: `${Math.max(3, (l.syllables / maxSyl) * 28)}px`, background: on ? CHERRY : 'rgba(10,17,40,0.22)' }}
                      />
                      <span className="font-mono text-[10px] tabular-nums" style={{ color: 'rgba(10,17,40,0.4)' }}>
                        {l.syllables}
                      </span>
                    </span>
                    <span className="font-serif text-[17px] md:text-[19px] leading-[1.7]" style={{ color: NAVY }}>
                      {renderLine(l.text, marks)}
                    </span>
                    <span
                      className="font-mono text-[11px] font-semibold"
                      style={{ color: showRhyme && l.rhyme ? CHERRY : 'rgba(10,17,40,0.18)' }}
                      aria-label={l.rhyme ? `rhyme ${l.rhyme}` : undefined}
                    >
                      {l.rhyme ?? ''}
                    </span>
                  </div>
                  {note && (
                    <p
                      className="my-2 ml-[4rem] border-l-2 pl-4 font-display italic text-[15.5px] leading-relaxed"
                      style={{ borderColor: '#D6A44A', color: GOLD_INK }}
                    >
                      {note.story}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <p
        className="border-t px-7 py-4 font-mono text-[10px] uppercase tracking-[0.2em] md:px-10"
        style={{ borderColor: 'rgba(10,17,40,0.1)', color: 'rgba(10,17,40,0.45)' }}
      >
        Left margin: syllables per line, the poem&rsquo;s shape · Right margin: rhyme scheme
      </p>
    </div>
  );
}
