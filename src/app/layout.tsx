import { Inter } from 'next/font/google';
import { QueryClientProvider } from '@tanstack/react-query';
import { trpc, trpcClient, queryClient } from '@/lib';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Secret Send',
  description: 'Send secrets securely',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </trpc.Provider>
    </html>
  );
}
