'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { CldImage } from 'next-cloudinary';
import { ArrowLeft, ArrowUpRight, Terminal } from 'lucide-react';

const ease = [0.22, 1, 0.36, 1] as const;

const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

// Cloudinary public_ids.
const P = (id: string) => `creativelynanda/nanda-portraits/${id}`;
const IMG = {
  swing: P('IMG_20260102_163300'),      // laptop open by a garden swing, long shadows — HERO
  drums: P('nanda-writing-poetry'),     // notebook cross-legged among a drum kit and red guitar
  desk: P('IMG_20250607_100134'),       // coding at a home desk, orange headwrap, from behind
  lawn: P('IMG_20260102_163239'),       // camp chair on the lawn, working under a palm
  screen: 'creativelynanda/professional/nanda-coding', // in-context engineer at the screen
};

// Colours for the hand-highlighted code-poem (no highlighter library needed).
const c = {
  comment: '#7A9E7E',
  keyword: '#C4566A',
  string: '#C9943A',
  fn: '#7FD4E6',
  plain: 'rgba(245,240,232,0.9)',
};

// The code-poem, rendered from tokens so no character fights the JSX parser.
type Tok = { t: string; c?: string };
const CODE_POEM: Tok[][] = [
  [{ t: '/* Inside Her Roses — a poem, compiled */', c: c.comment }],
  [],
  [{ t: 'const ', c: c.keyword }, { t: 'her = ' }, { t: 'new ', c: c.keyword }, { t: 'Woman', c: c.fn }, { t: '({' }],
  [{ t: '  from: ' }, { t: "'KuGompo City'", c: c.string }, { t: ',' }],
  [{ t: '  roots: [' }, { t: "'Buganda'", c: c.string }, { t: ', ' }, { t: "'Xhosa'", c: c.string }, { t: ', ' }, { t: "'Hlubi'", c: c.string }, { t: '],' }],
  [{ t: '});' }],
  [],
  [{ t: 'export default function ', c: c.keyword }, { t: 'bloom', c: c.fn }, { t: '() {' }],
  [{ t: '  // ubuntu: I am because we are', c: c.comment }],
  [{ t: '  return ', c: c.keyword }, { t: 'her.tongues.' }, { t: 'reduce', c: c.fn }, { t: '(' }],
  [{ t: '    (world, tongue) => world.' }, { t: 'becomeMore', c: c.fn }, { t: '(tongue),' }],
  [{ t: '    silence,' }],
  [{ t: '  );' }],
  [{ t: '}' }],
];

// "git log of a becoming" — commits written as verse.
const COMMITS: [string, string][] = [
  ['a1b0om', 'feat: learned to speak in two tongues'],
  ['r0se55', 'fix: stopped waiting for permission to bloom'],
  ['ub0ntu', 'refactor: I am because we are'],
  ['n1ght7', 'perf: wrote the poem before the world confirmed it'],
  ['bu1ld1', 'ship: eight apps, one year, one woman'],
];

// The soul layer — the range beneath the code (the details live at Mirembe).
const RANGE = [
  {
    k: 'Intelligence, not gimmick',
    v: 'Retrieval-augmented AI over a living corpus. Multi-agent systems that share one mind. Crisis detection that routes a frightened student to real, human help.',
  },
  {
    k: 'Systems that hold weight',
    v: 'Row-level security for true multi-tenancy. Offline-first PWAs built for load-shedding. Soft-deletes, audit trails, and TypeScript strict enough that the compiler never blinks.',
  },
  {
    k: 'Designed, not decorated',
    v: 'Colour systems tuned per context, 44px targets for a budget Android, motion that respects a tired thumb. The interface is the argument.',
  },
  {
    k: 'Built for here',
    v: 'Eleven South African languages. PayFast in rand. WhatsApp-native flows. Technology that speaks the language of the person holding the phone.',
  },
];

