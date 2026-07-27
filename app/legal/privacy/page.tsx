import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | CreativelyNanda.co.za',
  description:
    'Privacy Policy for CreativelyNanda.co.za — how we collect, use, and protect your personal information in compliance with the Protection of Personal Information Act (POPIA), No. 4 of 2013.',
};

const EFFECTIVE_DATE = '5 April 2026';
const COMPANY = 'Mirembe Muse (Pty) Ltd';
const TRADING_AS = 'CreativelyNanda.co.za';
const EMAIL = 'hello@creativelynanda.co.za';
const ADDRESS = 'KuGompo City, Eastern Cape, South Africa';

export default function PrivacyPolicy() {
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
            Privacy Policy
          </h1>
          <p className="text-navy/60 text-sm">
            Effective date: {EFFECTIVE_DATE} &nbsp;·&nbsp; Compliant with POPIA, No. 4 of 2013
          </p>
        </div>

        <div className="prose prose-sm max-w-none text-navy/80 space-y-10">

          {/* 1. Who we are */}
          <section>
            <h2 className="font-display text-2xl font-bold text-navy mb-3">1. Who We Are</h2>
            <p>
              This website is operated by <strong>{COMPANY}</strong>, trading as <strong>{TRADING_AS}</strong>
              , a company registered in South Africa.
            </p>
            <ul className="mt-3 space-y-1 list-disc list-inside text-sm">
              <li><strong>Website:</strong> https://creativelynanda.co.za</li>
              <li><strong>Email:</strong> {EMAIL}</li>
              <li><strong>Address:</strong> {ADDRESS}</li>
            </ul>
            <p className="mt-3 text-sm">
              We are the Responsible Party (as defined in POPIA) for personal information collected through this website.
            </p>
          </section>

          {/* 2. What we collect */}
          <section>
            <h2 className="font-display text-2xl font-bold text-navy mb-3">2. Personal Information We Collect</h2>
            <p>We collect the following categories of personal information:</p>
            <div className="mt-3 space-y-4">
              <div>
                <h3 className="font-semibold text-navy">a) Information you provide directly</h3>
                <ul className="mt-1 space-y-1 list-disc list-inside text-sm">
                  <li>Name and email address when you submit the contact form</li>
                  <li>Name, email, and billing details when you purchase a digital product</li>
                  <li>Any messages or enquiries you send us</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-navy">b) Information collected automatically</h3>
                <ul className="mt-1 space-y-1 list-disc list-inside text-sm">
                  <li>Page view analytics via Vercel Analytics (aggregated, no personal identifiers stored)</li>
                  <li>Session identifiers used to track poem hearts/likes (stored locally and in our database)</li>
                  <li>Standard server logs (IP address, browser type, pages visited) — retained for security purposes</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 3. Why we collect it */}
          <section>
            <h2 className="font-display text-2xl font-bold text-navy mb-3">3. Why We Collect Your Information</h2>
            <p>We process your personal information for the following lawful purposes:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside text-sm">
              <li><strong>Order fulfilment:</strong> To process payments (via PayFast), deliver digital products, and send purchase confirmations via email (Resend).</li>
              <li><strong>Communication:</strong> To respond to enquiries and support requests.</li>
              <li><strong>Legal compliance:</strong> To comply with financial, tax, and regulatory obligations under South African law.</li>
              <li><strong>Security:</strong> To detect fraud and protect the integrity of our platform.</li>
              <li><strong>Analytics:</strong> To understand how our website is used and improve the user experience.</li>
            </ul>
            <p className="mt-3 text-sm">
              We do not sell, rent, or trade your personal information to any third party for marketing purposes.
            </p>
          </section>

          {/* 4. Third parties */}
          <section>
            <h2 className="font-display text-2xl font-bold text-navy mb-3">4. Third-Party Service Providers</h2>
            <p>We share personal information only with service providers necessary to operate our platform:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside text-sm">
              <li><strong>PayFast (DPO PayGate (Pty) Ltd):</strong> Payment processing. PayFast is a registered payment service provider in South Africa and is PCI DSS compliant. Your card details are never stored on our servers.</li>
              <li><strong>Supabase Inc.:</strong> Database and file storage hosted on AWS. Data may be stored outside South Africa. Supabase implements appropriate safeguards.</li>
              <li><strong>Resend Inc.:</strong> Transactional email delivery (order confirmations and project correspondence).</li>
              <li><strong>Vercel Inc.:</strong> Website hosting and edge deployment.</li>
              <li><strong>Anthropic PBC:</strong> AI assistant functionality on this website. Messages you submit to the AI chat assistant are processed by Anthropic's Claude API. Anthropic does not use these messages to train its models by default. See Anthropic's privacy policy at anthropic.com/privacy.</li>
            </ul>
            <p className="mt-3 text-sm">
              Where data is processed outside South Africa, we take reasonable steps to ensure it receives equivalent protection to that provided by POPIA.
            </p>
          </section>

          {/* 5. Data retention */}
          <section>
            <h2 className="font-display text-2xl font-bold text-navy mb-3">5. How Long We Keep Your Data</h2>
            <ul className="mt-3 space-y-1 list-disc list-inside text-sm">
              <li><strong>Order records:</strong> 5 years from the date of purchase (for tax and accounting compliance under the Income Tax Act).</li>
              <li><strong>Contact form submissions:</strong> Up to 12 months, or until the enquiry is resolved.</li>
              <li><strong>Session identifiers:</strong> Up to 12 months.</li>
              <li><strong>Analytics data:</strong> Aggregated; no personal retention period applies.</li>
            </ul>
          </section>

          {/* 6. Your rights */}
          <section>
            <h2 className="font-display text-2xl font-bold text-navy mb-3">6. Your Rights Under POPIA</h2>
            <p>As a data subject, you have the right to:</p>
            <ul className="mt-3 space-y-1 list-disc list-inside text-sm">
              <li><strong>Access</strong> the personal information we hold about you.</li>
              <li><strong>Correct or update</strong> inaccurate information.</li>
              <li><strong>Request deletion</strong> of your personal information, subject to legal retention obligations.</li>
              <li><strong>Object</strong> to the processing of your information.</li>
              <li><strong>Lodge a complaint</strong> with the Information Regulator of South Africa if you believe your rights have been violated.</li>
            </ul>
            <p className="mt-3 text-sm">
              To exercise any of these rights, contact us at <a href={`mailto:${EMAIL}`} className="text-cherry underline">{EMAIL}</a>. We will respond within 30 days.
            </p>
            <p className="mt-2 text-sm">
              <strong>Information Regulator (South Africa):</strong> <a href="https://www.justice.gov.za/inforeg/" target="_blank" rel="noopener noreferrer" className="text-cherry underline">www.justice.gov.za/inforeg</a> &nbsp;|&nbsp; inforeg@justice.gov.za
            </p>
          </section>

          {/* 7. Security */}
          <section>
            <h2 className="font-display text-2xl font-bold text-navy mb-3">7. Security</h2>
            <p className="text-sm">
              We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, loss, or disclosure. These include HTTPS encryption, row-level security on our database, and restricted access to production systems. No method of transmission over the internet is 100% secure, but we take our obligations under POPIA seriously.
            </p>
          </section>

          {/* 8. Cookies */}
          <section>
            <h2 className="font-display text-2xl font-bold text-navy mb-3">8. Cookies</h2>
            <p className="text-sm">
              This website uses minimal cookies and browser storage:
            </p>
            <ul className="mt-2 space-y-1 list-disc list-inside text-sm">
              <li><strong>localStorage:</strong> Shopping cart contents and PWA installation preferences (stored locally on your device only).</li>
              <li><strong>Session storage:</strong> Temporary interaction state (e.g., poem likes per session).</li>
              <li><strong>Vercel Analytics:</strong> Privacy-first analytics that do not use cookies and do not track individuals.</li>
            </ul>
            <p className="mt-2 text-sm">
              We do not use third-party advertising or tracking cookies.
            </p>
          </section>

          {/* 9. Consulting and B2B engagements */}
          <section>
            <h2 className="font-display text-2xl font-bold text-navy mb-3">9. Consulting and B2B Engagements</h2>
            <p className="text-sm">
              When you engage us for consulting, AI engineering, web development, or business automation services, we may process personal information about your employees, clients, or end users as part of delivering those services. In such cases:
            </p>
            <ul className="mt-2 space-y-1 list-disc list-inside text-sm">
              <li>You, as the client, are the Responsible Party for any personal information you share with us.</li>
              <li>We act as an Operator (as defined in POPIA) and will only process that information for the purposes of the engagement.</li>
              <li>We will not retain client data beyond the conclusion of the project without written instruction.</li>
              <li>Where required, we will enter into a written Operator Agreement before processing begins.</li>
            </ul>
          </section>

          {/* 10. PAIA */}
          <section>
            <h2 className="font-display text-2xl font-bold text-navy mb-3">10. Access to Information (PAIA)</h2>
            <p className="text-sm">
              In terms of the Promotion of Access to Information Act, No. 2 of 2000 (PAIA), you may request access to records held by {COMPANY}. Requests must be submitted in writing to the Information Officer at {EMAIL}. We will respond within the timeframes prescribed by PAIA.
            </p>
          </section>

          {/* 11. Children */}
          <section>
            <h2 className="font-display text-2xl font-bold text-navy mb-3">11. Children&apos;s Privacy</h2>
            <p className="text-sm">
              Our services are not directed at children under the age of 18. We do not knowingly collect personal information from minors. If you believe a minor has submitted personal information to us, please contact us immediately so we can delete it.
            </p>
          </section>

          {/* 12. Changes */}
          <section>
            <h2 className="font-display text-2xl font-bold text-navy mb-3">12. Changes to This Policy</h2>
            <p className="text-sm">
              We may update this Privacy Policy from time to time. The effective date at the top of this page will reflect when the policy was last revised. Continued use of the website after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          {/* Contact */}
          <section className="border-t border-navy/15 pt-8">
            <h2 className="font-display text-2xl font-bold text-navy mb-3">Contact / Information Officer</h2>
            <p className="text-sm">
              For any privacy-related queries, to exercise your POPIA rights, or to report a concern:
            </p>
            <ul className="mt-2 space-y-1 text-sm">
              <li><strong>Responsible Party:</strong> {COMPANY} t/a {TRADING_AS}</li>
              <li><strong>Email:</strong> <a href={`mailto:${EMAIL}`} className="text-cherry underline">{EMAIL}</a></li>
              <li><strong>Address:</strong> {ADDRESS}</li>
            </ul>
          </section>

        </div>

        {/* Back link */}
        <div className="mt-12 pt-8 border-t border-navy/15">
          <div className="flex gap-6 text-sm">
            <Link href="/legal/terms" className="text-cherry hover:underline">Terms & Conditions</Link>
            <Link href="/legal/returns" className="text-cherry hover:underline">Refund Policy</Link>
            <Link href="/" className="text-navy/50 hover:text-navy">← Home</Link>
          </div>
        </div>

      </div>
    </main>
  );
}
