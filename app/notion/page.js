'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Jim Rohn & Systems Quotes
const quotes = [
  {
    text: "Success is nothing more than a few simple disciplines, practiced every day.",
    author: "Jim Rohn"
  },
  {
    text: "Either you run the day, or the day runs you.",
    author: "Jim Rohn"
  },
  {
    text: "Don't wish it were easier. Wish you were better.",
    author: "Jim Rohn"
  }
];

// Template Categories
const templateCategories = [
  {
    id: 'creatives',
    title: 'For Creatives',
    subtitle: 'Music Artists & Writers',
    icon: '🎨',
    color: '#C1292E',
    gradient: 'from-[#C1292E] to-[#8B1E22]',
    description: 'Organize your creative chaos. Track projects, manage releases, plan content calendars, and build your creative empire - all in one beautifully designed workspace.',
    forWho: ['Musicians', 'Songwriters', 'Authors', 'Poets', 'Content Creators', 'Visual Artists'],
    templates: [
      {
        name: 'Music Release Planner',
        description: 'From demo to distribution, track every step of your release journey',
        features: ['Release timeline', 'Promo checklist', 'Platform tracker', 'Revenue dashboard']
      },
      {
        name: 'Songwriting Vault',
        description: 'Store lyrics, melodies, and inspiration in one searchable database',
        features: ['Lyrics database', 'Collaboration tracker', 'Sample library', 'Mood boards']
      },
      {
        name: 'Author\'s Command Center',
        description: 'Plot your stories, track submissions, and manage your writing career',
        features: ['Manuscript tracker', 'Character bible', 'Submission log', 'Royalty tracker']
      },
      {
        name: 'Content Creator Hub',
        description: 'Plan, create, and schedule content across all platforms',
        features: ['Content calendar', 'Idea bank', 'Analytics tracker', 'Brand kit']
      }
    ]
  },
  {
    id: 'freelancers',
    title: 'For Freelancers',
    subtitle: 'Independent Professionals',
    icon: '💼',
    color: '#B8860B',
    gradient: 'from-[#B8860B] to-[#8B6914]',
    description: 'Run your freelance business like a pro. From client management to invoicing, project tracking to financial planning - everything you need to thrive independently.',
    forWho: ['Designers', 'Developers', 'Consultants', 'Writers', 'Marketers', 'Virtual Assistants'],
    templates: [
      {
        name: 'Freelance Business OS',
        description: 'Complete operating system for your freelance empire',
        features: ['Client CRM', 'Project pipeline', 'Invoice tracker', 'Time logging']
      },
      {
        name: 'Client Portal Template',
        description: 'Professional client-facing workspace for seamless collaboration',
        features: ['Project dashboard', 'Deliverables tracker', 'Feedback system', 'Meeting notes']
      },
      {
        name: 'Proposal & Contract Vault',
        description: 'Store, track, and reuse your winning proposals',
        features: ['Proposal templates', 'Contract library', 'Win/loss tracker', 'Pricing calculator']
      },
      {
        name: 'Income & Expense Tracker',
        description: 'Financial clarity for tax time and beyond',
        features: ['Income dashboard', 'Expense categories', 'Tax estimates', 'Quarterly reports']
      }
    ]
  },
  {
    id: 'smes',
    title: 'For SMEs',
    subtitle: 'Small & Medium Enterprises',
    icon: '🏢',
    color: '#0A1128',
    gradient: 'from-[#0A1128] to-[#1a2744]',
    description: 'Enterprise-level organization without the enterprise price tag. Streamline operations, enhance team collaboration, and make data-driven decisions.',
    forWho: ['Startups', 'Agencies', 'Retail Businesses', 'Service Providers', 'E-commerce', 'Restaurants'],
    templates: [
      {
        name: 'Business Operating System',
        description: 'Complete multi-department workspace with 16+ databases',
        features: ['Department hubs', 'KPI dashboards', 'Process docs', 'Team directory']
      },
      {
        name: 'HR & People Management',
        description: 'Manage your team from hiring to performance reviews',
        features: ['Recruitment pipeline', 'Employee database', 'Leave tracker', 'Onboarding flows']
      },
      {
        name: 'Inventory & Stock Control',
        description: 'Never run out of stock or overorder again',
        features: ['Stock levels', 'Reorder alerts', 'Supplier database', 'Cost tracking']
      },
      {
        name: 'Customer Success Hub',
        description: 'Delight customers and reduce churn systematically',
        features: ['Customer health scores', 'Feedback tracker', 'Support tickets', 'NPS surveys']
      }
    ]
  },
  {
    id: 'scholars',
    title: 'For Scholars',
    subtitle: 'Academic Excellence',
    icon: '🎓',
    color: '#2D5A27',
    gradient: 'from-[#2D5A27] to-[#1a3a17]',
    description: 'Designed for academic achievers. Research management, citation tracking, thesis planning, and publication workflows  because your research deserves organization.',
    forWho: ['PhD Candidates', 'Researchers', 'Professors', 'Graduate Students', 'Academic Writers', 'Scientists'],
    templates: [
      {
        name: 'Research Command Center',
        description: 'Manage your entire research lifecycle in one place',
        features: ['Literature database', 'Citation manager', 'Research log', 'Methodology tracker']
      },
      {
        name: 'Thesis & Dissertation Planner',
        description: 'From proposal to defense, structured for success',
        features: ['Chapter outlines', 'Writing schedule', 'Advisor meetings', 'Milestone tracker']
      },
      {
        name: 'Publication Pipeline',
        description: 'Track submissions, revisions, and acceptances',
        features: ['Journal tracker', 'Submission log', 'Reviewer feedback', 'Impact metrics']
      },
      {
        name: 'Conference & Grant Tracker',
        description: 'Never miss a deadline or opportunity',
        features: ['CFP calendar', 'Grant applications', 'Travel planner', 'Networking contacts']
      }
    ]
  },
  {
    id: 'varsity',
    title: 'Varsity Survival Kit',
    subtitle: 'University Life Mastered',
    icon: '📚',
    color: '#6B4E9B',
    gradient: 'from-[#6B4E9B] to-[#4a3570]',
    description: 'Survive and thrive at university. Balance academics, social life, finances, and self-care all while actually enjoying your university experience.',
    forWho: ['Undergraduates', 'First-Years', 'International Students', 'Student Leaders', 'Scholarship Recipients', 'Working Students'],
    templates: [
      {
        name: 'Student Life Dashboard',
        description: 'Your complete university command center',
        features: ['Class schedule', 'Assignment tracker', 'Grade calculator', 'Semester overview']
      },
      {
        name: 'Study Session Planner',
        description: 'Effective study habits made systematic',
        features: ['Pomodoro tracker', 'Subject breakdown', 'Exam countdown', 'Review schedule']
      },
      {
        name: 'Student Budget Manager',
        description: 'Stretch your student budget further',
        features: ['Income tracker', 'Expense categories', 'Savings goals', 'Bill reminders']
      },
      {
        name: 'Campus Life Organizer',
        description: 'Balance academics with everything else',
        features: ['Club memberships', 'Event calendar', 'Networking log', 'Self-care tracker']
      }
    ]
  }
];

