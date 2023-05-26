'use client';
import { useMemo } from 'react';
import { decryptPayload } from '@/utils/crypto';

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
          <p>
            Secret: <strong>{decryptedSecret}</strong>
          </p>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
