import { resend, emailConfig } from './resend-client';
import WelcomeEmail from '@/emails/welcome';

interface SendWelcomeOptions {
  to: string;
  customerName?: string;
  locale?: 'en' | 'af' | 'zu';
}

export async function sendWelcomeEmail({
  to,
  customerName,
  locale = 'en',
}: SendWelcomeOptions) {
  try {
    const subjects = {
      en: 'Welcome to Creatively Nanda!',
      af: 'Welkom by Creatively Nanda!',
      zu: 'Siyakwamukela ku-Creatively Nanda!',
    };

    const { data, error } = await resend.emails.send({
      from: emailConfig.from,
      to,
      replyTo: emailConfig.replyTo,
      subject: subjects[locale],
      react: WelcomeEmail({
        customerName,
        locale,
      }),
    });

    if (error) {
      console.error('Failed to send welcome email:', error);
      throw error;
    }

    console.log('Welcome email sent:', data?.id);
    return { success: true, emailId: data?.id };
  } catch (error) {
    console.error('Error sending welcome email:', error);
    throw error;
  }
}
