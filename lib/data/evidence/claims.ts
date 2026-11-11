import type { Claim } from './types';

/**
 * The claims registry. Every number shown anywhere in the Evidence Wing comes from here, through ClaimFigure.
 * A claim without a source and a date does not ship. Dates are pre-formatted (asOfLabel) so render is hydration-safe.
 * Wording rule: nothing here says or implies a partnership with FNB. See docs/plans/evidence-wing-adminos.md.
 */
export const CLAIMS: Claim[] = [
  {
    id: 'adminos.screens',
    value: '50+',
    label: 'dashboard screens live',
    asOf: '2026-10',
    asOfLabel: 'Oct 2026',
    source: 'AdminOS hackathon pitch, counted from the live product',
    status: 'self-reported',
  },
  {
    id: 'adminos.tests',
    value: '238',
    label: 'automated tests passing',
    asOf: '2026-10',
    asOfLabel: 'Oct 2026',
    source: 'AdminOS test suite, run before the hackathon submission',
    status: 'self-reported',
  },
  {
    id: 'adminos.personas',
    value: '122/122',
    label: 'checks passed across 7 industry personas',
    asOf: '2026-10-06',
    asOfLabel: '6 Oct 2026',
    source: 'AdminOS persona regression run on production',
    status: 'self-reported',
  },
  {
    id: 'adminos.automations',
    value: '40+',
    label: 'background automations (reminders, recovery, rollovers)',
    asOf: '2026-10',
    asOfLabel: 'Oct 2026',
    source: 'AdminOS background-job inventory',
    status: 'self-reported',
  },
  {
    id: 'adminos.rls',
    value: '110',
    label: 'tables with row-level security, checked so no business can read another',
    asOf: '2026-10-26',
    asOfLabel: '26 Oct 2026',
    source: 'AdminOS security check against the public database key',
    status: 'self-reported',
  },
  {
    id: 'adminos.beta',
    value: '1',
    label: 'beta founder in Johannesburg, trialling it since August',
    asOf: '2026-08',
    asOfLabel: 'Aug 2026',
    source: 'AdminOS first-user record',
    status: 'self-reported',
  },
  {
    id: 'adminos.panel',
    value: '2 of 2',
    label: 'hackathon judges said they could use it and could buy it',
    asOf: '2026-10',
    asOfLabel: 'Oct 2026',
    source: 'Hackathon panel feedback, as recorded by the founder',
    status: 'self-reported',
  },
];

export const CLAIM_BY_ID: Record<string, Claim> = Object.fromEntries(CLAIMS.map((c) => [c.id, c]));
