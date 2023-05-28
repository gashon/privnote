import { NextApiRequest, NextApiResponse } from 'next';
import { UUID_COOKIE_NAME } from '@/server/constants';
import { v4 as uuidv4 } from 'uuid';
import { db } from '@/server/db';

export const findOrCreateAnonymousUser = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<string> => {
  const uuidCookie = req.cookies[UUID_COOKIE_NAME];

  if (!uuidCookie) {
    const newUuid = uuidv4();

    // const newUser = await db
    //   .insertInto('user')
    //   .values({
    //     lastUpload: new Date(),
    //   })
    //   .returning('id')
    //   .executeTakeFirst();

    // if (!newUser) {
    //   throw new Error('Could not create anonymous user');
    // }

    res.setHeader('Set-Cookie', `${UUID_COOKIE_NAME}=${newUuid}; Path=/`);
    return newUuid;
  }

  return uuidCookie;
};
