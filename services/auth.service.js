import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Wallet from '../models/Wallet.js';

export const registerUser = async ({ fullName, email, phone, password }) => {
  const existing = await User.findOne({ phone });
  if (existing) throw new Error('User already exists');

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await User.create({
    fullName,
    email,
    phone,
    passwordHash
  });

  await Wallet.create({ userId: user._id });

  return user;
};

export const loginUser = async ({ phone, password }) => {
  const user = await User.findOne({ phone });
  if (!user) throw new Error('Invalid credentials');

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) throw new Error('Invalid credentials');

  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  return { user, token };
};
