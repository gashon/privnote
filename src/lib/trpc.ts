import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@/server/routers';
import { httpBatchLink } from '@trpc/client';

export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/trpc',
      // You can pass any HTTP headers you wish here
      async headers() {
        return {};
      },
    }),
  ],
});
