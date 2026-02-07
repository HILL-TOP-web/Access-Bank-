// utils/validators.js

export const isEmailValid = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
  return re.test(String(email).toLowerCase());
};

export const isStrongPassword = (password) => {
  return (
    typeof password === 'string' &&
    password.length >= 8
  );
};

export const isAmountValid = (amount) => {
  return typeof amount === 'number' && amount > 0;
};

export const isMongoId = (id) => {
  return /^[0-9a-fA-F]{24}$/.test(id);
};
