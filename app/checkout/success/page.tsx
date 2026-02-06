'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { CheckCircle, Mail, ArrowRight, Download } from 'lucide-react';
import { Button } from '@/components/ui';
import confetti from 'canvas-confetti';

export default function CheckoutSuccessPage() {
  // Trigger confetti on mount
  useEffect(() => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: NodeJS.Timeout = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      // since particles fall down, start a bit higher than random
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#C1292E', '#0A1128', '#E8DCC4', '#C9A961'],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#C1292E', '#0A1128', '#E8DCC4', '#C9A961'],
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

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
          Thank you for your purchase. Your order is being processed and you&apos;ll receive a confirmation email shortly.
        </p>

        {/* What happens next */}
        <div className="bg-parchment/50 rounded-xl p-6 mb-8 text-left">
          <h2 className="font-semibold text-navy mb-4">What happens next?</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-cherry mt-0.5 flex-shrink-0" />
              <span className="text-navy/70 text-sm">
                Check your email for the order confirmation and download links
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Download className="w-5 h-5 text-cherry mt-0.5 flex-shrink-0" />
              <span className="text-navy/70 text-sm">
                Digital products are delivered instantly via email
              </span>
            </li>
          </ul>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Link href="/products" className="block">
            <Button
              variant="primary"
              size="lg"
              fullWidth
              className="rounded-full"
              rightIcon={<ArrowRight className="w-5 h-5" />}
            >
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
          Need help?{' '}
          <Link href="/contact" className="text-cherry hover:underline">
            Contact support
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
