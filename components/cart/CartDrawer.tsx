'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, ArrowRight } from 'lucide-react';
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
            className="fixed inset-0 bg-navy/50 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={cn(
              'fixed right-0 top-0 h-full w-full max-w-md bg-cream shadow-2xl z-50 flex flex-col',
              className
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-navy/10">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-navy" />
                <h2 className="text-lg font-display font-semibold text-navy">Your Cart</h2>
                <span className="text-sm text-navy/60">({items.length} items)</span>
              </div>
              <button
                onClick={closeCart}
                className="p-2 hover:bg-navy/5 rounded-full transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5 text-navy" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="w-16 h-16 text-navy/20 mb-4" />
                  <p className="text-navy/60 text-lg">Your cart is empty</p>
                  <p className="text-navy/40 text-sm mt-1">
                    Add some products to get started
                  </p>
                  <Button
                    variant="secondary"
                    className="mt-6 rounded-full"
                    onClick={() => {
                      closeCart();
                      window.location.href = '/products';
                    }}
                  >
                    Browse Products
                  </Button>
                </div>
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
              <div className="border-t border-navy/10 p-4 space-y-4 bg-parchment/50">
                {/* Subtotal */}
                <div className="flex justify-between items-center">
                  <span className="text-navy/70">Subtotal</span>
                  <span className="text-lg font-semibold text-navy">{formatPrice(total)}</span>
                </div>

                {/* Checkout button */}
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  className="rounded-full"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </Button>

                {/* Clear cart */}
                <button
                  onClick={clearCart}
                  className="w-full text-center text-sm text-navy/50 hover:text-cherry transition-colors"
                >
                  Clear cart
                </button>

                {/* Trust badges */}
                <div className="flex items-center justify-center gap-4 text-xs text-navy/40 pt-2">
                  <span>Secure checkout</span>
                  <span>•</span>
                  <span>Instant delivery</span>
                  <span>•</span>
                  <span>30-day guarantee</span>
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
