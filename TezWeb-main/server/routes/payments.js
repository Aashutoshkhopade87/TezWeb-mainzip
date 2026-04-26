import { Router } from 'express';
import Razorpay from 'razorpay';
import { env, isRazorpayConfigured } from '../config/env.js';

const router = Router();

const razorpay = new Razorpay({
  key_id: env.razorpayKeyId,
  key_secret: env.razorpayKeySecret,
});

router.post('/payments/create-order', async (req, res) => {
  try {
    if (!isRazorpayConfigured) {
      return res.status(500).json({ message: 'Razorpay keys are not configured on server.' });
    }

    const { amount = 19900, currency = 'INR', receipt } = req.body || {};

    const order = await razorpay.orders.create({
      amount,
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
    });

    return res.json({
      keyId: env.razorpayKeyId,
      order,
    });
  } catch (error) {
    console.error('Razorpay order creation failed:', error);
    return res.status(500).json({ message: 'Unable to create Razorpay order' });
  }
});

export default router;
