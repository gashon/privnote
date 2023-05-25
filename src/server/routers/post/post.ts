/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { router, publicProcedure } from '@/server/lib';
import { TRPCError } from '@trpc/server';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';

export const secretRouter = router({
  create: publicProcedure
    .input(
      z.object({
        token: z.string().min(1),
        max_views: z.number().int().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const dbKey = uuidv4();
      const secret = await ctx.db
        .insertInto('secret')
        .values({
          token: input.token,
          key: dbKey,
          maxViews: input.max_views ?? -1,
          ownerId: ctx.userId,
        })
        .execute();
    }),
});
