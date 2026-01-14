import './globals.css';
import Navigation from '@/components/Navigation';

export const metadata = {
  title: 'Nanda | Creative Technologist',
  description: 'Portfolio of Nanda - Creative Technologist, Designer, and Poet',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        <main className="min-h-screen pt-20">
          {children}
        </main>
      </body>
    </html>
  );
}