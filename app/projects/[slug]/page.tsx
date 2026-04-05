import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Github, Globe, ArrowRight } from 'lucide-react';
import { JsonLd, SITE_URL, AUTHOR_NAME } from '@/lib/seo';

// ============================================================
// TYPES
// ============================================================

interface BuildJourney {
  narrative: string;
  codeExample?: string;
  codeLanguage?: string;
  codeLabel?: string;
  lessons?: string[];
}

interface ProjectData {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
  status: string;
  year: string;
  problem: string;
  solution: string;
  techStack: { name: string; reason: string }[];
  impact: { potential: string; economy: string; problem: string; metric: string };
  liveUrl: string | null;
  githubUrl: string | null;
  videoUrl?: string | null;
  images: string[];
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  buildJourney?: BuildJourney;
}

// ============================================================
// PROJECT DATA
// ============================================================

const projects: Record<string, ProjectData> = {

  // ── AI SaaS ──────────────────────────────────────────────────────────────────

  'campus-compass': {
    slug: 'campus-compass',
    title: 'VarsityOS',
    tagline: 'The AI University Companion for SA Students Facing a 50%+ Dropout Rate',
    description:
      'Multi-agent AI platform built to address South Africa\'s university dropout crisis. Six specialist Claude agents cover study coaching, budget management, meal planning, wellness monitoring, registration guidance, and crisis detection — with SADAG + Lifeline SA helplines surfaced automatically.',
    category: 'AI/ML · SaaS · Education',
    status: 'Beta',
    year: '2025',
    problem:
      '50%+ of South African university students drop out — not because they fail academically, but because they fail at navigation. No money for accommodation. No idea how to manage NSFAS. No mental health support at 2am when the spiral begins.',
    solution:
      'A PWA with six specialist Claude AI agents (Study Coach, Budget Manager, Meal Planner, Wellness Monitor, Registration Guide, Crisis Detector) sharing a Supabase session store. Crisis detection surfaces SADAG and Lifeline SA helplines immediately. Offline-capable for SA mobile data realities.',
    techStack: [
      { name: 'Next.js 14', reason: 'App Router + PWA for offline capability' },
      { name: 'TypeScript', reason: 'Type-safe agent message contracts' },
      { name: 'Supabase', reason: 'Shared session store + per-agent context windows' },
      { name: 'Claude API', reason: '6 specialist agents with intent routing layer' },
      { name: 'PayFast', reason: 'ZAR subscription billing for premium tiers' },
      { name: 'PWA', reason: 'Offline-first for SA students on intermittent data' },
    ],
    impact: {
      potential: '1M+ SA university students',
      economy: '50%+ dropout rate addressed',
      problem: 'Zero AI support at the critical moment',
      metric: '300+ active users, 6 agents live',
    },
    liveUrl: 'https://campus-compass-phi.vercel.app',
    githubUrl: null,
    images: [],
    metaTitle: 'VarsityOS — AI University Companion for South African Students | Nandawula Regine',
    metaDescription:
      'VarsityOS uses 6 specialist Claude AI agents to support SA students through dropout risk. Study coaching, NSFAS budget management, crisis detection with SADAG helplines. Built by Nandawula Regine.',
    keywords: [
      'VarsityOS',
      'AI university app South Africa',
      'SA university dropout rate',
      'NSFAS budget AI',
      'student mental health app South Africa',
      'Claude AI student companion',
      'campus-compass',
    ],
    buildJourney: {
      narrative: `VarsityOS started from a single statistic: South Africa's university dropout rate is over 50%. Behind that number are students who didn't fail academically — they failed at navigation. They couldn't find accommodation, couldn't manage their NSFAS budget, couldn't access mental health support at 2am when the spiral began. VarsityOS was built to be that 2am resource.

The multi-agent architecture was the core challenge: six specialist Claude agents (Study Coach, Budget Manager, Meal Planner, Wellness Monitor, Registration Guide, Crisis Detector) had to coordinate without duplicating context or burning API tokens. The solution was a shared session store in Supabase with per-agent context windows and a routing layer that classifies intent before dispatching.

Crisis detection was the most sensitive engineering decision: when a student mentions self-harm or suicidal ideation, the system must respond with care, not a chatbot reply. The implementation surfaces SADAG and Lifeline SA helplines immediately and reframes the response away from advice toward human connection.`,
      codeExample: `-- Crisis detection: surface helplines when student distress detected
-- Agent routing layer (simplified)
SELECT
  session_id,
  message_content,
  CASE
    WHEN message_content ILIKE ANY(ARRAY['%end it%', '%give up%', '%cant go on%', '%suicidal%'])
    THEN 'CRISIS'
    WHEN message_content ILIKE ANY(ARRAY['%budget%', '%nsfas%', '%money%'])
    THEN 'BUDGET_AGENT'
    WHEN message_content ILIKE ANY(ARRAY['%study%', '%exam%', '%assignment%'])
    THEN 'STUDY_AGENT'
    ELSE 'GENERAL'
  END AS agent_route
FROM chat_messages
WHERE session_id = $1
ORDER BY created_at DESC LIMIT 1;`,
      codeLanguage: 'sql',
      codeLabel: 'Agent routing logic — Supabase query',
      lessons: [
        'Multi-agent systems need a routing layer before an agent layer — intent classification is the hardest problem',
        'Crisis detection is a product ethics decision, not just a technical one',
        'NSFAS + SA university context cannot be retrofitted from a generic student app — it must be built in from the schema',
        'PWA offline mode is not optional for SA students on intermittent data',
        'The 2am use case is the real product specification',
      ],
    },
  },

  'k53-drill-master': {
    slug: 'k53-drill-master',
    title: 'K53 Drill Master',
    tagline: "AI-Powered Driving Test Prep Tackling South Africa's 60% Failure Rate",
    description:
      "Adaptive learning platform for South Africa's K53 driving test. SM-2 spaced repetition algorithm ensures students review what they struggle with — not random questions. 600+ questions with isiXhosa language support. 50+ paying subscribers at launch.",
    category: 'AI/ML · Education · SaaS',
    status: 'Live',
    year: '2025',
    problem:
      "60% of South Africans fail their K53 learner's licence test — a direct barrier to employment and economic participation. Most study prep apps show questions randomly. Random is not the same as effective.",
    solution:
      'SM-2 spaced repetition algorithm implemented as a Supabase function: tracks each question\'s ease factor and review interval per user, surfacing struggling questions more frequently. isiXhosa language support for Eastern Cape learner drivers. PayFast subscription billing.',
    techStack: [
      { name: 'Next.js', reason: 'Fast, SEO-optimised study platform' },
      { name: 'TypeScript', reason: 'Robust adaptive learning logic' },
      { name: 'Supabase', reason: 'SM-2 interval tracking per user per question' },
      { name: 'PayFast', reason: 'ZAR subscription payments' },
    ],
    impact: {
      potential: '500K+ SA learner drivers annually',
      economy: '60%+ K53 failure rate addressed',
      problem: 'Random prep fails — spaced repetition wins',
      metric: '50+ paying subscribers, 4.8/5 rating',
    },
    liveUrl: 'https://nanda-k53-drill-master.vercel.app',
    githubUrl: 'https://github.com/Nanda-Regine/nanda-k53-drill-master',
    images: [],
    metaTitle: 'K53 Drill Master — Spaced Repetition Driving Test Prep | Nandawula Regine',
    metaDescription:
      "K53 Drill Master uses SM-2 spaced repetition to help South Africans pass their driving test. isiXhosa support, 600+ questions, 50+ paying subscribers. Built by Nandawula Regine.",
    keywords: [
      'K53 learner licence app',
      'K53 driving test South Africa',
      'K53 Drill Master',
      'spaced repetition K53',
      'isiXhosa driving test',
      'K53 practice questions app',
    ],
    buildJourney: {
      narrative: `K53 was built in a single day — Phase 0 was a 12-hour sprint from 09:00 to 21:47. The decision to use SM-2 spaced repetition (the algorithm behind Anki) was made at 10:30am after researching why most test prep apps fail: they show you questions randomly, not based on what you actually need to review.

SM-2 assigns each question an 'ease factor' that updates based on your response — questions you struggle with appear more frequently, questions you've mastered appear less. This is implemented as a Supabase function that recalculates intervals on each answer submission.

The isiXhosa support was a late addition that became the most-discussed feature: South African learner drivers in the Eastern Cape should be able to prepare in their home language. Road signs are bilingual — the K53 study platform should be too.`,
      codeExample: `-- SM-2 spaced repetition interval calculation
-- Runs as Supabase Edge Function on each answer submission
CREATE OR REPLACE FUNCTION update_question_interval(
  p_user_id UUID,
  p_question_id UUID,
  p_quality INTEGER -- 0-5 (0=complete blackout, 5=perfect)
) RETURNS void AS $$
DECLARE
  v_ease_factor FLOAT;
  v_interval INTEGER;
  v_repetitions INTEGER;
BEGIN
  SELECT ease_factor, interval_days, repetitions
  INTO v_ease_factor, v_interval, v_repetitions
  FROM user_question_progress
  WHERE user_id = p_user_id AND question_id = p_question_id;

  -- SM-2 algorithm
  IF p_quality < 3 THEN
    v_repetitions := 0;
    v_interval := 1;
  ELSE
    v_ease_factor := v_ease_factor + (0.1 - (5 - p_quality) * (0.08 + (5 - p_quality) * 0.02));
    v_ease_factor := GREATEST(1.3, v_ease_factor);

    IF v_repetitions = 0 THEN v_interval := 1;
    ELSIF v_repetitions = 1 THEN v_interval := 6;
    ELSE v_interval := ROUND(v_interval * v_ease_factor);
    END IF;
    v_repetitions := v_repetitions + 1;
  END IF;

  INSERT INTO user_question_progress (user_id, question_id, ease_factor, interval_days, repetitions, next_review)
  VALUES (p_user_id, p_question_id, v_ease_factor, v_interval, v_repetitions, NOW() + (v_interval || ' days')::INTERVAL)
  ON CONFLICT (user_id, question_id) DO UPDATE
  SET ease_factor = EXCLUDED.ease_factor,
      interval_days = EXCLUDED.interval_days,
      repetitions = EXCLUDED.repetitions,
      next_review = EXCLUDED.next_review;
END;
$$ LANGUAGE plpgsql;`,
      codeLanguage: 'sql',
      codeLabel: 'SM-2 spaced repetition — Supabase function',
      lessons: [
        'SM-2 spaced repetition outperforms random question selection for retention — implement it at the database layer',
        'Language support (isiXhosa) is not a translation feature, it is a market access decision',
        'A 12-hour Phase 0 sprint is viable when the scope is ruthlessly scoped — one feature, done properly',
        'PayFast webhook signature verification: field order matters, alphabetical sort breaks it',
      ],
    },
  },

  'stokvel-os': {
    slug: 'stokvel-os',
    title: 'StokvelOS',
    tagline: 'The First AI-Native Stokvel Platform — Serving 11M South Africans',
    description:
      "AI-powered stokvel management platform digitalising South Africa's R50 billion informal savings economy. Automated contribution tracking, AI fraud detection, plain-English governance reports for committee chairs.",
    category: 'AI/ML · Community Finance · SaaS',
    status: 'Beta',
    year: '2025',
    problem:
      "R50 billion moves through SA stokvels annually — 95% managed on paper. WhatsApp messages, hand-written registers, and trust. The disputes, fraud, and financial loss that follow fall hardest on communities that can least afford it.",
    solution:
      'Full-stack stokvel management with automated contribution tracking, Z-score anomaly detection for fraud signals, and AI-generated plain-English governance reports after every contribution cycle. Built with Ubuntu as architecture: collective ownership in RLS policies.',
    techStack: [
      { name: 'Next.js', reason: 'App Router for SSR + fast mobile loads' },
      { name: 'TypeScript', reason: 'Type safety for financial data' },
      { name: 'Supabase', reason: 'RLS: members see group data, not each other\'s private balances' },
      { name: 'Claude API', reason: 'Plain-English AI governance reports for committee chairs' },
      { name: 'PayFast', reason: 'ZAR contribution processing' },
    ],
    impact: {
      potential: '11M South Africans in stokvels',
      economy: 'R50B+ informal stokvel economy',
      problem: '95% of stokvels operate on paper',
      metric: 'AI fraud detection caught 2 discrepancies in beta',
    },
    liveUrl: null,
    githubUrl: null,
    images: [],
    metaTitle: 'StokvelOS — AI-Native Stokvel Management for 11M South Africans | Nandawula Regine',
    metaDescription:
      "StokvelOS is the first AI-native stokvel platform — automated contribution tracking, fraud detection, and governance reports for South Africa's 11M stokvel members. Built by Nandawula Regine.",
    keywords: [
      'stokvel management app',
      'stokvel software South Africa',
      'digital stokvel platform',
      'StokvelOS',
      'community savings app Africa',
      'AI fraud detection stokvel',
    ],
    buildJourney: {
      narrative: `StokvelOS was built to solve something that touches 11 million South Africans: stokvels — community savings groups — are the backbone of township financial life, managing an estimated R50 billion annually. Almost all of it flows through WhatsApp messages, hand-written registers, and trust.

The AI governance report was the core innovation: after every contribution cycle, StokvelOS generates a plain-English financial summary for the group's committee — who contributed, who owes, what the collective balance is, and whether the system detected any anomalies.

The fraud detection system was trained on the real patterns of stokvel disputes: early withdrawal requests, contribution irregularities, and discrepancies between reported and actual amounts. In beta, it caught two real discrepancies that would have caused group conflict.`,
      codeExample: `-- Contribution verification with fraud signal detection
-- Flags statistical anomalies in member contribution patterns
WITH contribution_stats AS (
  SELECT
    member_id,
    AVG(amount) as avg_contribution,
    STDDEV(amount) as stddev_contribution,
    COUNT(*) as total_contributions,
    MAX(created_at) as last_contribution
  FROM contributions
  WHERE stokvel_id = $1
  GROUP BY member_id
),
anomaly_detection AS (
  SELECT
    c.member_id,
    c.amount,
    cs.avg_contribution,
    ABS(c.amount - cs.avg_contribution) / NULLIF(cs.stddev_contribution, 0) AS z_score,
    CASE
      WHEN ABS(c.amount - cs.avg_contribution) / NULLIF(cs.stddev_contribution, 0) > 2.5
      THEN 'HIGH_ANOMALY'
      WHEN ABS(c.amount - cs.avg_contribution) / NULLIF(cs.stddev_contribution, 0) > 1.5
      THEN 'MEDIUM_ANOMALY'
      ELSE 'NORMAL'
    END as fraud_signal
  FROM contributions c
  JOIN contribution_stats cs ON c.member_id = cs.member_id
  WHERE c.stokvel_id = $1 AND c.created_at > NOW() - INTERVAL '30 days'
)
SELECT * FROM anomaly_detection WHERE fraud_signal != 'NORMAL';`,
      codeLanguage: 'sql',
      codeLabel: 'Statistical fraud detection — contribution anomaly query',
      lessons: [
        "Ubuntu as architecture: the stokvel's collective ownership model must be reflected in the RLS policies — members see group data, not each other's private balances",
        'AI governance reports must be written for committee chairs, not developers — plain English, not metrics dashboards',
        'Z-score anomaly detection works for contribution fraud because legitimate contribution amounts are highly consistent per member',
        'Domain trust (stokvels = community trust) is a UX requirement, not just a feature',
      ],
    },
  },

  adminos: {
    slug: 'adminos',
    title: 'AdminOS',
    tagline: 'The AI Operating System for South African SMEs',
    description:
      "Full-stack AI business OS replacing 6 separate SaaS subscriptions. Five specialist Claude agents handle communication, invoicing, HR, reporting, and customer service — all accessible via WhatsApp. Built for South African load-shedding, PayFast, and isiXhosa context.",
    category: 'AI/ML · SaaS · SME Tools',
    status: 'Beta',
    year: '2025',
    problem:
      "SA SMEs pay R11,200/month across fragmented tools — CRM, invoicing, HR, comms, analytics — most of which they barely use and none of which talk to each other.",
    solution:
      '5 specialist AI agents (Sales, Finance, HR, Comms, Analytics) replacing 6 subscriptions. WhatsApp-native interface — no app switching required. Xero-integrated, PayFast-enabled, load-shedding-aware offline mode.',
    techStack: [
      { name: 'Next.js 14', reason: 'App Router + API routes for agent orchestration' },
      { name: 'TypeScript', reason: 'Type-safe agent message contracts' },
      { name: 'Supabase', reason: 'Multi-tenant RLS — each SME sees only their data' },
      { name: 'Claude API', reason: '5 specialist agents with shared context cache' },
      { name: 'Upstash Redis', reason: 'Rate limiting + prompt cache warm storage' },
      { name: 'Meta WhatsApp Cloud API', reason: 'Primary client interface — SA businesses live on WhatsApp' },
      { name: 'PayFast', reason: 'ZAR subscription billing' },
      { name: 'Resend', reason: 'Automated invoice + report delivery' },
    ],
    impact: {
      potential: '2M+ SA SMEs underserved by global SaaS',
      economy: 'R11,200/mo replaced by R2,500/mo',
      problem: 'Tool fragmentation + WhatsApp dependency',
      metric: '5 agents replace 6 subscriptions',
    },
    liveUrl: null,
    githubUrl: null,
    images: [],
    metaTitle: 'AdminOS — AI Business OS for South African SMEs | Nandawula Regine',
    metaDescription:
      'AdminOS replaces 6 SaaS subscriptions with 5 specialist Claude AI agents, accessible via WhatsApp. Built for South African SMEs by Nandawula Regine.',
    keywords: [
      'AdminOS',
      'AI business software South Africa',
      'WhatsApp CRM South Africa',
      'SA SME tools',
      'AI business assistant South Africa',
    ],
    buildJourney: {
      narrative: `AdminOS is the product that Cortex Hub Booking, Chanty Shuttle Services, and every SME client engagement made inevitable. After building a booking system for creative hubs and watching a shuttle service owner manage bookings via WhatsApp at midnight, the pattern was unmistakable: South African small business owners are not technology-averse — they are technology-abandoned.

The tools that exist were built for US small businesses, priced in USD, and designed around infrastructure that SA businesses don't have. AdminOS was built to fix that.

The multi-agent architecture puts five specialist Claude agents behind a WhatsApp interface — the single communication channel every SA business owner already uses. The load-shedding-aware offline mode was not a feature request. It was a requirement from day one.`,
      codeExample: `// Agent orchestration — intent routing with context sharing
// Each agent has a focused system prompt; shared context prevents re-fetching

const AGENT_ROUTES = {
  SALES: /invoice|quote|client|proposal|payment/i,
  FINANCE: /expense|budget|report|bank|cash flow/i,
  HR: /staff|leave|payroll|shift|employee/i,
  COMMS: /email|message|customer|complaint|follow.?up/i,
  ANALYTICS: /stats|performance|revenue|growth|metrics/i,
} as const;

async function routeToAgent(message: string, businessId: string) {
  // Load shared business context once — cached in Upstash Redis (15min TTL)
  const context = await getOrFetchBusinessContext(businessId);

  // Route to specialist
  const agentType = Object.entries(AGENT_ROUTES)
    .find(([, pattern]) => pattern.test(message))?.[0] ?? 'GENERAL';

  const response = await anthropic.messages.create({
    model: 'claude-opus-4-6',
    system: AGENT_PROMPTS[agentType](context), // Specialist prompt + business context
    messages: [{ role: 'user', content: message }],
  });

  return { response: response.content[0].text, agent: agentType };
}`,
      codeLanguage: 'typescript',
      codeLabel: 'Agent routing — intent classification with shared context',
      lessons: [
        "WhatsApp is the South African B2B UX pattern — building an app that requires a new download is a barrier to adoption",
        "Multi-tenant RLS: every SME's data must be isolated at the database layer, not the application layer",
        'Shared context cache (Upstash Redis) prevents 5 agents from each fetching the same business data on every message',
        'Load-shedding-aware architecture: offline queue + sync-on-reconnect is not optional for SA infrastructure',
        'AdminOS pricing (R2,500/mo) was set by calculating what it replaces (R11,200/mo) — value-based pricing from day one',
      ],
    },
  },

  watchsankofa: {
    slug: 'watchsankofa',
    title: 'WatchSankofa',
    tagline: 'The African-First Streaming Platform — 85% Revenue Share for Creators',
    description:
      "Video streaming platform for African creators built on the Sankofa principle: go back and fetch what was lost. 85% creator revenue share vs Netflix's ~7%. Flutterwave payouts, isiXhosa content support, African cinematic design system.",
    category: 'Streaming · Creative Technology · Social Impact',
    status: 'Beta',
    year: '2025',
    problem:
      "African creators build audiences on platforms built for Hollywood. Netflix pays creators ~7% revenue share. YouTube's algorithm has no concept of African cultural content. There is no streaming home built for the continent.",
    solution:
      "A full-stack streaming platform with Cloudinary video processing, 85% revenue share for creators, Flutterwave Africa-native payouts, language-first content discovery, and a cinematic dark design system built around African visual identity.",
    techStack: [
      { name: 'Next.js 14', reason: 'SSR for SEO + fast initial load on SA mobile data' },
      { name: 'TypeScript', reason: 'Type safety for creator and content data models' },
      { name: 'Supabase', reason: 'Content metadata, creator profiles, viewer analytics' },
      { name: 'Cloudinary', reason: 'Video processing, transcoding, adaptive streaming' },
      { name: 'Flutterwave', reason: 'Africa-native creator payouts (ZAR, NGN, KES, GHS)' },
      { name: 'Tailwind CSS', reason: 'Cinematic dark theme — mahogany, amber, deep red' },
    ],
    impact: {
      potential: 'African content creators continent-wide',
      economy: '85% revenue share vs 7% Netflix',
      problem: 'No African streaming home exists',
      metric: 'Sankofa: reclaiming what was lost',
    },
    liveUrl: null,
    githubUrl: null,
    images: [],
    metaTitle: 'WatchSankofa — African Streaming Platform | 85% Creator Revenue Share | Nandawula Regine',
    metaDescription:
      "WatchSankofa is an African-first streaming platform with 85% creator revenue share, Flutterwave payouts, and language-first discovery. Built by Nandawula Regine.",
    keywords: [
      'African streaming platform',
      'WatchSankofa',
      'African creator monetisation',
      'Sankofa streaming',
      'African video platform',
    ],
    buildJourney: {
      narrative: `WatchSankofa began as a question asked during the YouTube clone build: what does YouTube get wrong for African creators? The answer became the product specification.

YouTube pays creators through an opaque ad revenue model that typically translates to 3-7% of content value. WatchSankofa pays 85% directly. The 'Sankofa' principle — the Akan concept of going back to fetch what was lost — is not branding. It is the engineering brief.

The Cloudinary integration handles the hardest part of any streaming platform: adaptive bitrate streaming that works on South African mobile data speeds. The creator dashboard shows not just views but earnings, watch time, and language distribution of the audience — the metrics that matter for a creator-first platform.`,
      lessons: [
        "85% creator revenue share is a positioning decision before it is a financial one — it signals whose side the platform is on",
        'Adaptive bitrate streaming (Cloudinary) is required for SA mobile data realities — not all viewers are on fibre',
        'Flutterwave enables ZAR, NGN, KES, GHS payouts — Stripe does not; Africa-native payment rails are required for Africa-native creators',
        'Sankofa principle as product philosophy: the platform exists to recover something that was taken, not to compete with what exists',
      ],
    },
  },

  sankofasessions: {
    slug: 'sankofasessions',
    title: 'SankofaSessions',
    tagline: 'The Media Publication Powering the WatchSankofa Content Flywheel',
    description:
      "Editorial media publication featuring African founders, creators, and builders. Functions as both a standalone publication and the content pipeline feeding WatchSankofa — interviews, essays, founder stories, and build-in-public content.",
    category: 'Media · Content Strategy · Publishing',
    status: 'Beta',
    year: '2025',
    problem:
      "African entrepreneurs have no dedicated media platform telling their stories with the depth and respect they deserve. Founder stories get reduced to LinkedIn posts or buried in global media that doesn't understand the context.",
    solution:
      'An editorial publication with long-form interviews, founder profiles, and technical essays. Integrated with Substack for subscriber management and WatchSankofa for video content. The media flywheel: publication builds audience → audience discovers streaming platform → creators want to be featured.',
    techStack: [
      { name: 'Next.js 14', reason: 'Static generation for fast editorial page loads' },
      { name: 'TypeScript', reason: 'Type-safe content schema' },
      { name: 'Supabase', reason: 'Article database, author profiles' },
      { name: 'Substack', reason: 'Email newsletter and subscriber management' },
    ],
    impact: {
      potential: 'African founders and creators',
      economy: 'Content → WatchSankofa flywheel',
      problem: 'No dedicated African founder media',
      metric: 'Standalone publication + streaming pipeline',
    },
    liveUrl: 'https://sankofasessions.co.za',
    githubUrl: null,
    images: [],
    metaTitle: 'SankofaSessions — African Founder Media Publication | Nandawula Regine',
    metaDescription:
      "SankofaSessions is an editorial publication featuring African founders, creators, and builders. The media publication powering the WatchSankofa content flywheel.",
    keywords: [
      'African founder stories',
      'SankofaSessions',
      'African tech media',
      'African entrepreneur publication',
    ],
    buildJourney: {
      narrative: `SankofaSessions was designed as the media layer of a larger content flywheel. The thesis: great streaming platforms are built on great editorial culture. Before WatchSankofa had content, it needed a publication that established what African creative excellence looks like.

Founder interviews are long-form — 2,000+ words — because the depth of the story is the differentiator. The Substack integration handles subscriber growth without building a proprietary newsletter system.

The editorial voice is intentionally specific: African, female, technical, poetic. Not trying to be Forbes Africa. Trying to be something that didn't exist.`,
      lessons: [
        'Media + streaming is a flywheel, not two separate products',
        'Long-form editorial is a moat — it cannot be replicated at volume without a genuine point of view',
        'Substack for subscriber management lets the editorial product focus on content, not infrastructure',
      ],
    },
  },

  creativelynanda: {
    slug: 'creativelynanda',
    title: 'CreativelyNanda.co.za',
    tagline: 'Portfolio & Digital HQ — The Website That Builds Itself',
    description:
      'My personal portfolio, digital headquarters, and product platform — a magazine-inspired, AI-integrated website with a Notion template shop, poetry collection, blog, and AI assistant. Built with Next.js, Supabase, and PayFast.',
    category: 'Web App · Personal Brand · Full-Stack',
    status: 'Live',
    year: '2025',
    problem:
      'Generic developer portfolios fail to capture multidimensional creatives. A platform was needed that simultaneously showcases technical excellence, creative identity, and functions as a revenue-generating business.',
    solution:
      'A full-stack personal brand platform with editorial design aesthetics, a functional Notion template shop (PayFast integrated), published poetry collection, AI sales assistant, blog CMS, and PWA capabilities.',
    techStack: [
      { name: 'Next.js 14', reason: 'App Router, SEO, PWA' },
      { name: 'TypeScript', reason: 'Type safety across all features' },
      { name: 'Supabase', reason: 'Products, orders, blog, poetry database' },
      { name: 'Claude API', reason: 'AI assistant for visitor engagement' },
      { name: 'PayFast', reason: 'South African payment gateway for template sales' },
      { name: 'Resend', reason: 'Transactional email delivery' },
      { name: 'Framer Motion', reason: 'Editorial animation system' },
    ],
    impact: {
      potential: 'African creative technologists',
      economy: 'Monthly recurring revenue',
      problem: 'Generic portfolio problem',
      metric: '72+ commits, 6 Notion templates live',
    },
    liveUrl: 'https://creativelynanda.co.za',
    githubUrl: 'https://github.com/Nanda-Regine/CreativelyNanda.co.za',
    images: [],
    metaTitle: 'CreativelyNanda.co.za — Portfolio & Digital HQ | Nandawula Regine',
    metaDescription:
      'CreativelyNanda.co.za is a full-stack personal brand platform with Notion template shop, poetry collection, blog, and AI assistant. Built with Next.js, Supabase, and PayFast by Nandawula Regine.',
    keywords: [
      'creative technologist portfolio',
      'African developer portfolio',
      'Nandawula Regine portfolio',
      'Next.js portfolio with shop',
      'PayFast portfolio website',
    ],
  },

  // ── Foundation / Where It Started ────────────────────────────────────────────

  'poetry-tube': {
    slug: 'poetry-tube',
    title: 'PoetryTube',
    tagline: 'Language-First Video Platform for African Spoken Word Poetry',
    description:
      "A dedicated video platform for African spoken word poets — isiZulu, Sesotho, Luganda as first-class discovery dimensions. Live applause via Supabase Realtime turns individual viewing into collective experience. Built by a published poet who has lived the exact problem.",
    category: 'Creative · Web App · Social Impact',
    status: 'Beta',
    year: '2025',
    problem:
      "YouTube's algorithm has no concept of spoken word poetry as a distinct cultural form. A poet performing in isiZulu has the same discoverability as a gaming livestream. African poets deserve a home built for them.",
    solution:
      "Language-first content architecture: filter by language, style, country, and emotion. Live applause via Supabase Realtime broadcast — all connected viewers receive the increment simultaneously. Mux video for smooth streaming on SA mobile data.",
    techStack: [
      { name: 'Next.js 14', reason: 'SSR for content discovery SEO' },
      { name: 'TypeScript', reason: 'Type-safe content and user models' },
      { name: 'Supabase', reason: 'Realtime broadcast for live applause + content database' },
      { name: 'Mux', reason: 'Adaptive video streaming optimised for African mobile data' },
      { name: 'Tailwind CSS', reason: 'African-inspired dark design system' },
    ],
    impact: {
      potential: 'African spoken word poets continent-wide',
      economy: 'African creative digital economy',
      problem: "Algorithmic invisibility for African poets",
      metric: 'Language-first: isiZulu, Sesotho, Luganda as search filters',
    },
    liveUrl: 'https://poetry-tube.vercel.app',
    githubUrl: 'https://github.com/Nanda-Regine/PoetryTube',
    images: [],
    metaTitle: 'PoetryTube — Language-First Video Platform for African Poetry | Nandawula Regine',
    metaDescription:
      'PoetryTube is a spoken word video platform with isiZulu, Sesotho, and Luganda discovery filters. Live applause via Supabase Realtime. Built by Nandawula Regine.',
    keywords: [
      'African poetry platform',
      'spoken word video platform Africa',
      'PoetryTube',
      'isiZulu poetry platform',
      'African spoken word app',
    ],
    buildJourney: {
      narrative: `PoetryTube was built from a personal injustice: YouTube's algorithm has no concept of spoken word poetry as a distinct cultural form. A poet performing in isiZulu has the same discoverability as a gaming livestream.

PoetryTube treats language as a first-class discovery dimension — you can filter by language, style, country, and emotion. The live applause feature was the most technically complex component: when a viewer taps applause during a performance, a Supabase Realtime broadcast is sent to all connected clients watching that performance simultaneously. The applause counter increments in real time for everyone.

That shared moment — a room filling with applause through a screen — changes the product from media consumption to live cultural event.`,
      codeExample: `// Supabase Realtime — live applause during performances
// All viewers on the same performance receive the increment simultaneously

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(url, key);

// SENDER: viewer taps applause
async function sendApplause(performanceId: string) {
  await supabase.channel(\`performance:\${performanceId}\`)
    .send({
      type: 'broadcast',
      event: 'applause',
      payload: { performance_id: performanceId, ts: Date.now() }
    });

  // Also increment persistent counter
  await supabase.rpc('increment_applause', { perf_id: performanceId });
}

// RECEIVER: all connected viewers update their counter
function subscribeToApplause(performanceId: string, onApplause: () => void) {
  return supabase
    .channel(\`performance:\${performanceId}\`)
    .on('broadcast', { event: 'applause' }, onApplause)
    .subscribe();
}`,
      codeLanguage: 'typescript',
      codeLabel: 'Supabase Realtime — live applause broadcast',
      lessons: [
        'Supabase Realtime presence channels are the right primitive for live collaborative features — not WebSockets from scratch',
        'Language-first content architecture: language must be a discovery dimension, not a filter option',
        'The most personal project is the most differentiated — biographical legitimacy cannot be engineered',
        'Products built from injustice last',
      ],
    },
  },

  'true-access-app': {
    slug: 'true-access-app',
    title: 'True Access',
    tagline: 'Community-Verified Accessibility Database for 4M Disabled South Africans',
    description:
      "Community-driven accessibility mapping platform for disabled users in South Africa. WCAG-compliant by design — accessibility-first development applied throughout. Weighted confidence scoring: recency and contributor trust improve the accuracy of community-sourced data.",
    category: 'Accessibility · Community Impact · Web App',
    status: 'Live',
    year: '2025',
    problem:
      '4 million South Africans with disabilities have no verified accessibility database for public spaces. Existing resources are outdated, incomplete, or simply non-existent — creating daily barriers to independence.',
    solution:
      'A community-verified accessibility scoring system with Mapbox GL JS spatial visualisation, weighted confidence scoring (recency + contributor trust), and WCAG-compliant UI. Co-founded — first multi-stakeholder technical collaboration.',
    techStack: [
      { name: 'Next.js', reason: 'PWA support + SSR for performance' },
      { name: 'TypeScript', reason: 'Reliable geolocation data handling' },
      { name: 'Mapbox GL JS', reason: 'Accessibility-specific visual language, developer-friendly pricing' },
      { name: 'Supabase', reason: 'Real-time venue updates + contributor management' },
      { name: 'Tailwind CSS', reason: 'WCAG-first, keyboard-navigable UI' },
    ],
    impact: {
      potential: '4M disabled South Africans',
      economy: 'Zero reliable accessibility data → verified database',
      problem: 'Daily barriers to independence and participation',
      metric: 'WCAG-compliant by design — accessibility-first development',
    },
    liveUrl: 'https://true-access-app.vercel.app',
    githubUrl: 'https://github.com/Nanda-Regine/TrueAccApp',
    images: [],
    metaTitle: 'True Access — Verified Accessibility Mapping for Disabled South Africans | Nandawula Regine',
    metaDescription:
      "True Access is a community-verified accessibility database for South Africa's 4M disabled people. WCAG-compliant, Mapbox-powered. Built by Nandawula Regine.",
    keywords: [
      'accessibility app South Africa',
      'True Access App',
      'disability accessibility map',
      'accessible venues South Africa',
      'Mapbox accessibility',
      'WCAG South Africa',
    ],
    buildJourney: {
      narrative: `TrueAccApp introduced four technical capabilities in sequence: Mapbox GL JS spatial visualisation, co-founder technical collaboration, crowdsourced data models with confidence scoring, and WCAG accessibility compliance as a primary engineering constraint.

The accessibility-first development principle was the most important takeaway: building for users with visual impairments, motor limitations, and cognitive differences requires decisions that make the product better for every user. ARIA labels, keyboard navigation, semantic HTML, and readable contrast ratios are not accessibility features. They are quality standards.

Every subsequent product in the portfolio applies this principle.`,
      codeExample: `-- Accessibility confidence scoring
-- Community-verified data with weighted trust model
SELECT
  l.id,
  l.name,
  l.address,
  l.lat,
  l.lng,
  AVG(ar.score) as avg_accessibility_score,
  COUNT(ar.id) as review_count,
  -- Confidence: higher weight for recent + verified contributor reviews
  SUM(
    ar.score *
    CASE WHEN u.is_verified_contributor THEN 1.5 ELSE 1.0 END *
    CASE WHEN ar.created_at > NOW() - INTERVAL '6 months' THEN 1.2 ELSE 1.0 END
  ) / NULLIF(SUM(
    CASE WHEN u.is_verified_contributor THEN 1.5 ELSE 1.0 END *
    CASE WHEN ar.created_at > NOW() - INTERVAL '6 months' THEN 1.2 ELSE 1.0 END
  ), 0) as confidence_score
FROM locations l
LEFT JOIN accessibility_reviews ar ON l.id = ar.location_id
LEFT JOIN users u ON ar.user_id = u.id
WHERE l.lat BETWEEN $1 AND $2 AND l.lng BETWEEN $3 AND $4
GROUP BY l.id, l.name, l.address, l.lat, l.lng
ORDER BY confidence_score DESC NULLS LAST;`,
      codeLanguage: 'sql',
      codeLabel: 'Weighted accessibility confidence scoring',
      lessons: [
        'Accessibility compliance is a quality standard, not a feature — it improves the product for every user',
        'Community-sourced data needs confidence scoring, not just averaging — recency and contributor trust should weight the score',
        'Mapbox GL JS custom layers outperform Google Maps for accessibility-specific visual languages',
        'Co-founding requires explicit technical alignment on architecture decisions — velocity requires governance',
      ],
    },
  },

  'cortex-hub': {
    slug: 'cortex-hub',
    title: 'Cortex Hub Booking',
    tagline: 'PostgreSQL tsrange Logic — Zero Double-Bookings at Any Concurrency',
    description:
      'Booking platform for South African creative hubs. PostgreSQL tsrange overlap operator with GIST index prevents double-bookings under concurrent writes. First PayFast ITN webhook implementation in the portfolio — architectural ancestor of AdminOS.',
    category: 'SaaS · Booking · SME Tools',
    status: 'Live',
    year: '2025',
    problem:
      'SA creative hubs run on WhatsApp and paper booking registers. The inevitable result: double bookings, lost revenue, and client disputes. A SELECT check before INSERT is not enough under concurrent writes.',
    solution:
      'PostgreSQL tsrange type + GIST index + EXCLUDE constraint fires on INSERT if any confirmed booking overlaps the requested range — safe under any concurrency. PayFast ITN webhook verifies payment before confirming booking.',
    techStack: [
      { name: 'Next.js 14', reason: 'App Router for booking flow + PayFast webhook API routes' },
      { name: 'TypeScript', reason: 'Type-safe booking state machine' },
      { name: 'Supabase', reason: 'PostgreSQL tsrange + GIST index — concurrent booking prevention' },
      { name: 'PayFast', reason: 'ITN webhook: payment verified before booking confirmed' },
      { name: 'Resend', reason: 'Booking confirmation emails' },
      { name: 'Tailwind CSS', reason: 'Clean booking UI' },
    ],
    impact: {
      potential: '50K+ SA creative hubs and SMEs',
      economy: 'Zero double-bookings at any concurrency',
      problem: 'WhatsApp booking = inevitable conflicts',
      metric: 'Direct architectural ancestor of AdminOS booking system',
    },
    liveUrl: 'https://cortex-hub-booking-5e35.vercel.app',
    githubUrl: 'https://github.com/Nanda-Regine/Cortex-Hub-Booking',
    images: [],
    metaTitle: 'Cortex Hub Booking — PostgreSQL Concurrent Booking Prevention | Nandawula Regine',
    metaDescription:
      'Cortex Hub Booking uses PostgreSQL tsrange overlap constraints to prevent double-bookings under concurrent writes. First PayFast ITN implementation in the portfolio. Built by Nandawula Regine.',
    keywords: [
      'booking system South Africa',
      'Cortex Hub',
      'PostgreSQL tsrange booking',
      'PayFast booking system',
      'SA creative hub booking',
    ],
    buildJourney: {
      narrative: `Cortex Hub Booking solved a deceptively simple problem: is this space free at this time? The deception is in the edge cases. Between a user clicking 'Book' and the database writing the reservation, another user could have claimed the slot.

A simple SELECT check before INSERT is not enough — in a concurrent system, two users can pass the check simultaneously and both write. The solution was PostgreSQL's tsrange overlap operator combined with a unique constraint. The tsrange type represents a time interval and the && operator checks for intersection — if any confirmed booking overlaps with the requested range, the constraint fires and the second INSERT is rejected.

This pattern was later deployed in VarsityOS (study room booking), AdminOS (appointment scheduling), and forms the basis of every calendar feature in the portfolio.`,
      codeExample: `-- Availability check: prevents double-booking with PostgreSQL tsrange
-- The constraint fires even under concurrent writes

-- 1. Schema: booking overlap constraint
ALTER TABLE bookings ADD CONSTRAINT no_overlap
  EXCLUDE USING gist (
    space_id WITH =,
    tsrange(start_time, end_time, '[)') WITH &&
  ) WHERE (status = 'confirmed');

-- 2. Availability query (returns TRUE if space is free)
SELECT NOT EXISTS (
  SELECT 1 FROM bookings
  WHERE space_id = $1
    AND status = 'confirmed'
    AND tsrange(start_time, end_time, '[)') && tsrange($2::timestamptz, $3::timestamptz, '[)')
) AS is_available;

-- 3. Atomic booking creation (will raise error on conflict)
INSERT INTO bookings (space_id, user_id, start_time, end_time, status)
VALUES ($1, $2, $3, $4, 'pending')
RETURNING id;`,
      codeLanguage: 'sql',
      codeLabel: 'PostgreSQL tsrange — concurrent booking prevention',
      lessons: [
        'Availability checking must happen at the database layer with a constraint — application-level checks are not safe under concurrency',
        'PostgreSQL tsrange + GIST index handles interval arithmetic better than any application code',
        'PayFast ITN webhook: the signature must be verified server-side before updating booking status',
        'Every manual WhatsApp booking message is a future AdminOS feature specification',
      ],
    },
  },

  'green-vault': {
    slug: 'green-vault',
    title: 'GreenVault eCommerce',
    tagline: 'The Complete eCommerce Data Lifecycle — From Cart to Signed Download URL',
    description:
      "Complete eCommerce platform with the full digital goods delivery lifecycle: PayFast ITN → idempotent webhook handler → signed Supabase Storage URL (48-hour expiry) → Resend confirmation email. The earth-toned design system became the Mirembe Muse brand palette.",
    category: 'eCommerce · Full-Stack',
    status: 'Live',
    year: '2025',
    problem:
      "SA sustainable products are scattered across informal sellers and Instagram pages. But GreenVault's real problem was engineering: digital goods delivery must be idempotent — PayFast can send the same ITN multiple times.",
    solution:
      "Idempotency check on payment reference before processing. Signed Supabase Storage URLs with 48-hour expiry for digital download delivery. Earth-toned design system (forest green, terracotta, cream, warm amber) built for the SA sustainable market.",
    techStack: [
      { name: 'Next.js 14', reason: 'Performance + SEO for eCommerce, API routes for PayFast ITN' },
      { name: 'TypeScript', reason: 'Reliable payment and inventory logic' },
      { name: 'Supabase', reason: 'Product database + Storage for signed download URLs' },
      { name: 'PayFast', reason: 'Native SA payment gateway — ITN webhook' },
      { name: 'Resend', reason: 'Order confirmation + download link emails' },
      { name: 'Tailwind CSS', reason: 'Earth-toned design system' },
    ],
    impact: {
      potential: 'SA sustainable commerce market',
      economy: 'Complete eCommerce data model deployed',
      problem: 'Digital goods delivery must be idempotent',
      metric: "Earth-toned design system became Mirembe Muse's brand palette",
    },
    liveUrl: 'https://green-valut-e-commerce-store-demo.vercel.app',
    githubUrl: 'https://github.com/Nanda-Regine/GreenValut-eCommerce-store-demo',
    images: [],
    metaTitle: 'GreenVault eCommerce — PayFast Idempotent Webhook + Signed Download URLs | Nandawula Regine',
    metaDescription:
      'GreenVault is a full eCommerce platform with idempotent PayFast ITN handling, signed Supabase Storage download URLs, and Resend email delivery. Built by Nandawula Regine.',
    keywords: [
      'eCommerce template South Africa',
      'PayFast eCommerce integration',
      'Next.js eCommerce template',
      'South African online store',
      'Green Vault eCommerce',
      'PayFast ITN webhook',
    ],
    buildJourney: {
      narrative: `GreenVault was the most technically comprehensive foundation project: it implemented the complete eCommerce data lifecycle that now runs the Mirembe Muse Store.

The hardest problem was digital goods delivery. When a customer pays for a digital product, the flow has to be: PayFast sends ITN → verify signature → mark order confirmed → generate a signed Supabase Storage URL with 48-hour expiry → send email via Resend. The entire chain must be atomic and idempotent — PayFast can send the same ITN multiple times, so the webhook handler must be safe to run repeatedly without creating duplicate orders or sending multiple emails.

The earth-toned design system (forest green, terracotta, cream, warm amber) built for GreenVault became the Mirembe Muse brand palette.`,
      codeExample: `// PayFast ITN webhook — idempotent handler
// Safe to run multiple times for the same payment reference

export async function POST(request: Request) {
  const body = await request.formData();
  const params = Object.fromEntries(body.entries()) as Record<string, string>;

  // 1. Verify ITN signature (field order must match POST body order)
  const { payment_status, pf_payment_id } = params;
  const isValid = await verifyPayFastSignature(params);
  if (!isValid) return new Response('Invalid signature', { status: 403 });

  // 2. Idempotency check — skip if already processed
  const { data: existingOrder } = await supabase
    .from('orders')
    .select('id, status')
    .eq('payfast_payment_id', pf_payment_id)
    .single();

  if (existingOrder?.status === 'confirmed') {
    return new Response('Already processed', { status: 200 }); // PayFast needs 200
  }

  if (payment_status === 'COMPLETE') {
    // 3. Generate signed URL with 48hr expiry
    const { data: signedUrl } = await supabase.storage
      .from('products')
      .createSignedUrl(order.file_path, 48 * 60 * 60);

    // 4. Update order + send confirmation email
    await supabase.from('orders').update({
      status: 'confirmed',
      download_url: signedUrl.signedUrl,
    }).eq('id', existingOrder.id);

    await resend.emails.send({ /* confirmation email */ });
  }

  return new Response('OK', { status: 200 });
}`,
      codeLanguage: 'typescript',
      codeLabel: 'PayFast ITN handler — idempotent webhook pattern',
      lessons: [
        'PayFast ITN handlers must be idempotent — the same notification can arrive 2-3 times',
        'Signed Supabase Storage URLs are the correct pattern for digital goods delivery — not public URLs',
        'The eCommerce order state machine (pending → confirmed → fulfilled → refunded) belongs in the database as a CHECK constraint, not application logic',
        'Earth-toned design systems (forest green, terracotta, cream) are inherently brand-appropriate for African wellness/sustainable commerce',
      ],
    },
  },

  'youtube-clone': {
    slug: 'youtube-clone',
    title: 'YouTube Clone',
    tagline: "Day One. July 13, 2025. The Foundation of Everything.",
    description:
      "The very first project. YouTube's full UI in raw HTML and CSS — no framework, no API, no dependencies. Custom @CreativelyNanda thumbnails: poetry, code, lookbook, identity. The channel name was already there on day one.",
    category: 'Foundation · Frontend · CSS',
    status: 'Completed',
    year: '2025',
    problem:
      'Before building WatchSankofa, you have to understand what you\'re improving upon. Every layout decision was studied: the sidebar hierarchy, the card grid, the metadata density.',
    solution:
      'Full YouTube UI in raw HTML/CSS — no framework, no API. Custom thumbnails with the @CreativelyNanda channel identity already established. CSS Grid for the video card layout, Flexbox for component alignment.',
    techStack: [
      { name: 'HTML5', reason: 'Semantic component structure — no framework' },
      { name: 'CSS3', reason: 'All layout and styling' },
      { name: 'CSS Grid', reason: 'Video card grid layout' },
      { name: 'Flexbox', reason: 'Component alignment' },
      { name: 'Vanilla JavaScript', reason: 'Minimal interactivity' },
    ],
    impact: {
      potential: 'Foundation for WatchSankofa',
      economy: 'CSS mastery that underlies every design system',
      problem: "YouTube's UI as research for what to improve",
      metric: 'July 13, 2025: the first commit. The empire started here.',
    },
    liveUrl: null,
    githubUrl: 'https://github.com/Nanda-Regine/CreativelyNanda-Youtube-clone',
    images: [],
    metaTitle: 'YouTube Clone — Day One. The Foundation. | Nandawula Regine',
    metaDescription:
      "Full YouTube UI in raw HTML/CSS. Custom @CreativelyNanda thumbnails. Built July 13, 2025 — the very first project. SheCodes Plus. By Nandawula Regine.",
    keywords: [
      'YouTube clone HTML CSS',
      'CSS Grid project',
      'SheCodes project',
      'foundation project web development',
    ],
    buildJourney: {
      narrative: `Built on July 13, 2025 — the very first day. Running locally at 127.0.0.1:5500 in pure HTML and CSS with no framework, no API, no dependencies.

The YouTube clone was not a tutorial exercise. It was UI reverse engineering conducted with a specific question in mind: what does YouTube get wrong for African creators? Every layout decision was studied: the sidebar hierarchy, the card grid, the metadata density.

The custom thumbnails told the whole story before the story had been written: @CreativelyNanda, a poetry short film, a coding journey, a personal essay on identity, a style lookbook. The channel name was already there on day one.

This is where everything started. This is the proof that fundamentals matter — the developer who can build YouTube's UI in raw CSS understands the web.`,
      lessons: [
        'Fundamentals before frameworks: CSS Grid and Flexbox mastery enables every design system that comes after',
        'Clone to learn, not to copy: the YouTube clone is research for WatchSankofa',
        'The thumbnails knew who she was going to become before the company existed',
        'July 13, 2025: day one. The empire started here.',
      ],
    },
  },

  'weather-app': {
    slug: 'weather-app',
    title: 'MoodCast Weather App',
    tagline: 'Original Poems for Every Weather Condition — and a Load Shedding Mood Card',
    description:
      "SheCodes Plus weather app built by a published poet. Original poems for rain, sun, wind, clouds, storms. South Africa's load shedding mood card — candle rituals, battery-saving affirmations, a poem about sitting in the dark. The most-shared feature in testing.",
    category: 'Web App · API Integration · SheCodes Plus',
    status: 'Live',
    year: '2025',
    problem:
      "Weather apps give you data. What does a published poet build when she gets a weather brief? The standard tutorial project is a brief, not a destination.",
    solution:
      "OpenWeatherMap API + Geolocation API for real-time data. Original poems written for each weather condition. South Africa load shedding mood card — converts national frustration into a moment of care. SheCodes Plus certified.",
    techStack: [
      { name: 'HTML5', reason: 'Semantic markup — no framework' },
      { name: 'CSS3', reason: 'Atmospheric gradients, responsive design' },
      { name: 'Vanilla JavaScript', reason: 'API calls, DOM manipulation, geolocation' },
      { name: 'OpenWeatherMap API', reason: 'Real-time weather data' },
      { name: 'Geolocation API', reason: 'Location-based weather without manual input' },
    ],
    impact: {
      potential: 'South African users + SheCodes learners',
      economy: 'SheCodes Plus certification',
      problem: 'Standard project → personal creative statement',
      metric: 'Load shedding mood card: most-shared feature in testing',
    },
    liveUrl: 'https://myweatherapp.vercel.app',
    githubUrl: 'https://github.com/Nanda-Regine/my-weather-app',
    images: [],
    metaTitle: 'MoodCast Weather App — Poems for Every Weather, Load Shedding Mood Card | Nandawula Regine',
    metaDescription:
      "SheCodes Plus weather app with original poems for every weather condition and a South Africa load shedding mood card. Built by Nandawula Regine.",
    keywords: [
      'weather app JavaScript',
      'SheCodes weather app',
      'South Africa load shedding app',
      'OpenWeather API project',
      'MoodCast weather',
    ],
    buildJourney: {
      narrative: `The SheCodes Plus curriculum required a weather app. The question was: what does a weather app built by a published poet look like?

The technical implementation — API key, geolocation, fetch, parse, render — was the fastest part. The real work was the content library: original poems written for each weather condition, self-care rituals matched to each condition, and a South Africa-specific addition that no tutorial suggests — the load shedding mood card.

The load shedding card converts what every South African acknowledges as a frustration into a moment of care: candle rituals, battery-saving affirmations, a poem about sitting in the dark. It became the most-shared feature in user testing.

The lesson: the standard project is the starting point, not the destination.`,
      lessons: [
        "SheCodes Plus taught the fundamentals — the project taught the identity",
        'The load shedding card is a product insight: products that acknowledge SA lived reality earn trust competitors cannot buy',
        'The standard tutorial project is a brief, not a destination — the question is always: what would make this mine?',
        'Original content (poems per weather condition) is a moat that technical skill alone cannot replicate',
      ],
    },
  },

  'netflix-clone': {
    slug: 'netflix-clone',
    title: 'Netflix Landing',
    tagline: 'Pixel-Perfect Design Precision Training — SheCodes Plus',
    description:
      "Pixel-perfect CSS recreation of the Netflix landing page — a SheCodes Plus exercise in design precision. No source inspection. Forces understanding of how modern UIs are actually constructed. The discipline of visual accuracy in recreation translates directly to the discipline of visual accuracy in original design.",
    category: 'Frontend · CSS · SheCodes Plus',
    status: 'Completed',
    year: '2025',
    problem:
      "Design precision training: can you recreate pixel-perfect what you see? Without inspecting source. This forces real understanding of how layouts, gradients, and animations are constructed.",
    solution:
      "Full Netflix landing page in pure CSS. CSS Grid + Flexbox mastery demonstrated. Responsive at all breakpoints. FAQ accordion in pure CSS. SheCodes Plus certified.",
    techStack: [
      { name: 'HTML5', reason: 'Semantic, accessible markup' },
      { name: 'CSS3', reason: 'All layout and animation' },
      { name: 'Flexbox', reason: 'Component alignment' },
      { name: 'CSS Grid', reason: 'Section layouts' },
      { name: 'Vanilla JavaScript', reason: 'Accordion interactivity' },
    ],
    impact: {
      potential: 'Design precision foundation',
      economy: 'SheCodes Plus certification',
      problem: 'CSS layout + visual accuracy mastery',
      metric: '100% responsive, pixel-perfect recreation',
    },
    liveUrl: null,
    githubUrl: null,
    videoUrl: '/assets/project-screen-record/netflix-clone.mp4',
    images: [],
    metaTitle: 'Netflix Landing Clone — CSS Design Precision Training | Nandawula Regine',
    metaDescription:
      'Pixel-perfect Netflix landing page clone. CSS Grid, Flexbox, pure CSS accordion. SheCodes Plus certified. By Nandawula Regine.',
    keywords: ['Netflix landing page clone', 'HTML CSS project', 'SheCodes Plus project', 'CSS Grid Flexbox'],
    buildJourney: {
      narrative: `Pixel-perfect CSS recreation of the Netflix landing page — a SheCodes Plus exercise in design precision. The challenge: recreate exactly what you see without inspecting the source.

This forces understanding of how modern UIs are actually constructed: how Netflix achieves its card layout, how the hero gradient works, how the FAQ accordion is built in pure CSS.

The discipline of visual accuracy in recreation translates directly to the discipline of visual accuracy in original design. Every pixel-perfect clone makes you a more precise original designer.`,
      lessons: [
        'Design precision training: if you can recreate it exactly, you understand it completely',
        'CSS is a capability, not a stepping stone — the developer who knows it deeply builds faster in any framework',
        'SheCodes Plus: where the foundations were built',
      ],
    },
  },

  // ── Client Work ──────────────────────────────────────────────────────────────

  'womens-retreat': {
    slug: 'womens-retreat',
    title: "Women's Retreat — Yellowwood Forest",
    tagline: 'Cinematic Landing Experience for a Luxury Wellness Retreat',
    description:
      "Client project: an immersive single-page web experience for a women's wellness retreat in the Eastern Cape. Forest-first design — atmosphere before information. Trust-first conversion architecture for a trust-first market.",
    category: 'Client Work · Front-End · Conversion Design',
    status: 'Live',
    year: '2025',
    problem:
      "Wellness retreats targeting women need digital presence that earns trust before listing prices. Most event websites present dates and prices before the visitor has felt anything about the brand.",
    solution:
      'A cinematic, single-page experience that leads with atmosphere over information. Full-bleed nature photography, layered serif typography that slows the reader, narrative content sequence that answers emotional questions before practical ones.',
    techStack: [
      { name: 'HTML5', reason: 'Zero dependencies — site works flawlessly without maintenance' },
      { name: 'CSS3', reason: 'Full-bleed layouts, atmospheric gradients, scroll animations' },
      { name: 'Vanilla JavaScript', reason: 'Minimal interactivity — the design does the work' },
    ],
    impact: {
      potential: "Women's wellness retreat market",
      economy: 'Active retreat promotion — live site',
      problem: 'Trust-first conversion design for emotional markets',
      metric: 'Launched and used for live retreat promotion',
    },
    liveUrl: 'https://women-retreat-yellowwood-forest.vercel.app',
    githubUrl: 'https://github.com/Nanda-Regine/women-retreat-yellowwood-forest',
    images: [],
    metaTitle: "Women's Retreat Yellowwood Forest — Cinematic Web Experience | Nandawula Regine",
    metaDescription:
      "Client project: cinematic landing page for a women's wellness retreat in the Eastern Cape. Forest-first design, trust-first conversion architecture. Built by Nandawula Regine.",
    keywords: [
      "wellness retreat website South Africa",
      "women retreat landing page",
      "Eastern Cape retreat website",
      "trust-first web design",
    ],
    buildJourney: {
      narrative: `The retreat project started not with a wireframe but with a question: what should a visitor feel 10 seconds after landing? The answer was: held. Calm. Like arriving somewhere made for her.

That feeling required working backwards from emotion to technical implementation: full-bleed photography served with optimal loading, layered typography using a serif display font that slows the reader down, and a narrative content sequence that answers emotional questions before practical ones.

The lesson that stayed: design is an argument. Every visual decision argues for something — usually about the relationship between the brand and the visitor. This project's design argued: 'We see you. This is safe. You belong here.' Making that argument required understanding the audience's psychology before opening a code editor.`,
      lessons: [
        'Design is an argument — every visual decision argues for a relationship between brand and visitor',
        'Emotional architecture first, technical implementation second — for trust-first markets',
        'Zero dependencies is a feature for the right client — a static HTML site that works for 5 years is better than a React app that breaks when a dependency updates',
      ],
    },
  },

  'carpentry-business': {
    slug: 'carpentry-business',
    title: 'Kustom Krafts — Carpentry Business',
    tagline: 'Portfolio-Forward Web Presence for an SA Trade Business',
    description:
      "Client project: a craft-first website for a South African carpentry and joinery business. Portfolio gallery above the fold, WhatsApp deep link CTA as primary conversion, zero dependencies for long-term client maintainability.",
    category: 'Client Work · SME · Conversion Design',
    status: 'Live',
    year: '2025',
    problem:
      "SA trade businesses — carpenters, joiners, furniture makers — are exceptional at their craft and invisible online. Word-of-mouth caps their growth at the size of their immediate network.",
    solution:
      "Portfolio gallery above the fold — not the pitch, not pricing, the work. WhatsApp deep link CTA: wa.me/27xxx that converts immediately by meeting SA clients where they already communicate. Zero dependencies for maintenance-free longevity.",
    techStack: [
      { name: 'HTML5', reason: 'Zero dependencies — trade business owner cannot maintain a React app' },
      { name: 'CSS3', reason: 'Responsive gallery with aspect-ratio locks, lazy loading' },
      { name: 'Vanilla JavaScript', reason: 'WhatsApp deep link integration, image lazy load' },
    ],
    impact: {
      potential: 'SA trade business market',
      economy: 'Word-of-mouth → digital conversion',
      problem: 'Invisible online despite excellent craft',
      metric: 'Live and used for client acquisition',
    },
    liveUrl: 'https://kustom-krafts.vercel.app',
    githubUrl: 'https://github.com/Nanda-Regine/kustom-krafts',
    images: [],
    metaTitle: 'Kustom Krafts — Carpentry Business Website | Nandawula Regine',
    metaDescription:
      "Client project: portfolio-forward website for a South African carpentry business. WhatsApp-first conversion architecture. Built by Nandawula Regine.",
    keywords: [
      'carpentry website South Africa',
      'trade business website SA',
      'WhatsApp website conversion',
      'Kustom Krafts',
    ],
    buildJourney: {
      narrative: `The carpentry project's most important decision was made before writing a line of code: the portfolio gallery goes above the fold. Not the pitch. Not the pricing. The work.

In the South African trades market, the product sells itself — if you can see it. The WhatsApp CTA insight came from observing client communication patterns: SA clients in the SME market don't check email forms. They message on WhatsApp.

A wa.me deep link — pre-populated with 'Hi, I saw your website' — converts leads immediately by meeting them in the channel they already use. This became a rule: every SA client website should have a WhatsApp deep link as its primary CTA. It is now standard across all SME client work.`,
      lessons: [
        'Portfolio-forward layout: the craft goes above the fold in trade market websites',
        'WhatsApp is the SA SME conversion CTA — wa.me deep links outperform contact forms',
        'Zero dependencies is a service quality feature for non-technical clients',
        'Client work seeds product rules: every WhatsApp CTA lesson eventually became AdminOS architecture',
      ],
    },
  },

  'chanty-shuttle': {
    slug: 'chanty-shuttle',
    title: 'Chanty Shuttle Services',
    tagline: 'Transport Business Digital Transformation — R34,000 Growth Package Delivered',
    description:
      "Client project: full digital transformation for a South African shuttle and transport operator. R34,000 Growth Package delivered including professional website, Google Business setup, WhatsApp Business integration, and local SEO. First tiered client service model.",
    category: 'Client Work · SME · Digital Transformation',
    status: 'Live',
    year: '2025',
    problem:
      "Transport operators compete on price because they can't compete on digital perception. Chanty had reliable vehicles and quality service — and zero digital identity that reflected that quality.",
    solution:
      "Growth Package: professional website with booking inquiry flow, Google Business Profile optimisation, WhatsApp Business integration, social media templates, and local SEO. Vision Package roadmap: booking automation, affiliate marketing system for corporate partners.",
    techStack: [
      { name: 'HTML5', reason: 'Fast, lightweight — transport clients book on mobile' },
      { name: 'CSS3', reason: 'Credibility-first design — professional trust signals above fold' },
      { name: 'Vanilla JavaScript', reason: 'WhatsApp booking inquiry integration' },
    ],
    impact: {
      potential: 'SA transport and shuttle market',
      economy: 'R34,000 Growth Package delivered',
      problem: 'Word-of-mouth caps growth at network size',
      metric: 'First tiered service model: Growth → Vision Package',
    },
    liveUrl: null,
    githubUrl: 'https://github.com/Nanda-Regine/Transport-shuttle-os',
    images: [],
    metaTitle: 'Chanty Shuttle Services — Transport Business Digital Transformation | Nandawula Regine',
    metaDescription:
      "Client project: R34,000 digital transformation for a South African shuttle service. Website, WhatsApp integration, local SEO. Built by Nandawula Regine.",
    keywords: [
      'shuttle service website South Africa',
      'transport business website SA',
      'digital transformation SME South Africa',
      'Chanty Shuttle',
    ],
    buildJourney: {
      narrative: `Chanty Shuttle was the first multi-tiered client engagement — the Growth Package and Vision Package model that now structures all Mirembe Muse B2B work.

The Growth Package solved the immediate problem: establish professional credibility online. The Vision Package roadmap identified the next problem: corporate clients and hotel partners who already refer Chanty could become a systematic affiliate channel if the incentive structure was right.

A referral link system — track, attribute, reward — turns happy clients into a distribution channel. This thinking later became the LemonSqueezy affiliate architecture for digital products.

The most important lesson from Chanty: client work doesn't just generate revenue. It generates the product specifications for what comes next.`,
      lessons: [
        'Tiered pricing solves the SA SME budget reality: start where you are, grow into the next tier',
        'Corporate client affiliate architecture: happy clients as distribution channel',
        'R34,000 Growth Package: first demonstration of the Mirembe Muse B2B pricing model',
        'Client work is product research — every manual Chanty process became an AdminOS feature specification',
      ],
    },
  },
};

