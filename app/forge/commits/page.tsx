/**
 * 🧱 /forge/commits — The Commit Wall
 *
 * Reads `lib/data/forge-github.json` (37 KB, already gated at ingest). No corpus
 * import, so no §3 exposure — but it stays a server component so that the join
 * with the dossier accents happens in one place.
 */

import { createMetadata, JsonLd, generateBreadcrumbJsonLd, SITE_URL } from '@/lib/seo';
import CommitWall, { type WallRow } from '@/components/forge/CommitWall';
import { getCommitWall } from '@/lib/forge-data';
import { BUILD_DOSSIERS } from '@/lib/data/forge-builds';

export const metadata = createMetadata({
  title: 'The Commit Wall — a year of commit messages, read as sentences',
  description:
    'Three thousand commits across twelve repositories, and the fraction of them that are sentences rather than labels. Measured from the GitHub API and committed as data, so no number on the page can quietly go stale.',
  path: '/forge/commits',
  keywords: [
    'commit messages',
    'good commit message examples',
    'git history as writing',
    'engineering build in public',
    'conventional commits',
    'developer commit history portfolio',
    'South African software engineer',
    'African AI engineer',
    'Nandawula Regine',
  ],
});

/** Split a conventional-commit prefix off the sentence, so the sentence can lead. */
function splitPrefix(subject: string): { prefix: string | null; line: string } {
  const m = subject.match(/^([a-z]+(?:\([^)]*\))?!?):\s*(.+)$/i);
  if (!m) return { prefix: null, line: subject };
  return { prefix: m[1], line: m[2] };
}

export default function CommitWallPage() {
  const wall = getCommitWall();
  const accentOf = (key: string) => BUILD_DOSSIERS.find((d) => d.key === key)?.accent ?? '#C9943A';

  const rows: WallRow[] = wall.lines.map((l) => {
    const { prefix, line } = splitPrefix(l.subject);
    return {
      build: l.build,
      title: l.title,
      date: l.date,
      // Formatted on the server — see the hydration note in the Scar Room.
      when: new Date(`${l.date}T00:00:00Z`).toLocaleDateString('en-ZA', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        timeZone: 'UTC',
      }),
      sha: l.sha,
      prefix,
      line,
      accent: accentOf(l.build),
    };
  });

  const kept = rows.reduce<Record<string, number>>((acc, r) => {
    acc[r.build] = (acc[r.build] || 0) + 1;
    return acc;
  }, {});

  const builds = wall.builds.map((b) => ({ ...b, kept: kept[b.key] ?? 0 })).filter((b) => b.kept > 0);

  const jsonLd = [
    generateBreadcrumbJsonLd([
      { name: 'Home', path: '' },
      { name: 'The Forge', path: '/forge' },
      { name: 'The Commit Wall', path: '/forge/commits' },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'The Commit Wall',
      description: 'Commit messages from twelve repositories, selected for reading as sentences.',
      url: `${SITE_URL}/forge/commits`,
      isPartOf: { '@type': 'WebSite', name: 'Creatively Nanda', url: SITE_URL },
      author: { '@type': 'Person', name: 'Nandawula Regine Kabali-Kagwa', url: SITE_URL },
      dateModified: wall.generatedAt,
      mainEntity: { '@type': 'ItemList', numberOfItems: rows.length },
    },
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <CommitWall
        rows={rows}
        builds={builds}
        languages={wall.languages}
        activity={wall.activity}
        totalCommits={wall.totals.commits.toLocaleString('en-ZA')}
        generatedAt={wall.generatedAt}
        // Read off the ingest's own gate counters rather than typed here, so the
        // page cannot claim a level of filtering it is no longer doing.
        withheld={String(wall.gate.withheld)}
        figures={[
          { value: wall.totals.commits.toLocaleString('en-ZA'), label: 'commits, measured' },
          { value: String(rows.length), label: 'on the wall' },
          { value: String(wall.totals.repos), label: 'repositories' },
          { value: `${(wall.totals.codeBytes / 1e6).toFixed(0)} MB`, label: 'of source' },
        ]}
      />
    </>
  );
}
