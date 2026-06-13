'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const FEATURED = {
  text: 'Nanda Regine is a rare and extraordinary talent who has left an indelible mark on our business. Her contributions have directly driven growth, enhanced our turnover, and solidified our foundations for the future. I have no doubt that she will continue to excel in any environment where leadership, innovation, and commitment are valued.',
  author: 'Bojan Ivanovic',
  title: 'Co-Founder, Balkan Burger Pty Ltd',
  date: 'December 2024',
};

export const RECOMMENDATIONS = [
  {
    name: 'Zintle Joko',
    initials: 'ZJ',
    title: 'Entrepreneur | Events Planner | Founder of Joko & Co | Social Media Manager',
    date: 'August 25, 2025',
    relationship: 'Worked with Nanda on the same team',
    context: 'Balkan Burger',
    text: `I had the absolute privilege of working alongside Nanda as a fellow manager at Balkan Burger, and I can confidently say she is the best person I have ever worked with. From the moment she started, she made an incredible impact, bringing structure, creativity, and positivity that completely elevated the workplace.

Nanda has an amazing work ethic and is one of the most reliable professionals I know. She approaches challenges with innovative problem-solving skills, never settling for quick fixes but instead finding sustainable, smart solutions. Her attention to detail is unmatched, and she has a gift for balancing efficiency with creativity in a way that makes everything run smoothly.

What really sets Nanda apart is her positive attitude and sense of humor, which made even the most stressful days enjoyable. She creates an environment where people feel supported, motivated, and inspired to bring their best. She's not only a strong leader but also an incredible team player who always puts the bigger picture first.`,
  },
  {
    name: 'Bojan Ivanović',
    initials: 'BI',
    title: 'Co-Founder at Balkan Burger Pty Ltd',
    date: 'January 19, 2025',
    relationship: 'Bojan managed Nanda directly',
    context: 'Balkan Burger',
    text: `I had the absolute privilege of working alongside Nanda Regine for two transformative years at Balkan Burger, where she held the role of Junior Manager. Let me tell you, Nanda is one of those rare gems who not only meets expectations but consistently redefines what excellence looks like.

Nanda has an unmatched ability to balance strategy with execution but what truly sets her apart is her exceptional emotional intelligence and natural leadership. She possesses a remarkable ability to understand team dynamics, foster open communication, and respond to challenges with empathy and clarity, creating a culture of trust and collaboration. Nanda's talent for rallying teams, inspiring creativity, and aligning everyone around a shared vision has consistently driven both morale and results, making her an invaluable asset of our organisation. In short, Nanda is a powerhouse of talent and energy!`,
  },
  {
    name: 'Nicole Carlisle',
    initials: 'NC',
    title: 'Team Member at Balkan Burger',
    date: 'August 24, 2025',
    relationship: 'Nicole reported directly to Nanda',
    context: 'Balkan Burger',
    text: `I had the absolute pleasure of working under my manager Nanda, at Balkan Burger, and it was an incredible experience. She is one of the most helpful, efficient, and kind leaders I've worked with, always going the extra mile to guide and support her team.

Nanda's approachable nature, patience, and professionalism created a positive and motivating workplace environment where everyone felt valued. At the same time, her high standards and strong work ethic set an excellent example for us all to follow.

I am truly grateful for the skills and confidence I gained while working with her. Having such a supportive and inspiring manager made a lasting impact on my growth, both professionally and personally.`,
  },
  {
    name: 'Lindokuhle Nkwanyane',
    initials: 'LN',
    title: 'Writer & Visual Thinker | Passionate About Storytelling',
    date: 'August 23, 2025',
    relationship: 'Lindokuhle reported directly to Nanda',
    context: 'Balkan Burger',
    text: `I had the pleasure of working with Nanda during her time as Manager, and I can confidently say she was a fantastic colleague to work with. She's incredibly efficient, always ensuring tasks are well-organized and clearly communicated to the team. Her regular check-in meetings kept everything on track and helped create a smooth workflow.

What stood out most was her supportive nature and positive energy—she brought a lively spirit that uplifted the entire restaurant. She's a hardworking, friendly professional who made the workplace feel both productive and enjoyable. Any team would be lucky to have her!`,
  },
  {
    name: 'Amy Gajjar',
    initials: 'AG',
    title: 'Award-Winning Creative Consultant | Packaging Designer @ Woolworths | Brand Design & Creative Direction',
    date: 'September 4, 2025',
    relationship: 'Amy worked with Nanda on the same team',
    context: 'Balkan Burger',
    text: `Had the pleasure of working with Nanda when I was consulting at Balkan Burger in early 2024. Not only is she an amazing leader, but her attention to detail is extremely admirable. Her positivity and can-do attitude is truly inspirational and she is an asset to any business she works with.

I cannot recommend Nanda enough. Any team or company would be lucky to have her, not just for her professionalism and skills, but for the energy, vision, and heart she brings to her work.`,
  },
  {
    name: 'Maqawe Mvume',
    initials: 'MM',
    title: 'Dreaming of bringing the world together with unique and evolutionary ideas',
    date: 'August 25, 2025',
    relationship: 'Maqawe worked with Nanda on the same team',
    context: 'Sportsmans Warehouse',
    text: `I had the pleasure of working alongside Nanda at Sportsmans Warehouse, where we were both retail sales assistants. During this time, I was consistently impressed by her exceptional work ethic and natural leadership skills.

Nanda approaches every task with focus, dedication, and a positive attitude, setting a high standard for those around her. She has a sharp mind and the ability to quickly understand and respond to challenges, often taking initiative to guide the team when needed. Her professionalism, reliability, and strong problem-solving skills made her a valuable asset to the workplace.

I highly commend Nanda for her outstanding contributions and have no doubt that she will excel in any role she takes on.`,
  },
];

