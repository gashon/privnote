'use client';
import Link from 'next/link';
import { SecretInput, RecordDropDown } from '@/features/secret';

export default function Home() {
  return (
    <main className="w-full flex items-center justify-center">
      <div className="w-1/2 text-white py-8">
        <div className="w-full flex justify-between items-center">
          <div>
            <Link href="/" className="text-xl font-bold">
              send secrets securely
            </Link>
          </div>
          <Link href="/" className="text-xl">
            back
          </Link>
        </div>

        <div className="w-full flex flex-col mt-10 mb-6 gap-4 text-lg">
          <h1 className="block mb-4 text-3xl font-medium text-gray-900 dark:text-white">
            PrivNote v.2
          </h1>

          <p
            style={{
              borderLeft: '4px solid rgba(255, 255, 255, 0.5)',
              paddingLeft: 10,
              marginBottom: 10,
            }}
          >
            <span>TLDR:</span> PrivNote is a free service that lets you send
            secret messages. The message is encrypted on your computer and
            decrypted on the recipient's computer. You have access to detailed
            view logs and fine-grained control over the message's lifetime /
            number of views before self destruction.
          </p>

          <p
            style={{
              borderLeft: '4px solid rgba(255, 255, 255, 0.15)',
              paddingLeft: 10,
            }}
          >
            Secrets are never sent to our server. Instead, we generate a link
            that you can share with the recipient. The link contains the secret
            encrypted and encoded in the URL itself. The secret is never written
            to disk.
          </p>

          <p
            style={{
              borderLeft: '4px solid rgba(255, 255, 255, 0.15)',
              paddingLeft: 10,
            }}
          >
            The client generates a random key (with 256 bits of entropy) and a
            random salt (with 128 bits of entropy). The key is used to encrypt
            the secret with AES-256-GCM. The salt is used to derive a key from
            the password using PBKDF2-HMAC-SHA256. The salt and the encrypted
            secret are encoded in the URL using base64url. The key is encrypted
            with the password using AES-256-GCM and encoded in the URL using
            base64url. The key is then encrypted with the recipient's public
            key, which is retrieved from the server. The encrypted key is
            encoded in the URL using base64url.
          </p>

          <p
            style={{
              borderLeft: '4px solid rgba(255, 255, 255, 0.15)',
              paddingLeft: 10,
            }}
          >
            By storing the encrypted key on the server, we can monitor and log
            when the secret is viewed. The server also enforces a maximum number
            of views. Once the maximum number of views is reached, the
            encryption token is invalidated by the server.
          </p>

          <p
            style={{
              borderLeft: '4px solid rgba(255, 255, 255, 0.15)',
              paddingLeft: 10,
            }}
          >
            PrivNote uses anonymous authentication. We do not require you to
            create an account. We do not store your email address or any other
            personal information. We use a single httpOnly private cookie to
            give you access to your secrets.
          </p>

          <p>
            The source code for PrivNote is available on{' '}
            <a
              href="https://github.com/gashon/secret-send"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
