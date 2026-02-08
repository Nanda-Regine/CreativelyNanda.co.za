'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { contextImages, getContextFromPath } from './nanda-girl/types';

// Context-aware speech bubbles for different pages
const contextSpeechBubbles: Record<string, string[]> = {
  home: [
    "Sawubona! Welcome to my world! ✨",
    "I'm a poet who codes & a coder who dreams!",
    "Ask me about my journey!",
    "Need something built? Let's chat!",
    "15 distinctions, 82 poems, 1 mission! 👑",
  ],
  poetry: [
    "Inside Her Roses—82 poems of love & healing 🌹",
    "I was featured on Gqeberha: The Empire! 📺",
    "Poetry is the algorithm of feeling...",
    "Ask about my book—it's on Amazon!",
    "Each verse is a piece of my soul 💝",
  ],
  work: [
    "50+ projects completed! 💼",
    "React, Next.js, Supabase—I build it all!",
    "Check out True Access App!",
    "I reduced admin time by 40-60%!",
    "Tech with soul, code with purpose ✨",
  ],
  about: [
    "Poet • Developer • Dreamer 💫",
    "From Eastern Cape to global impact!",
    "15 academic distinctions—ask me how!",
    "I believe tech should amplify humanity",
    "First-generation entrepreneur here! 👑",
  ],
  blog: [
    "Enjoying the articles? 📚",
    "I write about tech, creativity & life!",
    "Got questions about a post?",
    "Content with soul, insights with impact",
  ],
  contact: [
    "Ready to collaborate? 📧",
    "I reply within 24-48 hours!",
    "Let's build something beautiful together!",
    "Remote-ready, globally minded! 🌍",
  ],
  marketplace: [
    "15+ Notion templates available! 🛍️",
    "Save 40-60% admin time with my systems!",
    "Templates from R150 to R499",
    "Need help choosing? Ask me!",
  ],
  education: [
    "Nelson Mandela University graduate! 🎓",
    "15 distinctions across 3 degrees!",
    "SheCodes certified, self-taught coder!",
    "I believe in learning everywhere 📚",
  ],
  default: [
    "Click me to chat! 💬",
    "I know everything about Nanda! ✨",
    "Ask me anything—I'm here to help!",
    "From poetry to code, I've got answers!",
  ],
};

