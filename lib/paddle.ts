import { Paddle } from '@paddle/paddle-node-sdk';

if (!process.env.PADDLE_API_KEY) {
  throw new Error('Missing PADDLE_API_KEY');
}

export const paddle = new Paddle({
  apiKey: process.env.PADDLE_API_KEY,
  environment: process.env.NODE_ENV === 'production' ? 'production' : 'sandbox'
});