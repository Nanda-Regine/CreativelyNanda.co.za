'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

type Item = { src: string; alt: string; cat: Category };
type Category = 'Portraits' | 'Culture' | 'Performance' | 'Poetry' | 'Art';

const ITEMS: Item[] = [
  // Portraits
  { src: '/assets/IMG-20260620-WA0057.jpg', alt: 'Editorial portrait beneath a palm', cat: 'Portraits' },
  { src: '/assets/IMG-20260620-WA0055.jpg', alt: 'Portrait', cat: 'Portraits' },
  { src: '/assets/IMG-20260620-WA0049.jpg', alt: 'Portrait', cat: 'Portraits' },
  { src: '/assets/IMG-20260620-WA0045.jpg', alt: 'Portrait', cat: 'Portraits' },
  { src: '/assets/IMG-20260620-WA0046.jpg', alt: 'Spiral staircase, architectural portrait', cat: 'Portraits' },
  { src: '/assets/IMG-20260620-WA0001.jpg', alt: 'Red dress among the trees', cat: 'Portraits' },
  { src: '/assets/IMG-20260620-WA0060.jpg', alt: 'Architectural staircase', cat: 'Portraits' },
  { src: '/assets/IMG-20260620-WA0042.jpg', alt: 'Outdoor lifestyle portrait', cat: 'Portraits' },
  // Culture
  { src: '/assets/IMG-20260620-WA0016.jpg', alt: 'Sotho straw hat at a Drakensberg viewpoint', cat: 'Culture' },
  { src: '/assets/IMG-20260620-WA0017.jpg', alt: 'Sotho straw hat, elevated viewpoint', cat: 'Culture' },
  { src: '/assets/IMG-20260620-WA0018.jpg', alt: 'Mountain landscape with traditional hat', cat: 'Culture' },
  { src: '/assets/IMG-20260620-WA0019.jpg', alt: 'Drakensberg with traditional attire', cat: 'Culture' },
  { src: '/assets/IMG-20260620-WA0014.jpg', alt: 'Sotho attire, preparing food with family', cat: 'Culture' },
  { src: '/assets/IMG-20260620-WA0015.jpg', alt: 'Cultural gathering with family', cat: 'Culture' },
  { src: '/assets/IMG-20260620-WA0025.jpg', alt: 'Traditional red dress at an outdoor event', cat: 'Culture' },
  // Performance & music
  { src: '/assets/performance/nmb-perform-1.jpg', alt: 'Spoken word in Xhosa beadwork', cat: 'Performance' },
  { src: '/assets/performance/nmb-perform-2.jpg', alt: 'Live performance', cat: 'Performance' },
  { src: '/assets/IMG-20260620-WA0011.jpg', alt: 'At the piano in the studio', cat: 'Performance' },
  { src: '/assets/IMG-20260620-WA0013.jpg', alt: 'Drums in the music studio', cat: 'Performance' },
  { src: '/assets/radio/madiba-radio-1.jpg', alt: 'On Madiba Radio', cat: 'Performance' },
  { src: '/assets/radio/madiba-radio-2.jpg', alt: 'On Madiba Radio', cat: 'Performance' },
  { src: '/assets/radio/tru-fm-vid-cover.jpg', alt: 'On Tru FM', cat: 'Performance' },
  // Poetry
  { src: '/assets/poetry-book/official-cover.jpg', alt: 'Inside Her Roses — official cover', cat: 'Poetry' },
  { src: '/assets/poetry-book/book-shoot-1.jpg', alt: 'The book on tree bark', cat: 'Poetry' },
  { src: '/assets/poetry-book/book-shoot-2.jpg', alt: 'The book, styled', cat: 'Poetry' },
  { src: '/assets/poetry-book/book-launch-poster.jpg', alt: 'Book launch poster', cat: 'Poetry' },
  { src: '/assets/poetry-book/books-bulk.jpg', alt: 'Copies of Inside Her Roses', cat: 'Poetry' },
  { src: '/assets/poetry-book/book-pages.jpg', alt: 'Pages from the collection', cat: 'Poetry' },
  // Art
  { src: '/assets/art/water.jpg', alt: 'Palette-knife abstract in cobalt and warm colour', cat: 'Art' },
  { src: '/assets/art/dancer.jpg', alt: 'Dancer with wide arc arms and ribbon halo', cat: 'Art' },
  { src: '/assets/art/navy-floral.jpg', alt: 'Deep navy florals with starlight', cat: 'Art' },
  { src: '/assets/art/bloom.jpg', alt: 'Warm palette-knife blooms', cat: 'Art' },
  { src: '/assets/art/jewel.jpg', alt: 'Deep blue jewel texture', cat: 'Art' },
  { src: '/assets/art/aurora.jpg', alt: 'Vivid purple and blue abstract', cat: 'Art' },
  { src: '/assets/art/sapphire.jpg', alt: 'Sapphire blue stones', cat: 'Art' },
  { src: '/assets/art/petal.jpg', alt: 'Botanical abstract', cat: 'Art' },
];

