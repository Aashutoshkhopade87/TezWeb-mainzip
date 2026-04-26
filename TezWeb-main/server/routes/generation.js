import { Router } from 'express';

const router = Router();

router.post('/generate', (req, res) => {
  const { prompt } = req.body || {};

  if (!prompt) {
    return res.status(400).json({ message: 'prompt is required.' });
  }

  return res.json({
    success: true,
    etaSeconds: 30,
    website: {
      pages: ['home', 'catalog', 'contact'],
      prompt,
      status: 'queued',
    },
  });
});

export default router;
