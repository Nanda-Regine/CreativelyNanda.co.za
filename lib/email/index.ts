// Email client and configuration
export { resend, emailConfig, FROM_EMAIL, FROM_NAME } from './resend-client';

// Send functions
export { sendPurchaseConfirmation } from './send-purchase-confirmation';
export { sendWelcomeEmail } from './send-welcome';

// Type definitions
export type SupportedLocale = 'en' | 'af' | 'zu';

export interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

export interface DownloadLink {
  name: string;
  url: string;
}
