import { publicProcedure, router } from '@/server/lib/trpc';

export const appRouter = router({
  healthcheck: publicProcedure.query(() => 'yay!'),
});

export type AppRouter = typeof appRouter;
