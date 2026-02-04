import Wallet from '../models/Wallet.js';
import Ledger from '../models/Ledger.js';

export const getWalletByUser = async (userId) => {
  return Wallet.findOne({ userId });
};

export const creditWallet = async ({ wallet, amount, transactionId, narration }) => {
  const before = wallet.balance;
  wallet.balance += amount;
  await wallet.save();

  await Ledger.create({
    walletId: wallet._id,
    transactionId,
    entryType: 'CREDIT',
    amount,
    balanceBefore: before,
    balanceAfter: wallet.balance,
    narration
  });
};

export const debitWallet = async ({ wallet, amount, transactionId, narration }) => {
  if (wallet.balance < amount) throw new Error('Insufficient balance');

  const before = wallet.balance;
  wallet.balance -= amount;
  await wallet.save();

  await Ledger.create({
    walletId: wallet._id,
    transactionId,
    entryType: 'DEBIT',
    amount,
    balanceBefore: before,
    balanceAfter: wallet.balance,
    narration
  });
};
