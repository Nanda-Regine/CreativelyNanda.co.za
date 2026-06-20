'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

// ─── Fade-up helper ────────────────────────────────────────────────────────────
function FadeUp({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

// ─── Lineage cards ──────────────────────────────────────────────────────────────
const LINEAGE = [
  {
    bg: '/assets/art/jewel.jpg',
    accent: '#C9943A',
    icon: '🦗',
    title: 'Nseenene Clan · Buganda Kingdom',
    subtitle: 'Uganda · Nine Generations',
    body:
      'My father is Timothy Nkata Kabali-Kagwa. His father was Frobisher. Before him: Temuteo Mwebe Kaggwa, Mafumu, Muwemba, Lubinga, Sekalongo, Kanyala. Nine generations I can name. We are of the Nseenene Clan — the grasshopper — one of 52 clans of the Buganda Kingdom. Our role in the palace was to milk the Kabaka’s cows. My great-grandmother was Nandawula. A doctor of great means. I carry her name.',
    details: [
      ['Totem', 'Nseenene (Grasshopper)'],
      ['Clan head', 'Omutaka Kalibbala'],
      ['Ancestral seat', 'Nsiisi, Busujju County'],
      ['Motto', '“Ggwe Mpagi, ggwe Luwaga”'],
    ],
  },
  {
    bg: '/assets/art/bloom.jpg',
    accent: '#C1292E',
    icon: '👑',
    title: 'AmaTshawe · Xhosa Nation',
    subtitle: 'Eastern Cape · Oldest Royal House in South Africa',
    body:
      'On my mother’s side flows AmaTshawe — the founding dynasty of the Xhosa nation, established before 1600 CE. Tshawe defeated his brother Cirha to unify the Xhosa clans. Every Xhosa king descends from him. His kingdom stretched from the Mbhashe River to the Gamtoos River. The royal bloodline: Tshawe → Ngcwangu → Sikhomo → Togu → Ngconde → Tshiwo → Phalo → to Hintsa, murdered by British colonial forces in 1835.',
    details: [
      ['Nation', 'amaXhosa'],
      ['Isiduko', 'AmaTshawe'],
      ['Territory', 'Eastern Cape'],
    ],
  },
  {
    bg: '/assets/art/navy-floral.jpg',
    accent: '#7A9E7E',
    icon: '🏔',
    title: 'AmaHlubi · The Ancient Nation',
    subtitle: 'Traced to Kenya · 900–1300 CE',
    body:
      'I am also amaHlubi — one of the oldest Bantu nations on the continent, traced to the Samburu people of present-day Kenya. Settled in the Drakensberg mountains, they were so formidable that Shaka’s amaZulu kept peace treaties with them. The Mfecane shattered the nation like glass. The fragments landed in the Eastern Cape. My people were among them — absorbed into Xhosa language and custom, but never fully erased. The amaHlubi do not disappear. They migrate. They endure. They rebuild.',
    details: [
      ['Language', 'IsiHlubi (Tekela, endangered)'],
      ['Dynasty founded', '~1300 CE (King Chibi)'],
      ['Lineage note', 'Moshoeshoe I had a Hlubi great-grandfather'],
    ],
  },
  {
    bg: '/assets/art/water.jpg',
    accent: '#C9943A',
    icon: '⚡',
    title: 'Msimango · oThabizolo',
    subtitle: 'AmaHlubi Royal Branch · Drakensberg',
    body:
      'And I am Msimango. oThabizolo. The praise name means: the ones who were happy the day before. My ancestor Msimango, son of King Busobengwe of the amaHlubi, celebrated the night before the throne was to be named — certain of being chosen. His father named Mthimkhulu I instead. Msimango built AmaShwabada from that moment. He became the Establisher. The name Msimango itself means: to confirm, to strengthen, to make firm. I understand this story. I build before the world confirms it is possible. I celebrate what I am building. And then I build it anyway.',
    praises:
      'Msimango · Thabizolo · Nonkosi · Mlotshwa · Ngelengele · Wena owehla ngesilulu abafokazane behla ngezinyawo',
    praisesTranslation: 'You descended by ladder while the commoners descended on foot',
  },
];

// ─── Cultural photography ───────────────────────────────────────────────────────
const LANDS = [
  { src: '/assets/IMG-20260620-WA0016.jpg', caption: 'Drakensberg, Eastern Cape', span: 'md:col-span-2' },
  { src: '/assets/IMG-20260620-WA0011.jpg', caption: 'East London', span: '' },
  { src: '/assets/IMG-20260620-WA0014.jpg', caption: 'Homecoming', span: '' },
];

// ─── Creative timeline ──────────────────────────────────────────────────────────
const TIMELINE = [
  { year: 'October 2021', title: 'Inside Her Roses', body: 'My debut poetry collection is published — womanhood, longing, healing and becoming, bound between two covers.' },
  { year: '2021–2023', title: 'On the stage', body: 'Spoken-word nights and live performances across the Eastern Cape — poetry beside drums and keys, in Xhosa beadwork.' },
  { year: '2022–2024', title: 'On the air', body: 'Featured on Tru FM and Madiba Radio — reading, speaking, and carrying the work to new ears.' },
  { year: 'Ongoing', title: 'Colour & culture', body: 'Painting, music, and the slow work of honouring lineage — the Sotho hat at the mountain, the grain in the bowl, the roses in the poem.' },
];

export default function About() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#E8DCC4] via-[#F5EFE6] to-[#E8DCC4] text-[#0A1128]">

      {/* Grain texture */}
      <div className="fixed inset-0 pointer-events-none opacity-30 z-0" style={{ backgroundImage: GRAIN }} />

      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <section className="relative z-10 bg-[#0A1128] pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-30" style={{ backgroundImage: GRAIN }} />
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <FadeUp>
              <p className="font-display text-xs tracking-[0.3em] uppercase text-[#C1292E] mb-6">
                Poet · Creative · Culture-Keeper
              </p>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-[0.95] mb-6">
                I didn&apos;t start<br />
                from zero.<br />
                I started from<br />
                <span className="text-[#C1292E]">lineage.</span>
              </h1>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="font-display text-xl italic text-[#C1292E] leading-relaxed max-w-xl">
                Four nations across two continents. A published collection. A voice that carries.
              </p>
            </FadeUp>
          </div>

          <FadeUp delay={0.3} className="hidden md:flex justify-center">
            <div className="relative w-80 h-96">
              <Image
                src="/assets/IMG-20260620-WA0025.jpg"
                alt="Nandawula Regine Kabali-Kagwa in a traditional red dress"
                fill
                className="object-cover ring-2 ring-[#C1292E]/20"
                style={{ borderRadius: '32px 8px 32px 8px' }}
                priority
              />
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── ANCESTRAL OPERATING SYSTEM ───────────────────────────────────────── */}
      <section className="relative z-10 py-20 px-6 bg-[#0A1128] text-[#F5F0E8]">
        <div className="absolute inset-0 pointer-events-none opacity-25" style={{ backgroundImage: GRAIN }} />
        <div className="max-w-5xl mx-auto relative z-10">
          <FadeUp>
            <p className="font-display text-xs tracking-[0.3em] uppercase text-[#C9943A] mb-4">
              Ancestral Operating System
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[#F5F0E8] mb-6 leading-tight">
              Four nations.<br />Run in parallel.
            </h2>
            <p className="text-[#F5F0E8]/70 text-lg leading-relaxed max-w-2xl mb-12">
              Before the poems, before the stage, before the company — there were the clans.
              Each one an operating system I carry. Understanding where you come from changes
              how you make.
            </p>
          </FadeUp>

          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {LINEAGE.map((c, i) => (
              <FadeUp key={c.title} delay={i * 0.08}>
                <div className="relative h-full rounded-2xl overflow-hidden border border-[#C9943A]/25" style={{ borderRadius: '32px 12px 32px 12px' }}>
                  {/* Texture background */}
                  <Image src={c.bg} alt="" fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />
                  <div className="absolute inset-0 bg-[#0A1128]/88" />
                  <div className="relative z-10 p-8">
                    <div className="text-4xl mb-4">{c.icon}</div>
                    <h3 className="font-display text-xl font-bold text-[#F5F0E8] mb-1">{c.title}</h3>
                    <p className="text-xs tracking-widest uppercase mb-4" style={{ color: c.accent }}>{c.subtitle}</p>
                    <p className="text-[#F5F0E8]/75 leading-relaxed text-sm mb-5">{c.body}</p>

                    {c.details && (
                      <div className="space-y-1.5 border-t border-white/10 pt-4">
                        {c.details.map(([k, v]) => (
                          <div key={k} className="flex gap-2 text-xs">
                            <span className="font-mono uppercase tracking-wider shrink-0 w-28" style={{ color: c.accent }}>{k}</span>
                            <span className="text-[#F5F0E8]/70">{v}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {c.praises && (
                      <div className="border-t border-white/10 pt-4">
                        <p className="font-display italic text-[#F5F0E8]/80 text-sm leading-relaxed mb-2">{c.praises}</p>
                        <p className="font-mono text-[10px] text-[#F5F0E8]/40 leading-relaxed">{c.praisesTranslation}</p>
                      </div>
                    )}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* The full ancestral passage */}
          <FadeUp>
            <div className="max-w-[680px] mx-auto text-center">
              <div className="w-12 h-px bg-[#C9943A]/50 mx-auto mb-8" />
              <p className="font-display text-base md:text-[17px] leading-[1.9] text-[#F5F0E8]/90 italic">
                My father is Timothy Nkata Kabali-Kagwa. His father was Frobisher. Before him,
                Temuteo Mwebe Kaggwa. Before him, Mafumu. Before him, Muwemba, Lubinga, Sekalongo,
                Kanyala. Nine generations I can name. We are of the Nseenene Clan — the grasshopper —
                of the Buganda Kingdom. Our role in the palace was to milk the Kabaka&apos;s cows.
                My great-grandmother was Nandawula. A wealthy doctor. I carry her name.
                <br /><br />
                On my mother&apos;s side flows AmaTshawe — the oldest royal house in South Africa.
                I am amaHlubi, traced to Kenya, settled in the Drakensberg, scattered by the Mfecane
                and rebuilt — as amaHlubi always have been.
                <br /><br />
                And I am Msimango. oThabizolo. The ones who were happy the day before. My ancestor
                celebrated before the crown was named and woke to find he was not chosen. He built
                something new from that moment.
                <br /><br />
                I make my art in East London, South Africa.
                I celebrate what I am building before the world confirms it.
                <br /><br />
                <span className="text-[#C9943A] not-italic">
                  The ancestral wealth never left spiritually.
                  Now we bring it into the physical — one creation at a time.
                </span>
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── THE LANDS THAT MADE ME ───────────────────────────────────────────── */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#B8860B] mb-3">Across Two Continents</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0A1128] mb-10">The lands that made me.</h2>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {LANDS.map((l, i) => (
              <FadeUp key={l.src} delay={i * 0.08} className={l.span}>
                <div className="relative w-full h-72 md:h-80 rounded overflow-hidden">
                  <Image src={l.src} alt={l.caption} fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />
                  <span className="absolute bottom-3 left-3 font-sans text-[11px] italic text-white/90 drop-shadow">{l.caption}</span>
                </div>
              </FadeUp>
            ))}
          </div>
          <FadeUp>
            <p className="text-[#4A3728] text-[15px] leading-[1.8] max-w-2xl">
              The Sotho straw hat at the Drakensberg. The piano in East London. The family gathering.
              These are not separate stories. They are the same story in different costumes — the story
              of what it means to come from somewhere specific and make for the whole continent.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── THE STORY ────────────────────────────────────────────────────────── */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <FadeUp>
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-[#B8860B] mb-4">The Story</p>
            <h2 className="font-display text-4xl font-bold text-[#0A1128] mb-6">
              A poet who<br />learned to build.
            </h2>
            <div className="space-y-5 text-[#4A3728] leading-relaxed">
              <p>
                I published <em>Inside Her Roses</em> in 2021 — a collection of poems on womanhood,
                longing and healing. I performed it on stages and read it on radio. Before that I
                studied Business Management at Nelson Mandela University while working, and managed
                a restaurant in Gqeberha.
              </p>
              <p>
                The poetry taught me how to speak to humans. The lineage taught me where I stand.
                When I sat down to teach myself code, it turned out to be one more language for the
                same instinct: to take what is felt and make it real, and beautiful, and useful.
              </p>
              <p>
                That building work — the apps, the AI engineering, the company — lives under
                Mirembe Muse. This place is for the rest of me: the poems, the performances, the
                colour and the culture.
              </p>
            </div>
            <div className="mt-7">
              <a
                href="https://mirembemuse.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all hover:scale-105"
                style={{ background: '#C9943A', color: '#0A1128' }}
              >
                See the building work — Mirembe Muse ↗
              </a>
            </div>
          </FadeUp>

          <FadeUp delay={0.15}>
            <div className="space-y-6">
              <div className="relative w-full h-72 rounded-[24px] overflow-hidden">
                <Image src="/assets/IMG-20260620-WA0011.jpg" alt="Nanda at the piano" fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />
              </div>
              <div className="p-8 bg-[#0A1128] text-white rounded-[24px]">
                <p className="font-display text-xs tracking-[0.25em] uppercase text-[#C9943A] mb-3">Contact</p>
                <a href="mailto:hello@creativelynanda.co.za" className="text-white hover:text-[#C1292E] transition-colors font-medium">
                  hello@creativelynanda.co.za
                </a>
                <p className="text-white/50 text-xs mt-2">East London, Eastern Cape, South Africa</p>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── CREATIVE TIMELINE ────────────────────────────────────────────────── */}
      <section className="relative z-10 py-20 px-6 max-w-5xl mx-auto">
        <FadeUp>
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-[#B8860B] mb-4">The Creative Journey</p>
          <h2 className="font-display text-4xl font-bold text-[#0A1128] mb-16">How it unfolded.</h2>
        </FadeUp>
        <div className="relative">
          <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-[#0A1128]/10" />
          <div className="space-y-10">
            {TIMELINE.map((item, i) => (
              <FadeUp key={item.year} delay={i * 0.05}>
                <div className="flex gap-8">
                  <div className="shrink-0 mt-1.5">
                    <div className="w-6 h-6 rounded-full bg-[#C1292E] ring-4 ring-[#F5EFE6] relative z-10" />
                  </div>
                  <div className="pb-2 rounded-[24px] p-6 flex-1 bg-white/60 backdrop-blur-sm border border-[#0A1128]/10">
                    <span className="font-display text-sm font-bold tracking-widest uppercase text-[#B8860B]">{item.year}</span>
                    <h3 className="font-display text-xl font-bold mb-2 text-[#0A1128]">{item.title}</h3>
                    <p className="leading-relaxed text-sm text-[#4A3728] max-w-xl">{item.body}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ───────────────────────────────────────────────────────── */}
      <section className="relative z-10 py-24 px-6 bg-[#0A1128] text-[#F5F0E8]">
        <div className="absolute inset-0 pointer-events-none opacity-25" style={{ backgroundImage: GRAIN }} />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <FadeUp>
            <p className="font-display text-xs tracking-[0.3em] uppercase text-[#C9943A] mb-4">The Invitation</p>
            <h2 className="font-display text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Read the poetry<br /><span className="text-[#C1292E]">this lineage produced.</span>
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              <Link href="/poetry" className="px-8 py-4 bg-[#C1292E] text-white rounded-full font-semibold hover:bg-[#C1292E]/90 transition-all hover:scale-105">
                Inside Her Roses
              </Link>
              <Link href="/gallery" className="px-8 py-4 border border-[#F5F0E8]/20 text-[#F5F0E8] rounded-full font-semibold hover:border-[#C1292E] hover:text-[#C1292E] transition-all">
                Enter the gallery
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </main>
  );
}
