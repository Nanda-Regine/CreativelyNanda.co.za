/**
 * AdminOS price list as published on https://adminos.co.za (#pricing), read 11 Nov 2026.
 * This is the ONLY evidence file allowed to hold prices (check-content.mjs exempts it by name).
 * Annual terms are left out on purpose: the live site gives two different statements.
 * If the live list changes, update this file and asOfLabel together.
 */
export interface PricePlan {
  name: string;
  price: string;
  who: string;
  includes: string[];
  popular?: boolean;
  contactOnly?: boolean;
}

export const ADMINOS_PRICING = {
  asOfLabel: '11 Nov 2026',
  source: 'adminos.co.za, pricing section',
  sourceUrl: 'https://adminos.co.za/#pricing',
  note: 'All prices in South African Rand. No setup fees, no lock-in, 14-day free trial without a card.',
  plans: [
    {
      name: 'Solo',
      price: 'R349',
      who: '1 person, 100 conversations a month',
      includes: ['Inbox and Debt Recovery agents', 'Daily business brief', 'POPIA compliance centre'],
    },
    {
      name: 'Grow',
      price: 'R899',
      who: 'Up to 5 staff, 500 conversations a month',
      includes: ['All 6 AI agents', 'Employee OS: clock-in, shifts, leave', 'Document intelligence'],
      popular: true,
    },
    {
      name: 'Operate',
      price: 'R1,999',
      who: 'Up to 20 staff, 2,000 conversations a month',
      includes: ['Tasks, SOPs, inventory', 'Payroll with PAYE, UIF and SDL', 'Compliance calendar'],
    },
    {
      name: 'Scale',
      price: 'R3,999',
      who: 'Up to 100 staff, unlimited conversations',
      includes: ['Business valuation engine', 'Multi-location branches', 'Board pack generation and SLA'],
    },
    {
      name: 'Partner',
      price: 'R9,999',
      who: 'White-label resellers',
      includes: ['Your brand on the platform'],
      contactOnly: true,
    },
  ] as PricePlan[],
  addons: [
    { name: 'Ring, AI voice agent', price: 'R349' },
    { name: 'Reach, WhatsApp broadcasts', price: 'R199' },
    { name: 'Client Portal', price: 'R299' },
    { name: 'Languages, multilingual replies', price: 'R99' },
  ],
};
