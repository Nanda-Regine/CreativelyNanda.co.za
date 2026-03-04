import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { CartItem } from '@/types/database';

interface CartState {
  items: CartItem[];
  isOpen: boolean;

  // Actions
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  // Computed
  getTotal: () => number;
  getItemCount: () => number;
  getItem: (productId: string) => CartItem | undefined;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item) => {
        // GA4: track add_to_cart
        if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
          window.gtag('event', 'add_to_cart', {
            currency: 'ZAR',
            value: item.price / 100,
            items: [{
              item_id: item.product_id,
              item_name: item.name,
              price: item.price / 100,
              quantity: 1,
            }],
          });
        }

        set((state) => {
          const existingItem = state.items.find((i) => i.product_id === item.product_id);

          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.product_id === item.product_id ? { ...i, quantity: i.quantity + 1 } : i
              ),
              isOpen: true,
            };
          }

          return {
            items: [...state.items, { ...item, quantity: 1 }],
            isOpen: true,
          };
        });
      },

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.product_id !== productId),
        })),

      updateQuantity: (productId, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return { items: state.items.filter((i) => i.product_id !== productId) };
          }
          return {
            items: state.items.map((i) =>
              i.product_id === productId ? { ...i, quantity } : i
            ),
          };
        }),

      clearCart: () => set({ items: [] }),

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      getTotal: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.price * item.quantity, 0);
      },

      getItemCount: () => {
        const { items } = get();
        return items.reduce((count, item) => count + item.quantity, 0);
      },

      getItem: (productId) => {
        const { items } = get();
        return items.find((i) => i.product_id === productId);
      },
    }),
    {
      name: 'nanda-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }), // Only persist items, not isOpen
      skipHydration: true, // Prevent SSR/client mismatch — CartProvider rehydrates after mount
    }
  )
);

// Selector hooks for optimized re-renders
export const useCartItems = () => useCartStore((state) => state.items);
export const useCartIsOpen = () => useCartStore((state) => state.isOpen);
export const useCartActions = () =>
  useCartStore((state) => ({
    addItem: state.addItem,
    removeItem: state.removeItem,
    updateQuantity: state.updateQuantity,
    clearCart: state.clearCart,
    openCart: state.openCart,
    closeCart: state.closeCart,
    toggleCart: state.toggleCart,
  }));
