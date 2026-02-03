import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      index: true
    },

    walletId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Wallet'
    },

    reference: {
      type: String,
      unique: true,
      required: true
    },

    type: {
      type: String,
      enum: ['CREDIT', 'DEBIT'],
      required: true
    },

    purpose: {
      type: String,
      enum: ['FUNDING', 'WITHDRAWAL', 'TRANSFER', 'REVERSAL']
    },

    amount: { type: Number, required: true }, // kobo

    status: {
      type: String,
      enum: ['PENDING', 'SUCCESS', 'FAILED'],
      default: 'PENDING'
    },

    metadata: { type: Object }
  },
  { timestamps: true }
);

export default mongoose.model('Transaction', TransactionSchema);
