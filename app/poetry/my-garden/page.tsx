'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, Pencil, Check } from 'lucide-react';
import { POEMS, MOODS, getMoodKeyForPoem, getDailyBloom, type Poem, type MoodKey } from '@/lib/poems-data';
import { RoseCard } from '@/components/poetry/RoseCard';
import Stock from '@/components/ui/Stock';
import { getRead, getKept } from '@/lib/reading-trail';
import { getPoetProfile, setPenName as savePenName, earnedBadges, nextBadge, PLANT_BADGES } from '@/lib/poet-profile';

/**
 * My Garden: the reader's own plot, grown by reading.
 *
 * It used to open on a pen-name prompt, a zero, five greyed badges and an
 * empty "still soil" box, and it used one verb ("plant") for two different
 * acts: bookmarking a poem and writing one. Now there are three verbs and the
 * page fills itself as you read:
 *
 *   read   every poem you open is a seed in the plot (all 82, bedded by feeling)
 *   keep   the bookmark on a poem makes its seed bloom, and it waits here
 *   write  a poem of your own, planted in The Circle, grows the bottom bed
 *
 * Everything lives in this browser (lib/reading-trail, lib/poet-profile). The
 * server renders every seed unread, and the client fills in the trail after
 * mount, so there is nothing to mismatch on hydration.
 *
 * Papers: navy masthead, parchment plot, navy for the kept poems, cherry for
 * the reader's own writing (the three house colours in equal measure).
 */

type SeedState = 'unread' | 'read' | 'kept';

function Seed({ poem, state }: { poem: Poem; state: SeedState }) {
  const label = `${poem.title}${state === 'kept' ? ', kept' : state === 'read' ? ', read' : ''}`;
  return (
    <Link
      href={`/poetry/collection/${poem.slug}`}
      title={poem.title}
      aria-label={label}
      className="group relative flex h-7 w-7 items-center justify-center"
    >
      {state === 'unread' && (
        <span className="h-2 w-2 rounded-full transition-transform group-hover:scale-150" style={{ background: 'rgba(10,17,40,0.22)' }} />
      )}
      {state === 'read' && (
        <span className="shape-leaf h-4 w-4 rotate-45 transition-transform group-hover:scale-125" style={{ background: '#8F6418' }} />
      )}
      {state === 'kept' && (
        <span
          className="h-5 w-5 rounded-full transition-transform group-hover:scale-125"
          style={{ background: '#C21E56', boxShadow: '0 0 0 3px rgba(194,30,86,0.18)' }}
        />
      )}
    </Link>
  );
}

