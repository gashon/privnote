import { createTRPCNext } from '@trpc/next';
import type { AppRouter } from '@/server/routers';
import { httpBatchLink } from '@trpc/client';

const url = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/trpc`
  : 'http://localhost:3000/api/trpc';

export const trpc = createTRPCNext<AppRouter>({
  config() {
    return {
      config({ ctx }: any) {
        if (typeof window !== 'undefined') {
          // during client requests
          return {
            url: '/api/trpc',
          };
        }

        const ONE_DAY_SECONDS = 60 * 60 * 24;
        ctx?.res?.setHeader(
          'Cache-Control',
          `s-maxage=1, stale-while-revalidate=${ONE_DAY_SECONDS}`,
        );
        // The server needs to know your app's full url
        // On render.com you can use `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}/api/trpc`

        return {
          url,
          /**
           * Set custom request headers on every request from tRPC
           * @link http://localhost:3000/docs/v9/header
           * @link http://localhost:3000/docs/v9/ssr
           */
          headers() {
            if (ctx?.req) {
              // To use SSR properly, you need to forward the client's headers to the server
              // This is so you can pass through things like cookies when we're server-side rendering
              // If you're using Node 18, omit the "connection" header
              const {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                connection: _connection,
                ...headers
              } = ctx.req.headers;
              return {
                ...headers,
                // Optional: inform server that it's an SSR request
                'x-ssr': '1',
              };
            }
            return {};
          },
        };
      },
      links: [
        httpBatchLink({
          url,
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
