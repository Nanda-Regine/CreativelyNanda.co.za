'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, TestimonialCard, Badge } from '@/components/ui';

// Work Experience Data - Complete from Profile
const workExperience = [
  {
    company: 'Mirembe Muse (Pty) Ltd',
    location: 'South Africa',
    roles: [
      {
        title: 'Founder | Creative Technologist',
        period: 'September 2025 - Present',
        type: 'Self-Employed',
        highlights: [
          'Founder and Technical Lead of Mirembe Muse (Pty) Ltd — 8 production applications, 1,000+ GitHub commits, 3+ paying clients. One year.',
          'Digital Services vertical: AI engineering, full-stack development, multi-agent systems, Notion consulting',
          'Wellness Brand vertical: Sanyu Botanicals — ancestral African hair care with AI-powered consultations and Angel loyalty programme',
          'Creative Studio vertical: Inside Her Roses (published poetry), mentorship, digital products',
          'Set technical architecture across 8 products spanning Next.js, Expo (iOS/Android/Web), Claude API, Supabase, Inngest, and Upstash Vector RAG',
          'Manage business compliance: CIPC registration, SARS, POPIA Registration No. 2026-005658',
          'Building in public, shipping production-grade software while documenting the process for Africa\'s next generation of builders'
        ],
        tech: ['Next.js', 'TypeScript', 'Expo SDK 52', 'Supabase', 'Anthropic Claude API', 'Upstash Vector', 'Inngest', 'PayFast', 'Paystack', 'Tailwind CSS', 'NativeWind', 'Vercel']
      },
      {
        title: 'AI Systems Architect | JarvisOS — Personal AI OS',
        period: 'January 2026 - Present',
        type: 'Self-Built',
        highlights: [
          '15-wing personal AI operating system — the most architecturally complex project in the portfolio, built for personal daily use across every life domain',
          'Intelligence Wings: CEO (decisions), Finance (cash flow), Engineering (build logs), Marketing (campaigns), Cycle (menstrual intelligence), Scholar (learning), Corpus (RAG Q&A), Body (health), Sanyu (wellness), Client Portal, UX Intelligence, Docs, Consulting, Autobiography, Crisis/Sankofa',
          'RAG Architecture: Upstash Vector with 1,194 personal knowledge chunks — Corpus wing answers questions from ingested documents via semantic retrieval',
          'Redis Signal Protocol: custom inter-wing pub/sub communication via Upstash Redis — 15 wings communicate without direct coupling, true event-driven architecture',
          'Model Routing: Claude Sonnet for high-stakes reasoning wings (CEO, Corpus, Consulting), Haiku for speed tasks — 85% AI cost reduction without quality loss',
          'Offline-first PWA with IndexedDB queue for load-shedding resilience; Notion bidirectional sync; 11 South African languages; 12 custom wing-aware color palettes',
          'Inngest async queues for long-running jobs; 6+ months continuous active development; 327+ commits'
        ],
        tech: ['Next.js 14', 'TypeScript', 'Claude Sonnet + Haiku (model routing)', 'Upstash Vector (RAG)', 'Upstash Redis (signal protocol)', 'Supabase', 'Inngest', 'PWA (offline-first)', 'Framer Motion']
      },
      {
        title: 'Brand Architect & Technical Founder | Sanyu Botanicals',
        period: 'April 2026 - Present',
        type: 'Self-Employed',
        highlights: [
          'Built an African botanical hair care brand from concept to live e-commerce in 6 weeks — rooted in 5 ancestral clan lineages: Nsenene, Hlubi, Msimango, Thabizolo, Tshawe',
          'Three product formulations: Signature Oil (R285), Hair Growth Balm (R245–R345), and bundles — ancestral botanical knowledge documented in both clinical and cultural terms',
          'AI hair consultation engine: Claude Sonnet recommends the right product from a full routine description, personalised to each customer',
          'Angel loyalty programme: Seed → Bloom → Royal Angel tiers with a physical-digital QR card system — loyalty card triggers digital journal unlock',
          'Private AI-powered hair journal (Angel members only): Claude Haiku surfaces personalised tips from journal entries over time, learning the customer\'s hair journey',
          'Full e-commerce with PayFast ZAR, Supabase RLS multi-tenant, Cloudinary product image delivery, Resend transactional email flows, PostHog analytics'
        ],
        tech: ['Next.js 14', 'TypeScript', 'Claude Sonnet + Haiku', 'PayFast', 'Supabase', 'Cloudinary', 'Resend', 'PostHog', 'Sentry', 'Vercel ISR']
      },
      {
        title: 'Full-Stack Product Engineer | AdminOS & StokvelOS',
        period: 'March 2026 - Present',
        type: 'Self-Employed',
        highlights: [
          'Architecting enterprise-grade AI operating systems for South African SMEs and community savings groups (stokvels) — R11B market with no digital infrastructure',
          'AdminOS: 6 specialist AI agents (Alex/inbox, Chase/debt-recovery, Care/wellness, Doc/document-intelligence, Insight/analytics, Pen/email-composer) with model routing and ZAR token cost controls',
          'Multi-tenancy: Supabase RLS scopes every database query by tenant_id from JWT — two Supabase client instances, strict isolation, immutable audit log with UPDATE/DELETE revoked at privilege level',
          'Per-tenant AI economics: daily token budgets (25K trial → 2M enterprise), hourly spike detection at 50% threshold, abuse blocking, and async ZAR cost logging',
          '25 Inngest async functions: daily briefs, debt recovery sequences, wellness fan-outs, payroll distribution, onboarding sequences, contextual triggers',
          'WhatsApp-native via Meta Cloud API v19.0; Xero accounting integration; companion React Native mobile app (EAS build); load-shedding-aware PWA'
        ],
        tech: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind 4', 'Supabase', 'PostgreSQL RLS', 'Claude Sonnet + Haiku + Opus', 'Inngest', 'Upstash Redis', 'Meta WhatsApp API', 'PayFast', 'Xero', 'Expo (companion app)']
      },
      {
        title: 'Lead Developer | VarsityOS & WatchSankofa',
        period: 'February 2026 - April 2026',
        type: 'Self-Employed',
        highlights: [
          'Building high-impact, localized platforms for student logistics and cultural media preservation',
          'Product Launch: Directed the end-to-end build and deployment of varsityos.co.za, a logistics platform solving student utility fragmentation in the SA university ecosystem',
          'Performance UX: Optimized media-heavy interfaces for WatchSankofa, ensuring seamless video playback and interaction on low-bandwidth mobile devices',
          'Full-Stack Deployment: Managed DNS, SSL, and localized hosting (.co.za) to ensure high-availability for local users'
        ],
        tech: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Vercel']
      },
      {
        title: 'System Architect | Digital Infrastructure',
        period: 'November 2025 - April 2026',
        type: 'Self-Employed',
        highlights: [
          'Specialized in the design and implementation of relational "Business Operating Systems" (BOS) using Notion and integrated automation tools to centralize complex, high-velocity operational workflows',
          'Information Architecture: Engineered an end-to-end relational ecosystem to centralize decentralized business data, replacing fragmented legacy toolchains with a unified "Source of Truth"',
          'Advanced Relational Design: Architected complex database schemas featuring multi-level relations, advanced rollups, and formula-driven logic to track real-time inventory, financial dependencies, and project lifecycles',
          'Workflow Engineering: Designed and deployed automated internal dashboards that standardized cross-functional communication, resulting in a 40% reduction in administrative overhead',
          'Built intuitive, high-performance interfaces (Notion-native) optimized for rapid data entry and executive-level reporting in high-pressure environments'
        ],
        tech: ['Notion', 'Database Architecture', 'Workflow Automation', 'AI Integration']
      }
    ]
  },
  {
    company: 'CreativelyNanda',
    location: 'South Africa',
    roles: [
      {
        title: 'Full-Stack Web Developer | CreativelyNanda',
        period: 'January 2026 - February 2026',
        type: 'Portfolio & Client Work',
        highlights: [
          'Developed a high-performance portfolio and service platform using modern web standards to showcase creative and technical work',
          'Modern Stack Implementation: Built a fully responsive web presence using TypeScript and Tailwind CSS, prioritizing clean code and sub-second loading times',
          'Client Interaction Logic: Integrated custom contact and booking flows to streamline user acquisition and service delivery'
        ],
        tech: ['TypeScript', 'Tailwind CSS', 'Next.js', 'Vercel']
      },
      {
        title: 'Co-Founder & Technical Lead | True Access (Disability Accessibility Platform)',
        period: 'June 2026 - Present',
        type: 'Co-Founded',
        highlights: [
          'SA\'s first disability accessibility mapping platform — universal Expo app running iOS, Android, and Web from a single codebase serving 4.2 million South Africans with disabilities',
          '7 complete build phases shipped in 2 days: maps, audits, profiles, business portal, shop, Paystack payments, offline mode + GeoJSON data export API',
          'SANS 10400-S compliance audit checklists with photo evidence; disability-profile-aware map filtering (8 disability types, 15+ filter combinations)',
          'B2B revenue flywheel: audit → compliance gap analysis → compliance product sales → featured listing (co-founder manufactures physical ramps)',
          'Mapbox offline tile caching for load-shedding resilience; Supabase Edge Functions (Deno); Paystack HMAC-SHA512 webhook verification',
          'GeoJSON data export API with licensing potential for World Bank, Apple Maps, Google Maps, and SA municipality contracts'
        ],
        tech: ['Expo SDK 52', 'TypeScript', 'Expo Router v4', 'NativeWind v4', 'Mapbox (native + web)', 'Supabase', 'Paystack', 'TanStack Query v5', 'Zustand', 'Zod']
      },
      {
        title: 'Junior Developer | Cortex Hub Booking App',
        period: 'August 2025 - September 2025',
        type: 'Client Project',
        highlights: [
          'My first production deployment — a resource management and booking application for a tech hub environment',
          'Foundation Building: Transitioned from zero coding knowledge to shipping a functional, CRUD-based booking system within 8 weeks',
          'State Management: Learned the fundamentals of managing user sessions and real-time availability updates in a live production environment'
        ],
        tech: ['JavaScript', 'Supabase', 'CSS']
      }
    ]
  },
  {
    company: 'Balkan Burger',
    location: 'Port Elizabeth, Eastern Cape, South Africa',
    roles: [
      {
        title: 'Manager',
        period: 'January 2024 - December 2024',
        type: 'Full-time',
        highlights: [
          'Led operational transformation through systems design and data-driven management',
          'Directed daily operations and managed a cross-functional team of 15+ staff',
          'Digitized manual processes, reducing administrative overhead by 35%',
          'Built and documented operational systems, SOPs, and training materials',
          'Designed analytics dashboards tracking sales, labor, inventory, and performance',
          'Reduced inventory waste by 22% and improved profitability by 18%',
          'Transformed paper-based operations into a digitized, system-driven model'
        ],
        tech: ['Notion', 'Data Analysis', 'Systems Design', 'Team Leadership']
      },
      {
        title: 'Event Coordinator',
        period: 'June 2023 - June 2024',
        type: 'Full-time',
        highlights: [
          'Executed comprehensive event plans involving detailed timelines and logistics',
          'Achieved 30% increase in operational efficiency for events with 100–500+ guests',
          'Leveraged social media and digital marketing to boost event attendance by 40%',
          'Generated 20% increase in sales/ticket revenue through targeted campaigns',
          'Analysed post-event data contributing to 25% cost reduction and 35% higher satisfaction'
        ],
        tech: ['Event Management', 'Digital Marketing', 'Data Analysis']
      },
      {
        title: 'Team Leader',
        period: 'July 2023 - December 2023',
        type: 'Full-time',
        highlights: [
          'Provided hands-on leadership with clear goals and performance expectations',
          'Led to 40% improvement in team productivity and boosted staff morale',
          'Trained and upskilled 10+ staff members on service excellence and sales techniques',
          'Achieved 30% increase in upsell conversions and 4.8/5 customer satisfaction rating',
          'Contributed to menu development leading to 20% increase in high-margin item sales'
        ],
        tech: ['Leadership', 'Training', 'Sales Strategy']
      },
      {
        title: 'Marketing Assistant',
        period: 'January 2023 - December 2023',
        type: 'Full-time',
        highlights: [
          'Supported marketing initiatives by analysing consumer behavior and competitors',
          'Contributed to 25% increase in campaign ROI',
          'Produced innovative campaign ideas resulting in 35% boost in brand visibility',
          'Achieved 15% growth in social media engagement over three months'
        ],
        tech: ['Marketing', 'Analytics', 'Social Media']
      },
      {
        title: 'Senior Waitress',
        period: 'April 2023 - June 2023',
        type: 'Full-time',
        highlights: [
          'Authored the company\'s operations manual standardizing workflows',
          'Improved service speed by 30% and reduced onboarding time by 50%',
          'Increased sales by 25% through strategic promotion of high-margin items',
          'Independently planned and executed 10+ successful events',
          'Led to 40% increase in event bookings'
        ],
        tech: ['Documentation', 'Event Planning', 'Sales']
      },
      {
        title: 'Junior Waitress',
        period: 'January 2023 - March 2023',
        type: 'Full-time',
        highlights: [
          'Delivered excellent customer service and gained foundational hospitality skills',
          'Learned operational systems and service protocols',
          'Demonstrated quick learning ability and strong work ethic'
        ],
        tech: ['Customer Service', 'Hospitality']
      }
    ]
  },
  {
    company: 'Distilled Photography',
    location: 'Port Elizabeth, Eastern Cape, South Africa',
    roles: [
      {
        title: 'Content Specialist',
        period: 'August 2024 - October 2024',
        type: 'Contract',
        highlights: [
          'Wrote SEO-optimized descriptions for photography assets',
          'Managed metadata and classification in large digital asset systems',
          'Collaborated with photographers to maintain consistency and accuracy'
        ],
        tech: ['SEO', 'Digital Asset Management', 'Content Writing']
      }
    ]
  },
  {
    company: 'Freelance',
    location: 'Port Elizabeth, Eastern Cape, South Africa',
    roles: [
      {
        title: 'Workshop Coordinator',
        period: 'March 2023 - August 2023',
        type: 'Self-Employed',
        highlights: [
          'Self-funded and organized successful book launch for "Inside Her Roses"',
          'Combined poetry workshop and dining experience attracting 100+ attendees',
          'Developed innovative poetry workshop framework enabling 30+ aspiring writers',
          'Increased workshop attendance by 40% over six months',
          'Organized and hosted multiple poetry open mic events for 20+ emerging poets'
        ],
        tech: ['Event Management', 'Workshop Design', 'Community Building']
      },
      {
        title: 'Author',
        period: 'October 2021',
        type: 'Self-Published',
        highlights: [
          'Published "Inside Her Roses", a poetry collection distributed internationally',
          'Available through major retailers including Amazon and Barnes & Noble',
          'Featured poet on South African TV series "Gqeberha: The Empire" (2023)',
          'Organized book launches and poetry workshops'
        ],
        tech: ['Publishing', 'Creative Writing', 'Public Speaking']
      }
    ]
  },
  {
    company: 'Sportsmans Warehouse',
    location: 'KuGompo City, Eastern Cape, South Africa',
    roles: [
      {
        title: 'Receiving Clerk',
        period: 'October 2021 - January 2023',
        type: 'Full-time',
        highlights: [
          'Received and unloaded 100+ shipments monthly of sports equipment and apparel',
          'Verified shipment contents with 99% accuracy minimizing inventory discrepancies',
          'Ensured proper labeling reducing stock retrieval time by 25%'
        ],
        tech: ['Inventory Management', 'Logistics']
      },
      {
        title: 'Cashier',
        period: 'January 2020 - January 2023',
        type: 'Full-time',
        highlights: [
          'Delivered excellent customer service with 99% transaction accuracy',
          'Reduced average wait times by 15%',
          'Compiled Daily Banking Statement Reports with 100% accuracy',
          'Managed device repair requests improving turnaround time by 20%'
        ],
        tech: ['POS Systems', 'Financial Reconciliation', 'Customer Service']
      },
      {
        title: 'Sales Assistant',
        period: 'January 2019 - January 2023',
        type: 'Full-time',
        highlights: [
          'Contributed to 30% increase in customer satisfaction scores',
          'Drove 25% boost in upsell and cross-sell opportunities',
          'Consistently met or exceeded monthly sales targets by 15%',
          'Maintained low return rate of under 5% fostering customer loyalty'
        ],
        tech: ['Sales', 'Product Knowledge', 'Customer Relations']
      }
    ]
  },
 
  {
    company: 'St John Ambulance',
    location: 'KuGompo City, Eastern Cape, South Africa',
    roles: [
      {
        title: 'First Aid Instructor',
        period: 'February 2016 - November 2018',
        type: 'Volunteer',
        highlights: [
          'Achieved First Aid Level 3 certification and promoted to Corporal',
          'Provided first aid coverage for school sports derby days and match days',
          'Trained and mentored junior members'
        ],
        tech: ['First Aid', 'Emergency Response', 'Training']
      }
    ]
  }
];


