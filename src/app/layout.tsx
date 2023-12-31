import Footer from '@/components/ui/Footer/Footer';
import Providers from '@/lib/Providers';
import { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'House Crafters',
  description: 'Generated by Tanvir Chowdhury',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang="en">
        <head>
          <link
            rel="icon"
            href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🏡</text></svg>"
          />
        </head>
        <body>
          <main className=" min-h-screen">{children}</main>
          <Footer />
        </body>
      </html>
    </Providers>
  );
}
