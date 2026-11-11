import { ADMINOS_PRICING } from '@/lib/data/evidence/adminos/pricing';
import { FadeUp, Rule } from '../ForgeChrome';

const GOLD_INK = 'var(--gold-ink)';
const ink = (a: number) => `rgb(var(--ink-rgb) / ${a})`;

export default function PriceLadder({ title }: { title: string }) {
  const p = ADMINOS_PRICING;
  return (
    <section aria-labelledby="pricing-title" className="px-5 py-14 sm:px-8 md:py-20">
      <div className="mx-auto max-w-5xl">
        <Rule label="Pricing" />
        <h2 id="pricing-title" className="mt-4 font-display text-3xl italic leading-tight sm:text-4xl" style={{ color: ink(0.95) }}>
          {title}
        </h2>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {p.plans.map((plan) => (
            <li key={plan.name}>
              <FadeUp>
                <article
                  className="h-full border-t-2 pt-4"
                  style={{ borderColor: plan.popular ? '#C9943A' : ink(0.25) }}
                >
                  <h3 className="font-display text-2xl" style={{ color: ink(0.95) }}>
                    {plan.name}
                    {plan.popular ? (
                      <span className="ml-2 font-mono text-xs uppercase tracking-widest" style={{ color: GOLD_INK }}>
                        most popular
                      </span>
                    ) : null}
                  </h3>
                  <p className="mt-2 font-display text-3xl" style={{ color: ink(0.95) }}>
                    {plan.price}
                    <span className="text-sm" style={{ color: ink(0.7) }}> per month</span>
                  </p>
                  <p className="mt-2 text-sm" style={{ color: ink(0.8) }}>{plan.who}</p>
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-sm" style={{ color: ink(0.8) }}>
                    {plan.includes.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                  {plan.contactOnly ? (
                    <p className="mt-3 text-sm italic" style={{ color: ink(0.7) }}>Talk to us first.</p>
                  ) : null}
                </article>
              </FadeUp>
            </li>
          ))}
        </ul>
        <p className="mt-10 font-mono text-xs uppercase tracking-widest" style={{ color: GOLD_INK }}>Add-ons, any plan</p>
        <ul className="mt-2 grid gap-2 text-sm sm:grid-cols-2" style={{ color: ink(0.85) }}>
          {p.addons.map((a) => (
            <li key={a.name}>
              {a.name}: {a.price} per month
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm leading-relaxed" style={{ color: ink(0.8) }}>{p.note}</p>
        <p className="mt-2 font-mono text-xs tracking-wide" style={{ color: GOLD_INK }}>
          Source: {p.source}, as of {p.asOfLabel}.{' '}
          <a href={p.sourceUrl} rel="noopener noreferrer" className="underline underline-offset-4">
            Check the live list
          </a>
        </p>
      </div>
    </section>
  );
}
