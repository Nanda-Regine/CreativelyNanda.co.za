-- ============================================================
-- CreativelyNanda.co.za - Full Product Data for Supabase-Driven Store
-- Run this in Supabase SQL Editor (Dashboard > SQL Editor)
-- Safe to re-run: uses IF NOT EXISTS and ON CONFLICT
-- ============================================================

-- ============================================================
-- 1. ADD MISSING COLUMNS
-- ============================================================

-- FAQs column (JSONB array of {question, answer})
ALTER TABLE products ADD COLUMN IF NOT EXISTS faqs jsonb DEFAULT '[]';

-- Badge column for display (e.g., 'BESTSELLER', 'NEW', 'POPULAR')
ALTER TABLE products ADD COLUMN IF NOT EXISTS badge text;

-- ============================================================
-- 2. SEED FULL PRODUCT DATA (with features, FAQs, descriptions)
-- ============================================================

INSERT INTO products (slug, name, tagline, description, price, original_price, category, type, status, is_featured, badge, rating, review_count, file_path, features, faqs) VALUES

-- NSFAS Tracker
('nsfas-tracker', 'NSFAS Tracker',
 'Stay on top of your NSFAS application with deadline reminders and status tracking',
 'The NSFAS Tracker is the ultimate Notion template designed specifically for South African students navigating the NSFAS application process. Stop missing deadlines and stay organized throughout your funding journey.

Built from real experience and feedback from over 500 students, this template includes everything you need to successfully apply, track, and manage your NSFAS funding.',
 14900, 19900, 'student', 'template', 'live', true, 'BESTSELLER', 4.9, 127,
 'products/nsfas-tracker/nsfas-tracker.zip',
 '[{"title":"Deadline Countdown","description":"Never miss a deadline with automatic countdown timers for all important dates","icon":"clock"},{"title":"Document Checklist","description":"Complete checklist of all required documents with status tracking","icon":"check"},{"title":"Status Tracker","description":"Track your application status through each stage of the process","icon":"zap"},{"title":"Appeal Templates","description":"Pre-written templates for appeals and correspondence","icon":"file"},{"title":"Pro Tips Database","description":"Insider tips from successful applicants to avoid common mistakes","icon":"lightbulb"},{"title":"Mobile Ready","description":"Access your tracker on any device with the Notion mobile app","icon":"phone"}]'::jsonb,
 '[{"question":"Do I need a Notion account?","answer":"Yes, you''ll need a free Notion account to use this template. Notion is free for personal use."},{"question":"How do I get the template after purchase?","answer":"You''ll receive an email with a link to duplicate the template directly into your Notion workspace."},{"question":"Is this updated for the 2026 application cycle?","answer":"Yes! This template is updated for the latest NSFAS requirements and deadlines."},{"question":"Can I get a refund?","answer":"Yes, we offer a 30-day money-back guarantee if you''re not satisfied."}]'::jsonb),

-- Varsity Survival Kit
('varsity-survival-kit', 'Varsity Survival Kit',
 'Everything you need to ace your first year at university',
 'The ultimate survival kit for South African university students. From budgeting to study planning, this comprehensive Notion template covers everything you need to thrive in your first year and beyond.

Designed by students who''ve been through it, with practical tools that actually work in the SA university context.',
 24900, NULL, 'student', 'template', 'live', true, 'NEW', 4.8, 56,
 'products/varsity-survival-kit/varsity-survival-kit.zip',
 '[{"title":"Study Planner","description":"Organize your modules, assignments, and exam schedule in one place","icon":"book"},{"title":"Budget Tracker","description":"Track your allowance, expenses, and savings goals","icon":"wallet"},{"title":"Meal Planner","description":"Plan affordable, healthy meals on a student budget","icon":"utensils"},{"title":"Goal Setting","description":"Set academic and personal goals with progress tracking","icon":"target"},{"title":"Resource Library","description":"Curated links to free textbooks, past papers, and study aids","icon":"library"},{"title":"Social Calendar","description":"Balance academics with campus life and events","icon":"calendar"}]'::jsonb,
 '[{"question":"Which universities is this designed for?","answer":"It works for any South African university - UCT, Wits, Stellenbosch, UJ, and all others."},{"question":"Can I customize the template?","answer":"Absolutely! Every section is fully customizable to fit your specific needs and preferences."},{"question":"Is there a mobile version?","answer":"Yes, Notion works on mobile so you can access your survival kit anywhere."},{"question":"Do I need to pay for Notion?","answer":"No, Notion''s free plan is more than enough for this template."}]'::jsonb),

