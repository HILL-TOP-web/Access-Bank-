import KYC from '../models/KYC.js';
import User from '../models/User.js';

export const submitKYC = async ({
  userId,
  documentType,
  documentNumber,
  selfieUrl,
  documentUrl
}) => {
  const kyc = await KYC.findOneAndUpdate(
    { userId },
    {
      documentType,
      documentNumber,
      selfieUrl,
      documentUrl,
      status: 'PENDING'
    },
    { upsert: true, new: true }
  );

  await User.findByIdAndUpdate(userId, { kycStatus: 'PENDING' });
  return kyc;
};

export const approveKYC = async (userId) => {
  await KYC.findOneAndUpdate({ userId }, { status: 'APPROVED' });
  await User.findByIdAndUpdate(userId, { kycStatus: 'APPROVED' });
};

export const rejectKYC = async (userId, reason) => {
  await KYC.findOneAndUpdate(
    { userId },
    { status: 'REJECTED', rejectionReason: reason }
  );

  await User.findByIdAndUpdate(userId, { kycStatus: 'REJECTED' });
};
