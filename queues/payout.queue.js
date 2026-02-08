import { Queue } from 'bullmq';
import { redisConnection } from '../config/redis.js';

export const payoutQueue = new Queue('payout-queue', {
  connection: redisConnection,
});
