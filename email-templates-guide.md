# 📧 EMAIL TEMPLATES GUIDE
## For Claude Code - Purchase Confirmations & Digital Delivery

**Version:** 1.0  
**Date:** February 5, 2026  
**Email Service:** Resend + React Email

---

## 📋 TABLE OF CONTENTS

1. [Email System Setup](#email-system-setup)
2. [Email Templates Overview](#email-templates-overview)
3. [Purchase Confirmation Email](#purchase-confirmation-email)
4. [Digital Download Email](#digital-download-email)
5. [Welcome Email](#welcome-email)
6. [Newsletter Emails](#newsletter-emails)
7. [Transactional Emails](#transactional-emails)
8. [Email Sending Functions](#email-sending-functions)

---

## 1. EMAIL SYSTEM SETUP

### Install Dependencies

```bash
npm install resend react-email @react-email/components
```

### Environment Variables

```env
RESEND_API_KEY=re_123456789
RESEND_FROM_EMAIL=hello@creativelynanda.co.za
NEXT_PUBLIC_SITE_URL=https://creativelynanda.co.za
```

### Resend Client Setup

```typescript
// lib/email/resend-client.ts
import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY);

export const FROM_EMAIL = process.env.RESEND_FROM_EMAIL!;
export const SUPPORT_EMAIL = 'hello@creativelynanda.co.za';
export const NANDA_NAME = 'Nanda | CreativelyNanda';
```

---

## 2. EMAIL TEMPLATES OVERVIEW

### Email Types

| Template | Trigger | Purpose |
|----------|---------|---------|
| Purchase Confirmation | Order completed | Thank you + order summary |
| Digital Download | Digital product purchased | Download links |
| Notion Template Access | Notion template purchased | Duplicate link + instructions |
| Welcome Email | Newsletter signup | Introduction + links |
| Weekly Newsletter | Scheduled (Fridays) | Latest content + product |
| Poetry Delivery | Weekly for subscribers | Featured poem |
| Abandoned Cart | 1hr after cart created | Reminder + discount |
| Shipping Notification | Physical product shipped | Tracking info |

### Brand Guidelines for Emails

- **Font:** Inter for body, Cormorant Garamond for headings
- **Colors:** Navy (#0A1128), Beige (#E8DCC4), Cherry (#C1292E)
- **Tone:** Warm, professional, "big sister energy"
- **Signature:** Always from "Nanda" personally
- **Footer:** Social links + unsubscribe

---

## 3. PURCHASE CONFIRMATION EMAIL

### Email Component

```tsx
// emails/purchase-confirmation.tsx
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Hr,
  Row,
  Column,
} from '@react-email/components';
import * as React from 'react';

interface PurchaseConfirmationEmailProps {
  customerName: string;
  orderNumber: string;
  orderDate: string;
  items: Array<{
    name: string;
    price: number;
    quantity: number;
    image_url: string;
  }>;
  subtotal: number;
  discount: number;
  total: number;
  downloadLinks?: Array<{
    productName: string;
    url: string;
  }>;
}

export default function PurchaseConfirmationEmail({
  customerName = 'Friend',
  orderNumber = '12345',
  orderDate = 'February 5, 2026',
  items = [],
  subtotal = 0,
  discount = 0,
  total = 0,
  downloadLinks = [],
}: PurchaseConfirmationEmailProps) {
  const previewText = `Your order #${orderNumber} is confirmed! 🎉`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Img
              src="https://creativelynanda.co.za/assets/logo/logo-circle.png"
              width="60"
              height="60"
              alt="CreativelyNanda"
              style={logo}
            />
            <Heading style={h1}>Order Confirmed! 🎉</Heading>
          </Section>

          {/* Greeting */}
          <Section style={content}>
            <Text style={paragraph}>
              Hey {customerName}! 👋
            </Text>
            <Text style={paragraph}>
              Thank you so much for your purchase! Your order has been confirmed and is being processed. 
              I'm excited for you to start using your new {items.length > 1 ? 'products' : 'product'}!
            </Text>
          </Section>

          {/* Order Details */}
          <Section style={orderBox}>
            <Row>
              <Column>
                <Text style={orderLabel}>Order Number</Text>
                <Text style={orderValue}>#{orderNumber}</Text>
              </Column>
              <Column align="right">
                <Text style={orderLabel}>Order Date</Text>
                <Text style={orderValue}>{orderDate}</Text>
              </Column>
            </Row>
          </Section>

          {/* Order Items */}
          <Section style={itemsSection}>
            <Heading as="h2" style={h2}>
              Order Summary
            </Heading>
            {items.map((item, index) => (
              <Row key={index} style={itemRow}>
                <Column style={{ width: '80px' }}>
                  <Img
                    src={item.image_url}
                    width="70"
                    height="70"
                    alt={item.name}
                    style={itemImage}
                  />
                </Column>
                <Column style={{ paddingLeft: '16px' }}>
                  <Text style={itemName}>{item.name}</Text>
                  <Text style={itemDetails}>
                    Qty: {item.quantity} × R{item.price.toFixed(2)}
                  </Text>
                </Column>
                <Column align="right">
                  <Text style={itemPrice}>
                    R{(item.price * item.quantity).toFixed(2)}
                  </Text>
                </Column>
              </Row>
            ))}

            <Hr style={divider} />

            {/* Totals */}
            <Row style={totalRow}>
              <Column>
                <Text style={totalLabel}>Subtotal</Text>
              </Column>
              <Column align="right">
                <Text style={totalValue}>R{subtotal.toFixed(2)}</Text>
              </Column>
            </Row>

            {discount > 0 && (
              <Row style={totalRow}>
                <Column>
                  <Text style={discountLabel}>Discount</Text>
                </Column>
                <Column align="right">
                  <Text style={discountValue}>-R{discount.toFixed(2)}</Text>
                </Column>
              </Row>
            )}

            <Row style={totalRow}>
              <Column>
                <Text style={finalTotalLabel}>Total Paid</Text>
              </Column>
              <Column align="right">
                <Text style={finalTotalValue}>R{total.toFixed(2)}</Text>
              </Column>
            </Row>
          </Section>

          {/* Download Links (if digital products) */}
          {downloadLinks.length > 0 && (
            <Section style={downloadSection}>
              <Heading as="h2" style={h2}>
                Access Your Products 📥
              </Heading>
              <Text style={paragraph}>
                Your products are ready! Click the buttons below to access your downloads:
              </Text>
              {downloadLinks.map((link, index) => (
                <Button key={index} href={link.url} style={downloadButton}>
                  Download {link.productName}
                </Button>
              ))}
              <Text style={smallText}>
                💡 Download links are valid for 30 days and can be accessed up to 10 times.
              </Text>
            </Section>
          )}

          {/* Next Steps */}
          <Section style={nextStepsSection}>
            <Heading as="h2" style={h2}>
              What's Next?
            </Heading>
            <Text style={paragraph}>
              • Check your downloads above (for digital products)<br />
              • Keep this email for your records<br />
              • Need help? Reply to this email anytime!<br />
              • Join our newsletter for tips and updates
            </Text>
          </Section>

          {/* Personal Note */}
          <Section style={noteSection}>
            <Text style={paragraph}>
              🌟 <strong>A personal note:</strong> Thank you for supporting my work! 
              Every purchase helps me continue creating helpful resources and sharing 
              knowledge with the community. If you have any questions or feedback, 
              I'd love to hear from you.
            </Text>
            <Text style={signature}>
              Ubuntu,<br />
              <strong>Nanda</strong> 🌹<br />
              <span style={signatureRole}>Creative Technologist</span>
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Hr style={divider} />
            <Row>
              <Column align="center">
                <Text style={footerText}>
                  <a href="https://creativelynanda.co.za" style={footerLink}>
                    Visit Website
                  </a>
                  {' • '}
                  <a href="https://creativelynanda.co.za/marketplace" style={footerLink}>
                    Shop More
                  </a>
                  {' • '}
                  <a href="https://creativelynanda.co.za/contact" style={footerLink}>
                    Contact
                  </a>
                </Text>
                <Text style={footerText}>
                  CreativelyNanda • East London, South Africa<br />
                  Built with Ubuntu: I am because we are 🇿🇦
                </Text>
              </Column>
            </Row>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main = {
  backgroundColor: '#f5f5f5',
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0',
  maxWidth: '600px',
};

const header = {
  padding: '40px 40px 20px',
  textAlign: 'center' as const,
};

const logo = {
  margin: '0 auto',
  marginBottom: '20px',
};

const h1 = {
  color: '#0A1128',
  fontSize: '32px',
  fontWeight: '700',
  margin: '0',
  fontFamily: 'Cormorant Garamond, Georgia, serif',
};

const h2 = {
  color: '#0A1128',
  fontSize: '24px',
  fontWeight: '600',
  margin: '0 0 16px',
  fontFamily: 'Cormorant Garamond, Georgia, serif',
};

const content = {
  padding: '0 40px',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '24px',
  color: '#374151',
  margin: '16px 0',
};

const orderBox = {
  backgroundColor: '#F5F0E8',
  borderRadius: '8px',
  padding: '20px',
  margin: '24px 40px',
};

const orderLabel = {
  fontSize: '12px',
  color: '#6B7280',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.5px',
  margin: '0 0 4px',
};

const orderValue = {
  fontSize: '18px',
  fontWeight: '600',
  color: '#0A1128',
  margin: '0',
};

const itemsSection = {
  padding: '24px 40px',
};

const itemRow = {
  marginBottom: '16px',
  paddingBottom: '16px',
};

const itemImage = {
  borderRadius: '8px',
  objectFit: 'cover' as const,
};

const itemName = {
  fontSize: '16px',
  fontWeight: '600',
  color: '#0A1128',
  margin: '0 0 4px',
};

const itemDetails = {
  fontSize: '14px',
  color: '#6B7280',
  margin: '0',
};

const itemPrice = {
  fontSize: '16px',
  fontWeight: '600',
  color: '#0A1128',
  margin: '0',
};

const divider = {
  borderColor: '#E5E7EB',
  margin: '20px 0',
};

const totalRow = {
  marginBottom: '8px',
};

const totalLabel = {
  fontSize: '14px',
  color: '#6B7280',
  margin: '0',
};

const totalValue = {
  fontSize: '14px',
  color: '#374151',
  margin: '0',
};

const discountLabel = {
  fontSize: '14px',
  color: '#059669',
  margin: '0',
};

const discountValue = {
  fontSize: '14px',
  color: '#059669',
  margin: '0',
};

const finalTotalLabel = {
  fontSize: '18px',
  fontWeight: '700',
  color: '#0A1128',
  margin: '8px 0 0',
};

const finalTotalValue = {
  fontSize: '18px',
  fontWeight: '700',
  color: '#C1292E',
  margin: '8px 0 0',
};

const downloadSection = {
  backgroundColor: '#F0F9FF',
  padding: '24px 40px',
  margin: '24px 0',
};

const downloadButton = {
  backgroundColor: '#C1292E',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '14px 24px',
  borderRadius: '8px',
  margin: '12px 0',
};

const smallText = {
  fontSize: '13px',
  color: '#6B7280',
  margin: '16px 0 0',
};

const nextStepsSection = {
  padding: '24px 40px',
};

const noteSection = {
  backgroundColor: '#FEF3F2',
  padding: '24px 40px',
  margin: '24px 0',
  borderLeft: '4px solid #C1292E',
};

const signature = {
  fontSize: '16px',
  color: '#0A1128',
  margin: '20px 0 0',
  lineHeight: '24px',
};

const signatureRole = {
  fontSize: '14px',
  color: '#6B7280',
};

const footer = {
  padding: '24px 40px',
};

const footerText = {
  fontSize: '12px',
  color: '#6B7280',
  textAlign: 'center' as const,
  margin: '8px 0',
};

const footerLink = {
  color: '#C1292E',
  textDecoration: 'none',
};
```

---

## 4. DIGITAL DOWNLOAD EMAIL

### Email Component

```tsx
// emails/digital-download.tsx
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Hr,
} from '@react-email/components';
import * as React from 'react';

interface DigitalDownloadEmailProps {
  customerName: string;
  productName: string;
  downloadUrl: string;
  orderNumber: string;
  expiryDays?: number;
  instructions?: string;
}

export default function DigitalDownloadEmail({
  customerName = 'Friend',
  productName = 'Your Product',
  downloadUrl = '#',
  orderNumber = '12345',
  expiryDays = 30,
  instructions,
}: DigitalDownloadEmailProps) {
  const previewText = `Your ${productName} is ready to download! 🎉`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Img
              src="https://creativelynanda.co.za/assets/logo/logo-circle.png"
              width="60"
              height="60"
              alt="CreativelyNanda"
              style={logo}
            />
            <Heading style={h1}>Your Download is Ready! 📥</Heading>
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Text style={paragraph}>
              Hey {customerName}! 👋
            </Text>
            <Text style={paragraph}>
              Great news! Your <strong>{productName}</strong> is ready to download. 
              Click the button below to access your file:
            </Text>

            {/* Download Button */}
            <Section style={buttonContainer}>
              <Button href={downloadUrl} style={button}>
                Download {productName}
              </Button>
            </Section>

            {/* Order Info */}
            <Section style={infoBox}>
              <Text style={infoLabel}>Order Number</Text>
              <Text style={infoValue}>#{orderNumber}</Text>
              <Text style={infoLabel}>Download Expiry</Text>
              <Text style={infoValue}>{expiryDays} days from now</Text>
              <Text style={infoLabel}>Download Limit</Text>
              <Text style={infoValue}>10 downloads</Text>
            </Section>

            {/* Instructions (if provided) */}
            {instructions && (
              <Section style={instructionsBox}>
                <Heading as="h2" style={h2}>
                  Getting Started 🚀
                </Heading>
                <Text style={paragraph}>{instructions}</Text>
              </Section>
            )}

            {/* Tips */}
            <Section style={tipsBox}>
              <Heading as="h2" style={h2}>
                Quick Tips 💡
              </Heading>
              <Text style={paragraph}>
                • Save the file to a safe location on your device<br />
                • Keep this email for future reference<br />
                • Need help? Reply to this email anytime!<br />
                • Share your experience on social media (tag me!)
              </Text>
            </Section>
          </Section>

          {/* Support Section */}
          <Section style={supportSection}>
            <Text style={paragraph}>
              <strong>Need help?</strong> I'm here for you! Reply to this email with any 
              questions, and I'll get back to you within 24 hours.
            </Text>
            <Text style={signature}>
              Cheers,<br />
              <strong>Nanda</strong> 🌹
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Hr style={divider} />
            <Text style={footerText}>
              <a href="https://creativelynanda.co.za" style={footerLink}>
                CreativelyNanda
              </a>
              {' • '}
              East London, South Africa 🇿🇦
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styles (reuse most from purchase confirmation, add these)
const buttonContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const button = {
  backgroundColor: '#C1292E',
  color: '#ffffff',
  fontSize: '18px',
  fontWeight: '700',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '16px 40px',
  borderRadius: '8px',
};

const infoBox = {
  backgroundColor: '#F5F0E8',
  padding: '20px',
  borderRadius: '8px',
  margin: '24px 0',
};

const infoLabel = {
  fontSize: '12px',
  color: '#6B7280',
  textTransform: 'uppercase' as const,
  margin: '12px 0 4px',
  fontWeight: '600',
};

const infoValue = {
  fontSize: '16px',
  color: '#0A1128',
  margin: '0 0 12px',
};

const instructionsBox = {
  backgroundColor: '#F0F9FF',
  padding: '24px',
  borderRadius: '8px',
  margin: '24px 0',
  borderLeft: '4px solid #3B82F6',
};

const tipsBox = {
  backgroundColor: '#FFFBEB',
  padding: '24px',
  borderRadius: '8px',
  margin: '24px 0',
  borderLeft: '4px solid #F59E0B',
};

const supportSection = {
  padding: '24px 40px',
  backgroundColor: '#FEF3F2',
  margin: '24px 0',
};

// ... (reuse other styles from purchase confirmation)
```

---

## 5. WELCOME EMAIL

### Email Component

```tsx
// emails/welcome.tsx
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Hr,
  Row,
  Column,
} from '@react-email/components';
import * as React from 'react';

interface WelcomeEmailProps {
  subscriberName?: string;
  subscriptionType: 'general' | 'dev' | 'poetry' | 'business' | 'student';
}

export default function WelcomeEmail({
  subscriberName,
  subscriptionType = 'general',
}: WelcomeEmailProps) {
  const content = getContentByType(subscriptionType);
  const previewText = `Welcome to ${content.title}! 🌟`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Img
              src="https://creativelynanda.co.za/assets/logo/logo-circle.png"
              width="60"
              height="60"
              alt="CreativelyNanda"
              style={logo}
            />
            <Heading style={h1}>{content.emoji} Welcome to the fam!</Heading>
          </Section>

          {/* Greeting */}
          <Section style={content}>
            <Text style={paragraph}>
              Hey {subscriberName || 'friend'}! 👋
            </Text>
            <Text style={paragraph}>
              I'm so excited you're here! You just subscribed to <strong>{content.title}</strong>, 
              and I can't wait to share {content.whatYoullGet} with you.
            </Text>
          </Section>

          {/* What to Expect */}
          <Section style={expectSection}>
            <Heading as="h2" style={h2}>
              What to Expect 📬
            </Heading>
            {content.expectations.map((item, index) => (
              <Row key={index} style={expectRow}>
                <Column style={{ width: '30px' }}>
                  <Text style={expectEmoji}>{item.emoji}</Text>
                </Column>
                <Column>
                  <Text style={expectText}>{item.text}</Text>
                </Column>
              </Row>
            ))}
          </Section>

          {/* Quick Links */}
          <Section style={linksSection}>
            <Heading as="h2" style={h2}>
              Explore More 🗺️
            </Heading>
            <Row>
              {content.quickLinks.map((link, index) => (
                <Column key={index} style={linkColumn}>
                  <Button href={link.url} style={linkButton}>
                    {link.label}
                  </Button>
                </Column>
              ))}
            </Row>
          </Section>

          {/* Personal Note */}
          <Section style={noteSection}>
            <Text style={paragraph}>
              🌟 <strong>A quick note:</strong> This newsletter is my way of sharing what 
              I'm learning, building, and creating. No fluff, no spam—just genuine insights 
              and resources I think you'll find valuable. You can always reply to any email, 
              and I'll personally get back to you!
            </Text>
            <Text style={signature}>
              Ubuntu,<br />
              <strong>Nanda</strong> 🌹<br />
              <span style={signatureRole}>
                Creative Technologist & Published Poet
              </span>
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Hr style={divider} />
            <Text style={footerText}>
              CreativelyNanda • East London, South Africa 🇿🇦<br />
              <a href="{{unsubscribe_url}}" style={unsubscribeLink}>
                Unsubscribe
              </a>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Content variations by subscription type
function getContentByType(type: string) {
  const contentMap = {
    general: {
      title: 'The Nanda Newsletter',
      emoji: '🌟',
      whatYoullGet: 'everything from tech tips to poetry, business insights to creative inspiration',
      expectations: [
        { emoji: '📮', text: 'Weekly updates every Friday at 9am' },
        { emoji: '💡', text: 'Exclusive tips and resources' },
        { emoji: '🎁', text: 'Early access to new products and courses' },
        { emoji: '🌹', text: 'The occasional poem to brighten your day' },
      ],
      quickLinks: [
        { label: 'Browse Products', url: 'https://creativelynanda.co.za/marketplace' },
        { label: 'Read Blog', url: 'https://creativelynanda.co.za/blog' },
        { label: 'Poetry Sanctuary', url: 'https://creativelynanda.co.za/poetry' },
      ],
    },
    dev: {
      title: 'Code Deep with Nanda',
      emoji: '💻',
      whatYoullGet: 'in-depth tutorials, code snippets, and real-world development insights',
      expectations: [
        { emoji: '🚀', text: 'Weekly dev tutorials and code examples' },
        { emoji: '🔧', text: 'Open-source project updates' },
        { emoji: '💡', text: 'Production-ready code snippets' },
        { emoji: '🎯', text: 'Career advice for African devs' },
      ],
      quickLinks: [
        { label: 'Dev Blog', url: 'https://creativelynanda.co.za/blog/dev' },
        { label: 'Code Snippets', url: 'https://creativelynanda.co.za/marketplace/code-snippets' },
        { label: 'Projects', url: 'https://creativelynanda.co.za/projects' },
      ],
    },
    // ... add other types
  };

  return contentMap[type as keyof typeof contentMap] || contentMap.general;
}

// ... (styles similar to previous emails)
```

---

## 6. EMAIL SENDING FUNCTIONS

### Purchase Confirmation Function

```typescript
// lib/emails/purchase-confirmation.ts
import { resend, FROM_EMAIL, NANDA_NAME } from '../email/resend-client';
import PurchaseConfirmationEmail from '@/emails/purchase-confirmation';

interface SendPurchaseConfirmationParams {
  to: string;
  customerName: string;
  orderNumber: string;
  orderDate: string;
  items: any[];
  subtotal: number;
  discount: number;
  total: number;
  downloadLinks?: any[];
}

export async function sendPurchaseConfirmation(params: SendPurchaseConfirmationParams) {
  try {
    const { data, error } = await resend.emails.send({
      from: `${NANDA_NAME} <${FROM_EMAIL}>`,
      to: params.to,
      subject: `Order Confirmed! #${params.orderNumber} 🎉`,
      react: PurchaseConfirmationEmail(params),
    });

    if (error) {
      console.error('[Email] Purchase confirmation failed:', error);
      throw error;
    }

    console.log('[Email] Purchase confirmation sent:', data?.id);
    return data;
  } catch (error) {
    console.error('[Email] Send error:', error);
    throw error;
  }
}
```

### Digital Download Function

```typescript
// lib/emails/digital-download.ts
import { resend, FROM_EMAIL, NANDA_NAME } from '../email/resend-client';
import DigitalDownloadEmail from '@/emails/digital-download';

interface SendDigitalDownloadParams {
  to: string;
  customerName: string;
  productName: string;
  downloadUrl: string;
  orderNumber: string;
  expiryDays?: number;
  instructions?: string;
}

export async function sendDigitalDownload(params: SendDigitalDownloadParams) {
  try {
    const { data, error } = await resend.emails.send({
      from: `${NANDA_NAME} <${FROM_EMAIL}>`,
      to: params.to,
      subject: `Your ${params.productName} is ready! 📥`,
      react: DigitalDownloadEmail(params),
    });

    if (error) {
      console.error('[Email] Digital download failed:', error);
      throw error;
    }

    console.log('[Email] Digital download sent:', data?.id);
    return data;
  } catch (error) {
    console.error('[Email] Send error:', error);
    throw error;
  }
}
```

### Welcome Email Function

```typescript
// lib/emails/welcome-email.ts
import { resend, FROM_EMAIL, NANDA_NAME } from '../email/resend-client';
import WelcomeEmail from '@/emails/welcome';

export async function sendWelcomeEmail(
  email: string,
  name?: string,
  subscriptionType: string = 'general'
) {
  try {
    const { data, error } = await resend.emails.send({
      from: `${NANDA_NAME} <${FROM_EMAIL}>`,
      to: email,
      subject: `Welcome to the fam! 🌟`,
      react: WelcomeEmail({
        subscriberName: name,
        subscriptionType: subscriptionType as any,
      }),
    });

    if (error) {
      console.error('[Email] Welcome email failed:', error);
      throw error;
    }

    console.log('[Email] Welcome email sent:', data?.id);
    return data;
  } catch (error) {
    console.error('[Email] Send error:', error);
    throw error;
  }
}
```

---

## 7. EMAIL TESTING

### Test Email Route

```typescript
// app/api/test/email/route.ts
import { NextResponse } from 'next/server';
import { sendPurchaseConfirmation } from '@/lib/emails/purchase-confirmation';
import { sendDigitalDownload } from '@/lib/emails/digital-download';
import { sendWelcomeEmail } from '@/lib/emails/welcome-email';

export async function GET() {
  try {
    // Test purchase confirmation
    await sendPurchaseConfirmation({
      to: 'test@example.com',
      customerName: 'Test User',
      orderNumber: 'TEST123',
      orderDate: new Date().toLocaleDateString(),
      items: [
        {
          name: 'NSFAS Tracker Template',
          price: 149,
          quantity: 1,
          image_url: 'https://creativelynanda.co.za/assets/products/nsfas-tracker.png',
        },
      ],
      subtotal: 149,
      discount: 0,
      total: 149,
      downloadLinks: [
        {
          productName: 'NSFAS Tracker',
          url: 'https://creativelynanda.co.za/downloads/test-token',
        },
      ],
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send test email' }, { status: 500 });
  }
}
```

### Preview Emails Locally

```bash
# Install React Email CLI
npm install -g react-email

# Start preview server
email dev

# Open http://localhost:3000
```

---

## 📝 CRITICAL NOTES FOR CLAUDE CODE

1. **Always use React Email** - Native HTML/CSS is harder to maintain
2. **Test emails before deploying** - Use preview server and test sends
3. **Brand consistency** - Use exact colors, fonts from design system
4. **Mobile-first** - Emails must look great on mobile
5. **Clear CTAs** - Download buttons should be prominent
6. **Personal touch** - Always sign as "Nanda" with warm tone
7. **Unsubscribe links** - Required by law and good practice
8. **Error handling** - Log email failures, don't block order completion
9. **Track opens/clicks** - Resend provides analytics
10. **A/B testing** - Test subject lines and content over time

---

**End of Email Templates Guide**