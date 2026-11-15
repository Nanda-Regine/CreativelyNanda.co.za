/**
 * The Shelf: every live Mirembe Muse product, in three bands, each labelled
 * for what it is to the studio. Server Component, no client JS: hover and
 * focus are CSS only, links never prefetch (17 cards would cost a prepaid
 * visitor data they did not ask to spend).
 *
 * Bands print on the three house papers (parchment, cherry, navy), so the
 * equal-thirds rule is met by structure. Each card is its product's own paper,
 * with ink that was contrast-checked against it (scripts/studio/check-roster.mjs).
 * A card's cover is the real product (phone, desk) or a typeset plate, never an
 * empty frame, and its evidence row prints only what exists.
 */
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Stock from '@/components/ui/Stock';
import { screenUrl } from '@/lib/data/evidence/media';
import { cldScreenId } from '@/lib/data/app-screens';
import type { Relationship, RosterApp } from '@/lib/data/roster';

export interface ShelfCardData {
  app: RosterApp;
  screens?: number;
  /** The product has a floor at /forge/studio/<key>. */
  floor?: boolean;
  /** Overrides app.cover, e.g. a captured desk screen in place of a plate. */
  cover?: RosterApp['cover'];
}

export interface ShelfBand {
  band: 'own' | 'client' | 'internal';
  title: string;
  note: string;
  cards: ShelfCardData[];
}

const STAMP: Record<Relationship, string> = {
  own: 'Own product',
  client: 'Client platform',
  'co-founded': 'Co-founded',
  internal: 'Internal',
  venture: 'Venture',
};

const BAND_PAPER = { own: 'parchment', client: 'cherry', internal: 'navy' } as const;
const CARD_INK = '#1A1A2E';
const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '';

function Cover({ app, cover }: { app: RosterApp; cover?: RosterApp['cover'] }) {
  const c = cover ?? app.cover;
  if (c.kind === 'phone') {
    const src = `https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,w_160,c_limit/${cldScreenId({ app: app.phone!, id: c.id })}`;
    return (
      <div aria-hidden className="flex h-[72px] w-[72px] shrink-0 items-center justify-center">
        <div className="w-[34px] rounded-[9px] p-[2px]" style={{ background: '#15151c', boxShadow: `0 6px 14px -6px ${app.accent}99` }}>
          <div className="overflow-hidden rounded-[7px]" style={{ aspectRatio: '9 / 20', background: app.accent }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" width={160} height={356} loading="lazy" decoding="async" className="block h-full w-full object-cover" />
          </div>
        </div>
      </div>
    );
  }
  if (c.kind === 'desk') {
    return (
      <div aria-hidden className="flex h-[72px] w-[72px] shrink-0 items-center justify-center">
        <div className="w-[72px] overflow-hidden rounded-[4px]" style={{ background: '#15151c', padding: '5px 1.5px 1.5px', boxShadow: `0 6px 14px -6px ${app.accent}99` }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={screenUrl(c.id, 480)} alt="" width={480} height={220} loading="lazy" decoding="async" className="block h-auto w-full" />
        </div>
      </div>
    );
  }
  return (
    <div
      aria-hidden
      className="flex h-[72px] w-[72px] shrink-0 flex-col items-center justify-center rounded-[4px]"
      style={{ background: `${app.accent}26`, boxShadow: `inset 0 0 0 1px ${app.accentInk}55` }}
    >
      <span className="font-display text-3xl font-bold italic leading-none" style={{ color: app.accentInk }}>
        {app.name.replace(/^The /, '').charAt(0).toUpperCase()}
      </span>
      <span className="mt-2 block h-px w-7" style={{ background: '#C9943A' }} />
    </div>
  );
}

function Card({ data, lead, drop }: { data: ShelfCardData; lead?: boolean; drop?: boolean }) {
  const { app, screens, floor } = data;
  const linkCls = 'inline-flex min-h-[44px] items-center gap-1 underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';
  return (
    <li
      className={`group relative rounded-[6px] p-4 transition-shadow duration-500 hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.55)] focus-within:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.55)] md:p-5 ${lead ? 'md:col-span-2' : ''} ${drop ? 'md:mt-10' : ''}`}
      style={{ background: app.paper, color: CARD_INK, outlineColor: app.accentInk }}
      data-roster={app.key}
    >
      <article className={`flex gap-4 ${lead ? 'md:gap-7' : ''}`} aria-labelledby={`shelf-${app.key}`}>
        <Cover app={app} cover={data.cover} />
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: app.accentInk }}>
            {STAMP[app.relationship]}
          </p>
          <h3 id={`shelf-${app.key}`} className={`font-display mt-1 font-bold italic leading-tight ${lead ? 'text-3xl md:text-4xl' : 'text-2xl'}`} style={{ color: CARD_INK }}>
            {app.name}
          </h3>
          <p className={`mt-2 leading-relaxed ${lead ? 'max-w-xl text-base' : 'text-[15px]'}`} style={{ color: 'rgb(26 26 46 / 0.85)' }}>
            {app.line}
          </p>
          <ul className="mt-2 flex flex-wrap items-center gap-x-5 text-sm" style={{ color: app.accentInk }}>
            {floor && screens ? (
              <li>
                <Link href={`/forge/studio/${app.key}`} prefetch={false} className={linkCls} style={{ outlineColor: app.accentInk }}>
                  {screens} real screens
                </Link>
              </li>
            ) : null}
            {app.caseFile ? (
              <li>
                <Link href={`/forge/cases/${app.caseFile}`} prefetch={false} className={linkCls} style={{ outlineColor: app.accentInk }}>
                  Case file
                </Link>
              </li>
            ) : null}
            {app.liveUrl ? (
              <li>
                <a href={app.liveUrl} rel="noopener noreferrer" className={linkCls} style={{ outlineColor: app.accentInk }}>
                  Live link<span className="sr-only"> for {app.name} (opens the product site)</span>
                  <ArrowUpRight aria-hidden className="h-4 w-4" />
                </a>
              </li>
            ) : null}
          </ul>
        </div>
      </article>
    </li>
  );
}

