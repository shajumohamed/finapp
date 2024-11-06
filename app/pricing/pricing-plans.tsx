"use client";

import { useEffect, useState } from 'react';
import { Paddle } from '@paddle/paddle-js';

const PLANS = [
  {
    name: 'Basic',
    price: '$9',
    features: ['Feature 1', 'Feature 2', 'Feature 3'],
    priceId: 'pri_01jc0h6e7d5hq4zzrh4jcetqtm'
  },
  {
    name: 'Pro',
    price: '$29',
    features: ['All Basic features', 'Feature 4', 'Feature 5'],
    priceId: 'pri_01jc0h1w94erge4mk5pyzy0gvv'
  }
];

export default function PricingPlans({ user }: { user: any }) {
  const [paddle, setPaddle] = useState<Paddle>();

  useEffect(() => {
    if (!paddle) {
      const paddle = new Paddle({
        environment: process.env.NODE_ENV === 'production' ? 'production' : 'sandbox',
        seller: process.env.NEXT_PUBLIC_PADDLE_SELLER_ID!,
      });
      setPaddle(paddle);
    }
  }, [paddle]);

  const handleSubscribe = async (priceId: string) => {
    if (!user) {
      // Redirect to sign in
      window.location.href = '/api/auth/signin';
      return;
    }

    try {
      if (!paddle) throw new Error('Paddle not initialized');

      const { data: checkout } = await paddle.Checkout.create({
        items: [{ priceId, quantity: 1 }],
        customerId: user.id,
        customerEmail: user.email,
        successUrl: `${window.location.origin}/dashboard?checkout=success`,
        cancelUrl: `${window.location.origin}/pricing`,
      });

      // Open checkout
      await paddle.Checkout.open({ checkout });
    } catch (error) {
      console.error('Checkout error:', error);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {PLANS.map((plan) => (
        <div key={plan.priceId} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">{plan.name}</h2>
          <p className="text-3xl font-bold mb-6">{plan.price}<span className="text-sm font-normal">/month</span></p>
          <ul className="mb-6 space-y-2">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
          <button
            onClick={() => handleSubscribe(plan.priceId)}
            className="w-full bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition-colors"
          >
            Subscribe Now
          </button>
        </div>
      ))}
    </div>
  );
}