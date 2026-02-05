import { Worker } from 'bullmq';
import Transaction from '../models/Transaction.js';
import Wallet from '../models/Wallet.js';
import { redisConnection } from './redis.js';
import { sendToBank } from '../services/bank.service.js';

export const payoutWorker = new Worker(
  'payout-queue',
  async (job) => {
    const { transactionId } = job.data;

    const transaction = await Transaction.findById(transactionId);

    if (!transaction || transaction.status !== 'PENDING') return;

    try {
      const result = await sendToBank(transaction);

      transaction.status = 'SUCCESS';
      transaction.providerRef = result.reference;
      await transaction.save();
    } catch (err) {
      transaction.status = 'FAILED';
      transaction.failureReason = err.message;
      await transaction.save();

      throw err; // triggers retry
    }
  },
  {
    connection: redisConnection,
    concurrency: 5,
  }
);
