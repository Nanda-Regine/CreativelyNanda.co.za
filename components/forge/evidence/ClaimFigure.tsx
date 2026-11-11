/**
 * Evidence Wing: the only way a number reaches a page.
 * Server-compatible on purpose (no hooks, no client-module imports), so it can
 * sit in server and client trees. Colours use the house CSS variables directly.
 */
import { CLAIM_BY_ID } from '@/lib/data/evidence/claims';
import type { Claim } from '@/lib/data/evidence/types';

const GOLD_INK = 'var(--gold-ink)';
const ink = (a: number) => `rgb(var(--ink-rgb) / ${a})`;

function claimOrThrow(id: string): Claim {
  const claim = CLAIM_BY_ID[id];
  if (!claim) {
    throw new Error(`ClaimFigure: unknown claim id "${id}". Add it to lib/data/evidence/claims.ts.`);
  }
  if (claim.status === 'retired') {
    throw new Error(`ClaimFigure: claim "${id}" is retired and must not be referenced.`);
  }
  return claim;
}

export function ClaimFigure({
  id,
  showLabel = true,
  className = '',
}: {
  id: string;
  showLabel?: boolean;
  className?: string;
}) {
  const claim = claimOrThrow(id);
  return (
    <span className={`inline-flex flex-col ${className}`}>
      <span className="flex items-start gap-0.5">
        <span
          className="font-display text-5xl font-light leading-none tracking-tight sm:text-6xl"
          style={{ color: ink(0.95) }}
        >
          {claim.value}
        </span>
        <a
          href={`#claim-${id}`}
          aria-label={`Source for ${claim.label}`}
          className="-mt-2 inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded font-mono text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          style={{ color: GOLD_INK }}
        >
          <span aria-hidden="true">*</span>
        </a>
      </span>
      {showLabel ? (
        <span className="mt-1 text-sm leading-snug" style={{ color: ink(0.75) }}>
          {claim.label}
        </span>
      ) : null}
    </span>
  );
}

const STATUS_TAG: Record<Claim['status'], string> = {
  verified: 'verified',
  'self-reported': 'self-reported',
  'pending-source': 'source pending',
  retired: 'retired',
};

export function ClaimsFootnote({ ids }: { ids: string[] }) {
  const unique = Array.from(new Set(ids));
  const claims = unique.map(claimOrThrow);
  if (claims.length === 0) return null;
  return (
    <ol
      className="mt-10 space-y-3 border-t pt-6 text-sm"
      style={{ borderColor: ink(0.18), color: ink(0.8) }}
    >
      {claims.map((c) => (
        <li key={c.id} id={`claim-${c.id}`} className="scroll-mt-24 leading-relaxed">
          <span>
            {c.label}: {c.source}, as of {c.asOfLabel}
          </span>{' '}
          {c.sourceUrl && c.sourceUrl.startsWith('https://') ? (
            <a
              href={c.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center break-all underline underline-offset-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{ color: GOLD_INK }}
            >
              {c.sourceUrl}
            </a>
          ) : null}{' '}
          <span
            className="ml-1 inline-block rounded border px-1.5 py-0.5 font-mono text-xs uppercase tracking-wider"
            style={{ borderColor: ink(0.3), color: GOLD_INK }}
          >
            {STATUS_TAG[c.status]}
          </span>
        </li>
      ))}
    </ol>
  );
}
