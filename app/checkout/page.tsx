'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Lock, ShoppingBag, CreditCard } from 'lucide-react';
import { Button, Input } from '@/components/ui';
import { useCartStore } from '@/components/cart';
import { formatPrice } from '@/lib/utils';

export default function CheckoutPage() {
  const { items, getTotal, clearCart } = useCartStore();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const [paymentData, setPaymentData] = useState<Record<string, string> | null>(null);
  const [checkoutUrl, setCheckoutUrl] = useState('');

  const total = getTotal();

  // Submit form when payment data is ready
  useEffect(() => {
    if (paymentData && checkoutUrl && formRef.current) {
      formRef.current.submit();
    }
  }, [paymentData, checkoutUrl]);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/payfast/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          customerEmail: email,
          customerName: name,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Checkout failed');
      }

      // Set payment data to trigger form submission
      setCheckoutUrl(data.checkoutUrl);
      setPaymentData(data.paymentData);

      // Clear cart after successful checkout initiation
      clearCart();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setIsLoading(false);
    }
  };

  if (items.length === 0 && !paymentData) {
    return (
      <div className="min-h-screen bg-parchment flex items-center justify-center px-4">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-navy/20 mx-auto mb-4" />
          <h1 className="text-2xl font-display font-semibold text-navy mb-2">
            Your cart is empty
          </h1>
          <p className="text-navy/60 mb-6">
            Add some products to your cart to checkout
          </p>
          <Link href="/products">
            <Button variant="primary" className="rounded-full">
              Browse Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-parchment py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back link */}
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-navy/60 hover:text-navy transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Continue shopping
        </Link>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Checkout Form */}
          <div className="md:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-cream rounded-2xl p-6 md:p-8 shadow-lg"
            >
              <h1 className="text-2xl font-display font-semibold text-navy mb-6">
                Checkout
              </h1>

              <form onSubmit={handleCheckout} className="space-y-6">
                <Input
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  fullWidth
                />

                <Input
                  label="Full Name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  fullWidth
                />

                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  loading={isLoading}
                  className="rounded-full"
                  leftIcon={<CreditCard className="w-5 h-5" />}
                >
                  {isLoading ? 'Processing...' : `Pay ${formatPrice(total)}`}
                </Button>

                {/* Trust badges */}
                <div className="flex items-center justify-center gap-2 text-sm text-navy/50 pt-4">
                  <Lock className="w-4 h-4" />
                  <span>Secured by PayFast</span>
                </div>
              </form>
            </motion.div>

            {/* Payment info */}
            <div className="mt-6 text-center text-sm text-navy/50">
              <p>You will be redirected to PayFast to complete your payment securely.</p>
              <p className="mt-2">
                Digital products are delivered instantly to your email after payment.
              </p>
            </div>
          </div>

          {/* Order Summary */}
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-cream rounded-2xl p-6 shadow-lg sticky top-24"
            >
              <h2 className="text-lg font-display font-semibold text-navy mb-4">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.product_id} className="flex gap-3">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item.thumbnail || '/assets/placeholder-product.jpg'}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-navy text-white text-xs rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-navy truncate">{item.name}</h3>
                      <p className="text-sm text-cherry font-semibold">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-navy/10 pt-4 space-y-2">
                <div className="flex justify-between text-navy/70">
                  <span>Subtotal</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-navy/70">
                  <span>Delivery</span>
                  <span className="text-emerald-600">Free (Digital)</span>
                </div>
                <div className="flex justify-between text-lg font-semibold text-navy pt-2 border-t border-navy/10">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              {/* Guarantee */}
              <div className="mt-6 p-4 bg-parchment/50 rounded-lg text-center">
                <p className="text-sm text-navy/70">
                  30-day money-back guarantee
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Hidden PayFast form */}
      {paymentData && checkoutUrl && (
        <form ref={formRef} action={checkoutUrl} method="POST" className="hidden">
          {Object.entries(paymentData).map(([key, value]) => (
            <input key={key} type="hidden" name={key} value={value} />
          ))}
        </form>
      )}
    </div>
  );
}
