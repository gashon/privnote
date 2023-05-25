import { NextApiRequest, NextApiResponse } from 'next';
import { UUID_COOKIE_NAME } from '@/server/constants';
import { db } from '@/server/db';

export const findOrCreateAnonymousUser = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<string> => {
  const uuidCookie = req.cookies[UUID_COOKIE_NAME];

  if (!uuidCookie) {
    const newUser = await db
      .insertInto('user')
      .values({})
      .returning('id')
      .executeTakeFirst();

    if (!newUser) {
      throw new Error('Could not create anonymous user');
    }

    res.setHeader('Set-Cookie', `${UUID_COOKIE_NAME}=${newUser.id}; Path=/`);
    return newUser.id;
  }

  return uuidCookie;
};
