/**
 * 📰 /blog — The House of Roses Press, front page.
 *
 * BUILD_JOURNEY §19.3 and §23. "Blog" is retired from the page (the URL stays;
 * see lib/data/press-issues.ts). What a reader meets instead is a masthead,
 * the issue on the stands with its contents, and the back issues, each piece
 * filed in the issue its date falls in.
 *
 * Server-rendered from Supabase. The previous page was a client component that
 * first painted the seed file, whose dates are relative to the build, and then
 * swapped in the real posts. The server sent the wrong dates on every request.
 * Search and the sign-up form are the only client islands.
 *
 * Only the press's own imprints are on the masthead. The business essays and
 * Notion guides stay live at their URLs and are named once, at the foot.
 */

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Mail } from 'lucide-react';
import Stock, { rhythm } from '@/components/ui/Stock';
import { PressSearch, SubscribeForm, type SearchItem } from '@/components/press/PressClient';
import { getPressCards, type PressCard } from '@/lib/press';
import { CURRENT_ISSUE, IMPRINTS, ISSUES, issueLabel, PRESS_NAME, STUDIO_CATEGORIES, type Issue } from '@/lib/data/press-issues';

export const revalidate = 3600;

const NAVY = '#0A1128';
const GOLD = '#C9943A';
const CHERRY = '#C1292E';
const ROSE = '#6B0F20';
const CREAM = '#F5F0E8';

const href = (p: PressCard) => `/blog/${p.category}/${p.slug}`;
const fmt = (d: string | null) =>
  d ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }) : '';
const pad = (n: number) => String(n).padStart(2, '0');

