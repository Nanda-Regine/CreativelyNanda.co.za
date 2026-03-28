import { render } from '@react-email/components';
import Link from 'next/link';
import {
  LayoutDashboard,
  FileText,
  Package,
  ShoppingCart,
  Feather,
  MessageSquare,
  Mail,
} from 'lucide-react';
import { Badge } from '@/components/ui';
import PurchaseConfirmationEmail from '@/emails/purchase-confirmation';
import { WelcomeEmail } from '@/emails/welcome';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Blog Posts', href: '/admin/blog', icon: FileText },
  { label: 'Products', href: '/admin/products', icon: Package },
  { label: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { label: 'Poetry', href: '/admin/poetry', icon: Feather },
  { label: 'Reviews', href: '/admin/reviews', icon: MessageSquare },
];

// Sample data for preview
const SAMPLE_PURCHASE = PurchaseConfirmationEmail({
  customerName: 'Thabo',
  orderNumber: 'A1B2C3D4',
  orderDate: '25 February 2026',
  items: [
    { name: 'Student Success Planner', price: 149, quantity: 1 },
    { name: 'Business Notion OS', price: 299, quantity: 1 },
  ],
  total: 448,
  downloadLinks: [
    { name: 'Student Success Planner', url: 'https://creativelynanda.co.za/api/downloads/sample-token' },
    { name: 'Business Notion OS', url: 'https://creativelynanda.co.za/api/downloads/sample-token?item=1' },
  ],
  guideLinks: [
    { name: 'Student Success Planner', url: 'https://creativelynanda.co.za/guides/student-planner.pdf' },
  ],
  locale: 'en',
});

const SAMPLE_WELCOME = WelcomeEmail({
  customerName: 'Lerato',
  locale: 'en',
});

async function getEmailHtml(component: React.ReactElement) {
  return render(component, { pretty: true });
}

export default async function EmailPreviewPage() {
  const [purchaseHtml, welcomeHtml] = await Promise.all([
    getEmailHtml(SAMPLE_PURCHASE as React.ReactElement),
    getEmailHtml(SAMPLE_WELCOME as React.ReactElement),
  ]);

  return (
    <div className="min-h-screen bg-parchment">
      <header className="bg-navy text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="font-display text-2xl font-bold text-beige">Nanda</Link>
          <Badge variant="secondary" size="sm" className="bg-cherry/20 text-cherry-light">Admin</Badge>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-beige/70 hover:text-beige text-sm">View Site</Link>
          <div className="w-10 h-10 rounded-full bg-cherry flex items-center justify-center text-white font-medium">N</div>
        </div>
      </header>

      <div className="flex">
        <aside className="w-64 bg-white border-r border-navy/10 min-h-[calc(100vh-64px)] p-4">
          <nav className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-navy/70 hover:bg-navy/5"
                >
                  <Icon className="w-5 h-5" />{item.label}
                </Link>
              );
            })}
            <Link href="/admin/email-preview"
              className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors bg-cherry/10 text-cherry font-medium"
            >
              <Mail className="w-5 h-5" />Email Preview
            </Link>
          </nav>
        </aside>

        <main className="flex-1 p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-display font-bold text-navy mb-1">Email Preview</h1>
              <p className="text-navy/60">Live preview of transactional emails sent to customers</p>
            </div>
          </div>

          {/* Info Banner */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 flex items-start gap-3">
            <Mail className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-amber-800">These are live previews with sample data</p>
              <p className="text-sm text-amber-700 mt-0.5">
                The Purchase Confirmation shows how your customer's email looks — including the Quick Start Guide section (appears when a product has a guide URL set). The "Download Now" links are token-based and expire after 7 days.
              </p>
            </div>
          </div>

          <div className="space-y-10">
            {/* Purchase Confirmation */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-cherry/10 rounded-lg">
                  <Mail className="w-5 h-5 text-cherry" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-navy">Purchase Confirmation</h2>
                  <p className="text-sm text-navy/50">Sent automatically after a successful PayFast payment</p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-navy/10 overflow-hidden">
                {/* Email header bar */}
                <div className="bg-navy/5 border-b border-navy/10 px-5 py-3 flex items-center gap-4 text-sm text-navy/60">
                  <span><span className="font-medium text-navy">Subject:</span> Your order #A1B2C3D4 is confirmed! 🎉</span>
                  <span className="ml-auto"><span className="font-medium text-navy">To:</span> thabo@example.com</span>
                </div>
                {/* Rendered email in iframe */}
                <iframe
                  srcDoc={purchaseHtml}
                  className="w-full border-0"
                  style={{ height: '900px' }}
                  title="Purchase Confirmation Email Preview"
                />
              </div>
            </section>

            {/* Welcome Email */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-navy">Welcome Email</h2>
                  <p className="text-sm text-navy/50">Sent to new subscribers / first-time visitors who sign up</p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-navy/10 overflow-hidden">
                <div className="bg-navy/5 border-b border-navy/10 px-5 py-3 flex items-center gap-4 text-sm text-navy/60">
                  <span><span className="font-medium text-navy">Subject:</span> Welcome to Creatively Nanda! 👋</span>
                  <span className="ml-auto"><span className="font-medium text-navy">To:</span> lerato@example.com</span>
                </div>
                <iframe
                  srcDoc={welcomeHtml}
                  className="w-full border-0"
                  style={{ height: '900px' }}
                  title="Welcome Email Preview"
                />
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
