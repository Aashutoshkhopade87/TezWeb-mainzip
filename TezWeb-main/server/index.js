import express from 'express';
import cors from 'cors';
import Razorpay from 'razorpay';

const app = express();
const port = process.env.PORT || 5000;

// Read Razorpay credentials from environment variables.
const keyId = process.env.RAZORPAY_KEY_ID;
const keySecret = process.env.RAZORPAY_KEY_SECRET;

if (!keyId || !keySecret) {
  console.warn('RAZORPAY_KEY_ID/RAZORPAY_KEY_SECRET are missing. Payment order API will fail until configured.');
}

const razorpay = new Razorpay({
  key_id: keyId || '',
  key_secret: keySecret || '',
});

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

// Secure backend route: creates an order and sends order details to frontend.
app.post('/api/payments/create-order', async (req, res) => {
  try {
    if (!keyId || !keySecret) {
      return res.status(500).json({ message: 'Razorpay keys are not configured on server.' });
    }

    const { amount = 19900, currency = 'INR', receipt } = req.body || {};

    // Razorpay expects amount in paise (smallest currency unit).
    const order = await razorpay.orders.create({
      amount,
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
    });

    return res.json({
      keyId,
      order,
    });
  } catch (error) {
    console.error('Razorpay order creation failed:', error);
    return res.status(500).json({ message: 'Unable to create Razorpay order' });
  }
});

app.listen(port, () => {
  console.log(`Payment server listening on http://localhost:${port}`);
});
