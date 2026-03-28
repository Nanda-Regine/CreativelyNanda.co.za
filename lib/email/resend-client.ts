import { Resend } from 'resend';

// Initialize Resend with API key from environment
export const resend = new Resend(process.env.RESEND_API_KEY);

// Default sender - update to your verified domain
export const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'hello@creativelynanda.co.za';
export const FROM_NAME = 'Creatively Nanda';

// Email configuration
export const emailConfig = {
  from: `${FROM_NAME} <${FROM_EMAIL}>`,
  replyTo: 'hello@creativelynanda.co.za',
};
