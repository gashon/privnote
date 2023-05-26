/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { router, publicProcedure } from '@/server/lib';
import { TRPCError } from '@trpc/server';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';
import { Secret } from '@/server/db/types';
import { Updateable } from 'kysely';

export const secretRouter = router({
  delete: publicProcedure
    .input(
      z.object({
        key: z.string().min(1),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.userId;
      const secret = await ctx.db
        .selectFrom('secret')
        .select(['id', 'ownerId', 'deletedAt'])
        .where('key', '=', input.key)
        .where('deletedAt', 'is', null)
        .executeTakeFirst();

      if (!secret) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Secret not found',
        });
      }

      if (secret.ownerId !== userId) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You do not own this secret',
        });
      }

      const update = await ctx.db
        .updateTable('secret')
        .set({
          deletedAt: new Date(),
        })
        .where('id', '=', secret.id)
        .execute();

      return update;
    }),
  list: publicProcedure.query(async ({ ctx }) => {
    const userId = ctx.userId;
    const secrets = await ctx.db
      .selectFrom('secret')
      .select([
        'key',
        'maxViews',
        'views',
        'expiresAt',
        'createdAt',
        'deletedAt',
      ])
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
        .where('deletedAt', 'is', null)
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

      let updatePayload: Updateable<Secret> = {};

      if (input.expires_at) {
        //@ts-ignore
        updatePayload.expiresAt = new Date(input.expires_at);
      }

      if (input.max_views) {
        //@ts-ignore
        updatePayload.maxViews = input.max_views;
      }
      if (input.delete) {
        //@ts-ignore
        updatePayload.deletedAt = new Date();
      }
      if (input.token) {
        updatePayload.token = input.token;
      }

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
        expires_at: z.number().optional(),
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
          expiresAt: input.expires_at ? new Date(input.expires_at) : null,
        })
        .execute();

      return {
        key: dbKey,
      };
    }),
});
