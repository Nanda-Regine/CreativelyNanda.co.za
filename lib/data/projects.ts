export type ProjectStatus = 'live' | 'beta' | 'building'
export type ProjectCategory = 'saas' | 'origin' | 'media' | 'portfolio'

export interface BuildPhase {
  phase: string
  title: string
  date: string
  commits?: string
  milestone: string
}

export interface Project {
  id: string
  name: string
  tagline: string
  description: string
  problem: string
  solution: string
  impact: string
  status: ProjectStatus
  category: ProjectCategory
  liveUrl?: string
  githubUrl?: string
  stack: { category: string; items: string[] }[]
  buildPhases: BuildPhase[]
  metrics: { label: string; value: string }[]
  accentColor: string
  buildJourneyFile?: string
  buildDuration: string
  startedFrom?: string
}

export const PROJECTS: Project[] = [
  {
    id: 'adminos',
    name: 'AdminOS',
    tagline: 'The OS that runs your business while you sleep.',
    description:
      'Multi-tenant AI-powered business operating system for South African SMEs, NGOs, schools, clinics, and government. Five specialist AI agents handle WhatsApp inbox, debt recovery, staff wellness, document intelligence, and analytics — automatically.',
    problem:
      "Africa's businesses run on WhatsApp. Millions of messages land every day — client queries, invoice follow-ups, complaints — and behind each one is a human manually chasing, copying, repeating. South African SMEs had zero professional infrastructure to automate this.",
    solution:
      'AdminOS handles the full admin layer automatically. WhatsApp-native inbox. Five AI specialist agents. Xero invoicing. Redis-cached FAQ layer. Immutable audit logs. Load-shedding resilient. Built for all 11 official South African languages.',
    impact:
      "South Africa's first AI-native business OS. Replaces 6 separate subscriptions. 85% AI cost reduction via Claude prompt caching. Multi-tenant architecture serves unlimited businesses from a single deployment.",
    status: 'live',
    category: 'saas',
    liveUrl: 'https://adminos.co.za',
    githubUrl: 'https://github.com/Nanda-Regine/AdminOS',
    stack: [
      { category: 'Frontend', items: ['Next.js 14 App Router', 'TypeScript (strict)', 'Tailwind CSS', 'Zustand'] },
      { category: 'AI', items: ['Claude claude-sonnet-4-6 (prompt caching)', '5 specialist agent architecture', 'Redis FAQ cache layer'] },
      { category: 'Database', items: ['Supabase PostgreSQL', 'Row-Level Security multi-tenancy', 'Supabase Realtime'] },
      { category: 'Messaging', items: ['Meta WhatsApp Cloud API', 'Resend transactional email'] },
      { category: 'Infrastructure', items: ['Upstash Redis', 'Vercel Edge + Cron (4 scheduled jobs)', 'Inngest async queues', 'Sentry'] },
      { category: 'Payments & Integrations', items: ['PayFast ZAR', 'Xero API', 'PostHog analytics'] },
    ],
    buildPhases: [
      { phase: '1', title: 'Foundation', date: 'Feb 2026', commits: '47', milestone: 'Multi-tenant Supabase schema, RLS policies, JWT auth, TypeScript types' },
      { phase: '2', title: 'WhatsApp Engine', date: 'Feb 2026', commits: '63', milestone: 'WhatsApp webhook, WorkflowEngine, Claude integration, Redis dedup, HMAC auth' },
      { phase: '3', title: 'Dashboard', date: 'Mar 2026', commits: '82', milestone: 'Realtime dashboard, 7 dashboard routes, inbox, analytics, Supabase Realtime push' },
      { phase: '4', title: 'Agents', date: 'Mar 2026', commits: '55', milestone: 'Debt recovery cron (escalating), wellness check-ins, document intelligence, daily brief' },
      { phase: '5', title: 'Launch', date: 'Mar 2026', commits: '34', milestone: 'PayFast billing, 15-minute onboarding wizard, Xero integration, production deploy' },
    ],
    metrics: [
      { label: 'AI agents', value: '5' },
      { label: 'AI cost reduction', value: '85%' },
      { label: 'SA languages', value: '11' },
      { label: 'Build time', value: '5 weeks' },
    ],
    accentColor: '#C9943A',
    buildJourneyFile: 'adminos-build-journey.md',
    buildDuration: '5 weeks from zero to multi-tenant production',
  },
  {
    id: 'varsityos',
    name: 'VarsityOS — Campus Compass',
    tagline: "South Africa's first AI student companion.",
    description:
      "Progressive Web App for SA's 11 million university and TVET students. AI companion Nova trained on SA-specific stressors — NSFAS delays, load shedding, imposter syndrome, exam anxiety. Six independent AI agents share one Supabase database. Installable. Offline-capable.",
    problem:
      "South Africa has a 50%+ dropout rate. Students navigate NSFAS funding delays, load shedding, food insecurity, and academic pressure with tools built for students in California. Nothing existed for the R50-budget meal planner on 3G who needs crisis support at 2am.",
    solution:
      'Nova — an AI companion who understands NSFAS, speaks SA campus language, manages study plans and budgets, generates R50 meals from available ingredients, and surfaces SADAG + Lifeline SA when it detects a mental health crisis.',
    impact:
      "200+ active students in beta. Addresses SA's 50% dropout rate with culturally fluent AI support. Only PWA in SA built specifically for township internet speeds.",
    status: 'live',
    category: 'saas',
    liveUrl: 'https://varsityos.co.za',
    githubUrl: 'https://github.com/Nanda-Regine/campus-compass',
    stack: [
      { category: 'Frontend', items: ['Next.js 14 App Router', 'TypeScript', 'Tailwind CSS', 'PWA (installable, offline-first)', 'Zustand'] },
      { category: 'Forms & Validation', items: ['React Hook Form + Zod'] },
      { category: 'AI', items: ['Claude claude-sonnet-4-6', '6 independent agents on shared DB', 'Crisis detection & routing'] },
      { category: 'Database', items: ['Supabase PostgreSQL + RLS', 'Supabase Auth'] },
      { category: 'Payments', items: ['PayFast ZAR — Free/R39/R79 tiers'] },
      { category: 'Infrastructure', items: ['Vercel', 'Resend', 'PostHog', 'Sentry', 'Firebase Push (VAPID)'] },
    ],
    buildPhases: [
      { phase: '1', title: 'Nova AI Core', date: 'Jan 2026', milestone: 'Conversational AI with SA student context, Supabase auth, chat history' },
      { phase: '2', title: 'Study Engine', date: 'Jan 2026', milestone: 'Timetable, modules, exams, tasks, AI study planner agent' },
      { phase: '3', title: 'Budget + Meals', date: 'Feb 2026', milestone: 'NSFAS budget tracker, animated spending ring, AI recipe generator agent' },
      { phase: '4', title: 'Crisis Layer', date: 'Feb 2026', milestone: 'Mental health detection, SADAG/Lifeline surfacing, daily wellness check-in agent' },
      { phase: '5', title: 'Monetisation + PWA', date: 'Mar 2026', milestone: 'PayFast three-tier pricing, Scholar/Premium caps, email flows, installable PWA' },
    ],
    metrics: [
      { label: 'Active students', value: '200+' },
      { label: 'AI agents', value: '6' },
      { label: 'Target market', value: '11M students' },
      { label: 'Stress reduction', value: '40%' },
    ],
    accentColor: '#2D4A22',
    buildJourneyFile: 'varsityos-build-journey.md',
    buildDuration: '6 weeks — concept to live PWA',
  },
  {
    id: 'stokvelos',
    name: 'StokvelOS',
    tagline: 'R50 billion moves through stokvels. Finally, infrastructure to protect it.',
    description:
      "South Africa's first AI-powered stokvel management platform. Contribution tracking, AI governance reports, meeting minutes generation, WhatsApp reminders, fraud pattern detection. Built for the R50B+ community savings economy.",
    problem:
      'R11 billion moves through South African stokvels annually — total economy over R50 billion. Most run on WhatsApp threads and paper ledgers. Disputes, missed contributions, and fraud dissolve community trust and destroy generational savings.',
    solution:
      'Digital stokvel infrastructure with AI governance. Automated contribution tracking. Monthly AI compliance health reports. AI meeting minutes from rough notes. Smart fraud detection. WhatsApp reminders personalised per member.',
    impact:
      'First mover in a R50B market that has never had formal digital infrastructure. 3 stokvels in structured beta.',
    status: 'beta',
    category: 'saas',
    liveUrl: 'https://stokvelos.co.za',
    githubUrl: 'https://github.com/Nanda-Regine/StokvelOS',
    stack: [
      { category: 'Frontend', items: ['Next.js 14', 'TypeScript', 'Tailwind CSS'] },
      { category: 'AI', items: ['Claude claude-sonnet-4-6', 'AI health reports', 'Meeting minutes generator', 'Fraud pattern recognition'] },
      { category: 'Database', items: ['Supabase PostgreSQL + RLS'] },
      { category: 'Messaging', items: ['Meta WhatsApp Cloud API', 'Resend'] },
      { category: 'Analytics', items: ['Vercel Analytics', 'Speed Insights', 'PostHog', 'GA4'] },
    ],
    buildPhases: [
      { phase: '1', title: 'Core Schema', date: 'Jan 2026', milestone: 'Members, contributions, meetings schema with RLS, multi-stokvel isolation' },
      { phase: '2', title: 'Admin Dashboard', date: 'Feb 2026', milestone: 'Contribution tracking, member management, ledger reporting' },
      { phase: '3', title: 'AI Governance', date: 'Feb 2026', milestone: 'Monthly health reports, meeting minutes generator, fraud detection' },
      { phase: '4', title: 'WhatsApp Layer', date: 'Mar 2026', milestone: 'Personalised member reminders, contribution confirmation notifications' },
    ],
    metrics: [
      { label: 'SA stokvel economy', value: 'R50B+' },
      { label: 'Participants', value: '11M' },
      { label: 'Beta stokvels', value: '3' },
      { label: 'Category position', value: 'First mover' },
    ],
    accentColor: '#C9A84C',
    buildJourneyFile: 'stokvelos-build-journey.md',
    buildDuration: '7 weeks',
  },
  {
    id: 'k53',
    name: 'K53 Drill Master',
    tagline: 'Pass your K53 first time. Or drill until you do.',
    description:
      "Adaptive learning platform targeting SA's 60%+ K53 learner licence failure rate. Tracks weak areas per user, adjusts difficulty dynamically. Mobile-first for budget Android on 3G. Road Signs, Road Rules, Vehicle Controls — all vehicle codes.",
    problem:
      "South Africa has one of the worst K53 pass rates in the world. Most people fail not because they can't drive — but because they've never seen the actual question formats under timed pressure. The existing tools: a R150 booklet and a website from 2009.",
    solution:
      'A mobile-first drill app — not a study guide. Repetition until it sticks. Adaptive engine tracks weak areas and adjusts difficulty. All vehicle codes. Full mock tests. Timer. DLTC-style pass/fail scoring. Designed for 360px budget Android screens.',
    impact:
      '50+ paying users. 4.8/5 average rating. Top 10 organic search for "K53 practice test". Phase 0 shipped in a single day.',
    status: 'live',
    category: 'saas',
    liveUrl: 'https://k53drillmaster.co.za',
    githubUrl: 'https://github.com/Nanda-Regine/nanda-k53-drill-master',
    stack: [
      { category: 'Frontend', items: ['React 18', 'Vite', 'TypeScript'] },
      { category: 'State', items: ['React state + localStorage (deliberately no over-engineering)'] },
      { category: 'Design', items: ['Mobile-first (360px budget Android)', 'Georgia serif — intentional (feels like a printed test booklet)'] },
      { category: 'Payments', items: ['PayFast ZAR'] },
      { category: 'Monitoring', items: ['PostHog', 'Sentry', 'GA4'] },
    ],
    buildPhases: [
      { phase: '0', title: 'Problem Definition → Deployed', date: '2026-02-27', commits: '1', milestone: 'Defined the problem at 09:00. Gauntlet mode + Pattern Trainer deployed by end of day.' },
      { phase: '1', title: 'Road Rules Gauntlet', date: '2026-02-27', commits: '2', milestone: 'Road Rules added, vehicle code picker, 120 questions across all codes' },
      { phase: '2', title: 'Road Signs (SVG)', date: '2026-02-27', commits: '3', milestone: '38 SVG signs, 4 categories, custom rendering' },
      { phase: '3', title: 'Vehicle Controls', date: '2026-02-27', commits: '4', milestone: '30 vehicle control questions, Code 8 complete' },
      { phase: '4', title: 'Mock Test Engine', date: 'Mar 2026', commits: '12', milestone: 'Full mock K53 test, countdown timer, DLTC pass/fail scoring' },
      { phase: '5', title: 'Adaptive Engine', date: 'Mar 2026', milestone: 'Weak area tracking, difficulty adjustment, personalised drill sets per user' },
    ],
    metrics: [
      { label: 'Paying users', value: '50+' },
      { label: 'Average rating', value: '4.8/5' },
      { label: 'SEO position', value: 'Top 10' },
      { label: 'Phase 0 speed', value: '1 day' },
    ],
    accentColor: '#2D4A22',
    buildJourneyFile: 'k53-build-journey.md',
    buildDuration: 'Phase 0 in 1 day. Full v1 in 3 weeks.',
  },
  {
    id: 'watchsankofa',
    name: 'WatchSankofa — Sankofa TV',
    tagline: 'Netflix was built for Hollywood. Sankofa TV was built for us.',
    description:
      'Pan-African creative content platform for filmmakers, musicians, poets, writers, and storytellers. Built from the ground up for the continent — its connectivity realities, 2,000+ languages, and mobile-first majority. Not a clone. An original.',
    problem:
      'African creative content has always had to fit itself into platforms built by and for Western audiences. The algorithms, payment rails, discovery mechanisms, and infrastructure — none of it was built for 1.4 billion Africans creating in 2,000+ languages.',
    solution:
      'African creator infrastructure. Full streaming, authentication, content management, creator profiles, discovery, and community tools. Built mobile-first, low-bandwidth optimised, designed from day one for the continent.',
    impact:
      "The only streaming platform built specifically for African creators and African audiences. Cinematic design system expressing Africa's visual language. Renamed from AfriFlix to WatchSankofa — deeper cultural alignment.",
    status: 'live',
    category: 'media',
    liveUrl: 'https://watchsankofa.co.za',
    githubUrl: 'https://github.com/Nanda-Regine/AfriFlix',
    stack: [
      { category: 'Frontend', items: ['Next.js 14', 'TypeScript', 'Syne display font', 'Custom cinematic design system'] },
      { category: 'Streaming', items: ['Cloudflare Stream', 'Supabase Storage', 'CDN-optimised delivery'] },
      { category: 'Database', items: ['Supabase PostgreSQL + RLS', 'Zustand', 'Custom hooks'] },
      { category: 'Design System', items: ['Black / Gold / Terracotta / Ivory palette', 'Syne + editorial typography'] },
      { category: 'Infrastructure', items: ['Vercel', 'Cloudinary', 'PostHog', 'Sentry'] },
    ],
    buildPhases: [
      { phase: '1', title: 'Static Foundation (AfriFlix)', date: 'Jan 2026', milestone: 'HTML/CSS/JS landing, concept validated, AFRIFLIX_MASTER_PROMPT.md written' },
      { phase: '2', title: 'Next.js Platform Rebuild', date: 'Feb 2026', milestone: 'Full migration, auth, database schema, streaming architecture, content management' },
      { phase: '3', title: 'Creator Tools', date: 'Mar 2026', milestone: 'Upload system, creator profiles, content discovery, community layer' },
      { phase: '4', title: 'Sankofa Rebrand', date: 'Mar 2026', milestone: 'AfriFlix → WatchSankofa. Cinematic design system. Cultural alignment deepened.' },
    ],
    metrics: [
      { label: 'Target continent', value: '1.4B people' },
      { label: 'African languages', value: '2,000+' },
      { label: 'Nations', value: '54' },
      { label: 'Category', value: 'First mover' },
    ],
    accentColor: '#C9943A',
    buildJourneyFile: 'sankofatv-build-journey.md',
    buildDuration: '8 weeks from static HTML to full streaming platform',
  },
  {
    id: 'creativelynanda',
    name: 'CreativelyNanda.co.za',
    tagline: 'The portfolio that became a platform.',
    description:
      'Personal brand hub — 72 commits, most iterated repo. Features multilingual blog "The Current", Notion template sales with automated delivery, project showcases, poetry section, Nanda AI chatbot, PayFast integration, and email automation via Resend.',
    problem:
      'A standard portfolio site cannot hold a creative technologist who is also a published poet, a founder, a cultural technologist, and an AI engineer. The site needed to be as layered and alive as its owner.',
    solution:
      'A full-stack platform disguised as a portfolio. AI chatbot trained on portfolio content. Multilingual via Next.js locales. Editorial blog. Template sales with automated delivery. Magazine-cover homepage.',
    impact:
      'Primary credibility engine for all client work and fellowship applications. Direct sales channel for digital products. The most technically complex personal site in South African tech.',
    status: 'live',
    category: 'portfolio',
    liveUrl: 'https://creativelynanda.co.za',
    githubUrl: 'https://github.com/Nanda-Regine/CreativelyNanda.co.za',
    stack: [
      { category: 'Frontend', items: ['Next.js 14', 'TypeScript + JavaScript', 'Tailwind CSS', 'Framer Motion'] },
      { category: 'AI', items: ['Nanda AI chatbot', 'Claude API', 'RAG on portfolio content'] },
      { category: 'Database', items: ['Supabase PostgreSQL'] },
      { category: 'i18n', items: ['Next.js locales', 'Multi-language content'] },
      { category: 'Commerce', items: ['PayFast ZAR', 'Automated Notion template delivery'] },
      { category: 'Email', items: ['Resend transactional automation'] },
      { category: 'Analytics', items: ['PostHog', 'GA4', 'GTM', 'Search Console'] },
    ],
    buildPhases: [
      { phase: '1', title: 'Portfolio Foundation', date: 'Aug 2025', milestone: 'First deployment, project showcase, about page, contact' },
      { phase: '2', title: 'The Current (Blog)', date: 'Oct 2025', milestone: 'Editorial blog with Cormorant Garamond design system' },
      { phase: '3', title: 'Nanda AI Chatbot', date: 'Dec 2025', milestone: 'Claude API chatbot with RAG on portfolio documents' },
      { phase: '4', title: 'Commerce Layer', date: 'Jan 2026', milestone: 'PayFast, Notion template sales, automated delivery, Resend email' },
      { phase: '5', title: 'Magazine Transformation', date: 'Apr 2026', milestone: 'Full-bleed magazine cover hero, editorial redesign, POPIA compliance display' },
    ],
    metrics: [
      { label: 'GitHub commits', value: '72+' },
      { label: 'Features', value: 'AI + Blog + Shop + i18n' },
      { label: 'Build months', value: '9' },
      { label: 'Iteration rank', value: '#1 repo' },
    ],
    accentColor: '#C9A84C',
    buildJourneyFile: 'creativelynanda-build-journey.md',
    buildDuration: '9 months of continuous iteration — the living portfolio',
  },
  {
    id: 'origins',
    name: 'The Origin Projects',
    tagline: 'Where it started: zero knowledge, first commit.',
    description:
      'freeCodeCamp certification projects — the HTML/CSS/JavaScript foundation that preceded 7 production SaaS applications. Responsive web design, JavaScript algorithms, front-end React libraries. Built mid-2025 from absolute zero.',
    problem:
      'The real problem: Could someone with zero coding background teach themselves to build production software in under a year? These projects were the first answer.',
    solution:
      'Systematic curriculum progression. Every certification project shipped and submitted. No shortcuts. The discipline learned here became the discipline that shipped 7 apps in 9 months.',
    impact:
      'Every line of production code in all 7 apps traces back to this foundation. The origin story that makes the full journey extraordinary.',
    status: 'live',
    category: 'origin',
    startedFrom: 'Zero coding knowledge · Mid-2025',
    githubUrl: 'https://github.com/Nanda-Regine',
    stack: [
      { category: 'Core', items: ['HTML5', 'CSS3', 'Vanilla JavaScript', 'Responsive Design'] },
      { category: 'Libraries', items: ['React', 'D3.js', 'Bootstrap', 'jQuery'] },
      { category: 'Certifications', items: ['fCC Responsive Web Design', 'fCC JavaScript Algorithms', 'fCC Front-End Libraries'] },
    ],
    buildPhases: [
      { phase: '1', title: 'Responsive Web Design', date: 'Jul 2025', milestone: 'HTML/CSS fundamentals, accessibility, responsive layouts, first deployed project' },
      { phase: '2', title: 'JavaScript Algorithms', date: 'Aug 2025', milestone: 'Data structures, algorithms, functional programming patterns' },
      { phase: '3', title: 'Front-End Libraries', date: 'Sep 2025', milestone: 'React, SASS, Bootstrap, D3.js — the component model that scales to SaaS' },
      { phase: '4', title: 'The Pivot', date: 'Oct 2025', milestone: 'From curriculum to commercial. The moment learning became building.' },
    ],
    metrics: [
      { label: 'Starting point', value: 'Zero' },
      { label: 'Time to first SaaS', value: '3 months' },
      { label: 'Certifications earned', value: '3+' },
      { label: 'This led to', value: '7 live apps' },
    ],
    accentColor: '#7A9E7E',
    buildDuration: 'Mid-2025 → Sep 2025 · 3 months to first React project',
  },
]
