/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { router, publicProcedure } from '@/server/lib';
import { TRPCError } from '@trpc/server';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';

export const secretRouter = router({
  list: publicProcedure.query(async ({ ctx }) => {
    const userId = ctx.userId;
    const secrets = await ctx.db
      .selectFrom('secret')
      .select(['key', 'maxViews', 'views', 'expiresAt', 'createdAt'])
      .where('ownerId', '=', userId)
      .orderBy('createdAt', 'desc')
      .orderBy('deletedAt', 'desc')
      .execute();

    return secrets;
  }),
  get: publicProcedure
    .input(z.object({ key: z.string().min(1) }))
    .query(async ({ input, ctx }) => {
      const secret = await ctx.db
        .selectFrom('secret')
        .select(['token', 'maxViews', 'views', 'deletedAt'])
        .where('key', '=', input.key)
        .where('deletedAt', '=', null)
        .executeTakeFirst();

      if (!secret || secret.deletedAt !== null) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Secret not found',
        });
      }

      if (secret.maxViews !== -1 && secret.views == secret.maxViews) {
        await ctx.db
          .updateTable('secret')
          .set({
            deletedAt: new Date(),
          })
          .where('key', '=', input.key)
          .execute();

        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Secret not found',
        });
      }

      await ctx.db
        .updateTable('secret')
        .set({
          views: secret.views + 1,
        })
        .where('key', '=', input.key)
        .execute();

      return {
        token: secret.token,
      };
    }),
  update: publicProcedure
    .input(
      z.object({
        key: z.string().min(1),
        token: z.string().min(1).optional(),
        max_views: z.number().int().optional(),
        delete: z.boolean().optional(),
        expires_at: z.number().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const secret = await ctx.db
        .selectFrom('secret')
        .select([
          'token',
          'maxViews',
          'views',
          'deletedAt',
          'ownerId',
          'expiresAt',
        ])
        .where('key', '=', input.key)
        .executeTakeFirst();

      if (!secret || secret.deletedAt !== null) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Secret not found',
        });
      }

      if (secret.ownerId !== ctx.userId) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Unauthorized',
        });
      }

      const updatePayload = {
        token: input.token ?? secret.token,
        maxViews: input.max_views ?? secret.maxViews,
        deletedAt: input.delete ? new Date() : secret.deletedAt,
        expiresAt: input.expires_at
          ? new Date(input.expires_at)
          : secret?.expiresAt,
      };

      await ctx.db
        .updateTable('secret')
        .set(updatePayload)
        .where('key', '=', input.key)
        .execute();

      return updatePayload;
    }),
  create: publicProcedure
    .input(
      z.object({
        token: z.string().min(1),
        max_views: z.number().int().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const dbKey = uuidv4();
      await ctx.db
        .insertInto('secret')
        .values({
          token: input.token,
          key: dbKey,
          maxViews: input.max_views ?? -1,
          ownerId: ctx.userId,
        })
        .execute();

      return {
        key: dbKey,
      };
    }),
});
