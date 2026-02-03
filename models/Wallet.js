import mongoose from 'mongoose';

const WalletSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      unique: true,
      required: true
    },

    balance: { type: Number, default: 0 }, // kobo
    lockedBalance: { type: Number, default: 0 },

    currency: {
      type: String,
      enum: ['NGN', 'USD'],
      default: 'NGN'
    },

    status: {
      type: String,
      enum: ['ACTIVE', 'SUSPENDED'],
      default: 'ACTIVE'
    }
  },
  { timestamps: true }
);

export default mongoose.model('Wallet', WalletSchema);
