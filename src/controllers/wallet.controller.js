import Wallet from '../models/Wallet.js';
import Transaction from '../models/Transaction.js';

export const getWallet = async (req, res) => {
  try {
    const wallet = await Wallet.findOne({ userId: req.user.id });
    res.json(wallet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const creditWallet = async (req, res) => {
  try {
    const { amount } = req.body;

    const wallet = await Wallet.findOneAndUpdate(
      { userId: req.user.id },
      { $inc: { balance: amount } },
      { new: true }
    );

    await Transaction.create({
      userId: req.user.id,
      type: 'CREDIT',
      amount,
      status: 'SUCCESS'
    });

    res.json(wallet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const debitWallet = async (req, res) => {
  try {
    const { amount } = req.body;

    const wallet = await Wallet.findOne({ userId: req.user.id });
    if (wallet.balance < amount)
      return res.status(400).json({ message: 'Insufficient funds' });

    wallet.balance -= amount;
    await wallet.save();

    await Transaction.create({
      userId: req.user.id,
      type: 'DEBIT',
      amount,
      status: 'SUCCESS'
    });

    res.json(wallet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
