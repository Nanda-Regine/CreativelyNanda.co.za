import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Row,
  Column,
} from '@react-email/components';
import * as React from 'react';

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

interface PurchaseConfirmationEmailProps {
  customerName?: string;
  orderNumber: string;
  orderDate: string;
  items: OrderItem[];
  total: number;
  downloadLinks?: { name: string; url: string }[];
  guideLinks?: { name: string; url: string }[];
  locale?: 'en' | 'af' | 'zu';
}

// Multi-language content
const translations = {
  en: {
    preview: 'Your order is confirmed!',
    greeting: 'Hi',
    thankYou: 'Thank you for your purchase!',
    orderConfirmed: 'Your order has been confirmed and your digital products are ready.',
    orderNumber: 'Order',
    orderDate: 'Date',
    orderSummary: 'Order Summary',
    item: 'Item',
    qty: 'Qty',
    price: 'Price',
    total: 'Total',
    downloadTitle: 'Your Downloads',
    downloadDescription: 'Click the links below to download your products. These links expire in 7 days.',
    downloadButton: 'Download Now',
    guideTitle: '📖 Quick Start Guide',
    guideDescription: "Get up and running fast with your product's quick start guide.",
    guideButton: 'Open Quick Start Guide',
    needHelp: 'Need Help?',
    helpText: "If you have any questions about your purchase, we're here to help.",
    contactUs: 'Contact Support',
    footer: 'Thank you for supporting Creatively Nanda!',
    copyright: '© 2026 Creatively Nanda. All rights reserved.',
  },
  af: {
    preview: 'Jou bestelling is bevestig!',
    greeting: 'Hallo',
    thankYou: 'Dankie vir jou aankoop!',
    orderConfirmed: 'Jou bestelling is bevestig en jou digitale produkte is gereed.',
    orderNumber: 'Bestelling',
    orderDate: 'Datum',
    orderSummary: 'Bestelling Opsomming',
    item: 'Item',
    qty: 'Hoeveelheid',
    price: 'Prys',
    total: 'Totaal',
    downloadTitle: 'Jou Aflaaie',
    downloadDescription: 'Klik op die skakels hieronder om jou produkte af te laai. Hierdie skakels verval oor 7 dae.',
    downloadButton: 'Laai Nou Af',
    guideTitle: '📖 Vinnige Aanvangs Gids',
    guideDescription: 'Begin vinnig met jou produk se vinnige aanvangs gids.',
    guideButton: 'Open Vinnige Aanvangs Gids',
    needHelp: 'Hulp Nodig?',
    helpText: 'As jy enige vrae het oor jou aankoop, is ons hier om te help.',
    contactUs: 'Kontak Ondersteuning',
    footer: 'Dankie dat jy Creatively Nanda ondersteun!',
    copyright: '© 2026 Creatively Nanda. Alle regte voorbehou.',
  },
  zu: {
    preview: 'I-oda yakho iqinisekisiwe!',
    greeting: 'Sawubona',
    thankYou: 'Siyabonga ngokuthenga kwakho!',
    orderConfirmed: 'I-oda yakho iqinisekisiwe futhi imikhiqizo yakho yedijithali ilungile.',
    orderNumber: 'I-oda',
    orderDate: 'Usuku',
    orderSummary: 'Isifinyezo Se-oda',
    item: 'Into',
    qty: 'Inani',
    price: 'Intengo',
    total: 'Isamba',
    downloadTitle: 'Ukudawuniloda Kwakho',
    downloadDescription: 'Chofoza izixhumanisi ezingezansi ukudawuniloda imikhiqizo yakho. Lezi zixhumanisi ziphelelwa isikhathi ezinsukwini eziyi-7.',
    downloadButton: 'Dawuniloda Manje',
    guideTitle: '📖 Isiqondiso Sokuqala Ngokushesha',
    guideDescription: 'Qala ngokushesha ngesiqondiso sokuqala ngokushesha somkhiqizo wakho.',
    guideButton: 'Vula Isiqondiso',
    needHelp: 'Udinga Usizo?',
    helpText: 'Uma unemibuzo ngokuthenga kwakho, silapha ukusiza.',
    contactUs: 'Xhumana Nosizo',
    footer: 'Siyabonga ngokusekela i-Creatively Nanda!',
    copyright: '© 2026 Creatively Nanda. Amalungelo onke agodliwe.',
  },
};

