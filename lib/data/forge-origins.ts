// The nine foundation projects — the material of /forge/origins.
//
// Source: project-docs/BUILD_JOURNEY_WhereItStarted.md (Nanda's own chronicle).
// Curated by hand rather than parsed out of forge-corpus.json: this is finished,
// public-facing prose, and the room's whole argument rests on its sequence.
//
// Ordered as the LEARNING ARCHITECTURE, not by date — each layer builds on the
// last. That sequence is the argument the room is making.
//
// ⚠️ `demo.status` was verified 2026-08-07. Re-check before shipping; one has
// already died since the chronicle was written. Never render a dead link as live.

export type DemoStatus = 'live' | 'archived';

/**
 * Where a retired demo's work continued. The Kustom Krafts deployment is gone
 * (404, re-verified 2026-08-08), but the client-work demos it belonged to now
 * live as a maintained gallery on the business site — which is also the right
 * side of the split: mirembemuse sells the service, this room only tells the
 * story of learning to build it.
 */
export const DEMO_GALLERY = {
  url: 'https://mirembemuse.co.za/demos',
  label: 'Current demo gallery',
} as const;

export interface OriginProject {
  n: number;
  slug: string;
  title: string;
  subtitle: string;
  type: string;
  layer: number;
  stack: string[];
  github: string;
  demo?: { url: string; status: DemoStatus; supersededByGallery?: boolean };
  brief: string;
  build: string;
  lesson: string;      // the doorway line — every card ends here
  outcome?: string;
  built?: string;
}

export const LAYERS: Record<number, string> = {
  1: 'Fundamentals — HTML, CSS, vanilla JavaScript',
  2: 'API integration — external data, async, state',
  3: 'Full-stack — auth, persistence, multi-role systems',
  4: 'Real-time & payments — WebSockets, gateways, webhooks',
  5: 'Co-founder — product thinking at architecture level',
  6: 'Client work — real briefs, real delivery',
};

