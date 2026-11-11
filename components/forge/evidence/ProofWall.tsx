import type { ProofItem } from '@/lib/data/evidence/types';
import { FadeUp, Rule } from '../ForgeChrome';
import { ClaimFigure, ClaimsFootnote } from './ClaimFigure';

const GOLD_INK = 'var(--gold-ink)';
const ink = (a: number) => `rgb(var(--ink-rgb) / ${a})`;

type ClaimItem = Extract<ProofItem, { kind: 'claim' }>;
type QuoteItem = Extract<ProofItem, { kind: 'quote' }>;
type EventItem = Extract<ProofItem, { kind: 'event' }>;

export default function ProofWall({ items, title }: { items: ProofItem[]; title: string }) {
  const claims = items.filter((i): i is ClaimItem => i.kind === 'claim');
  const quotes = items.filter((i): i is QuoteItem => i.kind === 'quote');
  const events = items.filter((i): i is EventItem => i.kind === 'event');

  return (
    <section aria-labelledby="proof-title" className="px-5 py-14 sm:px-8 md:py-20">
      <div className="mx-auto max-w-5xl">
        <Rule label="Proof" />
        <h2
          id="proof-title"
          className="mt-4 font-display text-3xl italic leading-tight sm:text-4xl"
          style={{ color: ink(0.95) }}
        >
          {title}
        </h2>

        {claims.length > 0 ? (
          <ul className="mt-10 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 md:grid-cols-3">
            {claims.map((c) => (
              <li key={c.claimId}>
                <FadeUp>
                  <ClaimFigure id={c.claimId} />
                </FadeUp>
              </li>
            ))}
          </ul>
        ) : null}

        {quotes.length > 0 ? (
          <div className="mt-14 space-y-10">
            {quotes.map((q) => (
              <FadeUp key={q.text}>
                <figure className="border-l-2 pl-5 md:pl-8" style={{ borderColor: '#C9943A' }}>
                  <blockquote
                    className="font-display text-2xl italic leading-snug sm:text-3xl"
                    style={{ color: ink(0.92) }}
                  >
                    <p>{q.text}</p>
                  </blockquote>
                  <figcaption className="mt-3 text-sm" style={{ color: ink(0.8) }}>
                    {q.attribution}, {q.asOfLabel}
                    <span
                      className="ml-2 inline-block rounded border px-1.5 py-0.5 font-mono text-xs uppercase tracking-wider"
                      style={{ borderColor: ink(0.3), color: GOLD_INK }}
                    >
                      {q.consent === 'given' ? 'with consent' : 'anonymised'}
                    </span>
                  </figcaption>
                </figure>
              </FadeUp>
            ))}
          </div>
        ) : null}

        {events.length > 0 ? (
          <ul className="mt-14 space-y-3">
            {events.map((e) => (
              <li key={e.text} className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                <span className="shrink-0 font-mono text-xs uppercase tracking-widest sm:w-28 sm:pt-0.5" style={{ color: GOLD_INK }}>
                  {e.asOfLabel}
                </span>
                <span style={{ color: ink(0.88) }}>{e.text}</span>
              </li>
            ))}
          </ul>
        ) : null}

        <ClaimsFootnote ids={claims.map((c) => c.claimId)} />
      </div>
    </section>
  );
}