// Expanded Category Card Component
function CategoryCard({ category, isExpanded, onToggle, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative"
    >
      <div 
        className={`
          relative overflow-hidden transition-all duration-700 ease-out
          ${isExpanded 
            ? 'bg-white rounded-[48px] shadow-2xl' 
            : 'bg-white/80 backdrop-blur-sm rounded-[32px] hover:shadow-xl hover:bg-white cursor-pointer'
          }
        `}
        onClick={() => !isExpanded && onToggle()}
      >
        {/* Top gradient bar */}
        <div className={`h-2 bg-gradient-to-r ${category.gradient}`} />
        
        {/* Card Header */}
        <div className="p-6 md:p-8 lg:p-10">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            {/* Icon */}
            <div 
              className={`
                w-20 h-20 md:w-24 md:h-24 rounded-[20px] bg-gradient-to-br ${category.gradient}
                flex items-center justify-center flex-shrink-0 shadow-lg
              `}
            >
              <span className="text-4xl md:text-5xl">{category.icon}</span>
            </div>
            
            {/* Info */}
            <div className="flex-1 min-w-0">
              <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-[#0A1128] mb-1">
                {category.title}
              </h3>
              <p className="text-[#0A1128]/60 text-base md:text-lg">{category.subtitle}</p>
              
              {/* For Who Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {category.forWho.slice(0, 4).map((who, i) => (
                  <span 
                    key={i}
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{ backgroundColor: `${category.color}15`, color: category.color }}
                  >
                    {who}
                  </span>
                ))}
                {category.forWho.length > 4 && (
                  <span className="px-3 py-1 text-xs text-[#0A1128]/50">
                    +{category.forWho.length - 4} more
                  </span>
                )}
              </div>
            </div>
            
            {/* Expand Button */}
            <button
              onClick={(e) => { e.stopPropagation(); onToggle(); }}
              className="self-start md:self-center"
            >
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.4 }}
                className={`
                  w-12 h-12 rounded-full flex items-center justify-center transition-colors
                  ${isExpanded ? 'text-white' : 'text-[#0A1128]'}
                `}
                style={{ backgroundColor: isExpanded ? category.color : `${category.color}20` }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </motion.div>
            </button>
          </div>

          {/* Description - Always visible */}
          <p className="text-[#0A1128]/70 text-base md:text-lg leading-relaxed mt-6 max-w-3xl">
            {category.description}
          </p>
        </div>

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="px-6 md:px-8 lg:px-10 pb-8 md:pb-10">
                {/* Divider */}
                <div className="relative py-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-dashed border-[#0A1128]/20" />
                  </div>
                  <div className="relative flex justify-center">
                    <span 
                      className="px-4 bg-white text-sm font-medium"
                      style={{ color: category.color }}
                    >
                      Templates in this collection
                    </span>
                  </div>
                </div>

                {/* Templates Grid */}
                <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                  {category.templates.map((template, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.1 }}
                      className="group p-6 rounded-[20px] border-2 border-transparent hover:border-current transition-all"
                      style={{ 
                        backgroundColor: `${category.color}08`,
                        color: category.color
                      }}
                    >
                      <h4 className="font-display text-xl font-bold text-[#0A1128] mb-2 group-hover:text-current transition-colors">
                        {template.name}
                      </h4>
                      <p className="text-[#0A1128]/60 text-sm mb-4">{template.description}</p>
                      
                      <div className="flex flex-wrap gap-2">
                        {template.features.map((feature, j) => (
                          <span 
                            key={j}
                            className="px-2 py-1 bg-white rounded-md text-xs text-[#0A1128]/70"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Coming Soon Badge */}
                <div className="mt-8 flex justify-center">
                  <div 
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full"
                    style={{ backgroundColor: `${category.color}15`, color: category.color }}
                  >
                    <span className="text-lg">✨</span>
                    <span className="font-medium">Templates launching soon on Etsy & Gumroad</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function Notion() {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [currentQuote, setCurrentQuote] = useState(0);

  const toggleCategory = (categoryId) => {
    setExpandedCategory(prev => prev === categoryId ? null : categoryId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8DCC4] via-[#F5EFE6] to-[#E8DCC4]">
      {/* Texture overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.15]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Background decorations */}
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-[#C1292E]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-[#B8860B]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* ===== HERO SECTION ===== */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          {/* Editorial header */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-6 mb-8"
          >
            <div className="w-20 md:w-32 h-px bg-[#0A1128]" />
            <span className="text-[#0A1128] text-xs md:text-sm font-medium tracking-[0.3em] uppercase">
              Systems Architecture
            </span>
            <div className="flex-1 h-px bg-[#0A1128]/20" />
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-[#0A1128] mb-6"
          >
            Notion <span className="text-[#C1292E]">Systems</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-[#0A1128]/70 leading-relaxed max-w-2xl mb-12"
          >
            Transforming chaos into clarity through beautifully designed Notion systems, 
            because your ideas deserve a home that works as hard as you do.
          </motion.p>

          {/* Shop Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <a 
              href="https://www.etsy.com/shop/YourShop"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-8 py-4 bg-[#F56400] text-white rounded-full font-medium overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-3">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8.559 1.012c-.447.072-.904.148-1.353.227C5.953 1.484 4.731 1.788 3.59 2.3c-.494.222-.982.472-1.385.82-.403.349-.715.798-.833 1.34-.117.539-.032 1.113.091 1.649.123.537.291 1.058.462 1.573.343 1.032.704 2.058.95 3.113.123.528.214 1.064.25 1.605.037.541.02 1.087-.052 1.624-.072.536-.196 1.063-.348 1.58-.152.516-.331 1.022-.507 1.528-.352 1.011-.693 2.027-.905 3.072-.106.522-.178 1.054-.185 1.587-.007.533.051 1.068.181 1.585.13.517.332.016.597 1.484.266.47.596.897.989 1.254.392.357.845.643 1.33.855.97.424 2.03.623 3.084.75 1.056.126 2.12.18 3.183.198 2.126.035 4.253-.072 6.36-.323 1.053-.125 2.101-.293 3.131-.531.515-.119 1.025-.256 1.52-.427.496-.17.978-.375 1.424-.632.446-.257.855-.568 1.198-.935.344-.367.621-.791.802-1.253.362-.924.41-1.936.287-2.914-.123-.977-.405-1.92-.736-2.838-.331-.917-.708-1.812-1.057-2.718-.175-.453-.34-.91-.479-1.376-.139-.465-.252-.939-.319-1.42-.067-.481-.087-.968-.05-1.452.037-.484.13-.963.257-1.433.254-.94.623-1.846.96-2.765.168-.46.327-.923.458-1.395.131-.472.233-.953.276-1.44.043-.486.027-.98-.064-1.458-.09-.479-.255-.942-.491-1.364-.472-.845-1.173-1.522-1.951-2.054-.778-.533-1.636-.922-2.512-1.24C15.59.823 14.63.603 13.66.437c-.971-.166-1.953-.273-2.937-.334-.492-.03-.985-.048-1.478-.054-.493-.006-.987 0-1.48.02-.493.02-.986.051-1.478.091-.246.02-.491.043-.736.07-.245.026-.49.055-.735.087l.002-.005zM7.5 6.5h4c.5 0 1 .5 1 1v3c0 .5-.5 1-1 1H8v3c0 .5.5 1 1 1h3.5c.5 0 1-.5 1-1V6.5c0-.5-.5-1-1-1H7.5c-.5 0-1 .5-1 1v11c0 .5.5 1 1 1h1c.5 0 1-.5 1-1V14"/>
                </svg>
                Shop on Etsy
              </span>
              <div className="absolute inset-0 bg-[#D35400] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
            
            <a 
              href="https://gumroad.com/YourProfile"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-8 py-4 bg-[#FF90E8] text-[#0A1128] rounded-full font-medium overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-3">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 3.6c4.64 0 8.4 3.76 8.4 8.4 0 4.64-3.76 8.4-8.4 8.4-4.64 0-8.4-3.76-8.4-8.4 0-4.64 3.76-8.4 8.4-8.4zm0 2.4c-3.312 0-6 2.688-6 6s2.688 6 6 6 6-2.688 6-6-2.688-6-6-6z"/>
                </svg>
                Shop on Gumroad
              </span>
              <div className="absolute inset-0 bg-[#FF6BB3] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ===== QUOTE SECTION ===== */}
      <section className="relative py-12 md:py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div 
              className="relative bg-[#0A1128] p-8 md:p-12 overflow-hidden text-center"
              style={{ borderRadius: '40px 16px 40px 16px' }}
            >
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-[#C1292E]/20 rounded-full blur-2xl" />
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-[#B8860B]/20 rounded-full blur-2xl" />
              
              <div className="relative z-10">
                <div className="text-[#B8860B] text-6xl md:text-7xl font-serif mb-4">"</div>
                <blockquote className="font-display text-xl md:text-2xl lg:text-3xl text-[#E8DCC4] leading-relaxed mb-6">
                  {quotes[currentQuote].text}
                </blockquote>
                <p className="text-[#C1292E] font-medium">— {quotes[currentQuote].author}</p>
                
                {/* Quote dots */}
                <div className="flex justify-center gap-2 mt-6">
                  {quotes.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentQuote(i)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        currentQuote === i ? 'bg-[#C1292E] w-6' : 'bg-[#E8DCC4]/30 hover:bg-[#E8DCC4]/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== THE CAUSE, IMPACT, SOLUTION ===== */}
      <section className="relative py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#B8860B] text-xs md:text-sm font-medium tracking-[0.3em] uppercase">The Philosophy</span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[#0A1128] mt-4">
              Why <span className="text-[#C1292E]">Systems</span> Matter
            </h2>
          </motion.div>

          {/* Three Cards */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {/* The Cause */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative group"
            >
              <div 
                className="h-full bg-white/80 backdrop-blur-sm p-8 transition-all duration-500 group-hover:bg-white group-hover:shadow-xl"
                style={{ borderRadius: '32px 12px 32px 12px' }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#C1292E] to-[#8B1E22] rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <span className="text-3xl">🔥</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-[#0A1128] mb-4">The Cause</h3>
                <p className="text-[#0A1128]/70 leading-relaxed">
                  Talented individuals and businesses lose hours daily to disorganization. 
                  Ideas get lost in scattered notes. Important tasks slip through the cracks. 
                  Potential remains unrealized because there's no system to capture and execute it.
                </p>
                <div className="mt-6 pt-6 border-t border-[#0A1128]/10">
                  <span className="text-[#C1292E] font-medium text-sm">The problem we solve</span>
                </div>
              </div>
            </motion.div>

            {/* The Impact */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative group"
            >
              <div 
                className="h-full bg-white/80 backdrop-blur-sm p-8 transition-all duration-500 group-hover:bg-white group-hover:shadow-xl"
                style={{ borderRadius: '12px 32px 12px 32px' }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#B8860B] to-[#8B6914] rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <span className="text-3xl">💎</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-[#0A1128] mb-4">The Impact</h3>
                <p className="text-[#0A1128]/70 leading-relaxed">
                  When systems work, everything flows. Decisions become clearer. 
                  Time opens up for creativity and growth. Stress decreases while 
                  productivity increases. You stop working in your business and start working on it.
                </p>
                <div className="mt-6 pt-6 border-t border-[#0A1128]/10">
                  <span className="text-[#B8860B] font-medium text-sm">The transformation we enable</span>
                </div>
              </div>
            </motion.div>

            {/* The Solution */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="relative group"
            >
              <div 
                className="h-full bg-white/80 backdrop-blur-sm p-8 transition-all duration-500 group-hover:bg-white group-hover:shadow-xl"
                style={{ borderRadius: '32px 12px 32px 12px' }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#0A1128] to-[#1a2744] rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <span className="text-3xl">⚡</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-[#0A1128] mb-4">The Solution</h3>
                <p className="text-[#0A1128]/70 leading-relaxed">
                  Beautifully designed Notion systems that feel intuitive from day one. 
                  Not just templates, complete operating systems tailored to how you 
                  actually work. Built with flexibility to grow alongside your ambitions.
                </p>
                <div className="mt-6 pt-6 border-t border-[#0A1128]/10">
                  <span className="text-[#0A1128] font-medium text-sm">What we deliver</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { number: '40-60%', label: 'Admin time reduced' },
              { number: '15+', label: 'Template designs' },
              { number: '5', label: 'Categories' },
              { number: '∞', label: 'Possibilities' }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="font-display text-3xl md:text-4xl font-bold text-[#C1292E]">{stat.number}</div>
                <div className="text-[#0A1128]/60 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== TEMPLATE CATEGORIES ===== */}
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
              Template <span className="text-[#C1292E]">Collections</span>
            </h2>
          </motion.div>

          {/* Category Cards */}
          <div className="space-y-6">
            {templateCategories.map((category, index) => (
              <CategoryCard
                key={category.id}
                category={category}
                isExpanded={expandedCategory === category.id}
                onToggle={() => toggleCategory(category.id)}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== COMING SOON: SAAS ===== */}
      <section className="relative py-16 md:py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div 
              className="relative overflow-hidden"
              style={{ borderRadius: '48px 16px 48px 16px' }}
            >
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#0A1128] via-[#1a2744] to-[#0A1128]" />
              
              {/* Animated orbs */}
              <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#C1292E]/30 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-[#B8860B]/30 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
              
              {/* Grid pattern overlay */}
              <div 
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
                  backgroundSize: '40px 40px'
                }}
              />
              
              <div className="relative z-10 p-8 md:p-12 lg:p-16 text-center">
                {/* Coming Soon Badge */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 px-6 py-2 bg-[#C1292E]/20 rounded-full mb-8"
                >
                  <span className="w-2 h-2 bg-[#C1292E] rounded-full animate-pulse" />
                  <span className="text-[#C1292E] font-medium text-sm tracking-wide">COMING SOON</span>
                </motion.div>

                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[#E8DCC4] mb-6">
                  Notion Automations <span className="text-[#B8860B]">SaaS</span>
                </h2>
                
                <p className="text-[#E8DCC4]/70 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
                  Taking systems to the next level. Imagine your Notion workspace that thinks, 
                  acts, and automates  without you lifting a finger. AI-powered workflows, 
                  smart reminders, and integrations that just work.
                </p>

                {/* Features Preview */}
                <div className="grid md:grid-cols-3 gap-4 mb-10">
                  {[
                    { icon: '🤖', title: 'AI-Powered Workflows', desc: 'Automations that learn and adapt' },
                    { icon: '🔗', title: 'Smart Integrations', desc: 'Connect your favorite tools' },
                    { icon: '📊', title: 'Analytics Dashboard', desc: 'Insights that drive action' }
                  ].map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + i * 0.1 }}
                      className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
                    >
                      <span className="text-3xl mb-3 block">{feature.icon}</span>
                      <h4 className="text-[#E8DCC4] font-bold mb-1">{feature.title}</h4>
                      <p className="text-[#E8DCC4]/50 text-sm">{feature.desc}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Waitlist CTA */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <input
                    type="email"
                    placeholder="Enter your email for early access"
                    className="w-full sm:w-auto px-6 py-4 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-[#E8DCC4] placeholder-[#E8DCC4]/50 focus:outline-none focus:border-[#C1292E] transition-colors min-w-[300px]"
                  />
                  <button className="w-full sm:w-auto px-8 py-4 bg-[#C1292E] text-white rounded-full font-medium hover:bg-[#a82226] transition-all hover:scale-105 hover:shadow-lg whitespace-nowrap">
                    Join Waitlist
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="relative py-16 md:py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0A1128] mb-6">
              Ready to Transform Your Workflow?
            </h2>
            <p className="text-[#0A1128]/70 text-lg mb-8 max-w-xl mx-auto">
              Browse our template collections or get a custom system designed specifically for your needs.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="https://www.etsy.com/shop/YourShop"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-[#F56400] text-white rounded-full font-medium hover:bg-[#D35400] transition-all hover:scale-105"
              >
                Browse on Etsy
              </a>
              <a 
                href="https://gumroad.com/YourProfile"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-[#FF90E8] text-[#0A1128] rounded-full font-medium hover:bg-[#FF6BB3] transition-all hover:scale-105"
              >
                Browse on Gumroad
              </a>
              <a 
                href="/contact"
                className="px-8 py-4 border-2 border-[#0A1128] text-[#0A1128] rounded-full font-medium hover:bg-[#0A1128] hover:text-[#E8DCC4] transition-all"
              >
                Request Custom System
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer decoration */}
      <div className="relative h-24 overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#B8860B]/30 to-transparent" />
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="w-2 h-2 rounded-full bg-[#B8860B]"
              style={{ opacity: 0.3 + (i * 0.15) }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}