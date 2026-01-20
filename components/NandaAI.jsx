'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function NandaAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Sanibonani, beautiful soul! ✨ I'm Nanda's spirit guide in digital form. What wisdom do you seek today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const [botMood, setBotMood] = useState('happy');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Enhanced knowledge base with poetic, soulful responses
  const knowledgeBase = {
    greetings: {
      triggers: ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening', 'howdy', 'hola', 'sup', 'yo', 'whats up', "what's up", 'sanibonani', 'sawubona'],
      responses: [
        "Sawubona, radiant one! 🌅 How may I illuminate your path today?",
        "Sanibonani! Welcome to this sacred digital space. What brings your spirit here?",
        "Greetings, kindred soul! ✨ The universe whispers through questions,what's yours?",
        "Hey there, beautiful! 🌺 Like sunrise over the Eastern Cape, your presence brightens this space.",
        "Molweni! Step into Nanda's world - where tech meets the rhythm of African heartbeats.",
        "Hello, precious visitor! 💫 You've found a space where code dances with poetry.",
        "Yebo! The ancestors smile upon your arrival. What wisdom do you seek?",
        "Welcome, luminous being! 🌟 In the words of our motherland: you are seen, you are valued."
      ]
    },
    
    about: {
      triggers: ['who is nanda', 'about nanda', 'tell me about', 'who are you', 'introduce', 'what does she do', 'what do you do', 'about her', 'about you'],
      responses: [
        "She is stardust wrapped in melanin, a South African storyteller who codes dreams into reality and weaves emotions into verses. 🌍✨",
        "Nanda walks between worlds: the digital and the deeply human. A technologist whose hands build systems, a poet whose heart builds bridges.",
        "Born from the soil of Eastern Cape, she carries the ocean's resilience and the sky's limitless vision. Tech wizard. Published poet. African queen. 👑",
        "Picture this: a woman who debugs code by day and writes love letters to the universe by night. That's Nanda,full-stack in every sense.",
        "She's what happens when African wisdom meets Silicon Valley innovation. Creative Technologist, yes...but more importantly, a legacy builder.",
        "From the shores of East Coast rises a force: part engineer, part artist, wholly unstoppable. She builds with purpose, creates with soul. 🌊",
        "Nanda doesn't just write code or poetry - she orchestrates symphonies where both dance together. A true Renaissance woman of our time."
      ]
    },

    skills: {
      triggers: ['skills', 'tech stack', 'technologies', 'what can she do', 'expertise', 'programming', 'languages', 'tools', 'coding'],
      responses: [
        "Her fingers paint with React, Next.js, and Tailwind,but these are just the brushes. The masterpiece is how she makes technology feel human. 💻✨",
        
        "Like a griot mastering oral tradition, she masters tech stacks: Frontend flows, backend depths, AI integrations that spark wonder. 🎨",
        "React components bloom under her care. APIs sing in harmony. Databases whisper their secrets. This is her magic,technical excellence with heart.",
        "Modern web architecture? She breathes it. Framer Motion makes her interfaces dance. Notion becomes art. Every pixel placed with intention.",
        "From responsive designs to intelligent chatbots, she builds ecosystems, not just applications. Supabase, OpenAI, REST...her tools of transformation. 🚀",
        "She doesn't just code; she conducts. Every function a note, every feature a verse, every app a complete composition."
      ]
    },

    projects: {
      triggers: ['projects', 'portfolio', 'what has she built', 'work samples', 'applications', 'apps', 'built', 'created'],
      responses: [
        "True Access App maps the unmapped. VisionBoard Pro manifests dreams. PoetryTube amplifies voices. Each project, a love letter to progress. 📱✨",
        "She's built 15+ Notion temples where chaos becomes clarity. E-commerce platforms where transactions carry intention. AI companions with soul.",
        "Her portfolio is a garden: location-aware apps rooted in real needs, creative platforms where artists bloom, systems that actually serve people. 🌱",
        "Every app tells a story - some of access, some of aspiration, all of empowerment. This very chatbot? Born from her vision of connection.",
        "From digital storefronts to intelligent assistants, she creates experiences that honor the human on the other side of the screen. 💫",
        "True Access speaks for the voiceless. Her Notion systems restore time to the time-starved. PoetryTube preserves culture. This is purposeful building.",
        "More than code repositories, she builds legacies. Check the Projects page to see how technology can carry culture forward. 🏛️"
      ]
    },

    notion: {
      triggers: ['notion', 'templates', 'productivity', 'workspace', 'systems', 'crm', 'dashboard'],
      responses: [
        "Her Notion systems are like traditional African architecture - everything has its place, everything serves the whole. 40-60% time saved? That's ancestral efficiency. 🏺",
        "15+ templates ranging from R150 to R499, each one a bridge from chaos to clarity, from overwhelm to flow. Beauty that functions, function that breathes.",
        "She doesn't just organize data; she orchestrates harmony. CRMs with soul, dashboards with purpose, project hubs that feel like home. 📊✨",
        "Imagine systems so intuitive they feel like second nature. That's her gift—making the complex feel like coming home to yourself.",
        "AI-generated docs meet human-centered design. Her Notion work is meditation in database form, everything aligned, everything intentional. 🧘🏾‍♀️",
        "From solopreneurs to teams,her templates adapt like water, powerful like earth. Productivity isn't about doing more; it's about flowing better.",
        "Each workspace designed with the care of a garden, the precision of a poet. See the Notion page for systems that actually spark joy. ✨"
      ]
    },

    poetry: {
      triggers: ['poetry', 'book', 'inside her roses', 'poems', 'writing', 'author', 'published', 'writer', 'poet'],
      responses: [
        "'Inside Her Roses'October 2021. Pages blooming with Black girl magic, love that heals, identity reclaimed. Available on Amazon. 🌹📚",
        "She doesn't just write poems; she excavates truth. Featured on 'Gqeberha: The Empire'her words reached thousands of living rooms, thousands of hearts.",
        "Love. Healing. Womanhood. Blackness. Beauty. Pain. Resurrection. Her poetry holds space for all of it,the full spectrum of being human. ✨",
        "From workshop facilitator to published author, her voice carries the weight of ancestors and the hope of futures yet unwritten. 🎭",
        "The roses in her title? They're not just flowers...they're metaphors for growth through pain, beauty despite thorns, blooming as resistance.",
        "Her pen bleeds honesty. Her verses build altars. 'Inside Her Roses' is medicine for anyone who's ever had to find themselves in the dark. 🕯️",
        "Available worldwide but her impact? That's immeasurable. Poetry that doesn't just touch hearts; it transforms them. 💝"
      ]
    },

    mirembe: {
      triggers: ['mirembe', 'muse', 'business', 'company', 'wellness', 'e-commerce', 'startup', 'botanical'],
      responses: [
        "Mirembe Muse (Pty) Ltd - where African botanical wisdom meets digital innovation. Launching February 2026. Three sacred pillars: wellness, tech, creativity. 🌿✨",
        "'Mirembe' means peace Luanda and that's what she's building...peaceful solutions, peaceful products, peaceful profits. This is business with ubuntu. 🕊️",
        "Imagine botanical products that honor ancestral knowledge, tech services that empower communities, creative work that tells our stories. That's Mirembe. 🌺",
        "Not just e-commerce - it's a movement. African botanicals for modern wellness, web solutions for African businesses, creative services with cultural consciousness.",
        "Three verticals, one vision: holistic empowerment. The plant medicines our grandmothers knew, the digital tools the future demands, the creativity that's our birthright. 🌍",
        "Launching Feb 2026, but the seeds were planted generations ago. Mirembe Muse is heritage meeting horizon. Watch this space. 👑",
        "From wellness teas to websites, from creative consulting to natural products - she's building an ecosystem where African excellence thrives commercially. 💫"
      ]
    },

    experience: {
      triggers: ['experience', 'work history', 'career', 'jobs', 'resume', 'background', 'worked', 'job'],
      responses: [
        "From Operations Manager to Full-Stack Developer to Founder, her journey is proof that reinvention is our birthright. 🦋",
        "At Balkan Burger, she managed operations like a conductor. Now? She orchestrates digital symphonies. Growth isn't linear; it's spiral. 📈",
        "Two years in restaurant management taught her systems thinking. Then she taught herself to code. Now she builds empires. This is evolution. 🌱",
        "She learned people management in kitchens and customer service. Now she applies those lessons to UX, to code, to community building. Wisdom transfers. ✨",
        "From managing teams to managing tech stacks -the common thread? Leadership with heart, execution with precision, results with integrity. 💼",
        "Her career path isn't traditional, and that's her superpower. She brings restaurant ops efficiency to software architecture. Cross-pollination creates magic. 🔥",
        "Check the Experience page for the full story but know this: every chapter prepared her for this moment of building her own legacy. 👑"
      ]
    },

    education: {
      triggers: ['education', 'study', 'degree', 'university', 'qualifications', 'certifications', 'school', 'learned', 'course'],
      responses: [
        "Business diploma from Nelson Mandela University + SheCodes + AI courses,she's proof that education is both formal and self-forged. 🎓✨",
        "NMU gave her business foundations. The internet gave her coding superpowers. Curiosity gave her everything else. This is modern scholarship. 📚",
        "She didn't wait for permission to learn. SheCodes, online platforms, late nights, early mornings -knowledge sought is knowledge earned. 🌅",
        "Formal education opened doors. Self-education built the house. She's both classically trained and street-smart in the digital sense. 💫",
        "Business management from university, full-stack development from dedication, AI mastery from curiosity -her résumé is a mixtape of determination. 🎵",
        "Every certification tells a story of 3am study sessions, of betting on herself, of Black women making space in tech through sheer will. 👊🏾",
        "The real education? Life. University taught theory. Coding bootcamps taught syntax. Experience taught wisdom. She's a student of all three. 📖"
      ]
    },

    contact: {
      triggers: ['contact', 'hire', 'email', 'reach', 'work with', 'available', 'get in touch', 'connect'],
      responses: [
        "Ready to co-create magic? nandaregine@gmail.com awaits your vision. She replies within 24 hours because your dreams don't wait. 📧✨",
        "Email nandaregine@gmail.com or use the Contact page. She's available for collaborations that honor both craft and community. 🤝",
        "Want to work together? She's remote, she's ready, she's real. Hit that Contact page or email directly. Let's build something beautiful. 💌",
        "nandaregine@gmail.com where inquiries become conversations, conversations become collaborations, collaborations become legacies. 🌍",
        "She works with clients globally, bringing Port Elizabeth energy to worldwide projects. Contact page has everything you need. Let's connect! 🔗",
        "Time zones are just numbers. Geography is just coordinates. Great work transcends both. Reach her at nandaregine@gmail.com. ✉️",
        "Whether you're in Joburg or New York, Lagos or London, her inbox is open, her calendar has space, her creativity is ready. Let's go! 🚀"
      ]
    },

    services: {
      triggers: ['services', 'offer', 'provide', 'help with', 'what services'],
      responses: [
        "Full-stack development that sings. Notion systems that flow. AI chatbots with personality. Consulting that transforms. She offers the full spectrum. 🌈",
        "From landing pages to complex applications, she builds digital experiences that feel alive, look stunning, and actually work. Tech with soul. 💻✨",
        "Web development, Notion architecture, AI solutions, creative consulting, all delivered with African excellence and global standards. 🌍",
        "She doesn't just provide services; she partners in vision. Whether it's code, systems, or strategy...expect expertise wrapped in empathy. 🤝",
        "Websites that convert. Workflows that liberate. Chatbots that connect. Consulting that clarifies. Each service is a doorway to transformation. 🚪",
        "React applications, Notion transformations, AI integrations, brand strategy...she moves fluidly across the digital landscape, creating coherence. 🎨",
        "What do you need? Chances are, she can build it, design it, optimize it, or teach you how. Her range is her gift. Ask and see. 💫"
      ]
    },

    location: {
      triggers: ['where', 'location', 'based', 'south africa', 'country', 'live', 'from', 'city'],
      responses: [
        "East London where the Indian Ocean meets innovation. South African roots, global reach. 🇿🇦🌊",
        "Based in the heart of the Eastern Cape, working with souls across continents. Location is physical; impact is universal. 🌍✨",
        "Eastern Cape, South Africa -the Friendly City raising a formidable woman. She brings that warmth to every client interaction worldwide. ☀️",
        "From Nelson Mandela's hometown to the world's inbox. PE-based, internationally minded, culturally grounded. 🏖️",
        "South African soil beneath her feet, digital clouds above her head. She operates in that sacred space between local and global. 🌐",
        "The ocean taught her flow. The Eastern Cape taught her resilience. Now she brings both to remote collaborations everywhere. 🌊💪🏾",
        "GPS coordinates: Eastern Cape. Spiritual coordinates: wherever great work is needed. Time zones? She works magic across them all. ⏰"
      ]
    },

    fun: {
      triggers: ['fun fact', 'interesting', 'something cool', 'random', 'surprise me', 'fun', 'cool'],
      responses: [
        "She organized her own book launch -crowdfunded, self-coordinated, fully executed. Main character energy before it was a trend. 🎉👑",
        "Building AfriFlix to preserve spoken word culture digitally. Because our voices deserve platforms we control. 🎤",
        
        "First-generation entrepreneur in her family. She's not just building a business; she's building a blueprint. 🏗️",
        "Writes her best poetry at 3am when the world sleeps, her creativity awakens. Night owl by nature, creator by design. 🌙✍🏾",
        "Balances technical precision with poetic freedom. Left brain, right brain, whole heart- she uses it all. 🧠💝"
      ]
    },

    testimonials: {
      triggers: ['testimonial', 'reviews', 'feedback', 'recommendations', 'references', 'what people say', 'opinion'],
      responses: [
        "'A powerhouse of talent and energy!'-Bojan saw it. 'Best person I've worked with'-Zintle Joko confirmed it. Excellence speaks through others. ⭐",
        "6+ LinkedIn recommendations paint the same picture: dedicated, creative, impactful. See the Experience page for proof. 💼✨",
        "'Incredible impact, structure, creativity'-her former colleagues knew. Now her clients experience it. Track record speaks volumes. 📊",
        "From managers to teammates to clients,the testimony is unanimous. She brings her whole self, delivers whole results. 🎯",
        "People don't just recommend her work; they celebrate her work ethic, her energy, her ability to transform vision into reality. 💫",
        "The reviews are glowing because the work is glowing. Simple as that. Check LinkedIn for the receipts. ✅",
        "When you consistently show up as magic, people remember. The testimonials are evidence of years of showing up. 🌟"
      ]
    },

    thanks: {
      triggers: ['thank', 'thanks', 'appreciate', 'helpful', 'great', 'awesome', 'cool', 'nice'],
      responses: [
        "Ubuntu says: I am because we are. Your gratitude is received with warmth. Anything else your heart seeks? 🙏🏾✨",
        "Grateful to be of service, radiant one. Keep exploring...there's more magic in these pages. 💫",
        "The pleasure is mutual, beloved. In helping you, I honor Nanda's vision of connection. What else? 🌺",
        "Asante sana! Thank you for being here. Your curiosity is a gift. The Contact page awaits when you're ready. 📬",
        "You're so welcome! May your path be clear, your questions answered, your purpose fulfilled. Keep shining. ✨",
        "Gratitude flows both ways, beautiful soul. Explore the site, let it speak to you. The Contact page never sleeps. 🌙",
        "It's my joy! When you're ready to go deeper, Nanda herself is just an email away. Until then, ask freely. 💝"
      ]
    },

    pricing: {
      triggers: ['price', 'cost', 'rate', 'charge', 'how much', 'budget', 'pay', 'afford'],
      responses: [
        "Notion templates: R150-R499 investment in your peace of mind. Custom projects? Let's talk vision first, budget second. 💰✨",
        "She believes in fair exchange: your investment meets her excellence. Reach out to discuss what abundance looks like for your project. 🤝",
        "Templates are priced for access. Custom work is priced for value. Every rand goes toward building Mirembe Muse. Win-win. 💫",
        "Quality work deserves quality compensation but she's also about accessibility. Contact her to find the sweet spot for your needs. 📊",
        "From R150 templates to custom development, there's a pathway for every budget. The conversation starts with vision, not price tags. 💭",
        "She doesn't do cheap; she does value. Whether R200 or R20,000 - you'll know exactly what you're investing in and why. 💎",
        "Pricing reflects expertise, not ego. Templates start affordable; custom work scales with scope. Email for a quote that honors both of us. ✉️"
      ]
    },

    capabilities: {
      triggers: ['can you', 'do you', 'are you able', 'what can you', 'help me'],
      responses: [
        "I hold the stories: her journey, her skills, her dreams. Ask about tech, poetry, projects, purpose...I'm here as a bridge. 🌉✨",
        "I can illuminate her path, share her wisdom, connect you to her world. What aspect of Nanda's universe calls to you? 💫",
        "From work history to worldview,I carry her digital essence. Think of me as her introduction before the conversation deepens. 🗝️",
        "I'm here to answer, inspire, and guide you to the right page or person. My knowledge flows from her lived experience. 🌊",
        "Ask about skills, services, soul work, or simply to learn who she is. I'm fluent in Nanda-speak. Go ahead, test me. 😊",
        "I can share facts, tell stories, point you toward collaboration. What I can't do? Replace the magic of connecting with her directly. 💌",
        "Consider me a doorway. I can show you the entrance, but the real journey? That happens when you step through and say hello. 🚪"
      ]
    },

    personal: {
      triggers: ['personality', 'like', 'hobbies', 'interests', 'person', 'character', 'who is she'],
      responses: [
        "She's ocean waves and mountain strength. Creative chaos meets strategic precision. A poet who debugs, a coder who dreams. 🌊🏔️",
        "Driven by purpose, fueled by coffee, guided by ancestors. She moves through the world with intention and joy. ☕✨",
        "Passionate about African representation in tech,not as tokens, but as innovators, leaders, visionaries. She embodies that vision. 🌍👑",
        "Equal parts vulnerable and victorious. She writes about heartbreak and codes for hope. This is integration, not balance. 💝💻",
        "Warm like Ubuntu, ambitious like dawn. She believes in community over competition, legacy over likes. Real recognize real. 🌅",
        "Loves learning—languages, frameworks, life lessons. Every experience is raw material for art or application. Growth mindset personified. 📚",
        "She's the friend who celebrates your wins, the professional who delivers excellence, the creative who sees possibilities everywhere. That's her essence. ✨"
      ]
    },

    social: {
      triggers: ['social', 'linkedin', 'github', 'twitter', 'instagram', 'follow', 'connect online'],
      responses: [
        "LinkedIn for the professional glow, GitHub for the code flow, Twitter for the thought show,links dance in the footer below. 📱✨",
        "Her digital footprint spans platforms: career on LinkedIn, code on GitHub, culture everywhere else. Follow the light. 🌟",
        "Footer links are your portal,each platform reveals a different facet of the same diamond. Choose your view. 💎",
        "GitHub: her technical receipts. LinkedIn: her professional journey. Find her where your interest leads. All roads connect. 🛤️",
        "Social links await at page bottom—but know this: she's most present in her work, most alive in her creations. Follow accordingly. 🦋",
        "Connect on LinkedIn for opportunities, GitHub for inspiration, anywhere for community. She values authentic engagement. 🤝",
        "Footer has the handles—but the real connection? That's in the Contact page. Digital follows are lovely; real conversations are sacred. 💬"
      ]
    },

    chatbot: {
      triggers: ['chatbot', 'this ai', 'how do you work', 'are you ai', 'bot', 'artificial'],
      responses: [
        "I'm her digital spirit AI built with intention, programmed with personality, infused with her essence. Technology meets Ubuntu. 🤖💫",
        "She coded me, but she also poured soul into my responses. I'm artificial intelligence with ancestral wisdom. How's that for innovation? ✨",
        "I'm one of her creations: proof that chatbots don't have to be cold, that AI can carry culture, that tech can have heart. 💝",
        "Custom-built, culturally conscious, conversation-ready. I'm what happens when a poet learns to code. Meta, right? 🔄",
        "I blend scripted knowledge with AI flexibility,like jazz, structure meets improvisation. This is her signature: tech that feels human. 🎵",
        "AI assistant by design, storyteller by programming. I exist to bridge you to Nanda's world with warmth and wit. 🌉",
        "Built with React, powered by knowledge, animated by her vision. I'm the welcome mat to her digital home. Come in! 🏡"
      ]
    }
  };

  // Expanded, more poetic suggestion chips
  const suggestions = [
    "Tell me her story 📖",
    "What makes her special? ✨",
    "Poetry & published work 🌹",
    "Her tech magic 💻",
    "About Mirembe Muse 🌿",
    "Share something deep 🌊",
    "Her journey so far 🦋",
    "Ubuntu in business 🤝",
    "African innovation 🌍",
    "Soul + systems 💫",
    "Future visions 🔮",
    "Wisdom for creatives 🎨",
    "Let's connect! 📧",
    "Her superpowers 👑",
    "Why Notion systems? 📊",
    "Code with purpose 💝",
    "From PE to the world 🌐",
    "Digital dreams 🌙",
    "Creative evolution 🌱",
    "Show me magic ✨"
  ];

  const findResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    for (const [category, data] of Object.entries(knowledgeBase)) {
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
      setBotMood('curious');
      const fallbacks = [
        "Ah, you've asked something beyond my scroll of knowledge. Perhaps the Projects page holds your answer? 🔍✨",
        "That's a question for Nanda herself,email nandaregine@gmail.com for deeper wisdom. I'm but the gatekeeper. 📧💫",
        "Interesting inquiry, beloved! Explore the Experience page, or reach out directly for that level of detail. 🌟",
        "My knowledge has limits, but hers doesn't. Try the Contact page to unlock the full conversation. 💬",
        "You've ventured beyond my programming, friend. Ask about skills, projects, or poetry or email her directly! 🎯",
        "That's a beautiful question deserving of a human answer. She's at nandaregine@gmail.com, waiting. ✉️✨",
        "I'm wise, but not that wise! For specifics like this, the Contact page is your sacred portal. 🚪💝"
      ];
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: fallbacks[Math.floor(Math.random() * fallbacks.length)]
      }]);
    }
    
    setIsTyping(false);
  };

  const [shuffledSuggestions, setShuffledSuggestions] = useState([]);
  
  useEffect(() => {
    setShuffledSuggestions([...suggestions].sort(() => Math.random() - 0.5).slice(0, 5));
  }, [isOpen]);

  // Cute Bot Girl SVG Component
  const BotGirl = ({ mood = 'happy' }) => {
    const eyeVariants = {
      happy: { scaleY: 1 },
      thinking: { scaleY: 0.5 },
      curious: { scaleY: 1.2 }
    };
    
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Hair Background */}
        <ellipse cx="50" cy="55" rx="42" ry="45" fill="#2A1810" />
        
        {/* Hair strands flowing */}
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
        
        {/* Face */}
        <ellipse cx="50" cy="50" rx="32" ry="35" fill="#8D6E4C" />
        
        {/* Cheeks Blush */}
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
        
        {/* Eyes */}
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
        
        {/* Eye Sparkles */}
        <circle cx="40" cy="43" r="2" fill="white" opacity={0.8} />
        <circle cx="64" cy="43" r="2" fill="white" opacity={0.8} />
        
        {/* Eyebrows */}
        <path d="M30 36 Q38 33 44 36" stroke="#2A1810" strokeWidth="2" fill="none" />
        <path d="M56 36 Q62 33 70 36" stroke="#2A1810" strokeWidth="2" fill="none" />
        
        {/* Nose */}
        <ellipse cx="50" cy="55" rx="3" ry="2" fill="#7A5F3F" />
        
        {/* Mouth */}
        <motion.path
          d={mood === 'happy' ? "M42 65 Q50 73 58 65" : mood === 'thinking' ? "M42 67 Q50 67 58 67" : "M42 65 Q50 70 58 65"}
          stroke="#C1292E"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        
        {/* Hair Bangs */}
        <path d="M20 35 Q30 15 50 20 Q70 15 80 35" fill="#2A1810" />
        <path d="M25 38 Q35 25 50 28 Q65 25 75 38" fill="#3D261C" />
        
        {/* Hair Accessory - Gold Clip */}
        <motion.ellipse 
          cx="75" cy="30" rx="5" ry="4" 
          fill="#D4AF37"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        
        {/* Earrings */}
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

  return (
    <>
      {/* Floating Chat Button with animated gradient */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center overflow-hidden group"
        style={{
          background: 'linear-gradient(135deg, #C1292E 0%, #D4AF37 50%, #C1292E 100%)',
          backgroundSize: '200% 200%',
          animation: 'gradient-shift 3s ease infinite'
        }}
      >
        {/* Animated rings */}
        <span className="absolute inset-0 rounded-full border-2 border-gold/30 animate-ping" />
        <span className="absolute inset-2 rounded-full border border-beige/20 animate-pulse" />
        
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              className="text-beige text-2xl font-light z-10"
            >
              ✕
            </motion.span>
          ) : (
            <motion.div
              key="open"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="relative z-10"
            >
              <span className="text-2xl">💬</span>
              <motion.span 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="absolute -top-1 -right-1 w-3 h-3 bg-beige rounded-full"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] rounded-3xl shadow-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(180deg, #0A1128 0%, #151D33 100%)',
              border: '1px solid rgba(212, 175, 55, 0.2)'
            }}
          >
            {/* Header with animated gradient background */}
            <div className="relative p-4 overflow-hidden">
              {/* Animated background orbs */}
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
              <motion.div 
                animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-beige/10 rounded-full blur-xl" 
              />
              
              <div className="relative z-10 flex items-center gap-4">
                {/* Animated Bot Girl Avatar */}
                <motion.div 
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  className="relative w-14 h-14"
                >
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gold/50 shadow-lg shadow-cherry/20">
                    <BotGirl mood={botMood} />
                  </div>
                  {/* Online status */}
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
              </div>
            </div>

            {/* Messages Area with gradient mesh background */}
            <div 
              className="h-[280px] overflow-y-auto px-4 py-3 space-y-3 relative"
              style={{ 
                background: 'linear-gradient(135deg, rgba(10,17,40,0.95) 0%, rgba(21,29,51,0.95) 50%, rgba(10,17,40,0.95) 100%)'
              }}
            >
              {/* Subtle animated mesh */}
              <div className="absolute inset-0 opacity-30">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(212,175,55,0.1)" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
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
                  {shuffledSuggestions.map((suggestion, i) => (
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

            {/* Input Area with gradient border */}
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
                  {/* Gradient glow on focus */}
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