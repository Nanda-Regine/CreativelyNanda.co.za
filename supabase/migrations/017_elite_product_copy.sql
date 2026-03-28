-- Migration 017: Elite product descriptions, features, and FAQs
-- Rewritten based on full operations manual content for all 6 products

-- ─────────────────────────────────────────────
-- WRITER'S SANCTUARY
-- ─────────────────────────────────────────────
UPDATE products SET
  description = 'Most writers have the talent. What they don''t have is the system. Ideas scatter across notebooks, phone notes, and stray documents. Submissions get missed. Projects stall because there''s no structure holding the work together. The Writer''s Sanctuary is the system that holds it all.

Built by a published African poet who has lived every part of this creative life — the long projects, the scattered ideas, the submission grind, the quiet daily practice — this workspace organises your entire writing life into six interconnected databases that talk to each other.

Your Writing Projects database tracks every piece from first idea to final submission, with word count goals, publication targets, and status at a glance. Your Writing Sessions log builds a real training record — every session with mood, momentum, and word count — so you can see your patterns and build on them. The Idea Vault captures every fragment, image, and concept before it disappears, with a status system that takes ideas from raw spark to developed pitch. The Submission Tracker manages your full publishing pipeline — literary journals, competitions, agents, anthologies — with response timelines, follow-up triggers, and rights management built in. Your Reading List connects what you read to what you write. And Writing Habits gives you the practice infrastructure that makes the work sustainable week after week.

This is built for the African literary context. SA and African publishing houses, competitions open to African writers, self-publishing pathways for the continent. A one-line pitch formula. Rejection recovery protocol. Quarterly and annual audits of your output and submissions. This is the system that turns a scattered writing life into a serious creative career.',
  features = '[
    {"title": "Writing Projects — From Spark to Publication", "description": "Track every piece of writing across its full lifecycle — concept, drafting, editing, submission, and publication. Word count goals, deadline tracking, publication targets, and rights status in one view. Nothing falls between the cracks again.", "icon": "book-open"},
    {"title": "Writing Sessions Log — Your Creative Training Record", "description": "Every session logged with word count, duration, mood rating, and momentum notes. Over time this builds a data picture of your creative patterns — when you write best, what conditions produce your best work, and how your practice is growing.", "icon": "pen-tool"},
    {"title": "Idea Vault — A Creative Reservoir That Never Leaks", "description": "A structured capture system for every idea, image, fragment, and observation. Organised by genre, theme, and development status — from raw spark to developed pitch ready for the submission pipeline. Built so capture takes seconds.", "icon": "lightbulb"},
    {"title": "Submission Tracker — Your Full Publishing Pipeline", "description": "End-to-end management of your submission life. Every journal, competition, agent, and anthology submission tracked with deadlines, response timelines, follow-up triggers, and outcome records. Includes rights management and a rejection recovery protocol.", "icon": "send"},
    {"title": "Reading List & Research — Connect What You Read to What You Write", "description": "A literary education database that links every book, essay, and research source directly to your active writing projects. Craft insights captured where they can actually improve your work — not lost in a separate reading app.", "icon": "library"},
    {"title": "Writing Habits — Practice Infrastructure That Sustains the Work", "description": "Weekly habit tracking anchored by craft intentions and creative affirmations. Streak tracking, session goals, and a quarterly audit of your writing output and submission pipeline. The system that turns one good writing week into a consistent creative practice.", "icon": "zap"}
  ]'::jsonb,
  faqs = '[
    {"question": "Do I need a Notion account?", "answer": "Yes — a free Notion account is all you need. Notion is free for personal use, works across all devices, and takes about five minutes to set up if you don''t have one yet."},
    {"question": "How do I access the template after purchase?", "answer": "Immediately after payment you''ll receive two things by email: the Quick-Start PDF guide (which walks you through the system step by step) and a direct link to duplicate the Notion template into your own workspace. No waiting, no approval process."},
    {"question": "I''m a beginner — will this be too complicated?", "answer": "The Quick-Start guide walks you through every database, field, and workflow. The template comes pre-configured with example entries so you can see exactly how it works before you enter your own data. If you can use Google Docs, you can use this."},
    {"question": "Is this built for fiction writers, or poets, or journalists?", "answer": "All of them. The system is designed for any serious writer — novelists, short story writers, poets, essayists, and content writers. The databases are flexible enough to hold any type of creative or professional writing project."},
    {"question": "Is this a one-time purchase?", "answer": "Yes. One payment, lifetime access. All future updates to the template are included at no extra charge."},
    {"question": "What if it doesn''t work for me?", "answer": "30-day satisfaction guarantee. If the system isn''t working for your creative practice, email hello@creativelynanda.co.za and we''ll sort it out."}
  ]'::jsonb,
  updated_at = NOW()
