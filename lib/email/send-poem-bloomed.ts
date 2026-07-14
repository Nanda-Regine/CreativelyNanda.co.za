import { resend, emailConfig } from './resend-client';

interface SendPoemBloomedOptions {
  to: string;
  authorName?: string | null;
  title: string;
  featured?: boolean;
  note?: string | null;
}

const SITE = 'https://creativelynanda.co.za';

/**
 * "Your poem bloomed 🌹" — sent when Nanda approves (or features) a guest
 * submission in the Circle. The heartbeat that brings writers back.
 */
export async function sendPoemBloomedEmail({
  to,
  authorName,
  title,
  featured = false,
  note,
}: SendPoemBloomedOptions) {
  const name = authorName?.trim() || 'friend';
  const noteHtml = note?.trim()
    ? `<div style="border-left:3px solid #C9A84C;padding:4px 0 4px 16px;margin:0 0 28px;">
         <p style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#C9A84C;margin:0 0 6px;">A note from Nanda</p>
         <p style="font-size:16px;font-style:italic;line-height:1.6;color:#F5EFD6;margin:0;">&ldquo;${note.trim()}&rdquo;</p>
       </div>`
    : '';
  const subject = featured
    ? `🌟 Nanda featured your poem, “${title}”`
    : `🌹 Your poem “${title}” has bloomed`;

  const html = `
  <div style="margin:0;padding:0;background:#0A0F2C;">
    <div style="max-width:560px;margin:0 auto;padding:40px 28px;font-family:Georgia,'Times New Roman',serif;color:#F5EFD6;">
      <p style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#C9A84C;margin:0 0 24px;">
        Inside Her Roses · The Circle
      </p>
      <h1 style="font-size:30px;line-height:1.2;font-weight:normal;font-style:italic;color:#F5EFD6;margin:0 0 20px;">
        ${featured ? 'Your poem has been featured.' : 'Your poem has bloomed.'}
      </h1>
      <p style="font-size:16px;line-height:1.7;color:rgba(245,239,214,0.82);margin:0 0 16px;">
        Dear ${name},
      </p>
      <p style="font-size:16px;line-height:1.7;color:rgba(245,239,214,0.82);margin:0 0 16px;">
        I read your poem <strong style="color:#F5EFD6;">&ldquo;${title}&rdquo;</strong> ${
          featured
            ? 'and it stayed with me — so I&rsquo;ve featured it in the Guest Garden for everyone to find.'
            : 'and I&rsquo;ve planted it in the Guest Garden. It&rsquo;s live now for the whole circle to read.'
        }
      </p>
      <p style="font-size:16px;line-height:1.7;color:rgba(245,239,214,0.82);margin:0 0 28px;">
        Thank you for trusting the garden with your words. Keep writing.
      </p>
      ${noteHtml}
      <a href="${SITE}/poetry/community"
         style="display:inline-block;background:#C21E56;color:#ffffff;text-decoration:none;padding:12px 26px;border-radius:999px;font-family:Arial,sans-serif;font-size:14px;">
        See it in the garden
      </a>
      <p style="font-size:15px;font-style:italic;color:#C9A84C;margin:34px 0 0;">
        — Nanda Regine
      </p>
      <p style="font-size:11px;color:rgba(245,239,214,0.4);margin:8px 0 0;">
        Inside Her Roses · creativelynanda.co.za
      </p>
    </div>
  </div>`;

  try {
    const { data, error } = await resend.emails.send({
      from: emailConfig.from,
      to,
      replyTo: emailConfig.replyTo,
      subject,
      html,
    });
    if (error) {
      console.error('Failed to send poem-bloomed email:', error);
      return { success: false };
    }
    return { success: true, emailId: data?.id };
  } catch (error) {
    console.error('Error sending poem-bloomed email:', error);
    return { success: false };
  }
}
