'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Education Data
const formalEducation = [
  {
    id: 'advanced-diploma',
    degree: 'Advanced Diploma in Business Management Practice',
    institution: 'Nelson Mandela University',
    period: 'February 2024 - November 2024',
    type: 'NQF Level 7',
    status: 'Completed with Distinction',
    icon: '🎓',
    color: '#C1292E',
    gradient: 'from-[#C1292E] to-[#8B1E22]',
    distinctions: 5,
    highlights: [
      'Graduated with academic excellence',
      'Balanced full-time management role with studies',
      'Applied strategic theory to real business operations',
      'Capstone project on digital transformation in hospitality'
    ],
    subjects: ['Strategic Management', 'Operations Management', 'Business Analytics', 'Leadership Development', 'Financial Management', 'Project Management']
  },
  {
    id: 'diploma',
    degree: 'Diploma in Management',
    institution: 'Nelson Mandela University',
    period: 'February 2023 - November 2023',
    type: 'NQF Level 6',
    status: 'Completed with Distinction',
    icon: '📊',
    color: '#B8860B',
    gradient: 'from-[#B8860B] to-[#8B6914]',
    distinctions: 5,
    highlights: [
      'Featured on Nelson Mandela University official page',
      'Strong foundation in management principles',
      'Developed analytical and strategic thinking',
      'Recognized for balancing academics with creative pursuits'
    ],
    subjects: ['Management Principles', 'Business Communication', 'Economics', 'Accounting', 'Marketing', 'Human Resources']
  },
  {
    id: 'higher-cert',
    degree: 'Higher Certificate in Business Management',
    institution: 'Nelson Mandela University',
    period: 'February 2022 - November 2022',
    type: 'NQF Level 5',
    status: 'Completed with Distinction',
    icon: '📈',
    color: '#0A1128',
    gradient: 'from-[#0A1128] to-[#1a2744]',
    distinctions: 5,
    highlights: [
      'Entry into business management studies',
      'Built foundational business knowledge',
      'First academic distinctions achieved',
      'Discovered passion for systems and operations'
    ],
    subjects: ['Introduction to Business', 'Business Mathematics', 'Computer Literacy', 'Communication Skills', 'Economics Fundamentals']
  }
];

const technicalCertifications = [
  {
    name: 'SheCodes Plus',
    provider: 'SheCodes',
    focus: 'Front-End Web Development',
    period: 'June 2025 - December 2025',
    icon: '👩‍💻',
    color: '#E91E63',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Responsive Design', 'API Integration']
  },
  {
    name: 'Google Digital Marketing & E-commerce',
    provider: 'Google via Coursera',
    focus: 'Digital Marketing Strategy',
    period: 'June 2025 - November 2025',
    icon: '📱',
    color: '#4285F4',
    skills: ['SEO', 'SEM', 'Social Media Marketing', 'E-commerce', 'Analytics', 'Content Strategy']
  },
  {
    name: 'Master Generative AI',
    provider: 'Great Learning',
    focus: 'AI & Prompt Engineering',
    period: 'August 2025',
    icon: '🤖',
    color: '#00BCD4',
    skills: ['Prompt Engineering', 'ChatGPT', 'AI Integration', 'Automation', 'Business Applications']
  },
  {
    name: 'ChatGPT for Business Communication',
    provider: 'Great Learning',
    focus: 'AI-Powered Communication',
    period: 'August 2025',
    icon: '💬',
    color: '#9C27B0',
    skills: ['Business Writing', 'AI Assistants', 'Productivity', 'Communication Strategy']
  },
  {
    name: 'Human-Centered Design',
    provider: 'IDEO',
    focus: 'Design Thinking',
    period: '2024',
    icon: '🎨',
    color: '#FF5722',
    skills: ['Design Thinking', 'User Research', 'Prototyping', 'Empathy Mapping', 'Ideation']
  },
  {
    name: 'Graphic Design Essentials',
    provider: 'Online Academy',
    focus: 'Visual Design',
    period: '2024',
    icon: '✏️',
    color: '#673AB7',
    skills: ['Typography', 'Color Theory', 'Layout', 'Branding', 'Visual Hierarchy']
  }
];

