'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, ArrowRight, Sparkles, Shield, Zap, Gift } from 'lucide-react';
import { cn, formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui';
import { useCartStore } from './cart-store';
import { CartItem } from './CartItem';

interface CartDrawerProps {
  className?: string;
}

export function CartDrawer({ className }: CartDrawerProps) {
  const { items, isOpen, closeCart, getTotal, clearCart } = useCartStore();
  const total = getTotal();

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeCart();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeCart]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleCheckout = async () => {
    // Navigate to checkout or trigger PayFast
    window.location.href = '/checkout';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-navy/60 backdrop-blur-md z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={cn(
              'fixed right-0 top-0 h-full w-full max-w-md bg-gradient-to-b from-cream via-cream to-beige shadow-2xl z-50 flex flex-col',
              className
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 bg-gradient-to-r from-navy to-navy/90 text-beige">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-cherry/20 rounded-full">
                  <ShoppingBag className="w-5 h-5 text-cherry" />
                </div>
                <div>
                  <h2 className="text-lg font-display font-bold">Your Cart</h2>
                  <span className="text-sm text-beige/70">{items.length} {items.length === 1 ? 'item' : 'items'}</span>
                </div>
              </div>
              <button
                onClick={closeCart}
                className="p-2 hover:bg-beige/10 rounded-full transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {items.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center h-full text-center px-6"
                >
                  <div className="w-24 h-24 bg-gradient-to-br from-cherry/10 to-navy/10 rounded-full flex items-center justify-center mb-6">
                    <ShoppingBag className="w-12 h-12 text-cherry/40" />
                  </div>
                  <p className="text-navy font-display text-xl font-semibold">Your cart is empty</p>
                  <p className="text-navy/50 text-sm mt-2 max-w-xs">
                    Discover amazing templates and tools to boost your productivity
                  </p>
                  <Button
                    variant="primary"
                    className="mt-8 rounded-full shadow-lg shadow-cherry/25"
                    leftIcon={<Sparkles className="w-4 h-4" />}
                    onClick={() => {
                      closeCart();
                      window.location.href = '/products';
                    }}
                  >
                    Explore Products
                  </Button>
                </motion.div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {items.map((item) => (
                    <CartItem key={item.product_id} item={item} />
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t-2 border-cherry/10 p-5 space-y-4 bg-gradient-to-b from-parchment to-beige">
                {/* Savings banner */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 p-3 bg-gradient-to-r from-cherry/10 to-cherry/5 rounded-xl border border-cherry/20"
                >
                  <Gift className="w-5 h-5 text-cherry" />
                  <span className="text-sm text-navy">
                    <span className="font-semibold">Instant delivery</span> after payment
                  </span>
                </motion.div>

                {/* Subtotal */}
                <div className="flex justify-between items-center py-3 border-y border-navy/10">
                  <span className="text-navy/70 font-medium">Subtotal</span>
                  <span className="text-2xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-cherry to-cherry/70">
                    {formatPrice(total)}
                  </span>
                </div>

                {/* Checkout button */}
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  className="rounded-full shadow-xl shadow-cherry/30 hover:shadow-2xl hover:shadow-cherry/40 transition-all"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </Button>

                {/* Clear cart */}
                <button
                  onClick={clearCart}
                  className="w-full text-center text-sm text-navy/40 hover:text-cherry transition-colors py-1"
                >
                  Clear cart
                </button>

                {/* Trust badges */}
                <div className="grid grid-cols-3 gap-2 pt-3">
                  <div className="flex flex-col items-center gap-1 p-2 bg-cream rounded-lg">
                    <Shield className="w-4 h-4 text-cherry" />
                    <span className="text-xs text-navy/60 text-center">Secure</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 p-2 bg-cream rounded-lg">
                    <Zap className="w-4 h-4 text-cherry" />
                    <span className="text-xs text-navy/60 text-center">Instant</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 p-2 bg-cream rounded-lg">
                    <Gift className="w-4 h-4 text-cherry" />
                    <span className="text-xs text-navy/60 text-center">30-day</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default CartDrawer;