WHERE slug = 'writers-sanctuary';


-- ─────────────────────────────────────────────
-- CREATOR'S STUDIO
-- ─────────────────────────────────────────────
UPDATE products SET
  description = 'Most content creators are working harder than any business owner they know — and running their creative work like a hobby. No financial records. No brand deal system. Content ideas scattered across voice notes and DMs. Analytics checked once in a while when something goes viral. The Creator''s Studio changes all of that.

This is a complete business operating system for content creators, digital creatives, and personal brands who are building something real. Six interconnected databases manage your entire content operation: from first idea to published post, from initial brand inquiry to payment received and post-campaign report submitted.

The Content Projects database is your live content calendar — every piece in production across every platform, with status, caption drafts, asset links, and publishing schedule. The Content Batch Tracker is your production command center — filming logs, editing queues, asset checklists, and output records for every batch day. Brand Partnerships tracks every deal through its full lifecycle — inbound pitches, rate card management, contract status, deliverable deadlines, payment tracking, and post-campaign reporting. The Analytics Tracker gives you monthly performance records across platforms so your content decisions are based on data, not feelings. The Idea Bank is a creative reservoir for every concept, hook, series idea, and trend observation you''ve ever had. And Creative Habits provides the daily and weekly practice infrastructure that keeps your output consistent and your creative energy sustainable.

Built specifically for Africa''s creator economy — with content pillar frameworks, hook-writing systems, brand deal negotiation protocols, South African tax compliance guidance, and monthly business review checklists. Because building a content business in Africa requires infrastructure that understands the market you''re actually operating in.',
  features = '[
    {"title": "Content Projects Calendar — Every Piece, Every Platform", "description": "Your live content command center. Every piece from concept to published, across Instagram, TikTok, YouTube, LinkedIn, and beyond — with status, caption drafts, linked assets, publishing dates, and performance notes. Never wonder what you''re supposed to be posting again.", "icon": "layout"},
    {"title": "Brand Partnerships — Full Deal Lifecycle Management", "description": "From first inquiry to final payment. Rate card management, contract status tracking, deliverable deadlines, revision rounds, payment follow-ups, and post-campaign reporting — all in one system. Built so no deal detail ever falls through the cracks.", "icon": "briefcase"},
    {"title": "Content Batch Tracker — Your Production Command Center", "description": "Plan and log every batch day with filming checklists, editing queues, asset completion tracking, and output records. Build a production history that helps you plan smarter batches and cut your content production time every month.", "icon": "film"},
    {"title": "Idea Bank — Never Lose a Content Idea Again", "description": "A creative reservoir for every concept, hook, series idea, trend observation, and content angle you encounter. Developed into full briefs when it''s time to produce. Your Idea Bank becomes the strategic resource that fuels your entire content pipeline.", "icon": "lightbulb"},
    {"title": "Analytics Tracker — Data That Actually Changes Your Strategy", "description": "Monthly performance records across every platform you''re active on. Track reach, engagement, follower growth, and top-performing content over time. Stop making content decisions based on gut feel and start building a strategy grounded in your actual data.", "icon": "bar-chart"},
    {"title": "Creative Habits — Sustainable Output Infrastructure", "description": "Daily and weekly habit tracking for the creative practices that keep your business running: content planning sessions, engagement blocks, skill development, and creative recovery. Built with a monthly business review template that keeps you growing quarter on quarter.", "icon": "zap"}
  ]'::jsonb,
  faqs = '[
    {"question": "Do I need a Notion account?", "answer": "Yes — a free Notion account is all you need. Free for personal use, works on all devices, and takes minutes to set up."},
    {"question": "How do I access the template after purchase?", "answer": "Immediately after payment you''ll receive the Quick-Start PDF guide and a direct link to duplicate the Notion template into your workspace. Instant access — no waiting."},
    {"question": "I''m a one-person creator. Is this too complex for me?", "answer": "It''s built for exactly that. The six databases are designed to replace the chaos of running a one-person content business — not to add to it. The Quick-Start guide walks you through setup in under an hour, and you only activate the databases you need right now."},
    {"question": "Does this work for creators on any platform?", "answer": "Yes. The Content Projects database is built for every platform — Instagram, TikTok, YouTube, LinkedIn, podcasts, and newsletters. You customise the platform tags to match where you''re actually creating."},
    {"question": "Is this a one-time purchase?", "answer": "One payment, lifetime access. All future updates included at no extra charge."},
    {"question": "What if it doesn''t work for my creative business?", "answer": "30-day satisfaction guarantee. Email hello@creativelynanda.co.za and we''ll make it right."}
  ]'::jsonb,
  updated_at = NOW()
