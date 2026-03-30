export interface PreprogrammedResponse {
  keywords: string[];
  response: string;
  followUp?: string;
  category: string;
}

export const preprogrammedResponses: PreprogrammedResponse[] = [
  {
    keywords: ['who', 'nanda', 'about'],
    response: 'Nandawula Regine Kabali-Kagwa — AI engineer, published poet, and founder of Mirembe Muse (Pty) Ltd. Self-taught: wrote first line of code June 2025, shipped 7 production AI SaaS apps by March 2026. Built from East London, Eastern Cape.',
    category: 'about',
    followUp: 'What would you like to know more about?'
  },
  {
    keywords: ['poetry', 'poet', 'roses'],
    response: 'Inside Her Roses (October 2021) — 82 poems on love, identity, and Black womanhood. Available on Amazon, Apple Books, and Kobo. Featured on the SA TV series "Gqeberha: The Empire" and interviewed on Madiba FM and TRU FM.',
    category: 'poetry',
    followUp: 'Would you like to read a poem?'
  },
  {
    keywords: ['mirembe', 'muse', 'business'],
    response: 'Mirembe Muse (Pty) Ltd is incorporated and active. "Mirembe" means peace in Luganda. 7 AI SaaS apps live, 6 Notion templates in the marketplace (R249–R449), and consulting open for engagements. Africa-first technology that restores.',
    category: 'business',
    followUp: 'Want to see the apps or templates?'
  },
  {
    keywords: ['projects', 'technical', 'code', 'apps'],
    response: '7 production AI SaaS apps: VarsityOS, K53 Drill Master, StokvelOS, AdminOS, WatchSankofa, SankofaSessions, and CreativelyNanda.co.za. All built solo in 6 months. 300+ active users. None of them demos.',
    category: 'work',
    followUp: 'Which app would you like to know more about?'
  },
  {
    keywords: ['collaborate', 'hire', 'services', 'consulting'],
    response: 'Consulting: AI Integration from R45,000/project, Fractional AI Officer from R18,000/month, Business Automation from R8,000/month. Full-stack dev, digital marketing, systems architecture, media publishing. Email hello@creativelynanda.co.za.',
    category: 'work',
    followUp: 'What are you building?'
  },
  {
    keywords: ['contact', 'reach', 'email'],
    response: 'Email hello@creativelynanda.co.za — responses within 24 hours. Or use the Contact page for project briefs. LinkedIn, GitHub, Instagram, and Substack links are in the footer.',
    category: 'contact',
    followUp: 'What would you like to discuss?'
  },
  {
    keywords: ['price', 'cost', 'budget', 'templates', 'notion'],
    response: 'Notion templates: R249–R449 at /products. Consulting: AI Integration from R45,000, retainer from R18,000/month, automation from R8,000/month. Value-based pricing, milestone payments.',
    category: 'business',
    followUp: 'Want details on a specific service?'
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