'use client';
import { Inter } from 'next/font/google';
import { trpc } from '@/lib';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}

export default trpc.withTRPC(RootLayout);
