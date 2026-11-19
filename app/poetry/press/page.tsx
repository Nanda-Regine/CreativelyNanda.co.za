/**
 * /poetry/press: the poet's press kit and booking page.
 * The company's kit is on mirembemuse.co.za/press. Facts: lib/data/press-kit.ts.
 * Plan: docs/plans/press-system.md
 */
import Link from 'next/link';
import { createMetadata, JsonLd, generateBreadcrumbJsonLd, personRef } from '@/lib/seo';
import Ground, { groundTokens } from '@/components/ui/Ground';
import { Reveal, Rule } from '@/components/ui/Editorial';
import CopyButton from '@/components/press/CopyButton';
import { BIOS, FACTS, MENTIONS, BOOKINGS, PRESS_EMAIL, COMPANY_PRESS_URL, FULL_NAME, mailtoPress } from '@/lib/data/press-kit';

export const metadata = createMetadata({
  title: 'Press kit and booking: Nandawula Regine, poet',
  description:
    'Press kit for poet and AI engineer Nandawula Regine Kabali-Kagwa: bios to copy, fast facts, where she has appeared, and how to book a reading or talk.',
  path: '/poetry/press',
  keywords: ['Nandawula Regine press kit', 'book a poet South Africa', 'spoken word poet Eastern Cape', 'Inside Her Roses author', 'poet who codes'],
});

export default function PoetPressPage() {
  const parchment = groundTokens('parchment');
  const midnight = groundTokens('midnight');
  const body = { color: 'rgb(var(--ink-rgb) / 0.82)' } as const;

  return (
    <main>
      <JsonLd
        data={[
          generateBreadcrumbJsonLd([
            { name: 'Home', path: '' },
            { name: 'Poetry', path: '/poetry' },
            { name: 'Press kit and booking', path: '/poetry/press' },
          ]),
          { '@context': 'https://schema.org', '@type': 'ProfilePage', name: `${FULL_NAME}: press kit`, mainEntity: personRef() },
        ]}
      />

      <Ground ground="parchment" className="px-6 pb-20 pt-32 md:pb-28 md:pt-40">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: parchment.accent }}>Press kit and booking</p>
            <h1 className="mt-4 font-display font-bold italic leading-[0.98]" style={{ fontSize: 'clamp(2.6rem, 8vw, 6rem)' }}>
              Nandawula Regine
            </h1>
            <p className="mt-6 max-w-2xl text-[17px] font-light leading-[1.8]" style={body}>
              Poet, performer and AI engineer, writing and building from KuGompo City. Copy a bio, check a fact,
              and write to book. Writing about her company or its platforms? The{' '}
              <a href={COMPANY_PRESS_URL} className="underline underline-offset-4" style={{ color: parchment.accent }}>company press kit</a> is the right one.
            </p>
            <a
              href={mailtoPress('Press enquiry')}
              className="mt-8 inline-flex min-h-[44px] items-center rounded-full px-7 py-3 font-mono text-[11px] uppercase tracking-widest transition-opacity hover:opacity-90"
              style={{ background: parchment.accent, color: parchment.bg }}
            >
              Press enquiry
            </a>
          </Reveal>

          <div className="mt-20">
            <Reveal><Rule label="Bios, ready to copy" accent={parchment.accent} /></Reveal>
            <div className="mt-8 grid gap-8 md:grid-cols-2">
              {BIOS.map((b, i) => (
                <Reveal key={b.id} delay={i * 0.06}>
                  <article className="flex h-full flex-col border-t pt-5" style={{ borderColor: `${parchment.ink}33` }}>
                    <h2 className="font-display text-2xl font-bold italic">{b.label}</h2>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: parchment.accent }}>{b.words}</p>
                    <p className="mt-4 flex-1 text-[15px] font-light leading-[1.8]" style={body}>{b.text}</p>
                    <div className="mt-5" style={{ color: parchment.accent }}>
                      <CopyButton text={b.text} label={b.label.toLowerCase()} />
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="mt-20">
            <Reveal><Rule label="Fast facts" accent={parchment.accent} /></Reveal>
            <dl className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2">
              {FACTS.map((f) => (
                <Reveal key={f.label}>
                  <div className="border-t pt-4" style={{ borderColor: `${parchment.ink}1F` }}>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: parchment.accent }}>{f.label}</dt>
                    <dd className="mt-1 font-display text-xl italic leading-snug">{f.value}</dd>
                    <p className="mt-1 text-[12px] font-light" style={{ color: 'rgb(var(--ink-rgb) / 0.55)' }}>Source: {f.source}</p>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </Ground>

      <Ground ground="midnight" className="px-6 py-20 md:py-28" edge="slant">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <Rule label="As seen on" accent={midnight.accent} />
            <ul className="mt-8 grid gap-6 sm:grid-cols-2">
              {MENTIONS.map((m) => (
                <li key={m.outlet} className="border-t pt-4" style={{ borderColor: `${midnight.ink}26` }}>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: midnight.accent }}>{m.type}</p>
                  <p className="mt-1 font-display text-xl italic">{m.outlet}</p>
                  <p className="mt-1 text-[15px] font-light" style={{ color: `${midnight.ink}B3` }}>{m.topic}</p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-20">
              <Rule label="Book her" accent={midnight.accent} />
              <div className="mt-8 grid gap-8 md:grid-cols-3">
                {BOOKINGS.map((b) => (
                  <div key={b.title} className="flex flex-col border-t pt-5" style={{ borderColor: `${midnight.ink}26` }}>
                    <h3 className="font-display text-xl font-bold italic leading-tight">{b.title}</h3>
                    <p className="mt-3 flex-1 text-[15px] font-light leading-relaxed" style={{ color: `${midnight.ink}B3` }}>{b.line}</p>
                    <a href={mailtoPress(b.subject)} className="mt-5 inline-flex min-h-[44px] items-center text-sm underline underline-offset-4" style={{ color: midnight.accent }}>
                      Ask about this
                    </a>
                  </div>
                ))}
              </div>
              <p className="mt-10 max-w-2xl text-[15px] font-light leading-relaxed" style={{ color: `${midnight.ink}B3` }}>
                Fees and availability on request. Write to{' '}
                <a href={`mailto:${PRESS_EMAIL}`} className="underline underline-offset-4" style={{ color: midnight.accent }}>{PRESS_EMAIL}</a>.
                High-resolution photographs, with credits, are sent on request. Spotted something wrong in this kit? Please tell us.
              </p>
              <p className="mt-6 text-[15px]">
                <Link href="/poetry/collection" className="underline underline-offset-4" style={{ color: midnight.accent }}>Read the collection</Link>
                {' · '}
                <Link href="/forge" className="underline underline-offset-4" style={{ color: midnight.accent }}>The Forge</Link>
              </p>
            </div>
          </Reveal>
        </div>
      </Ground>
    </main>
  );
}
