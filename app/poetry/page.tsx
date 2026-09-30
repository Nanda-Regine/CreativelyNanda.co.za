/**
 * /poetry: the front page of the poetry wing.
 *
 * Rebuilt 2026-09-29. The old page was a client component in the site's
 * first template (collision-prone bubbles, "1 Published Book" stats, three
 * competing buttons, pink on navy), which meant the server sent crawlers an
 * empty shell for the front door of her main identity. This page renders on
 * the server; only the three interactive pieces are client islands.
 *
 * Rhythm, on the house stock (app/stock.css): a full-strength photograph as
 * the masthead, the wing's contents on parchment, the book on bone, the stage
 * and radio as the one navy band, readers on parchment, where to find the
 * work on bone, and the cherry block to close.
 */

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { PhotoBleed } from '@/components/ui/Ground';
import Stock from '@/components/ui/Stock';
import RoomIndex, { type Room } from '@/components/poetry/landing/RoomIndex';
import StageReel, { type Film } from '@/components/poetry/landing/StageReel';
import ReaderWall from '@/components/poetry/landing/ReaderWall';
import { cldImg } from '@/lib/cloudinary';
import { POEMS } from '@/lib/poems-data';

const BOOK_URL = 'https://books2read.com/Nrkk-insideherroses';
const GOLD = '#C9943A';
const img = (id: string, w = 900) => cldImg(`creativelynanda/${id}`, w);

const ROOMS: Room[] = [
  { href: '/poetry/collection', title: 'The Garden', line: 'Every poem, grown by mood and season.', image: img('poetry-book/book-shoot-1'), alt: 'Inside Her Roses resting on a tree trunk in a garden' },
  { href: '/poetry/wall', title: 'The Wall', line: 'The Instagram poems, pinned and read page by page.', image: img('poetry-book/book-pages'), alt: 'The book open to two poems' },
  { href: '/poetry/stage', title: 'The Stage', line: 'The voice behind the verse: performance and radio.', image: img('performance/nmb-perform-2'), alt: 'Nanda performing at the microphone in Xhosa dress' },
  { href: '/poetry/lineage', title: 'The Lineage Room', line: 'The soil the poems grew from.', image: img('nanda-culture/IMG_20260719_181316'), alt: 'Nanda standing among palms beside the water' },
  { href: '/poetry/poet-who-codes', title: 'The Poet Who Codes', line: 'Two tongues, one mind.', image: img('nanda-portraits/nanda-coding/IMG_20260102_161137'), alt: 'Nanda at her laptop on a stoep overlooking a garden' },
  { href: '/poetry/games', title: 'Poetry Games', line: 'Word search, magnetic lines, finish the line.', image: img('poetry-book/contents-page'), alt: 'The contents page of Inside Her Roses' },
  { href: '/poetry/community', title: 'The Circle', line: 'Write with us.', image: img('nanda-portraits/IMG_20250301_153203'), alt: 'Nanda with two poets at the Nelson Mandela Bay Arts Festival' },
  { href: '/poetry/my-garden', title: 'My Garden', line: 'Your own plot: the poems you keep.', image: img('poetry-book/romance-chapter'), alt: 'The Romance chapter page beside the book cover' },
];

const FILMS: Film[] = [
  { id: 'nmb-perform', title: 'At the Nelson Mandela Bay Arts Festival', kind: 'Performance', cover: img('performance/nmb-perform-vid-cover', 1400), embed: 'https://drive.google.com/file/d/1hQatcwjUYIqDcYynf_oyA8VO-i0PWDRR/preview' },
  { id: 'poetry-night', title: 'Poetry Night', kind: 'Performance', cover: img('performance/poetry-night-perform-vid-cover'), embed: 'https://drive.google.com/file/d/1rM5ZRctQttTxGopEWDTkzsxN--876BBY/preview' },
  { id: 'performance-3', title: 'Spoken Word', kind: 'Performance', cover: img('performance/performance-vid-3-cover'), embed: 'https://drive.google.com/file/d/10HvShdmM0GLekvcNFLj3IY-JHtISS9-r/preview' },
  { id: 'cinema-garden', title: 'Garden Cinema', kind: 'Performance', cover: img('performance/cinema-vid-garden-cover'), embed: 'https://drive.google.com/file/d/1ibbHOAYpYjLP5GSwj6Nof281V_9t9JZd/preview' },
  { id: 'madiba-radio', title: 'Madibaz Radio', kind: 'On air', cover: '/assets/radio/madiba-radio-vid-cover.jpg', embed: 'https://drive.google.com/file/d/13jEDG0UZKJuA3NbmMfgi0JRzzDtTIMRU/preview' },
  { id: 'tru-fm', title: 'TRU FM', kind: 'On air', cover: '/assets/radio/tru-fm-vid-cover.jpg', embed: 'https://drive.google.com/file/d/1GgGPYiSbFLOHettVbr8GEh9qP_PU2Yn2/preview' },
];

