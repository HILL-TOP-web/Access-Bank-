import BankAccount from '../models/BankAccount.js';

export const addBankAccount = async ({
  userId,
  bankCode,
  bankName,
  accountNumber,
  accountName
}) => {
  return BankAccount.create({
    userId,
    bankCode,
    bankName,
    accountNumber,
    accountName
  });
};

export const getDefaultBank = async (userId) => {
  return BankAccount.findOne({ userId, isDefault: true });
};

export const setDefaultBank = async (userId, bankId) => {
  await BankAccount.updateMany({ userId }, { isDefault: false });
  return BankAccount.findByIdAndUpdate(bankId, { isDefault: true });
};
