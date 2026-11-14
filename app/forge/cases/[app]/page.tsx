/**
 * /forge/cases/[app] - the Evidence Wing case file.
 * Public and indexed (14 Nov 2026), in the sitemap. Plan: docs/plans/evidence-wing-adminos.md, docs/plans/app-studio-v2.md
 */
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { createMetadata, JsonLd, generateBreadcrumbJsonLd, SITE_URL, personRef } from '@/lib/seo';
import { CASE_LIST, getCase } from '@/lib/data/evidence/cases';
import { CLAIMS } from '@/lib/data/evidence/claims';
import Stock from '@/components/ui/Stock';
import DeskStack from '@/components/forge/evidence/DeskStack';
import VideoPlayer from '@/components/forge/evidence/VideoPlayer';
import PitchDeck from '@/components/forge/evidence/PitchDeck';
import JourneyWeek from '@/components/forge/evidence/JourneyWeek';
import ArchitectureExplorer from '@/components/forge/evidence/ArchitectureExplorer';
import DecisionCards from '@/components/forge/evidence/DecisionCards';
import WingMap from '@/components/forge/evidence/WingMap';
import PriceLadder from '@/components/forge/evidence/PriceLadder';
import ProofWall from '@/components/forge/evidence/ProofWall';
import { ClaimFigure, ClaimsFootnote } from '@/components/forge/evidence/ClaimFigure';

export const dynamicParams = false;

export function generateStaticParams() {
  return CASE_LIST.map((c) => ({ app: c.app }));
}

export async function generateMetadata({ params: paramsPromise }: { params: Promise<{ app: string }> }) {
  const params = await paramsPromise;
  const c = getCase(params.app);
  return createMetadata({
    title: c ? `${c.name}: the case file` : 'Case file',
    description: c ? c.promise : 'Case file',
    path: `/forge/cases/${params.app}`,
  });
}

export default async function CasePage({ params: paramsPromise }: { params: Promise<{ app: string }> }) {
  const params = await paramsPromise;
  const c = getCase(params.app);
  if (!c) notFound();

  const archClaimIds = Array.from(new Set(c.arch.flatMap((n) => n.claimIds ?? [])));
  const declared = new Set(CLAIMS.map((x) => x.id));
  const footIds = archClaimIds.filter((id) => declared.has(id));

  return (
    <>
      <JsonLd
        data={[
          generateBreadcrumbJsonLd([
            { name: 'Home', path: '' },
            { name: 'The Forge', path: '/forge' },
            { name: 'Case files', path: '/forge/cases' },
            { name: c.name, path: `/forge/cases/${c.app}` },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: c.name,
            description: c.promise,
            url: `${SITE_URL}/forge/cases/${c.app}`,
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web',
            creator: personRef(),
            ...(c.liveUrl ? { sameAs: c.liveUrl } : {}),
          },
        ]}
      />
      <main>
        <Stock paper={c.paper} texture={false} className="px-6 py-16 md:py-24">
          <div className="mx-auto max-w-6xl">
            <p className="text-xs uppercase tracking-[0.25em]" style={{ color: 'var(--gold-ink)' }}>
              <Link href="/forge/studio" prefetch={false} className="inline-flex min-h-[44px] items-center underline underline-offset-4">
                The App Studio
              </Link>{' '}
              / Case file / {c.status.label} as of {c.status.asOfLabel}
            </p>
            <h1 className="font-display mt-4 text-5xl md:text-7xl">{c.name}</h1>
            <p className="font-display mt-4 max-w-2xl text-xl italic md:text-2xl">{c.promise}</p>
            <div className="mt-8 flex flex-wrap gap-10">
              {c.coverClaims.map((id) => (
                <ClaimFigure key={id} id={id} showLabel />
              ))}
            </div>
            <div className="mt-12">
              <DeskStack screenIds={c.heroScreens} />
            </div>
            {c.liveUrl ? (
              <a
                href={c.liveUrl}
                rel="noopener noreferrer"
                className="mt-8 inline-flex min-h-[44px] items-center underline underline-offset-4"
              >
                Open the live product
              </a>
            ) : (
              <p className="mt-8 text-sm italic" style={{ color: 'rgb(var(--ink-rgb) / 0.75)' }}>
                Private product: owner login only. These are its real screens.
              </p>
            )}
          </div>
        </Stock>

        <Stock paper="bone" texture={false} className="px-6 py-16">
          <div className="mx-auto max-w-5xl">
            <PitchDeck slides={c.slides} title={`${c.name} pitch`} app={c.app} />
          </div>
        </Stock>

        <Stock paper={c.paper} texture={false} className="px-6 py-16">
          <div className="mx-auto max-w-5xl">
            <VideoPlayer poster={c.video.posterScreen} src={c.video.src} chapters={c.video.chapters} title={`${c.name} running`} />
          </div>
        </Stock>

        {c.wings?.length ? (
          <Stock paper={c.paper} texture={false} className="px-6 py-16">
            <div className="mx-auto max-w-6xl">
              <WingMap wings={c.wings} title="Walk the wings" app={c.app} />
            </div>
          </Stock>
        ) : null}

        <Stock paper="bone" texture={false} className="px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <JourneyWeek stops={c.journey} title={c.journeyTitle} />
          </div>
        </Stock>

        <Stock paper={c.paper} texture={false} className="px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <ArchitectureExplorer nodes={c.arch} title={`How ${c.name} is built`} app={c.app} />
            {footIds.length ? <ClaimsFootnote ids={footIds} /> : null}
          </div>
        </Stock>

        <Stock paper="bone" texture={false} className="px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <DecisionCards cards={c.decisions} title="Decisions, and what they cost" />
          </div>
        </Stock>

        {c.app === 'adminos' ? (
          <Stock paper="bone" texture={false} className="px-6 py-16">
            <div className="mx-auto max-w-6xl">
              <PriceLadder title="What it costs" />
            </div>
          </Stock>
        ) : null}

        <Stock paper={c.paper} texture={false} className="px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <ProofWall items={c.proof} title="Proof, with dates" />
          </div>
        </Stock>
      </main>
    </>
  );
}
