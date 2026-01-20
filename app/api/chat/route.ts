import { NextResponse } from 'next/server';
import OpenAI from 'openai';
export const dynamic = 'force-dynamic';
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const systemPrompt = 'You are Nanda AI, a warm and helpful assistant representing Nanda, a Creative Technologist and poet.';

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages,
      ],
      max_tokens: 300,
      temperature: 0.7,
    });

    return NextResponse.json({
      message: completion.choices[0].message.content,
    });
  } catch (error: any) {
    console.error('OpenAI API error:', error);
    
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}