WHERE slug = 'creators-studio';


-- ─────────────────────────────────────────────
-- MUSIC ARTIST CAREER COMMAND CENTER
-- ─────────────────────────────────────────────
UPDATE products SET
  description = 'Every other music business template gives you an empty framework and expects you to fill it in yourself. The Music Artist Career Command Center is different. It comes pre-loaded with ten databases of South African and African music industry intelligence — the competitive knowledge that most independent artists spend years accumulating on their own, often without ever completing the picture.

What''s pre-loaded and ready to use: 20 South African radio stations with submission contacts, format specifications, and playlist information. 20 SA and pan-African music press outlets and blogs with editorial context and pitching angles. 18 South African music festivals with booking contacts and application deadlines. SA music industry companies — labels, distributors, publishers, and collecting societies — with contact details and deal structure context. 18 target playlists across Spotify, Apple Music, and YouTube for pitching your releases. South African and pan-African music grants and funding opportunities with amounts, eligibility criteria, and application windows. DSP technical specifications and royalty rate structures for every major streaming platform. Professional audio delivery standards for international release quality. SA music venues with capacity ranges and performance fee structures. And a month-by-month SA music industry calendar that maps release windows, award nomination cycles, festival application seasons, and grant submission deadlines throughout the year.

On top of the pre-loaded intelligence: a complete release timeline framework from mastering to launch, SAMRO registration guidance, grant application strategy, streaming playlist pitching workflow, press outreach templates, and a tour planning system. Ten databases. Real industry data. Built for the market you are actually trying to break into — not a generic music industry template built for the American market.',
  features = '[
    {"title": "10 Pre-Loaded Industry Databases", "description": "Unlike any other music template, this system ships with real South African music industry data already inside. 10 interconnected databases filled with contacts, deadlines, specs, and intelligence — so you can start using the system immediately, not after months of research.", "icon": "database"},
    {"title": "SA Radio & Press — 40 Pre-Loaded Contacts", "description": "20 South African radio stations with submission contacts, format specs, and playlist information. 20 SA and pan-African music press outlets and blogs with editorial context. The relationship infrastructure most independent artists never fully build.", "icon": "radio"},
    {"title": "Grants & Funding — Pre-Loaded Opportunities", "description": "South African and pan-African music funding opportunities with eligibility criteria, amounts, application windows, and deadlines already entered. Know what''s available, when to apply, and what you need to qualify — before the window closes.", "icon": "dollar-sign"},
    {"title": "Festivals, Venues & Industry Calendar", "description": "18 SA music festivals with booking contacts and application deadlines. SA music venues with capacity and fee ranges. A month-by-month industry calendar that maps release windows, award cycles, festival seasons, and grant periods across the full year.", "icon": "calendar"},
    {"title": "Streaming & Distribution Intelligence", "description": "18 target playlists across Spotify, Apple Music, and YouTube for pitching your releases. DSP technical specifications and royalty rate structures for every major platform. Professional audio delivery standards for international release quality. Everything you need to release professionally.", "icon": "play-circle"},
    {"title": "Release Timeline & Career Management", "description": "A complete release timeline framework from mastering to launch. SAMRO registration guidance. Grant application strategy. Press outreach workflow. Tour planning system. The full career management infrastructure that turns music-making into music business.", "icon": "music"}
  ]'::jsonb,
  faqs = '[
    {"question": "Do I need a Notion account?", "answer": "Yes — a free Notion account is all you need. Free for personal use and works across all devices."},
    {"question": "How do I access the template after purchase?", "answer": "Immediately after payment you''ll receive the Quick-Start PDF guide and a direct link to duplicate the Notion template into your workspace. The pre-loaded data comes with the template — it''s all inside when you duplicate it."},
    {"question": "Is the pre-loaded data current?", "answer": "The data was researched and entered for the South African market as of early 2025. Industry contacts and deadlines change — the template gives you the structure and starting intelligence, and you update entries as you build your own relationships and verify current details."},
    {"question": "Is this only for South African artists?", "answer": "Primarily, yes — it''s built around the SA music industry context. But African artists across the continent will find the pan-African press contacts, streaming intelligence, and grant opportunities relevant. The system adapts to wherever you''re based."},
    {"question": "Is this a one-time purchase?", "answer": "One payment, lifetime access. All future updates included."},
    {"question": "What if it doesn''t work for my music career?", "answer": "30-day satisfaction guarantee. Email hello@creativelynanda.co.za and we''ll sort it out."}
  ]'::jsonb,
  updated_at = NOW()
