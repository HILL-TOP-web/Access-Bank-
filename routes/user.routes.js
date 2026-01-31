import express from 'express';
import {
  getProfile,
  updateProfile,
  submitKYC
} from '../controllers/user.controller.js';

import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/me', authMiddleware, getProfile);
router.put('/me', authMiddleware, updateProfile);
router.post('/kyc', authMiddleware, submitKYC);

export default router;
