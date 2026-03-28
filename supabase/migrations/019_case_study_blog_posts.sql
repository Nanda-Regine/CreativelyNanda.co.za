-- Migration 019: Case study blog posts for portfolio projects
-- Run in Supabase SQL Editor

INSERT INTO blog_posts (
  slug, title, excerpt, content, category, tags, reading_time, is_published, is_featured, published_at
) VALUES

-- ===== K53 DRILL MASTER =====
(
  'building-k53-drill-master-ai-driving-test-prep',
  'How I Built K53 Drill Master: AI-Powered Driving Test Prep for 1.2 Million South Africans',
  'South Africa has a 50%+ K53 learner licence failure rate. I built a R29/month AI-powered prep platform in React + Supabase + PayFast that puts world-class study tools in the hands of township learners, rural communities, and anyone who can''t afford to fail twice.',
  '## The Problem Nobody Was Solving

Every year, **1.2 million South Africans** sit for the DLTC learner''s licence test. More than half fail.

That number isn''t a statistic — it''s a blocked job opportunity. In a country where youth unemployment exceeds 45%, a driver''s licence is literally a job offer. Courier services. Taxi operations. Delivery roles. Logistics positions. Each of these requires that laminated card. Each failure delays economic participation by months.

The existing alternatives? Costly. Ad-heavy. Outdated. Designed for markets with reliable infrastructure, mid-range devices, and users who can absorb a R500 study book.

I built **K53 Drill Master** for everyone else.

---

## The Design Philosophy: Minimum Stack, Maximum Access

Before writing a single line of code, I made a decision that shaped everything: **no UI framework dependencies**.

No Tailwind. No shadcn. No component library. Just React 18, Vite 5, and inline styles with a carefully designed colour palette drawn from the South African flag — `#007A4D` green, `#FFB612` gold, `#DE3831` red.

Why? Because the target user is on a budget Android phone, often on 3G. Every kilobyte of JavaScript that isn''t earning its keep is a barrier between a learner and the knowledge they need.

The result: a PWA that loads in under 2 seconds on 3G. That''s not a performance benchmark — it''s an accessibility requirement.

---

## Architecture: A State Machine Without a Router

The navigation pattern was a deliberate architectural choice. No React Router. No URL-based routing. Instead, a single app-level state machine:

```js
const [activeGame, setActiveGame] = useState(null);
// null → home screen
// "gauntlet" | "hybrid" | "patterns" | "roadrules" | "mockexam" | "progress"
```

Each drill mode receives a single `onBack` prop. Internal screens manage their own local state independently. This produces an app that behaves like a native mobile experience — no page refreshes, no loading states between screens, no browser history management complexity.

For a study app where a learner might switch between drill modes 50 times in a session, this matters.

---

## Five Drill Modes, One Mission

The content architecture mirrors the actual DLTC test structure:

| Mode | Questions | Purpose |
|------|-----------|---------|
| **Code 8 Gauntlet** | 90 | Covers every K53 category systematically |
| **Hybrid Gauntlet** | 100 | Questions that trip real candidates |
| **Know Your Numbers** | 41 + speed mode | Pattern drilling of K53 numeric values |
| **Road Rules Gauntlet** | 120 | Organized by vehicle code |
| **Mock Exam** | 68 | Full DLTC format: 45-min timer, 75% pass mark |

Every question derives from two official South African Traffic Department publications: *Rules of the Road* and *Manual on Road Traffic Signs*. No third-party condensations. No estimation. The same source documents the actual test draws from.

This matters legally and pedagogically. A learner shouldn''t have to unlearn anything when they sit in that exam chair.

---

## The Payment Flow: PayFast as the Great Equaliser

Implementing PayFast for a R29/month product taught me more about SA fintech than any course could.

The subscription flow:

```
User pays via PayFast
→ PayFast ITN fires → /api/notify → upsert subscribers table
→ User redirected to /?unlock=TOKEN
→ /api/verify validates token → storePremiumToken() in localStorage
→ AuthModal opens → user enters email
→ /api/claim → creates Supabase auth user → sends magic link
→ User clicks link → onAuthStateChange fires → checkSubscription()
→ Supabase RLS: SELECT WHERE auth.uid() = user_id AND expires_at > NOW()
→ Premium unlocked
```

The freemium boundary is enforced at the component level using localStorage: 10 free questions daily, resetting at midnight. When the gate fires, the upgrade modal appears with clear, non-manipulative pricing.

R29/month. Less than bread and two litres of milk. R69 for 3 months — less than a single bus week for rural learners who make one trip to the test centre and need to pass.

---

## AI Tutor: GPT-4o-mini as the Patient Explainer

When a user gets a question wrong, an **Explain This** button appears. This triggers GPT-4o-mini with a carefully engineered prompt:

- Question context
- Correct answer
- Relevant K53 rule reference
- Instruction to respond in plain South African English, 2–3 sentences max

Responses are cached per question in memory for the session. This keeps API costs manageable (gpt-4o-mini at fraction-of-a-cent per call, cached for reuse) while providing genuine pedagogical value.

The AI tutor isn''t a chatbot. It''s a precise, contextual explainer that does one job perfectly.

---

## Supabase RLS: Security That Scales to Zero

The subscribers table has exactly one policy:

```sql
create policy "own row" on subscribers
  for select using (auth.uid() = user_id);
```

Users can only see their own subscription. No admin panel needed. No server-side session management. Supabase''s Row-Level Security handles authorisation at the database layer — meaning even if someone found the Supabase URL, they couldn''t read another user''s data.

This is how you build a secure subscription product solo, without a backend team.

---

## What I Learned

**On pricing for impact**: R29 wasn''t chosen by A/B testing. It was chosen by asking *what does R29 mean to a learner on a prepaid budget*? Less than data for a week. Accessible. Not free (free devalues learning), but not a barrier.

**On stack minimalism**: Every dependency is a potential failure point. A zero-dependency frontend that works on 3G is a product decision, not a technical compromise.

**On using AI as a tool, not a feature**: The AI tutor exists because it genuinely helps learners understand *why* they got something wrong. It''s not there to look impressive. That distinction matters.

---

## The Numbers

- **50+** paying subscribers at R29/month
- **4.8/5** user rating
- **1.2M+** South Africans sit the K53 test annually — the addressable market
- **Zero** framework dependencies in the frontend

A driving licence is a job offer. K53 Drill Master makes sure everyone gets to say yes.

---

*Built by Nandawula Regine Kabali-Kagwa — AI Engineer & Creative Technologist, East London, South Africa.*
*Tech: React 18, Vite 5, Supabase, PayFast, OpenAI gpt-4o-mini, Vercel*',
  'dev',
  ARRAY['AI', 'PayFast', 'Supabase', 'React', 'EdTech', 'South Africa', 'K53', 'Case Study'],
  12,
  true,
  true,
  NOW()
),

