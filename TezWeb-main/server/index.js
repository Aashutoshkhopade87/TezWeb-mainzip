import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { env, isRazorpayConfigured } from './config/env.js';
import healthRoutes from './routes/health.js';
import authRoutes from './routes/auth.js';
import generationRoutes from './routes/generation.js';
import publishRoutes from './routes/publish.js';
import paymentRoutes from './routes/payments.js';

const app = express();

if (!isRazorpayConfigured) {
  console.warn('RAZORPAY_KEY_ID/RAZORPAY_KEY_SECRET missing. Payment API disabled until configured.');
}

app.use(cors());
app.use(express.json());

app.use('/api', healthRoutes);
app.use('/api', authRoutes);
app.use('/api', generationRoutes);
app.use('/api', publishRoutes);
app.use('/api', paymentRoutes);

app.listen(env.port, () => {
  console.log(`TezWeb API listening on http://localhost:${env.port}`);
});
