'use client';
import { trpc } from '@/lib';
import { SecretContainer } from '@/features/secret/components/secret-container';
import { useSearchParams } from 'next/navigation';
import { errorNotification } from '@/lib';

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
    <>
      {data?.token ? (
        <SecretContainer encryptedText={secret as string} token={data.token} />
      ) : (
        <p className="text-white">{error ? error.message : 'Loading...'}</p>
      )}
    </>
  );
}
