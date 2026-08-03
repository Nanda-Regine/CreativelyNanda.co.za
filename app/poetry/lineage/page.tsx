'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { LINEAGES, KIGANDA_INTRODUCTION } from '@/lib/data/lineage';
import RoomBackdrop from '@/components/room/RoomBackdrop';
import PlacedPortrait from '@/components/room/PlacedPortrait';
import { portraitsForRoom, PAGE_BACKDROPS } from '@/lib/house-assets';
import TexturedSection, { TEXTURES } from '@/components/ui/TexturedSection';

const ease = [0.22, 1, 0.36, 1] as const;

export default function LineageRoom() {
  return (
    <div className="min-h-screen text-cream">
      {/* Hero */}
      <section className="relative px-6 pt-28 pb-14 overflow-hidden">
        <RoomBackdrop image={PAGE_BACKDROPS.roots} wash="#0b1029" intensity={0.95} veil={0.18} />
        <div className="relative max-w-5xl mx-auto">
          <Link
            href="/poetry/collection"
            className="inline-flex items-center gap-2 text-cream/55 hover:text-cherry transition-colors mb-10 text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to the garden
          </Link>

          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-14 h-px" style={{ background: '#C9A84C' }} />
            <span className="text-xs font-mono tracking-[0.35em] uppercase" style={{ color: '#C9A84C' }}>
              Inside Her Roses · Lineage
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-light italic leading-[1.05] drop-shadow-[0_2px_16px_rgba(0,0,0,0.6)]"
            style={{ color: '#F5EFD6' }}
          >
            The soil the roses<br />grew from.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="mt-6 max-w-2xl text-lg leading-relaxed drop-shadow-[0_1px_10px_rgba(0,0,0,0.55)]"
            style={{ color: 'rgba(245,239,214,0.86)' }}
          >
            Before the poems, before the stage, before the code — there were the clans.
            I carry four royal houses in one body: a grasshopper from Buganda, and three
            crowns from the south. This is where the roses are rooted.
          </motion.p>
        </div>
      </section>

      {/* Kiganda introduction — how a Muganda names herself */}
      <section className="relative px-6 py-14">
        <div className="max-w-3xl mx-auto rounded-[2rem] border border-white/10 bg-[#0d1330]/70 px-8 py-12 md:px-14 md:py-16 text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="text-2xl">🦗</span>
            <span className="text-xs font-mono uppercase tracking-[0.3em]" style={{ color: '#C9A84C' }}>
              Okw&rsquo;eyanjula · The naming of a line
            </span>
          </div>
          <div className="space-y-3">
            {KIGANDA_INTRODUCTION.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, ease }}
                className={`font-display italic leading-relaxed ${
                  i === 0 ? 'text-2xl md:text-3xl text-cream' : 'text-lg md:text-xl text-cream/75'
                }`}
              >
                {line}
              </motion.p>
            ))}
          </div>
          <div className="mt-10 mx-auto w-16 h-px" style={{ background: 'rgba(201,168,76,0.5)' }} />
          <p className="mt-6 text-cream/50 text-sm font-mono tracking-wide">
            My totem is Nsenene. I carry my great-grandmother&rsquo;s name.
          </p>
        </div>
      </section>

      {/* The living lineage — Nanda's own photographs */}
      <section className="px-6 py-14 space-y-16">
        {portraitsForRoom('roots').map((p, i) => (
          <motion.div
            key={p.file}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ease }}
          >
            <PlacedPortrait
              file={p.file}
              alt={p.alt}
              side={i % 2 === 0 ? 'left' : 'right'}
              kicker={i === 0 ? 'The line, still living' : 'Where we come from'}
              caption={
                i === 0
                  ? 'Nine generations I can name — and here, one lifting the next. My mother, and me.'
                  : 'The soil is not a metaphor. It is a forest that remembers our name.'
              }
              accent="#C9A84C"
            />
          </motion.div>
        ))}
      </section>

      {/* The four houses */}
      <section className="px-6 pb-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {LINEAGES.map((l, i) => {
            const flip = i % 2 === 1;
            return (
              <motion.article
                key={l.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ ease }}
                className="grid lg:grid-cols-2 rounded-[2rem] overflow-hidden border border-white/10 bg-[#0b1029]/70"
              >
                {/* Image side */}
                <div
                  className={`relative min-h-[260px] lg:min-h-[420px] ${flip ? 'lg:order-2' : ''}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={l.bg} alt="" className="absolute inset-0 w-full h-full object-cover" />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(${flip ? '270deg' : '90deg'}, rgba(11,16,41,0) 30%, rgba(11,16,41,0.85) 100%)`,
                    }}
                  />
                  <div className="absolute top-6 left-6 flex items-center gap-3">
                    <span className="text-4xl drop-shadow-lg">{l.icon}</span>
                  </div>
                </div>

                {/* Text side */}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <span
                    className="h-1 w-14 rounded-full mb-6"
                    style={{ background: l.accent }}
                  />
                  <p className="text-xs font-mono uppercase tracking-[0.28em] mb-3" style={{ color: l.accent }}>
                    {l.subtitle}
                  </p>
                  <h2 className="font-display text-3xl md:text-4xl font-bold mb-5" style={{ color: '#F5EFD6' }}>
                    {l.title}
                  </h2>
                  <p className="font-serif text-cream/80 leading-relaxed text-base md:text-lg">
                    {l.body}
                  </p>

                  {/* Details */}
                  {l.details && (
                    <dl className="mt-7 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                      {l.details.map(([k, v]) => (
                        <div key={k} className="border-t border-white/10 pt-3">
                          <dt className="text-[11px] font-mono uppercase tracking-[0.2em] text-cream/45">{k}</dt>
                          <dd className="text-cream/85 mt-1 font-display">{v}</dd>
                        </div>
                      ))}
                    </dl>
                  )}

                  {/* Praise poem (izibongo) */}
                  {l.praises && (
                    <div className="mt-7 border-t border-white/10 pt-6">
                      <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-cream/45 mb-3">
                        Izibongo · Praise
                      </p>
                      <p className="font-display italic text-lg md:text-xl leading-relaxed" style={{ color: l.accent }}>
                        {l.praises}
                      </p>
                      {l.praisesTranslation && (
                        <p className="text-cream/55 text-sm mt-3 italic">&ldquo;{l.praisesTranslation}&rdquo;</p>
                      )}
                    </div>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* Closing bridge to the poems */}
      <TexturedSection texture={TEXTURES.regalNavy} tone="navy" className="px-6 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-display italic text-2xl md:text-3xl text-cream/85 leading-relaxed mb-8"
          >
            Four crowns, one voice. This is the lineage the roses grew from.
          </motion.p>
          <Link
            href="/poetry/collection"
            className="inline-flex items-center gap-2 rounded-full bg-cherry text-white px-7 py-3 font-medium hover:bg-cherry-dark transition-colors"
          >
            Read the poetry this lineage produced <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </TexturedSection>
    </div>
  );
}
