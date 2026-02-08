import { Queue } from 'bullmq';
import { redisConnection } from '../config/redis.js';

export const reconciliationQueue = new Queue('reconciliation-queue', {
  connection: redisConnection,
});
