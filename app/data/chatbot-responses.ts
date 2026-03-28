export interface PreprogrammedResponse {
  keywords: string[];
  response: string;
  followUp?: string;
  category: string;
}

export const preprogrammedResponses: PreprogrammedResponse[] = [
  {
    keywords: ['who', 'nanda', 'about'],
    response: 'Hello, beautiful soul. I am Nanda - a Creative Technologist who walks between code and poetry. I build digital experiences that resonate and write verses that connect. I am the founder of Mirembe Muse and author of Inside Her Roses.',
    category: 'about',
    followUp: 'What draws you here today?'
  },
  {
    keywords: ['poetry', 'poet', 'roses'],
    response: 'Poetry is the algorithm of feeling. My collection Inside Her Roses explores the gardens we plant inside ourselves. I have performed on stages and radio shows, witnessing the magic when strangers become kindred spirits through shared words.',
    category: 'poetry',
    followUp: 'Are you a creative soul yourself?'
  },
  {
    keywords: ['mirembe', 'muse', 'business'],
    response: 'Mirembe Muse is my manifestation of belief: that we can build enterprises with soul. Mirembe means peace in Luganda. I offer Creative Technology Services, Notion Systems, Digital Content, and Business Consulting.',
    category: 'business',
    followUp: 'What dream are you building?'
  },
  {
    keywords: ['projects', 'technical', 'code'],
    response: 'I build things that matter: True Access accessibility app, this portfolio with Next.js, Notion systems for SMEs, and AI-powered applications. Every line of code asks: Will this serve someone?',
    category: 'work',
    followUp: 'Is there a project stirring in your heart?'
  },
  {
    keywords: ['collaborate', 'hire', 'services'],
    response: 'I would be honored to explore collaboration. I start by listening deeply - not just what you need built, but why it matters. I offer Web Development, AI Integration, Notion Systems, and Creative Consulting.',
    category: 'work',
    followUp: 'What is calling to be created?'
  },
  {
    keywords: ['contact', 'reach', 'email'],
    response: 'I would love to connect. Use the contact form on this site - I read every message personally and respond within 24-48 hours. Connect with me on LinkedIn, Instagram, or GitHub.',
    category: 'contact',
    followUp: 'What would you like to create together?'
  },
  {
    keywords: ['price', 'cost', 'budget'],
    response: 'I price based on value delivered, not hours logged. Web development, consulting, and Notion systems all vary by complexity. I believe in transparency and offer milestone-based payments.',
    category: 'business',
    followUp: 'Want to talk specifics about your project?'
  }
];

export const findBestResponse = (userMessage: string): PreprogrammedResponse | null => {
  const messageLower = userMessage.toLowerCase();
  
  const scoredResponses = preprogrammedResponses.map(response => {
    const score = response.keywords.reduce((acc, keyword) => {
      return acc + (messageLower.includes(keyword.toLowerCase()) ? 1 : 0);
    }, 0);
    return { response, score };
  });
  
  scoredResponses.sort((a, b) => b.score - a.score);
  
  return scoredResponses[0].score > 0 ? scoredResponses[0].response : null;
};

export const commonQuestions = [
  'Who is Nanda?',
  'Tell me about your poetry',
  'How can we work together?',
  'What projects have you built?'
];

export const getGreeting = (): string => {
  const hour = new Date().getHours();
  
  if (hour < 12) {
    return 'Good morning, beautiful soul';
  } else if (hour < 18) {
    return 'Good afternoon, friend';
  } else {
    return 'Good evening, kindred spirit';
  }
};