// ============================================================
// METADATA
// ============================================================

export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const project = projects[params.slug];
  if (!project) return { title: 'Project Not Found' };

  return {
    title: project.metaTitle,
    description: project.metaDescription,
    keywords: project.keywords,
    openGraph: {
      title: project.metaTitle,
      description: project.metaDescription,
      type: 'article',
      url: `${SITE_URL}/projects/${project.slug}`,
      images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.metaTitle,
      description: project.metaDescription,
    },
    alternates: { canonical: `${SITE_URL}/projects/${project.slug}` },
  };
}

export function generateStaticParams() {
  return Object.keys(projects).map((slug) => ({ slug }));
}

// ============================================================
// PAGE
// ============================================================

const statusColors: Record<string, string> = {
  Live: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
  Beta: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
  Completed: 'bg-white/10 text-white/50 border border-white/15',
};

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects[params.slug];
  if (!project) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.title,
    description: project.description,
    url: project.liveUrl || `${SITE_URL}/projects/${project.slug}`,
    author: { '@type': 'Person', name: AUTHOR_NAME, url: SITE_URL },
    applicationCategory: project.category,
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      availability:
        project.status === 'Live'
          ? 'https://schema.org/InStock'
          : 'https://schema.org/PreOrder',
    },
    ...(project.liveUrl && { sameAs: [project.liveUrl] }),
  };

  const otherProjects = Object.values(projects)
    .filter((p) => p.slug !== project.slug)
    .slice(0, 3);

  const bj = project.buildJourney;

  return (
    <>
      <JsonLd data={jsonLd} />

      <main className="min-h-screen bg-beige">
        {/* ── Hero ── */}
        <section className="py-28 px-6 bg-gradient-to-br from-navy via-navy/95 to-cherry/10">
          <div className="max-w-5xl mx-auto">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-beige/60 hover:text-beige transition-colors mb-8 text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              All Projects
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span
                className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
                  statusColors[project.status] || 'bg-beige/10 text-beige/60'
                }`}
              >
                {project.status}
              </span>
              <span className="text-xs text-beige/50">{project.year}</span>
              <span className="text-xs text-beige/50">{project.category}</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-display font-bold text-beige mb-4">
              {project.title}
            </h1>
            <p className="text-xl text-cherry font-semibold mb-6">{project.tagline}</p>
            <p className="text-lg text-beige/70 max-w-3xl leading-relaxed mb-8">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-cherry text-white rounded-full font-semibold hover:bg-cherry-dark transition-all"
                >
                  <Globe className="w-4 h-4" />
                  View Live
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 border-2 border-beige/30 text-beige rounded-full font-semibold hover:border-beige/60 transition-all"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              )}
            </div>
          </div>
        </section>

        {/* ── Video Demo ── */}
        {project.videoUrl && (
          <section className="py-12 px-6 bg-[#0d1117]">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px flex-1 bg-white/10" />
                <span className="text-xs font-bold text-[#D4A574] tracking-[0.3em] uppercase">
                  Demo Recording
                </span>
                <div className="h-px flex-1 bg-white/10" />
              </div>
              <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black">
                <video
                  src={project.videoUrl}
                  controls
                  autoPlay={false}
                  muted
                  playsInline
                  className="w-full aspect-video object-cover"
                  preload="metadata"
                />
              </div>
            </div>
          </section>
        )}

        {/* ── Impact Bar ── */}
        <section className="py-0 px-6 bg-[#0A1128]">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-beige/10">
              {[
                { label: 'Serving', value: project.impact.potential, color: 'text-[#D4A574]' },
                { label: 'Market', value: project.impact.economy, color: 'text-emerald-400' },
                { label: 'Problem', value: project.impact.problem, color: 'text-cherry' },
                { label: 'Result', value: project.impact.metric, color: 'text-sky-400' },
              ].map((stat) => (
                <div key={stat.label} className="py-8 px-6 text-center">
                  <p className="text-xs font-semibold text-beige/40 tracking-widest uppercase mb-2">
                    {stat.label}
                  </p>
                  <p className={`font-display font-bold text-sm leading-tight ${stat.color}`}>
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Problem & Solution ── */}
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 md:gap-16">
              <div className="relative">
                <div className="absolute -left-4 top-0 bottom-0 w-px bg-gradient-to-b from-cherry via-cherry/40 to-transparent" />
                <span className="text-xs font-bold text-cherry tracking-[0.3em] uppercase mb-4 block">
                  The Problem
                </span>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-navy mb-5 leading-tight">
                  What needed solving
                </h2>
                <p className="text-navy/70 leading-relaxed text-[15px]">{project.problem}</p>
              </div>
              <div className="relative">
                <div className="absolute -left-4 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500 via-emerald-400/40 to-transparent" />
                <span className="text-xs font-bold text-emerald-600 tracking-[0.3em] uppercase mb-4 block">
                  The Solution
                </span>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-navy mb-5 leading-tight">
                  How I built it
                </h2>
                <p className="text-navy/70 leading-relaxed text-[15px]">{project.solution}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Build Journey ── */}
        {bj && (
          <section className="py-16 px-6 bg-[#FDFAF4]">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center gap-4 mb-10">
                <span className="text-xs font-bold text-cherry tracking-[0.3em] uppercase">
                  Build Journey
                </span>
                <div className="flex-1 h-px bg-cherry/20" />
              </div>

              {/* Narrative block */}
              <div
                className="mb-10 pl-6 border-l-4 border-cherry"
                style={{ borderColor: '#C21E56' }}
              >
                <p
                  className="font-display italic text-navy/80 text-lg leading-relaxed whitespace-pre-line"
                  style={{ fontFamily: 'var(--font-display, Georgia, serif)' }}
                >
                  {bj.narrative}
                </p>
              </div>

              {/* Code block */}
              {bj.codeExample && (
                <div className="mb-10">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="text-[#8b949e] text-xs ml-2 font-mono">
                      {bj.codeLabel ?? `${project.slug}.${bj.codeLanguage ?? 'ts'}`}
                    </span>
                  </div>
                  <div className="border border-[#30363d] rounded-lg overflow-hidden">
                    <div className="bg-[#161b22] border-b border-[#30363d] px-4 py-2">
                      <span className="text-[#8b949e] text-xs font-mono">
                        {bj.codeLanguage ?? 'code'}
                      </span>
                    </div>
                    <div className="bg-[#0d1117] p-5 overflow-x-auto">
                      <pre className="text-[#e6edf3] text-sm font-mono whitespace-pre leading-relaxed">
                        {bj.codeExample}
                      </pre>
                    </div>
                  </div>
                </div>
              )}

              {/* Lessons */}
              {bj.lessons && bj.lessons.length > 0 && (
                <div>
                  <p className="text-xs font-bold text-cherry tracking-[0.3em] uppercase mb-5">
                    What This Taught Me
                  </p>
                  <ol className="space-y-4">
                    {bj.lessons.map((lesson, i) => (
                      <li key={i} className="flex gap-4 items-start">
                        <span
                          className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                          style={{
                            background: '#C21E5612',
                            color: '#C21E56',
                            border: '1px solid #C21E5630',
                            fontFamily: 'var(--font-mono)',
                          }}
                        >
                          {i + 1}
                        </span>
                        <p className="text-navy/75 text-[15px] leading-relaxed">{lesson}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </section>
        )}

        {/* ── Tech Stack ── */}
        <section className="py-16 px-6 bg-[#0A1128] relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                'linear-gradient(to right, #D4A574 1px, transparent 1px), linear-gradient(to bottom, #D4A574 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
          <div className="max-w-5xl mx-auto relative z-10">
            <div className="flex items-center gap-4 mb-10">
              <span className="text-xs font-bold text-[#D4A574] tracking-[0.3em] uppercase">
                Tech Stack & Decision Rationale
              </span>
              <div className="flex-1 h-px bg-beige/10" />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {project.techStack.map((tech, i) => (
                <div
                  key={tech.name}
                  className="group relative bg-white/[0.03] border border-white/10 p-4 hover:border-[#D4A574]/40 hover:bg-white/[0.06] transition-all duration-200"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-[#D4A574]/40 font-mono text-xs mt-0.5 flex-shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="font-bold text-beige text-sm mb-1 group-hover:text-[#D4A574] transition-colors">
                        {tech.name}
                      </h3>
                      <p className="text-beige/50 text-xs leading-relaxed">{tech.reason}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── README ── */}
        <section className="py-16 px-6 bg-[#0d1117]">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-[#8b949e] text-xs ml-2 font-mono">
                README.md — {project.slug}
              </span>
            </div>
            <div className="border border-[#30363d] rounded-lg overflow-hidden">
              <div className="bg-[#161b22] border-b border-[#30363d] px-4 py-2 flex items-center gap-2">
                <span className="text-[#8b949e] text-xs font-mono">📄 README.md</span>
              </div>
              <div className="p-6 md:p-8 overflow-x-auto">
                <pre className="text-[#e6edf3] text-sm font-mono whitespace-pre-wrap leading-relaxed">
{`# ${project.title}
> ${project.tagline}