// Comprehensive Knowledge Base - Everything about Nanda
const knowledgeBase = {
  greetings: {
    triggers: ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening', 'howdy', 'hola', 'sup', 'yo', 'whats up', "what's up", 'sanibonani', 'sawubona', 'molweni'],
    responses: [
      "Sawubona, radiant one! 🌅 I'm Nanda—Creative Technologist, poet, and dreamer. How may I illuminate your path today?",
      "Sanibonani! Welcome to my digital home. I'm Nandawula Regine Kabali-Kagwa, but you can call me Nanda. What brings you here?",
      "Greetings, kindred soul! ✨ I'm a poet who codes and a coder who dreams. What wisdom do you seek?",
      "Hey there, beautiful! 🌺 Like sunrise over East London, your presence brightens this space. I'm Nanda—let's chat!",
      "Molweni! Step into my world where tech meets African heartbeats, where poetry meets pixels. What can I help you with?",
      "Hello, precious visitor! 💫 I'm Nanda—born from Eastern Cape soil, building dreams in code and verse. Ask me anything!",
    ]
  },

  identity: {
    triggers: ['who is nanda', 'about nanda', 'tell me about', 'who are you', 'introduce', 'what does she do', 'what do you do', 'about her', 'about you', 'your name', 'full name', 'background'],
    responses: [
      "I'm Nandawula Regine Kabali-Kagwa—Creative Technologist, Published Poet, and Founder of Mirembe Muse. Based in East London, South Africa, I weave technology and creativity into experiences that matter. 🌍✨",
      "I walk between worlds: the digital and the deeply human. A technologist whose hands build systems, a poet whose heart builds bridges. My roots are Ugandan and Zulu, my vision is global. 👑",
      "Poet • Developer • Dreamer. That's me in three words. I believe technology should amplify humanity, not replace it. Every line of code I write is a chance to make someone's day more beautiful.",
      "Born from Eastern Cape soil, I carry the ocean's resilience and the sky's limitless vision. I'm a first-generation entrepreneur building legacies through tech, poetry, and purpose. 🌊",
      "I'm what happens when African wisdom meets digital innovation. Full-stack developer by trade, published poet by passion, forever student of life. My philosophy? 'I don't build software, I build experiences.' ✨",
    ]
  },

  education: {
    triggers: ['education', 'study', 'degree', 'university', 'qualifications', 'certifications', 'school', 'learned', 'course', 'nmu', 'nelson mandela', 'diploma', 'certificate'],
    responses: [
      "📚 Nelson Mandela University graduate here! Advanced Diploma in Business Management (NQF 7), Diploma in Management (NQF 6), and Higher Certificate in Business Management (NQF 5)—all completed with Distinction. 15 distinctions total across my studies!",
      "I earned 15 distinctions across four years at Nelson Mandela University and was featured on their official platform. Then I taught myself to code through SheCodes Plus, mastering React, JavaScript, and full-stack development. 🎓✨",
      "My education spans formal academia and self-taught mastery: NMU business degrees (all with distinction), SheCodes front-end certification, Google Digital Marketing, and AI courses from Great Learning. I believe in learning everywhere. 📖",
      "From lecture halls to late-night coding sessions—I've done both! Business management from NMU gave me strategy; SheCodes and online platforms gave me technical superpowers. The real education? Experience and curiosity. 🌟",
      "I was selected for NMU's prestigious leadership development program—mentorship, community engagement, entrepreneurship workshops. Combined with my tech certifications (SheCodes, Google, IDEO Human-Centered Design), I'm classically trained and self-forged. 💪🏾",
    ]
  },

  skills: {
    triggers: ['skills', 'tech stack', 'technologies', 'what can', 'expertise', 'programming', 'languages', 'tools', 'coding', 'react', 'javascript', 'next.js', 'supabase', 'technical'],
    responses: [
      "💻 My tech stack: React, Next.js, TypeScript, Tailwind CSS, Framer Motion on the frontend. Supabase, Node.js, REST APIs on the backend. OpenAI API for AI magic, Mapbox GL for mapping, and Notion for system architecture!",
      "I paint with React and Next.js, animate with Framer Motion, style with Tailwind. My databases sing in Supabase, my maps dance in Mapbox GL, and my chatbots think with OpenAI. Technical excellence with heart! 🎨",
      "Frontend to backend, I do it all: JavaScript ES6+, TypeScript, HTML5, CSS3, responsive design. Then Supabase for auth and databases, Python for scripting, Git for version control. Plus AI integration and prompt engineering! ✨",
      "Beyond code, I architect Notion systems (15+ templates productized!), design AI-assisted workflows (60% faster development), and build custom GPT frameworks. I don't just code—I create ecosystems. 🚀",
      "Skills that pay the bills: Full-stack web dev, Notion system architecture, AI chatbot development, digital marketing, workshop facilitation, and yes—poetry that moves souls. I'm a Renaissance woman for the digital age. 👑",
    ]
  },

  experience: {
    triggers: ['experience', 'work history', 'career', 'jobs', 'resume', 'worked', 'job', 'employment', 'balkan', 'sportsmans', 'manager', 'professional'],
    responses: [
      "5+ years of professional experience! Currently Founder of Mirembe Muse. Previously Manager at Balkan Burger where I digitized operations, reduced waste by 22%, and improved profitability by 18%. Before that, Sportsmans Warehouse for 4 years. 💼",
      "My journey: Junior Waitress → Senior Waitress → Marketing Assistant → Team Leader → Event Coordinator → Manager at Balkan Burger. Then I taught myself to code and now I build full-stack applications! Every role prepared me. 🦋",
      "At Balkan Burger, I managed 15+ staff, achieved 4.8/5 customer satisfaction, increased upsell conversions by 30%, and wrote the entire operations manual. Then I brought those systems-thinking skills to software development! 📈",
      "I've worn many hats: Receiving Clerk (99% accuracy), Cashier, Sales Assistant, Event Coordinator (100-500+ guests), Manager, Content Specialist at Distilled Photography, Workshop Coordinator, and now Creative Technologist. Growth is my middle name! 🌱",
      "From restaurant operations to React applications—the common thread is systems thinking and leadership. At Balkan Burger, I reduced admin overhead by 35%. Now I reduce it for clients through Notion systems and automation. 💫",
    ]
  },

  poetry: {
    triggers: ['poetry', 'book', 'inside her roses', 'poems', 'writing', 'author', 'published', 'writer', 'poet', 'roses', 'verses', 'literary'],
    responses: [
      "🌹 'Inside Her Roses'—my poetry collection published October 2021. 82 poems exploring love, identity, healing, and Black womanhood. Available on Amazon, Apple Books, Kobo, and major retailers worldwide!",
      "I was featured on South African TV series 'Gqeberha: The Empire' as a poet! Also interviewed on Madiba FM and TRU FM. My verses have reached thousands of hearts through screens and airwaves. 📺✨",
      "Poetry is the algorithm of feeling. My collection spans six themes: Romance, Sensual, Life, Personal, Depth, and Empowering. Each poem excavates truth—vulnerability and victory in equal measure. 💝",
      "I self-funded and organized my own book launch—crowdfunded, self-coordinated, fully executed. 100+ attendees, combined poetry workshop and dining experience. Main character energy before it was a trend! 🎉👑",
      "Find my poetry on Wattpad (@NandaRegine), AllPoetry (@Nanda_Regine), Instagram (@nanda.regine), and PoemHunter. The roses in my title aren't just flowers—they're growth through pain, beauty despite thorns, blooming as resistance. 🌹",
    ]
  },

  projects: {
    triggers: ['projects', 'portfolio', 'what has she built', 'work samples', 'applications', 'apps', 'built', 'created', 'true access', 'visionboard'],
    responses: [
      "📱 True Access App—my full-stack location-based service platform. Built from scratch with Supabase, Mapbox GL, and responsive design. It maps the unmapped, making services accessible to all!",
      "This very website (CreativelyNanda.co.za) is my creation! React, Next.js, Framer Motion animations, Supabase backend, AI chatbot integration, 95+ Lighthouse scores. Plus the AI assistant you're talking to now! 🌐✨",
      "I've built 15+ Notion templates for students, SMEs, and creative professionals. CRM systems, financial dashboards, project hubs—each one saving clients 40-60% administrative time. Systems that spark joy! 📊",
      "AfriFlix is in development—a platform to preserve spoken word culture digitally. Because our voices deserve platforms we control. Also working on PoetryTube to amplify poetic voices globally. 🎤",
      "Every project tells a story: True Access speaks for the voiceless, my Notion systems restore time to the time-starved, this portfolio bridges technology and soul. I build experiences, not just applications. 💫",
    ]
  },

  mirembe: {
    triggers: ['mirembe', 'muse', 'business', 'company', 'startup', 'founder', 'enterprise', 'services offered'],
    responses: [
      "🌿 Mirembe Muse (Pty) Ltd—my company launching 2026! 'Mirembe' means 'peace' in Luganda. We offer web development, Notion systems, AI integration, creative technology services, and business consulting.",
      "Three pillars of Mirembe Muse: Technology (full-stack development, AI), Creativity (content, consulting), and Purpose (building with Ubuntu). We believe successful ventures can maintain humanity and soul. 🕊️",
      "What I offer through Mirembe: React/Next.js applications, custom Notion operating systems, AI chatbots and automation, digital content creation, and poetry/speaking engagements. Technology that amplifies humanity! 💻✨",
      "I'm a first-generation entrepreneur in my family—not just building a business, I'm building a blueprint. Mirembe Muse is heritage meeting horizon, African excellence thriving commercially. 👑",
      "From wellness consulting to websites, from poetry workshops to productivity systems—Mirembe Muse is an ecosystem where creativity and commerce dance together. Watch this space! 🌍",
    ]
  },

  services: {
    triggers: ['services', 'offer', 'provide', 'help with', 'what services', 'work together', 'collaborate', 'hire'],
    responses: [
      "🎯 My services: Full-stack web development (React, Next.js), Notion system architecture, AI chatbot development, digital marketing strategy, creative consulting, and poetry workshops/speaking engagements!",
      "I build: Landing pages to complex applications, Notion operating systems for businesses, AI-powered automations, brand experiences. Everything delivered with African excellence and global standards. 🌍✨",
      "Whether you need a website that converts, workflows that liberate, chatbots that connect, or strategy that clarifies—I'm your person. I don't just provide services; I partner in vision. 🤝",
      "Pricing approach: Value-based, not hours-logged. Notion templates R150-R499, custom projects discussed based on scope. I believe in fair exchange—your investment meets my excellence. 💰",
      "I start by listening deeply—understanding not just WHAT needs to be built, but WHY it matters. Milestone-based payments, transparent communication, focus on creating experiences that resonate. Let's build! 💫",
    ]
  },

  contact: {
    triggers: ['contact', 'email', 'reach', 'get in touch', 'connect', 'social', 'linkedin', 'github', 'instagram'],
    responses: [
      "📧 Email: nandaregine@gmail.com—I typically respond within 24-48 hours because your dreams don't wait! Or use the Contact page for a structured inquiry.",
      "Find me everywhere: LinkedIn (Nandawula Kabali-Kagwa), GitHub (Nanda-Regine), Instagram (@nanda.regine), Twitter (@creativelynanda), Medium, and Substack. The footer has all my links! 🔗",
      "I'm based in East London, South Africa but work with clients globally. Time zones are just numbers, geography is just coordinates. Great work transcends both! 🌐✨",
      "Currently open for: Web development projects, Notion consulting, AI integration work, speaking engagements, creative collaborations. Remote-ready, globally minded, culturally grounded. Let's connect! 🤝",
      "Digital follows are lovely, but real conversations are sacred. Email nandaregine@gmail.com for opportunities, or slide into my LinkedIn DMs. I value authentic engagement! 💌",
    ]
  },

  testimonials: {
    triggers: ['testimonial', 'reviews', 'feedback', 'recommendations', 'references', 'what people say', 'reputation'],
    responses: [
      "⭐ Bojan Ivanovic (Balkan Burger Co-Founder): 'Nanda is a rare and extraordinary talent...directly driven growth, enhanced our turnover, and solidified our foundations for the future.'",
      "Zintle Joko calls me 'the best person I have ever worked with.' Nicole Carlisle says working under my management was 'incredible.' Amy Gajjar calls me 'an amazing leader with admirable attention to detail.' 💫",
      "6+ LinkedIn recommendations paint the same picture: dedicated, creative, impactful. People don't just recommend my work—they celebrate my work ethic, energy, and ability to transform vision into reality! ✨",
      "Maqawe Mvume from Sportsmans Warehouse: 'Consistently impressed by exceptional work ethic and natural leadership. Sharp mind, quick problem-solving, reliability.' The receipts are all on LinkedIn! 📊",
      "When you consistently show up as magic, people remember. My testimonials are evidence of years of bringing whole self, delivering whole results. Excellence speaks through others! 👑",
    ]
  },

  location: {
    triggers: ['where', 'location', 'based', 'south africa', 'country', 'live', 'from', 'city', 'east london', 'eastern cape'],
    responses: [
      "🌊 Based in East London, Eastern Cape, South Africa—where the Indian Ocean meets innovation! The Friendly City raising a formidable woman.",
      "South African roots, global reach. I carry Eastern Cape warmth to worldwide collaborations. PE taught me hospitality, the ocean taught me flow, now I bring both to remote work everywhere! 🇿🇦",
      "GPS coordinates: Eastern Cape. Spiritual coordinates: wherever great work is needed. I work with clients from Joburg to New York, Lagos to London. Geography is just coordinates! 🌍",
      "From Nelson Mandela's homeland to your inbox. I'm locally grounded but internationally minded—the ocean taught me resilience, now I build software that flows just as beautifully. 🌅",
    ]
  },

  philosophy: {
    triggers: ['philosophy', 'believe', 'values', 'principles', 'approach', 'mindset', 'vision', 'mission'],
    responses: [
      "✨ My core philosophy: 'Technology should amplify humanity, not replace it.' Every interface is a conversation, every feature is a story, every line of code is a chance to make someone's day more beautiful.",
      "Three values guide me: Curiosity (every challenge is a classroom), Craft (excellence lives in details), Connection (tech is cold until humans touch it). Ubuntu in action! 🙏🏾",
      "I believe in community over competition, legacy over likes. I'm passionate about African representation in tech—not as tokens, but as innovators, leaders, visionaries. We belong at the table. 👑",
      "Words are code for the soul. Poetry is the algorithm of feeling. I merge technical precision with poetic freedom—left brain, right brain, whole heart. This is integration, not balance. 💝",
    ]
  },

  fun: {
    triggers: ['fun fact', 'interesting', 'something cool', 'random', 'surprise me', 'fun', 'personal', 'hobbies'],
    responses: [
      "🎉 Fun fact: I organized my own book launch—crowdfunded, self-coordinated, 100+ attendees! Main character energy before it was trendy.",
      "I write my best poetry at 3am when the world sleeps. Night owl by nature, creator by design. Also, I'm building AfriFlix to preserve spoken word culture digitally! 🌙✍🏾",
      "First-generation entrepreneur in my family—not just building a business, building a blueprint. And yes, I earned 15 academic distinctions while teaching myself to code. Multitasking queen! 👑",
      "I'm what happens when Ugandan heritage meets Zulu spirit meets Eastern Cape resilience. Equal parts vulnerable and victorious—I write about heartbreak AND code for hope. 💝💻",
      "I was a volunteer First Aid Instructor with St John Ambulance, achieved Level 3 certification and promoted to Corporal. Helping people is in my DNA, whether through code or care! 🏥✨",
    ]
  },

  thanks: {
    triggers: ['thank', 'thanks', 'appreciate', 'helpful', 'great', 'awesome', 'cool', 'nice', 'amazing'],
    responses: [
      "Ubuntu says: I am because we are. Your gratitude is received with warmth! Anything else your heart seeks? 🙏🏾✨",
      "Grateful to be of service, radiant one. Keep exploring—there's more magic in these pages. Visit the Poetry section or check out my Work! 💫",
      "The pleasure is mutual, beloved. In helping you, I honor my vision of connection. What else can I share? 🌺",
      "Asante sana! Thank you for being here. Your curiosity is a gift. The Contact page awaits when you're ready to create something together! 📬",
      "You're so welcome! May your path be clear, your questions answered, your purpose fulfilled. Keep shining, keep creating! ✨",
    ]
  },

  pricing: {
    triggers: ['price', 'cost', 'rate', 'charge', 'how much', 'budget', 'pay', 'afford', 'quote'],
    responses: [
      "💰 Notion templates: R150-R499 investment in your peace of mind. Custom projects? Let's talk vision first, budget second. I believe in value-based pricing.",
      "I don't do cheap; I do VALUE. Whether R200 or R20,000—you'll know exactly what you're investing in and why. Pricing reflects expertise, not ego. 💎",
      "From accessible templates to enterprise solutions, there's a pathway for every budget. The conversation starts with vision, not price tags. Email me for a custom quote! 📊",
      "Quality work deserves quality compensation, but I'm also about accessibility. Milestone-based payments, transparent communication. Contact me to find the sweet spot for your needs! ✉️",
    ]
  },

  chatbot: {
    triggers: ['chatbot', 'this ai', 'how do you work', 'are you ai', 'bot', 'artificial', 'who made you'],
    responses: [
      "🤖 I'm Nanda's digital essence—AI built with intention, programmed with personality, infused with her spirit. Technology meets Ubuntu!",
      "I'm one of her creations: proof that chatbots don't have to be cold, that AI can carry culture, that tech can have heart. Built with React, powered by knowledge, animated by vision! 💝",
      "Custom-built, culturally conscious, conversation-ready. I blend scripted knowledge with AI flexibility—like jazz, structure meets improvisation. This is Nanda's signature: tech that feels human. 🎵",
      "I'm the welcome mat to her digital home. I know her story, her skills, her dreams. Ask me anything—about poetry, projects, pricing, or just life. I'm here to connect you with Nanda's world! 🏡",
    ]
  },

  notion: {
    triggers: ['notion', 'templates', 'productivity', 'workspace', 'systems', 'crm', 'dashboard', 'workflow'],
    responses: [
      "📊 I've built 15+ Notion templates ranging from R150 to R499—CRMs, financial dashboards, project hubs, knowledge bases. Each one saves 40-60% administrative time!",
      "My Notion systems are like traditional African architecture—everything has its place, everything serves the whole. Chaos becomes clarity, overwhelm becomes flow. Beauty that functions! 🏺",
      "I don't just organize data; I orchestrate harmony. AI-generated docs meet human-centered design. Notion work is meditation in database form—everything aligned, intentional. 🧘🏾‍♀️",
      "From solopreneurs to teams, my templates adapt like water, powerful like earth. Productivity isn't about doing more; it's about flowing better. Check the marketplace! ✨",
    ]
  },

  media: {
    triggers: ['tv', 'television', 'radio', 'interview', 'media', 'gqeberha', 'madiba', 'tru fm', 'press'],
    responses: [
      "📺 I was featured on 'Gqeberha: The Empire'—South African TV series! My poetry reached thousands of living rooms. Also interviewed on Madiba FM and TRU FM discussing poetry, creativity, and entrepreneurship.",
      "From stages to screens to airwaves—my voice has traveled! Poetry performances across Port Elizabeth and East London, radio conversations about creativity and business, television features. The art speaks! 🎤✨",
      "Media presence is part of the journey: in-depth radio conversations about the intersection of tech and creativity, TV features showcasing African voices, live poetry performances. The message must spread! 🌍",
    ]
  },

  achievements: {
    triggers: ['achievements', 'accomplishments', 'awards', 'success', 'proud', 'milestones'],
    responses: [
      "🏆 Highlights: 15 academic distinctions, featured on NMU official platform, published author with international distribution, TV featured poet, 50+ projects completed, reduced client admin time by 40-60%!",
      "At Balkan Burger alone: 22% waste reduction, 18% profitability increase, 40% team productivity improvement, 4.8/5 customer satisfaction. I bring the same results-driven approach to tech! 📈",
      "Published a book distributed worldwide, organized my own 100+ person launch, got featured on national TV, taught myself to code, built 15+ full-stack applications. Not bad for a girl from Eastern Cape! 👑",
      "Every chapter prepared me: from St John Ambulance Corporal to restaurant Manager to Creative Technologist. 5+ years professional experience, infinite growth mindset. The best is yet to come! ✨",
    ]
  },
};

