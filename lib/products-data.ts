import type { ProductCoverData } from '@/components/marketplace';

export interface ProductDetail {
  product: ProductCoverData;
  description: string;
  features: { title: string; description: string; icon: string }[];
  faqs: { question: string; answer: string }[];
  testimonials: { author: string; role: string; content: string; rating: number }[];
  images?: string[];
}

const COMMON_FAQS_NOTION = [
  { question: 'Do I need a Notion account?', answer: 'Yes — a free Notion account is all you need. Notion is free for personal use and works on all devices.' },
  { question: 'How do I access the template after purchase?', answer: "You'll receive two things by email: a Quick-Start PDF guide and a direct link to duplicate the Notion template into your own workspace — instant access." },
  { question: 'Is this a one-time purchase?', answer: 'Yes. One payment, lifetime access. Free updates are included.' },
  { question: 'Can I get a refund?', answer: "Yes — 30-day satisfaction guarantee. If it's not working for you, reach out to hello@creativelynanda.co.za." },
];

export const PRODUCTS_DB: Record<string, ProductDetail> = {
  'writers-sanctuary': {
    product: {
      slug: 'writers-sanctuary',
      name: "Writer's Sanctuary",
      tagline: 'Your complete creative writing system — from first idea to final submission',
      price: 29900,
      category: 'Creative',
      badge: 'BESTSELLER',
      status: 'live',
      impact: 'Built for 500K+ aspiring African writers',
      topFeatures: ['Writing Projects', 'Submission Tracker', 'Idea Vault'],
    },
    description: `The Writer's Sanctuary is a comprehensive Notion workspace built for writers who are serious about their craft and their career. Whether you're writing a novel, submitting poetry to literary journals, or building a freelance writing practice, this system organises your entire creative life in one place.

Built by a published poet who understands the unique rhythms of a writing life — the long projects, the scattered ideas, the submission grind, and the daily practice that makes it all possible.`,
    features: [
      { title: 'Writing Projects', description: 'Track every piece of writing — from concept to published — with word count goals, status, and publication targets', icon: 'book-open' },
      { title: 'Writing Sessions Log', description: 'Record every session with word count, mood, and momentum tracking to build an unbreakable daily practice', icon: 'pen-tool' },
      { title: 'Idea Vault', description: 'Capture every idea, image, and fragment before it disappears — organized by genre, theme, and readiness', icon: 'lightbulb' },
      { title: 'Submission Tracker', description: 'Manage your entire publishing pipeline — journals, competitions, agents — with response tracking and follow-up reminders', icon: 'send' },
      { title: 'Reading List & Research', description: "Track what you're reading, log craft insights, and link research directly to your writing projects", icon: 'library' },
      { title: 'Writing Habits', description: 'Build the daily practice that makes everything else possible — habit streaks, session goals, and weekly reflection', icon: 'zap' },
    ],
    faqs: COMMON_FAQS_NOTION,
    testimonials: [],
  },

  'creators-studio': {
    product: {
      slug: 'creators-studio',
      name: "Creator's Studio",
      tagline: 'Your content business command center — from idea to brand deal',
      price: 39900,
      category: 'Creative',
      badge: 'NEW',
      status: 'live',
      impact: "Designed for Africa's 2M+ content creators",
      topFeatures: ['Content Projects', 'Brand Partnerships', 'Analytics Tracker'],
    },
    description: `The Creator's Studio is a complete business operating system for content creators, digital creatives, and personal brands. It brings your entire content operation — ideation, production, scheduling, analytics, and brand partnerships — into one relational Notion workspace.

Built for Africa's creator economy, where most creators are building businesses without the infrastructure that corporate brands take for granted. This system gives you that infrastructure.`,
    features: [
      { title: 'Content Projects', description: 'Your live content calendar — every piece from concept to published, across Instagram, TikTok, YouTube, LinkedIn, and more', icon: 'layout' },
      { title: 'Idea Bank', description: 'Capture content ideas the moment they hit, develop them into briefs, and pull from your bank on batch days', icon: 'lightbulb' },
      { title: 'Content Batch Tracker', description: 'Plan and log batch production sessions with asset checklists, filming logs, and editing queues', icon: 'film' },
      { title: 'Analytics Tracker', description: "Record performance data across platforms, spot what's working, and let data inform your next idea cycle", icon: 'bar-chart' },
      { title: 'Brand Partnerships', description: 'Manage inbound and outbound brand deals — rates, deliverables, deadlines, payment tracking, and post-campaign reporting', icon: 'briefcase' },
      { title: 'Creative Habits', description: 'Build the sustainable daily routine that separates consistent creators from burnout creators', icon: 'zap' },
    ],
    faqs: COMMON_FAQS_NOTION,
    testimonials: [],
  },

  'music-artist-career-command-center': {
    product: {
      slug: 'music-artist-career-command-center',
      name: 'Music Artist Career Command Center',
      tagline: 'The SA music industry intelligence system — pre-loaded and ready to work',
      price: 49900,
      category: 'Creative',
      status: 'live',
      impact: 'Built for 50K+ independent South African artists',
      topFeatures: ['SA Radio Stations', 'Grants & Funding', 'Music Industry Calendar'],
    },
    description: `The Music Artist Career Command Center is unlike any other music business template. Instead of an empty framework, this system comes pre-loaded with South African music industry intelligence: radio stations with submission contacts, festival application windows, music grants and funding sources, streaming playlist targets, press and blog contacts, venue databases, and a month-by-month industry calendar.

10 interconnected databases with real data — the competitive intelligence that most artists spend years accumulating on their own.`,
    features: [
      { title: 'Music Industry Calendar', description: 'Month-by-month SA music industry timeline — release windows, festival application deadlines, award seasons, grant submission periods', icon: 'calendar' },
      { title: 'SA Radio Stations', description: 'Pre-loaded database of 50+ South African radio stations with contact details, format specs, and submission requirements', icon: 'radio' },
      { title: 'Music Press & Blogs', description: 'Media contacts, editorial calendars, and submission guidelines for SA music press and digital blogs', icon: 'file-text' },
      { title: 'Festivals & Venues', description: 'SA music festivals with application windows and performance venues with booking contacts', icon: 'music' },
      { title: 'Grants & Funding', description: 'Government and private music funding opportunities with eligibility criteria, amounts, and application deadlines', icon: 'dollar-sign' },
      { title: 'Streaming & Distribution', description: 'Playlist pitching targets, DSP technical specs, and release planning workflow from mastering to launch', icon: 'play-circle' },
    ],
    faqs: COMMON_FAQS_NOTION,
    testimonials: [],
  },

  'high-school-academic-excellence': {
    product: {
      slug: 'high-school-academic-excellence',
      name: 'High School Academic Excellence Engine',
      tagline: 'The complete matric success system — from weekly schedule to final exam',
      price: 24900,
      category: 'Student',
      status: 'live',
      impact: 'Serving 500K+ matric students nationwide',
      topFeatures: ['Assignments & Tasks', 'Exam Prep Tracker', 'Wellness Check-ins'],
    },
    description: `The High School Academic Excellence Engine is a structured academic management system built specifically for Grade 10–12 students navigating the South African CAPS curriculum. 7 interconnected databases that manage every aspect of your academic life: subjects, assignments, study sessions, exam preparation, term goals, weekly schedule, and wellness.

Built by someone who understands that matric is not just academic pressure — it's total life pressure.`,
    features: [
      { title: 'My Subjects', description: 'Track current marks, target marks, teacher details, and required study hours per subject — your academic command centre', icon: 'book' },
      { title: 'Assignments & Tasks', description: 'Never miss a deadline again — log every assignment with due dates, marks, status, and linked study sessions', icon: 'check-square' },
      { title: 'Study Sessions', description: 'Log every study session with duration, subject, and topics covered — build your revision history automatically', icon: 'clock' },
      { title: 'Exam Prep Tracker', description: 'Structured exam preparation system — past papers completed, topics mastered, weak areas flagged, exam day planning', icon: 'target' },
      { title: 'Term Goals & Progress', description: 'Set term targets per subject, track progress weekly, and adjust your strategy before it\'s too late', icon: 'trending-up' },
      { title: 'Weekly Schedule & Wellness', description: 'Time-blocking system for balanced, sustainable days — plus wellness check-ins to protect your mental health through exam season', icon: 'heart' },
    ],
    faqs: COMMON_FAQS_NOTION,
    testimonials: [],
  },

  'varsity-academic-excellence': {
    product: {
      slug: 'varsity-academic-excellence',
      name: 'Varsity Academic Excellence Engine',
      tagline: 'Your complete university academic system — from first lecture to final exam',
      price: 27900,
      category: 'Student',
      status: 'live',
      impact: 'Built for 1M+ South African university students',
      topFeatures: ['Assignments & Tasks', 'Exam Prep Tracker', 'Wellness Check-ins'],
    },
    description: `The Varsity Academic Excellence Engine is a structured academic management system built for South African university students who want to perform at their highest level without burning out. 7 relational databases covering every dimension of university academic life: module tracking, assignment management, study session logging, exam preparation, term goal setting, weekly scheduling, and wellness monitoring.

Built for SA university students managing lectures, assignments, part-time work, and life — all at once.`,
    features: [
      { title: 'My Subjects', description: 'Track all modules with current marks, target marks, credit loads, and lecturer details — your semester at a glance', icon: 'book' },
      { title: 'Assignments & Tasks', description: 'Manage every deadline across multiple modules — due dates, submission portals, group work, and linked study sessions', icon: 'check-square' },
      { title: 'Study Sessions', description: 'Log study time by module and topic — build a revision history that makes exam prep systematic instead of desperate', icon: 'clock' },
      { title: 'Exam Prep Tracker', description: 'Plan and execute exam preparation — past papers done, topics mastered, weak areas identified, time allocated strategically', icon: 'target' },
      { title: 'Term Goals & Progress', description: 'Set performance targets by academic category, track weekly, and course-correct before results day', icon: 'trending-up' },
      { title: 'Weekly Schedule & Wellness', description: 'Time-blocking system for balancing lectures, assignments, rest, and personal life — with wellness check-ins for sustainable performance', icon: 'heart' },
    ],
    faqs: COMMON_FAQS_NOTION,
    testimonials: [],
  },

  'sme-command-center': {
    product: {
      slug: 'sme-command-center',
      name: 'SME Command Center',
      tagline: 'Your complete business operating system — clients, projects, money, and team',
      price: 44900,
      category: 'Business',
      badge: 'POPULAR',
      status: 'live',
      impact: 'Designed for 2M+ African entrepreneurs and SMEs',
      topFeatures: ['Clients Hub', 'Revenue Tracker', 'Projects Tracker'],
    },
    description: `The SME Command Center is a full business management system built for African entrepreneurs, freelancers, and SME operators who need enterprise-grade infrastructure without the enterprise price tag. 8 relational databases that replace multiple expensive tools with one coherent, customisable Notion workspace.

Built for the realities of running a business in Africa — where you're often the CEO, project manager, accountant, and sales team simultaneously.`,
    features: [
      { title: 'Clients Hub', description: 'Full CRM — manage every client relationship from lead to completed project, with contact history, contract values, and follow-up reminders', icon: 'users' },
      { title: 'Projects Tracker', description: 'Track every project from brief to delivery — status, deadlines, linked tasks, client, revenue, and team members in one view', icon: 'git-branch' },
      { title: 'Revenue Tracker', description: 'Log every income entry, link it to a client and project, and build a real-time picture of your business financial performance', icon: 'trending-up' },
      { title: 'Tasks Command Center', description: 'Daily and weekly task management linked to projects and clients — prioritised, deadline-tracked, and never lost in a chat thread', icon: 'check-square' },
      { title: 'Expenses & Inventory', description: 'Track business costs against budgets and manage stock or supplies — linked to projects for accurate job costing', icon: 'package' },
      { title: 'Team & Documents', description: 'Staff directory with roles and contacts, plus a central document library for contracts, proposals, and business records', icon: 'folder' },
    ],
    faqs: COMMON_FAQS_NOTION,
    testimonials: [],
  },
};

