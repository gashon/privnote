'use client';
import { trpc } from '@/lib';
import Link from 'next/link';
import { SecretInput, RecordDropDown } from '@/features/secret';

export default function Home() {
  const secrets = trpc.secret.list.useQuery();

  return (
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

        <div className="w-full flex flex-col mt-10 mb-6 gap-2">
          <label
            htmlFor="secret"
            className="block mb-4 text-3xl font-medium text-gray-900 dark:text-white"
          >
            PrivNote v.2
          </label>
          <SecretInput />
        </div>

        <RecordDropDown />
      </div>
    </main>
  );
}
