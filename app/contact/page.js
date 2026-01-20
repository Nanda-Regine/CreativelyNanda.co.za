'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Poetic farewell lines that rotate
const poeticLines = [
  "Every ending is simply a new beginning wearing different clothes.",
  "We met as strangers, we part as possibilities.",
  "The seeds we plant in conversation bloom in unexpected gardens.",
  "Connection is the poetry the universe writes through us.",
  "In the space between hello and goodbye, magic lives."
];

// Social/Connect Links
const connectLinks = [
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/nandawulakabali-kagwa-584bb0262',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
      </svg>
    ),
    color: '#0077B5',
    description: 'Professional network'
  },
  {
    name: 'GitHub',
    url: 'https://github.com/Nanda-Regine',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
    color: '#333',
    description: 'Code & projects'
  },
  {
    name: 'Substack',
    url: 'https://creativelynanda.substack.com',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/>
      </svg>
    ),
    color: '#FF6719',
    description: 'Newsletter & essays'
  },
  {
    name: 'Medium',
    url: 'https://medium.com/@creativelynanda',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
      </svg>
    ),
    color: '#000',
    description: 'Long-form writing'
  },
  {
    name: 'Twitter/X',
    url: 'https://twitter.com/creativelynanda',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
    color: '#000',
    description: 'Thoughts & updates'
  },
  {
    name: 'Slack',
    url: 'https://creativelynanda.slack.com',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/>
      </svg>
    ),
    color: '#4A154B',
    description: 'Community & collaboration'
  }
];