export const ORIGINS: OriginProject[] = [
  {
    n: 1,
    slug: 'youtube-clone',
    title: 'The YouTube Clone',
    subtitle: 'UI reverse-engineering · the foundation for WatchSankofa',
    type: 'Technical foundation study',
    layer: 1,
    built: 'July 13, 2025',
    stack: ['HTML5', 'CSS3', 'Vanilla JavaScript'],
    github: 'https://github.com/Nanda-Regine/CreativelyNanda-Youtube-clone',
    brief:
      'Before building an African-first streaming platform, it was necessary to deeply understand the product being improved upon. Not a tutorial exercise — a reverse-engineering session conducted with one question in mind: what does YouTube get wrong for African creators?',
    build:
      'YouTube\'s full interface rebuilt from scratch in pure HTML and CSS. No React, no API, no framework. Sidebar navigation, top nav with search, a four-column video grid. Every thumbnail branded @CreativelyNanda — a poetry short film, a web dev study plan, a lookbook, a build-in-public vlog. View counts written by hand.',
    lesson:
      'Fundamentals before frameworks. The developer who can build YouTube\'s UI in raw CSS understands the web. The clone is the research — and the thumbnails are the autobiography. In July 2025 she had not yet built a single SaaS app, but the thumbnails already knew who she was going to become.',
  },
  {
    n: 2,
    slug: 'yellowwood-retreat',
    title: 'Women\'s Retreat: Yellowwood Forest',
    subtitle: 'Immersive landing experience',
    type: 'Client work',
    layer: 1,
    stack: ['HTML5', 'CSS3', 'Vanilla JavaScript'],
    github: 'https://github.com/Nanda-Regine/women-retreat-yellowwood-forest',
    demo: { url: 'https://women-retreat-yellowwood-forest.vercel.app/', status: 'live' },
    brief:
      'A wellness retreat operator in the Eastern Cape needed a digital presence that could do what a personal recommendation does: make a potential guest feel safe before she had met anyone. The audience would not book anything they could not trust.',
    build:
      'The project began at the emotional destination — what should a visitor feel ten seconds after landing? — and worked backwards to the technical decisions. The answer was: held. Full-bleed nature photography served with optimal loading, a serif display face that slows the reader down, content sequenced to answer emotional questions before practical ones, and zero clutter that might break the spell.',
    lesson:
      'Design is an argument. Every visual decision argues for something. This one argued: we see you, this is safe, you belong here. It was also the first lesson in the gap between a technically correct website and an emotionally effective one — both render in the browser, only one converts.',
  },
  {
    n: 3,
    slug: 'kustom-krafts',
    title: 'Kustom Krafts',
    subtitle: 'Carpentry business digital identity',
    type: 'Client work',
    layer: 1,
    stack: ['HTML5', 'CSS3', 'Vanilla JavaScript'],
    github: 'https://github.com/Nanda-Regine/kustom-krafts',
    demo: { url: 'https://kustom-krafts.vercel.app/', status: 'archived', supersededByGallery: true },
    brief:
      'A South African carpentry and joinery business with genuine craft and zero digital presence. All business by word of mouth. The brief: build something that looks serious enough to justify serious prices.',
    build:
      'The first decision was the most important — the portfolio gallery goes above the fold. Not the pitch, not the pricing: the work. In the trades market the product sells itself if you can see it. Then image performance on a static build: aspect-ratio locks against layout shift, native lazy loading, WebP recommendations for the client\'s own photography workflow. The WhatsApp deep link was the conversion insight.',
    lesson:
      'WhatsApp is the South African UX pattern. Every product built for this market since — AdminOS, StokvelOS, Campus Compass — has it built in, and this project is where that conviction formed. Second lesson: zero dependencies is a feature for the right client. A carpenter cannot maintain a React app. A static site that works for five years without intervention is the better outcome.',
  },
  {
    n: 4,
    slug: 'moodcast',
    title: 'MoodCast',
    subtitle: 'Weather × poetry × self-care',
    type: 'Personal · creative · technical study',
    layer: 2,
    stack: ['HTML5', 'CSS3', 'Vanilla JavaScript', 'OpenWeatherMap API'],
    github: 'https://github.com/Nanda-Regine/my-weather-app',
    brief:
      'Every developer who has finished an introductory JavaScript course has built a weather app. The question was: what does a weather app built by a published poet look like?',
    build:
      'The technical work — API key, geolocation, fetch, parse, render — was the fastest part. The real build was the content library: original poems written for each weather condition, self-care rituals matched to each, and one addition no tutorial suggests — the load shedding mood card, pairing an outage with candle rituals and a poem about sitting in the dark.',
    lesson:
      'The standard project is the starting point, not the destination. Every tutorial in the curriculum was treated as a brief: what would this look like if it were actually good? The weather app became MoodCast. The YouTube clone became research. The load shedding card is a product insight, not a joke — products that acknowledge the lived reality of their users earn trust that technically superior competitors cannot buy.',
  },
  {
    n: 5,
    slug: 'chanty-shuttle',
    title: 'Chanty Shuttle Services',
    subtitle: 'Transport business web presence',
    type: 'Client work · tiered engagement',
    layer: 6,
    stack: ['HTML5', 'CSS3', 'Vanilla JavaScript'],
    github: 'https://github.com/Nanda-Regine/Transport-shuttle-os',
    brief:
      'A real transport operator with reliable vehicles, quality service and zero digital presence. The engagement spanned a Growth Package and a planned Vision Package — the first multi-tiered client service model.',
    build:
      'Growth Package scoped as a complete digital foundation: website with booking inquiry flow, Google Business Profile, social templates, WhatsApp Business, local SEO. The intellectual breakthrough was the affiliate architecture — Chanty\'s existing corporate clients and hotel partners could become passive referral sources if the incentive structure was right. Track, attribute, reward: happy clients become a distribution channel.',
    lesson:
      'Tiered pricing is a product design problem. Growth → Vision solved the SA SME budget reality: businesses want comprehensive digital services but cannot afford everything at once. And client work seeds product ideas — this engagement crystallised the question that became AdminOS: why is every SME owner manually managing communication, bookings, invoicing and staff on WhatsApp?',
    outcome: 'R34,000 Growth Package delivered. First demonstration of the B2B commercial model.',
  },
  {
    n: 6,
    slug: 'cortex-hub',
    title: 'Cortex Hub Booking',
    subtitle: 'Smart workspace booking platform',
    type: 'Full-stack SaaS prototype',
    layer: 3,
    stack: ['Next.js', 'TypeScript', 'Supabase', 'PayFast', 'Resend', 'Tailwind CSS'],
    github: 'https://github.com/Nanda-Regine/Cortex-Hub-Booking',
    demo: { url: 'https://cortex-hub-booking-5e35.vercel.app/', status: 'live' },
    brief:
      'Shared workspaces and creative hubs in South Africa are managed via WhatsApp and paper registers. Double bookings happen, revenue leaks, no-shows go unmanaged. A real booking system exists for hotels and airlines — why not for creative hubs?',
    build:
      'The first complete commercial data model: spaces, bookings, members, payments, availability. The deceptively simple question — is this space free? — was the hardest problem in the portfolio to that point. It is not an equality comparison but an interval-overlap problem that must survive partial overlaps, simultaneous submissions, and the difference between a soft hold and a confirmed reservation. Solved with PostgreSQL\'s tsrange and its overlap operator, as a database constraint rather than in application code.',
    lesson:
      'Database primitives first, application code second. Every problem that can be solved in the database should be — availability checking, uniqueness, concurrent booking prevention belong in PostgreSQL, not in a server action. This principle now governs the Supabase architecture across every application.',
  },
  {
    n: 7,
    slug: 'greenvault',
    title: 'GreenVault',
    subtitle: 'Sustainable commerce platform',
    type: 'Full-stack eCommerce architecture',
    layer: 4,
    stack: ['Next.js', 'TypeScript', 'Supabase', 'PayFast', 'Resend', 'Tailwind CSS'],
    github: 'https://github.com/Nanda-Regine/GreenValut-eCommerce-store-demo',
    demo: { url: 'https://green-valut-e-commerce-store-demo.vercel.app/', status: 'live' },
    brief:
      'South African sustainable products — natural hair care, organic food, ethical textiles — are scattered and underrepresented digitally. GreenVault was built to demonstrate a curated, values-aligned African eco-commerce platform, and to solve the full stack: catalogue, cart, checkout, payment, digital delivery.',
    build:
      'The most technically comprehensive foundation project. The data model had to survive real-world usage: concurrent carts, failed payments, partial refunds, digital goods expiry. The delivery flow was the most interesting component — PayFast sends an ITN to a webhook on confirmation, and that handler must validate the signature, update order status, generate a signed Storage URL with a 48-hour expiry, and dispatch the confirmation email, all in one atomic server action.',
    lesson:
      'PayFast ITN handling is the foundation of SA eCommerce. The signature verification pattern, the idempotency requirement — the same ITN can arrive repeatedly, so the handler must be safe to run again — and the async email dispatch are now standard across every payment-enabled product. eCommerce architecture also scales to SaaS: the multi-role patterns and the order state machine reappear everywhere.',
  },
  {
    n: 8,
    slug: 'poetrytube',
    title: 'PoetryTube',
    subtitle: 'A video platform for poets',
    type: 'Community platform · creative technology',
    layer: 4,
    stack: ['Next.js', 'TypeScript', 'Supabase', 'Mux', 'Tailwind CSS'],
    github: 'https://github.com/Nanda-Regine/PoetryTube',
    demo: { url: 'https://poetry-tube.vercel.app/', status: 'live' },
    brief:
      'YouTube has no concept of spoken word as a distinct cultural form. Its algorithm cannot surface a performance in isiZulu or Luganda to the audiences who speak those languages, and has no incentive to care. Poets who build audiences there succeed despite the platform, not because of it. This one is personal.',
    build:
      'Live applause was the hardest and most important problem here. Supabase Realtime presence and broadcast channels carry it: a viewer taps applause during a performance, a broadcast reaches every connected client, and the counter moves for everyone at once. That shared moment turns watching from asynchronous consumption into a live cultural event. Language was then treated as a discovery dimension equal to category or theme.',
    lesson:
      'The most personal project is the most differentiated. PoetryTube is technically complex — real-time systems, video processing, community architecture — but that is not what makes it stand out. It was built by a published poet who has lived the exact problem it solves. Biographical legitimacy cannot be engineered. It can only be honoured.',
  },
  {
    n: 9,
    slug: 'trueaccapp',
    title: 'TrueAccApp',
    subtitle: 'Location-based accessibility platform',
    type: 'Co-founder · social impact',
    layer: 5,
    stack: ['Next.js', 'TypeScript', 'Mapbox GL JS', 'Supabase', 'Tailwind CSS'],
    github: 'https://github.com/Nanda-Regine/TrueAccApp',
    demo: { url: 'https://true-access-app.vercel.app/', status: 'live' },
    brief:
      'Four million South Africans live with disabilities, and there is no comprehensive, community-verified accessibility database for South African public spaces. TrueAccApp was built to create one.',
    build:
      'Four capabilities engaged for the first time: Mapbox GL JS for spatial data, co-founder collaboration on architecture, a crowdsourced data model with contribution validation, and WCAG compliance as a primary engineering constraint rather than a retrofit. The community model needed a schema that tracked not just location data but confidence in it — how many contributors had verified a place, when, and whether it had been flagged.',
    lesson:
      'Constraints produce better design. Building for visual impairments, motor limitations and cognitive differences forces decisions that make the product better for everyone — semantic HTML, keyboard navigation, readable contrast. These are not accessibility features, they are quality standards. And co-founding requires explicit alignment: prioritisation, scope and decision authority are a leadership problem no solo build can teach.',
  },
];

// The intellectual property no repository can contain — the closing wall of the room.
export const THROUGHLINE: string[] = [
  'Emotional architecture before technical implementation.',
  'WhatsApp is the SA UX pattern — integrate or be irrelevant here.',
  'PayFast ITN is the foundation of SA commerce — learn it once, deploy it everywhere.',
  'Database primitives before application code.',
  'Zero dependencies is a feature for the right context.',
  'Client work seeds product ideas — every manual SME process is a future feature.',
  'Clone to learn, not to copy.',
  'Accessibility is a quality standard, not a feature.',
  'The personal project is the most differentiated.',
];
