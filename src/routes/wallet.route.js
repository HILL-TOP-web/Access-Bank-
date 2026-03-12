import express from 'express';
import {
  getWallet,
  transferToUser
} from '../controllers/wallet.controller.js';

import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', authMiddleware, getWallet);
router.post('/transfer', authMiddleware, transferToUser);

export default router;
