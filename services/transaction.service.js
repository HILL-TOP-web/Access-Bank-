import crypto from 'crypto';
import Transaction from '../models/Transaction.js';

export const createTransaction = async ({
  userId,
  walletId,
  type,
  purpose,
  amount,
  metadata = {}
}) => {
  const reference = crypto.randomUUID();

  return Transaction.create({
    userId,
    walletId,
    reference,
    type,
    purpose,
    amount,
    metadata
  });
};

export const markTransactionSuccess = async (reference) => {
  return Transaction.findOneAndUpdate(
    { reference },
    { status: 'SUCCESS' },
    { new: true }
  );
};

export const markTransactionFailed = async (reference, reason) => {
  return Transaction.findOneAndUpdate(
    { reference },
    {
      status: 'FAILED',
      metadata: { reason }
    },
    { new: true }
  );
};
