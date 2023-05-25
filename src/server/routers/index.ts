import { publicProcedure, router } from '@/server/lib/trpc';
import { secretRouter } from '@/server/routers/secret';

export const appRouter = router({
  healthcheck: publicProcedure.query(() => 'yay!'),
  secret: secretRouter,
});

export type AppRouter = typeof appRouter;
