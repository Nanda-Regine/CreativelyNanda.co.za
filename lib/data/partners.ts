/**
 * The partner network, one source for every page that names it.
 * Confirmed public by Nanda, 19 Nov 2026. Plan: docs/plans/ecosystem-positioning.md
 *
 * Labels are honest: only ISD is a strategic partner (MOU). Do not upgrade a label
 * without the partner's agreement. No em dashes, no prices, no numbers that are not
 * sourced elsewhere.
 */
export interface Partner {
  key: string;
  name: string;
  /** The label shown beside the name. */
  role: string;
  /** One sentence on what we did or do together. */
  line: string;
}

export const PARTNERS: Partner[] = [
  {
    key: 'isd',
    name: 'Infrastructure Skills Developers',
    role: 'Strategic partner',
    line: 'Under an MOU. We built their membership platform and their events platform.',
  },
  {
    key: 'uplift',
    name: 'Uplift Institute',
    role: 'Built for',
    line: 'The events platform behind the Green Diaspora Forum.',
  },
  {
    key: 'taektwo',
    name: 'Taek Two Studios',
    role: 'A Mirembe Muse venture',
    line: 'Media and creative production.',
  },
  {
    key: 'joko',
    name: 'Joko & Co Events',
    role: 'Partner',
    line: 'Live events and convening.',
  },
];

export const CONTACT_EMAIL = 'hello@creativelynanda.co.za';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/nandawula-kabali-kagwa-584bb0262/';
export const GITHUB_URL = 'https://github.com/Nanda-Regine';

export const mailto = (subject: string) => `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;
