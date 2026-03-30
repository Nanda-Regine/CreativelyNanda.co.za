import { resend, emailConfig } from './resend-client';
import PurchaseConfirmationEmail from '@/emails/purchase-confirmation';

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

interface SendPurchaseConfirmationOptions {
  to: string;
  customerName?: string;
  orderNumber: string;
  orderDate: string;
  items: OrderItem[];
  total: number;
  downloadLinks?: { name: string; url: string }[];
  guideLinks?: { name: string; url: string }[];
  locale?: 'en' | 'af' | 'zu';
}

export async function sendPurchaseConfirmation({
  to,
  customerName,
  orderNumber,
  orderDate,
  items,
  total,
  downloadLinks = [],
  guideLinks = [],
  locale = 'en',
}: SendPurchaseConfirmationOptions) {
  try {
    const { data, error } = await resend.emails.send({
      from: emailConfig.from,
      to,
      reply_to: emailConfig.reply_to,
      subject: locale === 'af'
        ? `Jou bestelling #${orderNumber} is bevestig!`
        : locale === 'zu'
        ? `I-oda yakho #${orderNumber} iqinisekisiwe!`
        : `Your order #${orderNumber} is confirmed!`,
      react: PurchaseConfirmationEmail({
        customerName,
        orderNumber,
        orderDate,
        items,
        total,
        downloadLinks,
        guideLinks,
        locale,
      }),
    });

    if (error) {
      console.error('Failed to send purchase confirmation:', error);
      throw error;
    }

    console.log('Purchase confirmation sent:', data?.id);
    return { success: true, emailId: data?.id };
  } catch (error) {
    console.error('Error sending purchase confirmation:', error);
    throw error;
  }
}
