import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Code, Brain, Sparkles, Zap, Users, TrendingUp, ArrowRight, CheckCircle, ExternalLink, Github } from 'lucide-react';

export const metadata: Metadata = {
  title: 'AI Engineer | Nandawula Regine — Building Intelligent Systems for African Businesses',
  description:
    'Nandawula Regine Kabali-Kagwa is a certified AI engineer and full-stack developer building custom AI agents, chatbots, and automation systems for African businesses. Expert in Claude API, OpenAI, Next.js, and Supabase.',
  keywords: [
    'AI engineer South Africa',
    'African AI engineer',
    'AI developer Africa',
    'chatbot development South Africa',
    'OpenAI developer Africa',
    'Claude API developer',
    'AI agent development',
    'business automation South Africa',
    'full-stack AI developer',
    'Nandawula Regine',
    'AI consulting Africa',
    'machine learning South Africa',
    'LangChain developer',
    'RAG developer Africa',
    'AI solutions African businesses',
  ],
  openGraph: {
    title: 'AI Engineer | Nandawula Regine — Intelligent Systems for African Businesses',
    description:
      'Certified AI engineer specializing in Claude API, OpenAI, chatbots, automation, and AI-powered business solutions. Based in South Africa, building for Africa and the world.',
    images: ['/og-ai-engineer.jpg'],
    type: 'profile',
    url: 'https://creativelynanda.co.za/ai-engineer',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Engineer | Nandawula Regine',
    description: 'Building intelligent AI systems for African businesses. Claude API, OpenAI, automation, and custom AI agents.',
    images: ['/og-ai-engineer.jpg'],
  },
  alternates: {
    canonical: 'https://creativelynanda.co.za/ai-engineer',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Nandawula Regine Kabali-Kagwa',
  jobTitle: 'AI Engineer & Full-Stack Developer',
  description:
    'Certified AI engineer specializing in building intelligent systems, AI agents, chatbots, and automation for African businesses.',
  url: 'https://creativelynanda.co.za/ai-engineer',
  sameAs: [
    'https://github.com/Nanda-Regine',
    'https://creativelynanda.co.za',
  ],
  knowsAbout: [
    'Artificial Intelligence',
    'Machine Learning',
    'Claude API',
    'OpenAI GPT-4',
    'LangChain',
    'RAG Systems',
    'Next.js',
    'TypeScript',
    'Supabase',
    'PayFast',
  ],
  offers: {
    '@type': 'Offer',
    description: 'AI engineering services including chatbot development, AI agent creation, and business automation',
  },
};

const aiProjects = [
  {
    title: 'K53 Drill Master',
    description: 'AI-powered driving test prep platform with adaptive learning. Tackling South Africa\'s 60% K53 failure rate.',
    tech: ['OpenAI', 'Next.js', 'Supabase', 'TypeScript'],
    users: '50+ paying users',
    impact: '4.8/5 rating',
    status: 'Live',
    link: 'https://nanda-k53-drill-master.vercel.app/',
    githubLink: 'https://github.com/Nanda-Regine/nanda-k53-drill-master',
  },
  {
    title: 'Campus Compass',
    description: 'AI university companion platform with smart scheduling, deadline tracking, and campus navigation.',
    tech: ['OpenAI', 'Mapbox', 'Next.js', 'Supabase', 'PWA'],
    users: '200+ students',
    impact: '40% time saved on planning',
    status: 'Beta',
    link: 'https://github.com/Nanda-Regine/campus-compass',
    githubLink: 'https://github.com/Nanda-Regine/campus-compass',
  },
  {
    title: 'StokvelOS',
    description: 'AI-powered stokvel management platform for South Africa\'s 11M stokvel participants. Automated record-keeping and financial tracking.',
    tech: ['Claude API', 'Supabase', 'PayFast', 'TypeScript'],
    users: 'Beta — 3 stokvels',
    impact: '100% accuracy in tracking',
    status: 'Beta',
    link: '/projects/stokvel-os',
    githubLink: null,
  },
  {
    title: 'Nanda AI Assistant',
    description: 'Custom AI sales assistant that converts website visitors into customers using RAG and embeddings.',
    tech: ['Claude API', 'RAG', 'Embeddings', 'Next.js'],
    users: 'Live on this site',
    impact: '15% conversion lift',
    status: 'Live',
    link: '/#ai-assistant',
    githubLink: 'https://github.com/Nanda-Regine/CreativelyNanda.co.za',
  },
];

const aiCaseStudies = [
  {
    title: 'K53 Drill Master',
    color: '#C1292E',
    problem: 'Over 60% of South Africans fail the K53 learner\'s licence test on their first attempt — not because they\'re not intelligent, but because quality preparation resources are expensive, inaccessible, or outdated. This creates employment barriers for millions who need a licence to work.',
    approach: 'Built an adaptive AI system using OpenAI\'s API that tracks each user\'s performance across question categories and dynamically adjusts difficulty and topic weighting. The system learns which areas a learner struggles with and surfaces those questions more frequently, personalising the experience without manual configuration.',
    keyDecisions: [
      { decision: 'OpenAI over fine-tuning', reason: 'GPT-4 provides explanation quality that static answer keys can\'t match — learners get "why" not just "what"' },
      { decision: 'Supabase RLS per user', reason: 'Row-Level Security ensures each learner\'s progress data is completely isolated — critical for a platform with paying users' },
      { decision: 'PayFast not Stripe', reason: 'ZAR-native payments, no USD conversion friction for South African users' },
    ],
    results: ['50+ paying subscribers at launch', '4.8/5 user rating', 'Adaptive algorithm reduces average prep time by ~40%', 'SEO-optimised for "K53 practice test" (top 10 organic)'],
    readme: `# K53 Drill Master
AI-Powered Driving Test Prep for South Africa

## The Problem
60%+ K53 failure rate → employment barriers for millions

## Solution Architecture
User submits answer
  → Supabase logs attempt with timestamp + category
  → OpenAI evaluates + generates explanation
  → Adaptive engine recalculates question weighting
  → Next question served from weak-area pool

## Tech Stack
- Next.js 14 (App Router, SSR for SEO)
- TypeScript (strict mode — financial data)
- OpenAI GPT-4 (adaptive feedback engine)
- Supabase (progress DB + Row Level Security)
- PayFast (ZAR payments, no Stripe friction)
- Tailwind CSS (mobile-first — 80% mobile users)

## Key Files
- /app/api/quiz/route.ts — AI evaluation endpoint
- /lib/adaptive-engine.ts — question weighting algorithm
- /lib/payfast/ — payment integration

## Live
https://nanda-k53-drill-master.vercel.app/
GitHub: github.com/Nanda-Regine/nanda-k53-drill-master`,
  },
  {
    title: 'Campus Compass',
    color: '#0066CC',
    problem: 'South Africa has a 50%+ university dropout rate. The leading causes: poor academic planning, inability to navigate campus systems, and zero access to real-time academic support. Students — especially first-generation university students — arrive with no framework for managing a university workload.',
    approach: 'Designed an AI companion that integrates with university schedules and provides a 24/7 intelligent assistant. Used OpenAI for the chatbot and Mapbox for campus navigation, with offline PWA support so students with limited data can still access core features. The AI understands academic context — it knows what NSFAS is, how module registration works, and what a timetable clash means.',
    keyDecisions: [
      { decision: 'PWA over native app', reason: 'South African students can\'t always download apps. A PWA installs from the browser, works offline, and avoids app store friction.' },
      { decision: 'Mapbox over Google Maps', reason: 'Mapbox offers more affordable pricing for African markets and better developer customisation for campus-specific styling.' },
      { decision: 'Context-aware AI prompt', reason: 'The system prompt includes SA university terminology (modules, timetables, NSFAS, SRC) so the AI doesn\'t hallucinate generic university advice.' },
    ],
    results: ['200+ active student users in beta', '40% reduction in planning-related stress (self-reported)', 'Works offline on 2G/3G connections', 'GitHub: Nanda-Regine/campus-compass'],
    readme: `# Campus Compass
AI University Companion for South African Students

## The Problem
50%+ SA dropout rate → poor planning + zero support systems

## Architecture
Student query
  → Context builder adds: course data, calendar, SA terminology
  → OpenAI (gpt-4) generates contextual academic response
  → Response stored in Supabase (for session continuity)
  → Mapbox renders relevant campus navigation if needed

## Offline-First Strategy (PWA)
- Service worker caches: timetable, deadlines, map tiles
- Works on 2G via background sync
- Installable from browser — no app store needed

## Tech Stack
- Next.js 14 + TypeScript
- OpenAI (academic AI companion)
- Mapbox GL JS (campus navigation)
- Supabase (student data + progress)
- PWA (offline support, installable)
- Tailwind CSS

## GitHub
github.com/Nanda-Regine/campus-compass`,
  },
  {
    title: 'StokvelOS',
    color: '#B8860B',
    problem: 'R50 billion moves through South Africa\'s stokvel economy every year — managed entirely on paper. 11 million participants track contributions, payouts, and penalties in handwritten notebooks. One disputed entry can destroy trust built over years. Fraud is common, audits are impossible, and disputes tear communities apart.',
    approach: 'Built a full SaaS platform purpose-designed for stokvel structures — not adapted from a Western fintech template. The AI component detects anomalous contribution patterns that may indicate fraud (unusual timing, duplicate amounts, missing streaks). Claude API handles natural language queries from stokvel admins who may not be comfortable with spreadsheets.',
    keyDecisions: [
      { decision: 'Claude API for admin queries', reason: 'Stokvel admins often prefer natural language: "Who hasn\'t paid this month?" is more accessible than a filter UI' },
      { decision: 'Supabase RLS at group level', reason: 'Each stokvel is completely isolated — members of Group A cannot see Group B\'s data under any circumstances' },
      { decision: 'PayFast for ZAR transactions', reason: 'Stokvels operate in Rands. USD-denominated payment processors create conversion costs that erode community savings.' },
    ],
    results: ['3 active stokvels in beta', '100% contribution tracking accuracy vs. manual records', 'AI fraud alerts caught 2 discrepancies in beta period', 'R50B+ market opportunity — first AI-native stokvel platform'],
    readme: `# StokvelOS
AI-Powered Stokvel Management for 11M South Africans

## The Problem
R50B informal economy — 95% run on paper → fraud, disputes, loss

## AI Architecture
Admin asks: "Who hasn't paid this month?"
  → Claude API parses intent + generates Supabase query
  → Results formatted as natural language response
  → Anomaly detection runs on contribution history
  → Alert generated if pattern deviates >2 standard deviations

## Security Model (Supabase RLS)
- Each stokvel is a separate RLS scope
- Members only see their own contribution history
- Admins see group-level data only
- Service role for analytics (isolated from user queries)

## Tech Stack
- Next.js 14 + TypeScript
- Claude API (natural language queries + anomaly detection)
- Supabase (PostgreSQL + Row Level Security)
- PayFast (ZAR-native payments)
- Tailwind CSS + Framer Motion

## Market
11M stokvel participants · R50B+ annual economy
First AI-native platform in this space`,
  },
  {
    title: 'Nanda AI Assistant',
    color: '#7C3AED',
    problem: 'Most portfolio chatbots are either useless FAQ bots or generic ChatGPT wrappers. Visitors to creativelynanda.co.za needed a genuinely helpful assistant that could answer real questions about Nanda\'s work, templates, and services — without hallucinating or sending people to the wrong pages.',
    approach: 'Built a context-aware sales assistant using Claude API with a detailed system prompt that includes real business data: template prices, project descriptions, booking process, and Nanda\'s background. The assistant uses page context detection to provide relevant answers — on the products page it leads with templates, on the AI engineer page it talks services.',
    keyDecisions: [
      { decision: 'Claude over GPT-4 for this use case', reason: 'Claude\'s instruction-following is more reliable for brand voice consistency — it respects the "don\'t greet on every message" constraint better' },
      { decision: 'Context-aware system prompt', reason: 'Current URL path is injected into every API call so the assistant knows which page the visitor is on and responds accordingly' },
      { decision: 'Local knowledge base first', reason: 'Common questions are answered without API calls using a keyword-match knowledge base — saves cost and reduces latency to ~0ms for 60% of queries' },
    ],
    results: ['Live on creativelynanda.co.za', '15% increase in contact form submissions', 'Handles template questions, pricing, booking, and custom work enquiries', 'Zero hallucinations about products (system prompt enforces accuracy)'],
    readme: `# Nanda AI Assistant
Context-Aware Sales Assistant for CreativelyNanda.co.za

## Architecture
User message arrives
  → Local knowledge base checked (keyword match, ~0ms)
  → If no match: OpenAI API called with full context
    - System prompt includes: prices, projects, brand voice
    - Current page path injected for context-awareness
    - Conversation history (last 6 messages) included
  → Response streamed to UI

## System Prompt Design
- 500 tokens of business context (products, prices, brand)
- Explicit rule: "Do NOT greet on every message"
- Page-context injection: visitor on /products → lead with templates
- Marketing CTA in every response: contact, products, ai-engineer

## Local Knowledge Base (zero-latency responses)
- Greetings → contextual welcome
- Product questions → price + Notion link
- Booking → /contact CTA
- Poetry → Inside Her Roses info

## Tech Stack
- Next.js App Router API route (/api/chat)
- OpenAI gpt-4o-mini (cost-optimised, fast)
- Claude sonnet-4 (for complex sales conversations)
- Framer Motion (character animation)
- localStorage (conversation persistence)

## GitHub
github.com/Nanda-Regine/CreativelyNanda.co.za`,
  },
];

const services = [
  {
    icon: Brain,
    title: 'AI Agent Development',
    description: 'Custom AI agents that handle customer service, sales, data processing, and operations — 24/7 without you lifting a finger.',
    deliverables: [
      '24/7 automated customer support',
      'Lead qualification & nurturing',
      'Document processing & data entry',
      'Smart email responses',
    ],
    pricing: 'R3,000–R8,000/month',
    turnaround: '2–3 weeks',
  },
  {
    icon: Sparkles,
    title: 'Chatbot Integration',
    description: 'WhatsApp, website, and social media chatbots that feel human and convert like your best salesperson.',
    deliverables: [
      'Natural language understanding',
      'Multi-language support (inc. Zulu, Xhosa)',
      'Knowledge base integration',
      'Analytics dashboard',
    ],
    pricing: 'R2,500–R5,000/month',
    turnaround: '1–2 weeks',
  },
  {
    icon: Zap,
    title: 'Business Automation',
    description: 'AI-powered workflows that eliminate repetitive tasks and save your team hours every day.',
    deliverables: [
      'Email automation',
      'Data extraction & entry',
      'Report generation',
      'Meeting scheduling & follow-ups',
    ],
    pricing: 'R1,500–R4,000/month',
    turnaround: '1 week',
  },
  {
    icon: Code,
    title: 'Custom AI Solutions',
    description: 'Bespoke AI systems designed from the ground up for your specific business problem.',
    deliverables: [
      'Requirements analysis & scoping',
      'Custom model fine-tuning',
      'API integration & deployment',
      '3-month support included',
    ],
    pricing: 'Quote-based',
    turnaround: '4–8 weeks',
  },
];

const stats = [
  { label: 'AI Apps Built', value: '5+', icon: Code },
  { label: 'Paying Users', value: '250+', icon: Users },
  { label: 'Revenue Generated', value: 'R15K+', icon: TrendingUp },
  { label: 'Avg Response Time', value: '< 1s', icon: Zap },
];

const techStack = [
  { name: 'Claude API', level: 'Expert', color: 'cherry' },
  { name: 'OpenAI GPT-4', level: 'Advanced', color: 'cherry' },
  { name: 'LangChain', level: 'Intermediate', color: 'electric-cyan' },
  { name: 'Embeddings & RAG', level: 'Advanced', color: 'electric-cyan' },
  { name: 'Next.js', level: 'Expert', color: 'cherry' },
  { name: 'TypeScript', level: 'Expert', color: 'cherry' },
  { name: 'Supabase', level: 'Expert', color: 'cherry' },
  { name: 'Python', level: 'Intermediate', color: 'electric-cyan' },
];

const statusColors: Record<string, string> = {
  Live: 'bg-emerald/20 text-emerald border border-emerald/30',
  Beta: 'bg-amber/20 text-amber border border-amber/30',
  'In Development': 'bg-electric-cyan/20 text-electric-cyan border border-electric-cyan/30',
};

// ── GitHub Contributions ──────────────────────────────────────────────────────
const githubContribs: Record<string, { level: number; count: number }> = {
  '2026-01-14': { level: 1, count: 7 },
  '2026-01-15': { level: 1, count: 3 },
  '2026-01-20': { level: 1, count: 3 },
  '2026-01-21': { level: 1, count: 1 },
  '2026-01-27': { level: 1, count: 6 },
  '2026-01-28': { level: 1, count: 2 },
  '2026-02-05': { level: 3, count: 20 },
  '2026-02-06': { level: 2, count: 9 },
  '2026-02-07': { level: 3, count: 18 },
  '2026-02-08': { level: 2, count: 13 },
  '2026-02-10': { level: 1, count: 6 },
  '2026-02-11': { level: 1, count: 3 },
  '2026-02-13': { level: 1, count: 4 },
  '2026-02-18': { level: 1, count: 5 },
  '2026-02-24': { level: 1, count: 1 },
  '2026-02-25': { level: 1, count: 7 },
  '2026-02-26': { level: 4, count: 28 },
  '2026-02-27': { level: 1, count: 5 },
  '2026-03-01': { level: 4, count: 25 },
  '2026-03-02': { level: 1, count: 3 },
  '2026-03-04': { level: 4, count: 25 },
};

const levelColors = ['bg-white/5', 'bg-cherry/25', 'bg-cherry/50', 'bg-cherry/75', 'bg-cherry'] as const;

const monthDays2026 = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

type ContribCell = { date: string; level: number; count: number } | null;

function buildContribGrid(): ContribCell[][] {
  const days: ContribCell[] = [];
  // Jan 1, 2026 is Thursday — pad Sun, Mon, Tue, Wed (4 empty slots)
  for (let i = 0; i < 4; i++) days.push(null);
  for (let m = 0; m < 12; m++) {
    for (let d = 1; d <= monthDays2026[m]; d++) {
      const dateStr = `2026-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const c = githubContribs[dateStr] || { level: 0, count: 0 };
      days.push({ date: dateStr, ...c });
    }
  }
  while (days.length % 7 !== 0) days.push(null);
  const weeks: ContribCell[][] = [];
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7));
  return weeks;
}

const contribGrid = buildContribGrid();

function getMonthLabel(week: ContribCell[]): string {
  const first = week.find(d => d?.date.slice(-2) === '01');
  if (!first) return '';
  return monthLabels[parseInt(first.date.slice(5, 7)) - 1];
}

export default function AIEngineerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-midnight-blue text-beige">
        {/* Hero */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-24">
          {/* Grid background */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                'linear-gradient(to right, #00d4ff22 1px, transparent 1px), linear-gradient(to bottom, #00d4ff22 1px, transparent 1px)',
              backgroundSize: '64px 64px',
            }}
          />

          {/* Glow orbs */}
          <div className="absolute top-1/4 -left-48 w-96 h-96 bg-cherry/15 rounded-full blur-3xl animate-pulse-soft" />
          <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-electric-cyan/10 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1.5s' }} />

          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 mb-6 flex-wrap justify-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-electric-cyan/10 border border-electric-cyan/20 rounded-full">
                <Sparkles className="w-4 h-4 text-electric-cyan" />
                <span className="text-sm text-electric-cyan font-semibold tracking-wide">Master Gen AI Professional Certified</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#4ADE80]/10 border border-[#4ADE80]/20 rounded-full">
                <span className="text-sm text-[#4ADE80] font-semibold tracking-wide">🌍 5th Industrial Revolution</span>
              </div>
            </div>

            <h1 className="text-6xl md:text-8xl font-display font-bold mb-6">
              <span className="text-beige">AI</span>{' '}
              <span className="text-cherry">Engineer</span>
            </h1>

            <p className="text-2xl md:text-3xl text-beige/80 mb-6 font-light leading-relaxed">
              Building intelligent systems where{' '}
              <span className="text-electric-cyan font-semibold">Ubuntu philosophy</span> meets{' '}
              <span className="text-cherry font-semibold">artificial intelligence</span> —{' '}
              <span className="text-gold font-semibold">from Africa, for the world</span>
            </p>

            <p className="text-lg text-beige/60 max-w-3xl mx-auto mb-12 leading-relaxed">
              The 5IR demands human–AI collaboration. I build AI agents, chatbots, and automation
              systems that amplify human creativity and solve real African problems —
              K53 pass rates, stokvel fraud, township entrepreneurs scaling globally.
              Nandawula Regine Kabali-Kagwa, Africa&apos;s Creative Technologist.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#services"
                className="px-8 py-4 bg-cherry text-white font-semibold rounded-full hover:bg-cherry-dark hover:shadow-glow-cherry transition-all duration-300"
              >
                View Services
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 border-2 border-electric-cyan/50 text-electric-cyan font-semibold rounded-full hover:bg-electric-cyan/10 transition-all duration-300"
              >
                Book Consultation
              </Link>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20 px-6 border-y border-beige/10">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-cherry/15 rounded-full mb-4">
                  <stat.icon className="w-8 h-8 text-cherry" />
                </div>
                <p className="text-4xl md:text-5xl font-display font-bold text-electric-cyan mb-2">
                  {stat.value}
                </p>
                <p className="text-beige/60 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* AI Projects */}
        <section id="projects" className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-display font-bold mb-4 text-beige">
                AI-Powered{' '}
                <span className="text-cherry">Projects</span>
              </h2>
              <p className="text-xl text-beige/60">
                Real applications. Real users. Real results across Africa.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {aiProjects.map((project) => (
                <Link
                  key={project.title}
                  href={project.link}
                  target={project.link.startsWith('http') ? '_blank' : '_self'}
                  rel={project.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="group block bg-charcoal/60 border border-beige/10 rounded-2xl p-8 hover:border-cherry/40 hover:shadow-glow-cherry transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColors[project.status]}`}>
                      {project.status}
                    </span>
                    <ExternalLink className="w-5 h-5 text-beige/30 group-hover:text-electric-cyan transition-colors" />
                  </div>

                  <h3 className="text-2xl font-display font-bold mb-3 text-beige group-hover:text-cherry transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-beige/60 mb-5 leading-relaxed">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-electric-cyan/10 border border-electric-cyan/20 text-electric-cyan text-xs rounded-full font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-beige/10">
                    <div>
                      <p className="text-xs text-beige/40 mb-1">Users</p>
                      <p className="font-semibold text-beige text-sm">{project.users}</p>
                    </div>
                    <div>
                      <p className="text-xs text-beige/40 mb-1">Impact</p>
                      <p className="font-semibold text-gold text-sm">{project.impact}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-8 py-4 border border-beige/20 text-beige rounded-full hover:border-cherry hover:text-cherry transition-all duration-300"
              >
                View All 9 Projects <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Engineering Deep Dives */}
        <section className="py-24 px-6 bg-charcoal/20 border-y border-beige/10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-beige">
                Engineering <span className="text-electric-cyan">Deep Dives</span>
              </h2>
              <p className="text-xl text-beige/60">
                How each system was designed — the problems, decisions, and tradeoffs
              </p>
            </div>

            <div className="space-y-16">
              {aiCaseStudies.map((study, i) => (
                <div
                  key={study.title}
                  className="bg-midnight-blue border border-beige/10 rounded-3xl overflow-hidden"
                  style={{ borderTopColor: study.color, borderTopWidth: 3 }}
                >
                  {/* Header */}
                  <div className="px-8 pt-8 pb-6 border-b border-beige/10">
                    <div className="flex flex-wrap items-center gap-4 mb-3">
                      <span className="font-mono text-xs text-beige/30">0{i + 1}</span>
                      <span
                        className="text-xs font-bold px-3 py-1 rounded-full"
                        style={{ backgroundColor: `${study.color}20`, color: study.color, border: `1px solid ${study.color}40` }}
                      >
                        Case Study
                      </span>
                    </div>
                    <h3 className="text-3xl font-display font-bold text-beige">{study.title}</h3>
                  </div>

                  <div className="p-8 grid md:grid-cols-2 gap-8">
                    {/* Problem */}
                    <div>
                      <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: study.color }}>
                        The Problem
                      </p>
                      <p className="text-beige/70 leading-relaxed text-sm">{study.problem}</p>
                    </div>

                    {/* Approach */}
                    <div>
                      <p className="text-xs font-bold tracking-widest uppercase mb-3 text-electric-cyan">
                        Engineering Approach
                      </p>
                      <p className="text-beige/70 leading-relaxed text-sm">{study.approach}</p>
                    </div>
                  </div>

                  {/* Key Decisions */}
                  <div className="px-8 pb-8">
                    <p className="text-xs font-bold tracking-widest uppercase mb-4 text-beige/40">
                      Key Technical Decisions
                    </p>
                    <div className="grid md:grid-cols-3 gap-4 mb-8">
                      {study.keyDecisions.map((kd) => (
                        <div
                          key={kd.decision}
                          className="bg-white/4 border border-beige/10 rounded-xl p-5 hover:border-beige/20 transition-colors"
                        >
                          <p className="font-semibold text-beige text-sm mb-2">✦ {kd.decision}</p>
                          <p className="text-beige/55 text-xs leading-relaxed">{kd.reason}</p>
                        </div>
                      ))}
                    </div>

                    {/* Results */}
                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                      <div>
                        <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: study.color }}>
                          Results
                        </p>
                        <ul className="space-y-2">
                          {study.results.map((r) => (
                            <li key={r} className="flex items-start gap-2 text-sm text-beige/70">
                              <span style={{ color: study.color }} className="mt-0.5 flex-shrink-0">→</span>
                              {r}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* README terminal */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                          <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                          <span className="text-beige/30 text-xs ml-2 font-mono">README.md</span>
                        </div>
                        <div className="bg-[#0d1117] border border-white/10 rounded-xl p-5 overflow-x-auto max-h-56 overflow-y-auto">
                          <pre className="text-[#e6edf3] text-xs font-mono whitespace-pre-wrap leading-relaxed">
                            {study.readme}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="py-24 px-6 bg-charcoal/30 border-y border-beige/10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-display font-bold mb-4 text-beige">
                Services I <span className="text-cherry">Offer</span>
              </h2>
              <p className="text-xl text-beige/60">
                Custom AI solutions for businesses that want to lead, not follow
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="bg-midnight-blue border border-beige/10 rounded-2xl p-8 hover:border-cherry/30 transition-all duration-300 hover:shadow-glow-cherry"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-cherry/15 rounded-2xl mb-6">
                    <service.icon className="w-8 h-8 text-cherry" />
                  </div>

                  <h3 className="text-2xl font-display font-bold mb-3 text-beige">{service.title}</h3>
                  <p className="text-beige/60 mb-6 leading-relaxed">{service.description}</p>

                  <div className="mb-6">
                    <p className="text-xs font-semibold text-electric-cyan mb-3 tracking-widest uppercase">What you get:</p>
                    <ul className="space-y-2">
                      {service.deliverables.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-beige/80 text-sm">
                          <CheckCircle className="w-4 h-4 text-emerald flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-beige/10">
                    <div>
                      <p className="text-xs text-beige/40 mb-1">Investment</p>
                      <p className="text-xl font-bold text-beige">{service.pricing}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-beige/40 mb-1">Timeline</p>
                      <p className="text-lg font-semibold text-gold">{service.turnaround}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-display font-bold mb-4 text-beige">
                My AI <span className="text-electric-cyan">Arsenal</span>
              </h2>
              <p className="text-xl text-beige/60">
                The tools I use to build intelligent systems that scale
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {techStack.map((tech) => (
                <div
                  key={tech.name}
                  className="group bg-charcoal/60 border border-beige/10 rounded-xl p-6 text-center hover:border-cherry/40 hover:shadow-glow-cherry transition-all duration-300"
                >
                  <div className="w-12 h-12 mx-auto mb-4 bg-cherry/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Code className="w-6 h-6 text-cherry" />
                  </div>
                  <h3 className="font-semibold text-beige mb-2 font-mono text-sm">{tech.name}</h3>
                  <p className="text-xs text-electric-cyan">{tech.level}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GitHub Contributions */}
        <section className="py-24 px-6 bg-charcoal/30 border-y border-beige/10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-beige">
                Writing <span className="text-electric-cyan">Code</span> Daily
              </h2>
              <p className="text-lg text-beige/60">
                194 contributions in 2026 — every commit is a step closer to impact
              </p>
            </div>

            <div className="bg-midnight-blue/80 border border-beige/10 rounded-2xl p-6 md:p-8">
              {/* Summary stats */}
              <div className="flex flex-wrap gap-8 mb-8 pb-6 border-b border-beige/10">
                <div>
                  <p className="text-3xl font-display font-bold text-cherry">194</p>
                  <p className="text-sm text-beige/50 mt-1">contributions in 2026</p>
                </div>
                <div>
                  <p className="text-3xl font-display font-bold text-electric-cyan">28</p>
                  <p className="text-sm text-beige/50 mt-1">peak day (Feb 26)</p>
                </div>
                <div>
                  <p className="text-3xl font-display font-bold text-gold">9+</p>
                  <p className="text-sm text-beige/50 mt-1">active repositories</p>
                </div>
              </div>

              {/* Heatmap */}
              <div className="overflow-x-auto pb-2">
                <div className="min-w-max">
                  {/* Month labels */}
                  <div className="flex gap-0.5 mb-1.5 ml-8">
                    {contribGrid.map((week, wi) => {
                      const label = getMonthLabel(week);
                      return (
                        <div key={wi} className="w-3 relative">
                          {label && (
                            <span className="absolute text-[10px] text-beige/40 whitespace-nowrap leading-none">
                              {label}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Day labels + grid */}
                  <div className="flex gap-2">
                    {/* Day labels */}
                    <div className="flex flex-col gap-0.5 w-6">
                      {['', 'Mon', '', 'Wed', '', 'Fri', ''].map((label, i) => (
                        <div key={i} className="h-3 flex items-center justify-end">
                          <span className="text-[10px] text-beige/40 leading-none">{label}</span>
                        </div>
                      ))}
                    </div>

                    {/* Contribution cells */}
                    <div className="flex gap-0.5">
                      {contribGrid.map((week, wi) => (
                        <div key={wi} className="flex flex-col gap-0.5">
                          {week.map((day, di) => (
                            <div
                              key={di}
                              className={`w-3 h-3 rounded-sm ${day ? levelColors[day.level] : 'opacity-0'}`}
                              title={day?.count ? `${day.date}: ${day.count} contribution${day.count !== 1 ? 's' : ''}` : (day?.date || '')}
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Legend + GitHub link */}
              <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-6 border-t border-beige/10">
                <div className="flex items-center gap-2 text-xs text-beige/40">
                  <span>Less</span>
                  {levelColors.map((cls, i) => (
                    <div key={i} className={`w-3 h-3 rounded-sm ${cls}`} />
                  ))}
                  <span>More</span>
                </div>
                <a
                  href="https://github.com/Nanda-Regine"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-electric-cyan hover:text-cherry transition-colors"
                >
                  <Github className="w-4 h-4" />
                  github.com/Nanda-Regine
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6 bg-gradient-to-r from-cherry/10 to-electric-cyan/5 border-y border-cherry/20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-beige">
              Ready to Build Your <span className="text-cherry">AI Solution</span>?
            </h2>
            <p className="text-xl text-beige/70 mb-8 leading-relaxed">
              Let&apos;s discuss how AI can transform your business. Free 30-minute strategy call.
              No jargon. Just results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 bg-cherry text-white font-semibold rounded-full hover:bg-cherry-dark hover:shadow-glow-cherry transition-all duration-300"
              >
                Book a Free Consultation
              </Link>
              <Link
                href="mailto:hello@creativelynanda.co.za"
                className="px-8 py-4 border-2 border-beige/30 text-beige font-semibold rounded-full hover:border-beige hover:bg-beige/5 transition-all duration-300"
              >
                Email Me Directly
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
