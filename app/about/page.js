'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function About() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
  };

  const skills = [
    { category: 'Frontend', items: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'], icon: '✦' },
    { category: 'Backend', items: ['Supabase', 'Node.js', 'Python', 'REST APIs'], icon: '◇' },
    { category: 'Tools', items: ['Notion', 'Git', 'VS Code', 'Figma'], icon: '❖' },
    { category: 'AI & ML', items: ['OpenAI API', 'Prompt Engineering', 'Chatbots'], icon: '✧' },
  ];

  const values = [
    { 
      icon: '✧', 
      title: 'Curiosity', 
      desc: 'The hunger to learn never sleeps. Every project, every challenge, every failure is a classroom in disguise.',
    },
    { 
      icon: '◈', 
      title: 'Craft', 
      desc: 'Excellence lives in the details. Every pixel placed with intention, every line of code written with care.',
    },
    { 
      icon: '❋', 
      title: 'Connection', 
      desc: 'Technology is cold until humans touch it. I build bridges between innovation and the hearts that need it.',
    },
  ];

  const journey = [
    { year: '2019', title: 'The Foundation', desc: 'Learning the art of service and human connection in retail' },
    { year: '2023', title: 'Leadership Awakens', desc: 'Managing teams, systems, and dreams at Balkan Burger' },
    { year: '2025', title: 'The Pivot', desc: 'Diving into code through SheCodes and never looking back' },
    { year: '2026', title: 'The Emergence', desc: 'Building Mirembe Muse, shipping products, writing the future' },
  ];

  return (
    <div className="min-h-screen bg-beige-cream overflow-hidden">
      
      {/* ============ HERO - The Opening Chapter ============ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Organic background shapes */}
        <motion.div 
          animate={{ scale: [1, 1.15, 1], rotate: [0, 3, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-cherry/5 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ scale: [1.1, 1, 1.1], x: [-20, 20, -20] }}
          transition={{ duration: 18, repeat: Infinity }}
          className="absolute -bottom-20 -left-40 w-[500px] h-[500px] bg-gold/8 rounded-full blur-3xl"
        />
        
        {/* Floating decorative elements */}
        <motion.div 
          animate={{ y: [-25, 25, -25], rotate: [0, 180, 360] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute top-32 right-[18%] w-24 h-24 border border-cherry/20 rounded-full"
        />
        <motion.div 
          animate={{ y: [20, -20, 20] }}
          transition={{ duration: 7, repeat: Infinity }}
          className="absolute top-1/2 left-[8%] w-4 h-4 bg-gold/50 rounded-full"
        />
        <motion.div 
          animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute bottom-32 right-[12%] w-8 h-8 bg-cherry/20 rounded-full blur-sm"
        />
        <motion.div 
          animate={{ y: [-15, 15, -15], x: [10, -10, 10] }}
          transition={{ duration: 9, repeat: Infinity }}
          className="absolute top-[60%] left-[15%] w-16 h-16 border border-gold/20 rounded-full"
        />
        
        <div className="max-w-7xl mx-auto px-6 py-32 relative z-10">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
            
            {/* Left - Photo with Arch Shape (2 cols) */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-2 relative order-2 lg:order-1"
            >
              <div className="relative mx-auto w-full max-w-[320px]">
                {/* Decorative blob behind */}
                <motion.div 
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-8 bg-gradient-to-br from-cherry/10 via-gold/5 to-cherry/10 rounded-full blur-2xl"
                />
                
                {/* Main arch-shaped photo container */}
                <div
                  className="relative aspect-[3/4] overflow-hidden shadow-editorial"
                  style={{
                    borderRadius: '160px 160px 30px 30px',
                    background: 'linear-gradient(135deg, #F9F1E8 0%, #E8DCC4 100%)'
                  }}
                >
                  <img
                    src="/assets/professional/nanda-pic-3.png"
                    alt="Nanda Regine"
                    className="w-full h-full object-contain object-center"
                  />
                </div>
                
                {/* Floating accent shapes */}
                <motion.div 
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -bottom-4 -right-4 w-20 h-20 bg-cherry/20 rounded-full"
                />
                <motion.div 
                  animate={{ y: [8, -8, 8] }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="absolute -top-6 -left-6 w-14 h-14 bg-gold/30 rounded-full"
                />
                
                {/* Small accent badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: 'spring' }}
                  className="absolute -right-2 top-1/4 px-4 py-2 bg-white rounded-full shadow-editorial border border-beige"
                >
                  <span className="text-cherry font-medium text-sm">Poet 🌹</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Right - The Story Intro (3 cols) */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.12 } } }}
              className="lg:col-span-3 order-1 lg:order-2"
            >
              <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-6">
                <div className="h-px w-12 bg-gradient-to-r from-cherry to-gold" />
                <span className="text-cherry text-xs tracking-[0.4em] uppercase font-medium">The Story</span>
              </motion.div>
              
              <motion.h1 variants={fadeInUp} className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-navy mb-8 leading-[1.1]">
                Meet <span className="text-cherry italic">Nanda</span>
                <span className="block text-3xl sm:text-4xl lg:text-5xl mt-2 text-navy/60 font-normal">
                  Regine
                </span>
              </motion.h1>
              
              <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-navy/70 leading-relaxed mb-6 font-serif italic">
                "She codes like she writes poetry...with intention, rhythm, and just enough rebellion to make it unforgettable."
              </motion.p>
              
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-3 mb-8">
                {[
                  { label: 'Creative Technologist', color: 'bg-cherry/10 text-cherry' },
                  { label: 'Published Poet', color: 'bg-gold/20 text-gold-dark' },
                  { label: 'Founder', color: 'bg-navy/10 text-navy' },
                ].map((tag, i) => (
                  <span key={i} className={`px-4 py-2 rounded-full text-sm font-medium ${tag.color}`}>
                    {tag.label}
                  </span>
                ))}
              </motion.div>

              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                <Link 
                  href="/contact"
                  className="group px-8 py-4 bg-cherry text-beige rounded-full font-medium shadow-lg shadow-cherry/20 hover:shadow-cherry/40 transition-all flex items-center gap-2"
                >
                  Let's Work Together
                  <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
                </Link>
                <Link 
                  href="/work"
                  className="px-8 py-4 border-2 border-navy/20 text-navy rounded-full font-medium hover:bg-navy hover:text-beige transition-all"
                >
                  View Experience
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="flex flex-col items-center gap-2">
            <span className="text-navy/30 text-xs tracking-widest uppercase">Scroll</span>
            <div className="w-px h-10 bg-gradient-to-b from-cherry to-transparent" />
          </motion.div>
        </motion.div>
      </section>

      {/* ============ THE ESSENCE - Editorial Story Section ============ */}
      <section className="py-24 bg-white relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-beige to-transparent" />
        
        {/* Decorative shapes */}
        <div className="absolute top-20 right-10 w-32 h-32 bg-cherry/5 rounded-full blur-2xl" />
        <div className="absolute bottom-20 left-10 w-24 h-24 bg-gold/10 rounded-full blur-2xl" />
        
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-gold text-xs tracking-[0.3em] uppercase">The Essence</span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-navy mt-4">
              Where Code Meets <span className="text-cherry italic">Soul</span>
            </h2>
          </motion.div>

          {/* Story Cards - Organic shapes */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Card 1 - Rounded blob */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 md:p-10 bg-beige-cream rounded-[3rem] shadow-soft relative overflow-hidden group hover:shadow-editorial transition-all"
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-cherry/5 rounded-full group-hover:scale-150 transition-transform duration-700" />
              <span className="text-cherry text-4xl mb-4 block">✦</span>
              <h3 className="font-display text-2xl font-bold text-navy mb-4">The Unlikely Path</h3>
              <p className="text-navy/60 leading-relaxed relative z-10">
                From the vibrant streets of Eastern Cape to the cutting edge of tech, Nanda's journey 
                didn't follow the conventional script. Armed with a Business Management foundation from 
                Nelson Mandela University and an insatiable hunger to create, she taught herself to code 
                while most were content with the comfortable path. <span className="text-cherry font-medium">The result? 
                A rare hybrid</span> who speaks fluent boardroom and fluent JavaScript.
              </p>
            </motion.div>

            {/* Card 2 - Different shape */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-8 md:p-10 bg-beige-cream rounded-[3rem] shadow-soft relative overflow-hidden group hover:shadow-editorial transition-all"
            >
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gold/10 rounded-full group-hover:scale-150 transition-transform duration-700" />
              <span className="text-gold text-4xl mb-4 block">◈</span>
              <h3 className="font-display text-2xl font-bold text-navy mb-4">The Dual Identity</h3>
              <p className="text-navy/60 leading-relaxed relative z-10">
                By day, she architects systems that make businesses run smoother - Notion workspaces 
                that feel like works of art, web applications that users actually love. By twilight, 
                she pours her heart onto pages, crafting poetry that has moved audiences from intimate 
                stages to national radio. <span className="text-cherry font-medium">"Inside Her Roses"</span> isn't 
                just her debut collection - it's proof that technical minds can hold infinite tenderness.
              </p>
            </motion.div>
          </div>

          {/* Full-width quote */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 p-10 md:p-14 bg-navy rounded-[3rem] relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cherry/10 to-gold/5" />
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute -right-20 -bottom-20 w-64 h-64 border border-beige/5 rounded-full"
            />
            <div className="relative z-10">
              <span className="text-cherry text-6xl font-serif">"</span>
              <blockquote className="font-serif text-xl md:text-2xl text-beige/90 italic leading-relaxed -mt-8 mb-6">
                I don't build software, I build experiences. Every interface is a conversation, 
                every feature is a story, every line of code is a chance to make someone's day 
                a little bit easier, a little bit more beautiful.
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cherry to-gold flex items-center justify-center text-beige font-bold">
                  N
                </div>
                <div>
                  <span className="text-beige font-medium block">Nanda Regine</span>
                  <span className="text-beige/50 text-sm">Creative Technologist</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ THE JOURNEY - Timeline with Organic Flow ============ */}
      <section className="py-24 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #FDF8F3 0%, #F5EDE3 100%)' }}>
        <motion.div 
          animate={{ x: [-50, 50, -50] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-1/2 left-0 w-96 h-96 bg-cherry/5 rounded-full blur-3xl"
        />
        
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-cherry text-xs tracking-[0.3em] uppercase">The Evolution</span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-navy mt-4">
              A Journey of <span className="text-cherry italic">Becoming</span>
            </h2>
          </motion.div>

          {/* Timeline - Flowing organic design */}
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cherry via-gold to-cherry hidden md:block" />
            
            <div className="space-y-12">
              {journey.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-center gap-6 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Content card - alternating sides */}
                  <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className={`inline-block p-6 md:p-8 bg-white rounded-[2rem] shadow-soft hover:shadow-editorial transition-all ${i % 2 === 0 ? 'md:ml-auto' : ''}`}>
                      <span className="text-gold font-display text-sm tracking-wider">{item.year}</span>
                      <h3 className="font-display text-xl md:text-2xl font-bold text-navy mt-1 mb-2">{item.title}</h3>
                      <p className="text-navy/60">{item.desc}</p>
                    </div>
                  </div>
                  
                  {/* Center dot */}
                  <div className="hidden md:flex items-center justify-center">
                    <motion.div 
                      whileHover={{ scale: 1.3 }}
                      className="w-5 h-5 rounded-full bg-cherry shadow-lg shadow-cherry/30 z-10"
                    />
                  </div>
                  
                  {/* Spacer for opposite side */}
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ SKILLS - Dark Feature Section ============ */}
      <section className="py-24 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        {/* Glowing orbs */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-cherry/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/15 rounded-full blur-[120px]" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-gold text-xs tracking-[0.3em] uppercase">The Arsenal</span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-beige mt-4">
              Skills & <span className="text-cherry italic">Superpowers</span>
            </h2>
          </motion.div>

          {/* Skills grid - Organic card shapes */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {skills.map((skillGroup, i) => (
              <motion.div
                key={skillGroup.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -8 }}
                className="p-6 md:p-8 bg-white/5 backdrop-blur-sm rounded-[2rem] border border-beige/10 hover:border-cherry/30 transition-all group"
              >
                <span className="text-cherry text-3xl mb-4 block group-hover:scale-110 transition-transform">{skillGroup.icon}</span>
                <h3 className="font-display text-xl font-bold text-beige mb-4">{skillGroup.category}</h3>
                <ul className="space-y-2">
                  {skillGroup.items.map((skill) => (
                    <li key={skill} className="text-beige/70 text-sm flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-cherry rounded-full shrink-0" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ VALUES - Light Elegant Section ============ */}
      <section className="py-24 bg-beige-cream relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-beige to-transparent" />
        
        {/* Soft decorative shapes */}
        <div className="absolute top-20 right-20 w-40 h-40 bg-cherry/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-32 h-32 bg-gold/10 rounded-full blur-3xl" />
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-cherry text-xs tracking-[0.3em] uppercase">The Heart</span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-navy mt-4">
              Guiding <span className="text-cherry italic">Values</span>
            </h2>
            <p className="text-navy/50 mt-4 max-w-xl mx-auto">
              The principles that shape every line of code, every design decision, every word written.
            </p>
          </motion.div>

          {/* Values - Unique shapes for each */}
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                whileHover={{ y: -10 }}
                className="group text-center"
              >
                {/* Different shapes for each card */}
                <div 
                  className={`p-8 md:p-10 bg-white shadow-soft hover:shadow-editorial transition-all relative overflow-hidden ${
                    i === 0 ? 'rounded-[3rem_1rem_3rem_1rem]' : 
                    i === 1 ? 'rounded-[2rem]' : 
                    'rounded-[1rem_3rem_1rem_3rem]'
                  }`}
                >
                  {/* Hover gradient */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity ${
                    i === 0 ? 'bg-gradient-to-br from-cherry/5 to-transparent' :
                    i === 1 ? 'bg-gradient-to-br from-gold/10 to-transparent' :
                    'bg-gradient-to-br from-cherry/5 to-gold/5'
                  }`} />
                  
                  <div className="relative z-10">
                    <motion.span 
                      className={`text-5xl mb-6 block ${i === 1 ? 'text-gold' : 'text-cherry'}`}
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      {value.icon}
                    </motion.span>
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-navy mb-4 group-hover:text-cherry transition-colors">
                      {value.title}
                    </h3>
                    <p className="text-navy/60 leading-relaxed">{value.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ THE VISION - Closing Statement ============ */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cherry/5 to-transparent" />
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="text-6xl mb-8"
            >
              🌹
            </motion.div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-navy mb-6 leading-tight">
              Building the future while honoring the past. <br />
              <span className="text-cherry italic">African excellence, global standards.</span>
            </h2>
            <p className="text-navy/60 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
              Nanda represents a new generation of African creators - fluent in technology, rooted in culture, 
              and unafraid to take up space. She's not just building products; she's building proof that 
              brilliance has no borders, no limitations, and no expiration date.
            </p>
            
            {/* Final CTA pills */}
            <div className="flex flex-wrap gap-4 justify-center">
              <Link 
                href="/poetry"
                className="px-6 py-3 bg-beige-cream rounded-full text-navy hover:bg-navy hover:text-beige transition-all border border-beige"
              >
                📖 Read Her Poetry
              </Link>
              <Link 
                href="/work"
                className="px-6 py-3 bg-beige-cream rounded-full text-navy hover:bg-navy hover:text-beige transition-all border border-beige"
              >
                💼 See Her Work
              </Link>
              <Link 
                href="/contact"
                className="px-6 py-3 bg-beige-cream rounded-full text-navy hover:bg-navy hover:text-beige transition-all border border-beige"
              >
                ✉️ Get In Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ CTA - Cherry Gradient Finale ============ */}
      <section className="py-24 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #C1292E 0%, #8B1E23 50%, #0A1128 100%)' }}>
        {/* Animated shapes */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-10 left-10 w-40 h-40 border border-beige/10 rounded-full"
        />
        <motion.div 
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-10 right-10 w-60 h-60 border border-gold/10 rounded-full"
        />
        <motion.div 
          animate={{ y: [-20, 20, -20] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-1/2 right-[20%] w-8 h-8 bg-gold/20 rounded-full"
        />
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-beige mb-6">
              Let's Build Something Beautiful
            </h2>
            <p className="text-beige/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
              Whether you need a web application, Notion system, creative collaboration, or just want 
              to connect — I'd love to hear from you.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link 
                href="/contact"
                className="px-10 py-4 bg-beige text-cherry rounded-full font-bold text-lg hover:bg-white transition-colors shadow-lg"
              >
                Start a Conversation
              </Link>
              <a 
                href="mailto:nandaregine@gmail.com"
                className="px-10 py-4 border-2 border-beige/50 text-beige rounded-full font-medium text-lg hover:bg-beige/10 transition-colors"
              >
                nandaregine@gmail.com
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}