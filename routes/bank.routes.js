import express from 'express';
import {
  linkBankAccount,
  withdrawToBank
} from '../controllers/bank.controller.js';

import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/link', authMiddleware, linkBankAccount);
router.post('/withdraw', authMiddleware, withdrawToBank);

export default router;
