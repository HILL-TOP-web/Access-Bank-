import User from '../models/User.js';
import Transaction from '../models/Transaction.js';
import Wallet from '../models/Wallet.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getSystemStats = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const wallets = await Wallet.countDocuments();
    const transactions = await Transaction.countDocuments();

    res.json({
      users,
      wallets,
      transactions
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const freezeUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { isFrozen: true });
    res.json({ message: 'User frozen' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
