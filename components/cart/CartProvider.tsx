'use client';

import { useEffect, ReactNode } from 'react';
import { CartDrawer } from './CartDrawer';
import { useCartStore } from './cart-store';

interface CartProviderProps {
  children: ReactNode;
}

/**
 * CartProvider wraps the app to provide the cart drawer globally.
 * Manually rehydrates the Zustand store from localStorage after mount
 * to avoid SSR/client hydration mismatches (React errors #418/#423).
 */
export function CartProvider({ children }: CartProviderProps) {
  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  return (
    <>
      {children}
      <CartDrawer />
    </>
  );
}

export default CartProvider;