export default async function PressFrontPage() {
  const all = await getPressCards();
  const press = all.filter((p) => !p.studio);
  const studio = all.filter((p) => p.studio);

  const inIssue = (i: Issue) => press.filter((p) => p.issue?.number === i.number);
  // The issue on the stands: the newest one that has something in it.
  const onStands = [...ISSUES].reverse().find((i) => inIssue(i).length || i.feature) ?? CURRENT_ISSUE;
  const standPieces = inIssue(onStands);
  const lead = standPieces.find((p) => p.cover_image) ?? standPieces[0];
  const contents = standPieces.filter((p) => p !== lead);
  const backIssues = [...ISSUES].reverse().filter((i) => i.number < onStands.number && (inIssue(i).length || i.feature));
  const liveImprints = IMPRINTS.map((im) => ({ ...im, count: press.filter((p) => p.category === im.category).length })).filter((im) => im.count);

  const searchItems: SearchItem[] = all.map((p) => ({
    href: href(p),
    title: p.title,
    excerpt: p.excerpt ?? '',
    imprint: p.imprintName,
    issue: p.issue ? issueLabel(p.issue.number) : '',
  }));

  return (
    <div className="relative min-h-screen" style={{ background: CREAM }}>
      {/* ═══ THE MASTHEAD ══════════════════════════════════════════════════ */}
      <header className="relative -mt-20 overflow-hidden" style={{ background: NAVY, color: CREAM }}>
        <div className="pointer-events-none absolute inset-0" style={{ background: `radial-gradient(120% 80% at 85% -10%, ${ROSE}77, transparent 60%)` }} />
        <div className="relative z-10 mx-auto max-w-6xl px-6 pb-14 pt-36">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4 font-mono text-[10.5px] uppercase tracking-[0.3em]" style={{ borderColor: `${CREAM}26`, color: `${CREAM}99` }}>
            <span>KuGompo City · Est. 2026</span>
            <span style={{ color: GOLD }}>
              {issueLabel(onStands.number)} · {onStands.dated}
            </span>
          </div>

          <h1 className="mt-8 font-display font-bold italic leading-[0.9]" style={{ fontSize: 'clamp(3rem, 10vw, 7.5rem)' }}>
            {PRESS_NAME.replace(' Press', '')}
            <span className="block font-normal not-italic" style={{ color: GOLD, fontSize: '0.42em', letterSpacing: '0.2em' }}>
              PRESS
            </span>
          </h1>

          <div className="mt-10 grid items-end gap-10 md:grid-cols-[1fr_auto]">
            <div>
              <p className="max-w-xl font-display text-xl italic leading-relaxed md:text-2xl" style={{ color: `${CREAM}cc` }}>
                Essays and field notes by Nandawula Regine, published in numbered issues. The writing, and the making of the
                work, in one house.
              </p>
              <div className="mt-8">
                <PressSearch items={searchItems} />
              </div>
            </div>
            <ul className="flex gap-8 md:flex-col md:gap-3 md:text-right">
              {liveImprints.map((im) => (
                <li key={im.key}>
                  <Link href={`/blog/${im.category}`} className="group inline-block">
                    <span className="font-display text-2xl italic transition-colors group-hover:text-[#C9943A]">{im.name}</span>
                    <span className="ml-2 font-mono text-[10px] tracking-[0.2em]" style={{ color: GOLD }}>
                      {pad(im.count)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="h-px w-full" style={{ background: `linear-gradient(to right, transparent, ${GOLD}90, transparent)` }} />
      </header>

      {/* ═══ ON THE STANDS ═════════════════════════════════════════════════ */}
      <Stock paper="parchment" className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 flex items-end gap-6">
            <span className="font-display font-bold italic leading-[0.8]" style={{ fontSize: 'clamp(4.5rem, 12vw, 9rem)', color: 'var(--gold-ink)' }}>
              {String(onStands.number).padStart(3, '0')}
            </span>
            <div className="pb-2">
              <p className="font-mono text-[10.5px] uppercase tracking-[0.3em]" style={{ color: 'var(--cherry-ink)' }}>
                On the stands
              </p>
              <h2 className="mt-2 font-display text-3xl italic md:text-5xl" style={{ color: 'rgb(var(--head-rgb))' }}>
                {onStands.title}
              </h2>
            </div>
          </div>

          {lead ? (
            <Link href={href(lead)} className="group grid items-center gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
              <div className="relative overflow-hidden" style={{ aspectRatio: '4 / 3', borderRadius: 3, background: `linear-gradient(135deg, ${NAVY}, ${ROSE})` }}>
                {lead.cover_image ? (
                  <Image src={lead.cover_image} alt="" fill priority sizes="(max-width:1024px) 100vw, 55vw" className="object-cover transition-transform duration-[1000ms] group-hover:scale-[1.03]" />
                ) : (
                  <span className="absolute bottom-6 left-6 font-display text-7xl italic" style={{ color: `${CREAM}33` }}>
                    {lead.imprintName}
                  </span>
                )}
              </div>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.3em]" style={{ color: 'var(--cherry-ink)' }}>
                  The lead · {lead.imprintName}
                </p>
                <h3 className="mt-4 font-display leading-[1.04]" style={{ fontSize: 'clamp(2.1rem, 4.4vw, 3.5rem)', color: 'rgb(var(--head-rgb))' }}>
                  {lead.title}
                </h3>
                {lead.excerpt ? (
                  <p className="mt-5 font-display text-xl italic leading-relaxed" style={{ color: 'rgb(var(--ink-rgb) / 0.72)' }}>
                    {lead.excerpt}
                  </p>
                ) : null}
                <span className="mt-7 inline-flex items-center gap-2 border-b pb-1 font-mono text-xs uppercase tracking-[0.3em]" style={{ color: 'rgb(var(--head-rgb))', borderColor: GOLD }}>
                  Read it <ArrowUpRight className="h-4 w-4" style={{ color: GOLD }} />
                </span>
              </div>
            </Link>
          ) : null}

          {onStands.feature ? <FeatureStrip feature={onStands.feature} /> : null}

          {contents.length ? (
            <div className="mt-16">
              <p className="mb-2 font-mono text-[10.5px] uppercase tracking-[0.3em]" style={{ color: 'rgb(var(--ink-rgb) / 0.52)' }}>
                Also in this issue
              </p>
              <Contents pieces={contents} />
            </div>
          ) : null}
        </div>
      </Stock>

      {/* ═══ THE BACK ISSUES: each on its own band, cherry / beige / navy in
          turn (the balance rule, Stock.tsx) ══════════════════════════════════ */}
            {backIssues.map((i, bi) => {
              const pieces = inIssue(i);
              return (
                <Stock key={i.number} paper={rhythm(bi, 2)} className="px-6 py-16 md:py-20">
                {bi === 0 ? (
                  <p className="t-cherry mx-auto mb-10 max-w-6xl font-mono text-[11px] uppercase tracking-[0.35em]">The back issues</p>
                ) : null}
                <article id={`issue-${i.number}`} className="mx-auto grid max-w-6xl scroll-mt-28 gap-8 md:grid-cols-[13rem_1fr] md:gap-12">
                  <div>
                    <span className="block font-display font-bold italic leading-[0.8]" style={{ fontSize: '5.5rem', color: 'var(--gold-ink)' }}>
                      {String(i.number).padStart(3, '0')}
                    </span>
                    <h3 className="mt-3 font-display text-2xl italic leading-tight" style={{ color: 'rgb(var(--head-rgb))' }}>
                      {i.title}
                    </h3>
                    <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.24em]" style={{ color: 'rgb(var(--ink-rgb) / 0.52)' }}>
                      {i.dated}{pieces.length ? ` · ${pieces.length} ${pieces.length === 1 ? 'piece' : 'pieces'}` : ''}
                    </p>
                  </div>
                  <div>
                    {i.feature ? <FeatureStrip feature={i.feature} compact /> : null}
                    {pieces.length ? <Contents pieces={pieces} /> : null}
                  </div>
                </article>
                </Stock>
              );
            })}

      {/* ═══ THE HOUSE RULES + WHAT ELSE IS KEPT HERE ══════════════════════ */}
      <Stock paper="navy" className="px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
          <div>
            <p className="font-mono text-[10.5px] uppercase tracking-[0.3em]" style={{ color: GOLD }}>
              How this press works
            </p>
            <p className="mt-4 font-display text-2xl italic leading-relaxed" style={{ color: 'rgb(var(--head-rgb))' }}>
              Every piece is filed in the issue its date falls in. Every number in a field note should be traceable to the code
              it describes.
            </p>
          </div>
          {studio.length ? (
            <div className="self-end border-l-2 pl-6" style={{ borderColor: 'var(--rule)' }}>
              <p className="text-[15px] leading-relaxed" style={{ color: 'rgb(var(--ink-rgb) / 0.62)' }}>
                Also kept here, so their links keep working:{' '}
                {Object.entries(STUDIO_CATEGORIES).map(([cat, s], k) => {
                  const n = studio.filter((p) => p.category === cat).length;
                  if (!n) return null;
                  return (
                    <span key={cat}>
                      {k ? ' and ' : ''}
                      <Link href={s.href} className="underline decoration-dotted underline-offset-4" style={{ color: 'var(--cherry-ink)' }}>
                        {n} {s.name.toLowerCase()}
                      </Link>
                    </span>
                  );
                })}
                . The business writing belongs to{' '}
                <a href="https://mirembemuse.co.za" className="underline decoration-dotted underline-offset-4" style={{ color: 'var(--cherry-ink)' }}>
                  Mirembe Muse
                </a>
                .
              </p>
            </div>
          ) : null}
        </div>
      </Stock>

      {/* ═══ LETTERS ═══════════════════════════════════════════════════════ */}
      <Stock paper="cherry" className="relative px-6 py-24 md:py-28">
        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <div className="mb-8 inline-flex h-14 w-14 items-center justify-center rounded-full border" style={{ borderColor: `${GOLD}66`, background: `${GOLD}12` }}>
            <Mail className="h-6 w-6" style={{ color: GOLD }} />
          </div>
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.4em]" style={{ color: GOLD }}>
            Subscribe to the press
          </p>
          <h2 className="mb-6 font-display leading-tight" style={{ fontSize: 'clamp(2rem, 5vw, 3.1rem)', color: 'rgb(var(--head-rgb))' }}>
            Each new issue, <span className="italic" style={{ color: GOLD }}>delivered by hand.</span>
          </h2>
          <p className="mx-auto mb-10 max-w-lg text-base leading-relaxed" style={{ color: 'rgb(var(--ink-rgb) / 0.72)' }}>
            One email when an issue is published. Nothing in between.
          </p>
          <SubscribeForm />
        </div>
      </Stock>
    </div>
  );
}

/** A magazine contents list: number, imprint, title, standfirst, date. */
function Contents({ pieces }: { pieces: PressCard[] }) {
  return (
    <ol className="border-t" style={{ borderColor: 'var(--rule)' }}>
      {pieces.map((p, k) => (
        <li key={p.slug}>
          <Link href={href(p)} className="group grid grid-cols-[2.5rem_1fr] gap-4 border-b py-6 md:grid-cols-[3rem_8rem_1fr_7rem] md:gap-6" style={{ borderColor: 'var(--rule)' }}>
            <span className="font-display text-2xl italic" style={{ color: 'var(--gold-ink)' }}>
              {pad(k + 1)}
            </span>
            <span className="hidden pt-2 font-mono text-[10px] uppercase tracking-[0.22em] md:block" style={{ color: 'var(--cherry-ink)' }}>
              {p.imprintName}
            </span>
            <span>
              <span className="block font-display text-xl leading-snug transition-colors group-hover:opacity-70 md:text-2xl" style={{ color: 'rgb(var(--head-rgb))' }}>
                {p.title}
              </span>
              {p.excerpt ? (
                <span className="mt-1.5 block text-[14px] leading-relaxed line-clamp-2" style={{ color: 'rgb(var(--ink-rgb) / 0.62)' }}>
                  {p.excerpt}
                </span>
              ) : null}
              <span className="mt-2 block font-mono text-[10px] uppercase tracking-[0.2em] md:hidden" style={{ color: 'rgb(var(--ink-rgb) / 0.45)' }}>
                {p.imprintName} · {fmt(p.published_at)}
              </span>
            </span>
            <span className="hidden pt-2 text-right font-mono text-[10px] uppercase tracking-[0.18em] md:block" style={{ color: 'rgb(var(--ink-rgb) / 0.45)' }}>
              {fmt(p.published_at)}
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}

function FeatureStrip({ feature, compact = false }: { feature: NonNullable<Issue['feature']>; compact?: boolean }) {
  return (
    <Link
      href={feature.href}
      className={`group flex items-center justify-between gap-6 border px-6 ${compact ? 'mb-6 py-5' : 'mt-12 py-7'}`}
      style={{ borderColor: `${GOLD}66`, background: `${GOLD}0d`, borderRadius: 2 }}
    >
      <span>
        <span className="block font-mono text-[10px] uppercase tracking-[0.28em]" style={{ color: 'var(--cherry-ink)' }}>
          The feature
        </span>
        <span className="mt-1 block font-display text-2xl italic" style={{ color: 'rgb(var(--head-rgb))' }}>
          {feature.title}
        </span>
        <span className="mt-1 block text-[14px]" style={{ color: 'rgb(var(--ink-rgb) / 0.62)' }}>
          {feature.line}
        </span>
      </span>
      <ArrowUpRight className="h-5 w-5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" style={{ color: GOLD }} />
    </Link>
  );
}
