import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

function esc(str: string): string {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Sanitize all user inputs before embedding in HTML email
    const safeName = esc(String(name).slice(0, 200));
    const safeEmail = esc(String(email).slice(0, 320));
    const safeSubject = esc(String(subject || '').slice(0, 500));
    const safeMessage = esc(String(message).slice(0, 5000));

    // Send notification to Nanda
    await resend.emails.send({
      from: 'Creatively Nanda <hello@creativelynanda.co.za>',
      to: 'hello@creativelynanda.co.za',
      replyTo: email,
      subject: `New Contact: ${subject || 'General enquiry'} — from ${name}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #0A1128;">
          <div style="background: linear-gradient(135deg, #0A1128, #1a2744); padding: 32px; border-radius: 16px 16px 0 0;">
            <h1 style="color: #E8DCC4; font-size: 24px; margin: 0;">New Contact Form Message</h1>
            <p style="color: #E8DCC4; opacity: 0.6; margin: 8px 0 0;">CreativelyNanda.co.za</p>
          </div>
          <div style="background: #F5EFE6; padding: 32px; border-radius: 0 0 16px 16px; border: 1px solid #E8DCC4;">
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <tr><td style="padding: 8px 0; color: #C1292E; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.1em; width: 100px;">Name</td><td style="padding: 8px 0; color: #0A1128; font-weight: 600;">${safeName}</td></tr>
              <tr><td style="padding: 8px 0; color: #C1292E; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.1em;">Email</td><td style="padding: 8px 0;"><a href="mailto:${safeEmail}" style="color: #0A1128;">${safeEmail}</a></td></tr>
              <tr><td style="padding: 8px 0; color: #C1292E; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.1em;">Subject</td><td style="padding: 8px 0; color: #0A1128;">${safeSubject || 'Not specified'}</td></tr>
            </table>
            <div style="background: white; border-radius: 12px; padding: 24px; border-left: 4px solid #C1292E;">
              <p style="font-size: 12px; color: #C1292E; font-weight: bold; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 12px;">Message</p>
              <p style="color: #0A1128; line-height: 1.8; margin: 0; white-space: pre-wrap;">${safeMessage}</p>
            </div>
            <p style="color: #0A1128; opacity: 0.4; font-size: 12px; margin-top: 24px; text-align: center;">Hit reply to respond directly to ${safeName}</p>
          </div>
        </div>
      `,
    });

    // Send auto-reply to sender
    await resend.emails.send({
      from: 'Nanda <hello@creativelynanda.co.za>',
      to: email,
      subject: `Got your message, ${name.split(' ')[0]}! ✨`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #0A1128;">
          <div style="background: linear-gradient(135deg, #0A1128, #1a2744); padding: 32px; border-radius: 16px 16px 0 0; text-align: center;">
            <h1 style="color: #E8DCC4; font-size: 28px; margin: 0;">Thank you, ${safeName.split(' ')[0]}!</h1>
            <p style="color: #B8860B; font-size: 14px; margin: 8px 0 0; letter-spacing: 0.2em; text-transform: uppercase;">Message received</p>
          </div>
          <div style="background: #F5EFE6; padding: 32px; border-radius: 0 0 16px 16px; border: 1px solid #E8DCC4;">
            <p style="color: #0A1128; line-height: 1.8; font-size: 16px;">I've received your message and will get back to you within 24–48 hours.</p>
            <p style="color: #0A1128; opacity: 0.7; line-height: 1.8;">Whether it's code, creativity, or collaboration — I'm looking forward to our conversation.</p>
            <div style="background: white; border-radius: 12px; padding: 20px; margin: 24px 0; text-align: center;">
              <p style="color: #0A1128; opacity: 0.5; font-size: 12px; margin: 0 0 4px;">In the meantime, explore</p>
              <a href="https://creativelynanda.co.za/products" style="color: #C1292E; font-weight: bold; text-decoration: none;">Mirembe Muse Notion Templates →</a>
            </div>
            <p style="color: #B8860B; font-style: italic; margin-top: 24px;">— Nanda</p>
            <p style="color: #0A1128; opacity: 0.4; font-size: 11px; margin-top: 24px;">CreativelyNanda.co.za · KuGompo City, South Africa</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
