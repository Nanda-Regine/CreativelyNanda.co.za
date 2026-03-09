-- Migration 022: Add 'notion' as a valid blog post category
-- Run in Supabase SQL Editor

-- Step 1: Drop the existing check constraint
ALTER TABLE blog_posts DROP CONSTRAINT IF EXISTS blog_posts_category_check;

-- Step 2: Add new constraint that includes 'notion'
ALTER TABLE blog_posts
  ADD CONSTRAINT blog_posts_category_check
  CHECK (category IN ('dev', 'writing', 'business', 'notion'));

-- Step 3: Re-insert the 6 Mirembe Muse template blog posts (they failed in 021)

INSERT INTO blog_posts (
  slug, title, excerpt, content, category, tags, reading_time, is_published, is_featured, published_at
) VALUES

-- ===== POST 1: WRITERS' SANCTUARY =====
(
  'writers-sanctuary-notion-template',
  'Your Writing Deserves a Sanctuary, Not a Spreadsheet',
  'Your story is alive inside you — tangled across 47 notes apps, three notebooks, and a voice memo you''ve never listened back to. The Writers'' Sanctuary Notion template is the organised, beautiful home your writing has always deserved. One system. Every word. R299.',
  '## The Story You''re Meant to Tell is Stuck in 47 Scattered Notes

You are a writer. You know this with a certainty that lives in your chest, not your head.

You also know the other thing — the chaos. The manuscript draft in Google Docs. The character notes in the Notes app. The plot outline on a napkin you may or may not still have. The research links in seventeen different browser tabs. The "brilliant idea" voice memo from 2am that you''ve never actually listened back to.

You are a storyteller drowning in the very material of your craft. And it is costing you the story.

This ends now.

---

## What Writers Actually Need (And Never Get)

The productivity world loves to sell writers bullet journals, vision boards, and "just write every day" advice. None of it addresses the real problem: **creative chaos without infrastructure kills creative momentum**.

When you can''t find your chapter three outline, you don''t write chapter three. When you can''t remember whether your protagonist''s eyes are grey or green in chapter one, you stop to search, lose the thread, and close the laptop. When your submission tracker lives in your head, you miss the deadline.

Organisation isn''t the enemy of creativity. Disorganisation is.

The **Writers'' Sanctuary** Notion template was built by a writer who understands this. Not a productivity influencer. A writer. Someone who knows the difference between a system that helps you write and a system that makes you feel like you''re writing while you''re actually just rearranging sticky notes.

---

## What''s Inside the Writers'' Sanctuary

### Manuscript Tracker
Every chapter. Every scene. Every draft. Track word counts, completion status, revision notes, and feedback — all in one view. See your entire manuscript at a glance without opening a single document.

### Character Bible
Your characters deserve a home as rich as they are. Name, age, physical description, backstory, motivations, relationships, contradictions, arc trajectory — everything a living character needs. Never again write "what colour were her eyes?" in the margin.

### Plot Architecture Board
Outline your story at the structural level — act breaks, turning points, subplots, timeline, cause and effect chains. Whether you''re a plotter, a pantser, or a plantser, this board adapts to how your mind actually works.

### Daily Word Count Dashboard
Set your daily target. Log your actual count. Watch the streak build. See your monthly progress at a glance. Accountability without shame — just honest data about your output.

### Submission Tracker
For the writers who send their work into the world: literary journals, agents, publishers, competitions. Track where you''ve submitted, the response deadline, the status, the feedback received. No more missed windows. No more duplicate submissions.

### Research Vault
The book you read. The article that changed a scene. The historical detail you need to get right. The interview transcript. All tagged, searchable, connected to the chapter or character it serves.

### Mood Board Space
Aesthetic references. Character inspirations. Setting photographs. The song that sounds like your protagonist. The colour palette of your fictional world. Creativity needs atmosphere — your workspace should hold it.

---

## The Transformation

Before the Writers'' Sanctuary, your writing session starts with twenty minutes of searching for where you left off.

After it, you open one page. Everything is there. You write.

That''s not a small thing. That''s the difference between the book that exists and the book that doesn''t.

The writers who finish their novels aren''t the ones with the most talent. They''re the ones with the most infrastructure. They''re the ones who treated their creative work as the serious, worthy, worthy endeavour it is — and gave it a system to match.

---

## Who This Is For

- Fiction writers working on a novel, novella, or short story collection
- Poets building a manuscript for submission
- Screenwriters juggling multiple projects and pitches
- Bloggers and content writers managing their content pipeline
- Any creative who has ever said "I just need to get organised" and meant it

---

## What You Get

One Notion template. Immediate access. Duplicate into your Notion workspace in 30 seconds. Works on desktop and mobile. No Notion subscription required beyond the free tier.

**Price: R299** — that''s less than one writing workshop, one course module, one manuscript assessment. This is the system that makes all of those investments work.

---

Your story is waiting. Give it the home it deserves.

[Get the Writers'' Sanctuary — R299](/products/writers-sanctuary)',
  'notion',
  ARRAY['Notion template', 'writing productivity', 'Notion for writers', 'creative writing planner', 'novel writing system', 'South Africa', 'manuscript tracker', 'Mirembe Muse']::text[],
  7,
  true,
  true,
  NOW()
),

