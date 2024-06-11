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
  description: APP_NAME,
  icons: {
    icon: '/images/msgport512.png',
    shortcut: '/images/msgport192.png'
  }
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
