import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Row,
  Column,
} from '@react-email/components';
import * as React from 'react';

interface WelcomeEmailProps {
  customerName?: string;
  locale?: 'en' | 'af' | 'zu';
}

const translations = {
  en: {
    preview: 'Welcome to Creatively Nanda!',
    greeting: 'Welcome',
    intro: "Thank you for joining the Creatively Nanda community! I'm so excited to have you here.",
    aboutMe: "I'm Nanda, a software developer, poet, and creative entrepreneur based in South Africa. I create digital products, templates, and resources to help students, freelancers, and small businesses thrive.",
    whatYouGet: "What You'll Get",
    benefit1Title: 'Premium Templates',
    benefit1Text: 'Notion templates, CV builders, and productivity tools designed for success.',
    benefit2Title: 'Creative Content',
    benefit2Text: 'Poetry, writing, and artistic inspiration to fuel your creativity.',
    benefit3Title: 'Exclusive Updates',
    benefit3Text: 'Be the first to know about new products, discounts, and special offers.',
    exploreTitle: 'Start Exploring',
    exploreText: 'Check out my latest digital products and find the perfect tool for your journey.',
    browseProducts: 'Browse Products',
    readBlog: 'Read the Blog',
    connectTitle: "Let's Connect",
    connectText: 'Follow me on social media for daily inspiration and behind-the-scenes content.',
    footer: 'Happy creating!',
    signature: 'Nanda',
    copyright: '© 2026 Creatively Nanda. All rights reserved.',
  },
  af: {
    preview: 'Welkom by Creatively Nanda!',
    greeting: 'Welkom',
    intro: 'Dankie dat jy by die Creatively Nanda-gemeenskap aangesluit het! Ek is so opgewonde om jou hier te hê.',
    aboutMe: "Ek is Nanda, 'n sagteware-ontwikkelaar, digter en kreatiewe entrepreneur in Suid-Afrika. Ek skep digitale produkte, sjablone en hulpbronne om studente, vryskutwerkers en klein besighede te help floreer.",
    whatYouGet: 'Wat Jy Kry',
    benefit1Title: 'Premium Sjablone',
    benefit1Text: 'Notion-sjablone, CV-bouers en produktiwiteitshulpmiddels ontwerp vir sukses.',
    benefit2Title: 'Kreatiewe Inhoud',
    benefit2Text: 'Poësie, skryfwerk en artistieke inspirasie om jou kreatiwiteit aan te wakker.',
    benefit3Title: 'Eksklusiewe Opdaterings',
    benefit3Text: 'Wees die eerste om te weet van nuwe produkte, afslag en spesiale aanbiedinge.',
    exploreTitle: 'Begin Verken',
    exploreText: 'Kyk na my nuutste digitale produkte en vind die perfekte hulpmiddel vir jou reis.',
    browseProducts: 'Blaai Produkte',
    readBlog: 'Lees die Blog',
    connectTitle: 'Kom Ons Konnekteer',
    connectText: 'Volg my op sosiale media vir daaglikse inspirasie en agter-die-skerms inhoud.',
    footer: 'Gelukkige skeppingswerk!',
    signature: 'Nanda',
    copyright: '© 2026 Creatively Nanda. Alle regte voorbehou.',
  },
  zu: {
    preview: 'Siyakwamukela ku-Creatively Nanda!',
    greeting: 'Siyakwamukela',
    intro: 'Siyabonga ngokujoyina umphakathi wakwa-Creatively Nanda! Ngijabule kakhulu ukukubona lapha.',
    aboutMe: 'NginguNanda, umsunguli wesofthiwe, imbongi, nosomabhizinisi wokuqamba e-South Africa. Ngidala imikhiqizo yedijithali, izinhlobo zokusebenza, nezinsiza ukusiza abafundi, abazimele, namabhizinisi amancane ukuthi aphumelele.',
    whatYouGet: 'Ozokuthola',
    benefit1Title: 'Izinhlobo Eziphezulu',
    benefit1Text: 'Izinhlobo ze-Notion, abakhi be-CV, namathuluzi okukhiqiza aklanywe ngempumelelo.',
    benefit2Title: 'Okuqukethwe Kokuqamba',
    benefit2Text: 'Izinkondlo, ukubhala, nokukhuthaza kobuciko ukugqugquzela ukuqamba kwakho.',
    benefit3Title: 'Izibuyekezo Ezikhethekile',
    benefit3Text: 'Yiba ngowokuqala ukwazi ngemikhiqizo emisha, izephulelo, neziphakamiso ezikhethekile.',
    exploreTitle: 'Qala Ukuhlola',
    exploreText: 'Bheka imikhiqizo yami yamuva yedijithali futhi uthole ithuluzi elifanele lohambo lwakho.',
    browseProducts: 'Bheka Imikhiqizo',
    readBlog: 'Funda Ibhulogi',
    connectTitle: 'Masixhumane',
    connectText: 'Ngilandele kumedia yezokuxhumana ukuthola ukukhuthaza kwansuku zonke nokuqukethwe okungaphandle.',
    footer: 'Ukudala okujabulisayo!',
    signature: 'Nanda',
    copyright: '© 2026 Creatively Nanda. Amalungelo onke agodliwe.',
  },
};

