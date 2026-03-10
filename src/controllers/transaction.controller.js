import Transaction from '../models/Transaction.js';

export const getTransactions = async (req, res) => {
  try {
    const txs = await Transaction.find({ userId: req.user.id })
      .sort({ createdAt: -1 });

    res.json(txs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getTransactionById = async (req, res) => {
  try {
    const tx = await Transaction.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!tx) return res.status(404).json({ message: 'Transaction not found' });

    res.json(tx);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
