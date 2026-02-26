import express from "express";
import User from "../models/User.js";

const router = express.Router();

// Get Balance
router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ balance: user.balance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Balance (for mining or deposit)
router.post("/update", async (req, res) => {
  const { userId, amount } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.balance += amount;
    await user.save();

    res.json({ balance: user.balance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
