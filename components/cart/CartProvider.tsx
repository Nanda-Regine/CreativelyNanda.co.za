'use client';

import { ReactNode } from 'react';
import { CartDrawer } from './CartDrawer';

interface CartProviderProps {
  children: ReactNode;
}

/**
 * CartProvider wraps the app to provide the cart drawer globally.
 * The Zustand store is automatically available via the useCartStore hook.
 * This component just renders the CartDrawer overlay.
 */
export function CartProvider({ children }: CartProviderProps) {
  return (
    <>
      {children}
      <CartDrawer />
    </>
  );
}

export default CartProvider;
