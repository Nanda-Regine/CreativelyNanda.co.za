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
      exit={{ opacity: 0, x: -100, scale: 0.9 }}
      whileHover={{ scale: 1.01 }}
      className={cn(
        'flex gap-4 p-4 bg-gradient-to-r from-parchment to-cream rounded-xl border border-cherry/10 shadow-sm hover:shadow-md transition-shadow',
        className
      )}
    >
      {/* Thumbnail */}
      <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 shadow-md">
        <Image
          src={item.thumbnail || '/assets/professional/nanda-consulting.jpg'}
          alt={item.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent" />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <h4 className="font-display font-semibold text-navy truncate">{item.name}</h4>

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-cherry font-bold">{formatPrice(item.price)}</span>
          {item.original_price && (
            <span className="text-xs text-navy/40 line-through">
              {formatPrice(item.original_price)}
            </span>
          )}
        </div>

        {/* Quantity controls */}
        <div className="flex items-center gap-3 mt-3">
          <div className="flex items-center bg-navy/5 border border-navy/10 rounded-full overflow-hidden">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
              className="p-1.5 hover:bg-cherry/10 transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5 text-navy" />
            </motion.button>
            <span className="w-8 text-center text-sm font-bold text-navy">
              {item.quantity}
            </span>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
              className="p-1.5 hover:bg-cherry/10 transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5 text-navy" />
            </motion.button>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => removeItem(item.product_id)}
            className="p-2 text-navy/40 hover:text-cherry hover:bg-cherry/10 rounded-full transition-all"
            aria-label="Remove item"
          >
            <Trash2 className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* Line total */}
      <div className="text-right flex flex-col justify-between">
        <span className="text-lg font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-navy to-navy/70">
          {formatPrice(item.price * item.quantity)}
        </span>
      </div>
    </motion.div>
  );
}

export default CartItem;
