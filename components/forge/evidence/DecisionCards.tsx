import type { DecisionCard } from '@/lib/data/evidence/types';
import { FadeUp, Rule } from '../ForgeChrome';

const GOLD_INK = 'var(--gold-ink)';
const ink = (a: number) => `rgb(var(--ink-rgb) / ${a})`;

export default function DecisionCards({ cards, title }: { cards: DecisionCard[]; title: string }) {
  return (
    <section aria-labelledby="decisions-title" className="px-5 py-14 sm:px-8 md:py-20">
      <div className="mx-auto max-w-5xl">
        <Rule label="Decisions" />
        <h2
          id="decisions-title"
          className="mt-4 font-display text-3xl italic leading-tight sm:text-4xl"
          style={{ color: ink(0.95) }}
        >
          {title}
        </h2>
        <ol className="mt-10 space-y-10 md:space-y-14">
          {cards.map((c, i) => {
            const lead = i === 0;
            const offset = lead ? '' : i % 2 === 1 ? 'md:w-[72%]' : 'md:ml-auto md:w-[72%]';
            return (
              <li key={c.id} className={offset}>
                <FadeUp>
                  <article
                    className={`border-l-2 pl-5 ${lead ? 'md:pl-8' : ''}`}
                    style={{ borderColor: '#C9943A' }}
                  >
                    <h3
                      className={`font-display leading-tight ${
                        lead ? 'text-3xl sm:text-4xl md:text-5xl' : 'text-2xl sm:text-3xl'
                      }`}
                      style={{ color: ink(0.95) }}
                    >
                      {c.decision}
                    </h3>
                    <div className={`mt-4 ${lead ? 'md:grid md:grid-cols-2 md:gap-8' : ''}`}>
                      <div>
                        <p className="font-mono text-xs uppercase tracking-widest" style={{ color: GOLD_INK }}>
                          Alternatives
                        </p>
                        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm" style={{ color: ink(0.8) }}>
                          {c.alternatives.map((a) => (
                            <li key={a}>{a}</li>
                          ))}
                        </ul>
                      </div>
                      <div className={lead ? '' : 'mt-4'}>
                        <p className="font-mono text-xs uppercase tracking-widest" style={{ color: GOLD_INK }}>
                          Why
                        </p>
                        <p
                          className={`mt-2 leading-relaxed ${lead ? 'text-base sm:text-lg' : 'text-base'}`}
                          style={{ color: ink(0.88) }}
                        >
                          {c.why}
                        </p>
                      </div>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed" style={{ color: ink(0.8) }}>
                      <span className="font-mono text-xs uppercase tracking-widest" style={{ color: GOLD_INK }}>
                        Cost{' '}
                      </span>
                      {c.cost}
                    </p>
                    <p className="mt-4 font-mono text-xs tracking-wide" style={{ color: GOLD_INK }}>
                      Receipt: {c.receipt}
                    </p>
                  </article>
                </FadeUp>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
