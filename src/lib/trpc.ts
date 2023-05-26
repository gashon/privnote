import { createTRPCNext } from '@trpc/next';
import type { AppRouter } from '@/server/routers';
import { httpBatchLink } from '@trpc/client';

export const trpc = createTRPCNext<AppRouter>({
  config() {
    return {
      links: [
        httpBatchLink({
          url: 'http://localhost:3000/api/trpc',
          // You can pass any HTTP headers you wish here
          async headers() {
            return {};
          },
        }),
      ],
    };
  },
  ssr: true,
});
