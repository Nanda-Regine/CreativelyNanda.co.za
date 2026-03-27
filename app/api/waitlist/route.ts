import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { email, source = 'mirembe-botanical' } = await req.json();

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }

    // Insert into Supabase
    const { error: dbError } = await supabase.from('waitlist').insert([
      { email: email.toLowerCase().trim(), source, created_at: new Date().toISOString() },
    ]);

    // Ignore duplicate-key errors (user already on list)
    if (dbError && !dbError.message.includes('duplicate')) {
      console.error('Waitlist DB error:', dbError);
      return NextResponse.json({ error: 'Failed to join waitlist' }, { status: 500 });
    }

    // Send confirmation email
    await resend.emails.send({
      from: 'Mirembe Muse <hello@mirembemuse.co.za>',
      to: email,
      subject: "You're on the Mirembe Muse botanical waitlist",
      html: `
        <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; padding: 40px 24px; background: #FAFAF8; color: #1A1A1A;">
          <h1 style="font-size: 28px; font-style: italic; margin-bottom: 16px;">Thank you.</h1>
          <p style="font-size: 16px; line-height: 1.7; color: #6B6B6B; margin-bottom: 24px;">
            We&rsquo;ll reach out when the botanical line launches.
          </p>
          <p style="font-size: 14px; color: #6B6B6B; border-top: 1px solid #E0D8CC; padding-top: 20px; margin-top: 32px;">
            &mdash; Nanda, Mirembe Muse<br />
            <a href="https://creativelynanda.co.za/mirembe" style="color: #C9A84C;">mirembe.co.za</a>
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Waitlist error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
