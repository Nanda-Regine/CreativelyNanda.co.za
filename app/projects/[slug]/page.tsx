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
      metric: '6 AI agents live, crisis detection active',
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
      narrative: `VarsityOS was built around a single question: what does a first-generation SA university student actually need to survive and thrive? Not a generic student planner. Not a ChatGPT wrapper. Infrastructure — NSFAS budgeting, load-shedding study strategies, crisis support, part-time work balancing, all with 11-language awareness, woven together with an AI companion named Nova.

The 15-table Supabase schema (profiles, budgets, expenses, tasks, modules, exams, meals, shifts, wellness entries) was built with full RLS from day one. 14 strategic indexes. Auto-triggers for profile creation, updated_at, and task completion timestamps. The database layer carries the complexity so the AI layer can stay focused.

Nova's breakthrough was prompt caching on the knowledge base. The system prompt is ~5,000 lines of SA-specific context: 25+ universities, NSFAS rules and appeal processes, SADAG mental health resources, load-shedding study strategies, student finance. This entire block is cached by Anthropic's server — after the first call, cache reads cost ~90% less per token. Nova's real cost is in the dynamic block: each student's actual budget, tasks, exams, and mood score injected per request.

Crisis detection is a product ethics decision as much as an engineering one. When a student message matches distress signals, the system does not send a chatbot reply. It surfaces SADAG and Lifeline SA helplines first, then wraps any response in human-connection framing rather than advice.`,
      codeExample: `// Nova AI — cached knowledge base + dynamic student context injection
// ~5000-token system prompt cached; only per-student context charged at full rate

export async function callNova(message: string, student: StudentContext) {
  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    system: [
      {
        type: 'text',
        text: NOVA_SA_KNOWLEDGE_BASE, // ~5000 lines — SA universities, NSFAS, SADAG, etc.
        cache_control: { type: 'ephemeral' }, // Anthropic caches this block server-side
      },
    ],
    messages: [
      {
        role: 'user',
        content: \`Student context:
Budget remaining: R\${student.nsfas_balance}
Upcoming exams: \${student.exams.slice(0,3).map(e => \`\${e.module} in \${e.days_away}d\`).join(', ')}
Wellness score (today): \${student.mood_score}/5
Module averages: \${student.academic_summary}

Message: \${message}\`,
      }
    ],
    max_tokens: 1024,
  });

  const text = response.content[0].text;

  // Crisis detection — surface helplines before any response
  if (isCrisisSignal(message)) {
    return \`SADAG: 0800 567 567 (24h) | Lifeline SA: 0861 322 322\n\n\${formatCrisisResponse(text)}\`;
  }

  return text;
}`,
      codeLanguage: 'typescript',
      codeLabel: 'Nova AI — prompt caching + crisis detection pattern',
      lessons: [
        'SA university context (NSFAS, SADAG, load-shedding) cannot be retrofitted — it must be the schema, not a feature',
        'Prompt caching on a 5000-token knowledge base reduces Nova\'s per-conversation cost by ~90%',
        'Crisis detection is a product ethics decision: no chatbot reply when a student is in distress — helplines first, always',
        'Dynamic context injection (real budget, exams, mood) is what separates Nova from a generic AI — the personalisation is in the database, not the model',
        'PWA offline mode is not optional for SA students on intermittent data — service worker caching is a feature parity requirement',
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
      narrative: `K53 was built in a documented 12-hour sprint on 2026-02-27. Phase 0 started at 09:00, Phase 1 shipped at 09:54 (commit a7e8ad3). The engineering log is timestamped by commit hash.

Every decision has a written rationale. Why React 18 + Vite instead of Next.js? No server-side data fetching needed for v1 — game logic is static. Vite's HMR iterates faster on mobile quiz mechanics. Why no routing library? A single state string ('activeGame') is the routing layer — React Router adds 50KB for zero benefit. Why Georgia serif font? It feels like a printed test booklet. Familiar to older learners. Reduces cognitive friction. These aren't post-hoc justifications. They're commit-message-level decisions made in real time.

The freemium gate uses localStorage — no server round-trip on every answer. Deliberate: at 10 questions/day, the acceptable risk of power users clearing storage is lower than the cost of DB calls on a SA mobile connection. The AI tutor uses gpt-4o-mini, not 4o — the cost math was written into the build log: mini charges ~$0.00015/1K tokens vs $0.005 for 4o. At 200 tokens per explanation, 4o would cost 60x more for the same outcome.

The Mock Exam ships 68 questions, not 70. The real DLTC Code 8 exam is 68 questions. Most study sites say 70. The 2024 DLTC examiner guidelines were verified before the spec was written.`,
      codeExample: `// vite.config.js — manual chunk splitting for budget Android
// First paint loads only vendor + App shell
// ~180KB saved on initial load for 80% of users (Code 8 only)

manualChunks(id) {
  if (id.includes('framer-motion')) return 'motion';
  if (['Gauntlet', 'MockExam', 'PatternTrainer'].some(g => id.includes(g))) return 'games-core';
  if (['PDPPrep', 'HeavyVehicle', 'Motorcycle'].some(g => id.includes(g))) return 'games-ext';
  if (id.includes('node_modules')) return 'vendor';
}

// Freemium gate — localStorage (no server round-trip per answer click)
// Acceptable risk: power users clearing storage < cost of DB calls on SA mobile data
function checkFreemiumGate() {
  const usage = JSON.parse(localStorage.getItem('k53_usage') || '{}');
  const today = new Date().toDateString();
  const count = usage[today] || 0;
  if (count >= 10) return showPaywall();
  localStorage.setItem('k53_usage', JSON.stringify({ ...usage, [today]: count + 1 }));
}

// AI Tutor cost decision: gpt-4o-mini, not gpt-4o
// 200 tokens/explanation × $0.00015 = R0.000054 per explanation (mini)
// 200 tokens/explanation × $0.005   = R0.009    per explanation (4o)
// At scale: 4o costs 60x more for identical user outcome → mini every time`,
      codeLanguage: 'javascript',
      codeLabel: 'Vite chunk splitting + freemium gate — engineering decisions',
      lessons: [
        'Timestamped build logs by commit hash make engineering decisions auditable — write the why, not just the what',
        'localStorage freemium is the correct call when the risk of bypass is lower than the cost of server round-trips on SA mobile data',
        'gpt-4o-mini vs 4o: do the token math before choosing a model — same outcome, 60x cost difference',
        'Manual chunk splitting for mobile-first: games-ext loads only if users navigate to heavy/motorcycle content',
        'Verify specs against primary sources — 68 questions, not 70. The real DLTC guideline, not the internet\'s approximation',
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
      narrative: `The trigger for StokvelOS was a specific incident: a chairperson of a 20-member teachers' stokvel lost R4,200 because two members paid to an old account, records weren't reconciled, and by the time the discrepancy was found 3 months had passed. No audit trail. The core insight: a stokvel is not a bank. It's a trust community with rules. Fix the transparency, and most fraud, disputes, and misunderstandings dissolve before they become crises.

The most consequential architectural decision was "Extract Once, Enforce Forever." A naive implementation would call Claude for every late payment check, every loan eligibility check, every compliance update. At scale across 30+ member stokvels paying monthly, that's thousands of unnecessary AI calls per month. Instead, Claude reads the stokvel's constitution exactly once on setup, extracts 18 structured fields (contribution_due_day, late_grace_days, late_penalty_percent, loan_eligibility_min_compliance, quorum_percent, chairperson_co_sign_above) into a typed JSONB blob stored in Supabase. All runtime enforcement runs as pure TypeScript — zero AI cost per transaction.

The WhatsApp agent's prompt caching is split into two blocks: a static cached block (constitution summary, extracted rules, monthly amount, payout type — identical for all messages from the same stokvel, cache hit after the first call) and a dynamic block (per-member: name, role, compliance %, this month's status). This reduces prompt tokens by ~70% after the first message per stokvel per hour.

The dispute mediation agent runs a 7-state machine: open → investigating → awaiting_complainant_proof → awaiting_respondent_proof → reviewing → resolved | escalated. Auto-resolves if records can settle it. If not, enters conversation mode with a hard escalation at 5 turns — chairperson notified via WhatsApp. The system prompt instruction: "You are not on anyone's side. You protect the community's trust and harmony."`,
      codeExample: `// "Extract Once, Enforce Forever" — constitution parsing architecture
// Claude extracts 18 fields once on setup; all runtime enforcement is pure TS (free)

// Step 1: ONE Claude call per stokvel (on setup or constitution update)
const extracted = await anthropic.messages.create({
  model: 'claude-sonnet-4-6',
  max_tokens: 400,
  messages: [{
    role: 'user',
    content: \`Extract ONLY explicitly stated rules. Return JSON. Do not infer. Null for unstated fields.\n\n\${constitutionText}\`,
  }],
});

const rules = mergeWithDefaults(JSON.parse(extracted.content[0].text));
// Store extracted rules — this is now the source of truth for all enforcement
await supabase.from('stokvels')
  .update({ extracted_rules: rules, rules_extracted_at: new Date() })
  .eq('id', stokvelId);

// Step 2: All runtime enforcement — pure TypeScript, zero AI cost
export function checkLatePaymentPenalty(
  contribution: Contribution,
  rules: ExtractedRules
): number {
  const daysLate = differenceInDays(new Date(), parseISO(contribution.due_date));
  if (daysLate <= (rules.late_grace_days ?? 7)) return 0;
  return Math.round(contribution.amount * ((rules.late_penalty_percent ?? 10) / 100));
}

export function checkLoanEligibility(
  member: StokvelMember,
  rules: ExtractedRules
): { eligible: boolean; reason: string } {
  const compliance = member.compliance_rate ?? 0;
  const required = rules.loan_eligibility_min_compliance ?? 0.8;
  if (compliance < required) {
    return { eligible: false, reason: \`Compliance \${Math.round(compliance*100)}% below required \${Math.round(required*100)}%\` };
  }
  return { eligible: true, reason: 'Meets constitution requirements' };
}`,
      codeLanguage: 'typescript',
      codeLabel: 'Extract Once Enforce Forever — constitution compliance architecture',
      lessons: [
        '"Extract Once, Enforce Forever": use AI for rule extraction, pure code for rule enforcement — the constitution is read once, TS enforces it every transaction',
        'Ubuntu as architecture: stokvel RLS policies must reflect collective ownership — members see group data, never each other\'s private balances',
        'Split prompt caching: static stokvel context cached, per-member context dynamic — 70% token reduction after first message per stokvel per hour',
        'Dispute mediation needs a hard escalation ceiling — 5 turns max before human (chairperson) intervenes; AI cannot mediate indefinitely',
        'Deploying to Vercel jnb1 (Johannesburg) + Supabase Africa (Cape Town) puts compute and data on the continent — sub-100ms round trips for SA users',
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
      narrative: `Africa's businesses run on WhatsApp. Millions of messages land every day — client queries, invoice follow-ups, leave requests, complaints — and behind each one is a human manually responding, copying, chasing, and repeating. AdminOS was built to fix that. Not as a chatbot. As an operating system — one that handles the full admin layer automatically.

Multi-tenancy is enforced at the database layer, not the application layer. Every table has tenant_id as a required column. Supabase RLS policies verify tenant_id = auth.jwt() ->> 'tenant_id' — a bug in the application code cannot leak one business's data to another. The middleware injects x-tenant-id, x-user-id, and x-user-role into every authenticated request header. The audit log is append-only — no UPDATE or DELETE policy granted.

The most important cost decision: Claude prompt caching on the tenant system prompt. Every tenant has a pre-built context string (business name, type, language, tone, FAQs, staff directory, services, policies, extracted company goals) marked cache_control: ephemeral. Subsequent calls that hit the cache cost 90% less per token. Result: 85% reduction in AI operating costs at scale.

The WorkflowEngine runs 7 steps in sequence with per-step timeouts: deduplication (Redis SET NX atomic, 500ms), tenant context load (2s), FAQ cache check (2s), Claude response with caching (20s), 360dialog outbound (5s), audit log write (2s), Supabase Realtime dashboard push (1s). The 360dialog webhook must receive a 200 OK in under 1 second — the pipeline runs async, non-blocking, after the webhook responds. Fail-open on Redis unavailability: log the error, allow the request. Production cannot go down because a cache layer is unhealthy.

The debt recovery engine runs a 5-tier escalation sequence over 30 days via Vercel Cron at 09:00 SAST daily. Claude drafts each message in the tenant's own voice and tone. The wellness check-in sends daily WhatsApp mood check-ins to all staff (Mon–Fri 08:00 SAST). Burnout detection triggers a manager alert when the 7-day average drops below 2.5.`,
      codeExample: `// AdminWorkflowEngine — 7-step async pipeline with per-step timeouts
// 360dialog webhook must receive 200 OK in < 1s; pipeline runs non-blocking

export async function processWhatsAppMessage(
  message: InboundMessage,
  tenantId: string
): Promise<void> {
  // Respond to 360dialog immediately — pipeline is fire-and-forget from webhook's perspective
  void runPipeline(message, tenantId);
}

async function runPipeline(message: InboundMessage, tenantId: string) {
  // Step 1: Deduplication — atomic Redis SET NX (no GET+SET race condition)
  const deduped = await redis.set(\`msg:\${message.id}\`, '1', { nx: true, ex: 86400 });
  if (!deduped) return; // Already processed — 360dialog can send the same message 2-3x

  // Step 2: Load tenant context (cached in Redis, 15min TTL)
  const context = await withTimeout(loadTenantContext(tenantId), 2000);

  // Step 3: FAQ cache check — answer without AI if possible (Redis, 7-day TTL)
  const cached = await withTimeout(checkFAQCache(message.text, tenantId), 2000);
  if (cached) return sendAndLog(cached, message, tenantId);

  // Step 4: Claude with prompt caching — 85% cost reduction on cache hits
  const response = await withTimeout(
    anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      system: [{ type: 'text', text: context.systemPrompt, cache_control: { type: 'ephemeral' } }],
      messages: buildConversationHistory(message, context), // Capped at 10 msgs
    }),
    20000
  );

  // Steps 5–7: Send → Audit → Dashboard (always attempted, even after prior failures)
  await withTimeout(sendVia360dialog(response.content[0].text, message.from), 5000);
  await withTimeout(logToAudit(message, response, tenantId), 2000);
  await withTimeout(pushToSupabaseRealtime(tenantId, message), 1000);
}

// Multi-tenant RLS — enforced at DB layer, not application layer
// CREATE POLICY "Tenant isolation" ON conversations
//   USING (tenant_id = (auth.jwt() ->> 'tenant_id')::uuid);
// A bug in application code cannot leak Business A's data to Business B.`,
      codeLanguage: 'typescript',
      codeLabel: 'AdminWorkflowEngine — async pipeline with dedup, caching, and multi-tenant RLS',
      lessons: [
        'Multi-tenant isolation belongs in the database (RLS), not the application — application bugs cannot cause data leaks',
        'Prompt caching on the tenant system prompt = 85% AI cost reduction; the cached block is pre-built business context, the dynamic block is per-message',
        'Atomic Redis SET NX is the correct deduplication pattern — GET+SET has a race condition; 360dialog can deliver the same message multiple times',
        'Fail-open on Redis unavailability: log and allow the request — production cannot go down because a cache layer is unhealthy',
        'Per-step timeouts prevent one slow step (Claude at 20s max) from blocking the audit log and dashboard steps that must still run',
        'Debt recovery tone must be in the tenant\'s own voice — Claude drafts per-tenant, not generic templates',
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
      narrative: `WatchSankofa began as a question during the YouTube clone: what does YouTube get wrong for African creators? Every layout decision was studied. The algorithm has no concept of isiZulu spoken word poetry as a distinct cultural form. An African filmmaker performing in Xhosa has the same discoverability as a gaming livestream. WatchSankofa was built to fix that.

The Phase 1 foundation was static HTML/CSS/JS — a landing page and product spec ('AFRIFLIX_MASTER_PROMPT.md') that seeded everything. Phase 2 was a full Next.js 16.1.7 rebuild started 2026-03-18. Every architecture decision in Phase 2 was written with a 'why' rationale.

The audio player architecture decision: Zustand with persist middleware over Redux or Context. The audio player must persist across navigation without remounting — a user browsing while listening cannot have the player restart mid-track on every route change. Zustand's persist syncs to localStorage. Redux is overkill; Context re-renders the entire tree on every state change — catastrophic for a media player.

The video player is custom, not react-player. Control: WatchSankofa branding in the player, keyboard shortcuts that feel native, fullscreen with the container not the viewport, and the ability to swap the underlying video source to Cloudflare Stream's HLS without rewriting the UI.

Server Components + client islands: content browsing, creator profiles, and search are server-rendered (no JavaScript for these read-heavy views). The audio player and video player are client islands. This is strictly better than a React SPA for a content platform where 80%+ of interactions are read operations.`,
      codeExample: `// Zustand audio player — persists across navigation without remounting
// Context would re-render the entire component tree on every state change
// Redux is overkill; Zustand's persist handles SSR hydration cleanly

interface AudioPlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
  progress: number;
  volume: number;
  queue: Track[];
  play: (track: Track) => void;
  pause: () => void;
  seek: (seconds: number) => void;
  enqueue: (track: Track) => void;
}

export const useAudioPlayer = create<AudioPlayerState>()(
  persist(
    (set, get) => ({
      currentTrack: null,
      isPlaying: false,
      progress: 0,
      volume: 0.8,
      queue: [],

      play: (track) => set({ currentTrack: track, isPlaying: true }),
      pause: () => set({ isPlaying: false }),
      seek: (seconds) => set({ progress: seconds }),
      enqueue: (track) => set((s) => ({ queue: [...s.queue, track] })),
    }),
    {
      name: 'watchsankofa-player',
      storage: createJSONStorage(() => localStorage),
      // skipHydration prevents SSR/client mismatch — call rehydrate() after mount
      skipHydration: true,
      // Only persist these fields — not UI state like isPlaying
      partialize: (s) => ({ currentTrack: s.currentTrack, volume: s.volume, queue: s.queue }),
    }
  )
);`,
      codeLanguage: 'typescript',
      codeLabel: 'Zustand audio player — cross-navigation persistence pattern',
      lessons: [
        'Zustand + persist is the correct pattern for a media player: persists across navigation, no SSR mismatch with skipHydration, no Redux overhead',
        'Server Components for read-heavy views (browsing, profiles, search) + client islands for interactive UI (player) — minimum JavaScript shipped to the client',
        'Custom video player over react-player: swap the source to Cloudflare Stream HLS without rewriting the UI; own the keyboard shortcuts and fullscreen behaviour',
        'The Sankofa principle is not branding — it is the product specification: recover what African creators were denied (ownership, revenue, visibility)',
        '85% creator revenue share signals whose side the platform is on before a single feature ships',
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
    status: 'Upgrading',
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
    liveUrl: null,
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
      narrative: `SankofaSessions is the media layer of a larger content flywheel. The thesis: great streaming platforms are built on great editorial culture. Before WatchSankofa had content, it needed a publication that established what African creative excellence looks like — and who gets to define it.

The architecture decision: Substack for subscriber management, not a proprietary newsletter system. Building subscriber management from scratch (confirmation emails, preferences, unsubscribe flows, delivery infrastructure) is weeks of work that don't differentiate the product. Substack handles it; SankofaSessions focuses on editorial quality.

The flywheel logic is deliberate: the publication builds an audience of people who care about African creative work → that audience discovers the streaming platform → creators want to be featured because the audience already exists. The publication is not marketing for WatchSankofa. It is the demand generation infrastructure.

Long-form interviews (2,000+ words) are the moat. A 600-word founder Q&A can be produced at volume. A 2,000-word narrative profile of a Kenyan filmmaker building infrastructure for African cinema cannot be replicated without a genuine editorial point of view. Depth is the differentiator.`,
      lessons: [
        'Media + streaming is a flywheel, not two products — the publication builds the audience that makes the platform valuable to creators',
        'Substack for subscriber infrastructure: let the editorial product focus on editorial quality, not delivery pipelines',
        'Long-form depth (2,000+ words) is the moat — it cannot be replicated without a genuine point of view and editorial investment',
        'The editorial voice is the product specification: African, female, technical, poetic — not trying to be Forbes Africa, trying to be something that didn\'t exist',
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
    buildJourney: {
      narrative: `The goal from day one: not a static brochure. A cultural destination — the professional credibility of LinkedIn, the seamless commerce of a digital storefront, the literary community of a poetry platform, the editorial authority of a long-form publication, all in one. Every architecture decision was written with a rationale.

PayFast over Stripe: Stripe doesn't process ZAR-denominated cards directly for SA merchants without complex setup. PayFast has ~60% market share in SA, supports EFT and instant EFT (dominant payment methods in ZA), and processes in Rand natively. For a site targeting SA students and entrepreneurs, Stripe adds friction and currency confusion. PayFast was always the correct choice for this market.

Supabase over Firebase: Firestore's document model would require denormalising the product-order relationship that Postgres handles naturally with foreign keys and indexes. Supabase provides full PostgreSQL, Row Level Security at the database layer (orders readable by buyer, not other users), and signed Storage URLs for digital delivery — all without custom code.

Zustand for the cart: the cart must persist across App Router navigations and survive browser refreshes. The critical pattern is skipHydration: true on the store, with rehydrate() called after mount — this prevents the 'cart flicker' where server HTML shows an empty cart but client state has items.

TypeScript caught the PayFast signature bug before production: the PayfastPaymentData interface ensures every field passed to the signature generator is accounted for. A type error in the PayFast signature function would cause silent revenue loss. TypeScript strict mode on payment code costs nothing at build time; the same error in production costs revenue.`,
      codeExample: `// Cart store — skipHydration pattern prevents SSR/client mismatch
// Without this: server renders empty cart, client rehydrates with items → layout shift

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => set((s) => {
        if (s.items.find(i => i.id === item.id)) return s; // No duplicates
        return { items: [...s.items, { ...item, quantity: 1 }] };
      }),
      removeItem: (id) => set((s) => ({ items: s.items.filter(i => i.id !== id) })),
      clearCart: () => set({ items: [] }),
      get total() { return get().items.reduce((sum, i) => sum + (i.price * i.quantity), 0); },
    }),
    {
      name: 'mirembe-cart',
      storage: createJSONStorage(() => localStorage),
      skipHydration: true, // Critical — prevents SSR/client cart flicker
    }
  )
);

// Call rehydrate() after mount — never on the server
useEffect(() => { useCartStore.persist.rehydrate(); }, []);

// PayFast signature — field ORDER matters; alphabetical sort BREAKS it
// This bug caused silent payment failures before the fix
export function generateSignature(data: PayfastPaymentData, passphrase: string): string {
  const params = Object.entries(data) // Insertion order — DO NOT .sort()
    .filter(([, v]) => v !== '' && v !== null)
    .map(([k, v]) => \`\${k}=\${encodeURIComponent(String(v)).replace(/%20/g, '+')}\`)
    .join('&');
  return md5(\`\${params}&passphrase=\${encodeURIComponent(passphrase)}\`);
}`,
      codeLanguage: 'typescript',
      codeLabel: 'Cart skipHydration + PayFast field-order signature — production bugs caught',
      lessons: [
        'skipHydration: true on Zustand persist + rehydrate() after mount prevents the cart flicker in SSR/App Router applications',
        'PayFast signature is field-ORDER sensitive — alphabetical sort breaks it silently; this is not documented prominently in PayFast docs',
        'Supabase over Firebase: PostgreSQL + RLS + signed Storage URLs solves product-order-delivery in one platform',
        'PayFast over Stripe: ZAR native, EFT support, 60% SA market share — the correct payment gateway for the SA market',
        'TypeScript strict mode on payment code: the type error that catches a PayFast bug costs nothing at build time',
        'Arcjet composable middleware: bot detection + rate limiting in one API — less custom code, more security coverage',
      ],
    },
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
    videoUrl: '/assets/project-screen-record/cortexhub-booking-system.mp4',
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
    videoUrl: '/assets/project-screen-record/GreenVault.mp4',
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
    videoUrl: '/assets/project-screen-record/youtube-clone.mp4',
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
    liveUrl: 'https://my-weather-app-rho-lyart.vercel.app/',
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
    title: 'Carpentry Business — Client Project',
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
    liveUrl: 'https://carpentary-os-demo.vercel.app/',
    githubUrl: 'https://github.com/Nanda-Regine/carpentart-os-demo',
    images: [],
    metaTitle: 'Carpentry Business — Trade Services Website | Nandawula Regine',
    metaDescription:
      "Client project: portfolio-forward website for a South African carpentry business. WhatsApp-first conversion architecture. Built by Nandawula Regine.",
    keywords: [
      'carpentry website South Africa',
      'trade business website SA',
      'WhatsApp website conversion',
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
    title: 'Transport Industry Digital Transformation',
    tagline: 'How a South African Shuttle Operator Stopped Competing on Price — R34,000 Growth Package',
    description:
      "Full digital transformation for a South African shuttle and transport operator. R34,000 Growth Package delivered: professional website, Google Business Profile setup, WhatsApp Business integration, local SEO, and a Vision Package roadmap for corporate affiliate channels.",
    category: 'Client Work · SME · Digital Transformation',
    status: 'Live',
    year: '2025',
    problem:
      "Transport operators in South Africa compete on price because they can't compete on digital perception. Reliable vehicles and quality service mean nothing when a corporate client can't find you, can't trust your brand at a glance, and has no frictionless way to book.",
    solution:
      "Growth Package: professional website with booking inquiry flow, Google Business Profile optimisation, WhatsApp Business integration, social media templates, and local SEO. Vision Package roadmap: booking automation, affiliate marketing system so satisfied corporate partners become a systematic referral channel.",
    techStack: [
      { name: 'HTML5', reason: 'Fast, lightweight — transport clients book on mobile' },
      { name: 'CSS3', reason: 'Credibility-first design — professional trust signals above fold' },
      { name: 'Vanilla JavaScript', reason: 'WhatsApp booking inquiry integration' },
    ],
    impact: {
      potential: 'SA transport and shuttle market',
      economy: 'R34,000 Growth Package delivered',
      problem: 'Word-of-mouth caps growth at network size',
      metric: 'Tiered service model: Growth → Vision Package',
    },
    liveUrl: 'https://transport-shuttle-os.vercel.app',
    githubUrl: 'https://github.com/Nanda-Regine/Transport-shuttle-os',
    images: [],
    metaTitle: 'Transport Industry Digital Transformation — SA Shuttle Service Case Study | Nandawula Regine',
    metaDescription:
      "R34,000 digital transformation for a South African shuttle and transport operator. Website, WhatsApp integration, Google Business, local SEO. Built by Nandawula Regine.",
    keywords: [
      'shuttle service website South Africa',
      'transport business digital transformation SA',
      'SME digital transformation South Africa',
    ],
    buildJourney: {
      narrative: `This transport industry engagement introduced the multi-tiered client model — the Growth Package and Vision Package structure that now defines all Mirembe Muse B2B work.

The Growth Package solved the immediate problem: establish professional credibility online. A transport operator with quality vehicles and reliable service was invisible to corporate buyers because their digital presence didn't match the standard of their actual service.

The Vision Package roadmap identified the next problem: corporate clients and hotel partners who book regularly could become a systematic affiliate channel if the incentive structure was formalised. A referral link system — track, attribute, reward — turns satisfied clients into a distribution channel. This thinking later became the LemonSqueezy affiliate architecture for digital products.

The core insight: every manual process in a service business is a product specification waiting to happen. Client work doesn't just generate revenue — it generates the blueprint for what to build next.`,
      lessons: [
        'Tiered pricing solves the SA SME budget reality: start where you are, grow into the next tier',
        'Corporate affiliate architecture: satisfied clients as a managed distribution channel',
        'R34,000 Growth Package: proof-of-concept for the Mirembe Muse B2B pricing model',
        'Client delivery is product research — every manual process becomes a future automation feature spec',
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
  Upgrading: 'bg-blue-500/20 text-blue-300 border border-blue-500/30',
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
              {project.status === 'Upgrading' ? (
                <span className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/20 text-white/40 rounded-full font-semibold cursor-not-allowed select-none">
                  ⏸ Upgrading in Progress
                </span>
              ) : project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-cherry text-white rounded-full font-semibold hover:bg-cherry-dark transition-all"
                >
                  <Globe className="w-4 h-4" />
                  View Live
                </a>
              ) : null}
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