const formatPrice = (amount: number) => {
  return `R ${amount.toFixed(2)}`;
};

export const PurchaseConfirmationEmail = ({
  customerName = 'there',
  orderNumber,
  orderDate,
  items,
  total,
  downloadLinks = [],
  guideLinks = [],
  locale = 'en',
}: PurchaseConfirmationEmailProps) => {
  const t = translations[locale];

  return (
    <Html>
      <Head />
      <Preview>{t.preview}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Text style={logo}>Creatively Nanda</Text>
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Heading style={heading}>
              {t.greeting} {customerName}!
            </Heading>

            <Text style={paragraph}>{t.thankYou}</Text>
            <Text style={paragraph}>{t.orderConfirmed}</Text>

            {/* Order Info */}
            <Section style={orderInfoBox}>
              <Row>
                <Column>
                  <Text style={orderInfoLabel}>{t.orderNumber}</Text>
                  <Text style={orderInfoValue}>#{orderNumber}</Text>
                </Column>
                <Column>
                  <Text style={orderInfoLabel}>{t.orderDate}</Text>
                  <Text style={orderInfoValue}>{orderDate}</Text>
                </Column>
              </Row>
            </Section>

            {/* Order Summary */}
            <Heading as="h2" style={subheading}>{t.orderSummary}</Heading>

            <Section style={table}>
              {/* Table Header */}
              <Row style={tableHeader}>
                <Column style={tableHeaderCell}>{t.item}</Column>
                <Column style={{ ...tableHeaderCell, textAlign: 'center' as const }}>{t.qty}</Column>
                <Column style={{ ...tableHeaderCell, textAlign: 'right' as const }}>{t.price}</Column>
              </Row>

              {/* Table Body */}
              {items.map((item, index) => (
                <Row key={index} style={tableRow}>
                  <Column style={tableCell}>{item.name}</Column>
                  <Column style={{ ...tableCell, textAlign: 'center' as const }}>{item.quantity}</Column>
                  <Column style={{ ...tableCell, textAlign: 'right' as const }}>
                    {formatPrice(item.price * item.quantity)}
                  </Column>
                </Row>
              ))}

              {/* Total */}
              <Row style={totalRow}>
                <Column style={totalLabel}>{t.total}</Column>
                <Column style={totalValue}>{formatPrice(total)}</Column>
              </Row>
            </Section>

            <Hr style={divider} />

            {/* Download Section */}
            {downloadLinks.length > 0 && (
              <Section style={downloadSection}>
                <Heading as="h2" style={subheading}>{t.downloadTitle}</Heading>
                <Text style={paragraph}>{t.downloadDescription}</Text>

                {downloadLinks.map((link, index) => (
                  <Button key={index} style={downloadButton} href={link.url}>
                    {link.name} — {t.downloadButton}
                  </Button>
                ))}
              </Section>
            )}

            {/* Quick Start Guide Section */}
            {guideLinks.length > 0 && (
              <Section style={guideSection}>
                <Heading as="h2" style={guideSectionHeading}>{t.guideTitle}</Heading>
                <Text style={guideSectionText}>{t.guideDescription}</Text>
                {guideLinks.map((link, index) => (
                  <Button key={index} style={guideButton} href={link.url}>
                    {link.name} — {t.guideButton}
                  </Button>
                ))}
              </Section>
            )}

            <Hr style={divider} />

            {/* Help Section */}
            <Section style={helpSection}>
              <Heading as="h3" style={helpHeading}>{t.needHelp}</Heading>
              <Text style={helpText}>{t.helpText}</Text>
              <Link href="mailto:hello@creativelynanda.co.za" style={contactLink}>
                {t.contactUs}
              </Link>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>{t.footer}</Text>
            <Text style={copyright}>{t.copyright}</Text>
            <Row style={socialLinks}>
              <Column>
                <Link href="https://twitter.com/creativelynanda" style={socialLink}>Twitter</Link>
              </Column>
              <Column>
                <Link href="https://instagram.com/creativelynanda" style={socialLink}>Instagram</Link>
              </Column>
              <Column>
                <Link href="https://linkedin.com/in/creativelynanda" style={socialLink}>LinkedIn</Link>
              </Column>
            </Row>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default PurchaseConfirmationEmail;

// Styles
const main = {
  backgroundColor: '#f5f0e8',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '600px',
};

const header = {
  backgroundColor: '#0A1128',
  padding: '32px 40px',
  borderRadius: '12px 12px 0 0',
};

const logo = {
  color: '#f5f0e8',
  fontSize: '28px',
  fontWeight: '700',
  margin: '0',
  textAlign: 'center' as const,
};

const content = {
  backgroundColor: '#ffffff',
  padding: '40px',
};

const heading = {
  color: '#0A1128',
  fontSize: '28px',
  fontWeight: '700',
  margin: '0 0 16px',
};

const subheading = {
  color: '#0A1128',
  fontSize: '20px',
  fontWeight: '600',
  margin: '24px 0 16px',
};

const paragraph = {
  color: '#4a4a4a',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '0 0 16px',
};

const orderInfoBox = {
  backgroundColor: '#f5f0e8',
  borderRadius: '8px',
  padding: '20px',
  margin: '24px 0',
};

const orderInfoLabel = {
  color: '#666',
  fontSize: '12px',
  textTransform: 'uppercase' as const,
  margin: '0 0 4px',
};

const orderInfoValue = {
  color: '#0A1128',
  fontSize: '18px',
  fontWeight: '600',
  margin: '0',
};

const table = {
  width: '100%',
  margin: '16px 0',
};

const tableHeader = {
  borderBottom: '2px solid #e5e5e5',
  padding: '12px 0',
};

const tableHeaderCell = {
  color: '#666',
  fontSize: '12px',
  fontWeight: '600',
  textTransform: 'uppercase' as const,
  padding: '12px 8px',
};

const tableRow = {
  borderBottom: '1px solid #e5e5e5',
};

const tableCell = {
  color: '#0A1128',
  fontSize: '14px',
  padding: '12px 8px',
};

const totalRow = {
  borderTop: '2px solid #0A1128',
  marginTop: '16px',
};

const totalLabel = {
  color: '#0A1128',
  fontSize: '16px',
  fontWeight: '700',
  padding: '16px 8px',
};

const totalValue = {
  color: '#C41E3A',
  fontSize: '20px',
  fontWeight: '700',
  padding: '16px 8px',
  textAlign: 'right' as const,
};

const divider = {
  borderColor: '#e5e5e5',
  margin: '32px 0',
};

const downloadSection = {
  margin: '24px 0',
};

const downloadButton = {
  backgroundColor: '#C41E3A',
  borderRadius: '8px',
  color: '#ffffff',
  display: 'block',
  fontSize: '14px',
  fontWeight: '600',
  padding: '14px 24px',
  textAlign: 'center' as const,
  textDecoration: 'none',
  margin: '12px 0',
};

const guideSection = {
  backgroundColor: '#fff8e7',
  border: '2px solid #f59e0b',
  borderRadius: '10px',
  padding: '24px',
  margin: '24px 0',
};

const guideSectionHeading = {
  color: '#92400e',
  fontSize: '18px',
  fontWeight: '700',
  margin: '0 0 8px',
};

const guideSectionText = {
  color: '#78350f',
  fontSize: '14px',
  margin: '0 0 16px',
};

const guideButton = {
  backgroundColor: '#f59e0b',
  borderRadius: '8px',
  color: '#1c1917',
  display: 'block',
  fontSize: '14px',
  fontWeight: '700',
  padding: '14px 24px',
  textAlign: 'center' as const,
  textDecoration: 'none',
  margin: '8px 0',
};

const helpSection = {
  backgroundColor: '#f5f0e8',
  borderRadius: '8px',
  padding: '24px',
  textAlign: 'center' as const,
};

const helpHeading = {
  color: '#0A1128',
  fontSize: '16px',
  fontWeight: '600',
  margin: '0 0 8px',
};

const helpText = {
  color: '#666',
  fontSize: '14px',
  margin: '0 0 12px',
};

const contactLink = {
  color: '#C41E3A',
  fontSize: '14px',
  fontWeight: '600',
  textDecoration: 'none',
};

const footer = {
  backgroundColor: '#0A1128',
  padding: '32px 40px',
  borderRadius: '0 0 12px 12px',
  textAlign: 'center' as const,
};

const footerText = {
  color: '#f5f0e8',
  fontSize: '16px',
  margin: '0 0 8px',
};

const copyright = {
  color: '#999',
  fontSize: '12px',
  margin: '0 0 16px',
};

const socialLinks = {
  marginTop: '16px',
};

const socialLink = {
  color: '#C41E3A',
  fontSize: '12px',
  textDecoration: 'none',
  margin: '0 8px',
};
