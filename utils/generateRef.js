// utils/generateRef.js

export const generateRef = (prefix = 'TX') => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000000);

  return `${prefix}-${timestamp}-${random}`;
};
