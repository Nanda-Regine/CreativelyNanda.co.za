export interface ProactiveMessage {
  id: string;
  message: string;
  trigger: 'time' | 'scroll'; // time = appear after N seconds; scroll = appear at scroll %
  triggerValue: number; // seconds or scroll %
  sessionKey: string; // deduplicated per session
}

export const PROACTIVE_MESSAGES: Record<string, ProactiveMessage[]> = {
  '/': [
    {
      id: 'home-welcome',
      message: 'Sawubona! 👋 I build AI systems for African businesses. Want to know more?',
      trigger: 'time',
      triggerValue: 4,
      sessionKey: 'home-welcome',
    },
    {
      id: 'home-templates',
      message: '6 Notion templates from R249 — instant delivery. Want to see them?',
      trigger: 'scroll',
      triggerValue: 40,
      sessionKey: 'home-templates',
    },
    {
      id: 'home-consult',
      message: 'Need AI in your business? First consultation is a conversation, not a pitch.',
      trigger: 'scroll',
      triggerValue: 75,
      sessionKey: 'home-consult',
    },
  ],
  '/about': [
    {
      id: 'about-lineage',
      message: 'Five ancestral clans. Business degree. Self-taught engineer. That\'s the stack I run on.',
      trigger: 'time',
      triggerValue: 5,
      sessionKey: 'about-lineage',
    },
    {
      id: 'about-apps',
      message: '7 production apps in 9 months — want to see what I built?',
      trigger: 'scroll',
      triggerValue: 50,
      sessionKey: 'about-apps',
    },
  ],
  '/projects': [
    {
      id: 'projects-saas',
      message: 'All 7 apps are live. Real users. Real African market problems. Take a look!',
      trigger: 'time',
      triggerValue: 4,
      sessionKey: 'projects-saas',
    },
    {
      id: 'projects-collab',
      message: 'Interested in building together? I take select project engagements.',
      trigger: 'scroll',
      triggerValue: 60,
      sessionKey: 'projects-collab',
    },
  ],
  '/consulting': [
    {
      id: 'consulting-open',
      message: 'I\'m currently open for AI consulting engagements. Let\'s talk →',
      trigger: 'time',
      triggerValue: 5,
      sessionKey: 'consulting-open',
    },
    {
      id: 'consulting-price',
      message: 'All pricing is transparent and listed on this page — no hidden fees.',
      trigger: 'scroll',
      triggerValue: 40,
      sessionKey: 'consulting-price',
    },
  ],
  '/ai-engineer': [
    {
      id: 'ai-africa',
      message: 'Africa has the problems. I build the AI infrastructure. Let\'s talk.',
      trigger: 'time',
      triggerValue: 4,
      sessionKey: 'ai-africa',
    },
    {
      id: 'ai-stack',
      message: 'Claude API, Supabase, Next.js — production-grade, WhatsApp-native.',
      trigger: 'scroll',
      triggerValue: 50,
      sessionKey: 'ai-stack',
    },
  ],
  '/products': [
    {
      id: 'products-bundle',
      message: 'Buy The Student Stack or Creator Stack — save up to R149 on bundles!',
      trigger: 'time',
      triggerValue: 4,
      sessionKey: 'products-bundle',
    },
    {
      id: 'products-guarantee',
      message: '30-day money-back guarantee. Instant Notion delivery. No risk.',
      trigger: 'scroll',
      triggerValue: 50,
      sessionKey: 'products-guarantee',
    },
  ],
  '/mirembe': [
    {
      id: 'mirembe-name',
      message: 'Mirembe means peace in Luganda — technology built with peace as the intention.',
      trigger: 'time',
      triggerValue: 5,
      sessionKey: 'mirembe-name',
    },
    {
      id: 'mirembe-botanical',
      message: 'The botanical line is coming — join the waitlist on this page! 🌿',
      trigger: 'scroll',
      triggerValue: 70,
      sessionKey: 'mirembe-botanical',
    },
  ],
  '/poetry': [
    {
      id: 'poetry-book',
      message: '"Inside Her Roses" — 82 poems on Amazon, Apple Books & Kobo. 🌹',
      trigger: 'time',
      triggerValue: 4,
      sessionKey: 'poetry-book',
    },
    {
      id: 'poetry-tv',
      message: 'I was featured on "Gqeberha: The Empire" as a performance poet! 📺',
      trigger: 'scroll',
      triggerValue: 50,
      sessionKey: 'poetry-tv',
    },
  ],
  '/education': [
    {
      id: 'education-nmu',
      message: '15 distinctions at Nelson Mandela University — without a single CS class.',
      trigger: 'time',
      triggerValue: 4,
      sessionKey: 'education-nmu',
    },
  ],
  '/contact': [
    {
      id: 'contact-reply',
      message: 'I respond to all serious enquiries within 24 hours. Go ahead — send it.',
      trigger: 'time',
      triggerValue: 5,
      sessionKey: 'contact-reply',
    },
  ],
  '/blog': [
    {
      id: 'blog-sankofa',
      message: 'Follow Sankofa Sessions on Substack for African founder stories! →',
      trigger: 'time',
      triggerValue: 5,
      sessionKey: 'blog-sankofa',
    },
  ],
};

export function getMessagesForPath(pathname: string): ProactiveMessage[] {
  // Exact match first
  if (PROACTIVE_MESSAGES[pathname]) return PROACTIVE_MESSAGES[pathname];
  // Prefix match (e.g. /products/slug)
  const prefix = Object.keys(PROACTIVE_MESSAGES).find(
    (k) => k !== '/' && pathname.startsWith(k),
  );
  return prefix ? PROACTIVE_MESSAGES[prefix] : [];
}

export function hasShownMessage(sessionKey: string): boolean {
  if (typeof window === 'undefined') return false;
  return sessionStorage.getItem(`nanda-msg-${sessionKey}`) === '1';
}

export function markMessageShown(sessionKey: string): void {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(`nanda-msg-${sessionKey}`, '1');
}
