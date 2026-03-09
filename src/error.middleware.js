export const errorMiddleware = (err, req, res, next) => {
  console.error('🔥 ERROR:', err);

  const statusCode = err.status || 500;
  const message = err.message || 'Internal server error';

  res.status(statusCode).json({
    success: false,
    message,
  });
};
