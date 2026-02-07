// utils/crypto.js

import bcrypt from 'bcrypt';

const SALT_ROUNDS = 12;

export const hashData = async (data) => {
  return await bcrypt.hash(data, SALT_ROUNDS);
};

export const compareHash = async (plain, hashed) => {
  return await bcrypt.compare(plain, hashed);
};
