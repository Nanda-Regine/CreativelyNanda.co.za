'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Search, ExternalLink, ArrowLeft, Mail, ShoppingBag, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui';

interface OrderItem {
  name: string;
  guide_url: string | null;
}

interface LookupOrder {
  id: string;
  amount: number;
  currency: string;
  created_at: string;
  items: OrderItem[];
}

export default function OrderLookupPage() {
  const [email, setEmail] = useState('');
  const [orders, setOrders] = useState<LookupOrder[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setOrders(null);
    setLoading(true);

    try {
      const res = await fetch('/api/orders/lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.');
        return;
      }

      setOrders(data.orders);
    } catch {
      setError('Could not reach the server. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }

  const hasOrders = orders !== null && orders.length > 0;
  const noOrders = orders !== null && orders.length === 0;

  return (
    <div className="min-h-screen bg-parchment px-4 py-16">
      <div className="max-w-lg mx-auto">

        <Link href="/products" className="inline-flex items-center gap-2 text-navy/50 hover:text-navy text-sm mb-10 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to products
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-cream rounded-2xl p-8 md:p-10 shadow-xl"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-navy/5 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-8 h-8 text-cherry" />
            </div>
            <h1 className="text-2xl font-display font-bold text-navy mb-2">
              Retrieve Your Templates
            </h1>
            <p className="text-navy/60 text-sm">
              Enter the email address you used at checkout to access your Notion template links.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-navy mb-2">
              Email address
            </label>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy/30" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-navy/15 bg-white text-navy placeholder:text-navy/30 focus:outline-none focus:ring-2 focus:ring-cherry/30 focus:border-cherry/40 transition-all text-sm"
                />
              </div>
              <Button
                type="submit"
                variant="primary"
                disabled={loading || !email}
                className="rounded-xl px-5 flex-shrink-0"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              </Button>
            </div>
          </form>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3 mb-6"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          {/* No orders found */}
          <AnimatePresence>
            {noOrders && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center py-6 text-navy/50 text-sm"
              >
                <p className="mb-1 font-medium text-navy/70">No completed orders found</p>
                <p>Double-check your email address, or{' '}
                  <Link href="/contact" className="text-cherry hover:underline">contact support</Link>
                  {' '}if you need help.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Orders list */}
          <AnimatePresence>
            {hasOrders && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-5"
              >
                <p className="text-sm text-navy/50 text-center">
                  {orders!.length} order{orders!.length !== 1 ? 's' : ''} found
                </p>

                {orders!.map((order) => {
                  const templateItems = order.items.filter((i) => i.guide_url);
                  return (
                    <div key={order.id} className="border border-navy/10 rounded-xl overflow-hidden">
                      {/* Order header */}
                      <div className="bg-navy/5 px-5 py-3 flex items-center justify-between">
                        <div>
                          <span className="text-xs text-navy/40 uppercase tracking-wide">Order</span>
                          <p className="font-mono font-semibold text-navy text-sm">#{order.id}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-navy/40">
                            {new Date(order.created_at).toLocaleDateString('en-ZA', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </p>
                          <p className="text-sm font-semibold text-navy">
                            R{(order.amount / 100).toFixed(2)}
                          </p>
                        </div>
                      </div>

                      {/* Template links */}
                      <div className="p-4 space-y-2">
                        {templateItems.length > 0 ? (
                          templateItems.map((item, i) => (
                            <a
                              key={i}
                              href={item.guide_url!}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between bg-parchment/60 hover:bg-parchment rounded-lg px-4 py-3 border border-navy/8 hover:border-cherry/30 hover:shadow-sm transition-all group"
                            >
                              <div>
                                <p className="text-navy font-medium text-sm">{item.name}</p>
                                <p className="text-navy/40 text-xs mt-0.5">Duplicate into Notion</p>
                              </div>
                              <ExternalLink className="w-4 h-4 text-cherry flex-shrink-0 group-hover:scale-110 transition-transform" />
                            </a>
                          ))
                        ) : (
                          <p className="text-navy/40 text-sm text-center py-2">
                            No template links found.{' '}
                            <Link href="/contact" className="text-cherry hover:underline">Contact support</Link>
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Support note */}
        <p className="text-center text-sm text-navy/40 mt-6">
          Still having trouble?{' '}
          <Link href="/contact" className="text-cherry hover:underline">
            Contact support
          </Link>
        </p>
      </div>
    </div>
  );
}
