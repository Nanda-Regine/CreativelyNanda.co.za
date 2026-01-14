import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import NandaAI from '@/components/NandaAI';

export const metadata = {
  title: 'Nanda | Creative Technologist',
  description: 'Portfolio of Nanda - Creative Technologist, Full-Stack Developer, Notion Systems Architect, and Published Poet',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        <main className="min-h-screen pt-20">
          {children}
        </main>
        <Footer />
        <NandaAI />
      </body>
    </html>
  );
}