WHERE slug = 'music-artist-career-command-center';


-- ─────────────────────────────────────────────
-- HIGH SCHOOL ACADEMIC EXCELLENCE ENGINE
-- ─────────────────────────────────────────────
UPDATE products SET
  description = 'Matric is not just an academic challenge. It''s a full-life pressure test — seven subjects, continuous assessments, trial exams, final exams, subject choices that shape your next decade, wellness demands, and the weight of everyone''s expectations landing on a seventeen-year-old. Most students face all of this with no system at all.

The High School Academic Excellence Engine is a structured academic management system built specifically for Grade 10–12 students navigating the South African CAPS curriculum. Seven interconnected databases cover every dimension of your academic year — not just the studying, but the planning, the monitoring, the mental health, and the strategy that separates students who perform from students who merely survive.

My Subjects gives you a full academic profile for each subject — current marks, target marks, teacher details, required study hours, and a realistic picture of where you stand and what it will take to reach your targets. Assignments & Tasks tracks your complete academic workload with priority logic across all seven subjects so nothing gets missed and nothing gets submitted late. Study Sessions builds a real training log — every session recorded with subject, duration, topics, and a honest assessment of productivity, so you can see your patterns and work with them. Exam Prep Tracker manages end-to-end exam preparation: past papers completed, topics mastered, weak areas identified and targeted, and exam day planning done properly. Term Goals & Progress sets strategic targets at the beginning of every term and tracks them weekly — so you make adjustments before results day, not after. Wellness Check-Ins gives your mental health and stress levels a proper place in the system, because managing your wellbeing is part of managing your academic performance. And the Weekly Detailed Schedule uses time-blocking to give every hour of your week a purpose — with room built in for the rest that makes study effective.',
  features = '[
    {"title": "My Subjects — Your Academic Command Centre", "description": "A full academic profile for each of your subjects — current marks, target marks, teacher details, required weekly study hours, and realistic gap analysis. Know exactly where you stand in every subject and what it will take to close the gap before your next exam.", "icon": "book"},
    {"title": "Assignments & Tasks — Zero Missed Deadlines", "description": "Your complete academic workload in one place. Every assignment, test, project, and practical logged with due dates, marks, submission status, and priority tier across all seven subjects. The system that makes ''I forgot'' impossible.", "icon": "check-square"},
    {"title": "Exam Prep Tracker — Past Papers & Weak Area Targeting", "description": "Structured exam preparation built around the most effective matric study method: past papers. Track papers completed per subject, topics fully mastered, weak areas flagged for focused revision, and mark your exam day preparation done — not panicked.", "icon": "target"},
    {"title": "Study Sessions — Your Training Log", "description": "Every study session logged with subject, duration, topics covered, and an honest productivity rating. Over a term, this builds a real data picture of your study patterns — when you work best, which subjects take most energy, and how your preparation is actually progressing.", "icon": "clock"},
    {"title": "Wellness Check-Ins — Because Matric Pressure Is Real", "description": "A built-in mental health and stress tracking system that treats your wellbeing as part of your academic strategy. Weekly check-ins tracking stress levels, sleep quality, mood, and energy — so you can spot burnout early and make adjustments before it costs you marks.", "icon": "heart"},
    {"title": "Term Goals & Weekly Schedule", "description": "Strategic goal-setting at the start of every term with weekly progress checks that let you course-correct before results day. Paired with a time-blocking weekly schedule that gives every hour a purpose and builds sustainable study habits across the full academic year.", "icon": "trending-up"}
  ]'::jsonb,
  faqs = '[
    {"question": "Do I need a Notion account?", "answer": "Yes — a free Notion account is all you need. It''s free for personal use, works on phones and computers, and takes about five minutes to set up."},
    {"question": "How do I access the template after purchase?", "answer": "Immediately after payment you''ll receive the Quick-Start PDF guide and a direct link to duplicate the template into your Notion workspace. No waiting, no approval process."},
    {"question": "I''m in Grade 10 — is it too early to use this system?", "answer": "Grade 10 is actually the best time to start. The students who perform best in Matric are the ones who built their study systems early, not the ones who scrambled in Grade 12. Starting in Grade 10 gives you two full years to develop your habits before the pressure peaks."},
    {"question": "Does this work for all seven CAPS subjects?", "answer": "Yes. The system is subject-agnostic — you set up a profile for each of your subjects, and the databases work across all of them simultaneously. Whether you''re doing Physical Sciences or Dramatic Arts, the system adapts to your subject mix."},
    {"question": "Is this a one-time purchase?", "answer": "One payment, lifetime access. All future updates included at no extra charge."},
    {"question": "What if it doesn''t help my results?", "answer": "30-day satisfaction guarantee. If the system isn''t working for your academic life, email hello@creativelynanda.co.za and we''ll make it right."}
  ]'::jsonb,
  updated_at = NOW()
