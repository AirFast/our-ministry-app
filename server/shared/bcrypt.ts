import bcrypt from 'bcrypt';

const hash = (plaintext: string): string => bcrypt.hashSync(plaintext, +process.env.APP_SALT_ROUNDS!);
const compare = (plaintext: string, hash: string): boolean => bcrypt.compareSync(plaintext, hash);

export { hash, compare };