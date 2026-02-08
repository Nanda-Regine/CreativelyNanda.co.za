/**
 * Seed Script: Create 6 Blog Posts
 * Run with: npx ts-node scripts/seed-blog-posts.ts
 * Or via API endpoint for easier execution
 */

export const blogPosts = [
  // DEV CATEGORY - 2 posts
  {
    slug: 'building-ai-chatbots-with-personality',
    title: 'Building AI Chatbots with Personality: Lessons from Creating NandaAI',
    excerpt: 'How I built an AI assistant that feels human—blending OpenAI APIs with cultural context and poetic sensibility.',
    content: `
# Building AI Chatbots with Personality

When I set out to build the AI assistant for my portfolio, I knew I didn't want just another generic chatbot. I wanted something that felt like *me*—warm, knowledgeable, and infused with the same Ubuntu philosophy that guides my work.

## The Challenge

Most chatbots feel cold and mechanical. They answer questions but don't *connect*. As a poet who codes, I believe technology should amplify humanity, not replace it. So how do you build an AI that carries culture?

## The Approach

### 1. Start with Knowledge, Not Just Responses

Instead of relying solely on AI-generated responses, I built a comprehensive knowledge base first. Every detail about my journey—15 academic distinctions, the book launch I organized for 100+ people, my TV appearance on Gqeberha: The Empire—became structured data the bot could draw from.

\`\`\`typescript
const knowledgeBase = {
  identity: {
    triggers: ['who is nanda', 'about you'],
    responses: [
      "I'm Nandawula Regine Kabali-Kagwa—Creative Technologist,
       Published Poet, and Founder of Mirembe Muse..."
    ]
  }
};
\`\`\`

### 2. Cultural Context Matters

I integrated Zulu and Luganda greetings (Sawubona, Sanibonani, Molweni) into the conversation flow. The bot doesn't just say "Hello"—it welcomes you in the way my grandmother would.

### 3. Fallback to AI, But Set the Tone

When the local knowledge base doesn't have an answer, the system falls back to OpenAI's API—but with a carefully crafted system prompt that maintains personality and cultural sensitivity.

## The Tech Stack

- **React** for the frontend interface
- **Framer Motion** for smooth animations
- **OpenAI API** for fallback responses
- **Local knowledge base** for accurate, personalized answers

## Key Learnings

1. **Personality > Perfection**: Users forgive small errors if the interaction feels genuine
2. **Speed matters**: Local responses are instant; API calls feel slower
3. **Context is king**: The same question on different pages should feel different

## The Result

An AI assistant that knows my story—from my poetry collection "Inside Her Roses" to my 15+ Notion templates—and shares it with warmth. Technology with soul.

---

*What would you build if you approached AI with poetry in mind?*
    `.trim(),
    cover_image: null,
    category: 'dev',
    tags: ['AI', 'chatbots', 'React', 'OpenAI', 'web development'],
    reading_time: 6,
    is_published: true,
    is_featured: true,
    published_at: new Date().toISOString(),
  },
  {
    slug: 'notion-systems-that-actually-work',
    title: 'Notion Systems That Actually Work: How I Save Clients 40-60% Admin Time',
    excerpt: 'The architecture behind 15+ Notion templates that transform chaos into clarity—from CRMs to financial dashboards.',
    content: `
# Notion Systems That Actually Work

After building 15+ Notion templates and saving clients 40-60% of their administrative time, I've learned that the secret isn't fancy databases—it's understanding *how humans actually work*.

## The Problem with Most Notion Setups

People treat Notion like a digital filing cabinet. They create endless pages, databases, and views... then never use them. The system becomes another thing to maintain rather than a tool that works for you.

## My Approach: African Architecture Principles

Traditional African architecture teaches that everything has its place and everything serves the whole. I apply this to digital systems:

### 1. Single Source of Truth

Every piece of information lives in exactly one place. Links and relations connect it everywhere it needs to appear.

\`\`\`
Master Database (Projects)
├── Views: Active, Completed, By Client
├── Relations: Tasks, Finances, Notes
└── Automations: Status changes trigger updates
\`\`\`

### 2. Progressive Disclosure

Don't show everything at once. Start simple, reveal complexity only when needed. My templates have:
- **Dashboard view**: Quick status at a glance
- **Working view**: Daily driver for actual work
- **Deep view**: All the details when you need them

### 3. Automated Maintenance

If you have to remember to update something, you won't. I build systems that:
- Auto-calculate totals and statuses
- Send reminders before they're needed
- Archive completed items automatically

## Template Categories

### For Students (R150-R250)
- Assignment trackers with deadline warnings
- Study schedule generators
- GPA calculators

### For Businesses (R299-R499)
- CRM with pipeline tracking
- Financial dashboards with Chart of Accounts
- Project management hubs

### For Creatives (R199-R349)
- Content calendars
- Client collaboration spaces
- Portfolio builders

## The Results

One client went from spending 4 hours weekly on admin to under 2 hours. Another stopped missing invoice follow-ups entirely. That's not just productivity—that's peace of mind.

## Want to Get Started?

Check out my templates in the marketplace, or reach out for custom system design. Remember: the goal isn't a beautiful Notion setup. The goal is getting your life back.

---

*What system would give you the most time back?*
    `.trim(),
    cover_image: null,
    category: 'dev',
    tags: ['Notion', 'productivity', 'systems', 'templates', 'automation'],
    reading_time: 5,
    is_published: true,
    is_featured: false,
    published_at: new Date(Date.now() - 86400000).toISOString(), // Yesterday
  },

  // WRITING CATEGORY - 2 posts
  {
    slug: 'poetry-algorithm-of-feeling',
    title: 'Poetry Is the Algorithm of Feeling: Why I Write',
    excerpt: 'From "Inside Her Roses" to national television—my journey with words and why poetry remains my first language.',
    content: `
# Poetry Is the Algorithm of Feeling

Before I wrote my first line of code, I wrote my first poem. Before I understood databases, I understood rhythm. Poetry isn't just something I do—it's how I process being alive.

## The Beginning

I grew up between cultures—Ugandan roots, South African soil, Zulu and English dancing on my tongue. Poetry became the bridge. When I couldn't find words in one language, I'd find them in verse.

## "Inside Her Roses"

In October 2021, I published my collection: 82 poems exploring love, identity, healing, and Black womanhood. The title is intentional—roses grow through concrete, bloom despite thorns. So do we.

### Themes I Explore

- **Romance & Sensuality**: Love in all its forms—tender, fierce, complicated
- **Identity & Healing**: What it means to become yourself, again and again
- **Empowerment**: Poetry as resistance, beauty as rebellion

## From Page to Screen

When I was featured on "Gqeberha: The Empire," my words reached thousands of living rooms. There's something sacred about that—your most vulnerable thoughts entering strangers' homes and finding resonance.

Radio interviews on Madiba FM and TRU FM followed. Each time, the same question: "Why poetry in a digital age?"

My answer: *Because we're more disconnected than ever, and poetry is a technology of connection.*

## The Book Launch

I organized everything myself. Crowdfunded, self-coordinated, fully executed. 100+ attendees for a combined poetry workshop and dining experience. Main character energy before it was a trend.

That night taught me: you don't need permission to share your gifts. You need courage.

## Poetry Meets Code

Now I write React components and sonnets. Both are languages. Both require structure and creativity. Both are ways of building bridges between what exists and what could be.

When I built the AI chatbot for this site, I approached it like poetry—what feeling do I want to evoke? What rhythm should the conversation have?

## Finding Your Voice

If you've ever wanted to write but felt you "weren't a writer," hear this:

1. **Everyone has a poem inside them**—it might be about your grandmother's hands or the way your city smells after rain
2. **Bad poems come before good ones**—write them anyway
3. **Your voice matters**—no one else can tell your specific truth

## Where to Find My Work

- **Book**: "Inside Her Roses" on Amazon, Apple Books, Kobo, and major retailers
- **Online**: Wattpad (@NandaRegine), AllPoetry (@Nanda_Regine), Instagram (@nanda.regine)
- **Live**: Speaking engagements and poetry workshops

---

*What would you write if you weren't afraid?*
    `.trim(),
    cover_image: null,
    category: 'writing',
    tags: ['poetry', 'writing', 'Inside Her Roses', 'creativity', 'self-expression'],
    reading_time: 5,
    is_published: true,
    is_featured: true,
    published_at: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
  },
  {
    slug: 'creativity-as-resistance',
    title: 'Creativity as Resistance: Being a Black Woman in Tech and Art',
    excerpt: 'Navigating two worlds that weren\'t designed for me, and building new ones that are.',
    content: `
# Creativity as Resistance

I exist at intersections: poet and programmer, African and global citizen, woman in spaces still dominated by men. Every day, I choose to create anyway.

## The Double Outsider

In tech spaces, I'm often the only Black woman in the room. In literary circles, my technical background raises eyebrows. Neither world was built with me in mind.

But here's what I've learned: *being an outsider is a superpower when you choose to build instead of beg for entry.*

## What Resistance Looks Like

### 1. Taking Up Space

When I organized my own book launch—crowdfunded, self-coordinated, 100+ attendees—I wasn't waiting for a publisher to discover me. I created my own platform.

When I taught myself to code through SheCodes and late-night tutorials, I wasn't waiting for permission. I built my own seat at the table.

### 2. Centering Culture

My AI chatbot greets visitors with "Sawubona" and "Sanibonani." My poetry explores Black womanhood without apology. My business, Mirembe Muse, carries "peace" in Luganda right in the name.

This isn't exoticism—it's authenticity. When you've been told your culture is "too much" for professional spaces, including it IS resistance.

### 3. Building Bridges

I don't want to just succeed in existing systems—I want to create new ones. My Notion templates are priced for accessibility (R150-R499) because I know what it's like to need tools you can't afford.

My poetry is free online across multiple platforms because art shouldn't be locked behind paywalls.

## The Cost

Let me be honest: resistance isn't comfortable.

There are days when code won't compile and words won't come. Days when imposter syndrome whispers that I don't belong in either world. Days when I wonder if it would be easier to just pick one lane and stay in it.

But then I remember: my ancestors survived things that should have been impossible. They created beauty in the midst of oppression. They resisted by continuing to exist, to create, to love.

## The Joy

And there's so much joy.

There's the moment a reader messages saying a poem helped them feel less alone. The client email about how a Notion system gave them their weekends back. The TV appearance where millions heard words I wrote at 3am in my apartment.

There's the knowledge that every line of code I write, every verse I publish, is proof that we exist, we create, we matter.

## Moving Forward

My advice to anyone at an intersection:

1. **Stop choosing**—you contain multitudes
2. **Build your own**—don't wait for invitations
3. **Rest is resistance**—burnout serves no one
4. **Document everything**—your journey helps others

## The Vision

Mirembe Muse launches in 2026 as more than a business. It's a proof of concept: that you can build successful ventures while maintaining humanity, creativity, and purpose.

That you can be African and global. Technical and artistic. Successful and soulful.

That you can resist by creating.

---

*What are you creating with your resistance?*
    `.trim(),
    cover_image: null,
    category: 'writing',
    tags: ['creativity', 'resistance', 'Black women', 'tech', 'art', 'identity'],
    reading_time: 6,
    is_published: true,
    is_featured: false,
    published_at: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
  },

  // BUSINESS CATEGORY - 2 posts
  {
    slug: 'from-waitress-to-founder',
    title: 'From Waitress to Founder: The Non-Linear Path to Entrepreneurship',
    excerpt: 'How serving tables taught me more about business than any degree—and why every job prepared me for this moment.',
    content: `
# From Waitress to Founder

My LinkedIn shows a journey that doesn't make linear sense: Junior Waitress → Senior Waitress → Marketing Assistant → Team Leader → Event Coordinator → Manager → Creative Technologist → Founder.

But here's the thing: every single role prepared me for what I'm building now.

## The Restaurant Education

At Balkan Burger, I didn't just serve food—I got a masterclass in business operations.

### As a Waitress (2023)
- **Customer psychology**: Reading body language, anticipating needs
- **Time management**: Juggling 10 tables means triaging in real-time
- **Upselling**: This is just product marketing with breadsticks

I authored the entire operations manual, improving service speed by 30% and reducing onboarding time by 50%.

### As Team Leader
- Managed 10+ staff
- Increased upsell conversions by 30%
- Achieved 4.8/5 customer satisfaction rating

The skills transfer directly: managing a dev team isn't that different from managing a restaurant floor. Both require clear communication, quick problem-solving, and keeping morale high under pressure.

### As Event Coordinator
- Executed events for 100-500+ guests
- Boosted attendance by 40% through digital marketing
- Generated 20% increase in ticket revenue

This is exactly what I did for my book launch—just with poetry instead of burgers.

### As Manager
- Directed daily operations for 15+ staff
- Digitized paper processes, reducing overhead by 35%
- Reduced inventory waste by 22%
- Improved profitability by 18%

Now I do this for clients through Notion systems and workflow automation.

## The Sportsmans Warehouse Years

Before restaurants, I spent 4 years in retail. Key lessons:

- **Receiving Clerk**: 99% accuracy taught me attention to detail (critical for debugging)
- **Cashier**: Handling money and trust (foundations for business finances)
- **Sales Assistant**: Understanding customer needs (now called "user research")

## What University Taught Me

Nelson Mandela University gave me three degrees with 15 distinctions:
- **Higher Certificate in Business Management** (NQF 5)
- **Diploma in Management** (NQF 6)
- **Advanced Diploma in Business Management** (NQF 7)

But honestly? The theory made sense because I'd already lived it.

## Teaching Myself Tech

Between shifts, I learned to code. SheCodes bootcamp. YouTube tutorials. Documentation until my eyes blurred.

The same work ethic that got me from Junior Waitress to Manager in 18 months got me from "Hello World" to building full-stack applications in a year.

## The Mirembe Muse Vision

When I launch Mirembe Muse (Pty) Ltd in 2026, I'll bring:

- **Restaurant efficiency** → streamlined client processes
- **Retail customer care** → client experience focus
- **Event execution** → launch and project management
- **Academic foundations** → strategic thinking
- **Self-taught coding** → technical delivery

## Advice for Non-Linear Journeys

1. **Nothing is wasted**—every job teaches something
2. **Document your skills**—you have more than you think
3. **Connect the dots forward**—the story will make sense later
4. **Start before you're ready**—I was coding while still managing restaurants

## The Truth About Entrepreneurship

You don't need a perfect path. You need:
- Willingness to learn
- Ability to adapt
- Courage to start
- Resilience to continue

I'm proof that waitresses become founders. That restaurant managers become tech entrepreneurs. That the non-linear path might be the only path that truly prepares you.

---

*What unexpected experience is preparing you for what's next?*
    `.trim(),
    cover_image: null,
    category: 'business',
    tags: ['entrepreneurship', 'career', 'journey', 'Mirembe Muse', 'growth'],
    reading_time: 7,
    is_published: true,
    is_featured: true,
    published_at: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
  },
  {
    slug: 'building-with-ubuntu',
    title: 'Building with Ubuntu: The Philosophy Behind Mirembe Muse',
    excerpt: 'How African wisdom shapes my approach to business—community over competition, legacy over likes.',
    content: `
# Building with Ubuntu

When I named my company Mirembe Muse, I chose "Mirembe"—Luganda for "peace"—deliberately. In a world of hustle culture and burnout, I'm building something different: a business grounded in Ubuntu philosophy.

## What is Ubuntu?

Ubuntu is a Southern African concept often translated as "I am because we are." It's the understanding that our humanity is bound up in each other's. In business terms: your success doesn't diminish mine—it enhances it.

## Ubuntu in Practice

### 1. Community Over Competition

I share knowledge freely. My blog posts don't hold back the "good stuff." My Notion templates are priced for accessibility (R150-R499, not R5000+). When someone asks how I built something, I tell them.

Why? Because there are enough problems in the world for all of us to solve. My success helping one client doesn't reduce my ability to help others.

### 2. Legacy Over Likes

I'm not optimizing for virality. I'm optimizing for impact. Every system I build, every poem I write, every client I serve—I ask myself: "Will this matter in 10 years?"

The book launch I organized wasn't designed for Instagram. It was designed to create an experience that 100+ people would carry with them.

### 3. Humanity Over Hustle

I don't celebrate burnout. When I reduced my client's admin time by 60%, I didn't give them 60% more work to do—I gave them back their family dinners and weekend mornings.

My AI chatbot greets people with "Sawubona"—a Zulu word meaning "I see you." Not "How can I help you buy something?" but "I acknowledge your humanity."

## The Three Pillars of Mirembe Muse

### Technology
Full-stack development, AI integration, Notion architecture—but always asking: "Does this make someone's life easier or just more complicated?"

### Creativity
Poetry, content, design—because beauty matters. Functional but ugly is still a failure.

### Purpose
Every service, product, and decision runs through the filter: "Does this align with building peace?"

## What This Looks Like Practically

- **Pricing**: Value-based, not hours-logged. Because your worth isn't measured in time
- **Communication**: Honest, even when it costs me a sale. I've told people when they don't need what I offer
- **Process**: Milestone-based, with transparency throughout. No black boxes
- **Relationships**: Long-term thinking. I'd rather have 10 clients for 5 years than 50 clients for 3 months

## Lessons from Ancestors

My grandmother didn't call it "customer retention"—she called it "being a good neighbor." My grandfather didn't talk about "personal branding"—he talked about "your name is your reputation."

Modern business wisdom often repackages ancient African wisdom with jargon. I prefer the originals.

## The Commercial Case for Ubuntu

Some think purpose-driven business is less profitable. The data disagrees:
- Clients referred by existing clients have higher lifetime value
- Trust reduces sales cycles
- Meaning increases resilience (I didn't quit during the hard years)
- Reputation compounds (my testimonials came from relationships, not transactions)

## Building Peace

"Mirembe" means peace. Peace isn't passive—it's actively created. Every business decision is a choice between building peace or extracting value.

I choose peace:
- In how I price (fair exchange, not exploitation)
- In how I communicate (honest, not manipulative)
- In what I build (solutions, not dependencies)
- In how I grow (sustainable, not extractive)

## Join the Movement

Whether you ever work with Mirembe Muse or not, consider:
- How might Ubuntu philosophy change your work?
- What would you build if legacy mattered more than likes?
- Where is there tension between your values and your business practices?

I'm not claiming to have it figured out. I'm learning daily. But the direction is set: business that builds peace.

---

*What does Ubuntu mean for your work?*
    `.trim(),
    cover_image: null,
    category: 'business',
    tags: ['Ubuntu', 'philosophy', 'Mirembe Muse', 'values', 'African wisdom', 'entrepreneurship'],
    reading_time: 6,
    is_published: true,
    is_featured: false,
    published_at: new Date(Date.now() - 432000000).toISOString(), // 5 days ago
  },
];

// For use in API seeding
export default blogPosts;
