// utils/logger.js

const log = (level, message, meta = {}) => {
  const timestamp = new Date().toISOString();

  const logObject = {
    timestamp,
    level,
    message,
    ...meta
  };

  console.log(JSON.stringify(logObject));
};

export const logger = {
  info: (message, meta) => log('INFO', message, meta),
  warn: (message, meta) => log('WARN', message, meta),
  error: (message, meta) => log('ERROR', message, meta),
  debug: (message, meta) => {
    if (process.env.NODE_ENV !== 'production') {
      log('DEBUG', message, meta);
    }
  }
};