function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Alternating image / prose chapter.
function Chapter({
  img, alt, kicker, title, side = 'left', accent = '#C9943A', focal = 'center', children,
}: {
  img: string; alt: string; kicker: string; title: string;
  side?: 'left' | 'right'; accent?: string; focal?: string; children: React.ReactNode;
}) {
  const image = (
    <FadeUp className={side === 'right' ? 'md:order-2' : ''}>
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl ring-1 ring-[#C9943A]/25">
        <CldImage src={img} alt={alt} fill sizes="(max-width:768px) 100vw, 45vw"
          className="object-cover" style={{ objectPosition: focal }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(10,17,40,0.55), rgba(10,17,40,0) 55%)' }} />
      </div>
    </FadeUp>
  );
  const prose = (
    <FadeUp delay={0.1} className={side === 'right' ? 'md:order-1' : ''}>
      <p className="font-mono text-xs tracking-[0.3em] uppercase mb-4" style={{ color: accent }}>{kicker}</p>
      <h2 className="font-display text-3xl md:text-5xl font-bold italic leading-[1.05] mb-7 text-white">{title}</h2>
      <div className="space-y-5 text-white/75 leading-[1.85] md:text-lg font-light">{children}</div>
    </FadeUp>
  );
  return (
    <section className="relative px-6 py-20 md:py-28">
      <div className="absolute inset-0 pointer-events-none opacity-30" style={{ backgroundImage: GRAIN }} />
      <div className="relative z-10 mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2 md:gap-14">
        {image}
        {prose}
      </div>
    </section>
  );
}

export default function PoetWhoCodes() {
  return (
    <main className="min-h-screen bg-[#0A1128] text-[#F5F0E8]">

      {/* ═══ HERO — laptop by the garden swing ═══════════════════════════════════ */}
      <section className="relative -mt-20 h-[100dvh] min-h-[640px] w-full overflow-hidden">
        <CldImage
          src={IMG.swing}
          alt="Nanda's laptop open on a table by a garden swing, long afternoon shadows across the lawn"
          fill priority sizes="100vw" className="object-cover object-[center_35%]"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,17,40,0.96) 0%, rgba(10,17,40,0.55) 40%, rgba(10,17,40,0.2) 68%, rgba(10,17,40,0.35) 100%)' }} />
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: GRAIN }} />

        <div className="relative z-10 flex h-full max-w-5xl mx-auto flex-col justify-end px-6 pb-24">
          <FadeUp>
            <Link href="/poetry/collection" className="mb-8 inline-flex items-center gap-2 text-sm text-white/55 transition-colors hover:text-[#C1292E]">
              <ArrowLeft className="h-4 w-4" /> Back to the garden
            </Link>
          </FadeUp>
          <FadeUp delay={0.05}>
            <p className="mb-6 font-mono text-[11px] tracking-[0.35em] uppercase text-[#C9943A]">
              Inside Her Roses · The Poet Who Codes
            </p>
          </FadeUp>
          <FadeUp delay={0.12}>
            <h1 className="font-display font-bold italic leading-[0.94] text-white text-5xl sm:text-6xl md:text-8xl drop-shadow-[0_2px_20px_rgba(0,0,0,0.6)]">
              She learned to speak<br />in two tongues.
            </h1>
          </FadeUp>
          <FadeUp delay={0.22}>
            <p className="mt-7 max-w-2xl font-light text-lg leading-relaxed text-white/75">
              The language of longing, and the language of systems. Most people are told to choose.
              I refused. The same hands that write the poem write the program — both are the act of
              making meaning from symbols, and daring it to live.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ═══ THE TWO TONGUES — split ═════════════════════════════════════════════ */}
      <section className="relative px-6 py-20 md:py-24">
        <div className="absolute inset-0 pointer-events-none opacity-30" style={{ backgroundImage: GRAIN }} />
        <div className="relative z-10 mx-auto max-w-5xl">
          <FadeUp>
            <div className="mb-10 flex items-center gap-4">
              <div className="h-px w-14 bg-[#C9943A]" />
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#C9943A]">One mind, two grammars</span>
            </div>
          </FadeUp>
          <div className="grid gap-5 md:grid-cols-2">
            <FadeUp>
              <div className="h-full rounded-3xl border border-[#C9943A]/20 bg-white/[0.03] p-8">
                <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.28em] text-[#C4566A]">The language of longing</p>
                <p className="font-display text-xl leading-relaxed italic text-white/85 md:text-2xl">
                  Words are code for the soul.<br />
                  Poetry is the algorithm of feeling —<br />
                  a syntax the heart already knows<br />
                  before the mind can compile it.
                </p>
              </div>
            </FadeUp>
            <FadeUp delay={0.1}>
              <div className="h-full rounded-3xl border border-white/10 bg-[#080b1c]/80 p-8">
                <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.28em] text-[#7FD4E6]">The language of systems</p>
                <p className="font-mono text-sm leading-relaxed md:text-[15px]" style={{ color: c.plain }}>
                  <span style={{ color: c.comment }}>{'// a poem and a program are'}</span><br />
                  <span style={{ color: c.comment }}>{'// the same prayer, differently spelled'}</span><br />
                  <span style={{ color: c.keyword }}>while</span> (heart.dreaming) {'{'}<br />
                  &nbsp;&nbsp;heart.<span style={{ color: c.fn }}>write</span>(<span style={{ color: c.string }}>&apos;longing&apos;</span>);<br />
                  &nbsp;&nbsp;heart.<span style={{ color: c.fn }}>ship</span>(<span style={{ color: c.string }}>&apos;systems&apos;</span>);<br />
                  {'}'}
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ═══ CHAPTER I — the modest desk ═════════════════════════════════════════ */}
      <Chapter
        img={IMG.desk}
        alt="Nanda coding at a home desk in an orange headwrap, seen from behind, screen glowing"
        kicker="Chapter I · Self-taught"
        title="No bootcamp. A modest desk."
        focal="center"
      >
        <p>
          There was no bootcamp, no scholarship, no room full of people who looked like they belonged.
          There was a <span className="text-white">modest desk at home</span>, a headwrap against the
          afternoon, and the stubborn belief that a language could be learned the way any language is
          learned — by staying up late with it until it answers back.
        </p>
        <p>
          I taught myself the way I taught myself to write: reading everything, breaking things, listening
          for the moment the syntax stops fighting and starts <em>singing</em>. Nobody handed me permission.
          I compiled it myself.
        </p>
        <p className="text-white/90">
          Under my company, <span className="text-[#E4572E]">Mirembe Muse</span>, that desk became a studio —
          eight production apps in a single year, and real, paying clients across the continent.
        </p>
      </Chapter>

      {/* ═══ THE POEM, COMPILED — code-as-poetry moment ══════════════════════════ */}
      <section className="relative px-6 py-20 md:py-24">
        <div className="absolute inset-0 pointer-events-none opacity-25" style={{ backgroundImage: GRAIN }} />
        <div className="relative z-10 mx-auto max-w-3xl">
          <FadeUp>
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#080b1c]/90 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]">
              <div className="flex items-center gap-2 border-b border-white/10 px-6 py-3">
                <span className="h-3 w-3 rounded-full bg-[#C4566A]" />
                <span className="h-3 w-3 rounded-full bg-[#C9943A]" />
                <span className="h-3 w-3 rounded-full bg-[#7A9E7E]" />
                <span className="ml-3 font-mono text-xs text-white/40">inside-her-roses.ts</span>
              </div>
              <pre className="overflow-x-auto px-6 py-7 font-mono text-sm leading-[1.9] md:text-[15px]" style={{ color: c.plain }}>
                {CODE_POEM.map((line, i) => (
                  <div key={i}>
                    {line.length === 0
                      ? ' '
                      : line.map((tok, j) => (
                          <span key={j} style={tok.c ? { color: tok.c } : undefined}>{tok.t}</span>
                        ))}
                  </div>
                ))}
              </pre>
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="mt-6 text-center font-display text-lg italic text-white/55">It runs. It also rhymes.</p>
          </FadeUp>
        </div>
      </section>

      {/* ═══ CHAPTER II — the office is a garden ═════════════════════════════════ */}
      <Chapter
        img={IMG.lawn}
        alt="Nanda working from a camp chair on the lawn beneath a palm, laptop on her knees"
        kicker="Chapter II · Where the work happens"
        title="My office is often a garden."
        side="right"
        accent="#7FD4E6"
        focal="center"
      >
        <p>
          I do not build inside a glass tower. I build from a camp chair on the grass, under a palm, with
          the birds keeping their own version of uptime. The garden is not a break from the work — it is
          <span className="text-white"> where the work thinks clearest</span>.
        </p>
        <p>
          A poem needs air to arrive; so does an architecture. Between deploys I look up, and the same
          quiet that finishes a verse finishes a function. I have shipped features to a warm afternoon and
          named variables to birdsong.
        </p>
        <p className="text-white/90">
          The lawn, the laptop, the long shadow of a swing — this is the whole office. It has never needed
          to be anything grander.
        </p>
      </Chapter>

      {/* ═══ GIT LOG OF A BECOMING ═══════════════════════════════════════════════ */}
      <section className="relative px-6 py-16 md:py-20">
        <div className="absolute inset-0 pointer-events-none opacity-25" style={{ backgroundImage: GRAIN }} />
        <div className="relative z-10 mx-auto max-w-3xl">
          <FadeUp>
            <div className="mb-5 flex items-center gap-2 text-[#C9943A]">
              <Terminal className="h-4 w-4" />
              <span className="font-mono text-xs uppercase tracking-[0.28em]">git log — a becoming</span>
            </div>
          </FadeUp>
          <div className="space-y-2 rounded-2xl border border-white/10 bg-[#080b1c]/80 p-6 font-mono text-sm">
            {COMMITS.map(([sha, msg], i) => (
              <motion.p
                key={sha}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex gap-3"
              >
                <span style={{ color: c.string }}>{sha}</span>
                <span className="text-white/80">{msg}</span>
              </motion.p>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CHAPTER III — the third tongue: rhythm ══════════════════════════════ */}
      <Chapter
        img={IMG.drums}
        alt="Nanda writing poetry in a notebook, cross-legged among a drum kit and a red guitar"
        kicker="Chapter III · A third tongue"
        title="I write my poems among a drum kit."
        focal="center"
      >
        <p>
          Before the code and the verse, there was <span className="text-white">rhythm</span>. I fill
          notebooks cross-legged on the floor, a red guitar within reach, a drum kit at my back. The hands
          that keep time are the same ones that ship.
        </p>
        <p>
          Poetry taught me cadence; the drums taught me structure you can feel before you can name it; the
          code taught me that a thing is only true once it runs. Three tongues, one throat. A loop, a line,
          a bar — they are all just <em>timing</em>, and meaning arranged so it lands.
        </p>
      </Chapter>

      {/* ═══ THE SOUL LAYER — the range beneath the code ═════════════════════════ */}
      <section className="relative w-full overflow-hidden">
        <div className="relative h-[52vh] min-h-[360px] w-full">
          <CldImage
            src={IMG.screen}
            alt="Nanda in context as an engineer, focused at the screen, code reflected in her glasses"
            fill sizes="100vw" className="object-cover object-[center_30%]"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(10,17,40,0.55) 0%, rgba(10,17,40,0.8) 60%, #0A1128 100%)' }} />
          <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: GRAIN }} />
          <div className="absolute inset-0 flex items-end">
            <div className="mx-auto w-full max-w-4xl px-6 pb-10">
              <FadeUp>
                <div className="mb-6 flex items-center gap-4">
                  <div className="h-px w-14 bg-[#C9943A]" />
                  <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#C9943A]">Beneath the code</span>
                </div>
                <p className="max-w-3xl font-display text-2xl italic leading-relaxed text-white/90 md:text-3xl">
                  The same instinct that ends a poem on the right word ends a system on the right
                  abstraction. Craft is craft. Here is the range it moves in.
                </p>
              </FadeUp>
            </div>
          </div>
        </div>

        <div className="relative px-6 py-16">
          <div className="absolute inset-0 pointer-events-none opacity-30" style={{ backgroundImage: GRAIN }} />
          <div className="relative z-10 mx-auto max-w-4xl">
            <div className="grid gap-4 sm:grid-cols-2">
              {RANGE.map((r, i) => (
                <FadeUp key={r.k} delay={i * 0.06}>
                  <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6" style={{ borderLeft: '3px solid #C9943A' }}>
                    <h3 className="mb-2 font-display text-xl text-white">{r.k}</h3>
                    <p className="text-sm leading-relaxed text-white/70 md:text-base">{r.v}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
            <FadeUp delay={0.1}>
              <p className="mt-10 max-w-3xl font-display text-lg italic leading-relaxed text-white/75">
                She does not separate the poet from the engineer. Both begin with an empty page and a
                refusal to leave it empty. A poem is architecture you can feel; a codebase is a poem
                that has to run. The soul is the same — only the syntax changes.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ═══ BRIDGE TO MIREMBE MUSE ══════════════════════════════════════════════ */}
      <section className="relative px-6 py-24" style={{ background: 'radial-gradient(120% 90% at 50% 0%, #241021 0%, #14102A 55%, #0A1128 100%)' }}>
        <div className="absolute inset-0 pointer-events-none opacity-25" style={{ backgroundImage: GRAIN }} />
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <FadeUp>
            <p className="mb-8 font-mono text-xs uppercase tracking-[0.3em] text-[#C9943A]">The systems have their own home</p>
            <p className="mb-4 font-display text-2xl italic leading-relaxed text-white/90 md:text-4xl">
              This is where the poems live.
            </p>
            <p className="mx-auto mb-10 max-w-xl text-white/65 leading-relaxed">
              The apps, the AI, the business this same mind builds — the other tongue — live at
              Mirembe Muse. If you came for the engineer and the founder, follow the bridge.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="https://mirembemuse.co.za" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C1292E] px-8 py-4 font-semibold text-white transition-all hover:scale-105"
              >
                Enter Mirembe Muse <ArrowUpRight className="h-4 w-4" />
              </a>
              <Link
                href="/poetry/collection"
                className="inline-flex items-center justify-center rounded-full border border-white/25 px-8 py-4 font-semibold text-white transition-all hover:border-[#C9943A] hover:text-[#C9943A]"
              >
                or stay in the garden
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </main>
  );
}
