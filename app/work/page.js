'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Work Experience Data - Complete from Profile
const workExperience = [
  {
    company: 'Mirembe Muse (Pty) Ltd',
    location: 'East London, Eastern Cape, South Africa',
    roles: [
      {
        title: 'Creative Technologist & Founder',
        period: 'December 2025 - Present',
        type: 'Self-Employed',
        highlights: [
          'Architecting and developing full-stack web applications using React, Next.js, and modern JavaScript (ES6+)',
          'Building production systems with Supabase (authentication, databases, real-time features) and Mapbox GL',
          'Designing AI-assisted development workflows that accelerate build cycles by 60%',
          'Creating custom GPT prompt frameworks for automated documentation and SOPs',
          'Implementing AI chatbots and business automation using OpenAI API',
          'Designing end-to-end Notion operating systems (CRM, finance, projects, knowledge bases)',
          'Productizing 15+ Notion templates for students, SMEs, and creative professionals'
        ],
        tech: ['React', 'Next.js', 'TypeScript', 'Supabase', 'OpenAI API', 'Mapbox GL', 'Framer Motion']
      }
    ]
  },
  {
    company: 'Freelance',
    location: 'East London, Eastern Cape, South Africa',
    roles: [
      {
        title: 'Notion Consulting',
        period: 'November 2025 - Present',
        type: 'Freelance',
        highlights: [
          'Designing and implementing business operating systems in Notion',
          'CRM systems with pipeline tracking and automated follow-ups',
          'Financial management systems with dashboards and structured chart of accounts',
          'Reduced client administrative time by 40–60% through automation',
          'Delivered scalable systems adaptable to growing teams'
        ],
        tech: ['Notion', 'Database Architecture', 'Workflow Automation', 'AI Integration']
      }
    ]
  },
  {
    company: 'CreativelyNanda | Portfolio & Client Projects',
    location: 'East London, Eastern Cape, South Africa',
    roles: [
      {
        title: 'Full-stack Developer',
        period: 'June 2025 - Present',
        type: 'Portfolio & Client Work',
        highlights: [
          'Built True Access App: full-stack location-based service platform from scratch',
          'Frontend: HTML5, CSS3, JavaScript (ES6+) with mobile-first responsive design',
          'Backend: Supabase for authentication, real-time database, and serverless functions',
          'Mapping: Mapbox GL JS for interactive geospatial visualization',
          'Building CreativelyNanda.co.za using React and Next.js with AI chatbot integration',
          'SEO optimization and performance tuning targeting 95+ Lighthouse scores'
        ],
        tech: ['React', 'Next.js', 'Supabase', 'Mapbox GL', 'Tailwind CSS', 'Vercel']
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
    location: 'East London, Eastern Cape, South Africa',
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
    location: 'East London, Eastern Cape, South Africa',
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

// LinkedIn Recommendations Data
const recommendations = [
  {
    name: 'Zintle Joko',
    title: 'Entrepreneur | Events Planner | Founder of Joko & Co | Social Media Manager | Creative Visionary',
    date: 'August 25, 2025',
    relationship: 'Worked with Nanda on the same team',
    text: `I had the absolute privilege of working alongside Nanda as a fellow manager at Balkan Burger, and I can confidently say she is the best person I have ever worked with. From the moment she started, she made an incredible impact, bringing structure, creativity, and positivity that completely elevated the workplace.

Nanda has an amazing work ethic and is one of the most reliable professionals I know. She approaches challenges with innovative problem-solving skills, never settling for quick fixes but instead finding sustainable, smart solutions. Her attention to detail is unmatched, and she has a gift for balancing efficiency with creativity in a way that makes everything run smoothly.

What really sets Nanda apart is her positive attitude and sense of humor, which made even the most stressful days enjoyable. She creates an environment where people feel supported, motivated, and inspired to bring their best. She's not only a strong leader but also an incredible team player who always puts the bigger picture first.`
  },
  {
    name: 'Bojan Ivanović',
    title: 'Co-Founder at Balkan Burger Pty Ltd',
    date: 'January 19, 2025',
    relationship: 'Bojan managed Nanda directly',
    text: `I had the absolute privilege of working alongside Nanda Regine for two transformative years at Balkan Burger, where she held the role of Junior Manager. Let me tell you, Nanda is one of those rare gems who not only meets expectations but consistently redefines what excellence looks like.

Nanda has an unmatched ability to balance strategy with execution but what truly sets her apart is her exceptional emotional intelligence and natural leadership. She possesses a remarkable ability to understand team dynamics, foster open communication, and respond to challenges with empathy and clarity, creating a culture of trust and collaboration. Nanda's talent for rallying teams, inspiring creativity, and aligning everyone around a shared vision has consistently driven both morale and results, making her an invaluable asset of our organisation. In short, Nanda is a powerhouse of talent and energy!`
  },
  {
    name: 'Nicole Carlisle',
    title: 'Team Member at Balkan Burger',
    date: 'August 24, 2025',
    relationship: 'Nicole reported directly to Nanda',
    text: `I had the absolute pleasure of working under my manager Nanda, at Balkan Burger, and it was an incredible experience. She is one of the most helpful, efficient, and kind leaders I've worked with, always going the extra mile to guide and support her team.

Nanda's approachable nature, patience, and professionalism created a positive and motivating workplace environment where everyone felt valued. At the same time, her high standards and strong work ethic set an excellent example for us all to follow.

I am truly grateful for the skills and confidence I gained while working with her. Having such a supportive and inspiring manager made a lasting impact on my growth, both professionally and personally.`
  },
  {
    name: 'Lindokuhle Nkwanyane',
    title: 'Writer & Visual Thinker | Passionate About Storytelling',
    date: 'August 23, 2025',
    relationship: 'Lindokuhle reported directly to Nanda',
    text: `I had the pleasure of working with Nanda during her time as Manager, and I can confidently say she was a fantastic colleague to work with. She's incredibly efficient, always ensuring tasks are well-organized and clearly communicated to the team. Her regular check-in meetings kept everything on track and helped create a smooth workflow.

What stood out most was her supportive nature and positive energy—she brought a lively spirit that uplifted the entire restaurant. She's a hardworking, friendly professional who made the workplace feel both productive and enjoyable. Any team would be lucky to have her!`
  },
  {
    name: 'Amy Gajjar',
    title: 'Award-Winning Creative Consultant | Packaging Designer @ Woolworths | Brand Design, Concept Development & Creative Direction | Founder',
    date: 'September 4, 2025',
    relationship: 'Amy worked with Nanda on the same team',
    text: `Had the pleasure of working with Nanda when I was consulting at Balkan Burger in early 2024. Not only is she an amazing leader, but her attention to detail is extremely admirable. Her positivity and can-do attitude is truly inspirational and she is an asset to any business she works with.

I cannot recommend Nanda enough. Any team or company would be lucky to have her, not just for her professionalism and skills, but for the energy, vision, and heart she brings to her work.`
  },
  {
    name: 'Maqawe Mvume',
    title: 'Dreaming of bringing the world together with unique and evolutionary ideas',
    date: 'August 25, 2025',
    relationship: 'Maqawe worked with Nanda on the same team',
    text: `I had the pleasure of working alongside Nanda at Sportsmans Warehouse, where we were both retail sales assistants. During this time, I was consistently impressed by her exceptional work ethic and natural leadership skills.

Nanda approaches every task with focus, dedication, and a positive attitude, setting a high standard for those around her. She has a sharp mind and the ability to quickly understand and respond to challenges, often taking initiative to guide the team when needed. Her professionalism, reliability, and strong problem-solving skills made her a valuable asset to the workplace.

I highly commend Nanda for her outstanding contributions and have no doubt that she will excel in any role she takes on.`
  }
];

// Featured Quote from Letter of Recommendation
const featuredQuote = {
  text: "Nanda Regine is a rare and extraordinary talent who has left an indelible mark on our business. Her contributions have directly driven growth, enhanced our turnover, and solidified our foundations for the future. I have no doubt that she will continue to excel in any environment where leadership, innovation, and commitment are valued.",
  author: "Bojan Ivanovic",
  title: "Co-Founder, Balkan Burger Pty Ltd",
  date: "December 2024"
};

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

// Expandable Recommendation Component
function RecommendationCard({ rec, isExpanded, onToggle, index }) {
  const previewText = rec.text.slice(0, 200) + '...';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="relative"
    >
      <div 
        className={`
          relative overflow-hidden transition-all duration-500 cursor-pointer
          bg-white/90 backdrop-blur-sm hover:bg-white
          ${isExpanded ? 'rounded-[40px] shadow-xl' : 'rounded-[28px] hover:shadow-lg'}
        `}
        onClick={onToggle}
      >
        {/* Decorative gradient bar */}
        <div className="h-1.5 bg-gradient-to-r from-[#C1292E] via-[#B8860B] to-[#C1292E]" />
        
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="flex items-start gap-4 mb-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#C1292E] to-[#B8860B] flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
              {rec.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-display text-lg md:text-xl font-bold text-[#0A1128] truncate">
                {rec.name}
              </h4>
              <p className="text-[#0A1128]/60 text-xs md:text-sm line-clamp-2">{rec.title}</p>
              <p className="text-[#C1292E] text-xs mt-1">{rec.date}</p>
            </div>
            <motion.span
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-[#C1292E] text-xl flex-shrink-0"
            >
              ↓
            </motion.span>
          </div>
          
          {/* Quote icon */}
          <div className="text-[#B8860B]/30 text-5xl md:text-6xl font-serif leading-none mb-2">"</div>
          
          {/* Text */}
          <div className="text-[#0A1128]/80 text-sm md:text-base leading-relaxed">
            {isExpanded ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {rec.text.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="mb-4 last:mb-0">{paragraph}</p>
                ))}
              </motion.div>
            ) : (
              <p>{previewText}</p>
            )}
          </div>
          
          {/* Read more indicator */}
          <div className="mt-4 flex items-center gap-2 text-[#C1292E] text-sm font-medium">
            <span>{isExpanded ? 'Show less' : 'Read full recommendation'}</span>
            <span>→</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Work() {
  const [expandedRoles, setExpandedRoles] = useState([]);
  const [expandedRecs, setExpandedRecs] = useState([]);

  const toggleRole = (roleId) => {
    setExpandedRoles(prev => 
      prev.includes(roleId) 
        ? prev.filter(id => id !== roleId)
        : [...prev, roleId]
    );
  };

  const toggleRec = (index) => {
    setExpandedRecs(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
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
            <a
              href="/assets/work/Nanda-cv.pdf"
              download="Nanda-CV.pdf"
              className="group relative px-8 py-4 bg-[#0A1128] text-[#E8DCC4] rounded-full font-medium overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download CV
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#C1292E] to-[#B8860B] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>

            <a
              href="/assets/work/Letter-of-Recommendation.pdf"
              download="Letter-of-Recommendation.pdf"
              className="group relative px-8 py-4 border-2 border-[#0A1128] text-[#0A1128] rounded-full font-medium overflow-hidden transition-all duration-300 hover:text-[#E8DCC4] hover:shadow-lg hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Letter of Recommendation
              </span>
              <div className="absolute inset-0 bg-[#0A1128] -z-10 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ===== FEATURED QUOTE SECTION ===== */}
      <section className="relative py-16 md:py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Organic shape container */}
            <div 
              className="relative bg-[#0A1128] p-8 md:p-12 lg:p-16 overflow-hidden"
              style={{ borderRadius: '60px 20px 60px 20px' }}
            >
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-gradient-to-bl from-[#C1292E]/30 to-transparent rounded-full blur-2xl" />
              <div className="absolute bottom-0 left-0 w-32 md:w-48 h-32 md:h-48 bg-gradient-to-tr from-[#B8860B]/20 to-transparent rounded-full blur-xl" />
              
              <div className="relative z-10">
                {/* Quote mark */}
                <div className="text-[#B8860B] text-7xl md:text-9xl font-serif leading-none mb-4 md:mb-6 opacity-50">"</div>
                
                <blockquote className="font-display text-xl md:text-2xl lg:text-3xl text-[#E8DCC4] leading-relaxed mb-8">
                  {featuredQuote.text}
                </blockquote>
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-6 border-t border-[#E8DCC4]/20">
                  <div>
                    <p className="text-[#C1292E] font-display text-xl font-bold">{featuredQuote.author}</p>
                    <p className="text-[#E8DCC4]/70">{featuredQuote.title}</p>
                  </div>
                  <span className="text-[#B8860B] text-sm">{featuredQuote.date}</span>
                </div>
              </div>
            </div>
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

      {/* ===== RECOMMENDATIONS SECTION ===== */}
      <section className="relative py-16 md:py-24 px-6 bg-gradient-to-b from-transparent via-[#0A1128]/5 to-transparent">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <div className="flex items-center justify-center gap-6 mb-6">
              <div className="w-12 md:w-20 h-px bg-[#B8860B]" />
              <span className="text-[#B8860B] text-xs md:text-sm font-medium tracking-[0.3em] uppercase">Testimonials</span>
              <div className="w-12 md:w-20 h-px bg-[#B8860B]" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[#0A1128]">
              What <span className="text-[#C1292E]">Colleagues</span> Say
            </h2>
            <p className="text-[#0A1128]/60 mt-4 max-w-xl mx-auto">
              LinkedIn recommendations from managers, team members, and collaborators
            </p>
          </motion.div>

          {/* Recommendations grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {recommendations.map((rec, index) => (
              <RecommendationCard
                key={index}
                rec={rec}
                isExpanded={expandedRecs.includes(index)}
                onToggle={() => toggleRec(index)}
                index={index}
              />
            ))}
          </div>
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
                <a 
                  href="/contact"
                  className="px-8 py-4 bg-white text-[#C1292E] rounded-full font-medium hover:bg-[#E8DCC4] transition-all hover:scale-105 hover:shadow-lg"
                >
                  Get in Touch
                </a>
                <a 
                  href="/projects"
                  className="px-8 py-4 border-2 border-white text-white rounded-full font-medium hover:bg-white/10 transition-all"
                >
                  View Projects
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}