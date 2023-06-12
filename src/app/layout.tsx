'use client';
import { Inter } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import Link from 'next/link';
import { Analytics } from '@vercel/analytics/react';

import { trpc } from '@/lib';

import './globals.css';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] });

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <html lang="en" className={inter.className}>
        <head>
          <title>PrivNote v.2</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <meta
            name="description"
            content="Send encrypted messages that self-destruct after being read."
          />
          <link rel="icon" href="/favicon.ico" />
          <Analytics />
        </head>

        <body className="bg-neutral-900 min-w-screen min-h-screen">
          <ToastContainer />

          <main className="w-full flex items-center justify-center">
            <div className="w-11/12 lg:w-1/2 text-white py-8">
              <div className="w-full flex justify-between items-center">
                <div>
                  <Link href="/" className="text-xl font-bold">
                    send secrets securely
                  </Link>
                </div>
                <Link href="/about" className="text-xl">
                  how it works
                </Link>
              </div>

              <div className="w-full flex flex-col mt-10 mb-4 gap-2">
                <h1 className="block mb-4 text-3xl font-medium text-gray-900 dark:text-white">
                  PrivNote v.2
                </h1>
              </div>
              {children}
            </div>
          </main>
        </body>
      </html>
    </>
  );
}

export default trpc.withTRPC(RootLayout);
