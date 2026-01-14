'use client';

export default function About() {
  return (
    <div className="page-transition min-h-screen bg-gradient-to-br from-beige via-beige-light to-white">
      <div className="max-w-6xl mx-auto px-6 py-24">
        {/* Header */}
        <div className="mb-20">
          <h1 className="font-display text-7xl md:text-8xl font-bold text-navy mb-6 text-reveal">
            About <span className="text-cherry">Nanda</span>
          </h1>
          <div className="w-32 h-1 bg-cherry rounded-full" />
        </div>

        {/* Bio Section */}
        <div className="grid md:grid-cols-5 gap-12 mb-20">
          <div className="md:col-span-3 space-y-6 text-reveal" style={{ '--index': 1 }}>
            <p className="text-2xl font-display font-medium text-navy leading-relaxed">
              I am a creative technologist who believes in the power of technology 
              to tell stories, build communities, and create meaningful change.
            </p>
            
            <p className="text-lg text-navy/70 leading-relaxed">
              My work sits at the intersection of design, code, and human experience. 
              I build digital products that don't just function—they resonate. Whether 
              it's crafting intuitive interfaces, developing productivity systems, or 
              performing poetry that moves hearts, I approach every project with curiosity 
              and care.
            </p>
            
            <p className="text-lg text-navy/70 leading-relaxed">
              Beyond the screen, you'll find me organizing systems in Notion, exploring 
              new creative mediums, or working on Mirembe Muse—my creative outlet for 
              simplified, meaningful content.
            </p>
          </div>
          
          <div className="md:col-span-2 space-y-8 text-reveal" style={{ '--index': 2 }}>
            <div className="p-8 bg-white rounded-2xl shadow-lg">
              <h3 className="font-display text-2xl font-bold text-navy mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {['React', 'Next.js', 'Design', 'UX/UI', 'Notion', 'Creative Direction', 
                  'Poetry', 'Public Speaking'].map((skill, i) => (
                  <span key={i} className="px-4 py-2 bg-cherry/10 text-cherry rounded-full text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="p-8 bg-navy rounded-2xl text-beige">
              <h3 className="font-display text-2xl font-bold mb-4">Philosophy</h3>
              <p className="text-beige/80 leading-relaxed">
                "Technology should amplify humanity, not replace it. Every line of code, 
                every design decision, every word—it's all in service of connection."
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: 'Curiosity', desc: 'Always learning, always questioning, always growing.' },
            { title: 'Craft', desc: 'Attention to detail in every pixel, every line, every moment.' },
            { title: 'Connection', desc: 'Building bridges between technology and humanity.' },
          ].map((value, i) => (
            <div key={i} className="p-8 bg-white/50 backdrop-blur rounded-2xl border border-cherry/10 text-reveal"
                 style={{ '--index': i + 3 }}>
              <h3 className="font-display text-3xl font-bold text-cherry mb-3">{value.title}</h3>
              <p className="text-navy/70">{value.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}