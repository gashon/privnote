'use client';
import { Inter } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import Link from 'next/link';
import { Analytics } from "@gashon/analytics";


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
          <Analytics
            apiKey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JfaWQiOiJlOWJhM2U0ZC0yOTI4LTQxZTYtOTQ2ZS1lNTAwZWUyNzRkYTciLCJwcm9qZWN0X2lkIjoiNDE3OGYwOWMtMTFmZi00YTZjLWI0ZDQtMDBiMjhhNmM2OGI4IiwiY3JlYXRlZF9hdCI6IjIwMjQtMDEtMTBUMDM6NTY6NDEuMzIzWiIsImlhdCI6MTcwNDg1OTAwMX0.ZvZAyQlvvh5SGyZVo4BgomOPmjR6gpa6dSZmsQfkZZg"
            endpoint="https://analytics-fawn-nine.vercel.app/api/analytics"
            disableOnDev
            trackSession
            fingerprintBrowser
            trackClickEvents
          // metadata={referer ? { referer } : {}}
          />

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
