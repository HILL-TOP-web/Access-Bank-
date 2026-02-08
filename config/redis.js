import IORedis from 'ioredis';

export const redisConnection = new IORedis(
  process.env.REDIS_URL,
  {
    tls: {}, // REQUIRED for Upstash
    maxRetriesPerRequest: null,
  }
);

redisConnection.on('connect', () => {
  console.log('✅ Redis connected');
});

redisConnection.on('error', (err) => {
  console.error('❌ Redis error:', err);
});
