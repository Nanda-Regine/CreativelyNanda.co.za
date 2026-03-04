-- ============================================================
-- CreativelyNanda.co.za - Mirembe Muse Notion Templates
-- Replaces placeholder products with the 6 real templates.
-- Run in Supabase SQL Editor.
-- ============================================================

-- 1. Add purchase_count column if it doesn't exist
ALTER TABLE products ADD COLUMN IF NOT EXISTS purchase_count integer DEFAULT 0;

-- 2. Archive old placeholder products (they won't show in the live store)
UPDATE products
SET status = 'archived'
WHERE slug IN (
  'nsfas-tracker', 'varsity-survival-kit', 'freelancer-hub',
  'sme-hub', 'salon-management', 'matric-survival',
  'inside-her-roses-ebook', 'poetry-companion'
);

-- 3. Insert the 6 real Mirembe Muse templates
-- ON CONFLICT lets you re-run this safely.

INSERT INTO products (
  slug, name, tagline, description,
  price, category, type, status,
  is_featured, badge,
  file_path, guide_url,
  features, faqs
) VALUES

-- ============================================================
-- 1. WRITER'S SANCTUARY — R299
-- ============================================================
(
  'writers-sanctuary',
  'Writer''s Sanctuary',
  'Your complete creative writing system — from first idea to final submission',
  'The Writer''s Sanctuary is a comprehensive Notion workspace built for writers who are serious about their craft and their career. Whether you''re writing a novel, submitting poetry to literary journals, or building a freelance writing practice, this system organises your entire creative life in one place.

Built by a published poet who understands the unique rhythms of a writing life — the long projects, the scattered ideas, the submission grind, and the daily practice that makes it all possible. Pre-populated with African literary journals, writing resources, and a submission tracker designed for the SA and global publishing landscape.',
  29900, 'creative', 'template', 'live',
  true, 'BESTSELLER',
  'guides/writers-sanctuary-quickstart.pdf',
  'https://shard-purchase-279.notion.site/THE-WRITER-S-SANCTUARY-2f41f72e5a638090bfdfc077c606f3a4?source=copy_link',
  '[
    {"title": "Writing Projects", "description": "Track every piece of writing — from concept to published — with word count goals, status, and publication targets", "icon": "book-open"},
    {"title": "Writing Sessions Log", "description": "Record every session with word count, mood, and momentum tracking to build an unbreakable daily practice", "icon": "pen-tool"},
    {"title": "Idea Vault", "description": "Capture every idea, image, and fragment before it disappears — organized by genre, theme, and readiness", "icon": "lightbulb"},
    {"title": "Submission Tracker", "description": "Manage your entire publishing pipeline — journals, competitions, agents — with response tracking and follow-up reminders", "icon": "send"},
    {"title": "Reading List & Research", "description": "Track what you''re reading, log craft insights, and link research directly to your writing projects", "icon": "library"},
    {"title": "Writing Habits", "description": "Build the daily practice that makes everything else possible — habit streaks, session goals, and weekly reflection", "icon": "zap"}
  ]'::jsonb,
  '[
    {"question": "Do I need a Notion account?", "answer": "Yes, you need a free Notion account. The free plan is more than enough to run this template at full power."},
    {"question": "How do I access the template after purchase?", "answer": "You''ll receive two things by email: a Quick-Start PDF guide and a direct link to duplicate the Notion template into your own workspace — instant access."},
    {"question": "Is this suitable for beginners or experienced writers?", "answer": "Both. If you''re starting out, it gives you a professional system from day one. If you''re experienced, it streamlines what you already do and adds discipline to the parts you''ve been winging."},
    {"question": "Can I get a refund?", "answer": "Yes — 30-day satisfaction guarantee. If it''s not working for you, reach out to hello@creativelynanda.co.za."}
  ]'::jsonb
),