export default function MyGarden() {
  const [read, setRead] = useState<string[]>([]);
  const [kept, setKept] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [penName, setPenNameState] = useState('');
  const [planted, setPlanted] = useState(0);
  const [editing, setEditing] = useState(false);
  const [draftName, setDraftName] = useState('');
  const [today, setToday] = useState<Poem | null>(null);

  useEffect(() => {
    setRead(getRead());
    setKept(getKept());
    const profile = getPoetProfile();
    setPenNameState(profile.penName);
    setDraftName(profile.penName);
    setPlanted(profile.planted);
    setToday(getDailyBloom());
    setHydrated(true);
  }, []);

  const readSet = useMemo(() => new Set(read), [read]);
  const keptSet = useMemo(() => new Set(kept), [kept]);
  const stateOf = (p: Poem): SeedState => (keptSet.has(p.slug) ? 'kept' : readSet.has(p.slug) ? 'read' : 'unread');

  // The six beds: one per feeling, in the order of the mood doors.
  const beds = useMemo(
    () =>
      MOODS.map((m) => ({ mood: m, poems: POEMS.filter((p) => getMoodKeyForPoem(p) === m.key) })).filter(
        (b) => b.poems.length > 0,
      ),
    [],
  );

  const readCount = POEMS.filter((p) => readSet.has(p.slug) || keptSet.has(p.slug)).length;
  const keptPoems = POEMS.filter((p) => keptSet.has(p.slug));

  // What to plant next: an unread poem in the feeling you read most, or today's poem.
  const next: Poem | null = useMemo(() => {
    if (!hydrated) return null;
    const counts = new Map<MoodKey, number>();
    POEMS.forEach((p) => {
      if (readSet.has(p.slug)) counts.set(getMoodKeyForPoem(p), (counts.get(getMoodKeyForPoem(p)) ?? 0) + 1);
    });
    const favourite = Array.from(counts.entries()).sort((a, b) => b[1] - a[1])[0]?.[0];
    if (favourite) {
      const unread = POEMS.find((p) => getMoodKeyForPoem(p) === favourite && !readSet.has(p.slug));
      if (unread) return unread;
    }
    const anyUnread = POEMS.find((p) => !readSet.has(p.slug));
    return today && !readSet.has(today.slug) ? today : anyUnread ?? null;
  }, [hydrated, readSet, today]);

  const commitName = () => {
    const p = savePenName(draftName.trim());
    setPenNameState(p.penName);
    setEditing(false);
  };
  const badges = earnedBadges(planted);
  const nextB = nextBadge(planted);

  return (
    <main>
      {/* ── Masthead ── */}
      <Stock paper="navy" className="px-6 pt-28 pb-14">
        <div className="mx-auto max-w-6xl">
          <Link href="/poetry/collection" className="t-soft mb-8 inline-flex items-center gap-2 text-sm transition-colors hover:text-cherry">
            <ArrowLeft className="h-4 w-4" /> Back to the collection
          </Link>
          <p className="kicker t-gold">My Garden</p>
          <h1 className="t-head mt-4 max-w-3xl font-display text-4xl font-light italic leading-[1.05] md:text-6xl">
            Every poem you open plants a seed here.
          </h1>
          <p className="t-ink mt-5 max-w-2xl text-[15.5px] leading-relaxed">
            Read a poem and it goes into the ground. Keep one, with the bookmark on any poem, and it blooms.
            Write one of your own in The Circle and it grows in your bed at the bottom. There is nothing to sign
            up for: the garden lives in this browser, and only you can see it.
          </p>

          <dl className="mt-10 grid max-w-xl grid-cols-3 gap-6 border-t pt-6" style={{ borderColor: 'var(--rule)' }}>
            {[
              ['Read', hydrated ? `${readCount} of ${POEMS.length}` : `0 of ${POEMS.length}`],
              ['Kept', hydrated ? String(keptPoems.length) : '0'],
              ['Written', hydrated ? String(planted) : '0'],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="kicker t-soft">{k}</dt>
                <dd className="t-head mt-2 font-display text-2xl md:text-3xl">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Stock>

      {/* ── The plot ── */}
      <Stock paper="parchment" className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="kicker t-cherry">The plot</p>
              <h2 className="t-head mt-3 font-display text-3xl font-bold md:text-4xl">
                All {POEMS.length} poems, bedded by feeling.
              </h2>
            </div>
            {/* legend */}
            <ul className="t-soft flex flex-wrap items-center gap-5 text-[13px]">
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full" style={{ background: 'rgba(10,17,40,0.22)' }} /> not read yet
              </li>
              <li className="flex items-center gap-2">
                <span className="shape-leaf h-3.5 w-3.5 rotate-45" style={{ background: '#8F6418' }} /> read
              </li>
              <li className="flex items-center gap-2">
                <span className="h-4 w-4 rounded-full" style={{ background: '#C21E56' }} /> kept
              </li>
            </ul>
          </div>

          <div className="mt-10 grid gap-x-10 gap-y-9 md:grid-cols-2 lg:grid-cols-3">
            {beds.map(({ mood, poems }) => {
              const grown = poems.filter((p) => stateOf(p) !== 'unread').length;
              return (
                <div key={mood.key} className="border-t pt-4" style={{ borderColor: 'var(--rule)' }}>
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="t-head font-display text-xl">{mood.label}</h3>
                    <span className="t-soft font-mono text-[11px] tabular-nums">
                      {grown} / {poems.length}
                    </span>
                  </div>
                  <p className="t-soft mt-1 text-[13px] italic">{mood.prompt}</p>
                  <div className="mt-3 -ml-1.5 flex flex-wrap">
                    {poems.map((p) => (
                      <Seed key={p.slug} poem={p} state={stateOf(p)} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {next && (
            <Link
              href={`/poetry/collection/${next.slug}`}
              className="group mt-14 flex flex-col gap-2 rounded-[1.5rem] p-6 transition-transform hover:-translate-y-0.5 sm:flex-row sm:items-center sm:justify-between md:p-8"
              style={{ background: 'var(--card)', boxShadow: '0 0 0 1px var(--card-edge)' }}
            >
              <div>
                <p className="kicker t-gold">{readCount ? 'Plant your next one' : 'Plant your first one'}</p>
                <p className="t-head mt-2 font-display text-2xl md:text-3xl">{next.title}</p>
                <p className="t-soft mt-1 text-sm">{next.excerpt}</p>
              </div>
              <span className="t-cherry shrink-0 font-medium">Read it &rarr;</span>
            </Link>
          )}
        </div>
      </Stock>

      {/* ── Kept ── */}
      <Stock paper="navy" edge="slant" className="px-6 pt-24 pb-16">
        <div className="mx-auto max-w-6xl">
          <p className="kicker t-gold">Kept</p>
          <h2 className="t-head mt-3 font-display text-3xl font-bold md:text-4xl">The poems you came back for.</h2>
          {hydrated && keptPoems.length > 0 ? (
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {keptPoems.map((poem, index) => (
                <RoseCard key={poem.slug} poem={poem} index={index} likes={0} />
              ))}
            </div>
          ) : (
            <p className="t-ink mt-5 max-w-xl leading-relaxed">
              None yet. On any poem, tap the bookmark beside the heart and it will wait for you here, blooming in
              the plot above.
            </p>
          )}
        </div>
      </Stock>

      {/* ── Your own writing ── */}
      <Stock paper="cherry" className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-6xl md:grid md:grid-cols-[1.1fr_1fr] md:gap-14">
          <div>
            <p className="kicker" style={{ color: 'rgba(255,255,255,0.75)' }}>Your own bed</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-white md:text-4xl">
              {planted > 0 ? `${planted} ${planted === 1 ? 'poem' : 'poems'} of your own, growing.` : 'The best gardens are not only read.'}
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-white/80">
              {planted > 0
                ? 'Every poem you plant in The Circle grows this bed. Keep going: the next milestone is below.'
                : 'Write a line in The Circle, the community garden, and it is planted here under your pen name. A prompt is waiting if you do not know where to start.'}
            </p>
            <Link
              href="/poetry/community"
              className="mt-7 inline-flex rounded-full bg-white px-6 py-3 font-medium transition-transform hover:-translate-y-0.5"
              style={{ color: '#C21E56' }}
            >
              {planted > 0 ? 'Plant another in The Circle' : 'Write your first in The Circle'} &rarr;
            </Link>
          </div>

          {hydrated && (
            <div className="mt-10 md:mt-0">
              <p className="kicker text-white/70">Pen name</p>
              {editing ? (
                <div className="mt-3 flex items-center gap-2">
                  <input
                    autoFocus
                    value={draftName}
                    maxLength={40}
                    onChange={(e) => setDraftName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && commitName()}
                    placeholder="The name you write under"
                    className="rounded-xl border border-white/30 bg-white/10 px-4 py-2 text-white placeholder:text-white/50 focus:border-white focus:outline-none"
                  />
                  <button onClick={commitName} className="rounded-full bg-white p-2" style={{ color: '#C21E56' }} aria-label="Save pen name">
                    <Check className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <button onClick={() => setEditing(true)} className="group mt-3 inline-flex items-center gap-2 text-left">
                  <span className="font-display text-2xl text-white md:text-3xl">{penName || 'Choose a pen name'}</span>
                  <Pencil className="h-4 w-4 text-white/60 transition-colors group-hover:text-white" />
                </button>
              )}

              <p className="kicker mt-8 text-white/70">Milestones</p>
              <ol className="mt-3 flex flex-wrap gap-2">
                {PLANT_BADGES.map((b) => {
                  const earned = badges.some((e) => e.id === b.id);
                  return (
                    <li
                      key={b.id}
                      title={b.hint}
                      className="rounded-full px-3.5 py-1.5 text-sm"
                      style={
                        earned
                          ? { background: '#fff', color: '#C21E56' }
                          : { color: 'rgba(255,255,255,0.7)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.35)' }
                      }
                    >
                      {b.label} · {b.threshold}
                    </li>
                  );
                })}
              </ol>
              {nextB && (
                <p className="mt-4 text-sm text-white/75">
                  {nextB.threshold - planted} more to reach {nextB.label}.
                </p>
              )}
            </div>
          )}
        </div>
      </Stock>
    </main>
  );
}
