'use client';
import { useMemo, useState } from 'react';
import { trpc } from '@/lib';
import { generateKey, encryptPayload } from '@/utils/crypto';

export default function Home() {
  const [secretText, setSecretText] = useState<string>('');
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
    </>
  );
}
