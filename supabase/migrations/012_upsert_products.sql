-- Migration 012: Safe upsert of all marketplace products
-- Uses ON CONFLICT DO UPDATE to avoid FK constraint issues from DELETE
-- images is text[], features/faqs are jsonb

INSERT INTO products (slug, name, tagline, price, category, badge, status, thumbnail, description, features, faqs, images)
VALUES
  (
    'writers-sanctuary',
    'Writer''s Sanctuary',
    'Your complete creative writing system — from first idea to final submission',
    29900,
    'Creative',
    'BESTSELLER',
    'live',
    'https://bemgnttmaqpmsaosdisc.supabase.co/storage/v1/object/public/product-images/writers-sanctuary/cover-photo.png',
    'The Writer''s Sanctuary is a comprehensive Notion workspace built for writers who are serious about their craft and their career.',
    '[{"title":"Writing Projects","description":"Track every piece of writing — from concept to published — with word count goals, status, and publication targets","icon":"book-open"},{"title":"Writing Sessions Log","description":"Record every session with word count, mood, and momentum tracking","icon":"pen-tool"},{"title":"Idea Vault","description":"Capture every idea, image, and fragment before it disappears","icon":"lightbulb"},{"title":"Submission Tracker","description":"Manage your entire publishing pipeline — journals, competitions, agents","icon":"send"},{"title":"Reading List & Research","description":"Track what you''re reading, log craft insights, and link research to your projects","icon":"library"},{"title":"Writing Habits","description":"Build the daily practice that makes everything else possible","icon":"zap"}]'::jsonb,
    '[{"question":"Do I need a Notion account?","answer":"Yes — a free Notion account is all you need."},{"question":"How do I access the template after purchase?","answer":"You''ll receive a Quick-Start PDF guide and a direct link to duplicate the template into your workspace."},{"question":"Is this a one-time purchase?","answer":"Yes. One payment, lifetime access. Free updates included."},{"question":"Can I get a refund?","answer":"Yes — 30-day satisfaction guarantee. Reach out to hello@creativelynanda.co.za."}]'::jsonb,
    ARRAY['https://bemgnttmaqpmsaosdisc.supabase.co/storage/v1/object/public/product-images/writers-sanctuary/cover-photo.png']
  ),
  (
    'creators-studio',
    'Creator''s Studio',
    'Your content business command center — from idea to brand deal',
    39900,
    'Creative',
    'NEW',
    'live',
    'https://bemgnttmaqpmsaosdisc.supabase.co/storage/v1/object/public/product-images/creators-studio/cover-photo.png',
    'The Creator''s Studio is a complete business operating system for content creators, digital creatives, and personal brands.',
    '[{"title":"Content Projects","description":"Your live content calendar — every piece from concept to published","icon":"layout"},{"title":"Idea Bank","description":"Capture content ideas the moment they hit","icon":"lightbulb"},{"title":"Content Batch Tracker","description":"Plan and log batch production sessions","icon":"film"},{"title":"Analytics Tracker","description":"Record performance data across platforms","icon":"bar-chart"},{"title":"Brand Partnerships","description":"Manage inbound and outbound brand deals","icon":"briefcase"},{"title":"Creative Habits","description":"Build the sustainable daily routine","icon":"zap"}]'::jsonb,
    '[{"question":"Do I need a Notion account?","answer":"Yes — a free Notion account is all you need."},{"question":"How do I access the template after purchase?","answer":"You''ll receive a Quick-Start PDF guide and a direct link to duplicate the template into your workspace."},{"question":"Is this a one-time purchase?","answer":"Yes. One payment, lifetime access. Free updates included."},{"question":"Can I get a refund?","answer":"Yes — 30-day satisfaction guarantee. Reach out to hello@creativelynanda.co.za."}]'::jsonb,
    ARRAY['https://bemgnttmaqpmsaosdisc.supabase.co/storage/v1/object/public/product-images/creators-studio/cover-photo.png']
  ),
  (
    'music-artist-career-command-center',
    'Music Artist Career Command Center',
    'The SA music industry intelligence system — pre-loaded and ready to work',
    38900,
    'Creative',
    NULL,
    'live',
    'https://bemgnttmaqpmsaosdisc.supabase.co/storage/v1/object/public/product-images/music-artist/cover-photo.png',
    'The Music Artist Career Command Center comes pre-loaded with South African music industry intelligence: radio stations, festival application windows, music grants, and a month-by-month industry calendar.',
    '[{"title":"Music Industry Calendar","description":"Month-by-month SA music industry timeline","icon":"calendar"},{"title":"SA Radio Stations","description":"Pre-loaded database of 50+ South African radio stations","icon":"radio"},{"title":"Music Press & Blogs","description":"Media contacts and submission guidelines for SA music press","icon":"file-text"},{"title":"Festivals & Venues","description":"SA music festivals with application windows and booking contacts","icon":"music"},{"title":"Grants & Funding","description":"Government and private music funding opportunities","icon":"dollar-sign"},{"title":"Streaming & Distribution","description":"Playlist pitching targets, DSP technical specs, and release planning","icon":"play-circle"}]'::jsonb,
    '[{"question":"Do I need a Notion account?","answer":"Yes — a free Notion account is all you need."},{"question":"How do I access the template after purchase?","answer":"You''ll receive a Quick-Start PDF guide and a direct link to duplicate the template into your workspace."},{"question":"Is this a one-time purchase?","answer":"Yes. One payment, lifetime access. Free updates included."},{"question":"Can I get a refund?","answer":"Yes — 30-day satisfaction guarantee. Reach out to hello@creativelynanda.co.za."}]'::jsonb,
    ARRAY['https://bemgnttmaqpmsaosdisc.supabase.co/storage/v1/object/public/product-images/music-artist/cover-photo.png']
  ),
  (
    'high-school-academic-excellence',
    'High School Academic Excellence Engine',
    'The complete matric success system — from weekly schedule to final exam',
    24900,
    'Student',
    NULL,
    'live',
    'https://bemgnttmaqpmsaosdisc.supabase.co/storage/v1/object/public/product-images/high-school/cover-photo.png',
    'The High School Academic Excellence Engine is a structured academic management system built specifically for Grade 10–12 students navigating the South African CAPS curriculum.',
    '[{"title":"My Subjects","description":"Track current marks, target marks, teacher details, and required study hours per subject","icon":"book"},{"title":"Assignments & Tasks","description":"Never miss a deadline again — log every assignment with due dates and marks","icon":"check-square"},{"title":"Study Sessions","description":"Log every study session with duration, subject, and topics covered","icon":"clock"},{"title":"Exam Prep Tracker","description":"Structured exam preparation system — past papers, topics mastered, weak areas","icon":"target"},{"title":"Term Goals & Progress","description":"Set term targets per subject and track progress weekly","icon":"trending-up"},{"title":"Weekly Schedule & Wellness","description":"Time-blocking system with wellness check-ins","icon":"heart"}]'::jsonb,
    '[{"question":"Do I need a Notion account?","answer":"Yes — a free Notion account is all you need."},{"question":"How do I access the template after purchase?","answer":"You''ll receive a Quick-Start PDF guide and a direct link to duplicate the template into your workspace."},{"question":"Is this a one-time purchase?","answer":"Yes. One payment, lifetime access. Free updates included."},{"question":"Can I get a refund?","answer":"Yes — 30-day satisfaction guarantee. Reach out to hello@creativelynanda.co.za."}]'::jsonb,
    ARRAY['https://bemgnttmaqpmsaosdisc.supabase.co/storage/v1/object/public/product-images/high-school/cover-photo.png']
  ),
  (
    'varsity-academic-excellence',
    'Varsity Academic Excellence Engine',
    'Your complete university academic system — from first lecture to final exam',
    27900,
    'Student',
    NULL,
    'live',
    'https://bemgnttmaqpmsaosdisc.supabase.co/storage/v1/object/public/product-images/varsity/cover-photo.png',
    'The Varsity Academic Excellence Engine is a structured academic management system built for South African university students who want to perform at their highest level without burning out.',
    '[{"title":"My Subjects","description":"Track all modules with current marks, target marks, credit loads, and lecturer details","icon":"book"},{"title":"Assignments & Tasks","description":"Manage every deadline across multiple modules","icon":"check-square"},{"title":"Study Sessions","description":"Log study time by module and topic — build a revision history","icon":"clock"},{"title":"Exam Prep Tracker","description":"Plan and execute exam preparation — past papers, topics mastered, weak areas","icon":"target"},{"title":"Term Goals & Progress","description":"Set performance targets by academic category and track weekly","icon":"trending-up"},{"title":"Weekly Schedule & Wellness","description":"Time-blocking system for balancing lectures, assignments, rest, and personal life","icon":"heart"}]'::jsonb,
    '[{"question":"Do I need a Notion account?","answer":"Yes — a free Notion account is all you need."},{"question":"How do I access the template after purchase?","answer":"You''ll receive a Quick-Start PDF guide and a direct link to duplicate the template into your workspace."},{"question":"Is this a one-time purchase?","answer":"Yes. One payment, lifetime access. Free updates included."},{"question":"Can I get a refund?","answer":"Yes — 30-day satisfaction guarantee. Reach out to hello@creativelynanda.co.za."}]'::jsonb,
    ARRAY['https://bemgnttmaqpmsaosdisc.supabase.co/storage/v1/object/public/product-images/varsity/cover-photo.png']
  ),
  (
    'sme-command-center',
    'SME Command Center',
    'Your complete business operating system — clients, projects, money, and team',
    44900,
    'Business',
    'POPULAR',
    'live',
    'https://bemgnttmaqpmsaosdisc.supabase.co/storage/v1/object/public/product-images/sme/cover-photo.png',
    'The SME Command Center is a full business management system built for African entrepreneurs, freelancers, and SME operators who need enterprise-grade infrastructure without the enterprise price tag.',
    '[{"title":"Clients Hub","description":"Full CRM — manage every client relationship from lead to completed project","icon":"users"},{"title":"Projects Tracker","description":"Track every project from brief to delivery","icon":"git-branch"},{"title":"Revenue Tracker","description":"Log every income entry, link it to a client and project","icon":"trending-up"},{"title":"Tasks Command Center","description":"Daily and weekly task management linked to projects and clients","icon":"check-square"},{"title":"Expenses & Inventory","description":"Track business costs against budgets and manage stock or supplies","icon":"package"},{"title":"Team & Documents","description":"Staff directory with roles and contacts, plus a central document library","icon":"folder"}]'::jsonb,
    '[{"question":"Do I need a Notion account?","answer":"Yes — a free Notion account is all you need."},{"question":"How do I access the template after purchase?","answer":"You''ll receive a Quick-Start PDF guide and a direct link to duplicate the template into your workspace."},{"question":"Is this a one-time purchase?","answer":"Yes. One payment, lifetime access. Free updates included."},{"question":"Can I get a refund?","answer":"Yes — 30-day satisfaction guarantee. Reach out to hello@creativelynanda.co.za."}]'::jsonb,
    ARRAY['https://bemgnttmaqpmsaosdisc.supabase.co/storage/v1/object/public/product-images/sme/cover-photo.png']
  )
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  price = EXCLUDED.price,
  category = EXCLUDED.category,
  badge = EXCLUDED.badge,
  status = EXCLUDED.status,
  thumbnail = EXCLUDED.thumbnail,
  description = EXCLUDED.description,
  features = EXCLUDED.features,
  faqs = EXCLUDED.faqs,
  images = EXCLUDED.images,
  updated_at = NOW();
