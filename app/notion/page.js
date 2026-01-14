'use client';

export default function Notion() {
  const systems = [
    {
      name: 'Business Operating System',
      description: 'Multi-vertical system with 16+ interconnected databases for complete business management',
      price: 'R2,999',
      features: ['CRM Pipeline', 'Financial Dashboard', 'Project Management', 'Analytics']
    },
    {
      name: 'Student Productivity Suite',
      description: 'All-in-one system for assignments, notes, budgets, and study planning',
      price: 'R599',
      features: ['Assignment Tracker', 'Note Library', 'Budget Manager', 'Study Plans']
    },
    {
      name: 'Creative Agency Workflow',
      description: 'Client management, project tracking, asset library, and billing system',
      price: 'R1,499',
      features: ['Client Database', 'Project Boards', 'Asset Management', 'Invoicing']
    },
    {
      name: 'Restaurant Operations Dashboard',
      description: 'Inventory, staff management, reservations, and analytics for hospitality',
      price: 'R1,299',
      features: ['Inventory Tracking', 'Staff Schedules', 'Reservations', 'Sales Analytics']
    }
  ];

  return (
    <div className="page-transition min-h-screen bg-gradient-to-br from-navy to-navy-light py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h1 className="font-display text-6xl md:text-8xl font-bold text-beige mb-6 text-reveal">
            Notion <span className="text-cherry">Systems</span>
          </h1>
          <p className="text-xl text-beige/70 max-w-3xl">
            Transforming chaos into clarity. Custom Notion systems that reduce admin time by 40-60% 
            through intelligent automation and streamlined workflows.
          </p>
        </div>

        {/* Services */}
        <div className="mb-16 text-reveal" style={{ '--index': 1 }}>
          <h2 className="font-display text-4xl font-bold text-cherry mb-8">What I Build</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-white/10 backdrop-blur rounded-2xl border border-beige/20">
              <h3 className="font-display text-2xl font-bold text-beige mb-3">Custom Systems</h3>
              <ul className="space-y-2 text-beige/80">
                <li>→ CRM with pipeline tracking & automation</li>
                <li>→ Financial dashboards (SARS-compliant)</li>
                <li>→ Project management frameworks</li>
                <li>→ Knowledge bases with search</li>
                <li>→ Content calendars & publishing</li>
                <li>→ Inventory tracking with alerts</li>
              </ul>
            </div>
            
            <div className="p-6 bg-cherry/20 backdrop-blur rounded-2xl border border-cherry/30">
              <h3 className="font-display text-2xl font-bold text-beige mb-3">Results</h3>
              <ul className="space-y-2 text-beige/80">
                <li>→ 40-60% reduction in admin time</li>
                <li>→ Centralized information systems</li>
                <li>→ Real-time analytics dashboards</li>
                <li>→ Automated workflows</li>
                <li>→ Enhanced team collaboration</li>
                <li>→ AI-generated documentation</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Template Products */}
        <div>
          <h2 className="font-display text-4xl font-bold text-cherry mb-8">Template Products</h2>
          <p className="text-beige/70 mb-8">15+ productized Notion templates ready for immediate use</p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {systems.map((system, i) => (
              <div key={i} className="group bg-white/5 backdrop-blur rounded-2xl p-6 border border-beige/10 hover:border-cherry/50 transition-all hover:-translate-y-2 text-reveal"
                   style={{ '--index': i + 2 }}>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-display text-2xl font-bold text-beige group-hover:text-cherry transition-colors">
                    {system.name}
                  </h3>
                  <span className="px-4 py-2 bg-cherry text-white rounded-full text-sm font-bold">
                    {system.price}
                  </span>
                </div>
                
                <p className="text-beige/70 mb-4">{system.description}</p>
                
                <div className="grid grid-cols-2 gap-2">
                  {system.features.map((feature, j) => (
                    <span key={j} className="text-cherry text-sm">✓ {feature}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 p-8 bg-gradient-to-r from-cherry to-cherry-dark rounded-2xl text-center text-reveal" style={{ '--index': 6 }}>
          <h3 className="font-display text-3xl font-bold text-white mb-4">
            Ready to Transform Your Operations?
          </h3>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">
            Custom Notion system design or plug-and-play templates. Let's streamline your workflow.
          </p>
          <a href="/contact" className="inline-block px-8 py-4 bg-white text-cherry rounded-full font-medium hover:scale-105 transition-transform">
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
}