WHERE slug = 'high-school-academic-excellence';


-- ─────────────────────────────────────────────
-- VARSITY ACADEMIC EXCELLENCE ENGINE
-- ─────────────────────────────────────────────
UPDATE products SET
  description = 'University is not harder than high school because the work is harder. It''s harder because nobody is watching. No teacher following up on missed assignments. No parent enforcing study time. No structure telling you what to do and when. Just you, your module outline, and an exam date that feels far away until it doesn''t.

The Varsity Academic Excellence Engine is the self-management system for South African university students who understand that your degree result is determined by how well you run your full academic life — not just how hard you study in the week before exams.

Seven interconnected databases cover every dimension of university academic performance: My Subjects tracks every module with current marks, credit loads, difficulty ratings, and lecturer details — so you always have a clear picture of your full academic standing. Assignments & Tasks captures every assessment, deadline, submission portal, group work responsibility, and mark weight across all your modules simultaneously — nothing falls through the cracks. Study Sessions builds a complete revision history with subject, study method, duration, and productivity data — revealing your patterns and helping you allocate preparation time based on evidence, not instinct. Exam Prep Tracker manages systematic exam preparation — past papers completed, topics mastered, weak areas identified and targeted, and study time allocated to each module strategically. Term Goals & Progress aligns your academic, career, wellness, and personal goals to your quarterly rhythm with regular check-ins before results day. Wellness Check-Ins tracks sleep quality, stress levels, motivation, and overall wellbeing — because at university, performance and mental health are the same conversation. Detailed Weekly Schedule uses time-blocking to balance lectures, study, assignments, part-time work, and personal life sustainably.