-- ===== POST 2: CREATORS' STUDIO =====
(
  'creators-studio-notion-template',
  'Stop Winging Your Content. The Notion Studio Every Creator Needs.',
  'You''re not lazy — you''re building without blueprints. The Creators'' Studio Notion template gives content creators a complete operating system: content calendar, video pipeline, analytics tracker, income tracker, and an idea vault that never goes stale. R399.',
  '## You''re Not Lazy. You''re Just Building Without Blueprints.

You post consistently for three weeks, then disappear for two. You have brilliant ideas at 11pm and forget them by morning. You know you need a content calendar but every template you''ve tried is either too complicated to maintain or too simple to be useful. Your analytics are scattered across YouTube Studio, Instagram Insights, and a spreadsheet you haven''t opened since March.

You work harder than anyone knows. And yet the content machine keeps stalling.

Here''s what nobody tells you: **content creation is a profession**. The creators you admire — the ones with consistent output, growing audiences, and income streams that don''t feel like accidents — they''re not more talented than you. They''re more organised than you. They treat content creation like a business because it is one.

It''s time you did the same.

---

## The Chaos That''s Costing You

Every week you don''t post is a week the algorithm forgets you. Every idea you don''t capture is content that someone else will make. Every brand partnership you chase without a media kit is money you leave on the table. Every month you end without knowing your actual income is a month you can''t plan for the next one.

This isn''t a creativity problem. It''s a systems problem.

The **Creators'' Studio** Notion template was built to solve exactly this. It''s the operating system your content business has been missing — designed for the full-time creator, the side-hustle creator, the aspiring creator who is absolutely serious about making this real.

---

## What''s Inside the Creators'' Studio

### Content Calendar
A visual, flexible calendar where every piece of content lives from idea to published. See your week, your month, your quarter at a glance. Colour-coded by platform, status, and content type. No more wondering what you''re posting this Thursday.

### Video Production Pipeline
From concept to upload: idea capture, script drafting, filming notes, editing checklist, thumbnail creation, caption writing, scheduling, and performance review — all in one connected workflow. YouTube, TikTok, Instagram Reels — this pipeline handles all of them.

### Brand Asset Library
Your logo files. Your brand colours. Your fonts. Your bio variations (long, medium, short). Your headshots. Your brand guidelines. Everything a collaborator, a sponsor, or a freelancer needs — findable in thirty seconds instead of thirty minutes.

### Analytics Tracker
Pull your numbers weekly and log them here: views, watch time, follower growth, engagement rate, click-through rate, revenue per video. Over time, you''ll start to see patterns no algorithm dashboard will show you — because you''ll be comparing across platforms in one place.

### Collaboration Hub
Track every brand deal, sponsored post, gifting arrangement, and partnership conversation. Status, deliverables, deadlines, contact details, payment terms. Never let a collab fall through the cracks because it was buried in your DMs.

### Idea Vault
Your brain doesn''t run on a posting schedule. The Idea Vault captures everything — voice memo transcripts, shower thoughts, trending audio inspiration, comments from your audience that sparked something — and tags it so you can find it when you need it.

### Income Tracker
AdSense, brand deals, merchandise, courses, affiliate links — every income stream in one dashboard. Month by month. Year over year. This is how you turn "I think I made some money this month" into actual financial clarity.

---

## Content Creation is a Career. Treat It Like One.

The most successful creators in the world are not the most naturally talented. They are the most consistent, the most intentional, and the most organised. The creator you want to be has infrastructure you haven''t built yet.

The Creators'' Studio is that infrastructure — scaled to one person, priced for a creator who is still building, designed to grow with you.

---

## Who This Is For

- YouTube creators managing long-form video production
- Podcasters juggling episode planning, guest outreach, and sponsorships
- Instagram and TikTok creators who want to post with intention, not desperation
- Multi-platform creators tired of context-switching between seventeen different tools
- Anyone who has said "I need to treat my content like a business" and means it

---

## What You Get

One Notion template. Immediate access. Duplicate into your workspace and start using it today. Mobile-friendly. Works on Notion''s free tier.

**Price: R399** — one month of inconsistent posting costs you more than this in lost brand deal potential.

---

Your content deserves a studio. Build one.

[Get the Creators'' Studio — R399](/products/creators-studio)',
  'notion',
  ARRAY['Notion template content creator', 'content calendar Notion South Africa', 'YouTube creator system', 'social media planner Notion', 'content creator tools', 'Mirembe Muse', 'content business', 'creator economy South Africa']::text[],
  7,
  true,
  true,
  NOW()
),

