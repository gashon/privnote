'use client';
import { trpc } from '@/lib';
import { SecretContainer } from '@/features/secret/components/secret-container';
import { useSearchParams } from 'next/navigation';
import { errorNotification } from '@/lib';
import Link from 'next/link';

type SearchParamType = string | undefined;

export default function SecretPage() {
  const searchParams = useSearchParams();
  const key = searchParams?.get('key') as SearchParamType;
  const secret = searchParams?.get('secret') as SearchParamType;
  if (!key || !secret) return <p className="text-white">Invalid secret</p>;

  const { data, error } = trpc.secret.get.useQuery(
    {
      key: key!,
    },
    {
      enabled: !!key && !!secret,
      retry: false,
      refetchOnWindowFocus: false,
    },
  );

  if (error) {
    errorNotification(error.message);
  }
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
          <h1 className="block mb-4 text-3xl font-medium text-gray-900 dark:text-white">
            PrivNote v.2
          </h1>
        </div>

        <>
          {data?.token ? (
            <SecretContainer
              encryptedText={secret as string}
              token={data.token}
            />
          ) : (
            <p className="text-white">{error ? error.message : 'Loading...'}</p>
          )}
        </>
      </div>
    </main>
  );
}
