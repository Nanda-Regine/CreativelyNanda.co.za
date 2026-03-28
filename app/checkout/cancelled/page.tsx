'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { XCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui';

export default function CheckoutCancelledPage() {
  return (
    <div className="min-h-screen bg-parchment flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-lg w-full bg-cream rounded-2xl p-8 md:p-12 shadow-xl text-center"
      >
        {/* Cancelled icon */}
        <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-10 h-10 text-amber-600" />
        </div>

        <h1 className="text-3xl font-display font-bold text-navy mb-3">
          Payment Cancelled
        </h1>

        <p className="text-navy/70 mb-8">
          Your payment was cancelled and no charges were made. Your cart items are still saved if you&apos;d like to try again.
        </p>

        {/* Actions */}
        <div className="space-y-3">
          <Link href="/checkout" className="block">
            <Button
              variant="primary"
              size="lg"
              fullWidth
              className="rounded-full"
              leftIcon={<RefreshCw className="w-5 h-5" />}
            >
              Try Again
            </Button>
          </Link>

          <Link href="/products" className="block">
            <Button
              variant="secondary"
              size="lg"
              fullWidth
              className="rounded-full"
              leftIcon={<ArrowLeft className="w-5 h-5" />}
            >
              Continue Shopping
            </Button>
          </Link>
        </div>

        {/* Help text */}
        <div className="mt-8 p-4 bg-parchment/50 rounded-lg">
          <p className="text-sm text-navy/60">
            Having trouble with payment? Try a different payment method or{' '}
            <Link href="/contact" className="text-cherry hover:underline">
              contact us
            </Link>{' '}
            for assistance.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