// Animated Counter Component
function AnimatedCounter({ end, duration = 2 }) {
  const [count, setCount] = useState(0);
  
  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      onViewportEnter={() => {
        let start = 0;
        const increment = end / (duration * 60);
        const timer = setInterval(() => {
          start += increment;
          if (start >= end) {
            setCount(end);
            clearInterval(timer);
          } else {
            setCount(Math.floor(start));
          }
        }, 1000 / 60);
      }}
    >
      {count}
    </motion.span>
  );
}

// Education Card Component
function EducationCard({ edu, index, isExpanded, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative"
    >
      {/* Timeline connector */}
      <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#B8860B]/30 to-transparent hidden md:block" />
      
      <div 
        className={`
          relative overflow-hidden transition-all duration-500 cursor-pointer
          ${isExpanded 
            ? 'bg-white rounded-[40px] shadow-2xl' 
            : 'bg-white/70 backdrop-blur-sm rounded-[32px] hover:bg-white hover:shadow-xl'
          }
        `}
        onClick={onToggle}
      >
        {/* Gradient accent bar */}
        <div className={`h-2 bg-gradient-to-r ${edu.gradient}`} />
        
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            {/* Icon with distinction badge */}
            <div className="relative flex-shrink-0">
              <div 
                className={`w-20 h-20 rounded-[16px] bg-gradient-to-br ${edu.gradient} flex items-center justify-center shadow-lg`}
              >
                <span className="text-4xl">{edu.icon}</span>
              </div>
              {/* Distinction badge */}
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#B8860B] rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-xs font-bold">{edu.distinctions}</span>
              </div>
            </div>
            
            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span 
                  className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{ backgroundColor: `${edu.color}15`, color: edu.color }}
                >
                  {edu.type}
                </span>
                <span className="px-3 py-1 bg-[#B8860B]/15 text-[#B8860B] rounded-full text-xs font-medium">
                  {edu.distinctions} Distinctions
                </span>
              </div>
              
              <h3 className="font-display text-xl md:text-2xl font-bold text-[#0A1128] mb-1">
                {edu.degree}
              </h3>
              <p className="text-[#C1292E] font-medium">{edu.institution}</p>
              <p className="text-[#0A1128]/50 text-sm mt-1">{edu.period}</p>
            </div>
            
            {/* Expand button */}
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className={`
                w-10 h-10 rounded-full flex items-center justify-center transition-colors self-start
                ${isExpanded ? 'bg-[#0A1128] text-white' : 'bg-[#0A1128]/10 text-[#0A1128]'}
              `}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </motion.div>
          </div>

          {/* Expanded Content */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="overflow-hidden"
              >
                <div className="mt-6 pt-6 border-t border-[#0A1128]/10">
                  {/* Highlights */}
                  <div className="mb-6">
                    <h4 className="font-display text-lg font-bold text-[#0A1128] mb-3">Highlights</h4>
                    <ul className="space-y-2">
                      {edu.highlights.map((highlight, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + i * 0.05 }}
                          className="flex items-start gap-3 text-[#0A1128]/70"
                        >
                          <span className="text-[#B8860B] mt-1">✦</span>
                          <span>{highlight}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Subjects */}
                  <div>
                    <h4 className="font-display text-lg font-bold text-[#0A1128] mb-3">Key Subjects</h4>
                    <div className="flex flex-wrap gap-2">
                      {edu.subjects.map((subject, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2 + i * 0.05 }}
                          className="px-3 py-1.5 bg-[#0A1128]/5 text-[#0A1128]/70 rounded-lg text-sm"
                        >
                          {subject}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export default function Education() {
  const [expandedEdu, setExpandedEdu] = useState(null);
  const [expandedCert, setExpandedCert] = useState(null);

  const totalDistinctions = formalEducation.reduce((sum, edu) => sum + edu.distinctions, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8DCC4] via-[#F5EFE6] to-[#E8DCC4]">
      {/* Texture overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.12]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Decorative background elements */}
      <div className="fixed top-20 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#C1292E]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#B8860B]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* ===== HERO SECTION ===== */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 px-6 overflow-hidden">
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
              Academic Journey
            </span>
            <div className="flex-1 h-px bg-[#0A1128]/20" />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-[#0A1128] mb-6">
                Education
              </h1>
              <p className="text-lg md:text-xl text-[#0A1128]/70 leading-relaxed mb-8">
                A journey of academic excellence, from business fundamentals to strategic management — 
                proving that passion, discipline, and creativity can coexist beautifully.
              </p>
              
              {/* Download Certificate Button */}
              <motion.a
                href="/certificates.pdf"
                download
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-[#0A1128] text-[#E8DCC4] rounded-full font-medium overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 relative"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download Certificates
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#C1292E] to-[#B8860B] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.a>
            </motion.div>

            {/* 15 Distinctions Feature Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div 
                className="relative bg-[#0A1128] p-8 md:p-10 overflow-hidden"
                style={{ borderRadius: '48px 16px 48px 16px' }}
              >
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#B8860B]/30 rounded-full blur-2xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#C1292E]/20 rounded-full blur-xl" />
                
                {/* Gold laurel decoration */}
                <div className="absolute top-4 left-4 text-[#B8860B]/20 text-6xl">🏆</div>
                <div className="absolute bottom-4 right-4 text-[#B8860B]/20 text-6xl rotate-180">🏆</div>
                
                <div className="relative z-10 text-center">
                  <span className="text-[#B8860B] text-sm font-medium tracking-[0.3em] uppercase">Academic Achievement</span>
                  
                  <div className="my-6">
                    <div className="font-display text-8xl md:text-9xl font-bold text-[#B8860B]">
                      <AnimatedCounter end={15} duration={2} />
                    </div>
                    <div className="text-[#E8DCC4] text-2xl md:text-3xl font-display font-bold mt-2">
                      Distinctions
                    </div>
                  </div>
                  
                  <p className="text-[#E8DCC4]/70 text-sm max-w-xs mx-auto">
                    Achieved across four years of study at Nelson Mandela University
                  </p>
                  
                  {/* Distinction breakdown */}
                  <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-[#E8DCC4]/10">
                    {formalEducation.map((edu, i) => (
                      <div key={i} className="text-center">
                        <div className="text-2xl font-bold" style={{ color: edu.color === '#0A1128' ? '#E8DCC4' : edu.color }}>
                          {edu.distinctions}
                        </div>
                        <div className="text-[#E8DCC4]/50 text-xs mt-1">
                          {edu.type.replace('NQF Level ', 'Level ')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== FEATURED ARTICLE SECTION ===== */}
      <section className="relative py-16 md:py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Section label */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-[#0077B5] rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </div>
              <div>
                <span className="text-[#0077B5] text-sm font-medium">Featured on LinkedIn</span>
                <p className="text-[#0A1128]/50 text-xs">Nelson Mandela University • 135,000+ followers</p>
              </div>
            </div>

            {/* Article Card */}
            <div 
              className="relative bg-white overflow-hidden group"
              style={{ borderRadius: '40px 16px 40px 16px' }}
            >
              {/* Header gradient */}
              <div className="h-3 bg-gradient-to-r from-[#C1292E] via-[#B8860B] to-[#C1292E]" />
              
              <div className="p-8 md:p-12">
                {/* Article headline */}
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[#0A1128] mb-6 leading-tight">
                  "Management graduand finds <span className="text-[#C1292E]">calling in writing</span>"
                </h2>
                
                {/* Quote from article */}
                <div className="relative pl-6 border-l-4 border-[#B8860B] mb-8">
                  <p className="text-[#0A1128]/80 text-lg md:text-xl italic leading-relaxed">
                    "My dream job is to run a business that betters the community and youth, and my 
                    studies have broadened my mind to endless opportunities."
                  </p>
                </div>
                
                {/* Article highlights */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="text-[#C1292E] mt-1">◆</span>
                      <p className="text-[#0A1128]/70">
                        Featured for balancing academic excellence with creative pursuits as a published poet
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-[#C1292E] mt-1">◆</span>
                      <p className="text-[#0A1128]/70">
                        Poetry collection "Inside Her Roses" highlighted - available on Vivlio, Apple, Barnes & Noble, Kindle
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="text-[#C1292E] mt-1">◆</span>
                      <p className="text-[#0A1128]/70">
                        Recognized for coordinating events that encourage young people to showcase their talents
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-[#C1292E] mt-1">◆</span>
                      <p className="text-[#0A1128]/70">
                        Artistic expression rooted in Ugandan and Zulu heritage celebrated
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Read Article Button */}
                <a 
                  href="https://www.linkedin.com/feed/update/urn:li:activity:7184543544819204100/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#0077B5] text-white rounded-full font-medium hover:bg-[#005885] transition-all hover:scale-105"
                >
                  <span>Read Full Article</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== BEYOND THE CLASSROOM ===== */}
      <section className="relative py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div 
              className="relative overflow-hidden bg-gradient-to-br from-[#0A1128] via-[#1a2744] to-[#0A1128]"
              style={{ borderRadius: '48px 16px 48px 16px' }}
            >
              {/* Decorative pattern */}
              <div 
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                  backgroundSize: '32px 32px'
                }}
              />
              
              {/* Glowing orbs */}
              <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#B8860B]/20 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-[#C1292E]/20 rounded-full blur-2xl" />
              
              <div className="relative z-10 p-8 md:p-12 lg:p-16">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  {/* Content */}
                  <div>
                    <span className="text-[#B8860B] text-sm font-medium tracking-[0.3em] uppercase">Leadership Program</span>
                    
                    <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[#E8DCC4] mt-4 mb-6">
                      Beyond the <span className="text-[#C1292E]">Classroom</span>
                    </h2>
                    
                    <p className="text-[#E8DCC4]/70 text-lg leading-relaxed mb-8">
                      Selected for Nelson Mandela University's prestigious leadership development program — 
                      an initiative designed to cultivate the next generation of change-makers, 
                      innovators, and community leaders.
                    </p>
                    
                    <div className="space-y-4">
                      {[
                        'Leadership skills development & mentorship',
                        'Community engagement & social impact projects',
                        'Networking with industry professionals',
                        'Personal branding & professional growth',
                        'Entrepreneurship & innovation workshops'
                      ].map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 + i * 0.1 }}
                          className="flex items-center gap-3"
                        >
                          <div className="w-6 h-6 rounded-full bg-[#B8860B]/20 flex items-center justify-center">
                            <span className="text-[#B8860B] text-xs">✓</span>
                          </div>
                          <span className="text-[#E8DCC4]/80">{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Visual element */}
                  <div className="relative">
                    <div 
                      className="relative bg-gradient-to-br from-[#B8860B]/20 to-[#C1292E]/20 p-8 backdrop-blur-sm border border-[#E8DCC4]/10"
                      style={{ borderRadius: '32px 12px 32px 12px' }}
                    >
                      <div className="text-center">
                        <div className="text-6xl mb-4">🌟</div>
                        <h3 className="font-display text-2xl font-bold text-[#E8DCC4] mb-2">
                          Leadership Excellence
                        </h3>
                        <p className="text-[#E8DCC4]/60 text-sm mb-6">
                          Developing leaders who make a difference
                        </p>
                        
                        {/* Program pillars */}
                        <div className="grid grid-cols-2 gap-4">
                          {[
                            { icon: '🎯', label: 'Vision' },
                            { icon: '🤝', label: 'Collaboration' },
                            { icon: '💡', label: 'Innovation' },
                            { icon: '❤️', label: 'Impact' }
                          ].map((pillar, i) => (
                            <div 
                              key={i}
                              className="p-4 bg-[#0A1128]/50 rounded-xl"
                            >
                              <span className="text-2xl block mb-1">{pillar.icon}</span>
                              <span className="text-[#E8DCC4]/70 text-sm">{pillar.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Floating badge */}
                    <div className="absolute -top-4 -right-4 px-4 py-2 bg-[#B8860B] rounded-full shadow-lg">
                      <span className="text-white text-sm font-bold">NMU</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== FORMAL EDUCATION TIMELINE ===== */}
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
              Academic <span className="text-[#C1292E]">Timeline</span>
            </h2>
          </motion.div>

          {/* Education Cards */}
          <div className="space-y-6">
            {formalEducation.map((edu, index) => (
              <EducationCard
                key={edu.id}
                edu={edu}
                index={index}
                isExpanded={expandedEdu === edu.id}
                onToggle={() => setExpandedEdu(expandedEdu === edu.id ? null : edu.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== TECHNICAL CERTIFICATIONS ===== */}
      <section className="relative py-16 md:py-24 px-6 bg-gradient-to-b from-transparent via-[#0A1128]/5 to-transparent">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-[#B8860B] text-xs md:text-sm font-medium tracking-[0.3em] uppercase">Continuous Learning</span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[#0A1128] mt-4">
              Technical <span className="text-[#C1292E]">Training</span>
            </h2>
            <p className="text-[#0A1128]/60 mt-4 max-w-xl mx-auto">
              Bridging business acumen with technical skills from front-end development to AI integration
            </p>
          </motion.div>

          {/* Certifications Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technicalCertifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                <div 
                  className="h-full bg-white/80 backdrop-blur-sm p-6 transition-all duration-500 hover:bg-white hover:shadow-xl"
                  style={{ borderRadius: '24px 8px 24px 8px' }}
                >
                  {/* Icon */}
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${cert.color}15` }}
                  >
                    <span className="text-3xl">{cert.icon}</span>
                  </div>
                  
                  {/* Content */}
                  <h3 className="font-display text-lg font-bold text-[#0A1128] mb-1 group-hover:text-[#C1292E] transition-colors">
                    {cert.name}
                  </h3>
                  <p className="text-sm font-medium mb-1" style={{ color: cert.color }}>
                    {cert.provider}
                  </p>
                  <p className="text-[#0A1128]/50 text-xs mb-4">{cert.period}</p>
                  
                  {/* Skills */}
                  <div className="flex flex-wrap gap-1.5">
                    {cert.skills.slice(0, 4).map((skill, i) => (
                      <span 
                        key={i}
                        className="px-2 py-1 rounded-md text-xs"
                        style={{ backgroundColor: `${cert.color}10`, color: cert.color }}
                      >
                        {skill}
                      </span>
                    ))}
                    {cert.skills.length > 4 && (
                      <span className="px-2 py-1 text-xs text-[#0A1128]/40">
                        +{cert.skills.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== THE JOURNEY NARRATIVE ===== */}
      <section className="relative py-16 md:py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div 
              className="relative bg-gradient-to-br from-[#C1292E] to-[#8B1E22] p-8 md:p-12 overflow-hidden text-center"
              style={{ borderRadius: '48px 16px 48px 16px' }}
            >
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#B8860B]/30 rounded-full blur-xl" />
              
              <div className="relative z-10">
                <div className="text-6xl mb-6">📖</div>
                
                <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6">
                  The Journey Continues
                </h2>
                
                <p className="text-white/80 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
                  From business fundamentals to full-stack development, from poetry to systems architecture -
                  every lesson learned becomes a tool for building something greater. Education isn't just 
                  about degrees; it's about becoming who you're meant to be.
                </p>
                
                <div className="flex flex-wrap justify-center gap-4">
                  <a 
                    href="/certificates.pdf"
                    download
                    className="px-8 py-4 bg-white text-[#C1292E] rounded-full font-medium hover:bg-[#E8DCC4] transition-all hover:scale-105"
                  >
                    Download Certificates
                  </a>
                  <a 
                    href="/projects"
                    className="px-8 py-4 border-2 border-white text-white rounded-full font-medium hover:bg-white/10 transition-all"
                  >
                    See What I Build
                  </a>
                </div>
              </div>
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
              className="w-2 h-2 rounded-full bg-[#C1292E]"
              style={{ opacity: 0.3 + (i * 0.15) }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}