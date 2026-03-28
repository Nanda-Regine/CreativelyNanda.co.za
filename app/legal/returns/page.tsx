import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Refund & Returns Policy | CreativelyNanda.co.za',
  description:
    'Refund and Returns Policy for digital products purchased on CreativelyNanda.co.za — in compliance with the Consumer Protection Act (CPA) and ECT Act.',
};

const EFFECTIVE_DATE = '10 March 2026';
const COMPANY = 'Mirembe Muse (Pty) Ltd';
const TRADING_AS = 'CreativelyNanda.co.za';
const EMAIL = 'hello@creativelynanda.co.za';

export default function ReturnsPolicy() {
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
            Refund & Returns Policy
          </h1>
          <p className="text-navy/60 text-sm">
            Effective date: {EFFECTIVE_DATE} &nbsp;·&nbsp; Compliant with CPA (No. 68 of 2008) and ECT Act (No. 25 of 2002)
          </p>
        </div>

        <div className="prose prose-sm max-w-none text-navy/80 space-y-10">

          {/* Summary box */}
          <section className="bg-cherry/8 border border-cherry/20 rounded-2xl p-6">
            <h2 className="font-display text-xl font-bold text-navy mb-2">Summary</h2>
            <ul className="space-y-1 text-sm">
              <li>✓ &nbsp;7-day cooling-off period under the ECT Act for direct marketing purchases</li>
              <li>✓ &nbsp;Refunds for defective or misdescribed products</li>
              <li>✓ &nbsp;Refunds for products not delivered within the agreed timeframe</li>
              <li>✗ &nbsp;No refunds once a digital product has been accessed or downloaded (content consumed)</li>
              <li>✗ &nbsp;No refunds for change of mind after access (subject to ECT cooling-off exception)</li>
            </ul>
          </section>

          {/* 1. Digital products */}
          <section>
            <h2 className="font-display text-2xl font-bold text-navy mb-3">1. Nature of Our Products</h2>
            <p className="text-sm">
              All products sold on CreativelyNanda.co.za are <strong>digital goods</strong> — specifically Notion template files and guides delivered electronically. Because digital products are downloaded or accessed instantly, special considerations apply under South African consumer law.
            </p>
          </section>

          {/* 2. ECT Act cooling-off */}
          <section>
            <h2 className="font-display text-2xl font-bold text-navy mb-3">2. Cooling-Off Period (ECT Act, Section 44)</h2>
            <p className="text-sm">
              Under Section 44 of the Electronic Communications and Transactions Act, No. 25 of 2002, you have the right to cancel a transaction within <strong>7 (seven) days</strong> of the date of purchase, without reason and without penalty, provided you have <strong>not yet accessed, downloaded, or duplicated the product</strong>.
            </p>
            <p className="mt-2 text-sm">
              To exercise your cooling-off right, email us at <a href={`mailto:${EMAIL}`} className="text-cherry underline">{EMAIL}</a> within 7 days of purchase with your order number and the subject line "Cooling-Off Cancellation". We will process your refund within 30 days.
            </p>
            <p className="mt-2 text-sm font-medium text-navy/60">
              Please note: If you have already accessed the Notion template or downloaded any associated files, the product has been consumed and the cooling-off right no longer applies, as permitted under Section 44(2) of the ECT Act.
            </p>
          </section>

          {/* 3. CPA rights */}
          <section>
            <h2 className="font-display text-2xl font-bold text-navy mb-3">3. Your Rights Under the Consumer Protection Act</h2>
            <p className="text-sm">
              The Consumer Protection Act, No. 68 of 2008 (CPA) affords you the following rights, regardless of whether you have accessed the product:
            </p>
            <div className="mt-3 space-y-4">
              <div>
                <h3 className="font-semibold text-navy text-sm">a) Right to receive what was described</h3>
                <p className="text-sm mt-1">
                  If the product you received is materially different from how it was described on our website, you are entitled to a full refund. Please contact us within 14 days of purchase with details of the discrepancy.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-navy text-sm">b) Right to safe and good-quality products</h3>
                <p className="text-sm mt-1">
                  If a digital product is defective (e.g., the file is corrupt, the Notion link is non-functional, or critical features are missing as described), we will either repair the defect, replace the product, or issue a full refund at your election.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-navy text-sm">c) Right to delivery</h3>
                <p className="text-sm mt-1">
                  If your product is not delivered within 24 hours of payment and we are unable to resolve the issue within a reasonable time, you are entitled to cancel your order and receive a full refund.
                </p>
              </div>
            </div>
          </section>

          {/* 4. Non-refundable situations */}
          <section>
            <h2 className="font-display text-2xl font-bold text-navy mb-3">4. When Refunds Do Not Apply</h2>
            <p className="text-sm">We are unable to issue refunds in the following circumstances:</p>
            <ul className="mt-2 space-y-1 list-disc list-inside text-sm">
              <li>You have accessed, duplicated, or downloaded the Notion template and are simply requesting a refund due to change of mind.</li>
              <li>You purchased the wrong product — please review product descriptions carefully before purchasing.</li>
              <li>Technical difficulties on your side (e.g., incompatible software, lack of a Notion account).</li>
              <li>More than 30 days have elapsed since the date of purchase (unless the defect could not reasonably have been discovered sooner).</li>
            </ul>
          </section>

          {/* 5. How to request */}
          <section>
            <h2 className="font-display text-2xl font-bold text-navy mb-3">5. How to Request a Refund</h2>
            <p className="text-sm">To request a refund, please email us at <a href={`mailto:${EMAIL}`} className="text-cherry underline">{EMAIL}</a> with:</p>
            <ul className="mt-2 space-y-1 list-disc list-inside text-sm">
              <li>Your full name and email address used at checkout</li>
              <li>Your order number or payment reference</li>
              <li>The product name</li>
              <li>The reason for your refund request</li>
            </ul>
            <p className="mt-3 text-sm">
              We aim to respond to all refund requests within <strong>3 business days</strong>. Approved refunds are processed back to your original payment method via PayFast and typically reflect within 5–10 business days, depending on your bank.
            </p>
          </section>

          {/* 6. Disputes */}
          <section>
            <h2 className="font-display text-2xl font-bold text-navy mb-3">6. Disputes</h2>
            <p className="text-sm">
              If you are not satisfied with the outcome of a refund request, you may escalate your complaint to:
            </p>
            <ul className="mt-2 space-y-1 list-disc list-inside text-sm">
              <li><strong>National Consumer Commission (NCC):</strong> <a href="https://www.thencc.gov.za" target="_blank" rel="noopener noreferrer" className="text-cherry underline">www.thencc.gov.za</a> | 0860 266 786</li>
              <li><strong>Consumer Goods and Services Ombud (CGSO):</strong> <a href="https://www.cgso.org.za" target="_blank" rel="noopener noreferrer" className="text-cherry underline">www.cgso.org.za</a></li>
            </ul>
          </section>

          {/* Contact */}
          <section className="border-t border-navy/15 pt-8">
            <h2 className="font-display text-2xl font-bold text-navy mb-3">Contact Us</h2>
            <ul className="space-y-1 text-sm">
              <li><strong>Company:</strong> {COMPANY} t/a {TRADING_AS}</li>
              <li><strong>Email:</strong> <a href={`mailto:${EMAIL}`} className="text-cherry underline">{EMAIL}</a></li>
            </ul>
          </section>

        </div>

        {/* Cross links */}
        <div className="mt-12 pt-8 border-t border-navy/15">
          <div className="flex gap-6 text-sm">
            <Link href="/legal/privacy" className="text-cherry hover:underline">Privacy Policy</Link>
            <Link href="/legal/terms" className="text-cherry hover:underline">Terms & Conditions</Link>
            <Link href="/" className="text-navy/50 hover:text-navy">← Home</Link>
          </div>
        </div>

      </div>
    </main>
  );
}
