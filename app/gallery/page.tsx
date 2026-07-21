'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { CldImage } from 'next-cloudinary';

// ── helpers ──────────────────────────────────────────────────────────────────
const P = (id: string) => `creativelynanda/nanda-portraits/${id}`;
const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

// alt = plain, for screen readers / SEO. cap = the poetry shown on screen.
type Img = { id: string; alt: string; cap: string };
type Form =
  | 'single' | 'triptych' | 'triptych-tall' | 'diptych'
  | 'mosaic' | 'filmstrip' | 'plate-strip' | 'stacked' | 'oval-veiled';

type Family = { n: string; name: string; blurb: string; form: Form; images: Img[]; marginalia?: string };

const FAMILIES: Family[] = [
  {
    n: '01', name: 'The Red Bodice', form: 'single',
    blurb: 'She is the colour of her own roses, and she knows it. Warmth worn like armour — the softest thing in the room, and the surest.',
    marginalia: 'This is where the whole house begins: a woman lit like a secret the afternoon can’t keep, unafraid of her own heat.',
    images: [
      { id: 'nanda-homepage-hero-image', alt: 'Red satin bodice in golden window light', cap: 'The hour the light chose her.' },
      { id: 'IMG_20260719_180131', alt: 'Black lace by candlelight and a glowing orb', cap: 'And the same woman, after dark.' },
    ],
  },
  {
    n: '02', name: 'Beadwork & Ceremony', form: 'mosaic',
    blurb: 'A day when the whole self dresses up to be seen — the beadwork, the drum, the book held like a birthright. She does not perform her culture. She lives inside it.',
    images: [
      { id: 'IMG_20250301_144326', alt: 'Seated on mosaic tiles in Xhosa regalia, holding the book', cap: 'Her book in her lap like a small crown.' },
      { id: 'IMG_20250301_145301', alt: 'Mid-dance at the arts festival', cap: 'Joy that forgot it was being watched.' },
      { id: 'IMG_20250301_153220', alt: 'A warm duo at the festival', cap: 'Kept company, still the brightest thing.' },
      { id: 'IMG_20250301_140746', alt: 'In the truFM radio studio', cap: 'The morning her voice went out over the city.' },
      { id: 'IMG_20250301_140820', alt: 'The wider radio studio', cap: 'A quiet room, a loud arrival.' },
      { id: 'IMG_20250301_141702', alt: 'A group at the radio backdrop', cap: 'The ones who came to hear.' },
    ],
  },
  {
    n: '03', name: 'Kin & Cloth', form: 'diptych',
    blurb: 'The cloth is older than any of them, and it fits. Here belonging looks like laughter between women who share a face and a grandmother.',
    images: [
      { id: 'IMG_20250616_095223', alt: 'Laughing between two elders in Xhosa dress, winter light', cap: 'Three generations, one laugh between them.' },
      { id: 'IMG_20250927_114243', alt: 'Laughing under an umbrella in gold-banded cloth', cap: 'Rain on the day, sun in the company.' },
    ],
  },
  {
    n: '04', name: 'Roof of Africa', form: 'plate-strip',
    blurb: 'Up where the air thins and the land forgets your name, she wraps the blanket tighter and stays. Small against the mountain, and unbothered by it.',
    images: [
      { id: 'IMG_20250424_100200', alt: 'In a blanket coat, gazing over Sani Pass', cap: 'She let the mountain be bigger, and stayed anyway.' },
      { id: 'nanda-with-a-donkey-or-horse', alt: 'A horse and a glass of wine before a waterfall', cap: 'A horse, a glass, the edge of the world.' },
      { id: 'IMG_20250424_095823', alt: 'Crouched on the rocky summit', cap: 'At the top of the country, catching her breath.' },
      { id: 'IMG_20250424_100052', alt: 'By the Highest Pub in Africa sign, 2874m', cap: 'Two thousand metres closer to the sky.' },
      { id: 'IMG_20250425_142112', alt: 'Holding a horse by the reins on a green plateau', cap: 'Holding the reins like she was born to.' },
    ],
  },
  {
    n: '05', name: 'Cathedral of Trees', form: 'triptych-tall',
    blurb: 'She lets the forest be bigger than her — head tipped back, breath held. The particular reverence of a woman who knows she is one green thing among many.',
    images: [
      { id: 'IMG_20250928_110323', alt: 'Looking up into a towering indigenous canopy', cap: 'A whole cathedral, and no need to speak.' },
      { id: 'IMG_20250928_110308', alt: 'A small figure among giant trees', cap: 'Small on purpose. Humbled gladly.' },
      { id: 'IMG_20250322_132141', alt: 'Walking a dappled forest path', cap: 'The path that only asks you to keep going.' },
    ],
  },
  {
    n: '06', name: 'Bougainvillea', form: 'triptych',
    blurb: 'An hour so golden it feels invented. A bloom behind the ear, eyes lowered, the light doing what light does to a woman who isn’t looking for it.',
    images: [
      { id: 'IMG_20241107_161910', alt: 'Back to a wall of magenta blossom', cap: 'Turned toward the flowers, away from the fuss.' },
      { id: 'IMG_20241107_161914', alt: 'Profile with a pink bloom in the curls', cap: 'A flower for a crown, worn like nothing.' },
      { id: 'IMG_20241107_161928', alt: 'Profile against a blue sky, flower in the hair', cap: 'Eyes down, whole face full of light.' },
    ],
  },
  {
    n: '07', name: 'Garden of Bloom & Print', form: 'mosaic',
    blurb: 'Turn the colour all the way up. Joy with nowhere to be — print and petal and a dress mid-spin, a woman laughing before anyone asked her to.',
    images: [
      { id: 'IMG_20250101_163512', alt: 'Laughing under a green arbor in African print', cap: 'The laugh that gives the whole day away.' },
      { id: 'IMG_20251203_131034', alt: 'Barefoot, mid-dance in red', cap: 'Barefoot, mid-spin, answering to no music but her own.' },
      { id: 'IMG_20241208_130704', alt: 'Red roses and a white swan planter under big clouds', cap: 'Roses, a swan, a sky doing too much.' },
      { id: 'IMG_20241208_125820', alt: 'Red halter framed by golden-cane palm', cap: 'Framed by the garden like it planned her.' },
      { id: 'IMG_20250101_163515', alt: 'Poised in the arbor in a print co-ord', cap: 'Poised, then poised to move.' },
      { id: 'IMG_20251203_113828', alt: 'Red slip dress, animated on the lawn', cap: 'Mid-sentence, mid-delight.' },
      { id: 'IMG-20260620-WA0050', alt: 'Graduation — magenta dress and gown with a bouquet', cap: 'The day the years paid out.' },
    ],
  },
  {
    n: '08', name: 'Barefoot & Golden', form: 'mosaic',
    blurb: 'Golden hour, and no hurry in her at all. A hat tipped low, shoes abandoned, the whole garden leaning in to keep her company.',
    images: [
      { id: 'nanda-green-2', alt: 'Fedora profile, barefoot mid-step in a tropical garden', cap: 'Unhurried, and impossible not to watch.' },
      { id: 'nanda-green-3', alt: 'Hands to the hat brim, face half-hidden', cap: 'Half-hidden, twice as knowing.' },
      { id: 'IMG-20260620-WA0057', alt: 'Palm-shadow drawn across the face', cap: 'The palm drew a veil the sun could see through.' },
      { id: 'IMG_20241204_133358', alt: 'Pink top, leaning on a great pine', cap: 'Leaning on something older than the shot.' },
      { id: 'IMG-20260620-WA0055', alt: 'Black ruffle dress by a white brick wall', cap: 'Stillness that isn’t waiting for anything.' },
      { id: 'IMG_20240207_141811', alt: 'A geometric crown of braids seen from behind', cap: 'The crown she grew herself.' },
    ],
  },
  {
    n: '09', name: 'Forest Cabin', form: 'triptych',
    blurb: 'A slow green afternoon that asks nothing of her. Skin and shade and a glass sweating in the heat — leisure as a form of self-possession.',
    images: [
      { id: 'IMG_20250926_163119', alt: 'Centred in a sunlit forest clearing', cap: 'The clearing made a stage of itself.' },
      { id: 'IMG_20250926_161824', alt: 'A slow sip on a jungle deck', cap: 'Nowhere to be, and in no rush to leave it.' },
      { id: 'IMG_20250926_162510', alt: 'Seated small in the veranda architecture', cap: 'Small in the green, large in the calm.' },
    ],
  },
  {
    n: '10', name: 'The House of Elegance', form: 'stacked',
    blurb: 'Marble underfoot, gold overhead, a staircase built for exactly this descent. When she dresses for the evening, the architecture agrees to match.',
    images: [
      { id: 'IMG-20260620-WA0048', alt: 'A commanding pose, hand on the staircase rail', cap: 'The stairs were only ever waiting for her.' },
      { id: 'IMG-20260620-WA0043', alt: 'Chin lifted beneath a glowing gold orb', cap: 'Chin up, under a sun made of brass.' },
      { id: 'IMG-20260620-WA0061', alt: 'The lilac dress poised up a red-carpet spiral', cap: 'A spiral, and her at the centre of its argument.' },
      { id: 'IMG_20260220_165913', alt: 'Pinstripe in the grand hotel lobby', cap: 'Marble that finally met its match.' },
      { id: 'IMG-20260620-WA0041', alt: 'Seated on the stairs by a glass wall, pensive', cap: 'The pause between one entrance and the next.' },
    ],
  },
  {
    n: '11', name: 'The Maker’s Hours', form: 'single',
    blurb: 'No audience, no gown — just the work. A screen’s glow, a notebook, the world spread out before her while she quietly makes it.',
    marginalia: 'Between the ceremony and the syntax, this: an ordinary morning, and a woman building the thing you’ll later call effortless.',
    images: [
      { id: 'IMG_20260102_163300', alt: 'A laptop open by a garden swing, long shadows', cap: 'The office is a garden when you build it yourself.' },
      { id: 'nanda-writing-poetry', alt: 'A notebook among a drum kit and a red guitar', cap: 'Poems written where the music lives.' },
    ],
  },
  {
    n: '12', name: 'The Sea Remembers', form: 'filmstrip',
    blurb: 'She keeps turning her back to the camera and facing the water instead. Not loneliness — devotion. To the horizon, to herself, to whatever the sea is keeping.',
    images: [
      { id: 'IMG_20250614_171644', alt: 'On a sea wall at pastel dusk', cap: 'The hour the sea turns the colour of a bruise healing.' },
      { id: 'IMG_20241117_184647_1', alt: 'Running into a golden sunset', cap: 'Running toward the last of the light.' },
      { id: 'IMG-20210811-WA0146', alt: 'Beach profile with sculptural box braids', cap: 'Sun on the braids, salt in the air.' },
      { id: 'IMG_20231227_131241', alt: 'A clifftop, back to a grey breaking sea', cap: 'Facing the weather, not the lens.' },
      { id: 'IMG_20241117_184943', alt: 'Full length at dusk in a bucket hat', cap: 'Hands in pockets, evening in no hurry.' },
      { id: 'IMG_20251018_141832', alt: 'Back of the head to a moody grey sea', cap: 'Whatever the water knows, she’s listening.' },
      { id: 'IMG-20260620-WA0073', alt: 'A grassy cliff over the ocean', cap: 'The edge, and no fear of it.' },
      { id: 'IMG_20251018_140416', alt: 'Burnt-orange fur and a printed turban on the coast', cap: 'Dressed like weather, walking the coast.' },
    ],
  },
  {
    n: '13', name: 'Intimate Frames', form: 'oval-veiled',
    blurb: 'The register kept for no one — a mirror, a red lip, the private confidence of a woman alone and entirely at home in it.',
    images: [
      { id: 'IMG_20251007_140324', alt: 'A boudoir mirror with pool light through the window', cap: 'Alone, and in excellent company.' },
      { id: 'IMG-20260620-WA0047', alt: 'A gilt mirror and a wicker peacock chair in golden light', cap: 'Gold on gold, and her the warmest thing.' },
      { id: 'Snapchat-1836803243', alt: 'Burnt-orange fur and a leopard headwrap', cap: 'High style, for an audience of one.' },
      { id: 'Snapchat-666021868', alt: 'Black satin, a red lip, a direct gaze', cap: 'A look that doesn’t ask permission.' },
    ],
  },
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState<Img | null>(null);
  const [veilLifted, setVeilLifted] = useState(false);
  const open = (img: Img) => setLightbox(img);

  return (
    <main className="min-h-screen bg-[#0A1128] text-[#F5F0E8]">
      <div className="fixed inset-0 pointer-events-none opacity-[0.15] z-0" style={{ backgroundImage: GRAIN }} />
      <div className="pointer-events-none fixed -top-40 left-1/2 -translate-x-1/2 h-[520px] w-[520px] rounded-full bg-[#C9943A]/10 blur-3xl" />

      {/* ── OPENER ── */}
      <section className="relative z-10 px-6 pt-36 pb-16 text-center">
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="font-mono text-xs tracking-[0.35em] uppercase text-[#C9943A] mb-5">
          A body of work, in chapters
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.05 }}
          className="font-display text-6xl md:text-8xl font-bold italic leading-[0.9] mb-7">
          The Gallery
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, delay: 0.15 }}
          className="mx-auto max-w-2xl text-white/60 text-lg leading-relaxed font-light">
          A decade of a woman photographed the way she lives — and read the way she’d want to be read.
          Not a folder of pictures. A table of contents for a life.
        </motion.p>
        <div className="mx-auto mt-10 h-px w-16 bg-[#C9943A]/50" />
      </section>

      {/* ── FAMILIES ── */}
      <div className="relative z-10 pb-10">
        {FAMILIES.map((fam) => (
          <FamilySection key={fam.n} fam={fam} open={open} veilLifted={veilLifted} setVeilLifted={setVeilLifted} />
        ))}
      </div>

      {/* ── CLOSE ── */}
      <section className="relative z-10 px-6 pb-28 pt-10 text-center">
        <p className="mx-auto mb-9 max-w-2xl font-display text-3xl md:text-4xl italic leading-snug text-white/90">
          Words, colour, rhythm and culture — all of it from the same hand.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link href="/poetry/collection" className="rounded-full bg-[#C1292E] px-8 py-4 font-semibold text-white transition-all hover:scale-105">
            Read the poetry
          </Link>
          <Link href="/roots" className="rounded-full border border-white/25 px-8 py-4 font-semibold text-white transition-all hover:border-[#C9943A] hover:text-[#C9943A]">
            Where she comes from →
          </Link>
        </div>
      </section>

      {/* ── LIGHTBOX ── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[100] flex cursor-zoom-out items-center justify-center bg-black/92 p-4 md:p-10"
          >
            <motion.figure
              initial={{ scale: 0.94, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.25 }} className="relative max-h-[88vh] w-full max-w-4xl" onClick={(e) => e.stopPropagation()}
            >
              <CldImage src={P(lightbox.id)} alt={lightbox.alt} width={1400} height={1800}
                className="mx-auto h-auto max-h-[82vh] w-auto object-contain" />
              <figcaption className="mt-3 text-center font-display text-lg italic text-white/85">{lightbox.cap}</figcaption>
              <button onClick={() => setLightbox(null)} aria-label="Close"
                className="absolute -top-2 right-0 text-2xl text-white/70 hover:text-white md:-top-9 md:-right-9">✕</button>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

// ── family section ────────────────────────────────────────────────────────────
function FamilySection({
  fam, open, veilLifted, setVeilLifted,
}: {
  fam: Family; open: (i: Img) => void; veilLifted: boolean; setVeilLifted: (v: boolean) => void;
}) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
      <header className="mb-9 max-w-3xl">
        <span className="font-mono text-[11px] tracking-[0.3em] text-[#C9943A]">FAMILY {fam.n}</span>
        <h2 className="mt-2 font-display text-4xl md:text-5xl font-bold">{fam.name}</h2>
        <p className="mt-4 font-display text-xl md:text-2xl italic text-white/70 leading-relaxed">{fam.blurb}</p>
      </header>
      <FamilyBody fam={fam} open={open} veilLifted={veilLifted} setVeilLifted={setVeilLifted} />
    </section>
  );
}

function Frame({ img, open, ratio = 'aspect-[3/4]', className = '', round = false }:
  { img: Img; open: (i: Img) => void; ratio?: string; className?: string; round?: boolean }) {
  return (
    <button onClick={() => open(img)}
      className={`group relative ${ratio} w-full overflow-hidden ${round ? 'rounded-full ring-2 ring-[#C9943A]/30' : 'rounded-lg'} ${className}`}>
      <CldImage src={P(img.id)} alt={img.alt} fill sizes="(max-width:768px) 100vw, 33vw"
        className="object-cover transition-transform duration-700 group-hover:scale-[1.06]" />
      <span className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-[#0A1128]/70 via-transparent to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="font-display text-sm italic text-white/90">{img.cap}</span>
      </span>
    </button>
  );
}

function FamilyBody({
  fam, open, veilLifted, setVeilLifted,
}: {
  fam: Family; open: (i: Img) => void; veilLifted: boolean; setVeilLifted: (v: boolean) => void;
}) {
  const im = fam.images;

  switch (fam.form) {
    case 'single':
      return (
        <div className="grid items-center gap-8 md:grid-cols-[1.3fr_1fr]">
          <Frame img={im[0]} open={open} ratio="aspect-[4/5]" />
          <div className="md:pl-4">
            {fam.marginalia && (
              <p className="border-l-2 border-[#C9943A]/50 pl-5 font-display text-2xl md:text-3xl italic leading-snug text-white/85">
                {fam.marginalia}
              </p>
            )}
            {im[1] && (
              <div className="mt-8 max-w-[240px]">
                <Frame img={im[1]} open={open} ratio="aspect-[3/4]" />
              </div>
            )}
          </div>
        </div>
      );

    case 'diptych':
      return (
        <div className="grid gap-5 md:grid-cols-2">
          {im.slice(0, 2).map((i) => <Frame key={i.id} img={i} open={open} ratio="aspect-[4/5]" />)}
        </div>
      );

    case 'triptych':
      return (
        <div className="grid gap-5 sm:grid-cols-3">
          {im.slice(0, 3).map((i) => <Frame key={i.id} img={i} open={open} ratio="aspect-[3/4]" />)}
        </div>
      );

    case 'triptych-tall':
      return (
        <div className="grid gap-5 sm:grid-cols-3">
          {im.slice(0, 3).map((i) => <Frame key={i.id} img={i} open={open} ratio="aspect-[2/3]" />)}
        </div>
      );

    case 'filmstrip':
      return (
        <div className="-mx-6 flex snap-x gap-4 overflow-x-auto px-6 pb-3" style={{ scrollbarWidth: 'none' }}>
          {im.map((i) => (
            <div key={i.id} className="w-[260px] shrink-0 snap-start md:w-[300px]">
              <Frame img={i} open={open} ratio="aspect-[3/4]" />
            </div>
          ))}
        </div>
      );

    case 'plate-strip':
      return (
        <div className="space-y-5">
          <Frame img={im[0]} open={open} ratio="aspect-[16/10]" />
          <div className="-mx-6 flex gap-4 overflow-x-auto px-6 pb-3" style={{ scrollbarWidth: 'none' }}>
            {im.slice(1).map((i) => (
              <div key={i.id} className="w-[220px] shrink-0 md:w-[260px]">
                <Frame img={i} open={open} ratio="aspect-[3/4]" />
              </div>
            ))}
          </div>
        </div>
      );

    case 'mosaic':
      return (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {im.map((i, idx) => (
            <Frame key={i.id} img={i} open={open}
              ratio={idx === 0 ? 'aspect-[16/11]' : 'aspect-[3/4]'}
              className={idx === 0 ? 'col-span-2' : ''} />
          ))}
        </div>
      );

    case 'stacked':
      return (
        <div className="space-y-6">
          {im.map((i, idx) => (
            <div key={i.id} className={idx % 2 === 0 ? 'md:mr-24' : 'md:ml-24'}>
              <Frame img={i} open={open} ratio="aspect-[16/11]" />
            </div>
          ))}
        </div>
      );

    case 'oval-veiled':
      return (
        <div className="relative">
          <div className={`grid grid-cols-2 gap-6 transition-all duration-700 sm:grid-cols-4 ${veilLifted ? '' : 'pointer-events-none blur-xl select-none'}`}>
            {im.map((i) => (
              <div key={i.id} className="flex flex-col items-center">
                <Frame img={i} open={open} ratio="aspect-square" round />
              </div>
            ))}
          </div>
          {!veilLifted && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <p className="mb-4 max-w-md font-display text-xl italic text-white/80">
                A private register — intimate self-portraits. Lift the veil to look closer.
              </p>
              <button onClick={() => setVeilLifted(true)}
                className="rounded-full border border-[#C9943A]/60 px-7 py-3 text-sm font-medium text-[#C9943A] transition-all hover:bg-[#C9943A] hover:text-[#0A1128]">
                Lift the veil
              </button>
            </div>
          )}
        </div>
      );

    default:
      return null;
  }
}
