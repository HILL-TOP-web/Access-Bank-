import { Worker } from 'bullmq';
import Transaction from '../models/Transaction.js';
import { redisConnection } from './redis.js';
import { fetchBankTransactions } from '../services/bank.service.js';

export const reconciliationWorker = new Worker(
  'reconciliation-queue',
  async () => {
    const bankTransactions = await fetchBankTransactions();

    for (const bankTx of bankTransactions) {
      const localTx = await Transaction.findOne({
        providerRef: bankTx.reference,
      });

      if (!localTx) {
        console.warn('⚠️ Missing local record:', bankTx.reference);
        continue;
      }

      if (localTx.amount !== bankTx.amount) {
        console.error('❌ Amount mismatch:', bankTx.reference);
      }

      if (localTx.status !== 'SUCCESS') {
        console.warn('⚠️ Status mismatch:', bankTx.reference);
      }
    }
  },
  {
    connection: redisConnection,
  }
);
