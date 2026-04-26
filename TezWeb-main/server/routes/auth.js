import { Router } from 'express';

const router = Router();

router.post('/auth/request-otp', (req, res) => {
  const { phoneNumber } = req.body || {};

  if (!phoneNumber) {
    return res.status(400).json({ message: 'phoneNumber is required.' });
  }

  return res.json({ success: true, phoneNumber, otpSessionId: `otp_${Date.now()}` });
});

router.post('/auth/verify-otp', (req, res) => {
  const { otpSessionId, otp } = req.body || {};

  if (!otpSessionId || !otp) {
    return res.status(400).json({ message: 'otpSessionId and otp are required.' });
  }

  return res.json({
    success: true,
    token: `tezweb_token_${Date.now()}`,
    user: {
      id: `user_${Date.now()}`,
      phoneNumber: '+91XXXXXXXXXX',
    },
  });
});

export default router;
