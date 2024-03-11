'use client';
import { useMemo } from 'react';
import { decryptPayload } from '@/utils/crypto';
import { BsFillClipboardFill } from 'react-icons/bs';
import { successNotification, errorNotification } from '@/lib';
import { fallbackCopyTextToClipboard } from '@/utils/fallbacks';

export type SecretContainerProps = {
  encryptedText: string;
  token: string;
};

export function SecretContainer({
  encryptedText,
  token,
}: SecretContainerProps) {
  const decryptedSecret = useMemo(() => {
    return decryptPayload(encryptedText, token);
  }, [encryptedText, token]);

  return (
    <div className="">
      <>
        <pre
          className="break-all"
          style={{
            overflowX: 'auto',
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word',
          }}
        >
          <span className="underline">Token</span>: {token}
        </pre>
        <div
          className="flex flex-row"
          style={{
            marginTop: 8,
          }}
        >
          <p
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              padding: 8,
              whiteSpace: 'pre-line',
              wordWrap: 'break-word',
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
                fallbackCopyTextToClipboard(decryptedSecret);
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
    </div>
  );
}
