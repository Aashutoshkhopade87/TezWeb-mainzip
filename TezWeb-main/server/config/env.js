export const env = {
  port: Number(process.env.PORT || 5000),
  razorpayKeyId: process.env.RAZORPAY_KEY_ID || '',
  razorpayKeySecret: process.env.RAZORPAY_KEY_SECRET || '',
  defaultDomain: process.env.TEZWEB_DOMAIN || 'tezweb.in',
};

export const isRazorpayConfigured = Boolean(env.razorpayKeyId && env.razorpayKeySecret);
