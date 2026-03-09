import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createServerClient } from '@/lib/supabase/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }

    const supabase = createServerClient();

    // Upsert subscriber (ignore duplicate)
    const { error: dbError } = await supabase
      .from('subscribers')
      .upsert({ email: email.toLowerCase().trim(), subscribed_at: new Date().toISOString() }, {
        onConflict: 'email',
        ignoreDuplicates: true,
      });

    if (dbError) {
      console.error('Subscriber upsert error:', dbError);
      // Don't fail — still send welcome email
    }

    // Send branded welcome email
    await resend.emails.send({
      from: 'Nanda <hello@creativelynanda.co.za>',
      to: email,
      subject: 'You\'re in! Welcome to The Current ✨',
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #0A1128;">
          <div style="background: linear-gradient(135deg, #0A1128 0%, #1a2744 100%); padding: 40px 32px; border-radius: 16px 16px 0 0; text-align: center;">
            <p style="color: #C1292E; font-size: 11px; font-weight: bold; letter-spacing: 0.3em; text-transform: uppercase; margin: 0 0 16px;">The Current</p>
            <h1 style="color: #E8DCC4; font-size: 32px; margin: 0 0 8px; font-weight: bold;">You're in. 🎉</h1>
            <p style="color: #B8860B; font-size: 14px; margin: 0; letter-spacing: 0.1em;">Welcome to the community</p>
          </div>

          <div style="background: #F5EFE6; padding: 40px 32px; border-radius: 0 0 16px 16px; border: 1px solid #E8DCC4;">
            <p style="color: #0A1128; font-size: 18px; line-height: 1.7; margin: 0 0 20px;">
              Welcome to <strong>The Current</strong> — where code meets creativity, technology meets culture, and African voices lead the conversation.
            </p>

            <p style="color: #0A1128; opacity: 0.75; line-height: 1.8; margin: 0 0 24px;">
              I write about building AI-powered applications, navigating tech as an African creative,
              and the real process of building a company from East London, Eastern Cape.
              Expect honesty, depth, and the occasional poem.
            </p>

            <div style="background: white; border-radius: 12px; padding: 24px; margin: 24px 0; border-left: 4px solid #C1292E;">
              <p style="color: #C1292E; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.15em; margin: 0 0 12px;">While you wait for the next issue</p>
              <div style="display: flex; flex-direction: column; gap: 10px;">
                <a href="https://creativelynanda.co.za/products" style="color: #0A1128; text-decoration: none; font-size: 14px;">📦 Browse Mirembe Muse Notion Templates →</a>
                <a href="https://creativelynanda.co.za/ai-engineer" style="color: #0A1128; text-decoration: none; font-size: 14px;">🤖 Explore my AI Engineering work →</a>
                <a href="https://creativelynanda.co.za/poetry/collection" style="color: #0A1128; text-decoration: none; font-size: 14px;">🌹 Read a poem from Inside Her Roses →</a>
              </div>
            </div>

            <p style="color: #B8860B; font-style: italic; font-size: 16px; margin: 24px 0 8px;">— Nanda</p>
            <p style="color: #0A1128; font-size: 13px; margin: 0; opacity: 0.6;">Nandawula Regine Kabali-Kagwa · East London, South Africa</p>

            <hr style="border: none; border-top: 1px solid #E8DCC4; margin: 24px 0;" />
            <p style="color: #0A1128; font-size: 11px; opacity: 0.4; margin: 0; text-align: center;">
              You subscribed at creativelynanda.co.za. No spam. Ever.
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Subscribe error:', error);
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}
