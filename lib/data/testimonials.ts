/**
 * Testimonials data.
 *
 * ⚠️ MOVED OUT OF `app/testimonials/page.tsx`, where `RECOMMENDATIONS` was a
 * named export from a page file. Next does not allow that: a page module may
 * only export `default`, `metadata`, `generateStaticParams` and a fixed set of
 * route options. It was a real type error, invisible only because
 * `next.config.js` sets `typescript.ignoreBuildErrors: true` — so the build
 * shipped and `tsc --noEmit` complained into the void.
 *
 * Data belongs in `lib/data/` anyway; the page renders it.
 */

export const FEATURED = {
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

/**
 * READER REPLIES — the poetry platform, and the strongest material on the page.
 *
 * Fourteen screenshots of real readers responding to individual poems sat in
 * `public/assets/reviews/` and appeared nowhere on the site. Professional
 * recommendations say she is good to work with; these say the writing landed on
 * a stranger, which is a different and harder claim to make about yourself.
 *
 * Every quote below was transcribed from the screenshot at full resolution, not
 * paraphrased. The screenshots ship alongside as the evidence.
 *
 * ⚠️ Denis Kutosi's is a criticism, and it stays. A page of unanimous praise
 * reads as a page that was curated; one dissent in nine is what makes the other
 * eight believable. It is also, on the merits, a fair note.
 */
export interface ReaderReply {
  reader: string;
  poem: string;
  text: string;
  /** Cloudinary id under creativelynanda/ for the original screenshot. */
  shot: string;
  /** True where the reader is arguing with the work rather than praising it. */
  dissent?: boolean;
}

export const READER_REPLIES: ReaderReply[] = [
  {
    reader: 'Krystöff',
    poem: 'To Bloom',
    text: 'What an incredible journey you chronicled here… a fascinating footprint from girlhood into womanhood… Truly a remarkable story, most inspiring!',
    shot: 'reviews/review-2',
  },
  {
    reader: 'Rosetta',
    poem: 'This life thing',
    text: 'I love the pauses between the lines of this poem… I love the back and forth pendulum of reality to dreams, and there is so much depth and delivery to this poem. Amazing job!',
    shot: 'reviews/review-8',
  },
  {
    reader: 'LisaCarol',
    poem: 'On advice',
    text: 'This was simply fabulous. Young woman could certainly use this advice to be read over-and-over again. Thank you for sharing your writing.',
    shot: 'reviews/review-5',
  },
  {
    reader: 'Brandon',
    poem: 'Our Chapter',
    text: 'I really enjoyed this write. The imagery and flow were on point. Thank you for the tight share.',
    shot: 'reviews/review-2',
  },
  {
    reader: 'Denis Kutosi',
    poem: 'Our Chapter',
    text: 'The poem employs imagery to perfection — but it feels more prose than poetry.',
    shot: 'reviews/review-9',
    dissent: true,
  },
];

/** Every reader screenshot, for the wall. */
export const READER_SHOTS = [
  'reviews/review-1', 'reviews/review-2', 'reviews/review-3', 'reviews/review-4',
  'reviews/review-5', 'reviews/review-6', 'reviews/review-7', 'reviews/review-8',
  'reviews/review-9', 'reviews/review-10',
  'reviews/IMG-20260620-WA0066', 'reviews/IMG-20260620-WA0067',
  'reviews/IMG-20260620-WA0068', 'reviews/IMG-20260620-WA0071',
];