Built for the reality of South African university life — managing multiple modules, financial pressure, part-time work, and the transition from the structured pace of high school to entirely self-directed study. Quarterly reviews and annual performance audits built into the system.',
  features = '[
    {"title": "My Subjects — Full Module Registry", "description": "Every module tracked with current marks, target marks, credit loads, difficulty ratings, lecturer details, and office hours. A real-time picture of your full academic standing across your entire degree — not just the modules you''re worried about.", "icon": "book"},
    {"title": "Assignments & Tasks — Multi-Module Deadline Management", "description": "Every assessment, deadline, submission portal, group work contribution, and mark weight across all your modules in one system. Priority logic that surfaces what actually needs your attention today — not everything at once.", "icon": "check-square"},
    {"title": "Exam Prep Tracker — Systematic, Not Desperate", "description": "Structured exam preparation built around evidence: past papers completed per module, topics you''ve mastered, weak areas identified and targeted, and study time allocated strategically based on mark weight and difficulty. The system that turns ''I think I''m ready'' into ''I know I''m ready''.", "icon": "target"},
    {"title": "Study Sessions — Revision History & Pattern Recognition", "description": "Every study session logged with module, method, duration, topics covered, and a productivity rating. Over a semester, this builds a data picture of when you study best, which methods work for which subjects, and how your preparation is actually progressing against your exam timeline.", "icon": "clock"},
    {"title": "Wellness Check-Ins — Performance Starts With Wellbeing", "description": "Weekly tracking of sleep quality, stress levels, motivation, social connection, and overall energy. Built into the academic system because university burnout is a performance issue as much as a health one — and catching it early changes outcomes.", "icon": "heart"},
    {"title": "Term Goals & Weekly Schedule", "description": "Goal-setting across academic, career, wellness, and personal dimensions aligned to your quarterly rhythm. Paired with time-blocking that builds a realistic weekly schedule accommodating lectures, study, part-time work, and recovery. Quarterly reviews and annual audits built in.", "icon": "trending-up"}
  ]'::jsonb,
  faqs = '[
    {"question": "Do I need a Notion account?", "answer": "Yes — a free Notion account is all you need. Free for personal use and works across all devices including your phone."},
    {"question": "How do I access the template after purchase?", "answer": "Immediately after payment you''ll receive the Quick-Start PDF guide and a direct link to duplicate the template into your Notion workspace. Instant access, no waiting."},
    {"question": "I already use other apps to track assignments — why switch?", "answer": "Because isolated apps don''t talk to each other. The Varsity Engine is relational — your assignments link to your subjects, your study sessions link to your exam prep, your goals link to your schedule. The system gives you a complete picture of your academic life, not seven separate lists."},
    {"question": "Does this work for any South African university or course?", "answer": "Yes. The system is built around the structure of SA university academic life — semesters, modules, continuous assessment, and exams — but it''s not tied to any specific institution or faculty. Whether you''re at UCT, Wits, UJ, or a TVET college, the structure adapts."},
    {"question": "Is this a one-time purchase?", "answer": "One payment, lifetime access. All future updates included."},
    {"question": "What if it doesn''t improve my performance?", "answer": "30-day satisfaction guarantee. Email hello@creativelynanda.co.za and we''ll sort it out."}
  ]'::jsonb,
  updated_at = NOW()
WHERE slug = 'varsity-academic-excellence';


-- ─────────────────────────────────────────────
-- SME COMMAND CENTER
-- ─────────────────────────────────────────────
UPDATE products SET
  description = 'Most African entrepreneurs are running their entire business out of their head, a WhatsApp group, and a spreadsheet that''s one accidental deletion away from disaster. No client system. No project visibility. No financial records that would survive a SARS audit. Just a founder doing the work of ten people with the infrastructure of none.

The SME Command Center is a complete business management system built for African entrepreneurs, freelancers, SME operators, and founders who need enterprise-grade operational infrastructure — without the enterprise price tag or the enterprise complexity. Eight relational databases replace multiple expensive tools with one coherent, customisable Notion workspace that gives you real-time visibility across your entire business.