-- Freelancer Hub
('freelancer-hub', 'Freelancer Hub',
 'Complete Notion workspace for freelancers to manage clients, projects, and invoices',
 'Take your freelance business to the next level with this comprehensive Notion workspace. Manage everything from client relationships to project tracking, invoicing, and financial reporting.

Built for South African freelancers with ZAR-based templates, local tax considerations, and workflows that scale with your business.',
 34900, NULL, 'business', 'template', 'live', true, NULL, 4.7, 34,
 'products/freelancer-hub/freelancer-hub.zip',
 '[{"title":"Client CRM","description":"Track leads, clients, and communication history","icon":"users"},{"title":"Project Management","description":"Kanban boards, timelines, and task tracking for every project","icon":"layout"},{"title":"Invoice Generator","description":"Create professional invoices with your branding","icon":"file-text"},{"title":"Financial Dashboard","description":"Track income, expenses, and profit at a glance","icon":"bar-chart"},{"title":"Contract Templates","description":"Professional service agreements ready to customize","icon":"file-check"},{"title":"Time Tracker","description":"Log billable hours and generate timesheets","icon":"clock"}]'::jsonb,
 '[{"question":"Is this suitable for beginners?","answer":"Yes! Whether you''re just starting out or an experienced freelancer, the template adapts to your needs."},{"question":"Can I use this for a team?","answer":"The template is designed for solo freelancers, but Notion allows sharing with team members."},{"question":"Does it include tax calculations?","answer":"It includes expense tracking and income categorization. Consult your accountant for tax specifics."},{"question":"How often is it updated?","answer":"We release updates quarterly with new features and improvements."}]'::jsonb),

-- SME Hub
('sme-hub', 'SME Hub',
 'All-in-one business management system for small and medium enterprises',
 'Transform how you run your small or medium business with this comprehensive management system. From team coordination to financial oversight, everything your growing business needs in one powerful Notion workspace.

Designed specifically for South African SMEs with compliance-ready templates and local business workflows.',
 49900, NULL, 'business', 'template', 'live', true, 'POPULAR', 4.9, 89,
 'products/sme-business-hub/sme-business-hub.zip',
 '[{"title":"Team Management","description":"Organize your team, roles, and responsibilities","icon":"users"},{"title":"Project Pipeline","description":"Track all business projects from inception to completion","icon":"git-branch"},{"title":"Financial Overview","description":"Revenue tracking, expense management, and cash flow projections","icon":"trending-up"},{"title":"HR Toolkit","description":"Employee onboarding, leave management, and performance reviews","icon":"briefcase"},{"title":"Meeting Notes","description":"Structured meeting templates with action items tracking","icon":"clipboard"},{"title":"KPI Dashboard","description":"Monitor key business metrics and growth indicators","icon":"activity"}]'::jsonb,
 '[{"question":"How many team members can use it?","answer":"As many as your Notion plan allows. The free plan supports up to 10 guests."},{"question":"Can I integrate with other tools?","answer":"Yes, Notion integrates with Slack, Google Calendar, and many other tools."},{"question":"Is it POPIA compliant?","answer":"The template includes data management best practices, but consult a legal professional for full POPIA compliance."},{"question":"Do you offer setup assistance?","answer":"Yes, we offer a one-time setup consultation for R500 to help you customize everything."}]'::jsonb),

-- Salon Management
('salon-management', 'Salon Management',
 'Streamline your salon operations with booking, inventory, and client management',
 'Run your salon or beauty business like a pro with this all-in-one management system. Track appointments, manage inventory, build client relationships, and grow your revenue.

Built by and for South African salon owners who understand the unique challenges of the beauty industry.',
 39900, NULL, 'business', 'template', 'live', false, NULL, 4.6, 12,
 'products/salon-management-system/salon-management-system.zip',
 '[{"title":"Appointment Book","description":"Digital booking system with client reminders and scheduling","icon":"calendar"},{"title":"Client Profiles","description":"Track client preferences, history, and loyalty rewards","icon":"user"},{"title":"Inventory Management","description":"Monitor stock levels, suppliers, and reorder alerts","icon":"package"},{"title":"Staff Scheduling","description":"Manage staff shifts, availability, and performance","icon":"users"},{"title":"Revenue Tracking","description":"Daily, weekly, and monthly income reports","icon":"dollar-sign"},{"title":"Marketing Planner","description":"Social media content calendar and promotion tracking","icon":"megaphone"}]'::jsonb,
 '[{"question":"Can my staff access it?","answer":"Yes, you can share specific pages with your staff through Notion''s sharing features."},{"question":"Does it handle online bookings?","answer":"It includes a booking management system. For online client-facing bookings, pair it with a booking tool."},{"question":"Is it suitable for barber shops?","answer":"Absolutely! It works for salons, barber shops, spas, and any beauty business."},{"question":"Can I track multiple locations?","answer":"Yes, the template supports multi-location management."}]'::jsonb),

