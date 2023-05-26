'use client';
import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { trpc } from '@/lib';
import { decryptPayload } from '@/utils/crypto';

export default function SecretPage() {
  const searchParams = useSearchParams();
  const key = searchParams?.get('key');
  const secret = searchParams?.get('secret');
  if (!key || !secret) return <div>Invalid secret</div>;

  const { data, isFetched, error, refetch } = trpc.secret.get.useQuery({
    key: key!,
  });

  const decryptedSecret = useMemo(() => {
    if (!data) return null;
    return decryptPayload(secret!, data.token);
  }, [data, secret]);

  return (
    <div>
      <h1>Secret</h1>
      {isFetched && data ? (
        <>
          <pre>Token: {data.token}</pre>
          <p>
            Secret: <strong>{decryptedSecret}</strong>
          </p>
        </>
      ) : (
        <button onClick={() => refetch()}>Load secret</button>
      )}
    </div>
  );
}