-- ============================================================
-- 2. CREATOR'S STUDIO — R399
-- ============================================================
(
  'creators-studio',
  'Creator''s Studio',
  'Your content business command center — from idea to brand deal',
  'The Creator''s Studio is a complete business operating system for content creators, digital creatives, and personal brands. It brings your entire content operation — ideation, production, scheduling, analytics, and brand partnerships — into one relational Notion workspace.

Built for Africa''s creator economy, where most creators are building businesses without the infrastructure that corporate brands take for granted. This system gives you that infrastructure. Pre-populated with content pillars, brand deal structures, and a production workflow used by full-time creators.',
  39900, 'creative', 'template', 'live',
  true, 'NEW',
  'guides/creators-studio-quickstart.pdf',
  'https://shard-purchase-279.notion.site/THE-CREATOR-S-STUDIO-2f51f72e5a63805ca573ec90016fdabb?source=copy_link',
  '[
    {"title": "Content Projects", "description": "Your live content calendar — every piece from concept to published, across Instagram, TikTok, YouTube, LinkedIn, and more", "icon": "layout"},
    {"title": "Idea Bank", "description": "Capture content ideas the moment they hit, develop them into briefs, and pull from your bank on batch days", "icon": "lightbulb"},
    {"title": "Content Batch Tracker", "description": "Plan and log batch production sessions with asset checklists, filming logs, and editing queues", "icon": "film"},
    {"title": "Analytics Tracker", "description": "Record performance data across platforms, spot what''s working, and let data inform your next idea cycle", "icon": "bar-chart"},
    {"title": "Brand Partnerships", "description": "Manage inbound and outbound brand deals — rates, deliverables, deadlines, payment tracking, and post-campaign reporting", "icon": "briefcase"},
    {"title": "Creative Habits", "description": "Build the sustainable daily routine that separates consistent creators from burnout creators", "icon": "zap"}
  ]'::jsonb,
  '[
    {"question": "Do I need a Notion account?", "answer": "Yes, a free Notion account is all you need. The free plan fully supports this template."},
    {"question": "How do I access the template after purchase?", "answer": "You''ll receive a Quick-Start PDF and a direct Notion duplicate link by email immediately after your payment is confirmed."},
    {"question": "I''m a small creator — is this too advanced?", "answer": "Not at all. Start with Content Projects and Idea Bank, and add the other databases as your business grows. The system scales with you."},
    {"question": "Can I customise the content pillars and platform options?", "answer": "Everything is fully customisable. The pre-loaded pillars and platforms are a starting point — make it yours."}
  ]'::jsonb
),

-- ============================================================
-- 3. MUSIC ARTIST CAREER COMMAND CENTER — R499
-- ============================================================
(
  'music-artist-career-command-center',
  'Music Artist Career Command Center',
  'The SA music industry intelligence system — pre-loaded and ready to work',
  'The Music Artist Career Command Center is unlike any other music business template. Instead of an empty framework you have to fill yourself, this system comes pre-loaded with South African music industry intelligence: radio stations with submission contacts, festival application windows, music grants and funding sources, streaming playlist targets, press and blog contacts, venue databases, and a month-by-month industry calendar.

Built for independent South African and African artists who are navigating an industry with no roadmap. This is the roadmap. 10 interconnected databases with real data — the competitive intelligence that most artists spend years accumulating on their own.',
  49900, 'creative', 'template', 'live',
  true, NULL,
  'guides/music-artist-career-command-center-quickstart.pdf',
  'https://shard-purchase-279.notion.site/Music-Artist-Career-Command-Center-30c1f72e5a6380daa090e924bf747628?source=copy_link',
  '[
    {"title": "Music Industry Calendar", "description": "Month-by-month SA music industry timeline — release windows, festival application deadlines, award seasons, grant submission periods", "icon": "calendar"},
    {"title": "SA Radio Stations", "description": "Pre-loaded database of 50+ South African radio stations with contact details, format specs, and submission requirements", "icon": "radio"},
    {"title": "Music Press & Blogs", "description": "Media contacts, editorial calendars, and submission guidelines for SA music press and digital blogs", "icon": "file-text"},
    {"title": "Festivals & Venues", "description": "SA music festivals with application windows and performance venues with booking contacts", "icon": "music"},
    {"title": "Grants & Funding", "description": "Government and private music funding opportunities with eligibility criteria, amounts, and application deadlines", "icon": "dollar-sign"},
    {"title": "Streaming & Distribution", "description": "Playlist pitching targets, DSP technical specs, and release planning workflow from mastering to launch", "icon": "play-circle"}
  ]'::jsonb,
  '[
    {"question": "Do I need a Notion account?", "answer": "Yes, a free Notion account is required. The free plan fully supports this template."},
    {"question": "How do I access the template after purchase?", "answer": "You''ll receive a Quick-Start PDF and a direct Notion duplicate link by email immediately after payment confirmation."},
    {"question": "Is this suitable for new artists or established artists?", "answer": "Both. New artists get the full industry intelligence from day one. Established artists can audit their current strategy against what the system maps out."},
    {"question": "How current is the data?", "answer": "The database was populated in early 2026. Some contacts and deadlines change — use the data as a starting framework and update as you make contact."}
  ]'::jsonb
),