-- Matric Survival
('matric-survival', 'Matric Survival',
 'Study planner and exam prep system for matric students',
 'Your complete matric companion. This Notion template helps you plan your study schedule, track your subjects, prepare for exams, and manage your CAO/university applications.

Designed by recent matric achievers who know exactly what it takes to succeed in Grade 12.',
 14900, NULL, 'student', 'template', 'live', false, 'NEW', 0, 0,
 'products/matric-survival-kit/matric-survival-kit.zip',
 '[{"title":"Subject Tracker","description":"Track all your subjects, marks, and target grades","icon":"book"},{"title":"Study Timetable","description":"Create balanced study schedules with break reminders","icon":"clock"},{"title":"Past Paper Log","description":"Track which past papers you''ve completed and your scores","icon":"file-text"},{"title":"Application Tracker","description":"Manage your university and bursary applications","icon":"send"},{"title":"Exam Countdown","description":"Countdown timers for every exam with preparation milestones","icon":"timer"},{"title":"Motivation Board","description":"Track your wins and stay motivated throughout the year","icon":"star"}]'::jsonb,
 '[{"question":"Which curriculum does it cover?","answer":"It''s designed for the South African CAPS curriculum and IEB."},{"question":"Can parents track progress?","answer":"You can share read-only access with parents through Notion."},{"question":"Does it include study materials?","answer":"It includes study planning tools and links to free resources, not the actual study content."},{"question":"When should I start using it?","answer":"Ideally from the start of Grade 12, but it''s useful at any point in the year."}]'::jsonb),

-- Inside Her Roses eBook
('inside-her-roses-ebook', 'Inside Her Roses',
 'A poetry collection exploring love, loss, and self-discovery',
 'Inside Her Roses is a deeply personal poetry collection that takes readers on a journey through love, heartbreak, healing, and self-discovery. Each poem is a petal, revealing layers of emotion and truth.

Written by Nanda, this collection resonates with anyone who has loved deeply and grown through their experiences.',
 9900, NULL, 'creative', 'ebook', 'live', false, 'BESTSELLER', 5.0, 47,
 'products/inside-her-roses-ebook/inside-her-roses.zip',
 '[{"title":"40+ Original Poems","description":"A curated collection of deeply personal and relatable poetry","icon":"feather"},{"title":"Thematic Chapters","description":"Organized into sections: Roots, Thorns, Petals, and Bloom","icon":"book-open"},{"title":"Digital Format","description":"Available as PDF and EPUB for any device","icon":"tablet"},{"title":"Author Notes","description":"Behind-the-poem notes sharing the inspiration and context","icon":"pen-tool"},{"title":"Discussion Guide","description":"Questions for book clubs and personal reflection","icon":"message-circle"},{"title":"Bonus Content","description":"Exclusive unpublished poems and early drafts","icon":"gift"}]'::jsonb,
 '[{"question":"What format is the eBook?","answer":"You''ll receive both PDF and EPUB formats for maximum compatibility."},{"question":"Can I read it on my phone?","answer":"Yes! Both formats work perfectly on phones, tablets, and computers."},{"question":"Is there a physical copy?","answer":"A physical edition is coming soon. Join the waitlist to be notified."},{"question":"Can I share it with a friend?","answer":"The eBook is for personal use only, but we''d love if you shared the link!"}]'::jsonb),

-- Poetry Companion
('poetry-companion', 'Poetry Companion',
 'Notion template for poets to organize, write, and publish their work',
 'A beautiful Notion workspace designed for poets and creative writers. Organize your poems, track submissions, plan collections, and develop your craft with guided prompts and exercises.

Whether you''re a published poet or just starting your creative journey, this template gives your words a home.',
 19900, NULL, 'creative', 'template', 'live', false, 'NEW', 0, 0,
 'products/inside-her-roses-companion/poetry-companion.zip',
 '[{"title":"Poetry Vault","description":"Store and organize all your poems with tags, moods, and themes","icon":"archive"},{"title":"Writing Prompts","description":"365 daily prompts to spark your creativity","icon":"sparkles"},{"title":"Submission Tracker","description":"Track literary magazine submissions and responses","icon":"send"},{"title":"Collection Planner","description":"Plan and organize your poetry collections and chapbooks","icon":"layers"},{"title":"Reading Log","description":"Track poetry collections you''ve read for inspiration","icon":"book"},{"title":"Workshop Notes","description":"Store feedback and revision notes from workshops","icon":"edit"}]'::jsonb,
 '[{"question":"Do I need to be an experienced poet?","answer":"Not at all! This template is perfect for beginners and experienced poets alike."},{"question":"Are the writing prompts original?","answer":"Yes, all 365 prompts are original and designed to inspire diverse poetic forms."},{"question":"Can I use it for prose writing too?","answer":"While designed for poetry, many writers use it for short stories and creative prose as well."},{"question":"Is it connected to Inside Her Roses?","answer":"It''s a standalone template, but it pairs beautifully with the Inside Her Roses eBook."}]'::jsonb)

ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  category = EXCLUDED.category,
  type = EXCLUDED.type,
  status = EXCLUDED.status,
  is_featured = EXCLUDED.is_featured,
  badge = EXCLUDED.badge,
  rating = EXCLUDED.rating,
  review_count = EXCLUDED.review_count,
  file_path = EXCLUDED.file_path,
  features = EXCLUDED.features,
  faqs = EXCLUDED.faqs;
