'use client';
import { useMemo } from 'react';
import { decryptPayload } from '@/utils/crypto';
import { BsFillClipboardFill } from 'react-icons/bs';
import { successNotification, errorNotification } from '@/lib';

export type SecretContainerProps = {
  encryptedText: string;
  token: string;
};

export function SecretContainer({
  encryptedText,
  token,
}: SecretContainerProps) {
  const decryptedSecret = useMemo(() => {
    if (!encryptedText || !token) return null;
    return decryptPayload(encryptedText, token);
  }, [encryptedText, token]);

  return (
    <div>
      {decryptedSecret && token ? (
        <>
          <pre>Token: {token}</pre>
          <div className="flex flex-row">
            <p
              style={{
                marginTop: 10,
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                padding: 8,
              }}
              className="w-full text-lg"
            >
              {decryptedSecret}
            </p>
            <div
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(decryptedSecret);
                  successNotification('Copied to clipboard');
                } catch (error) {
                  errorNotification('Failed to copy to clipboard');
                }
              }}
              className="cursor-pointer w-min"
              style={{
                padding: 10,
              }}
            >
              <BsFillClipboardFill />
            </div>
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
