import './globals.css';
import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
  title: 'StyleMuse - Fashion Discovery & Inspiration',
  description: 'Discover curated fashion inspiration and shop the latest trends. From streetwear to sustainable luxury, find your perfect style.',
  keywords: 'fashion, style, outfits, shopping, trends, sustainable fashion, streetwear',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
