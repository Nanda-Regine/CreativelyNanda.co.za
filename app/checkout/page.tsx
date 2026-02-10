'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  Lock,
  ShoppingBag,
  CreditCard,
  Shield,
  Zap,
  Gift,
  Sparkles,
  CheckCircle,
} from 'lucide-react';
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

  // GA4: track begin_checkout when page loads with items
  useEffect(() => {
    if (items.length > 0 && typeof window.gtag === 'function') {
      window.gtag('event', 'begin_checkout', {
        currency: 'ZAR',
        value: getTotal() / 100,
        items: items.map((item) => ({
          item_id: item.product_id,
          item_name: item.name,
          price: item.price / 100,
          quantity: item.quantity,
        })),
      });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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

      // GA4: track add_payment_info event
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'add_payment_info', {
          currency: 'ZAR',
          value: total / 100,
          payment_type: 'PayFast',
          items: items.map((item) => ({
            item_id: item.product_id,
            item_name: item.name,
            price: item.price / 100,
            quantity: item.quantity,
          })),
        });
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
      <div className="min-h-screen bg-navy flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-24 h-24 bg-cherry/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-12 h-12 text-cherry" />
          </div>
          <h1 className="text-3xl font-display font-bold text-beige mb-3">
            Your cart is empty
          </h1>
          <p className="text-beige/60 mb-8 max-w-sm mx-auto">
            Discover premium templates and tools to boost your productivity
          </p>
          <Link href="/products">
            <Button variant="primary" size="lg" className="rounded-full">
              <Sparkles className="w-5 h-5 mr-2" />
              Browse Products
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy">
      {/* Header */}
      <div className="bg-gradient-to-b from-navy to-navy/95 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-beige/60 hover:text-beige transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue shopping
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-cherry to-pink-500 rounded-2xl flex items-center justify-center">
              <CreditCard className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold text-beige">Checkout</h1>
              <p className="text-beige/60">{items.length} {items.length === 1 ? 'item' : 'items'} in your cart</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-5 gap-10">
          {/* Checkout Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3"
          >
            <div className="bg-gradient-to-b from-parchment to-cream rounded-3xl p-8 shadow-2xl">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 bg-cherry rounded-full flex items-center justify-center text-white font-bold text-sm">
                  1
                </div>
                <h2 className="text-xl font-display font-bold text-navy">
                  Your Details
                </h2>
              </div>

              <form onSubmit={handleCheckout} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-navy/70 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="w-full px-5 py-4 bg-white border-2 border-navy/10 rounded-xl text-navy placeholder:text-navy/40 focus:outline-none focus:border-cherry focus:ring-2 focus:ring-cherry/20 transition-all"
                  />
                  <p className="text-xs text-navy/50 mt-2">
                    Your purchase will be delivered to this email
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy/70 mb-2">
                    Full Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    className="w-full px-5 py-4 bg-white border-2 border-navy/10 rounded-xl text-navy placeholder:text-navy/40 focus:outline-none focus:border-cherry focus:ring-2 focus:ring-cherry/20 transition-all"
                  />
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm"
                  >
                    {error}
                  </motion.div>
                )}

                <div className="pt-4">
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-gradient-to-r from-cherry to-cherry-dark text-white rounded-full font-bold text-lg shadow-xl shadow-cherry/30 hover:shadow-2xl hover:shadow-cherry/40 transition-all disabled:opacity-70"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Lock className="w-5 h-5" />
                        Pay {formatPrice(total)} Securely
                      </>
                    )}
                  </motion.button>
                </div>

                {/* Security badges */}
                <div className="flex items-center justify-center gap-6 pt-4 text-sm text-navy/50">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    <span>256-bit SSL</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    <span>PayFast Secured</span>
                  </div>
                </div>
              </form>
            </div>

            {/* Payment info */}
            <div className="mt-8 p-6 bg-navy/5 rounded-2xl">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-navy mb-1">Instant Digital Delivery</h3>
                  <p className="text-sm text-navy/60">
                    After payment, you'll receive your products instantly via email.
                    All digital products include lifetime access and free updates.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="bg-gradient-to-b from-parchment to-cream rounded-3xl p-6 shadow-2xl sticky top-24">
              <h2 className="text-lg font-display font-bold text-navy mb-6 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-cherry" />
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                {items.map((item, index) => (
                  <motion.div
                    key={item.product_id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex gap-4 p-3 bg-white rounded-xl"
                  >
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gradient-to-br from-cherry/20 to-pink-500/20 flex items-center justify-center">
                      <span className="text-2xl">
                        {item.name.includes('NSFAS') ? '📚' :
                         item.name.includes('Varsity') ? '🎓' :
                         item.name.includes('Freelancer') ? '💼' :
                         item.name.includes('SME') ? '📊' :
                         item.name.includes('Salon') ? '💇' :
                         item.name.includes('Matric') ? '📖' :
                         item.name.includes('Roses') ? '🌹' :
                         item.name.includes('Poetry') ? '✍️' : '📦'}
                      </span>
                      {item.quantity > 1 && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-navy text-white text-xs rounded-full flex items-center justify-center font-bold">
                          {item.quantity}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-navy truncate">{item.name}</h3>
                      <p className="text-sm text-navy/50">Digital Product</p>
                      <p className="text-cherry font-bold mt-1">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="border-t-2 border-navy/10 pt-4 space-y-3">
                <div className="flex justify-between text-navy/70">
                  <span>Subtotal</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-navy/70">
                  <span>Delivery</span>
                  <span className="text-emerald-600 font-medium">Free (Instant)</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-navy pt-3 border-t border-navy/10">
                  <span>Total</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cherry to-pink-500">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-2 mt-6 pt-6 border-t border-navy/10">
                {[
                  { icon: Shield, label: 'Secure', sublabel: 'Payment' },
                  { icon: Zap, label: 'Instant', sublabel: 'Delivery' },
                  { icon: Gift, label: '30-Day', sublabel: 'Guarantee' },
                ].map((item) => (
                  <div key={item.label} className="text-center p-3 bg-white rounded-xl">
                    <item.icon className="w-5 h-5 text-cherry mx-auto mb-1" />
                    <p className="text-xs font-semibold text-navy">{item.label}</p>
                    <p className="text-xs text-navy/50">{item.sublabel}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
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