-- ===== CAMPUS COMPASS =====
(
  'building-campus-compass-ai-student-super-app',
  'Campus Compass: Building an AI Student Super-App for South Africa''s 11 Million Varsity Students',
  'South African university students navigate NSFAS deadlines, load shedding, financial stress, and academic pressure simultaneously. I built Campus Compass — a zero-dependency PWA with GPT-4o-mini mental health AI, budget tracking, meal planning, and study tools designed specifically for the SA student experience.',
  '## Eleven Million Students. Zero Purpose-Built Tools.

There are **11 million South Africans** at university or TVET college. They navigate NSFAS deadlines, load shedding schedules, financial stress, mental health pressure, meal planning on R800/month food budgets, and academic pressure — simultaneously, without adequate tools.

The generic productivity apps — Notion, Todoist, Google Calendar — weren''t built for someone waiting on an NSFAS appeal while tracking whether they''ve spent their accommodation allowance and preparing for a Monday test during stage 4 load shedding.

Campus Compass is. Entirely.

---

## The Architecture Decision That Defined Everything

**Zero dependencies. Zero build step.**

Campus Compass is built with vanilla HTML, CSS, and JavaScript. No React. No Next.js. No bundler. Just modern ES2022 features — optional chaining, `structuredClone`, `Map`, `localStorage` — deployed as static files.

This was deliberate. University students often study on shared devices, slow connections, or limited data. An app that boots in 200ms on any device isn''t a performance achievement — it''s an equity requirement.

Every page is independently loadable. The PWA service worker caches everything for offline use. When load shedding cuts the internet at 2am during exam week, Campus Compass still works.

---

## Nova: The Mental Health Companion Built for SA Students

The most technically and emotionally significant feature is **Nova** — a GPT-4o-mini powered AI companion designed specifically around South African student experiences.

Nova''s personality matrix was carefully engineered:
- Warm and empathetic, non-clinical
- Understands SA-specific stressors: NSFAS bureaucracy, imposter syndrome in predominantly white institutions, homesickness from rural communities, load shedding anxiety
- Never performs wellness — it listens

The system prompt took seven iterations before it felt right. The breakthrough was specificity: instead of "be supportive," the prompt specifies exact SA contexts — "understand that NSFAS delays can mean a student hasn''t eaten today."

**Crisis detection** was non-negotiable. Keywords automatically surface the SADAG helpline (0800 21 4446) and Lifeline SA (0800 567 567). This isn''t opt-in. When Nova detects crisis language, the banner appears. Every time.

```js
// Crisis detection (simplified)
const CRISIS_KEYWORDS = [''suicide'', ''end it'', ''can''t go on'', ''worthless''];
if (CRISIS_KEYWORDS.some(k => message.toLowerCase().includes(k))) {
  showCrisisBanner();
}
```

The last 50 messages persist across sessions in localStorage. Nova remembers the conversation. That continuity matters for trust.

---

## NSFAS Integration: Building What NSFAS Doesn''t

The **Budget & NSFAS module** is the feature that makes Campus Compass distinctly South African.

It tracks all four NSFAS allowance types:
- Living allowance
- Accommodation allowance
- Book allowance
- Personal care allowance

With real-time balance calculations, a myNSFAS portal link, important dates calendar, and spending categorisation. Students can see exactly how much of their accommodation allowance they''ve used versus received — something the myNSFAS portal notoriously fails to make visible.

The animated donut ring for budget usage was a UX decision: the colour shift from teal (healthy) → amber (warning) → red (overspent) communicates financial status in a glance. No numbers required.

---

## Meal Planning at R800/Month

South African student food budgets are brutal. The **Meal Prep module** was built with this reality as its constraint, not an edge case.

Five SA-specific budget recipes are baked in — each under R50, designed for a dorm room or small communal kitchen. Not asparagus risotto. Pap, chakalaka, egg fried rice, bean soup, braai-adjacent chicken thighs.

The **AI Recipe Generator** takes the chaos of "what do I have left in my fridge on day 25 of the month" and turns it into an actual meal. Input: cabbage, two eggs, soya sauce, rice. Output: a complete recipe with steps, portions, and cost estimate.

---

## Study Planner: The Operating System Layer

The study planner isn''t a to-do list. It''s an operating system for academic survival:

- **Tasks**: module-tagged assignments with countdown timers (overdue/urgent/normal)
- **Timetable**: visual weekly grid (07:00–17:00, Mon–Fri), click-to-add
- **Exams**: countdown cards with colour coding — red for ≤7 days, amber for ≤14
- **CSV export**: for sharing with tutors or archiving

The timetable grid was the hardest UI to build in vanilla JS. Sixty-five time slots across five days, each independently clickable, with persistent state across page reloads. No React''s reconciliation to help — just careful DOM manipulation and localStorage serialisation.

---

## Monetisation Built for the SA Market

| Tier | Price | What''s included |
|------|-------|----------------|
| Free | R0 | Study Planner, Budget, Meal Prep, 10 Nova messages/month |
| Premium | R49/month | Unlimited Nova, AI Recipes, CSV export |
| University Partnership | Custom | White-label, campus SSO, analytics dashboard |
| Brand Sponsorship | Custom | In-app placement (telco, food retail) |

The university partnership tier is where the real scale lives. One Nelson Mandela University deal = 30,000 users overnight. The white-label architecture was designed from day one with this in mind — the brand colours and institution logo swap via a single config object.

---

## What This Taught Me About Building for Constraint

Campus Compass''s constraints — no framework, no backend, limited data users — forced better decisions than unlimited resources would have.

LocalStorage-first architecture means the app works instantly, always, everywhere. The AI features are additive — the app is fully functional without them. Crisis detection is the feature I''m most proud of, and the one that required the most careful thought. Getting it wrong has consequences I wasn''t willing to accept.

Eleven million South African students deserve tools built specifically for their reality. Campus Compass is my answer to that.

---

*Built by Nandawula Regine Kabali-Kagwa — AI Engineer & Creative Technologist*
*Tech: Vanilla JS/HTML/CSS, OpenAI gpt-4o-mini, PWA (Service Worker), localStorage, Vercel*',
  'dev',
  ARRAY['AI', 'PWA', 'JavaScript', 'OpenAI', 'EdTech', 'South Africa', 'NSFAS', 'Mental Health', 'Case Study'],
  14,
  true,
  true,
  NOW()
),