-- ===== POST 3: MUSIC ARTIST CAREER COMMAND CENTER =====
(
  'music-artist-career-command-center-notion-template',
  'Your Music is the Art. This is the Business. The Notion Command Center Every Artist Needs.',
  'You have the talent. You''re missing the infrastructure. The Music Artist Career Command Center gives independent artists a complete business system — release planner, royalty tracker, gig manager, press kit, financial dashboard, and more. R499.',
  '## You Have the Talent. You''re Missing the Infrastructure.

You can write a hook that stops people mid-scroll. You can perform a room into silence and then into noise. You have something real — something that connects, that moves, that stays with people after the song ends.

And yet your career is not matching your talent.

Not because the talent isn''t enough. Because talent without infrastructure is a fire without oxygen. It burns bright in moments and then it struggles. Gigs get forgotten because you didn''t track the follow-up. Royalty payments arrive and you don''t know if the amount is right. Press opportunities pass because your bio isn''t ready. Collaborations fall apart in DMs because there was no system to hold them together.

This is not a music problem. This is a business problem. And every business problem has a systems solution.

---

## What''s Inside the Command Center

### Release Planner
Every single, EP, and album deserves a proper launch. The release planner walks you through every phase: production timeline, mixing and mastering deadlines, distributor submission, pre-save campaign, press outreach window, release day checklist, and post-release promotion schedule.

### Gig Tracker
Every performance — confirmed, pending, and past — lives here. Venue, date, set list, sound check requirements, payment terms, contact details, travel logistics, and post-show notes.

### Royalty Tracker
DistroKid, SAMRO, CD Baby, Spotify for Artists, YouTube Music — your royalties come from everywhere. Log every royalty payment, every platform, every song, every period. Know which songs earn the most and whether you''re being paid correctly.

### Press Kit Manager
Your bio (full and short). Your official photos. Your past press coverage. Your quote sheet. Your social links. Your streaming links. Your EPK PDF. All in one place, always current.

### Network Database
The producer who said "let''s work" six months ago. The booker who liked your last post. The journalist who covered your city''s music scene. Relationships are your most valuable industry asset. Treat them like data.

### Financial Dashboard
Income and expenses. Month by month. Category by category. Show fees, streaming revenue, royalties, merchandise, sync deals — in. Studio costs, equipment, travel, marketing — out. Knowing your numbers is not optional when your career is your business.

---

## Who This Is For

- Independent artists at any stage — from first single to tenth project
- Musicians managing their own bookings, releases, and press
- Artists who are tired of losing opportunities because they weren''t organised enough to seize them
- Anyone serious about building a music career that lasts, not just a moment that trends

---

## What You Get

One Notion template. Immediate access. Works on Notion''s free tier. Designed for solo artists and small teams.

**Price: R499** — one missed gig, one unclaimed royalty, one lost press opportunity costs you more than this.

---

The music is yours. The career is yours to build.

[Get the Music Artist Career Command Center — R499](/products/music-artist-career-command-center)',
  'notion',
  ARRAY['Notion template musician South Africa', 'music career management system', 'music business Notion', 'artist management dashboard', 'independent artist tools', 'Mirembe Muse', 'music career South Africa', 'royalty tracker']::text[],
  8,
  true,
  true,
  NOW()
),

