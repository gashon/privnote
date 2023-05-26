'use client';
import { useMemo, useState } from 'react';
import { BsFillClipboardFill } from 'react-icons/bs';
import { DropDown } from '@/components';
import { trpc, successNotification, errorNotification } from '@/lib';
import { generateKey, encryptPayload } from '@/utils/crypto';
import Link from 'next/link';

export default function Home() {
  const [secretText, setSecretText] = useState<string>('');
  const [secretURL, setSecretURL] = useState<string | undefined>(
    'http://localhost:3000/secret?key=00e3adfc-1bfb-4d0b-bec4-de71042a3bb0&secret=79e6ee7fcaba106ab7fe06400f5e1d0b',
  );
  const secrets = trpc.secret.list.useQuery();
  const mutation = trpc.secret.create.useMutation();
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
          <textarea
            id="secret"
            value={secretText}
            onChange={(e) => setSecretText(e.target.value)}
            className="w-full rounded block p-2.5 text-sm text-gray-400 hover:resize-y"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
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
        </div>

        <DropDown PreviewComponent={<h4>Records</h4>}>
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
        </DropDown>
      </div>
    </main>
  );
}
