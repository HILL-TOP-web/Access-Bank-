export const sendEmail = async ({ to, subject, body }) => {
  // Plug SendGrid / SES later
  console.log('EMAIL:', { to, subject, body });
};

export const sendSMS = async ({ to, message }) => {
  // Plug Termii / Twilio later
  console.log('SMS:', { to, message });
};

export const notifyTransaction = async ({ user, amount, type }) => {
  const message =
    type === 'CREDIT'
      ? `Your wallet was credited ₦${amount / 100}`
      : `Your wallet was debited ₦${amount / 100}`;

  await sendSMS({ to: user.phone, message });
};
