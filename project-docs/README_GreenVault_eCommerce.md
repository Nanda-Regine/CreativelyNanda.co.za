# 🌿 GreenVault — Sustainable eCommerce Store Demo
### Full-Stack African Eco-Commerce | Conscious Shopping for a Conscious Continent

**Built by:** Nandawula Regine Kabali-Kagwa | [Mirembe Muse (Pty) Ltd](https://mirembemuse.co.za)  
**GitHub:** [github.com/Nanda-Regine/GreenValut-eCommerce-store-demo](https://github.com/Nanda-Regine/GreenValut-eCommerce-store-demo)  
**Live Demo:** *(Add Vercel URL)*  
**Category:** eCommerce / Full-Stack / Product Architecture  
**Stack:** React / Next.js · Supabase · Tailwind CSS · PayFast · Vercel

---

## 🎯 The Problem

Sustainable and eco-conscious products in South Africa exist — from natural hair care to organic food to ethically made textiles — but they are scattered across informal sellers, Instagram pages, and occasional market stalls. There is no curated, trustworthy digital marketplace that brings them together in a way that does justice to both the quality of the products and the values of the customers buying them.

---

## 💡 The Solution

GreenVault is a demonstration of what an African sustainable commerce platform can look like when design, values, and technical execution are aligned. It is built as a showcase of full eCommerce architecture — catalogue management, cart logic, checkout flow, payment integration, and order management — applied to a product category with meaning.

This project also serves as the technical prototype for the Mirembe Muse Store: the home of Nanda's own organic hair oil line and digital wellness products.

---

## 🛠️ Tech Stack

| Layer | Tool |
|-------|------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript / JavaScript |
| Database | Supabase (PostgreSQL + Storage) |
| Auth | Supabase Auth |
| Payments | PayFast — SA-native gateway (EFT, credit card, instant EFT) |
| Styling | Tailwind CSS — earth palette: forest green, terracotta, cream |
| Email | Resend — order confirmations + receipt automation |
| Hosting | Vercel |

---

## ✨ Key Features

**Shopping Experience:**
- Product catalogue with categories — Personal Care, Home, Food, Fashion, Digital
- Product detail pages — ingredients/materials, sustainability certifications, origin stories
- Search and filter — by category, price range, sustainability attribute (organic, fair-trade, local)
- Cart — add, remove, quantity adjust with real-time total
- Wishlist — save for later with persistent state
- Product reviews — verified purchase reviews with star ratings

**Checkout & Orders:**
- Guest checkout + account checkout
- PayFast integration — EFT, credit/debit card, instant EFT
- Order confirmation page + automated email receipt
- Digital product delivery — secure download links with expiry
- Order history dashboard for registered users

**Admin Panel:**
- Product management — add, edit, deactivate listings
- Inventory tracking — stock level alerts
- Order management — view, process, fulfil orders
- Revenue dashboard — daily/weekly/monthly breakdown

---

## 📐 Design Decisions

**Why an earth-toned design system?** Sustainable products deserve visual language that reflects their values. Greens, terracottas, creams, and natural textures communicate authenticity. A bright, saturated, fast-fashion colour palette would undermine the product positioning before a word was read.

**Why PayFast over Stripe?** South African consumers have a documented trust gap with international payment processors. PayFast's recognisability in the SA market reduces checkout abandonment. The fee structure is also significantly more favourable for small transactions in ZAR.

**Why Supabase Storage for product images?** Product photography needs CDN delivery, access control for digital goods, and admin upload capability without an external service. Supabase Storage with signed URLs handles all three.

---

## 🗃️ Data Model

```sql
products (id, name, slug, description, price, category_id, stock, digital, 
          sustainability_attrs[], origin, created_at)
categories (id, name, slug, description, image)
cart_items (id, session_id, product_id, quantity, added_at)
orders (id, user_id, email, total, status, payfast_ref, created_at)
order_items (id, order_id, product_id, quantity, unit_price)
reviews (id, product_id, user_id, rating, content, verified_purchase, created_at)
digital_downloads (id, order_item_id, download_url, expires_at, download_count)
```

---

## 🔄 Key User Flows

**Purchase Flow:**
1. Browse catalogue → product detail → add to cart
2. Cart review → apply discount code
3. Guest/account checkout → delivery details
4. PayFast payment → order confirmed
5. Email receipt + digital download link (if applicable)

**Digital Goods Flow:**
- PayFast ITN (Instant Transaction Notification) confirms payment server-side
- Signed Supabase Storage URL generated with 48h expiry
- Download link sent via Resend email
- Download count tracked; re-issue available via order history

---

## 📊 Case Study

**Project type:** eCommerce full-stack demo / prototype  
**Market:** South African sustainable products sector  
**Tech challenge:** Complete eCommerce architecture with SA payment gateway and digital goods delivery  
**Design challenge:** Visual identity that authentically represents sustainability values  

**What this demonstrates:**
- Full eCommerce system architecture — catalogue, cart, checkout, fulfilment
- SA payment gateway integration (PayFast) with ITN webhook handling
- Digital goods delivery with signed URL expiry
- Admin panel for product and order management
- Performance-optimised product catalogue with Supabase + Vercel Edge

---

## 🌱 Build Journey

GreenVault started as the honest answer to a question: *what would Mirembe Muse's e-commerce look like if it was built with the same care as the SaaS products?*

The technical foundation — PayFast integration, cart state management, digital goods delivery with signed URLs — is identical to what the Mirembe Muse Store will use in production. Building the demo first meant that the production implementation would not be figuring out webhook handling and ITN signature verification at launch. That work was already done.

The design process surfaced something important: the Mirembe Muse colour system (forest green, ancestral gold, cream) is inherently a sustainable brand palette. The GreenVault project validated that the same design system that works for a personal brand can anchor an entire product category. That consistency is now a feature of the broader portfolio — visual coherence across very different product types.

**Key technical lesson:** PayFast's ITN signature verification is critical and finicky. The signature string must be URL-encoded in a specific sequence with the passphrase appended and then MD5-hashed. Getting this wrong means silent payment failures. Getting it right means reliable, automated revenue. This pattern is now reused across every PayFast integration in the portfolio.

---

## 🔗 Related Projects

- [AdminOS](https://adminos.co.za) — SaaS: business OS with Xero invoicing for SA SMEs
- [StokvelOS](https://stokvelos.co.za) — Community finance — same PayFast integration pattern
- [CreativelyNanda.co.za](https://creativelynanda.co.za) — Portfolio + Mirembe Muse Store (live)

---

*Built with intention. Rooted in Ubuntu.*  
*Nandawula Regine Kabali-Kagwa — The Poet Who Codes*
