import { v4 as uuidv4 } from 'uuid';
import { NextApiRequest, NextApiResponse } from 'next';
import { UUID_COOKIE_NAME } from '@/server/constants';

export const getAnonymousId = (
  req: NextApiRequest,
  res: NextApiResponse,
): string => {
  const uuidCookie = req.cookies[UUID_COOKIE_NAME];

  if (!uuidCookie) {
    const uuid = uuidv4();
    res.setHeader(
      'Set-Cookie',
      `${UUID_COOKIE_NAME}=${uuid}; Path=/; HttpOnly; SameSite=Strict`,
    );
    return uuid;
  }

  return uuidCookie;
};
