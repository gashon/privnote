'use client';
import { useMemo, useState } from 'react';
import { trpc } from '@/lib';
import { generateKey, encryptPayload } from '@/utils/crypto';
import { BsInfinity } from 'react-icons/bs';

export default function Home() {
  const [secretText, setSecretText] = useState<string>('');
  const secrets = trpc.secret.list.useQuery();
  const mutation = trpc.secret.create.useMutation();
  const encryptionToken = useMemo(() => generateKey(), [mutation.status]);

  const createSecret = async () => {
    const secret = await mutation.mutateAsync({
      token: encryptionToken,
    });
    const encryptedText = encryptPayload(secretText, encryptionToken);
    console.log(`/secret?key=${secret.key}&secret=${encryptedText}`);
  };

  return (
    <>
      <h1>Secret Send</h1>
      <p>Send secrets securely</p>
      <textarea
        value={secretText}
        onChange={(e) => setSecretText(e.target.value)}
        className="text-black bg-white"
      />

      <button type="submit" onClick={createSecret}>
        Create secret
      </button>

      <div className="text-white">
        Prior secrets:
        {secrets.data?.map((secret: any) => (
          <div key={secret.key}>
            <p>
              Key: <strong>{secret.key}</strong>
            </p>
            <p className="flex flex-row items-center">
              Views: {secret.views}
              {secret.maxViews != -1 && `/ ${secret.maxViews}`}
            </p>
            <p>
              Created At: <strong>{secret.createdAt}</strong>
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
