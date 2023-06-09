import { NextApiRequest, NextApiResponse } from 'next';
import { UUID_COOKIE_NAME } from '@/server/constants';
import { v4 as uuidv4 } from 'uuid';

export const findOrCreateAnonymousUser = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<string> => {
  const uuidCookie = req.cookies[UUID_COOKIE_NAME];

  if (!uuidCookie) {
    const newUuid = uuidv4();

    res.setHeader(
      'Set-Cookie',
      `${UUID_COOKIE_NAME}=${newUuid}; Path=/; SameSite=lax`,
    );
    return newUuid;
  }

  return uuidCookie;
};
