import crypto from 'crypto';

export const generateKey = () => {
  return crypto.randomBytes(32).toString('hex'); // 32 bytes = 256 bits
};

export const encryptPayload = (payload: any, key: string) => {
  const cipher = crypto.createCipher('aes-256-cbc', key);

  let encrypted = cipher.update(payload, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return encrypted;
};

export const decryptPayload = (encryptedPayload: string, key: string) => {
  const decipher = crypto.createDecipher('aes-256-cbc', key);

  let decrypted = decipher.update(encryptedPayload, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
};
