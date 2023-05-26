'use client';
import { Inter } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import { trpc } from '@/lib';

import './globals.css';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] });

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <html lang="en" className={inter.className}>
        <body className="bg-neutral-900 min-w-screen min-h-screen">
          <ToastContainer />

          {children}
        </body>
      </html>
    </>
  );
}

export default trpc.withTRPC(RootLayout);
