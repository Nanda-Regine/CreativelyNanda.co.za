'use client';

export default function Work() {
  const experiences = [
    {
      role: 'Creative Technologist & Founder',
      company: 'Mirembe Muse (Pty) Ltd',
      period: 'Jan 2025 - Present',
      location: 'Port Elizabeth, South Africa',
      type: 'Self-Employed',
      highlights: [
        'Building multi-vertical digital empire: services, wellness products, and studio',
        'Accelerating development cycles by 60% through AI-assisted workflows',
        'Architecting full-stack web apps with React, Next.js, Supabase, Mapbox GL',
        'Creating AI-powered features and chatbot integrations using OpenAI API',
        'Designing custom Notion systems for business operations and project management',
        'Launching MirembeMuse.co.za - African botanical wellness e-commerce (Feb 2026)',
        'Targeting R300,000/month revenue by Dec 2026'
      ],
      tech: ['React', 'Next.js', 'JavaScript', 'Python', 'Supabase', 'OpenAI API', 'Notion API']
    },
    {
      role: 'Full-Stack Developer',
      company: 'CreativelyNanda',
      period: 'Oct 2024 - Present',
      location: 'Remote',
      type: 'Portfolio & Client Projects',
      highlights: [
        'Built True Access App: location-based service platform with Supabase + Mapbox GL',
        'Developing CreativelyNanda.co.za with AI chatbot assistant (OpenAI API)',
        'Implementing responsive designs with Tailwind CSS and Framer Motion',
        'Integrated real-time databases, authentication, and geospatial visualizations',
        'Deployed applications to Vercel with automated CI/CD pipelines',
        'SEO optimization achieving 95+ Lighthouse scores'
      ],
      tech: ['React', 'Next.js', 'Supabase', 'Mapbox GL', 'Tailwind CSS', 'Vercel']
    },
    {
      role: 'Systems Architect & Automation Specialist',
      company: 'Notion Consulting',
      period: 'Nov 2024 - Present',
      location: 'Remote',
      type: 'Freelance',
      highlights: [
        'Designing comprehensive Notion workspace systems for businesses',
        'Reduced client administrative time by 40-60% through automation',
        'Built CRM systems, financial dashboards, project management frameworks',
        'Created 15+ productized Notion templates (R150-R2,999 range)',
        'Using AI to generate system documentation and training materials'
      ],
      tech: ['Notion', 'Database Architecture', 'Workflow Automation', 'API Integration']
    },
    {
      role: 'Restaurant Operations Manager',
      company: 'Balkan Burger',
      period: 'Jan 2024 - Dec 2024',
      location: 'Port Elizabeth, South Africa',
      type: 'Full-time',
      highlights: [
        'Led operational transformation increasing profitability by 18%',
        'Launched company intranet (Notion-based) improving team communication',
        'Digitized manual processes reducing administrative overhead by 35%',
        'Built custom analytics dashboards tracking sales, labor, customer satisfaction',
        'Optimized inventory management reducing waste by 22%'
      ],
      tech: ['Notion', 'Data Analysis', 'Systems Implementation']
    },
    {
      role: 'Content Specialist',
      company: 'Distilled Photography',
      period: 'Aug 2024 - Oct 2024',
      location: 'Remote',
      type: 'Contract',
      highlights: [
        'Translated visual content into SEO-optimized descriptions',
        'Managed digital asset metadata for photography marketplace',
        'Maintained consistency across large-scale asset management system'
      ],
      tech: ['SEO', 'Digital Asset Management', 'Metadata']
    }
  ];

  return (
    <div className="page-transition min-h-screen bg-beige py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h1 className="font-display text-6xl md:text-8xl font-bold text-navy mb-6 text-reveal">
            Work Experience
          </h1>
          <p className="text-xl text-navy/70">
            From hospitality operations to full-stack development to building a digital empire.
          </p>
        </div>
        
        <div className="space-y-8">
          {experiences.map((exp, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden text-reveal"
                 style={{ '--index': i }}>
              <div className="bg-gradient-to-r from-cherry to-cherry-dark p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div>
                    <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
                      {exp.role}
                    </h3>
                    <p className="text-xl text-white/90 mb-1">{exp.company}</p>
                    <p className="text-white/70">{exp.location} • {exp.type}</p>
                  </div>
                  <div className="px-4 py-2 bg-white/20 backdrop-blur rounded-full text-white font-medium whitespace-nowrap self-start">
                    {exp.period}
                  </div>
                </div>
              </div>
              
              <div className="p-6 md:p-8">
                <ul className="space-y-3 mb-6">
                  {exp.highlights.map((highlight, j) => (
                    <li key={j} className="flex items-start gap-3 text-navy/80">
                      <span className="text-cherry mt-1 shrink-0">→</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="flex flex-wrap gap-2">
                  {exp.tech.map((tech, j) => (
                    <span key={j} className="px-3 py-1.5 bg-cherry/10 text-cherry rounded-full text-sm font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}