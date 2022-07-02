import bcrypt from 'bcrypt';

export const hash = (plaintext: string): string => bcrypt.hashSync(plaintext, +process.env.APP_SALT_ROUNDS!);
export const compare = (plaintext: string, hash: string): boolean => bcrypt.compareSync(plaintext, hash);