-- ===== POETRYTUBE =====
(
  'building-poetrytube-video-poetry-platform-africa',
  'PoetryTube: Building the Video Poetry Platform African Poets Actually Deserve',
  'Mainstream video platforms deprioritize literary content and African voices. I built PoetryTube — a dedicated video poetry platform with Supabase Auth, AI poem completion, mood detection, and video hosting infrastructure designed specifically for African and diaspora spoken word artists.',
  '## The Gap Nobody Was Filling

African poets have voices that could shake rooms. What they lack is infrastructure.

YouTube buries poetry behind algorithm preferences for entertainment content. TikTok''s format demands brevity that breaks the form. Instagram''s link policies make monetisation nearly impossible. And none of these platforms were built with African spoken word traditions in mind — the extended metaphor, the call-and-response, the oral history embedded in a single performance.

**PoetryTube** exists because African poets deserve a platform designed for *them*, not adapted from one designed for someone else.

---

## The Technical Foundation

PoetryTube is built on a Supabase + Next.js core, with three AI-powered features that make the platform genuinely useful for creators — not just a video repository.

### Authentication: Email/Password via Supabase Auth

The auth flow is deliberately simple: email/password signup, automatic profile creation on first auth, email confirmation before login access. This removes the friction of OAuth for users who may not have Google/GitHub accounts, which is a real consideration in African markets where Google account ownership isn''t universal.

```js
// Auto-create profile on signup
supabase.auth.onAuthStateChange(async (event, session) => {
  if (event === ''SIGNED_IN'' && isNewUser) {
    await supabase.from(''profiles'').insert({
      id: session.user.id,
      username: session.user.email.split(''@'')[0]
    });
  }
});
```

### Video Infrastructure

Video hosting for a user-generated platform is one of the hardest infrastructure decisions in web development. The options:

- **Supabase Storage direct**: Simple, but lacks transcoding — means raw upload sizes, no adaptive bitrate
- **Cloudflare Stream**: ~$5/1000 minutes stored, adaptive bitrate, global CDN, direct upload API
- **Mux**: Higher quality, better analytics, higher cost

PoetryTube''s architecture abstracts the video provider — the upload component accepts a provider config, meaning the platform can migrate from Cloudflare Stream to Mux (or back) without touching the component library. This was a forward-thinking decision that adds minimal code complexity but significant operational flexibility.

---

## Three AI Features That Serve Poets, Not Just Impress Them

### 1. AI Poem Completion ("Write With Me")

A poet watches a video, feels inspired, starts typing. The "Write With Me" feature continues their draft in the tradition of African spoken word poetry — not generic creative writing.

The system prompt is the product:

```
You are an AI assistant trained in African spoken word traditions.
When completing poems, consider:
- Call-and-response structure
- Rhythmic repetition and anaphora
- Specific African cultural references (ubuntu, ancestral wisdom, diaspora experience)
- The oral tradition of performance poetry
Continue this poem naturally, matching the author''s voice and cultural context.
```

The AI doesn''t write for the poet — it writes *with* them, offering continuations they can accept, reject, or remix.

### 2. Title Generator

Five styled title suggestions per poem submission. Not generic suggestions — they consider the poem''s emotional register, cultural references, and spoken word conventions. A poem about NSFAS shouldn''t get a title that sounds like it belongs to a Rupi Kaur anthology.

### 3. Mood Auto-Tagging

Poems are automatically tagged with emotional metadata: hopeful, grief, resistance, joy, longing, power, love. This makes discovery meaningful — a listener who needs a "resistance" poem on a hard day can find it without keyword searching.

---

## Profile Architecture: The Creator''s Stage

Every poet gets a profile page that functions as a digital stage:

- **Video tab**: Their uploaded performances, view counts
- **Poems tab**: Written work with mood tags
- **Stats tab**: Platform-wide performance metrics
- **Social links**: Instagram, Twitter/X, personal website, booking link

The tabbed interface was designed for mobile-first consumption — most African internet users access content primarily on phones. The responsive grid shifts from 2-column desktop to full-width mobile without media query gymnastics.

---

## What''s Real, What''s Next

PoetryTube''s current build is honest about its limitations. The engagement features (likes, comments, follows) have UI without backend logic — they''re in the roadmap, not the shipping version. Real-time updates aren''t implemented yet. These are conscious choices: ship what works completely rather than ship everything partially.

What''s live and fully functional:
- Auth and profiles
- Video upload (Supabase Storage, provider-abstracted)
- AI poem completion, title generation, mood tagging
- Discover feed with mood filtering
- Mobile-responsive throughout

What''s coming:
- Production video hosting (Cloudflare Stream)
- Engagement infrastructure (likes, follows, comments)
- Monetisation for creators (direct support)
- Live performance streaming
- Community challenges and prompts

---

## Why This Platform Matters

There is a spoken word poet in Soweto whose performance of grief and resistance would change someone''s life in London, Lagos, or Los Angeles — if they could find it. PoetryTube''s job is to remove the algorithm-shaped barrier between that poem and that person.

That''s not a feature. That''s the whole point.

---

*Built by Nandawula Regine Kabali-Kagwa — AI Engineer & Creative Technologist*
*Tech: Next.js, Supabase Auth + Storage, OpenAI, Cloudflare Stream (roadmap), TypeScript*',
  'dev',
  ARRAY['Poetry', 'Supabase', 'OpenAI', 'Next.js', 'African Tech', 'Creative Platform', 'Case Study'],
  11,
  true,
  false,
  NOW()
),

