import { NextRequest } from 'next/server';
import { getPaddleInstance } from '@/utils/paddle/get-paddle-instance';

export async function POST(request: NextRequest) {
  try {
    const { priceId, customerEmail } = await request.json();
    
    if (!priceId || !customerEmail) {
      return Response.json(
        { error: 'Price ID and customer email are required' },
        { status: 400 }
      );
    }

    const paddle = getPaddleInstance();

    const transaction = await paddle.transactions.create({
      items: [{
        priceId: priceId,
        quantity: 1
      }],
      customData: {
        customerEmail: customerEmail
      },
      returnUrl: `${process.env.NEXTAUTH_URL}/checkout/success`,
      successCallbackUrl: `${process.env.NEXTAUTH_URL}/api/webhooks/paddle`
    });

    if (!transaction?.data?.checkoutUrl) {
      throw new Error('Failed to create checkout session');
    }

    return Response.json({
      checkoutUrl: transaction.data.checkoutUrl,
      transactionId: transaction.data.id
    });
  } catch (error) {
    console.error('Checkout error:', error);
    return Response.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}