function RecCard({ rec, index }: { rec: typeof RECOMMENDATIONS[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const preview = rec.text.slice(0, 220) + '…';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.07, duration: 0.55 }}
    >
      <div
        className="relative overflow-hidden bg-white/90 backdrop-blur-sm rounded-[28px] cursor-pointer hover:shadow-lg transition-all duration-300"
        onClick={() => setExpanded(e => !e)}
      >
        <div className="h-1.5 bg-gradient-to-r from-[#C1292E] via-[#B8860B] to-[#C1292E]" />
        <div className="p-6 md:p-8">
          <div className="flex items-start gap-4 mb-5">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C1292E] to-[#B8860B] flex items-center justify-center text-white font-bold text-sm shrink-0">
              {rec.initials}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-display text-lg font-bold text-[#0A1128] truncate">{rec.name}</h3>
              <p className="text-[#0A1128]/55 text-xs line-clamp-2 mt-0.5">{rec.title}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[#C1292E] text-xs">{rec.date}</span>
                <span className="text-[#0A1128]/20">·</span>
                <span className="text-[#B8860B] text-xs">{rec.context}</span>
              </div>
            </div>
            <motion.span
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-[#C1292E] text-lg shrink-0"
            >
              ↓
            </motion.span>
          </div>

          <div className="text-[#B8860B]/25 text-5xl font-serif leading-none mb-2">&ldquo;</div>

          <AnimatePresence initial={false}>
            {expanded ? (
              <motion.div
                key="full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="text-[#0A1128]/75 text-sm leading-relaxed space-y-3"
              >
                {rec.text.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
              </motion.div>
            ) : (
              <motion.p key="preview" className="text-[#0A1128]/75 text-sm leading-relaxed">
                {preview}
              </motion.p>
            )}
          </AnimatePresence>

          <p className="mt-4 text-[#C1292E] text-xs font-medium">
            {expanded ? 'Show less' : 'Read full recommendation'} →
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function TestimonialsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#E8DCC4] via-[#F5EFE6] to-[#E8DCC4]">
      <div className="fixed inset-0 pointer-events-none opacity-25 z-0" style={{ backgroundImage: GRAIN }} />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative z-10 bg-[#0A1128] pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-30" style={{ backgroundImage: GRAIN }} />
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#C1292E]/15 pointer-events-none" style={{ borderRadius: '0 0 0 100%' }} />
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-sans text-xs tracking-[0.35em] uppercase text-[#B8860B] mb-5"
          >
            LinkedIn Recommendations
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-5xl md:text-7xl font-bold text-white leading-[0.92] mb-6"
          >
            What people<br />
            <span className="text-[#C1292E]">say about Nanda.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-lg max-w-xl leading-relaxed"
          >
            Six LinkedIn recommendations from managers, peers, and direct reports — spanning
            hospitality, retail, and creative consulting.
          </motion.p>
        </div>
      </section>

      {/* ── FEATURED QUOTE — Bojan ───────────────────────────────────────── */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative bg-[#0A1128] p-8 md:p-14 overflow-hidden"
            style={{ borderRadius: '60px 20px 60px 20px' }}
          >
            <div className="absolute inset-0 pointer-events-none opacity-25" style={{ backgroundImage: GRAIN }} />
            <div className="absolute top-0 right-0 w-56 h-56 bg-[#C1292E]/25 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-36 h-36 bg-[#B8860B]/20 rounded-full blur-xl pointer-events-none" />
            <div className="relative z-10">
              <p className="font-sans text-xs tracking-[0.3em] uppercase text-[#B8860B] mb-5">Featured Recommendation</p>
              <div className="text-[#B8860B]/40 text-7xl font-serif leading-none mb-4">&ldquo;</div>
              <blockquote className="font-display text-xl md:text-2xl text-[#E8DCC4] leading-relaxed mb-8">
                {FEATURED.text}
              </blockquote>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-6 border-t border-[#E8DCC4]/15">
                <div>
                  <p className="font-display text-xl font-bold text-[#C1292E]">{FEATURED.author}</p>
                  <p className="text-[#E8DCC4]/60 text-sm">{FEATURED.title}</p>
                </div>
                <span className="text-[#B8860B] text-sm font-mono">{FEATURED.date}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── RECOMMENDATIONS GRID ─────────────────────────────────────────── */}
      <section className="relative z-10 pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-6 mb-12"
          >
            <div className="w-12 h-px bg-[#C1292E]" />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0A1128]">
              All <span className="text-[#C1292E]">Recommendations</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5">
            {RECOMMENDATIONS.map((rec, i) => (
              <RecCard key={rec.name} rec={rec} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="relative z-10 py-20 px-6 bg-[#C1292E]">
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: GRAIN }} />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="font-display text-4xl md:text-5xl font-bold italic text-white mb-6">
            Ready to add your name to this list?
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/consulting"
              className="px-8 py-4 bg-white text-[#C1292E] rounded-full font-semibold hover:bg-white/90 transition-all hover:scale-105"
            >
              Work with Nanda →
            </Link>
            <Link
              href="/work"
              className="px-8 py-4 border-2 border-white/40 text-white rounded-full font-semibold hover:border-white hover:bg-white/10 transition-all"
            >
              View full work history
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
