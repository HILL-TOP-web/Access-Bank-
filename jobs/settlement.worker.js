import { Worker } from 'bullmq';
import Wallet from '../models/Wallet.js';
import Transaction from '../models/Transaction.js';
import { redisConnection } from './redis.js';

export const settlementWorker = new Worker(
  'settlement-queue',
  async (job) => {
    const { userId, amount, transactionId } = job.data;

    const wallet = await Wallet.findOne({ userId });
    if (!wallet) throw new Error('Wallet not found');

    wallet.balance += amount;
    await wallet.save();

    await Transaction.findByIdAndUpdate(transactionId, {
      status: 'SETTLED',
      settledAt: new Date(),
    });
  },
  {
    connection: redisConnection,
    concurrency: 10,
  }
);
