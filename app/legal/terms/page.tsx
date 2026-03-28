import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms & Conditions | CreativelyNanda.co.za',
  description:
    'Terms and Conditions for CreativelyNanda.co.za — governing use of the website and purchase of digital products under South African law (ECT Act, CPA).',
};

const EFFECTIVE_DATE = '10 March 2026';
const COMPANY = 'Mirembe Muse (Pty) Ltd';
const TRADING_AS = 'CreativelyNanda.co.za';
const EMAIL = 'hello@creativelynanda.co.za';
const ADDRESS = 'East London, Eastern Cape, South Africa';
const WEBSITE = 'https://creativelynanda.co.za';

export default function TermsAndConditions() {
  return (
    <main className="pt-28 pb-20 px-6">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-px bg-navy" />
            <span className="text-navy/50 text-xs font-bold tracking-[0.3em] uppercase">Legal</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-navy mb-4">
            Terms & Conditions
          </h1>
          <p className="text-navy/60 text-sm">
            Effective date: {EFFECTIVE_DATE} &nbsp;·&nbsp; Governed by South African law
          </p>
        </div>

        <div className="prose prose-sm max-w-none text-navy/80 space-y-10">

          {/* ECT Act Disclosure */}
          <section className="bg-navy/5 border border-navy/10 rounded-2xl p-6">
            <h2 className="font-display text-xl font-bold text-navy mb-3">
              Website Operator Disclosure (ECT Act, Section 43)
            </h2>
            <ul className="space-y-1 text-sm">
              <li><strong>Legal name:</strong> {COMPANY}</li>
              <li><strong>Trading name:</strong> {TRADING_AS}</li>
              <li><strong>Physical address:</strong> {ADDRESS}</li>
              <li><strong>Email address:</strong> <a href={`mailto:${EMAIL}`} className="text-cherry underline">{EMAIL}</a></li>
              <li><strong>Website:</strong> <a href={WEBSITE} className="text-cherry underline">{WEBSITE}</a></li>
              <li><strong>Nature of business:</strong> Digital products (Notion templates), creative technology services, web development, and AI consulting.</li>
            </ul>
          </section>

          {/* 1. Agreement */}
          <section>
            <h2 className="font-display text-2xl font-bold text-navy mb-3">1. Agreement to Terms</h2>
            <p className="text-sm">
              By accessing or using this website, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use the website. These terms apply to all visitors, users, and customers.
            </p>
          </section>

          {/* 2. Products and services */}
          <section>
            <h2 className="font-display text-2xl font-bold text-navy mb-3">2. Products and Services</h2>
            <p className="text-sm">
              We offer digital products (Notion templates), creative consulting, web development services, and educational content. All prices are displayed in South African Rand (ZAR) and are inclusive of any applicable VAT where stated.
            </p>
            <p className="mt-2 text-sm">
              Product descriptions, pricing, and availability are subject to change without prior notice. We reserve the right to refuse or cancel any order at our discretion.
            </p>
          </section>

          {/* 3. Orders and payment */}
          <section>
            <h2 className="font-display text-2xl font-bold text-navy mb-3">3. Orders and Payment</h2>
            <p className="text-sm">
              All payments are processed securely by <strong>PayFast (DPO PayGate (Pty) Ltd)</strong>, a South African payment service provider. We accept the payment methods offered by PayFast including credit/debit cards, EFT, and Instant EFT.
            </p>
            <p className="mt-2 text-sm">
              An order is confirmed once payment has been successfully processed. You will receive a confirmation email with your download link or access instructions.
            </p>
            <p className="mt-2 text-sm">
              We do not store your card or banking details. All payment data is handled exclusively by PayFast on their PCI DSS-compliant servers.
            </p>
          </section>

          {/* 4. Digital product delivery */}
          <section>
            <h2 className="font-display text-2xl font-bold text-navy mb-3">4. Delivery of Digital Products</h2>
            <p className="text-sm">
              Digital products (Notion templates) are delivered electronically. Upon successful payment, you will receive:
            </p>
            <ul className="mt-2 space-y-1 list-disc list-inside text-sm">
              <li>A confirmation email with a secure download link; and/or</li>
              <li>A link to duplicate the Notion template directly to your Notion workspace.</li>
            </ul>
            <p className="mt-2 text-sm">
              Delivery is typically immediate but may take up to 24 hours in the event of technical delays. If you do not receive your product within 24 hours, please contact us at <a href={`mailto:${EMAIL}`} className="text-cherry underline">{EMAIL}</a>.
            </p>
          </section>

          {/* 5. Intellectual property */}
          <section>
            <h2 className="font-display text-2xl font-bold text-navy mb-3">5. Intellectual Property</h2>
            <p className="text-sm">
              All content on this website — including text, designs, code, images, poetry, and digital products — is the intellectual property of {COMPANY} and is protected under South African copyright law and applicable international treaties.
            </p>
            <p className="mt-2 text-sm">
              <strong>Digital product licence:</strong> When you purchase a Notion template, you receive a personal, non-exclusive, non-transferable licence to use the template for your own personal or business purposes. You may not resell, redistribute, sublicense, or share the template with third parties.
            </p>
            <p className="mt-2 text-sm">
              <strong>Portfolio and website content:</strong> You may not reproduce, copy, or republish any content from this website without our prior written permission.
            </p>
          </section>

          {/* 6. Acceptable use */}
          <section>
            <h2 className="font-display text-2xl font-bold text-navy mb-3">6. Acceptable Use</h2>
            <p className="text-sm">You agree not to:</p>
            <ul className="mt-2 space-y-1 list-disc list-inside text-sm">
              <li>Use the website for any unlawful purpose or in violation of any South African law.</li>
              <li>Attempt to gain unauthorised access to any part of the website or its infrastructure.</li>
              <li>Transmit any malicious code, spam, or harmful content.</li>
              <li>Impersonate any person or misrepresent your affiliation with any entity.</li>
              <li>Use automated tools to scrape, copy, or index content without permission.</li>
            </ul>
          </section>

          {/* 7. Consumer protection */}
          <section>
            <h2 className="font-display text-2xl font-bold text-navy mb-3">7. Consumer Rights (CPA)</h2>
            <p className="text-sm">
              In accordance with the Consumer Protection Act, No. 68 of 2008:
            </p>
            <ul className="mt-2 space-y-2 list-disc list-inside text-sm">
              <li>You have the right to receive goods and services that are safe, of good quality, and fit for purpose.</li>
              <li>Product descriptions on this website are accurate to the best of our knowledge.</li>
              <li>You have the right to fair, honest, and transparent pricing.</li>
            </ul>
            <p className="mt-2 text-sm">
              Please refer to our <Link href="/legal/returns" className="text-cherry underline">Refund Policy</Link> for details on returns and cooling-off rights.
            </p>
          </section>

          {/* 8. ECT Act cooling-off */}
          <section>
            <h2 className="font-display text-2xl font-bold text-navy mb-3">8. Cooling-Off Period (ECT Act, Section 44)</h2>
            <p className="text-sm">
              Under Section 44 of the Electronic Communications and Transactions Act, No. 25 of 2002, consumers who purchase goods or services through a website as a result of direct marketing have the right to cancel the transaction within <strong>7 days</strong> without penalty, provided the goods have not been used or consumed.
            </p>
            <p className="mt-2 text-sm">
              For digital products (Notion templates), the cooling-off right may not apply once the template has been accessed or downloaded, as the content has been consumed. See our <Link href="/legal/returns" className="text-cherry underline">Refund Policy</Link> for full details.
            </p>
          </section>

          {/* 9. Disclaimer and limitation of liability */}
          <section>
            <h2 className="font-display text-2xl font-bold text-navy mb-3">9. Disclaimer and Limitation of Liability</h2>
            <p className="text-sm">
              This website and its content are provided on an "as is" basis. To the maximum extent permitted by South African law, {COMPANY} excludes all warranties, express or implied, regarding the website and its content.
            </p>
            <p className="mt-2 text-sm">
              We will not be liable for any direct, indirect, incidental, or consequential loss arising from your use of the website or any digital product, except where liability cannot be excluded under the CPA or other applicable law.
            </p>
            <p className="mt-2 text-sm">
              Our total liability to you for any claim arising from your purchase will not exceed the amount you paid for the product in question.
            </p>
          </section>

          {/* 10. Third-party links */}
          <section>
            <h2 className="font-display text-2xl font-bold text-navy mb-3">10. Third-Party Links</h2>
            <p className="text-sm">
              This website may contain links to third-party websites (including GitHub, Vercel deployments, and Notion). These links are provided for convenience only. We are not responsible for the content, accuracy, or privacy practices of any linked website.
            </p>
          </section>

          {/* 11. Governing law */}
          <section>
            <h2 className="font-display text-2xl font-bold text-navy mb-3">11. Governing Law and Jurisdiction</h2>
            <p className="text-sm">
              These Terms and Conditions are governed by and construed in accordance with the laws of the Republic of South Africa. Any disputes arising from these terms or your use of the website shall be subject to the exclusive jurisdiction of the courts of South Africa.
            </p>
          </section>

          {/* 12. Changes */}
          <section>
            <h2 className="font-display text-2xl font-bold text-navy mb-3">12. Changes to These Terms</h2>
            <p className="text-sm">
              We reserve the right to update these Terms and Conditions at any time. The effective date will be updated accordingly. Continued use of the website after changes constitutes acceptance of the revised terms.
            </p>
          </section>

          {/* Contact */}
          <section className="border-t border-navy/15 pt-8">
            <h2 className="font-display text-2xl font-bold text-navy mb-3">Contact</h2>
            <ul className="space-y-1 text-sm">
              <li><strong>Company:</strong> {COMPANY} t/a {TRADING_AS}</li>
              <li><strong>Email:</strong> <a href={`mailto:${EMAIL}`} className="text-cherry underline">{EMAIL}</a></li>
              <li><strong>Address:</strong> {ADDRESS}</li>
            </ul>
          </section>

        </div>

        {/* Cross links */}
        <div className="mt-12 pt-8 border-t border-navy/15">
          <div className="flex gap-6 text-sm">
            <Link href="/legal/privacy" className="text-cherry hover:underline">Privacy Policy</Link>
            <Link href="/legal/returns" className="text-cherry hover:underline">Refund Policy</Link>
            <Link href="/" className="text-navy/50 hover:text-navy">← Home</Link>
          </div>
        </div>

      </div>
    </main>
  );
}
