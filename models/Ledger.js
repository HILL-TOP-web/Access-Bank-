import mongoose from 'mongoose';

const LedgerSchema = new mongoose.Schema(
  {
    walletId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Wallet',
      required: true
    },

    transactionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Transaction',
      required: true
    },

    entryType: {
      type: String,
      enum: ['CREDIT', 'DEBIT'],
      required: true
    },

    amount: { type: Number, required: true },

    balanceBefore: { type: Number, required: true },
    balanceAfter: { type: Number, required: true },

    narration: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model('Ledger', LedgerSchema);