-- ============================================================
-- 4. HIGH SCHOOL ACADEMIC EXCELLENCE ENGINE — R249
-- ============================================================
(
  'high-school-academic-excellence',
  'High School Academic Excellence Engine',
  'The complete matric success system — from weekly schedule to final exam',
  'The High School Academic Excellence Engine is a structured academic management system built specifically for Grade 10–12 students navigating the South African CAPS curriculum. It gives you the systems and discipline that distinguish students who achieve from students who struggle — without requiring more hours, just better use of the hours you have.

7 interconnected databases that manage every aspect of your academic life: your subjects, your assignments, your study sessions, your exam preparation, your term goals, your weekly schedule, and your wellness. Built by someone who understands that matric is not just academic pressure — it''s total life pressure.',
  24900, 'student', 'template', 'live',
  true, NULL,
  'guides/high-school-academic-excellence-quickstart.pdf',
  'https://shard-purchase-279.notion.site/HIGH-SCHOOL-ACADEMIC-EXCELLENCE-ENGINE-2f11f72e5a638042bcb5e169eafc4de0?source=copy_link',
  '[
    {"title": "My Subjects", "description": "Track current marks, target marks, teacher details, and required study hours per subject — your academic command centre", "icon": "book"},
    {"title": "Assignments & Tasks", "description": "Never miss a deadline again — log every assignment with due dates, marks, status, and links to your study sessions", "icon": "check-square"},
    {"title": "Study Sessions", "description": "Log every study session with duration, subject, topics covered, and self-assessment — build your revision history automatically", "icon": "clock"},
    {"title": "Exam Prep Tracker", "description": "Structured exam preparation system — past papers completed, topics mastered, weak areas flagged, and exam day planning", "icon": "target"},
    {"title": "Term Goals & Progress", "description": "Set term targets per subject, track progress weekly, and adjust your strategy before it''s too late", "icon": "trending-up"},
    {"title": "Weekly Schedule & Wellness", "description": "Time-blocking system for balanced, sustainable days — plus a wellness check-in to protect your mental health through exam season", "icon": "heart"}
  ]'::jsonb,
  '[
    {"question": "Do I need a Notion account?", "answer": "Yes — a free Notion account is all you need. Notion works on phone, tablet, and computer."},
    {"question": "How do I access the template after purchase?", "answer": "You''ll receive a Quick-Start PDF guide and a direct Notion template link by email immediately after your payment is confirmed."},
    {"question": "Which grade levels is this designed for?", "answer": "Grade 10, 11, and 12. The system is designed around CAPS but adapts to IEB as well. Every subject type works."},
    {"question": "Can my parents see my progress?", "answer": "You can share read-only access with parents through Notion''s built-in sharing features."}
  ]'::jsonb
),

-- ============================================================
-- 5. VARSITY ACADEMIC EXCELLENCE ENGINE — R279
-- ============================================================
(
  'varsity-academic-excellence',
  'Varsity Academic Excellence Engine',
  'Your complete university academic system — from first lecture to final exam',
  'The Varsity Academic Excellence Engine is a structured academic management system built for South African university students who want to perform at their highest level without burning out. University demands more self-direction than high school — this system provides the structure that most students have to figure out the hard way.

7 relational databases that cover every dimension of university academic life: module tracking, assignment management, study session logging, exam preparation, term goal setting, weekly scheduling, and wellness monitoring. Built for South African university students who are managing lectures, assignments, part-time work, and life — all at once.',
  27900, 'student', 'template', 'live',
  true, NULL,
  'guides/varsity-academic-excellence-quickstart.pdf',
  'https://shard-purchase-279.notion.site/VARSITY-ACADEMIC-EXCELLENCE-ENGINE-4d61f72e5a638387b8b40111d1dcefa2?source=copy_link',
  '[
    {"title": "My Subjects", "description": "Track all modules with current marks, target marks, credit loads, lecturer details, and effort levels — your semester at a glance", "icon": "book"},
    {"title": "Assignments & Tasks", "description": "Manage every deadline across multiple modules — due dates, submission portals, group work, and linked study sessions", "icon": "check-square"},
    {"title": "Study Sessions", "description": "Log study time by module and topic — build a revision history that makes exam preparation systematic instead of desperate", "icon": "clock"},
    {"title": "Exam Prep Tracker", "description": "Plan and execute exam preparation — past papers done, topics mastered, weak areas identified, and time allocated strategically", "icon": "target"},
    {"title": "Term Goals & Progress", "description": "Set performance targets by academic category, track weekly, and course-correct before results day", "icon": "trending-up"},
    {"title": "Weekly Schedule & Wellness", "description": "Time-blocking system for balancing lectures, assignments, rest, and personal life — with wellness check-ins for sustainable performance", "icon": "heart"}
  ]'::jsonb,
  '[
    {"question": "Do I need a Notion account?", "answer": "Yes — a free Notion account works perfectly. Notion is available on all devices including the mobile app."},
    {"question": "How do I access the template after purchase?", "answer": "You''ll receive a Quick-Start PDF and a direct Notion duplicate link by email immediately after your payment is confirmed."},
    {"question": "Does this work for any South African university?", "answer": "Yes — UCT, Wits, Stellenbosch, UJ, UNISA, and all others. The system is built around how SA universities work, not any specific institution."},
    {"question": "Is it useful for postgraduate students too?", "answer": "Absolutely. The research and dissertation stages work well with the project and writing session databases."}
  ]'::jsonb
),

