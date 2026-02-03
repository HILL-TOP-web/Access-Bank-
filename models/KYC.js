import mongoose from 'mongoose';

const KYCSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      unique: true
    },

    documentType: {
      type: String,
      enum: ['NIN', 'BVN', 'PASSPORT'],
      required: true
    },

    documentNumber: { type: String, required: true },

    selfieUrl: { type: String },
    documentUrl: { type: String },

    status: {
      type: String,
      enum: ['PENDING', 'APPROVED', 'REJECTED'],
      default: 'PENDING'
    },

    rejectionReason: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model('KYC', KYCSchema);