Clients Hub is your full CRM — every client relationship from lead to completed project, with contact history, contract values, payment status, and follow-up reminders. Projects Tracker is your operational core — every project from brief to final payment, with status, deadlines, linked tasks, client, revenue, team member, and delivery notes in one view. Revenue Tracker gives you a complete income record linked to clients and projects, building a real-time picture of your business financial performance that you can actually read. Expenses Tracker is your complete expenditure record, designed around South African SARS documentation requirements for tax deductions. Tasks Command Center captures every work action with owner, deadline, priority, and project link — replacing the chaos of tasks buried in email chains and WhatsApp messages. Team Directory manages employees, freelancers, and contractors with roles, contacts, rates, and accountability. Inventory Manager tracks stock, equipment, and materials with project cost links. And Documents Library is the single home for every contract, proposal, and business record — version-controlled, accessible, and never lost again.

Built for South African business reality — with SARS compliance guidance, VAT record-keeping structure, CIPC documentation support, BBBEE score tracking, a monthly financial review template, and a financial dashboard that gives you a clear view of your business health at any point in time.',
  features = '[
    {"title": "Clients Hub — Your Full Business CRM", "description": "Every client relationship managed from first contact to completed project and beyond. Contact details, contract values, project history, payment status, follow-up reminders, and prospect pipeline — all in one database. The client system that makes you look like a business, not a freelancer.", "icon": "users"},
    {"title": "Projects Tracker — Full Operational Visibility", "description": "Every project tracked from brief to payment with status, deadlines, linked tasks, assigned team members, client reference, and revenue attached. Real-time visibility across your entire project portfolio — so you always know what''s in progress, what''s at risk, and what''s being invoiced.", "icon": "git-branch"},
    {"title": "Revenue & Expenses — Built for SARS Compliance", "description": "Complete income records linked to clients and projects. Complete expenditure records structured for South African SARS tax deduction documentation. Monthly financial review template. A financial dashboard that gives you a real-time picture of your business performance — and records that survive an audit.", "icon": "trending-up"},
    {"title": "Tasks Command Center — Nothing Lost in WhatsApp", "description": "Every work action captured with owner, deadline, priority level, and project link. Tasks assigned, tracked, and completed inside the same system where your projects and clients live. The system that replaces the chaos of work managed through messages, email chains, and memory.", "icon": "check-square"},
    {"title": "Team Directory & Inventory Manager", "description": "Your full people database — employees, freelancers, and contractors with roles, contacts, rates, and accountability. Paired with an inventory manager for stock, equipment, and materials linked to project costing. The operational infrastructure that makes managing a team and physical assets less chaotic.", "icon": "package"},
    {"title": "Documents Library — One Home for Everything", "description": "Contracts, proposals, quotes, NDAs, business registration documents, compliance records — all centrally stored with version control and category organisation. The system that ends ''I can''t find the original contract'' and ensures your business documentation is always where you need it.", "icon": "folder"}
  ]'::jsonb,
  faqs = '[
    {"question": "Do I need a Notion account?", "answer": "Yes — a free Notion account is all you need. Free for personal use, and the paid team plan only becomes relevant if you want to collaborate with three or more team members inside the same workspace simultaneously."},
    {"question": "How do I access the template after purchase?", "answer": "Immediately after payment you''ll receive the Quick-Start PDF guide and a direct link to duplicate the Notion template into your workspace. No waiting, no approval process. You can start setting up your client records the same day."},
    {"question": "I''m a solo freelancer. Is this system too big for one person?", "answer": "No — it''s designed for exactly that reality. The eight databases are modular. A solo freelancer typically starts with Clients Hub, Projects Tracker, Revenue Tracker, and Tasks Command Center. You activate the others as your operation grows. The system scales with you."},
    {"question": "Does this handle South African compliance requirements?", "answer": "It''s built with SA compliance in mind — SARS documentation structure for expenses, VAT record-keeping fields, CIPC documentation storage, and BBBEE score tracking. It organises your records and provides guidance context, but it doesn''t replace the advice of a chartered accountant for complex tax situations."},
    {"question": "Is this a one-time purchase?", "answer": "One payment, lifetime access. All future updates included at no extra charge."},
    {"question": "What if it doesn''t work for my business?", "answer": "30-day satisfaction guarantee. If the system isn''t delivering for your operation, email hello@creativelynanda.co.za and we''ll make it right."}
  ]'::jsonb,
  updated_at = NOW()
WHERE slug = 'sme-command-center';
