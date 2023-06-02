'use client';
import { useMemo, useState } from 'react';
import { BsFillClipboardFill } from 'react-icons/bs';
import { trpc, successNotification, errorNotification } from '@/lib';
import { generateKey, encryptPayload } from '@/utils/crypto';

export function SecretInput() {
  const trpcContext = trpc.useContext();

  const [secretText, setSecretText] = useState<string>('');
  const [secretURL, setSecretURL] = useState<string | undefined>(undefined);
  const mutation = trpc.secret.create.useMutation({
    onSuccess: () => {
      trpcContext.secret.list.invalidate();
    },
  });
  const encryptionToken = useMemo(() => generateKey(), [mutation.status]);

  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      console.log('URL copied to clipboard:', url);
      successNotification('URL copied to clipboard');
    } catch (error) {
      console.error('Failed to copy URL to clipboard:', error);
      errorNotification('Failed to copy URL to clipboard');
    }
  };

  const createSecret = async () => {
    const secret = await mutation.mutateAsync({
      token: encryptionToken,
    });
    const encryptedText = encryptPayload(secretText, encryptionToken);
    const url = `${
      process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000'
    }/secret?key=${secret.key}&secret=${encryptedText}`;
    setSecretURL(url);

    await copyToClipboard(url);
  };

  return (
    <>
      <textarea
        id="secret"
        value={secretText}
        onChange={(e) => setSecretText(e.target.value)}
        className="w-full rounded block text-sm text-gray-400 hover:resize-y"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          padding: 10,
          borderRadius: 5,
        }}
        rows={secretText.split('\n').length}
        placeholder="POSTGRES_USER=..."
      />
      <div className="w-full flex justify-between">
        <button
          type="submit"
          onClick={createSecret}
          className="w-fit"
          style={{
            borderBottom: '3px solid rgba(255, 255, 255, 0.15)',
          }}
        >
          Create URL
        </button>
        {secretURL && (
          <div
            onClick={() => copyToClipboard(secretURL)}
            className="cursor-pointer"
          >
            <BsFillClipboardFill />
          </div>
        )}
      </div>
    </>
  );
}