-- ===== POST 4: HIGH SCHOOL ACADEMIC EXCELLENCE =====
(
  'high-school-academic-excellence-notion-template',
  'The Matric Study System No One Gave You (Until Now)',
  'You''re not failing because you''re not trying. You''re struggling because no one gave you a system. The High School Academic Excellence Notion template is the matric study planner South African learners actually need — NSC-aligned, NSFAS-ready, and built for the South African classroom. R249.',
  '## You''re Not Failing Because You''re Not Trying

Let''s be honest about something the education system rarely admits: the learners who ace matric aren''t smarter than the ones who don''t. They are more organised. They have systems — whether they built them themselves, inherited them from older siblings, or were taught them at schools with the resources to teach study skills alongside content.

Most South African learners were never taught how to study. They were taught what to study. There''s a devastating gap between those two things.

If you''ve ever sat down to study and not known where to start — you weren''t being lazy. You were missing infrastructure.

This is that infrastructure.

---

## What''s Inside the High School Academic Excellence Template

### Subject Tracker — NSC-Aligned
Seven subjects. Each with its own space: topics covered, topics outstanding, key concepts, past paper marks, teacher contact, and textbook reference. Built around the National Senior Certificate framework.

### Exam Countdown Dashboard
How many days until your next paper? Which papers fall on the same week? Where are the gaps you can use for revision? The exam countdown gives you a complete picture of your exam season before it arrives.

### Daily Study Planner
A structured daily planner with time blocks, subject rotation, and a simple reflection section. What did you cover? What do you still not understand? What do you need to ask your teacher tomorrow? This is how knowledge actually sticks.

### Assignment Tracker
Subject. Task. Due date. Completion status. Marks received. Every assignment, test, and project in one place. No more "I forgot that was due today." No more lost marks because the deadline snuck up.

### NSFAS and Bursary Application Tracker
You cannot afford to miss a bursary deadline. The NSFAS/Bursary Tracker logs every opportunity: organisation, closing date, documents required, submission status, outcome. This is your financial future. Track it like your results depend on it — because they do.

---

## Who This Is For

- Grade 10, 11, and 12 learners preparing for NSC examinations
- Learners who want to qualify for university and need to track their progress
- Students applying for NSFAS, bursaries, or merit scholarships
- Any matric learner who has ever said "I need to get organised" and meant it

---

## What You Get

One Notion template. Immediate access. Works on Notion''s free tier. Designed specifically for the South African NSC curriculum.

**Price: R249** — less than one extra lesson with a private tutor. More useful than most of them.

---

You have everything you need to pass. Now you have the system to prove it.

[Get the High School Academic Excellence Template — R249](/products/high-school-academic-excellence)',
  'notion',
  ARRAY['matric study planner South Africa', 'Notion template for matric students', 'high school study system', 'NSC exam preparation Notion', 'matric 2026', 'NSFAS tracker', 'Mirembe Muse', 'South Africa education']::text[],
  7,
  true,
  false,
  NOW()
),

-- ===== POST 5: VARSITY ACADEMIC EXCELLENCE =====
(
  'varsity-academic-excellence-notion-template',
  'University Feels Like Drowning. This Notion System is Your Lifeline.',
  'High school had structure. University has freedom — and it''s terrifying. The Varsity Academic Excellence Notion template is the complete university survival system built for South African students: NSFAS tracker, module planner, assignment manager, GPA calculator, and more. R279.',
  '## High School Had Structure. University Has Freedom — And It''s Terrifying.

In matric, someone told you where to be and when. Your timetable was given to you. Your teachers followed up when you missed class.

Then you arrived at university.

Suddenly you have eight modules and a timetable you built yourself. Lectures you can technically skip without anyone chasing you. Assignments with deadlines buried in a Moodle notification you may or may not have seen. A financial aid portal that crashes on deadline day.

South Africa''s university dropout rate is over 50%. That number is not a reflection of intelligence. It is a reflection of what happens when capable people are thrown into an unstructured environment without the tools to create their own structure.

This template exists to fight that number.

---

## What''s Inside the Varsity Academic Excellence Template

### Module Planner
Every module. Every week. Topics covered, topics outstanding, lecturer contact, assignment weighting, tutorial schedule, and your running grade estimate.

### Assignment and Test Tracker
Every piece of assessable work in one place: module, type, due date, weighting, submission status, marks received. Colour-coded by urgency.

### NSFAS and Bursary Tracker
Track your NSFAS allowance types, payment dates, amounts received, and outstanding queries. Log every bursary opportunity — closing date, documents required, submission method, outcome. Your financial aid is the foundation your degree rests on. Treat it accordingly.

### GPA Calculator
Know where you stand at all times. Input your module marks, their credit weightings, and see your GPA in real time. No more end-of-semester surprises.

### Internship and Job Application Tracker
Start tracking internship applications from second year: company, role, closing date, application status, interview dates, outcome, feedback. By the time you graduate, you''ll have a clear record of your professional development journey.

---

## Who This Is For

- First-year students entering university and wanting to start right
- Students who have struggled in previous semesters and are ready to change approach
- NSFAS-funded students who need to track their financial aid carefully
- Any South African university student who wants to graduate on time

---

## What You Get

One Notion template. Immediate access. Works on Notion''s free tier. Built for South African semester structure and the NSFAS/bursary landscape.

**Price: R279** — less than one academic support consultation. More comprehensive than most of them.

---

You came to university to build something. Build it with a system.

[Get the Varsity Academic Excellence Template — R279](/products/varsity-academic-excellence)',
  'notion',
  ARRAY['Notion template university students South Africa', 'varsity study system', 'NSFAS tracker Notion', 'university productivity South Africa', 'GPA calculator Notion', 'Mirembe Muse', 'South Africa varsity', 'university dropout South Africa']::text[],
  7,
  true,
  false,
  NOW()
),

