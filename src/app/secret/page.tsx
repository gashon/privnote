import { trpc } from '@/lib';

type Props = {
  query: {
    key: string;
  };
};

export default function SecretPage({ query }: Props) {
  const {
    data: secret,
    isFetched,
    error,
    refetch,
  } = trpc.secret.get.useQuery({
    key: query.key,
  });

  return (
    <div>
      <h1>Secret</h1>
      {isFetched && secret ? (
        <pre>Token: {secret.token}</pre>
      ) : (
        <button onClick={() => refetch()}>Load secret</button>
      )}
    </div>
  );
}

// pass query param
export async function getServerSideProps(context: any) {
  return {
    props: {
      query: context.query,
    },
  };
}
