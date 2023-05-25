import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { publicProcedure } from '@/server/lib';

export const authorizedProcedure = publicProcedure
  .input(z.object({ townName: z.string() }))
  .use((opts) => {
    if (opts.input.townName !== 'Pucklechurch') {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: "We don't take kindly to out-of-town folk",
      });
    }

    return opts.next();
  });
