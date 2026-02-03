import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
      trim: true
    },
    phone: {
      type: String,
      unique: true,
      required: true
    },
    passwordHash: { type: String },

    role: {
      type: String,
      enum: ['USER', 'ADMIN'],
      default: 'USER'
    },

    isActive: { type: Boolean, default: true },
    isBlocked: { type: Boolean, default: false },

    kycStatus: {
      type: String,
      enum: ['NOT_STARTED', 'PENDING', 'APPROVED', 'REJECTED'],
      default: 'NOT_STARTED'
    }
  },
  { timestamps: true }
);

export default mongoose.model('User', UserSchema);