// Expandable Role Component
function RoleCard({ role, isExpanded, onToggle, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="relative"
    >
      <button
        onClick={onToggle}
        className="w-full text-left group"
      >
        <div className={`
          relative overflow-hidden transition-all duration-500
          ${isExpanded 
            ? 'bg-gradient-to-br from-[#C1292E]/10 via-[#E8DCC4]/20 to-[#B8860B]/10 rounded-[32px] p-6 md:p-8' 
            : 'bg-white/60 backdrop-blur-sm hover:bg-white/80 rounded-[24px] p-5 md:p-6 hover:shadow-lg'
          }
        `}>
          {/* Decorative corner accent */}
          <div className={`
            absolute top-0 right-0 w-24 h-24 transition-all duration-500
            ${isExpanded ? 'bg-[#C1292E]/20' : 'bg-[#B8860B]/10 group-hover:bg-[#C1292E]/15'}
          `} style={{ borderRadius: '0 24px 0 100%' }} />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h4 className={`
                  font-display text-xl md:text-2xl font-bold transition-colors duration-300
                  ${isExpanded ? 'text-[#C1292E]' : 'text-[#0A1128] group-hover:text-[#C1292E]'}
                `}>
                  {role.title}
                </h4>
                <motion.span
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-[#C1292E] text-lg"
                >
                  ↓
                </motion.span>
              </div>
              <p className="text-[#0A1128]/60 text-sm md:text-base">{role.period}</p>
            </div>
            <span className={`
              px-4 py-2 rounded-full text-xs md:text-sm font-medium self-start md:self-auto
              ${isExpanded 
                ? 'bg-[#C1292E] text-white' 
                : 'bg-[#0A1128]/10 text-[#0A1128]/70 group-hover:bg-[#C1292E]/20 group-hover:text-[#C1292E]'
              }
            `}>
              {role.type}
            </span>
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="mt-6 pt-6 border-t border-[#0A1128]/10">
                  <ul className="space-y-3 mb-6">
                    {role.highlights.map((highlight, i) => (
                      <motion.li 
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + i * 0.05 }}
                        className="flex items-start gap-3 text-[#0A1128]/80"
                      >
                        <span className="text-[#C1292E] mt-1.5 text-xs">◆</span>
                        <span className="text-sm md:text-base leading-relaxed">{highlight}</span>
                      </motion.li>
                    ))}
                  </ul>
                  
                  <div className="flex flex-wrap gap-2">
                    {role.tech.map((tech, i) => (
                      <motion.span 
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + i * 0.05 }}
                        className="px-3 py-1.5 bg-[#0A1128] text-[#E8DCC4] rounded-full text-xs font-medium"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </button>
    </motion.div>
  );
}


