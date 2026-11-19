/**
 * The poet's press kit: one source of facts for /poetry/press.
 * Plan: docs/plans/press-system.md
 *
 * Rules: no number without a source, no date we do not have, no fee we have not
 * set, no family names (clan level only), no em dashes. Spelling: Nandawula,
 * KuGompo City. The company's kit lives on mirembemuse.co.za/press.
 */

export const PRESS_EMAIL = 'hello@creativelynanda.co.za';
export const COMPANY_PRESS_URL = 'https://mirembemuse.co.za/press';

export const FULL_NAME = 'Nandawula Regine Kabali-Kagwa';

export interface Bio {
  id: 'short' | 'medium';
  label: string;
  words: string;
  text: string;
}

export const BIOS: Bio[] = [
  {
    id: 'short',
    label: 'Short bio',
    words: 'About 50 words',
    text:
      'Nandawula Regine Kabali-Kagwa is a Ugandan-South African poet and AI engineer based in KuGompo City, Eastern Cape. ' +
      'She is the author of the poetry collection Inside Her Roses (2021) and the founder of Mirembe Muse (Pty) Ltd, ' +
      'where she builds AI platforms for African communities and institutions.',
  },
  {
    id: 'medium',
    label: 'Medium bio',
    words: 'About 120 words',
    text:
      'Nandawula Regine Kabali-Kagwa is a Ugandan-South African poet, performer and AI engineer based in KuGompo City, Eastern Cape. ' +
      'Her collection Inside Her Roses (October 2021) gathers 83 poems on love, healing, Black womanhood and identity, and has been ' +
      'featured on the South African television series Gqeberha: The Empire and in interviews on Madibaz Radio and TRU FM. ' +
      'She has performed spoken word live in KuGompo City and Port Elizabeth. ' +
      'Alongside the poems she builds software: as founder of Mirembe Muse (Pty) Ltd she has shipped 17 live platforms, ' +
      'designed for the conditions most African users actually have, including prepaid data and load-shedding. ' +
      'She writes and builds in public at creativelynanda.co.za.',
  },
];

export interface Fact {
  label: string;
  value: string;
  source: string;
}

export const FACTS: Fact[] = [
  { label: 'Based in', value: 'KuGompo City, Eastern Cape, South Africa', source: 'Nanda' },
  { label: 'Heritage', value: 'Ugandan-South African', source: 'Nanda' },
  { label: 'Book', value: 'Inside Her Roses, October 2021, 83 poems', source: 'Published collection' },
  { label: 'Available on', value: 'Amazon, Apple Books, Kobo', source: 'Retailer listings' },
  { label: 'Company', value: 'Founder, Mirembe Muse (Pty) Ltd, founded 2025', source: 'Company records' },
  { label: 'Platforms built', value: '17 live', source: 'mirembemuse.co.za portfolio, confirmed 14 Nov 2026' },
  { label: 'Live performances', value: 'Five spoken word performances', source: 'Nanda' },
];

export interface Mention {
  outlet: string;
  type: 'Television' | 'Radio' | 'Stage';
  topic: string;
}

export const MENTIONS: Mention[] = [
  { outlet: 'Gqeberha: The Empire (Showmax)', type: 'Television', topic: 'Inside Her Roses and the poetry book launch' },
  { outlet: 'Madibaz Radio', type: 'Radio', topic: 'Published poet and entrepreneur feature' },
  { outlet: 'TRU FM', type: 'Radio', topic: 'Poetry and technology interview' },
  { outlet: 'Live spoken word', type: 'Stage', topic: 'Five performances in KuGompo City and Port Elizabeth' },
];

export interface Booking {
  title: string;
  line: string;
  subject: string;
}

export const BOOKINGS: Booking[] = [
  {
    title: 'A reading from Inside Her Roses',
    line: 'Spoken word from the collection, with the stories behind the poems. For festivals, launches, schools and community events.',
    subject: 'Booking enquiry: reading',
  },
  {
    title: 'The Poet Who Codes',
    line: 'A talk on holding two languages at once: the language of systems and the language of longing, and why a poet builds better software.',
    subject: 'Booking enquiry: The Poet Who Codes',
  },
  {
    title: 'Building AI in Africa',
    line: 'For tech and business audiences: what it takes to ship real products for prepaid data and load-shedding. The company kit has the full speaker brief.',
    subject: 'Booking enquiry: AI talk',
  },
];

export const mailtoPress = (subject: string) => `mailto:${PRESS_EMAIL}?subject=${encodeURIComponent(subject)}`;
