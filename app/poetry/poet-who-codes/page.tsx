'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Terminal } from 'lucide-react';

const ease = [0.22, 1, 0.36, 1] as const;

// Colours for the hand-highlighted code-poem (no highlighter library needed).
const c = {
  comment: '#7A9E7E',
  keyword: '#C4566A',
  string: '#C9A84C',
  fn: '#7FD4E6',
  plain: 'rgba(245,239,214,0.9)',
  dim: 'rgba(245,239,214,0.5)',
};

// The code-poem, rendered from tokens so no character fights the JSX parser.
type Tok = { t: string; c?: string };
const CODE_POEM: Tok[][] = [
  [{ t: '/* Inside Her Roses — a poem, compiled */', c: c.comment }],
  [],
  [{ t: 'const ', c: c.keyword }, { t: 'her = ' }, { t: 'new ', c: c.keyword }, { t: 'Woman', c: c.fn }, { t: '({' }],
  [{ t: '  from: ' }, { t: "'East London'", c: c.string }, { t: ',' }],
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
const COMMITS = [
  ['a1b0om', 'feat: learned to speak in two tongues'],
  ['r0se55', 'fix: stopped waiting for permission to bloom'],
  ['ub0ntu', 'refactor: I am because we are'],
  ['n1ght7', 'perf: wrote the poem before the world confirmed it'],
  ['bu1ld1', 'ship: eight apps, one year, one woman'],
];

export default function PoetWhoCodes() {
  return (
    <div className="min-h-screen text-cream">
      {/* Hero */}
      <section className="relative px-6 pt-28 pb-12">
        <div className="max-w-5xl mx-auto">
          <Link href="/poetry/collection" className="inline-flex items-center gap-2 text-cream/55 hover:text-cherry transition-colors mb-10 text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to the garden
          </Link>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-px" style={{ background: '#C9A84C' }} />
            <span className="text-xs font-mono tracking-[0.35em] uppercase" style={{ color: '#C9A84C' }}>
              Inside Her Roses · The Poet Who Codes
            </span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ease }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-light italic leading-[1.05]"
            style={{ color: '#F5EFD6' }}
          >
            She learned to speak<br />in two tongues.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
            className="mt-6 max-w-2xl text-lg leading-relaxed" style={{ color: 'rgba(245,239,214,0.72)' }}
          >
            The language of systems, and the language of longing. Most people are told to choose.
            I refused. The same hands that write the poem write the program — both are the act of
            making something from nothing, and daring it to live.
          </motion.p>
        </div>
      </section>

      {/* Two tongues — split */}
      <section className="px-6 py-8">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-4">
          {/* Longing */}
          <div className="rounded-[1.75rem] border border-white/10 bg-[#0d1330]/70 p-8">
            <p className="text-xs font-mono uppercase tracking-[0.28em] mb-5" style={{ color: '#C4566A' }}>
              The language of longing
            </p>
            <p className="font-display italic text-xl md:text-2xl leading-relaxed text-cream/85">
              Words are code for the soul.<br />
              Poetry is the algorithm of feeling —<br />
              a syntax the heart already knows<br />
              before the mind can compile it.
            </p>
          </div>
          {/* Systems */}
          <div className="rounded-[1.75rem] border border-white/10 bg-[#080b1c]/80 p-8">
            <p className="text-xs font-mono uppercase tracking-[0.28em] mb-5" style={{ color: '#7FD4E6' }}>
              The language of systems
            </p>
            <p className="font-mono text-sm md:text-[15px] leading-relaxed" style={{ color: c.plain }}>
              <span style={{ color: c.comment }}>{'// a poem and a program are'}</span><br />
              <span style={{ color: c.comment }}>{'// the same prayer, differently spelled'}</span><br />
              <span style={{ color: c.keyword }}>while</span> (heart.dreaming) {'{'}<br />
              &nbsp;&nbsp;heart.<span style={{ color: c.fn }}>write</span>(<span style={{ color: c.string }}>&apos;longing&apos;</span>);<br />
              &nbsp;&nbsp;heart.<span style={{ color: c.fn }}>ship</span>(<span style={{ color: c.string }}>&apos;systems&apos;</span>);<br />
              {'}'}
            </p>
          </div>
        </div>
      </section>

      {/* The poem, compiled */}
      <section className="px-6 py-8">
        <div className="max-w-3xl mx-auto rounded-[2rem] border border-white/10 bg-[#080b1c]/85 overflow-hidden">
          <div className="flex items-center gap-2 px-6 py-3 border-b border-white/10">
            <span className="w-3 h-3 rounded-full bg-[#C4566A]" />
            <span className="w-3 h-3 rounded-full bg-[#C9A84C]" />
            <span className="w-3 h-3 rounded-full bg-[#7A9E7E]" />
            <span className="ml-3 text-xs font-mono text-cream/40">inside-her-roses.ts</span>
          </div>
          <pre className="px-6 py-7 overflow-x-auto text-sm md:text-[15px] leading-[1.9] font-mono" style={{ color: c.plain }}>
            {CODE_POEM.map((line, i) => (
              <div key={i}>
                {line.length === 0
                  ? ' '
                  : line.map((tok, j) => (
                      <span key={j} style={tok.c ? { color: tok.c } : undefined}>{tok.t}</span>
                    ))}
              </div>
            ))}
          </pre>
        </div>
        <p className="max-w-3xl mx-auto text-center text-cream/50 text-sm mt-4 font-display italic">
          It runs. It also rhymes.
        </p>
      </section>

      {/* git log of a becoming */}
      <section className="px-6 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-5" style={{ color: '#C9A84C' }}>
            <Terminal className="w-4 h-4" />
            <span className="text-xs font-mono uppercase tracking-[0.28em]">git log — a becoming</span>
          </div>
          <div className="rounded-[1.5rem] border border-white/10 bg-[#080b1c]/80 p-6 font-mono text-sm space-y-2">
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
                <span className="text-cream/80">{msg}</span>
              </motion.p>
            ))}
          </div>
        </div>
      </section>

      {/* Bridge to Mirembe Muse */}
      <section className="px-6 py-16">
        <div className="max-w-3xl mx-auto rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#0d1330]/80 to-[#0b1029]/80 p-10 text-center">
          <p className="text-xs font-mono uppercase tracking-[0.3em] mb-5" style={{ color: '#C9A84C' }}>
            The systems have their own home
          </p>
          <p className="font-display italic text-2xl md:text-3xl text-cream/90 leading-relaxed mb-3">
            This is where the poems live.
          </p>
          <p className="text-cream/65 max-w-xl mx-auto mb-8">
            The apps, the AI, the businesses this same mind builds — the other tongue — live at
            Mirembe Muse. If you came for the engineer and the founder, follow the bridge.
          </p>
          <a href="https://mirembemuse.co.za" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-cherry text-white px-7 py-3 font-medium hover:bg-cherry-dark transition-colors">
            Enter Mirembe Muse <ArrowUpRight className="w-4 h-4" />
          </a>
          <div className="mt-6">
            <Link href="/poetry/collection" className="text-cream/50 hover:text-cream text-sm underline underline-offset-4">
              or stay in the garden
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