// Services
const services = [
  { icon: '💻', title: 'Web Development', desc: 'Full-stack applications with React, Next.js & more' },
  { icon: '🗂️', title: 'Notion Systems', desc: 'Custom operating systems for your business' },
  { icon: '🤖', title: 'AI Integration', desc: 'Chatbots, automation & intelligent solutions' },
  { icon: '🎤', title: 'Poetry & Speaking', desc: 'Workshops, performances & creative collaborations' }
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [currentPoem, setCurrentPoem] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Rotate poetic lines
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPoem((prev) => (prev + 1) % poeticLines.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Track mouse for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8DCC4] via-[#F5EFE6] to-[#E8DCC4] overflow-hidden">
      {/* Texture overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.12]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Animated background orbs with parallax */}
      <motion.div 
        className="fixed top-20 right-10 w-[400px] h-[400px] bg-gradient-to-bl from-[#C1292E]/15 to-transparent rounded-full blur-3xl pointer-events-none"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
        }}
        transition={{ type: 'spring', stiffness: 50, damping: 30 }}
      />
      <motion.div 
        className="fixed bottom-20 left-10 w-[300px] h-[300px] bg-gradient-to-tr from-[#B8860B]/15 to-transparent rounded-full blur-3xl pointer-events-none"
        animate={{
          x: -mousePosition.x,
          y: -mousePosition.y,
        }}
        transition={{ type: 'spring', stiffness: 50, damping: 30 }}
      />

      {/* ===== HERO SECTION ===== */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 px-6">
        <div className="max-w-6xl mx-auto relative z-10">
          {/* Editorial header */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-6 mb-8"
          >
            <div className="w-20 md:w-32 h-px bg-[#C1292E]" />
            <span className="text-[#C1292E] text-xs md:text-sm font-medium tracking-[0.3em] uppercase">
              Let's Create Together
            </span>
            <div className="flex-1 h-px bg-[#C1292E]/20" />
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-[#0A1128] mb-6"
          >
            Get in <span className="text-[#C1292E]">Touch</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-[#0A1128]/70 leading-relaxed max-w-2xl"
          >
            Every great collaboration begins with a simple hello. Whether you have a project in mind, 
            a question to ask, or just want to connect, my inbox is always open for meaningful conversations.
          </motion.p>
        </div>
      </section>

      {/* ===== MAIN CONTENT ===== */}
      <section className="relative py-12 md:py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            
            {/* LEFT SIDE - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div 
                className="relative bg-white p-8 md:p-10 overflow-hidden shadow-xl"
                style={{ borderRadius: '40px 16px 40px 16px' }}
              >
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#C1292E]/10 to-transparent" 
                     style={{ borderRadius: '0 16px 0 100%' }} />
                
                <div className="relative z-10">
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-[#0A1128] mb-2">
                    Send a Message
                  </h2>
                  <p className="text-[#0A1128]/60 mb-8">
                    I typically respond within 24-48 hours
                  </p>

                  <AnimatePresence mode="wait">
                    {submitted ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-12"
                      >
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                          <span className="text-4xl">✨</span>
                        </div>
                        <h3 className="font-display text-2xl font-bold text-[#0A1128] mb-2">
                          Message Sent!
                        </h3>
                        <p className="text-[#0A1128]/60 mb-6">
                          Thank you for reaching out. I'll be in touch soon.
                        </p>
                        <button
                          onClick={() => setSubmitted(false)}
                          className="text-[#C1292E] font-medium hover:underline"
                        >
                          Send another message
                        </button>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="form"
                        onSubmit={handleSubmit}
                        className="space-y-6"
                      >
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-[#0A1128] font-medium mb-2 text-sm">Your Name</label>
                            <input
                              type="text"
                              value={formData.name}
                              onChange={(e) => setFormData({...formData, name: e.target.value})}
                              className="w-full px-5 py-4 bg-[#F5EFE6] rounded-2xl border-2 border-transparent focus:border-[#C1292E] focus:outline-none transition-all text-[#0A1128]"
                              placeholder="Jane Doe"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-[#0A1128] font-medium mb-2 text-sm">Email Address</label>
                            <input
                              type="email"
                              value={formData.email}
                              onChange={(e) => setFormData({...formData, email: e.target.value})}
                              className="w-full px-5 py-4 bg-[#F5EFE6] rounded-2xl border-2 border-transparent focus:border-[#C1292E] focus:outline-none transition-all text-[#0A1128]"
                              placeholder="jane@example.com"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[#0A1128] font-medium mb-2 text-sm">Subject</label>
                          <select
                            value={formData.subject}
                            onChange={(e) => setFormData({...formData, subject: e.target.value})}
                            className="w-full px-5 py-4 bg-[#F5EFE6] rounded-2xl border-2 border-transparent focus:border-[#C1292E] focus:outline-none transition-all text-[#0A1128] appearance-none cursor-pointer"
                            required
                          >
                            <option value="">Select a topic...</option>
                            <option value="web-dev">Web Development Project</option>
                            <option value="notion">Notion Systems</option>
                            <option value="ai">AI Integration</option>
                            <option value="poetry">Poetry / Speaking</option>
                            <option value="collaboration">Collaboration</option>
                            <option value="other">Just saying hello!</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[#0A1128] font-medium mb-2 text-sm">Your Message</label>
                          <textarea
                            value={formData.message}
                            onChange={(e) => setFormData({...formData, message: e.target.value})}
                            rows={5}
                            className="w-full px-5 py-4 bg-[#F5EFE6] rounded-2xl border-2 border-transparent focus:border-[#C1292E] focus:outline-none transition-all text-[#0A1128] resize-none"
                            placeholder="Tell me about your project, idea, or just say hi..."
                            required
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-4 bg-gradient-to-r from-[#C1292E] to-[#a82226] text-white rounded-2xl font-medium hover:shadow-xl transition-all hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          {isSubmitting ? (
                            <>
                              <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                              </svg>
                              Sending...
                            </>
                          ) : (
                            <>
                              Send Message
                              <span>→</span>
                            </>
                          )}
                        </button>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

            {/* RIGHT SIDE - Contact Info & Links */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Direct Contact */}
              <div 
                className="bg-[#0A1128] p-8 relative overflow-hidden"
                style={{ borderRadius: '16px 40px 16px 40px' }}
              >
                <div className="absolute top-0 left-0 w-40 h-40 bg-[#C1292E]/20 rounded-full blur-2xl" />
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#B8860B]/20 rounded-full blur-xl" />
                
                <div className="relative z-10">
                  <h3 className="font-display text-2xl font-bold text-[#E8DCC4] mb-6">Direct Contact</h3>
                  
                  <div className="space-y-6">
                    {/* Email */}
                    <a 
                      href="mailto:nandaregine@gmail.com"
                      className="flex items-center gap-4 group"
                    >
                      <div className="w-12 h-12 bg-[#C1292E]/20 rounded-xl flex items-center justify-center group-hover:bg-[#C1292E] transition-colors">
                        <svg className="w-5 h-5 text-[#C1292E] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[#E8DCC4]/60 text-sm">Email</p>
                        <p className="text-[#E8DCC4] font-medium group-hover:text-[#C1292E] transition-colors">
                          nandaregine@gmail.com
                        </p>
                      </div>
                    </a>

                    {/* Location */}
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#B8860B]/20 rounded-xl flex items-center justify-center">
                        <svg className="w-5 h-5 text-[#B8860B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[#E8DCC4]/60 text-sm">Based in</p>
                        <p className="text-[#E8DCC4] font-medium">East London, South Africa</p>
                        <p className="text-[#E8DCC4]/50 text-xs mt-0.5">Available for remote work worldwide 🌍</p>
                      </div>
                    </div>

                    {/* Availability */}
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                      </div>
                      <div>
                        <p className="text-[#E8DCC4]/60 text-sm">Status</p>
                        <p className="text-green-400 font-medium">Open for opportunities</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Services Quick Links */}
              <div>
                <h3 className="font-display text-xl font-bold text-[#0A1128] mb-4">What I Can Help With</h3>
                <div className="grid grid-cols-2 gap-3">
                  {services.map((service, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="p-4 bg-white/60 backdrop-blur-sm rounded-2xl hover:bg-white hover:shadow-lg transition-all group cursor-pointer"
                    >
                      <span className="text-2xl mb-2 block group-hover:scale-110 transition-transform">{service.icon}</span>
                      <h4 className="font-bold text-[#0A1128] text-sm mb-1">{service.title}</h4>
                      <p className="text-[#0A1128]/50 text-xs">{service.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Connect Links */}
              <div>
                <h3 className="font-display text-xl font-bold text-[#0A1128] mb-4">Let's Connect</h3>
                <div className="flex flex-wrap gap-3">
                  {connectLinks.map((link, i) => (
                    <motion.a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ y: -3 }}
                      className="group flex items-center gap-2 px-4 py-2.5 bg-white/70 backdrop-blur-sm rounded-full hover:shadow-lg transition-all hover:bg-white"
                    >
                      <span style={{ color: link.color }}>
                        {link.icon}
                      </span>
                      <span className="text-[#0A1128] text-sm font-medium">
                        {link.name}
                      </span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== POETIC FAREWELL SECTION ===== */}
      <section className="relative py-24 md:py-32 px-6 overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            {/* Large decorative rose */}
            <div className="absolute -top-20 -left-20 text-[200px] md:text-[300px] opacity-[0.03] pointer-events-none select-none">
              🌹
            </div>
            
            <div 
              className="relative bg-gradient-to-br from-[#0A1128] via-[#1a2744] to-[#0A1128] p-10 md:p-16 lg:p-20 overflow-hidden"
              style={{ borderRadius: '60px 20px 60px 20px' }}
            >
              {/* Animated gradient orbs */}
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#C1292E]/20 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-[#B8860B]/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
              
              {/* Stars decoration */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      opacity: Math.random() * 0.5 + 0.2
                    }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 0.8, 0.3]
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2
                    }}
                  />
                ))}
              </div>
              
              <div className="relative z-10 text-center">
                {/* Section label */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#B8860B]/20 rounded-full mb-8"
                >
                  <span className="text-[#B8860B]">✦</span>
                  <span className="text-[#B8860B] text-sm font-medium tracking-wide">Before You Go</span>
                  <span className="text-[#B8860B]">✦</span>
                </motion.div>

                {/* Main farewell message */}
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[#E8DCC4] mb-8 leading-tight"
                >
                  Thank you for walking through<br />
                  <span className="text-[#C1292E]">my digital garden</span> 🌹
                </motion.h2>

                {/* Rotating poetic lines */}
                <div className="h-24 md:h-20 flex items-center justify-center mb-10">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={currentPoem}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="font-display text-xl md:text-2xl text-[#E8DCC4]/70 italic max-w-2xl"
                    >
                      "{poeticLines[currentPoem]}"
                    </motion.p>
                  </AnimatePresence>
                </div>

                {/* Poem dots indicator */}
                <div className="flex justify-center gap-2 mb-10">
                  {poeticLines.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPoem(i)}
                      className={`h-1.5 rounded-full transition-all ${
                        currentPoem === i ? 'bg-[#C1292E] w-8' : 'bg-[#E8DCC4]/30 w-1.5 hover:bg-[#E8DCC4]/50'
                      }`}
                    />
                  ))}
                </div>

                {/* Personal note */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 max-w-2xl mx-auto border border-[#E8DCC4]/10"
                >
                  <p className="text-[#E8DCC4]/80 leading-relaxed mb-6">
                    Whether you came here for code or poetry, systems or stories, I hope you found 
                    something that resonated. Every visitor to this space carries a piece of it with them, 
                    and leaves a piece of themselves behind. That's the beauty of connection.
                  </p>
                  <p className="text-[#E8DCC4]/80 leading-relaxed mb-6">
                    I believe technology should feel human, design should tell stories, and every 
                    line of code is poetry waiting to be understood. If any of that speaks to you, 
                    let's create something beautiful together.
                  </p>
                  <div className="flex items-center justify-center gap-4">
                    <div className="h-px w-12 bg-[#B8860B]/50" />
                    <span className="text-[#B8860B] font-display text-lg">Nanda</span>
                    <div className="h-px w-12 bg-[#B8860B]/50" />
                  </div>
                </motion.div>

                {/* Final signature */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="mt-12"
                >
                  <p className="text-[#E8DCC4]/50 text-sm mb-4">
                    Built with 💕 and lots of ☕ in East London, South Africa
                  </p>
                  <div className="flex justify-center gap-8 text-[#E8DCC4]/30 text-sm">
                    <span>Poet</span>
                    <span>•</span>
                    <span>Developer</span>
                    <span>•</span>
                    <span>Dreamer</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== FINAL FLOURISH ===== */}
      <section className="relative py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            {/* Rose decoration */}
            <div className="flex justify-center items-center gap-4 mb-8">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#C1292E]/50" />
              <motion.span 
                className="text-4xl"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                🌹
              </motion.span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#C1292E]/50" />
            </div>
            
            <p className="font-display text-2xl md:text-3xl text-[#0A1128] mb-2">
              Until we meet again,
            </p>
            <p className="text-[#0A1128]/50 text-lg italic">
              may your code compile and your creativity flourish.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer decoration */}
      <div className="relative h-32 overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0">
          {/* Wave SVG */}
          <svg viewBox="0 0 1440 120" className="w-full h-auto fill-[#0A1128]/5">
            <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" />
          </svg>
        </div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {[...Array(7)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="w-2 h-2 rounded-full"
              style={{ 
                backgroundColor: i === 3 ? '#C1292E' : '#B8860B',
                opacity: i === 3 ? 1 : 0.3 + (Math.abs(3 - i) * -0.05 + 0.3)
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}