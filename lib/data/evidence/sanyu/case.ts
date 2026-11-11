import type { CaseFile } from '../types';

/**
 * Sanyu Botanicals case file. Static, typed, build-time data.
 * Sanyu is the founder's OWN brand and is stated plainly as such, never as a client case study.
 * Facts come from the JarvisOS product truth file (Aug 2026) and from what is visible on the screens.
 * No credentials, no private names, no em dashes. Every number comes from claims.ts via claimIds.
 */
export const SANYU_CASE: CaseFile = {
  app: 'sanyu',
  journeyTitle: 'A customer\'s first week',
  name: 'Sanyu Botanicals',
  promise:
    'Heritage botanical hair care for textured hair, hand-made in East London, sold through a shop that cannot sell the same jar twice.',
  liveUrl: 'https://sanyubotanicals.co.za',
  status: { label: 'Live', asOfLabel: 'Nov 2026' },
  paper: 'cherry',
  accent: '#7A1F3D',
  heroScreens: ['sanyu-152614', 'sanyu-153229', 'sanyu-153442', 'sanyu-153705'],
  coverClaims: ['sanyu.tables', 'sanyu.procedures', 'sanyu.sync'],

  slides: [
    {
      id: 'own',
      kicker: 'Whose it is',
      title: 'This one is mine.',
      body: [
        'Sanyu Botanicals is the founder\'s own brand, not a client project. It is where every lesson from building for clients gets tested with real stock and real customers.',
        'Sanyu means joy in Luganda, the language of the Buganda Kingdom in Uganda. The brand is women-owned and made by hand in East London, Eastern Cape.',
      ],
      screen: 'sanyu-153002',
    },
    {
      id: 'product',
      kicker: 'The product',
      title: 'Oil, balm and the ritual that joins them.',
      body: [
        'A cold-pressed Signature Oil, a Hair Growth Balm in two sizes, and sets that put them together.',
        'The ritual is two minutes and three movements: warm, feed, seal. It is on the page because the method is part of the product.',
      ],
      screen: 'sanyu-152614',
    },
    {
      id: 'science',
      kicker: 'The science',
      title: 'Cite the compound, not just the plant.',
      body: [
        'Black cumin is thymoquinone. Castor is ricinoleic acid. Rosemary is rosmarinic acid. Fenugreek is diosgenin. Chebe, from the Sara women of Chad, coats the hair to hold its length.',
        'Each ingredient card says what it does in one plain line, and the library behind it cites the studies instead of making claims.',
      ],
      screen: 'sanyu-153613',
    },
    {
      id: 'honest',
      kicker: 'Honest scarcity',
      title: 'If it says three left, there are three left.',
      body: [
        'Batches are small, so stock is real. The shop shows live counts and never fakes urgency.',
        'Underneath, the database reserves, commits and releases stock itself, so two people cannot buy the last jar at the same time.',
      ],
      claimIds: ['sanyu.procedures'],
      screen: 'sanyu-153411',
    },
    {
      id: 'circle',
      kicker: 'After the sale',
      title: 'Every order opens a door.',
      body: [
        'Inside each order is an Angel Card with a QR code that opens a private portal: botanical intelligence, a journal and a tier system called the Ascent.',
        'There is a wash-day planner and a length tracker so progress can be seen over time, and an AI hair coach that gives daily tips.',
      ],
      screen: 'sanyu-153040',
    },
    {
      id: 'proof',
      kicker: 'Proof',
      title: 'Built, stocked and selling.',
      body: ['The numbers carry a source and a date. The screens are the live shop.'],
      claimIds: ['sanyu.tables', 'sanyu.migrations', 'sanyu.procedures', 'sanyu.sync', 'sanyu.pargo'],
    },
  ],

  journey: [
    {
      day: 'Mon',
      where: 'Found',
      title: 'She searches the name',
      body: 'Someone hears about Sanyu and searches for it. The products come up on Amazon.co.za, and the brand\'s own shop is one click away.',
      screen: 'sanyu-193300',
      sampleData: false,
    },
    {
      day: 'Tue',
      where: 'The science',
      title: 'She reads what is in it',
      body: 'The ingredients page shows each botanical, what it does and the compound behind it. A customer with textured hair has been sold vague promises before, and this answers her.',
      screen: 'sanyu-153613',
      sampleData: false,
    },
    {
      day: 'Wed',
      where: 'The shop',
      title: 'She picks a set',
      body: 'The Ritual Duo, the Luxury Set or the Balm Pair, side by side, with stock status shown honestly.',
      screen: 'sanyu-153229',
      sampleData: false,
    },
    {
      day: 'Thu',
      where: 'The product',
      title: 'She sees what is left',
      body: 'The product page shows what is in the set and how many jars are left in the batch. The number comes from the same stock the till uses.',
      screen: 'sanyu-153411',
      sampleData: false,
    },
    {
      day: 'Fri',
      where: 'The Angel Circle',
      title: 'The ritual continues',
      body: 'Her order arrives with an Angel Card. She scans it, opens her private portal, and starts the journal and the length tracker.',
      screen: 'sanyu-153040',
      sampleData: false,
    },
  ],

  arch: [
    {
      id: 'shop',
      layer: 'clients',
      label: 'The storefront',
      what: 'A fast, photograph-led shop for phones first: products, sets, ingredients, story and journal.',
      why: 'Real photography is the texture. Competitors show only the finished product, so this one also shows the hands that make it.',
      alternative: 'Decorative CSS textures and stock imagery, which would hide the one thing that cannot be copied.',
      edges: ['checkout', 'stock'],
    },
    {
      id: 'portal',
      layer: 'clients',
      label: 'The Angel portal',
      what: 'A private area opened by the QR code on the Angel Card: botanical intelligence, a journal, a wash-day planner, a length tracker and the Ascent tiers.',
      why: 'The sale is the start of the relationship, and a physical card links the jar in her hand to her own page.',
      alternative: 'A newsletter alone, which has no tie to the product she is holding.',
      edges: ['coach'],
    },
    {
      id: 'checkout',
      layer: 'edge',
      label: 'Checkout and delivery',
      what: 'PayFast or manual EFT for payment. Delivery by Pargo pickup or door to door, free within Greater East London and free over a set order value.',
      why: 'South African customers pay by card or EFT and collect from a pickup point. The shop meets them there.',
      alternative: 'An international gateway and courier, which suit neither the buyers nor the margins.',
      claimIds: ['sanyu.pargo'],
      edges: ['stock'],
    },
    {
      id: 'stock',
      layer: 'data',
      label: 'Stock that cannot oversell',
      what: 'The database holds the stock. Stored procedures reserve the jar when it is added, commit it on payment and release it if the payment never comes.',
      why: 'A shop with batches of a few dozen cannot afford to sell the same jar twice. Enforcing it in the database means no page bug can break it.',
      alternative: 'Checking stock in the app code, which two simultaneous buyers can slip past.',
      claimIds: ['sanyu.tables', 'sanyu.migrations', 'sanyu.procedures'],
      edges: ['sync'],
    },
    {
      id: 'coach',
      layer: 'ai',
      label: 'The AI hair coach',
      what: 'A Claude-powered coach that gives daily tips, writes a monthly progress report from the length tracker and answers questions in conversation.',
      why: 'Hair care is a habit over months. A coach that remembers her progress keeps her going.',
      alternative: 'Generic tips in an email, which do not know her hair or her progress.',
      edges: [],
    },
    {
      id: 'sync',
      layer: 'jobs',
      label: 'Live sync to Jarvis OS',
      what: 'Every stock change is sent to the founder\'s private operating system as a signed webhook, so the owner sees live inventory in her own dashboard.',
      why: 'The brand is one of several. One place to see all the money and stock beats a login per shop.',
      alternative: 'Logging into the shop admin to look, which means nobody looks until something is wrong.',
      claimIds: ['sanyu.sync'],
      edges: [],
    },
  ],

  decisions: [
    {
      id: 'photos',
      decision: 'Real photography only, no synthetic textures.',
      alternatives: ['CSS textures and stock imagery', 'Studio shots of the finished product only'],
      why: 'The making is the difference. Hand-made in small batches is only believable if you can see it.',
      cost: 'Every image has to be shot, and the shoot never ends.',
      receipt: 'Product truth file, content rules, Aug 2026',
    },
    {
      id: 'scarcity',
      decision: 'Show live stock, and never fake urgency.',
      alternatives: ['A countdown timer', 'Always show low stock'],
      why: 'Small batches make scarcity real. Real scarcity needs no tricks, and tricks would spend the trust the brand is built on.',
      cost: 'A sold-out page loses the sale until the next batch is made.',
      receipt: 'Product truth file, content rules, Aug 2026',
    },
    {
      id: 'db-stock',
      decision: 'Put stock rules in the database, not the app.',
      alternatives: ['Check stock in the page code', 'A queue that serialises orders'],
      why: 'A database procedure is the one place every request passes through, so overselling is ruled out by construction.',
      cost: 'More SQL to write and migrate, and a harder thing to change quickly.',
      receipt: 'Product truth file, Sanyu evidence, Aug 2026',
    },
    {
      id: 'compound',
      decision: 'Name the compound, not only the ingredient.',
      alternatives: ['Marketing copy about natural goodness'],
      why: 'Customers with textured hair have heard the promises before. Naming the compound, and citing the study, is answerable.',
      cost: 'Every claim needs a source, so some nice sentences were cut.',
      receipt: 'Product truth file, active ingredients, Aug 2026',
    },
  ],

  proof: [
    { kind: 'claim', claimId: 'sanyu.tables' },
    { kind: 'claim', claimId: 'sanyu.migrations' },
    { kind: 'claim', claimId: 'sanyu.procedures' },
    { kind: 'claim', claimId: 'sanyu.sync' },
    { kind: 'claim', claimId: 'sanyu.pargo' },
    { kind: 'event', text: 'The products are listed on Amazon.co.za, found by searching the brand name.', asOfLabel: '30 Sep 2026' },
  ],

  video: { posterScreen: 'sanyu-152614', src: null, chapters: [] },
};
