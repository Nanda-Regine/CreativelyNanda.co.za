'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { cn, formatPrice } from '@/lib/utils';
import type { CartItem as CartItemType } from '@/types/database';
import { useCartStore } from './cart-store';

interface CartItemProps {
  item: CartItemType;
  className?: string;
}

export function CartItem({ item, className }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className={cn('flex gap-4 p-4 bg-parchment rounded-lg', className)}
    >
      {/* Thumbnail */}
      <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
        <Image
          src={item.thumbnail || '/assets/placeholder-product.jpg'}
          alt={item.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-navy truncate">{item.name}</h4>

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-cherry font-semibold">{formatPrice(item.price)}</span>
          {item.original_price && (
            <span className="text-sm text-navy/50 line-through">
              {formatPrice(item.original_price)}
            </span>
          )}
        </div>

        {/* Quantity controls */}
        <div className="flex items-center gap-3 mt-3">
          <div className="flex items-center border border-navy/20 rounded-full">
            <button
              onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
              className="p-1.5 hover:bg-navy/5 rounded-l-full transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4 text-navy" />
            </button>
            <span className="w-8 text-center text-sm font-medium text-navy">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
              className="p-1.5 hover:bg-navy/5 rounded-r-full transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4 text-navy" />
            </button>
          </div>

          <button
            onClick={() => removeItem(item.product_id)}
            className="p-1.5 text-navy/50 hover:text-cherry transition-colors"
            aria-label="Remove item"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Line total */}
      <div className="text-right">
        <span className="font-semibold text-navy">
          {formatPrice(item.price * item.quantity)}
        </span>
      </div>
    </motion.div>
  );
}

export default CartItem;
