'use client';

export default function Education() {
  const education = [
    {
      degree: 'Advanced Diploma in Business Management Practice',
      institution: 'Nelson Mandela University',
      type: 'Business & Management',
      icon: '🎓'
    },
    {
      degree: 'Diploma in Management',
      institution: 'Nelson Mandela University',
      type: 'Management',
      icon: '📊'
    },
    {
      degree: 'Higher Certificate in Business Management',
      institution: 'Nelson Mandela University',
      type: 'Business Foundation',
      icon: '📈'
    }
  ];

  const certifications = [
    { name: 'SheCodes - Introduction to Coding', focus: 'Programming Fundamentals', icon: '💻' },
    { name: 'SheCodes - Introduction to Web Development', focus: 'HTML, CSS, JavaScript', icon: '🌐' },
    { name: 'GreatLearning - Master Generative AI', focus: 'AI & Machine Learning', icon: '🤖' },
    { name: 'ChatGPT for Business Communication', focus: 'AI-Powered Communication', icon: '💬' }
  ];

  return (
    <div className="page-transition min-h-screen bg-gradient-to-br from-white via-beige-light to-beige py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-display text-6xl md:text-8xl font-bold text-navy mb-6 text-reveal">
          Education
        </h1>
        <p className="text-xl text-navy/70 mb-16">
          Business foundation + technical skills = creative technologist
        </p>

        {/* Formal Education */}
        <div className="mb-16">
          <h2 className="font-display text-4xl font-bold text-cherry mb-8">Formal Education</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {education.map((edu, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-lg text-reveal hover:-translate-y-2 transition-transform"
                   style={{ '--index': i }}>
                <div className="text-5xl mb-4">{edu.icon}</div>
                <h3 className="font-display text-2xl font-bold text-navy mb-2">{edu.degree}</h3>
                <p className="text-cherry font-medium mb-2">{edu.institution}</p>
                <p className="text-navy/60 text-sm">{edu.type}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Certifications */}
        <div className="mb-16">
          <h2 className="font-display text-4xl font-bold text-cherry mb-8">Technical Training</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {certifications.map((cert, i) => (
              <div key={i} className="bg-navy p-6 rounded-2xl text-beige text-reveal hover:scale-105 transition-transform"
                   style={{ '--index': i + 3 }}>
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{cert.icon}</div>
                  <div>
                    <h3 className="font-display text-xl font-bold mb-2">{cert.name}</h3>
                    <p className="text-beige/70 text-sm">{cert.focus}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Journey */}
        <div className="p-8 bg-gradient-to-r from-cherry/10 to-beige/20 rounded-2xl text-reveal" style={{ '--index': 7 }}>
          <h3 className="font-display text-3xl font-bold text-navy mb-4">The Journey</h3>
          <p className="text-lg text-navy/80 leading-relaxed mb-4">
            Started with business management foundations at Nelson Mandela University, then fell 
            in love with code through SheCodes. Merged business acumen with technical skills to 
            become a creative technologist who understands both the boardroom and the codebase.
          </p>
          <p className="text-lg text-navy/80 leading-relaxed">
            Now leveraging AI and prompt engineering to build faster, smarter, and more creatively. 
            Every project is a new classroom.
          </p>
        </div>
      </div>
    </div>
  );
}