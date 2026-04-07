import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    balance: {
      type: Number,
      default: 0,
    },

    walletAddress: {
      type: String,
      default: '',
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // creates createdAt and updatedAt
  }
);

// Prevent model overwrite in development (important for hot reload / Render)
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
