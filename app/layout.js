import './globals.css';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import NandaAI from '@/components/NandaAI';
import { NandaGirl } from '@/components/nanda-girl';
import { CartProvider } from '@/components/cart';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata = {
  title: 'Nanda | Creative Technologist',
  description: 'Portfolio of Nanda - Creative Technologist, Full-Stack Developer, Notion Systems Architect, and Published Poet',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable}`}>
      <body className="font-body">
        <CartProvider>
          <Navigation />
          <main className="min-h-screen pt-20">
            {children}
          </main>
          <Footer />
          <NandaGirl />
          <NandaAI />
        </CartProvider>
      </body>
    </html>
  );
}
