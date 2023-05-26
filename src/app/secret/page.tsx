'use client';
import { trpc } from '@/lib';
import { SecretContainer } from '@/features/secret/components/secret-container';
import { useSearchParams } from 'next/navigation';
export default function SecretPage() {
  const searchParams = useSearchParams();
  const key = searchParams?.get('key');
  const secret = searchParams?.get('secret');
  if (!key || !secret) return <div>Invalid secret</div>;

  const { data } = trpc.secret.get.useQuery({
    key: key!,
  });

  return (
    <div>
      <h1>Secret</h1>
      {data?.token && (
        <>
          <SecretContainer
            encryptedText={secret as string}
            token={data.token}
          />
        </>
      )}
    </div>
  );
}
