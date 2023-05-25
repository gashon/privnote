import Head from 'next/head';
export const metadata = {
  title: 'Secret Send',
  description: 'Send secrets securely',
};

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>{children}</main>
    </>
  );
}
