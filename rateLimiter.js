import rateLimit from 'express-rate-limit';

export const rateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 60, // 60 requests per IP
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      message: 'Too many requests. Try again later.',
    });
  },
});
