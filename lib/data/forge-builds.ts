/**
 * The Workshop Floor — one dossier per build.
 *
 * ── WHY THIS FILE IS WRITTEN AND NOT GENERATED ────────────────────────────────
 *
 * `lib/data/forge-corpus.json` holds 1,062 raw build-journal sections, and
 * `docs/THE_FORGE.md` §4 gates every one of them behind a default-deny review
 * that only Nanda can clear. That gate exists because a build journal is written
 * for an audience of one and says things a public page should not: a client's
 * name, a live exposure, once an actual credential.
 *
 * So the Floor does not render the corpus. It renders THIS — prose written from
 * the corpus, where every sentence was chosen by a reader rather than passed by
 * a filter. Three things follow from that, all of them good:
 *
 *   1. **It is safer than a paste.** Nothing reaches the page that was not
 *      deliberately put there. The gate protects raw sections; writing removes
 *      the need to render any.
 *   2. **It is better.** The corpus is a work log — dense, abbreviated, written
 *      at 2am for a reader who already has all the context. The Floor is an
 *      edited room, and the site is an editorial magazine (see the governing
 *      brief in memory: `editorial-magazine-vision`).
 *   3. **It matches what she actually asked for.** Not postmortems only —
 *      "technical decisions, the learning curves, the wins, the solved bug, the
 *      methodology of building a feature, why some APIs matter, how to start in
 *      tech". The `learned` field on each dossier is that checklist made
 *      structural: a bolded claim, then the reasoning underneath it, which is
 *      the shape her own build journals already use.
 *
 * ── WHAT IS MEASURED VS WHAT IS WRITTEN ───────────────────────────────────────
 *
 * Every NUMBER on the Floor comes from `lib/data/forge-github.json`, pulled from
 * the GitHub API by `scripts/forge-github.mjs` and joined at render time on
 * `key`. Nothing here restates a commit count or a date, because a number typed
 * into prose starts drifting the moment it is typed. If a figure appears in
 * these strings it is one the API cannot know — a page count, a price tier, a
 * standard's name — and it is sourced from the journal.
 *
 * ── THE RULE THAT KEEPS THE TWO SITES APART ───────────────────────────────────
 *
 * Mirembe Muse gets outcomes: case studies, ROI, hire me. CreativelyNanda gets
 * the making: process, failure, texture, judgment. If a paragraph below starts
 * arguing FOR her rather than showing HOW she works, it is in the wrong
 * building. The StokvelOS material is the live example — the journal filed it
 * under "Five Most Interesting Technical Decisions (LinkedIn Post Starters)",
 * good writing in the wrong register, and it is rewritten here as method.
 */

export interface Decision {
  /** The decision itself, stated as a claim. */
  title: string;
  /** Why — the constraint that forced it, and what it bought. */
  body: string;
  /** Optional: the shape of the thing, for the reader who wants the artefact. */
  code?: string;
}

export interface Lesson {
  /** A bolded claim. Should survive being read on its own. */
  claim: string;
  /** The reasoning. This is the part that generalises past the build. */
  why: string;
}

export interface BuildDossier {
  /** Joins `forge-github.json` → `builds[].key`. */
  key: string;
  /** Route segment: /forge/floor/[slug] */
  slug: string;
  name: string;
  /** One line under the name. */
  kicker: string;
  /** Cloudinary public id under creativelynanda/logos, if the build has a mark. */
  logo?: string;
  /** The build's own colour, used for the rule and the figure. */
  accent: string;
  /** Sits under the title in the hero. One sentence, no throat-clearing. */
  standfirst: string;
  /** The problem, before any code existed. 1–3 paragraphs. */
  problem: string[];
  /** Technical decisions with their reasoning. The core of the room. */
  decisions: Decision[];
  /** What generalises past this build. */
  learned: Lesson[];
  /** Named technologies. Rendered as a spine, not a badge wall. */
  stack: string[];
  /** Slugs in `forge-scars.ts` that came out of this build. */
  scars?: string[];
  /** Where the writing came from, so the reader knows this is sourced. */
  source: string;
}

const NAVY = '#0A1128';

