# 💳 PAYFAST INTEGRATION GUIDE
## For Claude Code - CreativelyNanda.co.za

**Version:** 1.0  
**Date:** February 5, 2026  
**API Docs:** https://developers.payfast.co.za/api

---

## 📋 TABLE OF CONTENTS

1. [Environment Setup](#environment-setup)
2. [Cart System Architecture](#cart-system-architecture)
3. [Theme-Aware Cart Styling](#theme-aware-cart-styling)
4. [PayFast Checkout Flow](#payfast-checkout-flow)
5. [API Routes Structure](#api-routes-structure)
6. [Security & Validation](#security--validation)
7. [Testing Checklist](#testing-checklist)

---

## 1. ENVIRONMENT SETUP

### Required Environment Variables

```env
# PayFast Configuration
PAYFAST_MERCHANT_ID=10012209
PAYFAST_MERCHANT_KEY=m3kvdexbqz52j
PAYFAST_PASSPHRASE=YourSecurePassphraseHere
PAYFAST_SANDBOX_MODE=true

# URLs
NEXT_PUBLIC_SITE_URL=https://creativelynanda.co.za
PAYFAST_RETURN_URL=https://creativelynanda.co.za/success
PAYFAST_CANCEL_URL=https://creativelynanda.co.za/cancel
PAYFAST_NOTIFY_URL=https://creativelynanda.co.za/api/webhooks/payfast
```

### PayFast Sandbox Credentials (For Testing)
- Merchant ID: `10012209` (sandbox)
- Merchant Key: `m3kvdexbqz52j` (sandbox)
- Test Card: Use PayFast's test card numbers
- Sandbox URL: https://sandbox.payfast.co.za/eng/process

---

## 2. CART SYSTEM ARCHITECTURE

### Overview: "Grain Cart" - Unified Shopping System

The cart must handle products from ALL sections of the site in ONE unified cart:
- Notion templates (Student, Business, Creative categories)
- Poetry books (physical + digital)
- Digital downloads (AI prompts, code snippets, etc.)
- Future: Mirembe products (when full site launches)
- Future: Course enrollments

### Cart Data Structure

```typescript
// types/cart.ts

export type ProductCategory = 
  | 'notion-template'
  | 'poetry-book'
  | 'ai-prompt'
  | 'code-snippet'
  | 'website-template'
  | 'operations-manual'
  | 'bundle'
  | 'mirembe-product' // For future
  | 'course'; // For future

export type ProductTheme = 
  | 'student'      // Vibrant, youthful
  | 'business'     // Professional, corporate
  | 'creative'     // Artistic, colorful
  | 'poetry'       // Elegant, literary
  | 'mirembe'      // Natural, botanical
  | 'dev'          // Dark mode, tech
  | 'default';     // Navy/beige brand

export interface CartItem {
  id: string;
  product_id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  theme: ProductTheme;
  image_url: string;
  quantity: number;
  
  // Product-specific metadata
  metadata: {
    notion_template_id?: string;
    download_url?: string;
    file_format?: string;
    bundle_items?: string[];
    requires_shipping?: boolean;
  };
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  currency: 'ZAR';
  discount_code?: string;
}
```

### Cart Store (Zustand)

```typescript
// lib/store/cart-store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Cart, CartItem } from '@/types/cart';

interface CartStore extends Cart {
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  applyDiscount: (code: string) => Promise<void>;
  clearCart: () => void;
  getThemeBreakdown: () => Record<string, CartItem[]>;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      subtotal: 0,
      discount: 0,
      total: 0,
      currency: 'ZAR',
      
      addItem: (item) => {
        const items = get().items;
        const existingItem = items.find(i => i.product_id === item.product_id);
        
        let newItems;
        if (existingItem) {
          // Update quantity if item exists
          newItems = items.map(i =>
            i.product_id === item.product_id
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          );
        } else {
          // Add new item
          newItems = [...items, item];
        }
        
        const subtotal = newItems.reduce(
          (sum, i) => sum + (i.price * i.quantity),
          0
        );
        
        set({
          items: newItems,
          subtotal,
          total: subtotal - get().discount,
        });
      },
      
      removeItem: (productId) => {
        const newItems = get().items.filter(i => i.product_id !== productId);
        const subtotal = newItems.reduce(
          (sum, i) => sum + (i.price * i.quantity),
          0
        );
        
        set({
          items: newItems,
          subtotal,
          total: subtotal - get().discount,
        });
      },
      
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        
        const newItems = get().items.map(i =>
          i.product_id === productId ? { ...i, quantity } : i
        );
        
        const subtotal = newItems.reduce(
          (sum, i) => sum + (i.price * i.quantity),
          0
        );
        
        set({
          items: newItems,
          subtotal,
          total: subtotal - get().discount,
        });
      },
      
      applyDiscount: async (code) => {
        // Call API to validate discount code
        const response = await fetch('/api/discounts/validate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code, subtotal: get().subtotal }),
        });
        
        if (response.ok) {
          const { discount_amount } = await response.json();
          set({
            discount: discount_amount,
            discount_code: code,
            total: get().subtotal - discount_amount,
          });
        }
      },
      
      clearCart: () => {
        set({
          items: [],
          subtotal: 0,
          discount: 0,
          total: 0,
          discount_code: undefined,
        });
      },
      
      getThemeBreakdown: () => {
        const items = get().items;
        return items.reduce((acc, item) => {
          if (!acc[item.theme]) {
            acc[item.theme] = [];
          }
          acc[item.theme].push(item);
          return acc;
        }, {} as Record<string, CartItem[]>);
      },
    }),
    {
      name: 'nanda-cart-storage',
    }
  )
);
```

---

## 3. THEME-AWARE CART STYLING

### Cart Component with Theme Sections

```tsx
// components/cart/cart-drawer.tsx
'use client';

import { useCartStore } from '@/lib/store/cart-store';
import { X, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CartThemeSection } from './cart-theme-section';

const THEME_CONFIG = {
  student: {
    gradient: 'from-purple-50 to-pink-50',
    accentColor: 'text-purple-600',
    borderColor: 'border-purple-200',
  },
  business: {
    gradient: 'from-slate-50 to-gray-50',
    accentColor: 'text-slate-700',
    borderColor: 'border-slate-300',
  },
  creative: {
    gradient: 'from-orange-50 to-yellow-50',
    accentColor: 'text-orange-600',
    borderColor: 'border-orange-200',
  },
  poetry: {
    gradient: 'from-rose-50 to-amber-50',
    accentColor: 'text-rose-700',
    borderColor: 'border-rose-300',
  },
  mirembe: {
    gradient: 'from-green-50 to-emerald-50',
    accentColor: 'text-green-700',
    borderColor: 'border-green-300',
  },
  dev: {
    gradient: 'from-gray-900 to-slate-900',
    accentColor: 'text-cyan-400',
    borderColor: 'border-cyan-700',
  },
  default: {
    gradient: 'from-beige to-parchment',
    accentColor: 'text-navy',
    borderColor: 'border-navy',
  },
};

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, subtotal, discount, total, getThemeBreakdown } = useCartStore();
  const themeBreakdown = getThemeBreakdown();
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-50"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6 text-navy" />
                <div>
                  <h2 className="text-xl font-display font-semibold text-navy">
                    Your Cart
                  </h2>
                  <p className="text-sm text-gray-600">
                    {items.length} {items.length === 1 ? 'item' : 'items'}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Cart Items (Grouped by Theme) */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-600">Your cart is empty</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Add some amazing products!
                  </p>
                </div>
              ) : (
                <>
                  {Object.entries(themeBreakdown).map(([theme, items]) => (
                    <CartThemeSection
                      key={theme}
                      theme={theme}
                      items={items}
                      config={THEME_CONFIG[theme as keyof typeof THEME_CONFIG]}
                    />
                  ))}
                </>
              )}
            </div>
            
            {/* Footer - Totals & Checkout */}
            {items.length > 0 && (
              <div className="border-t border-gray-200 p-6 space-y-4 bg-beige/30">
                {/* Subtotal */}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">R{subtotal.toFixed(2)}</span>
                </div>
                
                {/* Discount */}
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount</span>
                    <span>-R{discount.toFixed(2)}</span>
                  </div>
                )}
                
                {/* Total */}
                <div className="flex justify-between text-lg font-display font-semibold text-navy pt-4 border-t border-gray-200">
                  <span>Total</span>
                  <span>R{total.toFixed(2)}</span>
                </div>
                
                {/* Checkout Button */}
                <form action="/api/checkout/payfast" method="POST">
                  <button
                    type="submit"
                    className="w-full bg-cherry hover:bg-cherry/90 text-white font-semibold py-4 rounded-lg transition-colors"
                  >
                    Proceed to Checkout
                  </button>
                </form>
                
                <p className="text-xs text-center text-gray-500">
                  Secure checkout powered by PayFast
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
```

### Theme Section Component

```tsx
// components/cart/cart-theme-section.tsx
'use client';

import { CartItem } from '@/types/cart';
import { CartItemCard } from './cart-item-card';

interface CartThemeSectionProps {
  theme: string;
  items: CartItem[];
  config: {
    gradient: string;
    accentColor: string;
    borderColor: string;
  };
}

const THEME_LABELS = {
  student: '🎓 Student Success',
  business: '💼 Business Tools',
  creative: '🎨 Creative Resources',
  poetry: '🌹 Poetry & Literature',
  mirembe: '🌿 Mirembe Muse',
  dev: '💻 Developer Tools',
  default: '📦 Products',
};

export function CartThemeSection({ theme, items, config }: CartThemeSectionProps) {
  return (
    <div className={`rounded-xl border-2 ${config.borderColor} overflow-hidden`}>
      {/* Section Header */}
      <div className={`bg-gradient-to-r ${config.gradient} px-4 py-3 border-b ${config.borderColor}`}>
        <h3 className={`font-semibold ${config.accentColor}`}>
          {THEME_LABELS[theme as keyof typeof THEME_LABELS] || 'Products'}
        </h3>
        <p className="text-xs text-gray-600 mt-1">
          {items.length} {items.length === 1 ? 'item' : 'items'}
        </p>
      </div>
      
      {/* Items */}
      <div className="p-4 space-y-3 bg-white">
        {items.map((item) => (
          <CartItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
```

---

## 4. PAYFAST CHECKOUT FLOW

### Step 1: Checkout API Route

```typescript
// app/api/checkout/payfast/route.ts
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();
    
    // Get user session (if logged in)
    const { data: { session } } = await supabase.auth.getSession();
    
    // Get cart data from request
    const { items, total, customer } = await request.json();
    
    // Create order in database
    const { data: order, error } = await supabase
      .from('orders')
      .insert({
        user_id: session?.user?.id || null,
        customer_email: customer.email,
        customer_name: `${customer.first_name} ${customer.last_name}`,
        items: items,
        subtotal: items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0),
        total: total,
        status: 'pending',
        payment_method: 'payfast',
      })
      .select()
      .single();
    
    if (error) throw error;
    
    // Prepare PayFast payment data
    const paymentData = {
      // Merchant details
      merchant_id: process.env.PAYFAST_MERCHANT_ID!,
      merchant_key: process.env.PAYFAST_MERCHANT_KEY!,
      return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?order_id=${order.id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cancel`,
      notify_url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/webhooks/payfast`,
      
      // Order details
      m_payment_id: order.id,
      amount: total.toFixed(2),
      item_name: `Order #${order.order_number}`,
      item_description: `${items.length} item(s) from CreativelyNanda`,
      
      // Customer details
      name_first: customer.first_name,
      name_last: customer.last_name,
      email_address: customer.email,
      
      // Optional
      email_confirmation: '1',
      confirmation_address: customer.email,
    };
    
    // Generate signature
    const signature = generateSignature(paymentData);
    
    // Return PayFast form data
    return NextResponse.json({
      success: true,
      paymentUrl: process.env.PAYFAST_SANDBOX_MODE === 'true'
        ? 'https://sandbox.payfast.co.za/eng/process'
        : 'https://www.payfast.co.za/eng/process',
      paymentData: {
        ...paymentData,
        signature,
      },
    });
    
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to initiate checkout' },
      { status: 500 }
    );
  }
}

// Generate PayFast signature
function generateSignature(data: Record<string, string>, passPhrase?: string) {
  // Create parameter string
  let pfOutput = '';
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      if (data[key] !== '') {
        pfOutput += `${key}=${encodeURIComponent(data[key]).replace(/%20/g, '+')}&`;
      }
    }
  }
  
  // Remove last ampersand
  let getString = pfOutput.slice(0, -1);
  
  // Append passphrase if provided
  if (passPhrase) {
    getString += `&passphrase=${encodeURIComponent(passPhrase).replace(/%20/g, '+')}`;
  }
  
  // Generate MD5 signature
  return crypto.createHash('md5').update(getString).digest('hex');
}
```

### Step 2: Checkout Button Component

```tsx
// components/cart/checkout-button.tsx
'use client';

import { useState } from 'react';
import { useCartStore } from '@/lib/store/cart-store';
import { Loader2 } from 'lucide-react';

interface CheckoutFormData {
  first_name: string;
  last_name: string;
  email: string;
}

export function CheckoutButton() {
  const { items, total } = useCartStore();
  const [isLoading, setIsLoading] = useState(false);
  const [customerData, setCustomerData] = useState<CheckoutFormData>({
    first_name: '',
    last_name: '',
    email: '',
  });
  
  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Call checkout API
      const response = await fetch('/api/checkout/payfast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          total,
          customer: customerData,
        }),
      });
      
      if (!response.ok) throw new Error('Checkout failed');
      
      const { paymentUrl, paymentData } = await response.json();
      
      // Create form and submit to PayFast
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = paymentUrl;
      
      Object.entries(paymentData).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value as string;
        form.appendChild(input);
      });
      
      document.body.appendChild(form);
      form.submit();
      
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to proceed to checkout. Please try again.');
      setIsLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleCheckout} className="space-y-4">
      {/* Customer Details Form */}
      <div className="space-y-3">
        <input
          type="text"
          placeholder="First Name"
          required
          value={customerData.first_name}
          onChange={(e) => setCustomerData({ ...customerData, first_name: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent"
        />
        <input
          type="text"
          placeholder="Last Name"
          required
          value={customerData.last_name}
          onChange={(e) => setCustomerData({ ...customerData, last_name: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent"
        />
        <input
          type="email"
          placeholder="Email Address"
          required
          value={customerData.email}
          onChange={(e) => setCustomerData({ ...customerData, email: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent"
        />
      </div>
      
      {/* Checkout Button */}
      <button
        type="submit"
        disabled={isLoading || items.length === 0}
        className="w-full bg-cherry hover:bg-cherry/90 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Processing...
          </>
        ) : (
          `Pay R${total.toFixed(2)}`
        )}
      </button>
      
      <p className="text-xs text-center text-gray-500">
        🔒 Secure checkout powered by PayFast
      </p>
    </form>
  );
}
```

---

## 5. API ROUTES STRUCTURE

### Required API Routes

```
/api/
├── checkout/
│   └── payfast/
│       └── route.ts          # Initiate PayFast checkout
├── webhooks/
│   └── payfast/
│       └── route.ts          # Handle payment notifications
├── orders/
│   ├── route.ts              # Get user orders
│   └── [id]/
│       └── route.ts          # Get specific order
└── discounts/
    └── validate/
        └── route.ts          # Validate discount codes
```

### Discount Validation Route

```typescript
// app/api/discounts/validate/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const { code, subtotal } = await request.json();
    const supabase = createClient();
    
    // Check if discount code exists and is valid
    const { data: discount, error } = await supabase
      .from('discount_codes')
      .select('*')
      .eq('code', code.toUpperCase())
      .eq('active', true)
      .single();
    
    if (error || !discount) {
      return NextResponse.json(
        { error: 'Invalid discount code' },
        { status: 400 }
      );
    }
    
    // Check expiry date
    if (discount.expires_at && new Date(discount.expires_at) < new Date()) {
      return NextResponse.json(
        { error: 'This discount code has expired' },
        { status: 400 }
      );
    }
    
    // Check usage limit
    if (discount.max_uses && discount.times_used >= discount.max_uses) {
      return NextResponse.json(
        { error: 'This discount code has reached its usage limit' },
        { status: 400 }
      );
    }
    
    // Calculate discount amount
    let discount_amount = 0;
    
    if (discount.type === 'percentage') {
      discount_amount = (subtotal * discount.value) / 100;
      
      // Check max discount cap
      if (discount.max_discount && discount_amount > discount.max_discount) {
        discount_amount = discount.max_discount;
      }
    } else if (discount.type === 'fixed') {
      discount_amount = Math.min(discount.value, subtotal);
    }
    
    return NextResponse.json({
      success: true,
      discount_amount,
      discount_code: code.toUpperCase(),
    });
    
  } catch (error) {
    console.error('Discount validation error:', error);
    return NextResponse.json(
      { error: 'Failed to validate discount code' },
      { status: 500 }
    );
  }
}
```

---

## 6. SECURITY & VALIDATION

### PayFast Signature Verification

```typescript
// lib/payfast/verify-signature.ts
import crypto from 'crypto';

export function verifyPayFastSignature(
  postData: Record<string, string>,
  receivedSignature: string,
  passPhrase?: string
): boolean {
  // Create parameter string (excluding signature)
  const pfParamString = Object.keys(postData)
    .filter(key => key !== 'signature')
    .sort()
    .map(key => `${key}=${encodeURIComponent(postData[key]).replace(/%20/g, '+')}`)
    .join('&');
  
  // Append passphrase if provided
  let paramString = pfParamString;
  if (passPhrase) {
    paramString += `&passphrase=${encodeURIComponent(passPhrase).replace(/%20/g, '+')}`;
  }
  
  // Generate signature
  const calculatedSignature = crypto
    .createHash('md5')
    .update(paramString)
    .digest('hex');
  
  return calculatedSignature === receivedSignature;
}
```

### IP Address Verification

```typescript
// lib/payfast/verify-ip.ts

// PayFast valid IP addresses
const PAYFAST_IPS = [
  '197.97.145.144',
  '197.97.145.145',
  '197.97.145.146',
  '197.97.145.147',
];

const PAYFAST_SANDBOX_IPS = [
  '197.97.145.144', // Sandbox uses same IPs
];

export function isPayFastIP(ip: string, sandbox = false): boolean {
  const validIPs = sandbox ? PAYFAST_SANDBOX_IPS : PAYFAST_IPS;
  return validIPs.includes(ip);
}
```

### Server Validation

```typescript
// lib/payfast/validate-payment.ts

export async function validatePaymentWithPayFast(
  paymentId: string,
  sandbox = false
): Promise<boolean> {
  const host = sandbox 
    ? 'sandbox.payfast.co.za'
    : 'www.payfast.co.za';
  
  try {
    const response = await fetch(`https://${host}/eng/query/validate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        merchant_id: process.env.PAYFAST_MERCHANT_ID!,
        version: 'v1',
        m_payment_id: paymentId,
      }),
    });
    
    const text = await response.text();
    return text.includes('VALID');
    
  } catch (error) {
    console.error('PayFast validation error:', error);
    return false;
  }
}
```

---

## 7. TESTING CHECKLIST

### Before Going Live

- [ ] Test sandbox checkout flow
- [ ] Test successful payment
- [ ] Test failed payment
- [ ] Test cancelled payment
- [ ] Verify webhook receives notification
- [ ] Verify signature validation works
- [ ] Test discount codes
- [ ] Test cart persistence across sessions
- [ ] Test theme-specific styling
- [ ] Test mobile responsiveness
- [ ] Verify email notifications sent
- [ ] Test order tracking
- [ ] Verify digital download delivery
- [ ] Test multiple products in one order
- [ ] Switch to production credentials
- [ ] Final smoke test on production

### PayFast Test Cards (Sandbox)

```
Test Card Number: 4000 0000 0000 0002
CVV: Any 3 digits
Expiry: Any future date
Name: Test User
```

---

## 📝 IMPLEMENTATION NOTES FOR CLAUDE CODE

1. **Cart must persist across sessions** - use Zustand persist middleware
2. **Theme styling is automatic** - cart detects product theme and groups accordingly
3. **All products use same checkout** - no separate checkout per product type
4. **Signature verification is critical** - always verify webhook signatures
5. **Test in sandbox first** - use sandbox.payfast.co.za for all testing
6. **Email confirmations required** - send purchase confirmation + download links
7. **Order tracking essential** - users must be able to view order status
8. **Mobile-first design** - cart drawer must work perfectly on mobile

---

**End of PayFast Integration Guide**