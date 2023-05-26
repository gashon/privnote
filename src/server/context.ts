import type { inferAsyncReturnType } from '@trpc/server';
import type { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { findOrCreateAnonymousUser } from '@/server/utils';
import { db } from '@/server/db';

/**
 * Defines your inner context shape.
 * Add fields here that the inner context brings.
 */
interface CreateInnerContextOptions extends Partial<CreateNextContextOptions> {
  userId: string;
  ipAddress: string;
  userAgent: string;
}

/**
 * Inner context. Will always be available in your procedures, in contrast to the outer context.
 *
 * Also useful for:
 * - testing, so you don't have to mock Next.js' `req`/`res`
 * - tRPC's `createServerSideHelpers` where we don't have `req`/`res`
 *
 * @see https://trpc.io/docs/context#inner-and-outer-context
 */
export async function createContextInner(opts: CreateInnerContextOptions) {
  return {
    db,
    userId: opts.userId,
    ipAddress: opts.ipAddress,
    userAgent: opts.userAgent,
  };
}

/**
 * Outer context. Used in the routers and will e.g. bring `req` & `res` to the context as "not `undefined`".
 *
 * @see https://trpc.io/docs/context#inner-and-outer-context
 */
export async function createContext(opts: CreateNextContextOptions) {
  const userId = await findOrCreateAnonymousUser(opts.req, opts.res);
  const contextInner = await createContextInner({
    userId,
    ipAddress: opts.req.headers['x-forwarded-for'] as string,
    userAgent: opts.req.headers['user-agent'] as string,
  });

  return {
    ...contextInner,
    req: opts.req,
    res: opts.res,
  };
}

export type Context = inferAsyncReturnType<typeof createContextInner>;