export default function Shelf({ bands, bench, liveCount }: { bands: ShelfBand[]; bench: RosterApp[]; liveCount: number }) {
  return (
    <div id="shelf" className="scroll-mt-20">
      <Stock paper="parchment" edge="slant-r" className="px-6 pb-4 pt-16 md:pt-24">
        <div className="mx-auto max-w-6xl">
          <p className="kicker t-gold">The shelf</p>
          <h2 className="display-l mt-4 max-w-3xl font-display italic t-head">{liveCount} live products, each named for what it is to the studio.</h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed t-ink">
            Some are ours, some were built for clients, one was co-founded and one is the private system behind the rest. Each card shows only the evidence that exists.
          </p>
        </div>
      </Stock>

      {bands.map((b) => (
        <Stock key={b.band} paper={BAND_PAPER[b.band]} className="px-6 py-14 md:py-20">
          <div className="mx-auto max-w-6xl">
            <p className="kicker t-gold">{b.cards.length} products</p>
            <h3 className="display-l mt-3 font-display italic t-head" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)' }}>
              {b.title}
            </h3>
            <p className="mt-3 max-w-xl t-ink">{b.note}</p>
            <ul className="mt-10 grid gap-4 md:grid-cols-2 md:gap-x-8 md:gap-y-6">
              {b.cards.map((c, i) => (
                <Card key={c.app.key} data={c} lead={i === 0} drop={i > 0 && i % 2 === 0} />
              ))}
            </ul>
            {b.band === 'internal' ? (
              <aside aria-labelledby="bench-title" className="mt-14 border-t pt-8" style={{ borderColor: 'var(--rule)' }}>
                <h3 id="bench-title" className="font-display text-2xl italic t-head">
                  On the bench
                </h3>
                <p className="mt-1 max-w-md text-sm italic t-ink">Pencilled in, not counted. These are still being built.</p>
                <ul className="mt-4 space-y-2">
                  {bench.map((a) => (
                    <li key={a.key} className="font-display text-xl italic t-ink">
                      {a.name}
                      <span className="ml-3 font-mono text-[11px] not-italic uppercase tracking-[0.18em] t-soft">In development</span>
                    </li>
                  ))}
                </ul>
              </aside>
            ) : null}
          </div>
        </Stock>
      ))}
    </div>
  );
}
