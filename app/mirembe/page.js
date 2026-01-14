'use client';

export default function Mirembe() {
  return (
    <div className="page-transition min-h-screen bg-gradient-to-br from-beige-light via-white to-beige py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 text-reveal">
          <h1 className="font-display text-6xl md:text-8xl font-bold text-navy mb-6">
            Mirembe <span className="text-cherry">Muse</span>
          </h1>
          <p className="text-2xl text-navy/70 mb-4">
            African Botanical Wellness • E-Commerce Platform
          </p>
          <p className="text-lg text-navy/60">
            Launching February 2026 • MirembeMuse.co.za
          </p>
        </div>

        {/* Hero Statement */}
        <div className="mb-16 p-8 md:p-12 bg-gradient-to-r from-cherry/10 to-navy/10 rounded-3xl text-reveal" style={{ '--index': 1 }}>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-navy mb-6">
            Wellness rooted in African botanicals. <br/>
            <span className="text-cherry">E-commerce built for impact.</span>
          </h2>
          <p className="text-xl text-navy/70 leading-relaxed">
            Mirembe Muse is my multi-vertical digital business—combining wellness products, 
            digital services, and creative studio work. It's where technology meets tradition, 
            where code meets community, where business meets purpose.
          </p>
        </div>

        {/* Three Verticals */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="p-6 bg-white rounded-2xl shadow-lg text-reveal" style={{ '--index': 2 }}>
            <div className="text-5xl mb-4">🌿</div>
            <h3 className="font-display text-3xl font-bold text-cherry mb-3">Wellness Products</h3>
            <p className="text-navy/70 mb-4">
              African botanical skincare and wellness products. Direct-to-consumer and B2B channels.
            </p>
            <ul className="space-y-2 text-sm text-navy/60">
              <li>→ Product development</li>
              <li>→ E-commerce platform</li>
              <li>→ Distribution strategy</li>
            </ul>
          </div>

          <div className="p-6 bg-navy rounded-2xl text-beige text-reveal" style={{ '--index': 3 }}>
            <div className="text-5xl mb-4">💻</div>
            <h3 className="font-display text-3xl font-bold text-cherry mb-3">Digital Services</h3>
            <p className="text-beige/80 mb-4">
              Full-stack development, Notion systems, AI integration, and technical consulting for SMEs.
            </p>
            <ul className="space-y-2 text-sm text-beige/70">
              <li>→ Web applications</li>
              <li>→ Custom Notion systems</li>
              <li>→ AI-powered solutions</li>
            </ul>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow-lg text-reveal" style={{ '--index': 4 }}>
            <div className="text-5xl mb-4">✨</div>
            <h3 className="font-display text-3xl font-bold text-cherry mb-3">Creative Studio</h3>
            <p className="text-navy/70 mb-4">
              Productized templates, digital courses, mentorship, and community wealth building.
            </p>
            <ul className="space-y-2 text-sm text-navy/60">
              <li>→ Notion templates</li>
              <li>→ Digital courses</li>
              <li>→ Mentorship programs</li>
            </ul>
          </div>
        </div>

        {/* Vision */}
        <div className="p-8 bg-gradient-to-r from-navy via-navy-light to-navy rounded-3xl text-beige text-reveal" style={{ '--index': 5 }}>
          <h3 className="font-display text-4xl font-bold text-cherry mb-4">The Vision</h3>
          <p className="text-xl text-beige/80 leading-relaxed mb-6">
            Building toward <span className="text-cherry font-bold">R300,000/month revenue</span> by 
            December 2026 across all three verticals. This isn't just a business—it's a demonstration 
            of what's possible when you combine technical skills, creative thinking, and strategic execution.
          </p>
          <p className="text-lg text-beige/70">
            Mirembe Muse (Pty) Ltd is proof that you can build an empire from code, 
            creativity, and conviction.
          </p>
        </div>
      </div>
    </div>
  );
}