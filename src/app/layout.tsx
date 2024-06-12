import type { Metadata } from 'next';
import { APP_NAME } from '@/config/site';
import { Inter as FontSans } from 'next/font/google';

import { cn } from '@/lib/utils';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AppProvider from '@/provider/AppProvider';

import './globals.css';

export const metadata: Metadata = {
  title: APP_NAME,
  // description: APP_NAME,
  icons: [
    {
      url: '/images/msgport32.png',
      sizes: '32x32',
      type: 'image/png',
      rel: 'icon'
    },
    {
      url: '/images/msgport48.png',
      sizes: '48x48',
      type: 'image/png',
      rel: 'icon'
    },
    {
      url: '/images/msgport96.png',
      sizes: '96x96',
      type: 'image/png',
      rel: 'icon'
    },
    {
      url: '/images/msgport192.png',
      sizes: '192x192',
      type: 'image/png',
      rel: 'icon'
    },
    {
      url: '/images/msgport512.png',
      sizes: '512x512',
      type: 'image/png',
      rel: 'icon'
    },
    {
      url: '/images/msgport167.png',
      sizes: '167x167',
      type: 'image/png',
      rel: 'apple-touch-icon'
    },
    {
      url: '/images/msgport180.png',
      sizes: '180x180',
      type: 'image/png',
      rel: 'apple-touch-icon'
    }
  ]
};

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
});

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
        <AppProvider>
          <div>
            <Header />
            <div
              className="container"
              style={{
                minHeight: 'calc(100vh - var(--header-height) - var(--footer-height))'
              }}
            >
              {children}
            </div>
            <Footer />
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