-- ===== POST 6: SME COMMAND CENTER =====
(
  'sme-command-center-notion-template',
  'Running a Business in South Africa is Hard. Losing Track of It Doesn''t Have to Be.',
  'You started a business to be free. Instead you''re buried in WhatsApp messages, unpaid invoices, and a to-do list that never ends. The SME Command Center Notion template is the complete operating system for South African small businesses — CRM, invoicing, project management, financials, and more. R449.',
  '## You Started a Business to Be Free. Look at You Now.

You had a vision. A skill. A gap in the market. The courage — and it does take courage — to say "I''m going to build something of my own."

And you did build it. It exists. But the chaos around it is swallowing you alive.

WhatsApp messages with client instructions buried under memes from the family group. An invoice you sent last month that you''re not sure was paid. A project that''s three weeks behind because you didn''t catch the early warning signs.

You didn''t start a business to become a full-time administrator. But here you are.

**90% of South African small businesses fail within the first year.** That number gets repeated so often it stops landing. So let''s say it differently: nine out of ten businesses started this year by people with genuine skills, real passion, and legitimate market opportunity will not exist in twelve months.

The cause is rarely the product or service. It is, overwhelmingly, an operational one. Cash flow not tracked until it''s critical. Client relationships not managed until they''re damaged. Invoices not followed up until the relationship is too awkward to chase.

The businesses that survive have systems. This is the system.

---

## What''s Inside the SME Command Center

### CRM — Client Relationship Database
Every client. Contact details, industry, relationship status, last interaction, current projects, notes from every conversation, referral source, and revenue generated.

### Invoice Tracker
Issued, outstanding, overdue, paid. Every invoice. Every client. Every amount. Cash flow problems in South African small businesses are often not revenue problems — they are collection problems. This tracker is how you fix that.

### Project Management Board
Every project has phases, tasks, deadlines, and accountable people. The board gives you a real-time view of what''s on track, what''s at risk, and what needs your attention today.

### Financial Dashboard
Income. Expenses. Profit. Month by month, category by category. Revenue streams separated. Operational costs visible. Tax obligations tracked. This is the instrument panel of your business.

### SOP Library — Standard Operating Procedures
How do you onboard a new client? How do you handle a late payment? How do you quality-check work before delivery? If the answer lives only in your head, your business is one sick day away from operational chaos.

### Supplier Database
Every supplier. Contact, pricing, payment terms, lead times, quality notes, and alternative options. When your primary supplier fails you, you should not be scrambling.

---

## Who This Is For

- Freelancers and solopreneurs managing multiple clients
- Small business owners with a team of 1–10 people
- Service-based businesses: consultants, creatives, trades, coaches, agencies
- Any South African entrepreneur who has ever said "I need to get this business organised"

---

## What You Get

One Notion template. Immediate access. Works on Notion''s free tier for individuals and small teams. Designed for the South African business context — ZAR-first, relationship-first, survival-aware.

**Price: R449** — less than one month''s worth of missed invoices. Less than one lost client relationship.

---

Your business deserves to survive. Give it the infrastructure to do it.

[Get the SME Command Center — R449](/products/sme-command-center)',
  'notion',
  ARRAY['Notion template small business South Africa', 'SME management system', 'business operations Notion', 'small business productivity South Africa', 'CRM Notion template', 'Mirembe Muse', 'South Africa SME', 'invoice tracker Notion', 'South Africa small business']::text[],
  8,
  true,
  true,
  NOW()
)

ON CONFLICT (slug) DO NOTHING;