-- ============================================================
-- 6. SME COMMAND CENTER — R449
-- ============================================================
(
  'sme-command-center',
  'SME Command Center',
  'Your complete business operating system — clients, projects, money, and team',
  'The SME Command Center is a full business management system built for African entrepreneurs, freelancers, and small-to-medium enterprise operators who need enterprise-grade business infrastructure without the enterprise price tag. 8 relational databases that replace multiple expensive tools with one coherent, customisable Notion workspace.

Built for the realities of running a business in Africa — where you''re often the CEO, the project manager, the accountant, and the sales team simultaneously. This system gives you the structure to operate at a professional level from day one, manage growth without chaos, and maintain the clarity that keeps a business alive.',
  44900, 'business', 'template', 'live',
  true, 'POPULAR',
  'guides/sme-command-center-quickstart.pdf',
  'https://shard-purchase-279.notion.site/SME-COMMAND-CENTER-5011f72e5a63821b840581fdc6174d7f?source=copy_link',
  '[
    {"title": "Clients Hub", "description": "Full CRM — manage every client relationship from lead to completed project, with contact history, contract values, and follow-up reminders", "icon": "users"},
    {"title": "Projects Tracker", "description": "Track every project from brief to delivery — status, deadlines, linked tasks, client, revenue, and team members in one view", "icon": "git-branch"},
    {"title": "Revenue Tracker", "description": "Log every income entry, link it to a client and project, and build a real-time picture of your business financial performance", "icon": "trending-up"},
    {"title": "Tasks Command Center", "description": "Daily and weekly task management linked to projects and clients — prioritised, deadline-tracked, and never lost in a chat thread", "icon": "check-square"},
    {"title": "Expenses & Inventory", "description": "Track business costs against budgets and manage stock or supplies — linked to projects for accurate job costing", "icon": "package"},
    {"title": "Team & Documents", "description": "Staff directory with roles and contacts, plus a central document library for contracts, proposals, and business records", "icon": "folder"}
  ]'::jsonb,
  '[
    {"question": "Do I need a Notion account?", "answer": "Yes — a free Notion account is the foundation. For team sharing beyond 10 guests, Notion''s Plus plan is recommended."},
    {"question": "How do I access the template after purchase?", "answer": "You''ll receive a Quick-Start PDF guide and a direct Notion duplicate link by email immediately after your payment is confirmed."},
    {"question": "I run a service business — does this work for me?", "answer": "Yes. The Clients Hub and Projects Tracker are built for service businesses: consulting, creative services, professional services, trades, and more."},
    {"question": "What about POPIA compliance?", "answer": "The system includes data management best practices. For formal POPIA compliance, consult a legal professional — this is a business tool, not legal advice."}
  ]'::jsonb
)

ON CONFLICT (slug) DO UPDATE SET
  name           = EXCLUDED.name,
  tagline        = EXCLUDED.tagline,
  description    = EXCLUDED.description,
  price          = EXCLUDED.price,
  category       = EXCLUDED.category,
  type           = EXCLUDED.type,
  status         = EXCLUDED.status,
  is_featured    = EXCLUDED.is_featured,
  badge          = EXCLUDED.badge,
  file_path      = EXCLUDED.file_path,
  guide_url      = EXCLUDED.guide_url,
  features       = EXCLUDED.features,
  faqs           = EXCLUDED.faqs,
  updated_at     = now();
