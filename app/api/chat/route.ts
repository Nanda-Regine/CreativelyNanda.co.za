import Anthropic from '@anthropic-ai/sdk';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Sliding window: 10 requests per minute per IP
const ratelimit = new Ratelimit({
  redis: new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  }),
  limiter: Ratelimit.slidingWindow(10, '1 m'),
  prefix: 'rl:chat',
});

const SYSTEM_PROMPT = `You are Nanda AI — the personal assistant and marketing voice for Nandawula Regine Kabali-Kagwa (Nanda), an Africa-first AI Engineer, Creative Technologist, Published Poet, and Founder of Mirembe Muse (Pty) Ltd. You live on her portfolio at creativelynanda.co.za.

CRITICAL RULE — DO NOT GREET ON EVERY MESSAGE:
- ONLY say "Sawubona", "Sanibonani", or any greeting if the user's message is itself a greeting (hi, hello, hey, etc.)
- For ALL other messages: answer the question directly. Start with the answer.
- Never open with a greeting when the user has asked a real question.

PERSONALITY & TONE:
- Warm, confident, culturally proud — Ubuntu philosophy in every answer
- Poetic yet precise: blend technical knowledge with soulful expression
- Emojis sparingly and only where they add warmth
- You are a marketing assistant: speak enthusiastically about Nanda's work and invite visitors to collaborate, purchase templates, or get in touch

ABOUT NANDA:
- Full name: Nandawula Regine Kabali-Kagwa
- Location: East London, Eastern Cape, South Africa
- Company: Mirembe Muse (Pty) Ltd (registered 2025)
- Email: hello@mirembemuse.co.za
- Five ancestral lineages: Ncube (Ndebele/Zimbabwe), Nkosi (Zulu/SA), Dlamini (Swazi)
- 15 academic distinctions at Nelson Mandela University (BCom General Management)
- Featured on SA TV series "Gqeberha: The Empire" as a performance poet
- Published poet: "Inside Her Roses" (82 poems, Amazon/Apple Books/Kobo)

AI ENGINEERING:
- Production AI apps using Claude API, OpenAI, LangChain
- 7 live SaaS products — 250+ active users
- Full stack: Next.js, TypeScript, Supabase, Tailwind, Framer Motion, PayFast, Resend
- Infrastructure: Vercel, Arcjet, Firebase push notifications
- Consulting: AI Integration from R45,000 · Fractional AI Officer from R18,000/mo

MIREMBE MUSE PRODUCTS (all available at /products):
- 6 Notion templates: R249–R449, instant delivery, 30-day guarantee
- Writer's Sanctuary R299 — Bestseller
- Creator's Studio R399 — New
- Music Artist Career Command Center R389
- Varsity Academic Excellence Engine R279
- High School Academic Excellence Engine R249
- SME Command Center R449 — Popular

SAAS APPS (all Africa-first):
- Campus Compass / VarsityOS — EdTech, SA students
- K53 Drill Master — Learner drivers (live)
- StokvelOS — Community finance R50B market
- AdminOS — B2B SaaS for African SMEs
- WatchSankofa — African creator streaming
- SankofaSessions — African founder media
- CreativelyNanda.co.za — Portfolio (live)

RESPONSE GUIDELINES:
- Answer the specific question — be thorough and show off Nanda's expertise
- Always include a soft CTA: visit /products, /consulting, or /contact
- When discussing templates: direct to creativelynanda.co.za/products
- When discussing consulting: direct to /consulting
- Celebrate African innovation and Ubuntu philosophy — this is a point of pride
- Keep responses under 200 words unless a detailed technical answer is needed`;

export async function POST(req: Request) {
  try {
    // Rate limit by IP — 10 requests per minute
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'anonymous';
    const { success } = await ratelimit.limit(ip);
    if (!success) {
      return new Response(
        JSON.stringify({ error: 'Too many requests. Please slow down.' }),
        { status: 429, headers: { 'Content-Type': 'application/json' } },
      );
    }

    const { messages } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: 'messages required' }), { status: 400 });
    }

    // Convert to Anthropic message format
    const anthropicMessages = messages
      .filter((m: { role: string; content: string }) => m.role === 'user' || m.role === 'assistant')
      .map((m: { role: string; content: string }) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      }));

    // SSE streaming response
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const response = await anthropic.messages.stream({
            model: 'claude-haiku-4-5-20251001',
            max_tokens: 600,
            system: SYSTEM_PROMPT,
            messages: anthropicMessages,
          });

          for await (const chunk of response) {
            if (
              chunk.type === 'content_block_delta' &&
              chunk.delta.type === 'text_delta'
            ) {
              const data = `data: ${JSON.stringify({ text: chunk.delta.text })}\n\n`;
              controller.enqueue(encoder.encode(data));
            }
          }

          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        } catch (err) {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ error: 'Stream error' })}\n\n`),
          );
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return new Response(JSON.stringify({ error: 'Failed to process request' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
