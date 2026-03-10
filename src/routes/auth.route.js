import express from 'express';
import {
  sendOtp,
  verifyOtp,
  setPin,
  login
} from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/set-pin', setPin);
router.post('/login', login);

export default router;
