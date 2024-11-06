import { NextRequest } from 'next/server';
import { ProcessWebhook } from '@/utils/paddle/process-webhook';
import { getPaddleInstance } from '@/utils/paddle/get-paddle-instance';

const webhookProcessor = new ProcessWebhook();

export async function POST(request: NextRequest) {
  const signature = request.headers.get('paddle-signature') || '';
  const rawRequestBody = await request.text();
  const privateKey = process.env['PADDLE_NOTIFICATION_WEBHOOK_SECRET'] || '';

  let status, eventName;
  try {
    if (signature && rawRequestBody) {
      const paddle = getPaddleInstance();
      const eventData = paddle.webhooks.unmarshal(rawRequestBody, privateKey, signature);
      status = 200;
      eventName = eventData?.eventType ?? 'Unknown event';
      if (eventData) {
        await webhookProcessor.processEvent(eventData);
      }
    } else {
      status = 400;
      console.log('Missing signature from header');
    }
  } catch (e) {
    status = 500;
    console.error('Webhook processing error:', e);
  }
  return Response.json({ status, eventName });
}