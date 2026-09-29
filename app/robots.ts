import { MetadataRoute } from 'next';

// Every public page is open to every crawler, search engines and AI assistants
// alike: people now ask assistants "who is Nandawula Regine?", and the answer
// should come from this site. Only private machinery is disallowed.
//
// Pages that must stay out of search (PayFast return/cancel, order lookup,
// /upgrades, /maintenance) are NOT disallowed here on purpose: they carry a
// noindex meta tag, and a crawler can only obey noindex on a page it may fetch.
const PRIVATE = ['/admin/', '/api/', '/checkout/', '/orders/'];

// Named so the welcome is explicit, and survives any future tightening of '*'.
const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'CCBot',
  'Meta-ExternalAgent',
  'cohere-ai',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: PRIVATE },
      { userAgent: AI_CRAWLERS, allow: '/', disallow: PRIVATE },
    ],
    sitemap: 'https://creativelynanda.co.za/sitemap.xml',
    host: 'https://creativelynanda.co.za',
  };
}
