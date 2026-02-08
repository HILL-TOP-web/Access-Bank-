import { Queue } from 'bullmq';
import { redisConnection } from '../config/redis.js';

export const settlementQueue = new Queue('settlement-queue', {
  connection: redisConnection,
});