-- ===== GREEN VAULT eCOMMERCE =====
(
  'building-green-vault-payfast-ecommerce-south-africa',
  'Green Vault: Building a PayFast-Integrated eCommerce Demo for the South African Market',
  'Most eCommerce templates are built for Stripe in USD. Green Vault is a production-ready demo built from the ground up for South African PayFast payments, with a token-based economy, AI chatbot, glassmorphism UI, and zero external dependencies.',
  '## The Problem with eCommerce Templates in Africa

Search "eCommerce template" and you''ll find beautiful, polished Stripe integrations, USD pricing, and US-centric tax logic. For South African businesses, these templates require months of adaptation work before a single rand can change hands.

**Green Vault** was built to flip that assumption: a fully functional eCommerce demo designed for the South African market from line one, with PayFast as the native payment gateway.

---

## The Token Economy Architecture

Green Vault uses an interesting approach to eCommerce: a **token-based economy** where users purchase tokens (1:1 with ZAR) and redeem them for products. This pattern has interesting real-world applications:

- **Gift card systems**: Users buy tokens as gifts for others
- **Loyalty programs**: Bonus tokens for first purchase or referrals
- **Budget management**: Pre-load a spending limit, stick to it
- **Multi-currency abstraction**: Tokens decouple the frontend from payment currency

The token balance is maintained in localStorage with a transaction log that preserves full history. This makes the balance sheet auditable without a database.

---

## Zero-Dependency Frontend: A Production Philosophy

Like K53 Drill Master, Green Vault was built with no external JavaScript dependencies. Just HTML5, CSS3, and modern ES2022.

The CSS is where this becomes interesting. The glassmorphism design — that frosted-glass aesthetic — is achieved with:

```css
.card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.15);
}
```

No Tailwind required. These are native CSS properties with widespread browser support. The animation system uses CSS keyframes throughout — zero JavaScript animation libraries.

---

## PayFast Integration Architecture

The PayFast integration is sandbox-ready with a clean architecture for production deployment. Key implementation decisions:

**Signature generation**: PayFast requires MD5 signature of all payment parameters in field-insertion order (not alphabetically — a common mistake that causes 400 errors). The signature includes the merchant passphrase appended after all other fields.

**ITN (Instant Transaction Notification) handling**: PayFast sends a server-side notification to your notify_url on payment completion. This is how you reliably update your database — not from the client-side return_url, which can be bypassed.

**Sandbox vs Production**: A single environment variable switches between sandbox.payfast.co.za and www.payfast.co.za. Merchant credentials swap alongside.

---

## AI Chatbot: Command Recognition Without an API

The AI chatbot in Green Vault is implemented without any external API calls — it uses **command recognition patterns** rather than a language model.

```js
const commands = [
  { patterns: [/balance/i, /how much/i], response: getBalanceResponse },
  { patterns: [/product/i, /show me/i], response: getProductResponse },
  { patterns: [/help/i, /support/i], response: getHelpResponse },
];

function processMessage(input) {
  const match = commands.find(cmd =>
    cmd.patterns.some(p => p.test(input))
  );
  return match ? match.response() : getFallbackResponse();
}
```

For a demo, this provides instant, reliable responses without API costs or latency. For production, the architecture hooks to any LLM API with a single function swap.

---

## The Preference Engine

Users select preferences via chip-based UI on onboarding — categories they''re interested in, dietary preferences, style choices. These persist in localStorage and filter the product catalog on every subsequent session.

This is personalisation without a recommendation system. No collaborative filtering. No user tracking. Just: "you said you like X, so we''ll show you X first." It''s transparent, fast, and privacy-respecting.

---

## What South African Builders Can Take From This

Green Vault answers a specific question: *what does a production-ready PayFast integration actually look like?*

The answer: careful signature generation (field order matters, passphrase goes last), server-side ITN handling (not client-side), environment-based merchant credential switching, and honest error handling when PayFast rejects a payment.

These aren''t documented in any single place. Green Vault is the implementation I wish had existed when I first integrated PayFast.

---

*Built by Nandawula Regine Kabali-Kagwa — AI Engineer & Creative Technologist*
*Tech: Vanilla JS/HTML5/CSS3, PayFast, localStorage, Vercel — zero external dependencies*',
  'dev',
  ARRAY['PayFast', 'eCommerce', 'JavaScript', 'South Africa', 'CSS', 'Case Study'],
  9,
  true,
  false,
  NOW()
),