export const BUILD_DOSSIERS: BuildDossier[] = [
  // ───────────────────────────────────────────────────────────────────────────
  {
    key: 'jarvisos',
    slug: 'jarvisos',
    name: 'JarvisOS',
    kicker: 'The personal operating system',
    accent: '#7B2FBE',
    standfirst:
      'A private operating system for one person running eight businesses — twenty-seven wings, a few hundred background workers, and the only codebase here whose build journal is longer than the poetry.',
    problem: [
      'The other builds each solve one problem for one audience. JarvisOS solves the problem of running all of them at once: eight brands, a studio, a shop, a clinic of half-finished ideas, and one person holding every thread. Nothing off the shelf models that, because the market for software that runs a one-woman conglomerate is one woman.',
      'So the design constraint was never features. It was attention. A system that needs to be checked is another job; a system that speaks first is an assistant. Almost every architectural decision below is downstream of that — scheduled workers that surface things, a signal bus so one wing can know what another wing saw, and a morning brief that reads the night\'s output so she does not have to.',
    ],
    decisions: [
      {
        title: 'Route the model to the job, not to the best model available.',
        body:
          'Body-wing AI — recovery alerts, daily summaries, routine chat — runs on Haiku only. That data is structured and formulaic; a frontier model would spend Sonnet money to reformat a number it was handed. Sonnet is reserved for the work that is actually reasoning: reviewing the day\'s real commits, mediating a judgment call, writing. Model choice is a cost architecture decision, and treating it as a quality setting is how AI bills get away from people.',
      },
      {
        title: 'Wings talk through a signal bus, never through each other\'s tables.',
        body:
          'Each wing publishes a small typed payload to a namespaced key and subscribes to the ones it cares about — the body wing emits a recovery score and consumes the cycle phase; the CEO morning brief reads both. Nothing reaches across into another wing\'s schema. Twenty-seven wings that queried each other directly would be a single wing with twenty-seven names, and the first schema change would take the whole thing down.',
        code: `jarvis:signals:body:{userId}
  → { recovery_score, sleep_hours, training_sessions, alert, alert_advice }

jarvis:signals:cycle:{userId}
  → { cycle_phase, cycle_day }`,
      },
      {
        title: 'Derive the score in the open, so it can be argued with.',
        body:
          'The recovery score is not a model output. It is a clamped sum of three contributions — heart-rate variability against personal baseline, sleep hours against a floor, self-reported quality — and it is written down as arithmetic. A number that tells you how your body is doing has to be inspectable, or you either believe it too much or stop reading it. The version that a model produces is more sophisticated and worth strictly less.',
        code: `baseline 50
+ hrv     : (hrv_ms / baseline_hrv - 1) × 25 , clamped ±25
+ sleep   : (sleep_hours - 6) × 5            , clamped ±15
+ quality : (sleep_quality - 5) × 2          , clamped ±10
final = clamp(sum, 0, 100)`,
      },
      {
        title: 'Monitor the monitor.',
        body:
          'One subscriber to the queue\'s own `function.failed` event covers every worker in the system at once, including the ones written after it, plus a six-hourly sweep over the heartbeat tables with a latch so a stuck job alerts once rather than forty times. This was not foresight. It was written the week after six workers went quiet for a month and nothing said anything — the scar is in the Scar Room, and this is the fix that came out of it.',
      },
    ],
    learned: [
      {
        claim: 'A silent failure is worse than a loud one, and much easier to build by accident.',
        why:
          'Six background workers resolved the wrong tenant and did nothing successfully for a month. Every one returned 200. Nothing retried, because nothing had failed. The lesson that generalises: a worker whose no-op and whose success look identical to the outside is not monitored, however much monitoring is pointed at it. Make the no-op an event.',
      },
      {
        claim: 'Prompt caching is an architecture decision, not a flag.',
        why:
          'Caching a large stable system prompt changes what is affordable, which changes what can be built. Once the standing context is nearly free per call, per-user context injection becomes the cheap part and the design moves from "one big careful call" to "many small situated ones". The saving is the headline; the shift in what is designable is the actual result.',
      },
      {
        claim: 'Seed data that looks like production data will eventually be read as production data.',
        why:
          'A dashboard panel showed five rows of AI review output for weeks. They were seeds — no such review had ever run. Nobody lied; the fixture simply outlived the moment when everyone knew it was a fixture. Seeds need to be visibly fake or deleted before launch, and a panel with no real rows should say so rather than fill itself.',
      },
      {
        claim: 'The cost of a system is the cost of understanding it six months later.',
        why:
          'The dedup passes in this journal are mostly about a second copy of something — a legacy dashboard over the same tables, a hub page that re-implemented four dedicated pages inside itself. None of it was broken. All of it doubled the cost of every future change, which is the tax that eventually stops a solo build dead.',
      },
    ],
    stack: ['Next.js', 'TypeScript', 'Supabase / Postgres', 'Inngest', 'Upstash Redis', 'Claude API', 'Vercel'],
    scars: ['four-dashboards', 'inspector-was-lying', 'deterministic-recorder', 'capture-scars'],
    source: 'JarvisOS BUILD_JOURNEY.md — the diary, 145 sessions',
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    key: 'adminos',
    slug: 'adminos',
    name: 'AdminOS',
    kicker: 'A back office that lives inside WhatsApp',
    accent: '#1F7A6C',
    standfirst:
      'Multi-tenant business software for South African SMEs, built on the observation that the interface they already use every day is not a dashboard.',
    problem: [
      'South African small businesses do not log in. They answer WhatsApp. Any back office that requires a browser session, a password and a habit is competing against a chat thread that is already open, and it loses. The dashboard still has to exist — somebody reconciles, somebody reads the numbers — but it is the back office of the back office.',
      'That inverts the usual build. The webhook is the product surface. The web app is where the results are kept.',
    ],
    decisions: [
      {
        title: 'Tenant isolation belongs in the database, not in the application.',
        body:
          'Every table carries a required tenant id and every policy checks it against the claim on the JWT. The audit log is append-only — no update or delete permission is granted to anyone. The point is the failure mode: with isolation in application code, one missing `where` clause in one handler leaks another business\'s data. With row-level security, that same bug returns an empty set. Multi-tenancy is the one place where being paranoid at the lowest layer is cheaper than being careful at every higher one.',
      },
      {
        title: 'Give every step of the workflow its own timeout.',
        body:
          'An inbound WhatsApp message walks nine steps — load tenant context, classify intent and sentiment and language, check the FAQ cache, check plan limits, generate, send, log. Each has its own budget, from two seconds for a Redis lookup to twenty for the model call. A single timeout over the whole chain tells you the chain was slow. Per-step budgets tell you which step, which is the difference between an alert and a diagnosis.',
        code: `whatsapp.inbound
  loadTenantContext   5s   refresh prompt cache if > 24h old
  classifyIntent      8s   intent + sentiment + language, in parallel
  checkFAQCache       2s   Redis — answer instantly if cached
  checkPlanLimits     3s   Redis counter — block AI if over quota
  generateResponse   20s   Claude, cached system prompt`,
      },
      {
        title: 'Answer from cache before you answer from the model.',
        body:
          'Most inbound messages to a small business are the same six questions. A Redis lookup in front of the model turns those into an instant reply at no marginal cost, and the model handles what is actually novel. The ordering matters more than the caching: plan limits are checked before generation, so a tenant over quota is told so rather than served an expensive answer that then has to be reconciled.',
      },
      {
        title: 'Cost reduction is a feature with a number on it.',
        body:
          'Prompt caching against a large stable tenant context — the business\'s services, tone, hours, policies — takes the per-message cost down by roughly the same order as the cache hit rate, and that is what makes a low monthly price arithmetically possible rather than aspirational. Pricing a product you have not costed is how SaaS businesses discover their unit economics in month four.',
      },
    ],
    learned: [
      {
        claim: 'The distribution channel decides the architecture, not the other way round.',
        why:
          'Once WhatsApp is the interface, everything downstream changes: the response budget is conversational, not page-load; state is a thread, not a session; identity is a phone number, not an account. A team that builds the dashboard first and adds a WhatsApp integration later ends up with a chat interface shaped like a form. The order of construction is the decision.',
      },
      {
        claim: 'Write the tenant boundary before the second tenant exists.',
        why:
          'Retrofitting row-level security onto a working single-tenant schema means auditing every query ever written, and being wrong once is a breach rather than a bug. The cheap moment is before there is data.',
      },
      {
        claim: 'A queue is not an optimisation, it is what makes a webhook honest.',
        why:
          'A webhook has to acknowledge fast. Anything slower than the caller\'s patience — a model call, an outbound send, a write to three tables — has to happen after the acknowledgement or the platform starts retrying, and retries against non-idempotent work is how one message becomes four.',
      },
    ],
    stack: ['Next.js 14 App Router', 'TypeScript', 'Supabase (RLS + Realtime)', 'Claude API', 'Upstash Redis', 'Inngest', 'Meta WhatsApp Cloud API', 'PayFast'],
    source: 'AdminOS BUILD_JOURNEY.md — dossier + 18 dated sessions',
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    key: 'campus-compass',
    slug: 'varsityos',
    name: 'VarsityOS',
    kicker: 'Infrastructure for first-generation students',
    logo: 'varsityos',
    accent: '#4B5FD6',
    standfirst:
      'Built around one question: what does a first-generation South African university student actually need in order to survive the year, not just pass it?',
    problem: [
      'The student-productivity category assumes a student with a laptop, a data plan, a stable home and a parent who has done this before. Change any one of those assumptions and the product stops fitting. Change all four and you are describing most first-generation students in South Africa.',
      'So the feature list reads oddly next to a Notion clone: NSFAS allowance budgeting, load-shedding awareness, eleven languages, crisis support, and balancing a part-time job against a timetable. None of that is a productivity feature. All of it is what determines whether the year finishes.',
    ],
    decisions: [
      {
        title: 'Cache the knowledge base, inject the student.',
        body:
          'The AI companion runs against a large standing knowledge base held in the prompt cache, with the individual student\'s real budget, tasks, exam dates and mood injected fresh on every call. The split is deliberate: the expensive, stable, carefully-written part is paid for once; the part that must be current is small. Advice that does not know your actual balance is horoscope writing.',
      },
      {
        title: 'Crisis detection is keyword matching, and that is the correct choice.',
        body:
          'A student in crisis gets emergency resources shown by deterministic keyword match, not by model judgment. A model is better at nuance and worse at guarantees, and this is the one path in the product where a false negative is unacceptable and a false positive costs nothing but a visible helpline. Use the dumb, auditable mechanism where the failure is asymmetric.',
      },
      {
        title: 'Meter the free tier in the counter, not the UI.',
        body:
          'Ten free AI messages a month, enforced by a Redis counter checked before generation. Enforcing a limit in the interface means enforcing it nowhere — the API is the product surface for anyone who opens devtools, and a free tier that can be bypassed is a free product with extra steps.',
      },
      {
        title: 'Correct the price on the page, in public, when it drifts.',
        body:
          'Three separate commits in this repository exist only to make a published price match the tiers that actually exist — a tier that had been removed, a range that had gone stale. That is unglamorous and it is the job. A wrong price on a live page is not a content bug; it is a promise the system cannot keep.',
      },
    ],
    learned: [
      {
        claim: 'Constraints local to a market are product features, not localisation.',
        why:
          'Load shedding is not a translation string. It changes whether you can assume a network, whether a write can be deferred, and whether an evening study block is a reasonable default. Software written for a market where the power stays on has these assumptions everywhere and cannot list them, because nobody wrote them down.',
      },
      {
        claim: 'Row-level security will bite you on recursion before it bites you on access.',
        why:
          'Group membership policies that check group membership are a loop, and Postgres says so at the least convenient moment. The fix is a security-definer function that breaks the cycle; the lesson is that RLS is a small program per table and deserves to be read as one.',
      },
      {
        claim: 'A payment gateway integration is finished when a failed payment is also correct.',
        why:
          'Most of the payment work in this repository is not the happy path. It is field ordering, character encoding in item names, whitespace in a passphrase, and getting return, cancel and notify URLs pointing at the right host after a domain move. The happy path takes an afternoon.',
      },
    ],
    stack: ['Next.js 14', 'TypeScript (strict)', 'Supabase (Postgres + RLS)', 'Claude API', 'Zustand', 'React Hook Form + Zod', 'Recharts', 'PayFast', 'Vercel'],
    source: 'Campus Compass build journal — dossier, 54 sections',
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    key: 'k53',
    slug: 'k53-drill-master',
    name: 'K53 Drill Master',
    kicker: 'A learner licence app that works with the plane in the air',
    logo: 'k53-drill-master',
    accent: '#C8102E',
    standfirst:
      'Offline-first drills for the South African learner licence test, built to run on a budget Android phone with no signal and no patience.',
    problem: [
      'The audience is specific and the constraints follow from it: a 360-pixel screen, an entry-level Android, data that costs real money, and a test that is failed far more often than it is passed. Every kilobyte is a decision, and every dependency has to earn the download.',
      'It is also the build where the correctness of the content is a safety question. A road sign that is nearly right teaches the wrong pattern to somebody who is about to drive.',
    ],
    decisions: [
      {
        title: 'No router. No state manager. No CSS framework.',
        body:
          'Routing is a state string that swaps which game component is mounted. State is props plus localStorage. Styling is a theme object passed down. Each of those is a library that was considered and declined with a reason: fifty kilobytes for navigation on a single-page app, a global store for a codebase five people will ever touch, a build step for control over every pixel at 360 wide. The discipline is not minimalism for its own sake — it is that on this device the download is the user experience.',
        code: `// the entire routing layer
const [activeGame, setActiveGame] = useState(null);
if (activeGame === 'gauntlet')
  return <Gauntlet onBack={() => setActiveGame(null)} />;`,
      },
      {
        title: 'Synthesise the sound instead of shipping it.',
        body:
          'Every tone is generated with the Web Audio API — no audio files, so no requests, no cache entries, and it works offline from the first launch. The correct-answer sound is a rising two-note sine wave with a tuned attack and decay, because a reward sound is heard fifty times in a session and the difference between rewarding and irritating is about thirty minutes of tuning. Note the detail that matters more than the waveform: the audio context is resumed on every call, because iOS and Chrome suspend it and a silently dead sound on first tap reads as a broken app.',
        code: `osc.frequency.setValueAtTime(660, now);
osc.frequency.setValueAtTime(880, now + 0.08);
gain.gain.linearRampToValueAtTime(0.18, now + 0.01);      // attack
gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28); // decay`,
      },
      {
        title: 'Get the signs out of the official manual, not out of a drawing tool.',
        body:
          'The first version used hand-drawn inline SVGs — zero requests, crisp at any density, and wrong. South African road signs are legally specified, and a Give Way that is slightly off shape teaches the wrong recognition. The pivot was to extract the real artwork from the official learner manual PDF, using the renderer\'s paint-operation count to tell actual signs from decorative page furniture, then serving them as small on-demand JPEGs cached by the service worker after first view.',
        code: `Page  3 → images  10– 16 : Stop (R1.1), Yield (R2)
Page  4 → images  17– 25 : No Entry, speed limits
Page 22 → images 272–285 : warning — crossroads, junctions
Page 26 → images 329–343 : pedestrian & traffic warnings`,
      },
      {
        title: 'Let the browser find the corrupt files.',
        body:
          'Some extracted images came out damaged. Rather than audit several hundred files by hand, each image carries an `onError` that hides it and falls back to a drawn shape. Runtime detection of a known-possible failure is cheaper than an exhaustive up-front audit, and it stays correct when the asset set changes.',
      },
      {
        title: 'Count to three, then five, then five again.',
        body:
          'Streak encouragement fires at three, five and seven, then every five after that. Three is achievable enough to start the loop, seven feels like momentum, and past that the interval widens so the reward does not become wallpaper. Reward schedules are engineering; picking the numbers by feel and then never revisiting them is how an app becomes annoying.',
      },
    ],
    learned: [
      {
        claim: 'A dependency is a download before it is an abstraction.',
        why:
          'The usual calculus — a library costs a little size and saves a lot of time — inverts when the user is on a metered connection and a mid-range handset. Both directions are engineering. Only one of them is a default.',
      },
      {
        claim: 'Animate the number the way a person counts it.',
        why:
          'A linear count-up reads as mechanical. Ease-out-cubic reaches most of the final value quickly and then settles, which is how counting actually feels, and tabular figures stop the layout jumping as digit widths change. Two small choices that are the entire difference between a score that feels designed and one that feels rendered.',
      },
      {
        claim: 'When the content has a legal source, the content is a dependency.',
        why:
          'Treating the official manual as the upstream — with a documented extraction procedure — turns "are these signs right?" from a matter of memory into a matter of re-running a script. Several later commits correct individual sign codes against the official chart. That is only possible because there is an official chart in the pipeline.',
      },
    ],
    stack: ['React + Vite', 'JavaScript', 'Web Audio API', 'Service worker / PWA', 'Framer Motion', 'Supabase', 'PayFast'],
    source: 'K53 Drill Master build journal — dossier, 60 sections',
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    key: 'stokvelos',
    slug: 'stokvelos',
    name: 'StokvelOS',
    kicker: 'Rotating savings, made legible',
    accent: '#C9943A',
    standfirst:
      'A stokvel is not a bank. It is a trust community with written rules — so the software\'s job is transparency, and most fraud dissolves before it becomes fraud.',
    problem: [
      'South Africa\'s stokvels — rotating savings groups — are run on WhatsApp threads, paper ledgers and shared spreadsheets. The chairperson tracks who paid, calculates penalties from a handwritten constitution, chases fifteen to thirty people individually, and settles disputes with no record to point at.',
      'The build was triggered by a specific failure: a teachers\' stokvel lost money because two members paid into a closed account, nobody reconciled, and three months passed before the gap was found. There was no audit trail, so there was no way to tell error from theft.',
      'That framing set the product. The problem was never missing money. It was missing transparency — and those need different software.',
    ],
    decisions: [
      {
        title: 'Read the constitution once with a model. Enforce it forever without one.',
        body:
          'Each group uploads its own written constitution. A model reads it a single time and extracts the rules — contribution amounts, due dates, penalty schedules, payout order — into structured data. From then on enforcement is ordinary TypeScript running against those rules, with no model in the loop. The cost per transaction goes to effectively zero and, more importantly, enforcement becomes deterministic: the same input produces the same penalty every time, which is the only version a group will trust.',
      },
      {
        title: 'The members are not on the web app, and were never going to be.',
        body:
          'The dashboard is used by the chairperson. Everyone else interacts entirely through WhatsApp — payments, loan requests, balance checks, disputes, proof-of-payment photographs — inside the application already on their phone. Building the web app first and discovering this is a common and expensive route to the same conclusion.',
      },
      {
        title: 'Cache the constitution in the prompt, not just in the database.',
        body:
          'The parts of the context that never change turn-to-turn — the constitution, the extracted rules, the member roster — sit in the prompt cache. The first message from a group in a window pays full price; everyone after that pays a fraction. In a thirty-member group that is the difference between a daily AI cost that kills the pricing and one that disappears into it.',
      },
      {
        title: 'Never trust the balance field.',
        body:
          'The stored total is a cached number and cached numbers go wrong. Fraud detection ignores it completely and derives the balance from first principles — sum every confirmed contribution, subtract every paid payout — then compares. A divergence past both a relative and an absolute floor is a critical alert. Deriving the check from source truth rather than from the summary is the whole technique; it is also how a discrepancy gets caught in a day instead of a quarter.',
      },
      {
        title: 'Give the mediating agent a position, not a personality.',
        body:
          'The dispute agent\'s instruction is not "be helpful". It is that it takes nobody\'s side and protects the group\'s trust — warm, respectful, ubuntu-centred. And before it says anything, an automated investigation compares the claim against the financial record. Most disputes are "I already paid", and most are settled by the records alone; the model\'s job is to explain what the ledger shows, not to adjudicate.',
      },
    ],
    learned: [
      {
        claim: 'Use a model to convert, not to operate.',
        why:
          'The pattern that made this build affordable — parse the ambiguous human artefact once into structured rules, then run deterministic code against the structure — generalises to almost every "AI-powered" product with recurring per-user cost. Ask what is genuinely novel per transaction. Usually it is much less than the architecture assumes.',
      },
      {
        claim: 'An audit trail is a social feature.',
        why:
          'The technical description is an append-only log. The actual function is that a group can disagree about a payment without anyone having to be called a liar. The design goal was not fraud prevention; it was making disputes boring.',
      },
      {
        claim: 'A cached aggregate is a claim, and something has to check claims.',
        why:
          'Any denormalised total will eventually diverge from the rows it summarises — a failed transaction, a partial rollback, a migration. Software that treats the summary as truth cannot detect this at all. The reconciliation job is not an optional extra; it is the thing that makes the summary safe to use.',
      },
    ],
    stack: ['Next.js', 'TypeScript', 'Supabase / Postgres', 'Claude API (prompt caching)', 'WhatsApp Business API', 'PayFast'],
    source: 'StokvelOS build journal — dossier, 56 sections',
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    key: 'trueaccess',
    slug: 'trueaccess',
    name: 'TrueAccess',
    kicker: 'Whether you can actually get in',
    accent: '#2A9D8F',
    standfirst:
      'Venue accessibility in South Africa, assessed against the national standard by trained auditors — so that a disabled person can know before leaving home instead of phoning ahead.',
    problem: [
      'Millions of disabled South Africans plan every outing around a single unknown: will I be able to get in, move around, and use the facilities? The available information is photographs and the phrase "wheelchair accessible", which one step, one narrow door or one missing toilet makes false.',
      'The people who know are the people affected — but their knowledge lives in memory and group chats, unstructured and unsearchable. The build\'s bet is that this becomes useful the moment it is scored against something objective.',
    ],
    decisions: [
      {
        title: 'Score against the published standard, not against opinion.',
        body:
          'Every venue is assessed by a trained auditor against SANS 10400-S, the South African accessibility standard, and the compliance score is computed from that checklist. Ratings that are averages of impressions cannot be argued with or improved against. A score derived from a named standard tells a venue exactly which item to fix.',
      },
      {
        title: 'Disability profile data is never logged, never in a URL, never in an error.',
        body:
          'The most sensitive field in the system is the one that makes the product work — what a given user needs. It is excluded from logs, from query strings and from error messages by policy, not by review. Under POPIA that is a legal position; independent of POPIA it is the difference between an app disabled people will use and one they will not.',
      },
      {
        title: 'Accessibility is the product, so the interface is held to the product\'s standard.',
        body:
          'Every screen carries explicit accessibility labels and roles and holds a 4.5:1 contrast floor. This is stated in the journal as non-negotiable and it is the only honest position available: the users are disabled people, and an inaccessible app about accessibility is a contradiction that no feature can outrun.',
      },
      {
        title: 'Offline-first, data-light — because load shedding is real and mobile data is expensive.',
        body:
          'Cached queries and offline map packs, lazy images, paginated lists, compressed uploads. The same pair of constraints that shapes VarsityOS shapes this: in this market, "assume connectivity" is not a simplification, it is a bug that only appears in the field.',
      },
    ],
    learned: [
      {
        claim: 'The sensitive field is usually the one the product is about.',
        why:
          'Privacy engineering is easy when the sensitive data is incidental. It gets real when the sensitive data is the core index. The answer is not to avoid holding it — it is to decide, up front and in writing, which surfaces it may cross: never a log, never a URL, never an error string.',
      },
      {
        claim: 'One codebase for iOS, Android and web is a decision about maintenance capacity.',
        why:
          'With one engineer, three codebases is three times the surface for a fix to be applied twice and forgotten once. The universal router costs real flexibility at the edges and buys the only thing that matters at this size: every fix lands everywhere.',
      },
    ],
    stack: ['Expo Router (iOS + Android + Web)', 'TypeScript', 'Supabase', 'TanStack Query', 'Mapbox (offline packs)', 'PayFast'],
    source: 'TrueAccess build journal — dossier, 25 sections',
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    key: 'watchsankofa',
    slug: 'watchsankofa',
    name: 'WatchSankofa',
    kicker: 'African film and music, on its own infrastructure',
    accent: '#8B1E3F',
    standfirst:
      'A pan-African distribution platform for filmmakers, musicians and poets — built for the continent\'s connectivity, its languages and its crew-based creative culture rather than adapted to them.',
    problem: [
      'The premise is a refusal: not a clone of a Western platform with African content poured into it. The assumptions that come free with those platforms — reliable bandwidth, solo-artist profiles, a handful of languages, a card on file — are each wrong here in a way that changes the schema.',
      'Crew-based creative culture is the clearest example. African music and film are made by collectives, and a data model with one creator per work cannot represent who made the thing. That is not a feature gap; it is the record being wrong.',
    ],
    decisions: [
      {
        title: 'Enrich on upload with an agent, so the creator does no metadata work.',
        body:
          'A content agent triggers on every new work and writes back a summary, mood and theme tags, cultural context, detected language, content warnings and a thumbnail crop suggestion. Discovery quality on a catalogue platform is a function of metadata quality, and metadata quality is a function of how much unpaid work you ask a creator to do. Moving that to a scheduled agent is the difference between a catalogue that can be searched and one that cannot.',
      },
      {
        title: 'Move from single-shot calls to agents with memory and a schedule.',
        body:
          'The first architecture was a request, a model call, a response, done. The second gives each concern a persistent agent with its own tools, its own trigger and its own tables to write — content intelligence on upload, discovery on feed refresh. The shift matters because the interesting work is not what a model can do in one turn; it is what accumulates when something runs on a schedule and remembers.',
      },
      {
        title: 'Model the crew, the collective and the listening room.',
        body:
          'Comments with replies, an activity feed, creator notes between drops, listening rooms, live premieres, and pages that belong to a crew rather than a person. The journal argues each of these from how African audiences already gather — the activity feed because "someone you follow just dropped a track" is the highest-retention mechanic there is, the crew page because solo profiles miss the culture.',
      },
    ],
    learned: [
      {
        claim: 'Copying a platform copies its assumptions, and its assumptions are the expensive part.',
        why:
          'The visible layer of a streaming product is a grid of thumbnails and it takes a week. What takes the year is rights, roles, payouts, offline behaviour and discovery — all of which encode who the platform thinks makes things and how. Those are the parts that have to be rebuilt for a different context, and they are the parts that look like they can be reused.',
      },
      {
        claim: 'Write down who built it with you.',
        why:
          'This journal keeps an explicit collaborators table naming the AI as an embedded engineering partner rather than a tool. Whatever position one takes on that framing, recording it is the honest move — the alternative is a body of work whose authorship is quietly ambiguous.',
      },
    ],
    stack: ['Next.js', 'TypeScript', 'Supabase', 'Claude API', 'Vercel'],
    source: 'AfriFlix / WatchSankofa build journal — dossier, 24 sections',
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    key: 'bb-mothership',
    slug: 'bb-mothership',
    name: 'BB MotherShip',
    kicker: 'Restaurant operations, front and back of house',
    accent: '#B4653A',
    standfirst:
      'The only build on this floor made for somebody else\'s business — which is why the numbers are here and the commit messages are not.',
    problem: [
      'A working restaurant with a kitchen, a floor, stock, shifts, food-safety obligations and a second location coming. Software for that either costs more than the business can justify or arrives as five tools that do not know about each other.',
      'This dossier is deliberately thinner than the others. It is a client\'s operation, and the split that governs this whole wing applies twice over: the method can be public, the business cannot.',
    ],
    decisions: [
      {
        title: 'Let the database compute compliance, so it cannot be miscalculated.',
        body:
          'Whether a fridge temperature reading is within its safe range is a generated stored column, evaluated by Postgres from the reading and the range. Application code cannot get it wrong and cannot be persuaded to write a different answer. For a food-safety audit trail the authority has to sit at the lowest layer that a human cannot reach past.',
        code: `is_in_range  GENERATED ALWAYS AS (
  temperature_c >= min_safe_c AND temperature_c <= max_safe_c
) STORED`,
      },
      {
        title: 'Make the daily forms idempotent by making them upserts.',
        body:
          'Stock entries are unique on location, date, shift window and type, so re-submitting the form updates rather than duplicates. Anything filled in by a person under time pressure will be submitted twice; the choice is whether that produces a duplicate row or nothing at all. Sell-through is then computed on read rather than stored, so it cannot disagree with the entries it comes from.',
      },
      {
        title: 'Use a null scope to mean "everywhere".',
        body:
          'A null location id marks a record as chain-wide, so one master set of menu items, recipes and suppliers is visible at every location while each site can still hold its own. Reads take the union of the current location and the global scope. The pattern is old and worth naming, because the alternative — copying the master set per location — is correct on the day it is written and wrong every day after.',
      },
      {
        title: 'Derive the forecast from tables that already exist.',
        body:
          'The revenue outlook is a weighted confidence score over shifts, checklist completions and calendar events — three tables already being written for other reasons, no new migration, no new storage. Before adding a data source, check whether the signal is already in the building.',
      },
      {
        title: 'Write tests for the pure functions that have already caused bugs.',
        body:
          'The first suite deliberately targets the utilities with a history: timezone conversion behind past off-by-a-day and wrong-hour bugs, rank thresholds and progress caps, PIN hashing round-trips and malformed input. Not coverage for its own sake — the specific pure functions whose failures had already cost something. Integration tests against row-level security still need a test database, and that is written down as an open gap rather than quietly skipped.',
      },
    ],
    learned: [
      {
        claim: 'Put the invariant in the strongest layer that can hold it.',
        why:
          'Generated columns, unique constraints and row-level security are all the same move — take a rule that application code is currently promising to keep, and make the database keep it instead. Every rule moved down is a class of bug that cannot be written.',
      },
      {
        claim: 'The typed client will let you read a table it will not let you write.',
        why:
          'Reading from an unregistered table can be cast past. Inserting cannot — the client validates the payload against the registered insert type and rejects excess properties. That asymmetry is easy to hit late, when the read path has been working for weeks and the first write fails.',
      },
      {
        claim: '"Zero tests" is a finding, not a confession.',
        why:
          'Writing it down as a gap with a first suite against it is the useful response. A build journal that only records successes is a marketing document with timestamps.',
      },
    ],
    stack: ['Next.js App Router', 'TypeScript', 'Supabase / Postgres (RLS, generated columns)', 'Vitest', 'Server actions', 'Vercel'],
    source: 'BB MotherShip build journal — diary + dossier, 95 sections',
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    key: 'sanyu',
    slug: 'sanyu',
    name: 'Sanyu Botanicals',
    kicker: 'A physical product, sold online',
    logo: 'sanyu-botanicals',
    accent: '#7A2F3A',
    standfirst:
      'The only build on this floor with a factory — and the factory is a kitchen. Herbal balm and scalp serum, made by hand in small batches, with the software wrapped around the part that does not scale.',
    problem: [
      'Every other build here is software all the way down: the thing sold and the thing built are the same object. Sanyu is not. There is a stove, a whisk, dried herbs, a mixing bowl, jars that get filled one at a time, and a person whose hands are the bottleneck.',
      'That inverts what the software is for. A storefront for a digital product exists to remove friction from an infinite supply. A storefront for a hand-made one exists to protect a finite supply — from over-ordering, from stock that says available when the shelf is empty, from a delivery promise that quietly assumes a warehouse.',
    ],
    decisions: [
      {
        title: 'Photograph the making, not just the jar.',
        body:
          'The product library leads with the whisk in the bowl, the herbs on the tray, the row of filled jars cooling on a counter — and only then the finished bottle held up in a garden. For a small-batch botanical the provenance is the product; a clean pack shot on white says nothing that a thousand identical brands are not also saying. It is a merchandising decision that happens to be made in a photo folder rather than in code, and it is the one that matters most.',
      },
      {
        title: 'Trim every credential before you use it.',
        body:
          'Three separate commits here exist to strip whitespace off a payment passphrase and off environment variables before signing. An invisible trailing space in a dashboard field produces a signature mismatch that looks exactly like a wrong key, and it costs an afternoon every time somebody meets it fresh. The same bug appears in the K53 and VarsityOS journals — so it is not a gateway quirk, it is what happens whenever a secret is copied by a human.',
      },
      {
        title: 'Lazy-initialise the mail client so a missing key cannot fail the build.',
        body:
          'The transactional-mail client was being constructed at module scope, so a build without that key crashed at compile time instead of failing at send time. Moving construction inside the call turns a deploy-blocking error into a runtime one with a real message. The general rule: anything that reads an environment variable at import time makes that variable a build dependency, whether or not the feature is switched on.',
      },
      {
        title: 'Send from the domain that is verified today, not the one that will be.',
        body:
          'While DNS propagated for the new sending domain, order confirmations went out from an already-verified one. Unglamorous — and the alternative is a launch window in which every confirmation email lands silently in spam, which from the customer side is indistinguishable from never having sent it.',
      },
    ],
    learned: [
      {
        claim: 'Physical stock needs a different definition of "available" than digital stock.',
        why:
          'A template can be sold a thousand times tonight. A balm cannot be sold past the number of jars that exist, and that number is a function of somebody’s Saturday. Software that treats the two identically will eventually accept an order it cannot fill, and that costs more trust than a sold-out label ever does.',
      },
      {
        claim: 'A brand with a real product photographs better than a brand with a real budget.',
        why:
          'The strongest assets in this build were taken on a phone, in a kitchen and a garden, with no lighting kit. They work because the thing in frame is genuinely being made. Not an argument against production value — an argument that provenance outranks polish when the product is hand-made.',
      },
    ],
    stack: ['Next.js', 'TypeScript', 'Supabase', 'PayFast', 'Resend', 'Cloudinary', 'Vercel'],
    source: 'sanyubotanicals repository — commit history and the product library',
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    key: 'mirembe-muse',
    slug: 'mirembe-muse',
    name: 'Mirembe Muse',
    kicker: 'The studio that sells the work',
    logo: 'mirembe-muse',
    accent: '#C9943A',
    standfirst:
      'The other half of the split this whole wing is built around. Every outcome, case study and price lives there; every process, failure and half-finished idea lives here.',
    problem: [
      'One person, several products, and two audiences who want incompatible things. A client evaluating a build wants outcomes, references and a price. A reader of this site wants the making — the wrong turns, the night something broke, the reasoning under a trade-off. Serve both from one site and it becomes a portfolio that is boasting and confessing at the same time, and neither audience believes it.',
      'So there are two buildings and one rule for which is which: if a page starts arguing for her, it belongs on Mirembe Muse. That rule is also why this dossier is short. The interesting thing about Mirembe is what it sells, and this is the wrong site to sell it on.',
    ],
    decisions: [
      {
        title: 'Two sites, one rule, no overlap.',
        body:
          'Not two audiences on one site behind a filter, and not one site with a business section. Separate domains, separate deployments, separate databases. The cost is real — two of everything to maintain — and it buys the thing that matters: neither site has to hedge. A services page can make a claim without a poem beside it undercutting the register, and a postmortem can admit a month of blind monitoring without a prospective client reading it as a warning.',
      },
      {
        title: 'The business routes redirect rather than duplicate.',
        body:
          'When a page moved to the studio site it became a permanent redirect here, not a copy. Two live copies of the same claim diverge — one gets a price update and the other does not — and the stale one is invariably the one a search engine has already indexed.',
      },
      {
        title: 'Scope the database client to its own schema.',
        body:
          'The admin client is scoped to the studio schema and carries a correspondingly scoped token rather than a general-purpose one. Same instinct as the multi-tenant work in AdminOS: the blast radius of a mistake should be bounded by something structural, not by the care of whoever writes the next query.',
      },
      {
        title: 'Publish a price only where it can be kept current.',
        body:
          'A recurring class of commit in this repository corrects a published price that had drifted from the tier that actually exists — a range gone stale, a tier removed but still listed. A number repeated across a site is a promise repeated across a site, and only one copy ever gets updated.',
      },
    ],
    learned: [
      {
        claim: 'Two sites is a positioning decision that happens to have a hosting bill.',
        why:
          'The temptation with limited time is one site with a "work" tab. It is cheaper and it is worse, because the register cannot change between tabs — the whole site ends up in the tone of whichever audience is more commercially urgent, which is always the client. Splitting is what lets this side be honest.',
      },
      {
        claim: 'A redirect is a maintenance decision before it is an SEO one.',
        why:
          'The reason to redirect rather than duplicate has very little to do with rankings. It is that one copy cannot go stale relative to another copy if there is only one copy.',
      },
    ],
    stack: ['Next.js', 'TypeScript', 'Supabase (scoped schema)', 'PayFast', 'Resend', 'Vercel'],
    source: 'MirembeApp repository — commit history; the split is specified in docs/THE_FORGE.md §0',
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    key: 'creativelynanda',
    slug: 'creativelynanda',
    name: 'CreativelyNanda',
    kicker: 'This house',
    accent: '#C21E56',
    standfirst:
      'The site you are reading. A personal website that refused to be a brochure — and the only build whose bugs you can verify by looking around.',
    problem: [
      'The brief was a cultural destination rather than a portfolio: the credibility of a professional profile, the commerce of a shop, the storytelling of a craft marketplace, the community of a poetry site, the editorial standard of a magazine. That is an unreasonable list, and it shaped every technical decision after it.',
      'It also produced the structural idea the whole site now runs on — rooms rather than pages. The poetry wing has nine. This wing is the answer to engineering having had one.',
    ],
    decisions: [
      {
        title: 'PayFast over Stripe, on market grounds.',
        body:
          'Stripe is the global default and the wrong choice here. PayFast is the dominant South African gateway, supports EFT and instant EFT — how people actually pay — and settles in rand without a conversion step. For an audience of South African students and small businesses, Stripe would have added friction and currency confusion to every checkout. The correct gateway is the one your buyers already trust, not the one with the best documentation.',
      },
      {
        title: 'Framer Motion, chosen for the accessibility escape hatch.',
        body:
          'Picked over CSS animation and GSAP because it composes with React\'s component model, is safe to export from server components, and has first-class reduced-motion support. That last point decided it: the animation system had to be accessible from the beginning rather than retrofitted, and every wrapper on this site takes `respectReducedMotion` and a mobile fallback as ordinary props.',
      },
      {
        title: 'The grain overlay is fixed, not sticky.',
        body:
          'A one-word difference that decides whether the texture repaints on every scroll frame. This is the register the whole front end is built in — the film grain, the parchment, the gold rules are the point of the site, and they have to cost nothing.',
      },
      {
        title: 'Publish the commit history rather than a claim about it.',
        body:
          'The Commit Wall in this wing is measured from the GitHub API at build time and committed as data, so the site never calls GitHub while serving. The number is not typed into a paragraph, which means it cannot quietly go stale — the failure mode of every "over 1,000 commits" line on every portfolio.',
      },
    ],
    learned: [
      {
        claim: 'Hydration bugs on this site are a class, not a series of incidents.',
        why:
          'React error 425 and 422 kept returning with different faces — a date rendered during render, an inline style block, a random value. Treating each as its own bug meant fixing it three times. Treating it as a class produced a rule: nothing that can differ between server and client may be evaluated during render.',
      },
      {
        claim: 'A build pipeline that excludes files will eventually exclude a file you need.',
        why:
          'Trimming image weight by pattern once broke the visual atlas, because a set of hard-coded public paths had been reorganised into subfolders and nothing connected the two facts. Any rule that removes files from a deploy needs to name what depends on them, in the same place.',
      },
      {
        claim: 'The failure mode of a solo build is the branch that never merges.',
        why:
          'A finished, reviewed, deployed-to-preview rebuild sat unmerged for days while production served the old design, because the preview looked right and the preview was not the site. Green preview is not shipped. Only main is shipped.',
      },
    ],
    stack: ['Next.js 14 App Router', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Supabase', 'Cloudinary', 'PayFast', 'Resend', 'Vercel'],
    scars: ['payfast-signature', 'hydration-class', 'silent-corpus-loss', 'the-filter-that-deleted-the-room'],
    source: 'CreativelyNanda build journal — dossier, 67 sections',
  },
];

/** Route lookup for `/forge/floor/[app]`. */
export const DOSSIER_BY_SLUG = Object.fromEntries(
  BUILD_DOSSIERS.map((d) => [d.slug, d])
) as Record<string, BuildDossier>;

export { NAVY };
