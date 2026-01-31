import express from 'express';

import authRoutes from './auth.routes.js';
import userRoutes from './user.routes.js';
import walletRoutes from './wallet.routes.js';
import transactionRoutes from './transaction.routes.js';
import bankRoutes from './bank.routes.js';
import adminRoutes from './admin.routes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/wallet', walletRoutes);
router.use('/transactions', transactionRoutes);
router.use('/bank', bankRoutes);
router.use('/admin', adminRoutes);

export default router;