const SUPABASE_IMG = 'https://bemgnttmaqpmsaosdisc.supabase.co/storage/v1/object/public/product-images';

export const ALL_PRODUCTS: ProductCoverData[] = [
  {
    slug: 'writers-sanctuary',
    name: "Writer's Sanctuary",
    tagline: 'Your complete creative writing system — from first idea to final submission',
    price: 29900,
    category: 'Creative',
    badge: 'BESTSELLER',
    status: 'live',
    thumbnail: `${SUPABASE_IMG}/writers-sanctuary/cover-page.png`,
    impact: 'Built for 500K+ aspiring African writers',
    topFeatures: ['Writing Projects', 'Submission Tracker', 'Idea Vault'],
  },
  {
    slug: 'creators-studio',
    name: "Creator's Studio",
    tagline: 'Your content business command center — from idea to brand deal',
    price: 39900,
    category: 'Creative',
    badge: 'NEW',
    status: 'live',
    thumbnail: `${SUPABASE_IMG}/creators-studio/cover-page.png`,
    impact: "Designed for Africa's 2M+ content creators",
    topFeatures: ['Content Projects', 'Brand Partnerships', 'Analytics Tracker'],
  },
  {
    slug: 'music-artist-career-command-center',
    name: 'Music Artist Career Command Center',
    tagline: 'The SA music industry intelligence system — pre-loaded and ready to work',
    price: 49900,
    category: 'Creative',
    status: 'live',
    thumbnail: `${SUPABASE_IMG}/music-artist/cover-page.png`,
    impact: 'Built for 50K+ independent South African artists',
    topFeatures: ['SA Radio Stations', 'Grants & Funding', 'Music Industry Calendar'],
  },
  {
    slug: 'high-school-academic-excellence',
    name: 'High School Academic Excellence Engine',
    tagline: 'The complete matric success system — from weekly schedule to final exam',
    price: 24900,
    category: 'Student',
    status: 'live',
    thumbnail: `${SUPABASE_IMG}/high-school/cover-photo.png`,
    impact: 'Serving 500K+ matric students nationwide',
    topFeatures: ['Assignments & Tasks', 'Exam Prep Tracker', 'Wellness Check-ins'],
  },
  {
    slug: 'varsity-academic-excellence',
    name: 'Varsity Academic Excellence Engine',
    tagline: 'Your complete university academic system — from first lecture to final exam',
    price: 27900,
    category: 'Student',
    status: 'live',
    thumbnail: `${SUPABASE_IMG}/varsity/cover-page.png`,
    impact: 'Built for 1M+ South African university students',
    topFeatures: ['Assignments & Tasks', 'Exam Prep Tracker', 'Wellness Check-ins'],
  },
  {
    slug: 'sme-command-center',
    name: 'SME Command Center',
    tagline: 'Your complete business operating system — clients, projects, money, and team',
    price: 44900,
    category: 'Business',
    badge: 'POPULAR',
    status: 'live',
    thumbnail: `${SUPABASE_IMG}/sme/cover-page.png`,
    impact: 'Designed for 2M+ African entrepreneurs and SMEs',
    topFeatures: ['Clients Hub', 'Revenue Tracker', 'Projects Tracker'],
  },
];

// Used for "related products" fallback
export const RELATED_PRODUCTS: ProductCoverData[] = ALL_PRODUCTS.slice(0, 3);
