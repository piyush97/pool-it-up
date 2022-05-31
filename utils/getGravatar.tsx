import { Md5 } from 'ts-md5/dist/md5';

/**
 * Get Gravatar URL from email
 *
 * @param {string} email
 * @param {number} [size=80]
 * @return {*}
 */
const getGravatar = (email: string, size: number = 80) => {
  const hash = Md5.hashStr(email);
  return `https://www.gravatar.com/avatar/${hash}?s=${size}`;
};

export default getGravatar;
