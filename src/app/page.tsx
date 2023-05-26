'use client';
import { DropDown } from '@/components';
import { trpc, successNotification, errorNotification } from '@/lib';
import Link from 'next/link';
import { SecretInput, RecordDropDown } from '@/features/secret';

export default function Home() {
  const secrets = trpc.secret.list.useQuery();

  return (
    <main className="w-full flex items-center justify-center">
      <div className="w-1/2 text-white py-8">
        <div className="w-full flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">secret send</h1>
          </div>
          <Link href="/about" className="text-xl">
            about
          </Link>
        </div>

        <div className="w-full flex flex-col mt-10 mb-6 gap-2">
          <label
            htmlFor="secret"
            className="block mb-4 text-3xl font-medium text-gray-900 dark:text-white"
          >
            Send secrets securely
          </label>
          <SecretInput />
        </div>

        <RecordDropDown />
      </div>
    </main>
  );
}
