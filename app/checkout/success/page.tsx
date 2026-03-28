'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { CheckCircle, Mail, ArrowRight, Download, Loader2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui';
import confetti from 'canvas-confetti';

interface OrderItem {
  name: string;
  file_path?: string;
  guide_url?: string;
  slug?: string;
}

interface OrderData {
  id: string;
  status: string;
  amount: number;
  currency: string;
  download_token?: string;
  items?: OrderItem[];
}

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id');
  const trackedRef = useRef(false);
  const [order, setOrder] = useState<OrderData | null>(null);
  const [polling, setPolling] = useState(true);

  // Fetch order + poll until completed (PayFast ITN may arrive after the redirect)
  useEffect(() => {
    if (!orderId) { setPolling(false); return; }

    let attempts = 0;
    const maxAttempts = 15; // ~30 seconds

    async function fetchOrder() {
      try {
        const res = await fetch(`/api/orders?id=${orderId}`);
        if (!res.ok) return null;
        return await res.json() as OrderData;
      } catch {
        return null;
      }
    }

    async function poll() {
      const data = await fetchOrder();
      if (data) setOrder(data);
      attempts++;

      if (data?.status === 'completed' || attempts >= maxAttempts) {
        setPolling(false);

        // GA4 purchase event — fire once when completed
        if (!trackedRef.current && data?.status === 'completed' && typeof window.gtag === 'function') {
          trackedRef.current = true;
          const items = data.items || [];
          window.gtag('event', 'purchase', {
            transaction_id: data.id,
            value: data.amount / 100,
            currency: data.currency || 'ZAR',
            items: items.map((item: OrderItem & { product_id?: string; price?: number; quantity?: number }) => ({
              item_id: (item as { product_id?: string }).product_id,
              item_name: item.name,
              price: ((item as { price?: number }).price ?? 0) / 100,
              quantity: (item as { quantity?: number }).quantity ?? 1,
            })),
          });
        }
        return;
      }

      setTimeout(poll, 2000);
    }

    poll();
  }, [orderId]);

  // Confetti animation
  useEffect(() => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: NodeJS.Timeout = setInterval(function () {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors: ['#C1292E', '#0A1128', '#E8DCC4', '#C9A961'] });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors: ['#C1292E', '#0A1128', '#E8DCC4', '#C9A961'] });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const isCompleted = order?.status === 'completed';

  // Notion template links (guide_url)
  const guideItems = order?.items?.filter((item) => item.guide_url) ?? [];

  // File download links (file_path)
  const downloadItems = order?.items?.filter((item) => item.file_path) ?? [];
  const hasFileDownloads = isCompleted && !!order?.download_token && downloadItems.length > 0;

  return (
    <div className="min-h-screen bg-parchment flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
        className="max-w-lg w-full bg-cream rounded-2xl p-8 md:p-12 shadow-xl text-center"
      >
        {/* Success icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2, damping: 10, stiffness: 100 }}
          className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle className="w-10 h-10 text-emerald-600" />
        </motion.div>

        <h1 className="text-3xl font-display font-bold text-navy mb-3">
          Payment Successful!
        </h1>

        <p className="text-navy/70 mb-8">
          Thank you for your purchase. Your templates are ready below.
        </p>

        {/* Notion Template Links — show immediately once available */}
        {guideItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-navy/5 border border-navy/10 rounded-xl p-6 mb-6 text-left"
          >
            <h2 className="font-semibold text-navy mb-4 flex items-center gap-2">
              <ExternalLink className="w-5 h-5 text-cherry" />
              Your Notion Templates
            </h2>
            <div className="space-y-3">
              {guideItems.map((item, index) => (
                <a
                  key={index}
                  href={item.guide_url!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between bg-white rounded-lg px-4 py-3 border border-navy/10 hover:border-cherry/40 hover:shadow-sm transition-all group"
                >
                  <div>
                    <p className="text-navy font-medium text-sm">{item.name}</p>
                    <p className="text-navy/40 text-xs mt-0.5">Click to duplicate into your Notion</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-cherry flex-shrink-0 group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
            <p className="text-xs text-navy/50 mt-3">
              Bookmark these links. A copy is also on its way to your email.
            </p>
          </motion.div>
        )}

        {/* Polling indicator — shown while waiting for webhook confirmation */}
        {polling && guideItems.length === 0 && (
          <div className="bg-parchment/50 rounded-xl p-6 mb-6 flex items-center gap-3 text-left">
            <Loader2 className="w-5 h-5 text-cherry animate-spin flex-shrink-0" />
            <div>
              <p className="text-navy font-medium text-sm">Preparing your templates&hellip;</p>
              <p className="text-navy/50 text-xs mt-0.5">This takes just a moment</p>
            </div>
          </div>
        )}

        {/* File downloads (if any) */}
        {hasFileDownloads && (
          <div className="bg-parchment/50 rounded-xl p-6 mb-6 text-left">
            <h2 className="font-semibold text-navy mb-4 flex items-center gap-2">
              <Download className="w-5 h-5 text-cherry" />
              Your Downloads
            </h2>
            <div className="space-y-3">
              {downloadItems.map((item, index) => (
                <a
                  key={index}
                  href={`/api/downloads/${order!.download_token}${downloadItems.length > 1 ? `?item=${index}` : ''}`}
                  className="flex items-center justify-between bg-white rounded-lg px-4 py-3 border border-navy/10 hover:border-cherry/30 hover:shadow-sm transition-all group"
                >
                  <span className="text-navy font-medium text-sm">{item.name}</span>
                  <Download className="w-4 h-4 text-cherry group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>
        )}

        {/* What happens next */}
        <div className="bg-parchment/50 rounded-xl p-6 mb-8 text-left">
          <h2 className="font-semibold text-navy mb-4">What happens next?</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <ExternalLink className="w-5 h-5 text-cherry mt-0.5 flex-shrink-0" />
              <span className="text-navy/70 text-sm">
                Click your template link above to duplicate it into your Notion workspace
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-cherry mt-0.5 flex-shrink-0" />
              <span className="text-navy/70 text-sm">
                A confirmation email with your links is on its way — check your inbox (and spam folder)
              </span>
            </li>
          </ul>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Link href="/products" className="block">
            <Button variant="primary" size="lg" fullWidth className="rounded-full" rightIcon={<ArrowRight className="w-5 h-5" />}>
              Continue Shopping
            </Button>
          </Link>
          <Link href="/" className="block">
            <Button variant="ghost" size="lg" fullWidth className="rounded-full">
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Support */}
        <p className="text-sm text-navy/50 mt-8">
          Can&apos;t find your templates?{' '}
          <Link href="/orders/lookup" className="text-cherry hover:underline">
            Look up your order
          </Link>
          {' '}or{' '}
          <Link href="/contact" className="text-cherry hover:underline">
            contact support
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-parchment flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-cherry" /></div>}>
      <CheckoutSuccessContent />
    </Suspense>
  );
}