const REVIEWS = Array.from({ length: 10 }, (_, i) => ({ src: img(`reviews/review-${i + 1}`, 520), full: img(`reviews/review-${i + 1}`, 1400) }));

const STORES = ['Amazon', 'Apple Books', 'Kobo', 'Nook', 'Indigo', 'Thalia', 'Mondadori', 'bol.de'];

const PLATFORMS = [
  { name: 'Instagram', handle: '@nanda.regine', url: 'https://instagram.com/nanda.regine' },
  { name: 'Wattpad', handle: 'NandaRegine', url: 'https://www.wattpad.com/user/NandaRegine' },
  { name: 'AllPoetry', handle: 'Nanda_Regine', url: 'https://allpoetry.com/Nanda_Regine' },
  { name: 'PoemHunter', handle: 'nanda-regine', url: 'https://www.poemhunter.com/nanda-regine/' },
  { name: 'WritersCafe', handle: 'NandaRegine', url: 'https://www.writerscafe.org/NandaRegine' },
  { name: 'Poetry.com', handle: 'NandaRegine', url: 'https://www.poetry.com/NandaRegine' },
];

export default function PoetryPage() {
  // Measured, never typed: the count is whatever the collection holds today.
  const poemCount = POEMS.length;

  return (
    <main className="stock-parchment min-h-screen">
      {/* ═══ MASTHEAD ═════════════════════════════════════════════════════════ */}
      <PhotoBleed
        image="nanda-portraits/IMG_20241107_161910"
        ground="rose"
        focus="60% 40%"
        from="left"
        minH="92vh"
        className="stock-navy -mt-20 px-6 pt-28"
      >
        <div className="relative z-10 mx-auto w-full max-w-6xl py-16">
          <p className="kicker" style={{ color: GOLD }}>
            The poetry wing · KuGompo City
          </p>
          <h1 className="display-xxl mt-6 max-w-3xl font-display font-bold italic text-white">
            Inside
            <br />
            <span className="pl-[0.7em]">Her Roses</span>
          </h1>
          <p className="mt-8 max-w-md font-display text-xl italic leading-relaxed text-white/85 md:text-2xl">
            Womanhood, longing, healing, and the quiet ferocity of becoming. {poemCount} poems, a published book, a stage and a radio voice.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link href="/poetry/collection" className="rounded-full bg-[#C21E56] px-8 py-4 font-semibold text-white transition-transform hover:-translate-y-0.5">
              Enter the Garden
            </Link>
            <a href={BOOK_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-display text-lg italic text-white underline decoration-[#C9943A] underline-offset-[6px]">
              Get the book <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </PhotoBleed>

      {/* ═══ THE CONTENTS ═════════════════════════════════════════════════════ */}
      <Stock paper="parchment" edge="slant-r" className="px-6 pb-24 md:pb-32">
        <div className="mx-auto max-w-6xl pt-20 md:pt-28">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="kicker t-cherry">In this wing</p>
              <h2 className="display-l mt-4 max-w-2xl font-display italic t-head">Eight rooms, one house of roses.</h2>
            </div>
            <p className="max-w-xs font-display text-lg italic leading-relaxed t-ink md:text-right">Wander in any order. Every room ends on a door to another.</p>
          </div>
          <div className="mt-14">
            <RoomIndex rooms={ROOMS} />
          </div>
        </div>
      </Stock>

      {/* ═══ THE BOOK ═════════════════════════════════════════════════════════ */}
      <Stock paper="cherry" className="px-6 py-24 md:py-32">
        <div className="mx-auto grid max-w-6xl items-center gap-16 md:grid-cols-12">
          <div className="relative md:col-span-6">
            {/* the box of books, with the cover set over its corner */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img('poetry-book/book-cover-1', 1200)} alt="A box of Inside Her Roses, fresh from print" className="aspect-[4/3] w-full object-cover" style={{ boxShadow: 'var(--shadow)' }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img('poetry-book/official-cover', 600)}
              alt="The cover of Inside Her Roses"
              className="absolute -bottom-10 right-4 w-[42%] rotate-[4deg] md:-right-8"
              style={{ boxShadow: '0 30px 60px -24px rgba(40,5,15,0.6)' }}
            />
          </div>
          <div className="md:col-span-5 md:col-start-8">
            <p className="kicker t-cherry">The collection</p>
            <h2 className="display-l mt-4 font-display font-bold italic t-head">A journey through love, identity, healing and Black womanhood.</h2>
            <p className="mt-6 text-lg font-light leading-[1.85] t-ink">
              The collection blooms with raw honesty, capturing moments of vulnerability and strength. Available in print and ebook across eight
              stores.
            </p>
            <p className="kicker mt-6 leading-loose t-soft">{STORES.join(' · ')}</p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a href={BOOK_URL} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#0A1128] px-7 py-3.5 font-semibold text-[#F5F0E8] transition-transform hover:-translate-y-0.5">
                Find your store
              </a>
              <Link href="/poetry/collection" className="rounded-full border px-7 py-3.5 font-semibold t-head transition-colors hover:border-[#C21E56] hover:text-[#C21E56]" style={{ borderColor: 'var(--rule)' }}>
                Read poems online
              </Link>
            </div>
            <dl className="mt-12 grid gap-6 border-t pt-8 sm:grid-cols-3" style={{ borderColor: 'var(--rule)' }}>
              {[
                ['Television', 'Featured poet on Gqeberha: The Empire (2023).'],
                ['Radio', 'Madibaz Radio and TRU FM, on poetry and making.'],
                ['Stage', 'Open mics, workshops and festival sets.'],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="kicker t-gold">{k}</dt>
                  <dd className="mt-2 text-[14px] leading-relaxed t-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Stock>

      {/* ═══ ON STAGE, ON AIR: the one navy band ══════════════════════════════ */}
      <Stock paper="navy" id="performances" className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="kicker t-gold">On stage · On air</p>
              <h2 className="display-l mt-4 font-display italic t-head">The voice behind the verse.</h2>
            </div>
            <Link href="/poetry/stage" className="font-display text-lg italic t-head underline decoration-[#C21E56] underline-offset-[6px]">
              Enter the Stage
            </Link>
          </div>
          <StageReel films={FILMS} />
        </div>
      </Stock>

      {/* ═══ READERS ══════════════════════════════════════════════════════════ */}
      <Stock paper="parchment" className="pb-20 pt-24 md:pt-32">
        <div className="mx-auto max-w-6xl px-6">
          <p className="kicker t-cherry">Readers wrote back</p>
          <h2 className="display-l mt-4 max-w-2xl font-display italic t-head">What the book did, in their words.</h2>
        </div>
        <div className="mt-10">
          <ReaderWall images={REVIEWS} />
        </div>
      </Stock>

      {/* ═══ WHERE THE WORDS LIVE ═════════════════════════════════════════════ */}
      <Stock paper="bone" className="px-6 py-24 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="kicker t-cherry">Read more</p>
            <h2 className="display-l mt-4 font-display italic t-head">Where the words live.</h2>
            <p className="mt-5 text-[15px] font-light leading-relaxed t-ink">New pieces, drafts and reflections, across the platforms where poets gather.</p>
          </div>
          <ul className="border-t md:col-span-7 md:col-start-6" style={{ borderColor: 'var(--rule)' }}>
            {PLATFORMS.map((p) => (
              <li key={p.name} className="border-b" style={{ borderColor: 'var(--rule)' }}>
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="group flex items-baseline justify-between gap-6 py-5">
                  <span className="font-display text-2xl italic t-head transition-transform duration-500 group-hover:translate-x-1.5 md:text-3xl">{p.name}</span>
                  <span className="kicker t-soft transition-colors group-hover:text-[#C21E56]">
                    {p.handle} ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Stock>

      {/* ═══ CLOSE: the cherry block ══════════════════════════════════════════ */}
      <Stock paper="cherry" className="px-6 py-24 md:py-32">
        <figure className="mx-auto max-w-5xl">
          <blockquote className="display-xl font-display font-bold italic t-head">
            Words are code for the soul.
            <span className="mt-2 block pl-[1.2em] t-gold">Poetry is the algorithm of feeling.</span>
          </blockquote>
          <figcaption className="kicker mt-10 t-ink">Nandawula Regine</figcaption>
        </figure>
      </Stock>
    </main>
  );
}