export const WelcomeEmail = ({
  customerName = 'there',
  locale = 'en',
}: WelcomeEmailProps) => {
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
              {t.greeting}, {customerName}!
            </Heading>

            <Text style={paragraph}>{t.intro}</Text>
            <Text style={paragraph}>{t.aboutMe}</Text>

            <Hr style={divider} />

            {/* Benefits */}
            <Heading as="h2" style={subheading}>{t.whatYouGet}</Heading>

            <Section style={benefitBox}>
              <Text style={benefitTitle}>{t.benefit1Title}</Text>
              <Text style={benefitText}>{t.benefit1Text}</Text>
            </Section>

            <Section style={benefitBox}>
              <Text style={benefitTitle}>{t.benefit2Title}</Text>
              <Text style={benefitText}>{t.benefit2Text}</Text>
            </Section>

            <Section style={benefitBox}>
              <Text style={benefitTitle}>{t.benefit3Title}</Text>
              <Text style={benefitText}>{t.benefit3Text}</Text>
            </Section>

            <Hr style={divider} />

            {/* CTA */}
            <Section style={ctaSection}>
              <Heading as="h2" style={subheading}>{t.exploreTitle}</Heading>
              <Text style={paragraph}>{t.exploreText}</Text>

              <Row>
                <Column style={{ paddingRight: '8px' }}>
                  <Button style={primaryButton} href="https://creativelynanda.co.za/products">
                    {t.browseProducts}
                  </Button>
                </Column>
                <Column style={{ paddingLeft: '8px' }}>
                  <Button style={secondaryButton} href="https://creativelynanda.co.za/blog">
                    {t.readBlog}
                  </Button>
                </Column>
              </Row>
            </Section>

            <Hr style={divider} />

            {/* Connect */}
            <Section style={connectSection}>
              <Heading as="h3" style={connectHeading}>{t.connectTitle}</Heading>
              <Text style={connectText}>{t.connectText}</Text>
              <Row style={socialLinks}>
                <Column>
                  <Link href="https://twitter.com/creativelynanda" style={socialIcon}>
                    Twitter
                  </Link>
                </Column>
                <Column>
                  <Link href="https://instagram.com/creativelynanda" style={socialIcon}>
                    Instagram
                  </Link>
                </Column>
                <Column>
                  <Link href="https://linkedin.com/in/creativelynanda" style={socialIcon}>
                    LinkedIn
                  </Link>
                </Column>
              </Row>
            </Section>

            {/* Signature */}
            <Section style={signatureSection}>
              <Text style={footerMessage}>{t.footer}</Text>
              <Text style={signature}>{t.signature}</Text>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={copyright}>{t.copyright}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default WelcomeEmail;

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
  margin: '0 0 24px',
};

const subheading = {
  color: '#0A1128',
  fontSize: '20px',
  fontWeight: '600',
  margin: '0 0 16px',
};

const paragraph = {
  color: '#4a4a4a',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '0 0 16px',
};

const divider = {
  borderColor: '#e5e5e5',
  margin: '32px 0',
};

const benefitBox = {
  backgroundColor: '#f5f0e8',
  borderRadius: '8px',
  padding: '16px 20px',
  margin: '12px 0',
  borderLeft: '4px solid #C41E3A',
};

const benefitTitle = {
  color: '#0A1128',
  fontSize: '16px',
  fontWeight: '600',
  margin: '0 0 4px',
};

const benefitText = {
  color: '#666',
  fontSize: '14px',
  margin: '0',
};

const ctaSection = {
  textAlign: 'center' as const,
  margin: '24px 0',
};

const primaryButton = {
  backgroundColor: '#C41E3A',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '14px',
  fontWeight: '600',
  padding: '14px 24px',
  textDecoration: 'none',
};

const secondaryButton = {
  backgroundColor: '#0A1128',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '14px',
  fontWeight: '600',
  padding: '14px 24px',
  textDecoration: 'none',
};

const connectSection = {
  backgroundColor: '#f5f0e8',
  borderRadius: '8px',
  padding: '24px',
  textAlign: 'center' as const,
};

const connectHeading = {
  color: '#0A1128',
  fontSize: '16px',
  fontWeight: '600',
  margin: '0 0 8px',
};

const connectText = {
  color: '#666',
  fontSize: '14px',
  margin: '0 0 16px',
};

const socialLinks = {
  marginTop: '12px',
};

const socialIcon = {
  color: '#C41E3A',
  fontSize: '14px',
  fontWeight: '600',
  textDecoration: 'none',
  margin: '0 12px',
};

const signatureSection = {
  marginTop: '32px',
  textAlign: 'center' as const,
};

const footerMessage = {
  color: '#0A1128',
  fontSize: '16px',
  margin: '0',
};

const signature = {
  color: '#C41E3A',
  fontSize: '24px',
  fontWeight: '700',
  fontStyle: 'italic',
  margin: '8px 0 0',
};

const footer = {
  backgroundColor: '#0A1128',
  padding: '24px 40px',
  borderRadius: '0 0 12px 12px',
  textAlign: 'center' as const,
};

const copyright = {
  color: '#999',
  fontSize: '12px',
  margin: '0',
};