const TABS: ('All' | Category)[] = ['All', 'Portraits', 'Culture', 'Performance', 'Poetry', 'Art'];

export default function Gallery() {
  const [tab, setTab] = useState<'All' | Category>('All');
  const [lightbox, setLightbox] = useState<Item | null>(null);

  const items = tab === 'All' ? ITEMS : ITEMS.filter((i) => i.cat === tab);

  return (
    <main className="min-h-screen bg-[#0A1128] text-[#F5F0E8]">
      <div className="fixed inset-0 pointer-events-none opacity-25 z-0" style={{ backgroundImage: GRAIN }} />

      {/* Header */}
      <section className="relative z-10 pt-32 pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="font-mono text-xs tracking-[0.35em] uppercase text-[#C9943A] mb-4">Colour · Culture · Voice</p>
          <h1 className="font-display text-5xl md:text-7xl font-bold leading-[0.95] mb-5">The Gallery.</h1>
          <p className="text-white/60 text-lg max-w-2xl leading-relaxed">
            Performances and portraits, the lands that made me, the collection, and the
            paintings I love. A room for everything that isn&apos;t code.
          </p>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 mt-10">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className="px-5 py-2 rounded-full text-sm font-medium transition-all border"
                style={{
                  background: tab === t ? '#C1292E' : 'transparent',
                  borderColor: tab === t ? '#C1292E' : 'rgba(245,240,232,0.2)',
                  color: tab === t ? '#fff' : 'rgba(245,240,232,0.7)',
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="relative z-10 px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <motion.button
                  key={item.src}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => setLightbox(item)}
                  className="group relative aspect-[4/5] rounded-lg overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9943A]"
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width:768px) 50vw, (max-width:1024px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="absolute bottom-2 left-3 right-3 text-left text-[11px] text-white/90 opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.alt}
                  </span>
                  <span className="absolute top-2 right-2 font-mono text-[8px] tracking-widest uppercase text-[#0A1128] bg-[#C9943A] px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.cat}
                  </span>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 px-6 pb-24">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-display text-3xl md:text-4xl italic text-white/90 mb-8 leading-snug">
            Words, colour and culture — all of it from the same hand.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/poetry" className="px-8 py-4 bg-[#C1292E] text-white rounded-full font-semibold hover:bg-[#C1292E]/90 transition-all hover:scale-105">
              Read the poetry
            </Link>
            <Link href="/about" className="px-8 py-4 border border-white/20 text-white rounded-full font-semibold hover:border-[#C9943A] hover:text-[#C9943A] transition-all">
              The lineage
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-4xl max-h-[85vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full" style={{ height: '80vh' }}>
                <Image src={lightbox.src} alt={lightbox.alt} fill className="object-contain" sizes="100vw" />
              </div>
              <p className="text-center text-white/70 text-sm mt-3">{lightbox.alt}</p>
              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-2 right-0 md:-top-8 md:-right-8 text-white/70 hover:text-white text-2xl"
                aria-label="Close"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