// Bot Girl SVG Component
const BotGirl = ({ mood = 'happy' }: { mood: string }) => {
  const eyeVariants = {
    happy: { scaleY: 1 },
    thinking: { scaleY: 0.5 },
    curious: { scaleY: 1.2 }
  };

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <ellipse cx="50" cy="55" rx="42" ry="45" fill="#2A1810" />
      <motion.path
        d="M15 50 Q10 70 15 90"
        stroke="#3D261C"
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
        animate={{ d: ["M15 50 Q10 70 15 90", "M15 50 Q5 70 12 90", "M15 50 Q10 70 15 90"] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.path
        d="M85 50 Q90 70 85 90"
        stroke="#3D261C"
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
        animate={{ d: ["M85 50 Q90 70 85 90", "M85 50 Q95 70 88 90", "M85 50 Q90 70 85 90"] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <ellipse cx="50" cy="50" rx="32" ry="35" fill="#8D6E4C" />
      <motion.ellipse
        cx="28" cy="55" rx="8" ry="5"
        fill="#C1292E"
        opacity={0.3}
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.ellipse
        cx="72" cy="55" rx="8" ry="5"
        fill="#C1292E"
        opacity={0.3}
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.ellipse
        cx="38" cy="45" rx="6" ry="7"
        fill="#0A1128"
        variants={eyeVariants}
        animate={mood}
      />
      <motion.ellipse
        cx="62" cy="45" rx="6" ry="7"
        fill="#0A1128"
        variants={eyeVariants}
        animate={mood}
      />
      <circle cx="40" cy="43" r="2" fill="white" opacity={0.8} />
      <circle cx="64" cy="43" r="2" fill="white" opacity={0.8} />
      <path d="M30 36 Q38 33 44 36" stroke="#2A1810" strokeWidth="2" fill="none" />
      <path d="M56 36 Q62 33 70 36" stroke="#2A1810" strokeWidth="2" fill="none" />
      <ellipse cx="50" cy="55" rx="3" ry="2" fill="#7A5F3F" />
      <motion.path
        d={mood === 'happy' ? "M42 65 Q50 73 58 65" : mood === 'thinking' ? "M42 67 Q50 67 58 67" : "M42 65 Q50 70 58 65"}
        stroke="#C1292E"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <path d="M20 35 Q30 15 50 20 Q70 15 80 35" fill="#2A1810" />
      <path d="M25 38 Q35 25 50 28 Q65 25 75 38" fill="#3D261C" />
      <motion.ellipse
        cx="75" cy="30" rx="5" ry="4"
        fill="#D4AF37"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <motion.circle
        cx="18" cy="55" r="4"
        fill="#D4AF37"
        animate={{ y: [0, 2, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <motion.circle
        cx="82" cy="55" r="4"
        fill="#D4AF37"
        animate={{ y: [0, 2, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
      />
    </svg>
  );
};

const suggestions = [
  "Who is Nanda? 👑",
  "Inside Her Roses 🌹",
  "Tech skills & projects 💻",
  "What can you build? 🚀",
  "Work experience 💼",
  "Education & certifications 🎓",
  "About Mirembe Muse 🌿",
  "Let's collaborate! 📧",
];

// Function to get random subset of suggestions
const getRandomSuggestions = (count: number = 5) => {
  const shuffled = [...suggestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

export function NandaAssistant() {
  const pathname = usePathname();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showSpeechBubble, setShowSpeechBubble] = useState(false);
  const [currentBubbleText, setCurrentBubbleText] = useState('');
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Chat state
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Sawubona! ✨ I'm Nanda—Creative Technologist, published poet, and founder of Mirembe Muse. I know everything about my journey, my work, and my poetry. Ask me anything!" }
  ]);
  const [displayedSuggestions] = useState(() => getRandomSuggestions(5));
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [botMood, setBotMood] = useState('happy');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Load minimized state
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem('nandaAssistant-minimized');
    if (stored !== null) {
      setIsMinimized(stored === 'true');
    }
  }, []);

  // Speech bubble logic - show periodically when not chatting
  useEffect(() => {
    if (isChatOpen || isMinimized) return;

    const showBubble = () => {
      const context = getContextFromPath(pathname);
      const bubbles = contextSpeechBubbles[context] || contextSpeechBubbles.default;
      const randomBubble = bubbles[Math.floor(Math.random() * bubbles.length)];
      setCurrentBubbleText(randomBubble);
      setShowSpeechBubble(true);

      // Hide after 4 seconds
      setTimeout(() => setShowSpeechBubble(false), 4000);
    };

    // Show first bubble after 5 seconds
    const initialTimeout = setTimeout(showBubble, 5000);

    // Then show periodically every 30 seconds
    const interval = setInterval(showBubble, 30000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [pathname, isChatOpen, isMinimized]);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findResponse = (userInput: string) => {
    const input = userInput.toLowerCase();

    for (const [, data] of Object.entries(knowledgeBase)) {
      for (const trigger of data.triggers) {
        if (input.includes(trigger)) {
          const responses = data.responses;
          return responses[Math.floor(Math.random() * responses.length)];
        }
      }
    }

    return null;
  };

  const handleSend = async (messageText = input) => {
    if (!messageText.trim()) return;

    const userMessage = { role: 'user', content: messageText };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    setBotMood('thinking');

    await new Promise(resolve => setTimeout(resolve, 600 + Math.random() * 600));

    const quickResponse = findResponse(messageText);

    if (quickResponse) {
      setBotMood('happy');
      setMessages(prev => [...prev, { role: 'assistant', content: quickResponse }]);
    } else {
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: [...messages, userMessage].map(m => ({
              role: m.role,
              content: m.content
            }))
          })
        });

        if (response.ok) {
          const data = await response.json();
          setBotMood('happy');
          setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
        } else {
          throw new Error('API request failed');
        }
      } catch {
        setBotMood('curious');
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: "I'd love to tell you more! For detailed inquiries, please reach out to Nanda directly at nandaregine@gmail.com or visit the Contact page. 💫"
        }]);
      }
    }

    setIsTyping(false);
  };

  const toggleMinimized = () => {
    const newState = !isMinimized;
    setIsMinimized(newState);
    if (typeof window !== 'undefined') {
      localStorage.setItem('nandaAssistant-minimized', String(newState));
    }
  };

  const handleCharacterClick = () => {
    if (isMinimized) {
      setIsMinimized(false);
      if (typeof window !== 'undefined') {
        localStorage.setItem('nandaAssistant-minimized', 'false');
      }
    } else {
      setIsChatOpen(true);
      setShowSpeechBubble(false);
    }
  };

  const context = getContextFromPath(pathname);
  const imageData = contextImages[context];

  if (!mounted) return null;
  if (pathname.startsWith('/admin') || pathname.startsWith('/api')) return null;

  return (
    <>
      {/* Nanda Girl Character - Bottom Left */}
      <div className="fixed bottom-4 left-4 z-40">
        <AnimatePresence mode="wait">
          {isMinimized ? (
            <motion.button
              key="minimized"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={handleCharacterClick}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-navy shadow-elevated overflow-hidden border-2 border-gold/30 hover:border-gold transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Open Nanda Assistant"
            >
              <Image
                src="/assets/nanda-girl/logo-circle-transparent.png"
                alt="Nanda"
                width={56}
                height={56}
                className="object-cover"
              />
            </motion.button>
          ) : (
            <motion.div
              key="expanded"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="relative"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Speech Bubble */}
              <AnimatePresence>
                {showSpeechBubble && !isChatOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 10 }}
                    className="absolute -top-16 left-full ml-2 bg-white rounded-2xl rounded-bl-sm px-4 py-2 shadow-lg max-w-[180px] z-50"
                    style={{
                      filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.15))',
                    }}
                  >
                    <p className="text-navy text-sm font-medium">{currentBubbleText}</p>
                    {/* Bubble tail */}
                    <div className="absolute -left-2 bottom-2 w-0 h-0 border-t-8 border-t-transparent border-r-8 border-r-white border-b-8 border-b-transparent" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Floating Animation Container */}
              <motion.div
                animate={
                  prefersReducedMotion
                    ? {}
                    : {
                        y: [0, -6, 0],
                      }
                }
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                {/* Clickable Character */}
                <motion.button
                  onClick={handleCharacterClick}
                  className="relative w-24 h-32 md:w-32 md:h-40 cursor-pointer focus:outline-none"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Open chat with Nanda"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={context}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={imageData.src}
                        alt={imageData.alt}
                        fill
                        className="object-contain object-bottom drop-shadow-lg"
                        priority
                        sizes="(max-width: 768px) 96px, 128px"
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Glow effect */}
                  <motion.div
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-6 bg-gold/20 rounded-full blur-xl"
                    animate={{
                      scale: isHovered ? 1.2 : 1,
                      opacity: isHovered ? 0.4 : 0.2,
                    }}
                  />

                  {/* Chat indicator */}
                  <motion.div
                    className="absolute -top-1 -right-1 w-6 h-6 bg-cherry rounded-full flex items-center justify-center shadow-lg"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="text-white text-xs">💬</span>
                  </motion.div>
                </motion.button>
              </motion.div>

              {/* Minimize button */}
              <motion.button
                onClick={toggleMinimized}
                className="absolute -top-1 -left-1 w-5 h-5 bg-navy/80 text-beige rounded-full flex items-center justify-center text-xs font-bold shadow-lg hover:bg-navy transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
                aria-label="Minimize Nanda"
              >
                −
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Chat Window - Opens when character is clicked */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-4 left-4 md:left-40 z-50 w-[380px] max-w-[calc(100vw-2rem)] rounded-3xl shadow-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(180deg, #0A1128 0%, #151D33 100%)',
              border: '1px solid rgba(212, 175, 55, 0.2)'
            }}
          >
            {/* Header */}
            <div className="relative p-4 overflow-hidden">
              <motion.div
                animate={{
                  x: [0, 30, 0],
                  y: [0, -20, 0],
                  scale: [1, 1.3, 1]
                }}
                transition={{ duration: 6, repeat: Infinity }}
                className="absolute top-0 right-0 w-40 h-40 bg-cherry/30 rounded-full blur-3xl"
              />
              <motion.div
                animate={{
                  x: [0, -20, 0],
                  y: [0, 20, 0],
                  scale: [1.2, 1, 1.2]
                }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute bottom-0 left-0 w-32 h-32 bg-gold/20 rounded-full blur-2xl"
              />

              <div className="relative z-10 flex items-center gap-4">
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  className="relative w-14 h-14"
                >
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gold/50 shadow-lg shadow-cherry/20">
                    <BotGirl mood={botMood} />
                  </div>
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-400 rounded-full border-2 border-navy"
                  />
                </motion.div>

                <div className="flex-1">
                  <h3 className="font-display text-lg font-bold text-beige flex items-center gap-2">
                    Nanda AI
                    <motion.span
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      ✨
                    </motion.span>
                  </h3>
                  <p className="text-beige/60 text-xs flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                    Online • Here to help!
                  </p>
                </div>

                {/* Close button */}
                <motion.button
                  onClick={() => setIsChatOpen(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-beige hover:bg-white/20 transition-colors"
                >
                  ✕
                </motion.button>
              </div>
            </div>

            {/* Messages Area */}
            <div
              className="h-[280px] overflow-y-auto px-4 py-3 space-y-3 relative"
              style={{
                background: 'linear-gradient(135deg, rgba(30,42,70,0.97) 0%, rgba(45,58,90,0.97) 50%, rgba(30,42,70,0.97) 100%)'
              }}
            >
              <div className="absolute inset-0 opacity-30">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="chatGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(212,175,55,0.1)" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#chatGrid)" />
                </svg>
              </div>

              <div className="relative z-10 space-y-3">
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.05, type: 'spring', damping: 20 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] px-4 py-2.5 ${
                        msg.role === 'user'
                          ? 'bg-gradient-to-r from-cherry to-cherry-dark text-beige rounded-2xl rounded-br-sm shadow-lg shadow-cherry/20'
                          : 'bg-gradient-to-r from-white/10 to-white/5 backdrop-blur text-beige/90 rounded-2xl rounded-bl-sm border border-white/10'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-gradient-to-r from-white/10 to-white/5 px-4 py-3 rounded-2xl rounded-bl-sm border border-white/10">
                      <div className="flex gap-1.5">
                        {[0, 1, 2].map((i) => (
                          <motion.span
                            key={i}
                            animate={{
                              y: [-4, 4, -4],
                              background: ['#C1292E', '#D4AF37', '#C1292E']
                            }}
                            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                            className="w-2 h-2 rounded-full"
                            style={{ background: '#C1292E' }}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions */}
            {messages.length <= 3 && (
              <div className="px-4 py-3 border-t border-gold/10 bg-navy/50">
                <p className="text-beige/40 text-xs mb-2 flex items-center gap-1">
                  <span>💡</span> Try asking:
                </p>
                <div className="flex flex-wrap gap-2">
                  {displayedSuggestions.map((suggestion, i) => (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSend(suggestion)}
                      className="px-3 py-1.5 text-beige/80 rounded-full text-xs border border-transparent hover:border-gold/30 transition-all"
                      style={{
                        background: 'linear-gradient(135deg, rgba(193,41,46,0.2) 0%, rgba(212,175,55,0.1) 100%)'
                      }}
                    >
                      {suggestion}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 border-t border-gold/10 bg-gradient-to-b from-navy/80 to-navy">
              <div className="flex gap-2">
                <div className="flex-1 relative group">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask me anything..."
                    className="w-full px-4 py-3 bg-white/5 rounded-full border border-white/10 focus:border-gold/50 focus:bg-white/10 focus:outline-none text-beige text-sm placeholder:text-beige/30 transition-all pr-4"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cherry/20 to-gold/20 opacity-0 group-focus-within:opacity-100 -z-10 blur-md transition-opacity" />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSend()}
                  disabled={!input.trim()}
                  className="relative px-4 py-3 rounded-full font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, #C1292E 0%, #D4AF37 100%)'
                  }}
                >
                  <span className="relative z-10 text-beige">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </>
  );
}

export default NandaAssistant;