-- ===== WEATHER APP =====
(
  'my-first-api-integration-weather-app-shecodes',
  'My First API Integration: Building a Weather App with SheCodes That Changed How I Think About Code',
  'The weather app was my first real API integration — 5 commits, vanilla JavaScript, OpenWeather API, and the moment I understood that code could talk to the world. Here''s what building it actually taught me.',
  '## The App That Started Everything

Every developer has a project that shifted something. Not the most complex one. Not the most impressive. The one where the code first felt *alive*.

For me, it was a weather app.

---

## What SheCodes Taught Me

I built this during SheCodes Plus — a structured coding programme that teaches front-end development with real-world projects. The weather app was the capstone: take an external API, consume it, display live data, handle errors.

Five commits. Three files. One OpenWeather API key.

It sounds trivial now. At the time, it was revelatory.

---

## The Technical Reality

The stack is genuinely minimal:

- **HTML5**: Semantic markup, ARIA labels, accessible structure
- **CSS3**: Responsive layout, a bit of animation for the loading state
- **Vanilla JavaScript**: The whole application logic
- **OpenWeather API**: Current conditions + 5-day forecast

```js
// The function that changed everything
async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);
  const data = await response.json();
  displayWeather(data);
}
```

That `fetch`. That `await`. That `data`. The moment I understood that my code could reach outside itself, ask the internet a question, and get an answer — that was the moment I knew this was what I was going to do with my life.

---

## What It Actually Taught Me

**Error handling is not optional.** OpenWeather returns a 404 for cities it doesn''t recognise. My first version crashed with an ugly JavaScript error. Learning to handle that gracefully — a friendly "city not found" message instead of a broken UI — was my first lesson in defensive programming.

**APIs have opinions.** The OpenWeather response has temperature in Kelvin by default. I had to specify `units=metric` to get Celsius. The API doesn''t know I''m South African. It doesn''t know what makes sense for my users. That''s my job to specify.

**Design is a technical decision.** The difference between a weather app that shows "22°C" and one that shows it alongside a sun icon, a humidity reading, and a 5-day forecast — that''s not decoration. That''s the user experience. Learning to think about what data to surface, and how, was as important as learning to fetch it.

---

## From Weather App to AI Engineer

Five commits. Three files. One API.

K53 Drill Master: Supabase, PayFast, OpenAI, React, Vite, six drill modes, 400+ questions, freemium subscription.
Campus Compass: NSFAS integration, GPT-4o-mini mental health AI, offline PWA, six feature modules.
CreativelyNanda.co.za: Full-stack with shop, poetry, blog, AI assistant, admin panel.

The distance between those five commits and where I am now is one continuous line. Every API I''ve integrated since — OpenAI, Supabase, PayFast, Mapbox, Resend — is the same fundamental idea as that first `fetch` call. Ask the internet a question. Handle the answer. Show it to the user.

The weather app is still live. I keep it that way deliberately. It''s a reminder that every developer who has ever shipped anything impressive had a first project that looked exactly like this.

---

*Built by Nandawula Regine Kabali-Kagwa as part of SheCodes Plus*
*Tech: Vanilla JavaScript, HTML5, CSS3, OpenWeather API, Vercel*
*Live: [my-weather-app-rho-lyart.vercel.app](https://my-weather-app-rho-lyart.vercel.app/)*',
  'dev',
  ARRAY['JavaScript', 'API Integration', 'SheCodes', 'Learning to Code', 'OpenWeather', 'Beginner', 'South Africa'],
  7,
  true,
  false,
  NOW()
)

ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  content = EXCLUDED.content,
  tags = EXCLUDED.tags,
  reading_time = EXCLUDED.reading_time,
  is_published = EXCLUDED.is_published,
  is_featured = EXCLUDED.is_featured,
  updated_at = NOW();
