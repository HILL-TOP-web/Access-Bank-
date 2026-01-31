import express from 'express';
import {
  getAllUsers,
  getSystemStats
} from '../controllers/admin.controller.js';

import authMiddleware from '../middlewares/auth.middleware.js';
import adminMiddleware from '../middlewares/admin.middleware.js';

const router = express.Router();

router.get('/users', authMiddleware, adminMiddleware, getAllUsers);
router.get('/stats', authMiddleware, adminMiddleware, getSystemStats);

export default router;