export default function Work() {
  const [expandedRoles, setExpandedRoles] = useState([]);

  const toggleRole = (roleId) => {
    setExpandedRoles(prev =>
      prev.includes(roleId)
        ? prev.filter(id => id !== roleId)
        : [...prev, roleId]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8DCC4] via-[#F5EFE6] to-[#E8DCC4]">
      {/* Subtle texture overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ===== HERO SECTION ===== */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 px-6 overflow-hidden">
        {/* Decorative shapes */}
        <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-[#C1292E]/15 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gradient-to-tr from-[#B8860B]/10 to-transparent rounded-full blur-2xl" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          {/* Editorial header line */}
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="flex items-center gap-6 mb-8"
          >
            <div className="w-20 md:w-32 h-px bg-[#0A1128]" />
            <span className="text-[#0A1128] text-xs md:text-sm font-medium tracking-[0.3em] uppercase whitespace-nowrap">
              Professional Journey
            </span>
            <div className="flex-1 h-px bg-[#0A1128]/20" />
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-[#0A1128] mb-6"
          >
            Work <span className="text-[#C1292E]">Experience</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-[#0A1128]/70 max-w-2xl leading-relaxed"
          >
            From hospitality leadership to full-stack development — a journey of continuous 
            growth, systems thinking, and creative problem-solving.
          </motion.p>

          {/* Download buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-4 mt-8"
          >
            <Button
              variant="secondary"
              size="lg"
              className="rounded-full"
              leftIcon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              }
              onClick={() => window.open('/assets/work/Nanda-cv.pdf', '_blank')}
            >
              Download CV
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="rounded-full"
              leftIcon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              }
              onClick={() => window.open('/assets/work/Letter-of-Recommendation.pdf', '_blank')}
            >
              Letter of Recommendation
            </Button>

            <Button
              variant="primary"
              size="lg"
              className="rounded-full bg-[#B8860B] hover:bg-[#B8860B]/90"
              leftIcon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              }
              onClick={() => window.location.href = '/testimonials'}
            >
              Read Testimonials
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ===== EXPERIENCE TIMELINE ===== */}
      <section className="relative py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-6 mb-12"
          >
            <div className="w-16 md:w-24 h-px bg-[#C1292E]" />
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[#0A1128]">
              Career <span className="text-[#C1292E]">Timeline</span>
            </h2>
          </motion.div>

          {/* Experience cards */}
          <div className="space-y-8 md:space-y-12">
            {workExperience.map((company, companyIndex) => (
              <motion.div
                key={company.company}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: companyIndex * 0.1 }}
                className="relative"
              >
                {/* Company header */}
                <div 
                  className="relative bg-gradient-to-r from-[#0A1128] to-[#1a2744] p-6 md:p-8 mb-4 overflow-hidden"
                  style={{ borderRadius: '32px 12px 32px 12px' }}
                >
                  {/* Decorative accent */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#C1292E]/20 rounded-full blur-2xl" />
                  
                  <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div>
                      <h3 className="font-display text-2xl md:text-3xl font-bold text-[#E8DCC4]">
                        {company.company}
                      </h3>
                      <p className="text-[#E8DCC4]/60 text-sm md:text-base">{company.location}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-4 py-2 bg-[#C1292E]/20 text-[#C1292E] rounded-full text-sm font-medium">
                        {company.roles.length} {company.roles.length === 1 ? 'Role' : 'Roles'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Roles */}
                <div className="space-y-3 pl-4 md:pl-8 border-l-2 border-[#B8860B]/30 ml-4 md:ml-8">
                  {company.roles.map((role, roleIndex) => {
                    const roleId = `${company.company}-${role.title}`;
                    const isExpanded = expandedRoles.includes(roleId);
                    
                    return (
                      <RoleCard
                        key={roleId}
                        role={role}
                        isExpanded={isExpanded}
                        onToggle={() => toggleRole(roleId)}
                        index={roleIndex}
                      />
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS LINK ===== */}
      <section className="relative py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 md:p-8 bg-[#0A1128] rounded-[24px]"
          >
            <div>
              <p className="text-[#B8860B] text-xs tracking-[0.3em] uppercase font-sans mb-1">LinkedIn Recommendations</p>
              <p className="text-white font-display text-xl font-bold">6 colleagues. One consistent verdict.</p>
            </div>
            <a
              href="/testimonials"
              className="shrink-0 px-7 py-3 bg-[#C1292E] text-white rounded-full font-semibold text-sm hover:bg-[#C1292E]/90 transition-all hover:scale-105"
            >
              Read all recommendations →
            </a>
          </motion.div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="relative py-16 md:py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-8 md:p-12 bg-gradient-to-br from-[#C1292E] to-[#8B1E22] overflow-hidden"
            style={{ borderRadius: '48px 16px 48px 16px' }}
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#B8860B]/30 rounded-full blur-xl" />
            
            <div className="relative z-10">
              <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Work Together?
              </h3>
              <p className="text-white/80 mb-8 max-w-lg mx-auto">
                Whether you need full-stack development, Notion systems, or creative technology solutions — 
                let's build something extraordinary.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  size="lg"
                  className="rounded-full bg-white text-cherry hover:bg-cream"
                  onClick={() => window.location.href = '/contact'}
                >
                  Get in Touch
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full border-white text-white hover:bg-white/10"
                  onClick={() => window.location.href = '/projects'}
                >
                  View Projects
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}