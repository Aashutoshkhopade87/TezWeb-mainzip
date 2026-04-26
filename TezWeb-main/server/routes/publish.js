import { Router } from 'express';
import { env } from '../config/env.js';

const router = Router();

router.post('/publish', (req, res) => {
  const { slug } = req.body || {};

  if (!slug) {
    return res.status(400).json({ message: 'slug is required.' });
  }

  return res.json({
    success: true,
    url: `https://${slug}.${env.defaultDomain}`,
  });
});

export default router;
