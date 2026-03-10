import Bank from '../models/Bank.js';

export const addBank = async (req, res) => {
  try {
    const { bankName, accountNumber, accountName } = req.body;

    const bank = await Bank.create({
      userId: req.user.id,
      bankName,
      accountNumber,
      accountName
    });

    res.status(201).json(bank);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getBanks = async (req, res) => {
  try {
    const banks = await Bank.find({ userId: req.user.id });
    res.json(banks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteBank = async (req, res) => {
  try {
    await Bank.deleteOne({
      _id: req.params.id,
      userId: req.user.id
    });

    res.json({ message: 'Bank removed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