## Project Context
**Category:** ${project.category}
**Status:** ${project.status} · ${project.year}
**Author:** Nandawula Regine Kabali-Kagwa — East London, South Africa
**Company:** Mirembe Muse (Pty) Ltd · Reg: 2026-005658

## Stack
\`\`\`
${project.techStack.map((t) => `${t.name.padEnd(30)} # ${t.reason}`).join('\n')}
\`\`\`

## Architecture Notes
- All data mutations validated server-side via Next.js API routes
- Row-Level Security enforced at database level (Supabase)
- Mobile-first, PWA-ready, offline-tolerant where connectivity is unreliable
- PayFast integration for ZAR-native payments (no USD conversion)
- SEO-optimised: metadata, JSON-LD, canonical URLs, sitemap
- POPIA compliant — data minimisation + user consent by design

## Environment Variables
\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ANTHROPIC_API_KEY=
NEXT_PUBLIC_PAYFAST_MERCHANT_ID=
NEXT_PUBLIC_PAYFAST_MERCHANT_KEY=
PAYFAST_PASSPHRASE=
RESEND_API_KEY=
\`\`\`

## Links
${project.liveUrl ? `- Live:   ${project.liveUrl}` : '- Live:   Coming soon — domain propagating'}
${project.githubUrl ? `- GitHub: ${project.githubUrl}` : '- GitHub: Private repository'}
- Portfolio: https://creativelynanda.co.za/projects/${project.slug}

---
Built from East London, South Africa · Nine months · Zero to production`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* ── More Projects ── */}
        <section className="py-16 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-display font-bold text-navy mb-10">More Projects</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {otherProjects.map((p) => (
                <Link
                  key={p.slug}
                  href={`/projects/${p.slug}`}
                  className="group p-6 bg-white rounded-2xl border border-navy/10 hover:border-cherry/30 hover:shadow-soft transition-all"
                >
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full mb-3 inline-block ${
                      statusColors[p.status] || 'bg-navy/10 text-navy/60'
                    }`}
                  >
                    {p.status}
                  </span>
                  <h3 className="font-display font-bold text-navy text-xl mb-2 group-hover:text-cherry transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-sm text-navy/60 line-clamp-2 mb-3">{p.tagline}</p>
                  <span className="text-cherry text-sm font-medium flex items-center gap-1">
                    View project <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-navy/20 text-navy rounded-full hover:border-cherry hover:text-cherry transition-all"
              >
                View All Projects <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-20 px-6 bg-navy">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-display font-bold text-beige mb-4">
              Interested in similar work?
            </h2>
            <p className="text-beige/70 mb-8 text-lg">
              Let&apos;s discuss how I can build something like this for your business.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-cherry text-white rounded-full font-semibold hover:bg-cherry-dark transition-all"
            >
              <ExternalLink className="w-5 h-5" />
              Let&apos;s Talk
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
