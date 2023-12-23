'use client';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <div className="w-full flex flex-col mb-6 gap-4 text-lg">
        <p
          style={{
            borderLeft: '4px solid rgba(255, 255, 255, 0.5)',
            paddingLeft: 10,
            marginBottom: 10,
          }}
        >
          <span>TL;DR:</span> PrivNote is a free service that lets you send
          secret messages securely (such as .env files). You have access to
          detailed view logs and fine-grained control over the message's
          lifetime + the number of views before self destruction.
        </p>
        <div className="flex justify-center items-center w-full flex-col">
          <Image
            src="/logs.png"
            alt="PrivNote"
            width={800}
            height={400}
            priority
          />
          <pre>An example of the detailed view logs.</pre>
        </div>
        <p
          style={{
            borderLeft: '4px solid rgba(255, 255, 255, 0.15)',
            paddingLeft: 10,
          }}
        >
          Secrets are never sent to our server. We employ symmetric-key
          cryptography, specifically the AES-256-GCM (Advanced Encryption
          Standard with a 256-bit key size using Galois/Counter Mode) algorithm.
        </p>

        <p
          style={{
            borderLeft: '4px solid rgba(255, 255, 255, 0.15)',
            paddingLeft: 10,
          }}
        >
          Here's a brief overview of how it works: The client generates a random
          key with 256 bits of entropy. This key is then used to encrypt the
          secret message, transforming it into a ciphertext. The encryption key
          is sent to the server and stored in a database. The server returns a
          token to the client. This token is used to retrieve the key from the
          server when the secret message needs to be viewed. When the secret
          message is accessed, the server uses the token to fetch the key, and
          the client uses this key to decrypt the message. AES-256-GCM is a
          popular encryption algorithm widely used in various sectors because it
          provides confidentiality, integrity, and origin authenticity.
        </p>
        <p
          style={{
            borderLeft: '4px solid rgba(255, 255, 255, 0.15)',
            paddingLeft: 10,
          }}
        >
          PrivNote uses anonymous authentication. We do not require you to
          create an account. We use a single httpOnly private cookie to give you
          access to your secrets.
        </p>

        <p
          style={{
            marginTop: 25,
          }}
        >
          The source code for PrivNote is available on{' '}
          <a
            href="https://github.com/gashon/privnote"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            GitHub
          </a>
          .
        </p>

        <p>
          Built by{' '}
          <a
            href="https://ghussein.org"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            gashon
          </a>
          .
        </p>
      </div>
    </>
  );
}
