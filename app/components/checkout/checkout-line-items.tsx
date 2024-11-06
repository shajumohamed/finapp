'use client';

import { CheckoutEventsData } from '@paddle/paddle-js/types/checkout/events';
import { QuantityField } from './quantity-field';


interface Props {
  checkoutData: CheckoutEventsData | null;
  quantity: number;
  handleQuantityChange: (quantity: number) => void;
}

export function CheckoutLineItems({ handleQuantityChange, checkoutData, quantity }: Props) {
  const formatMoney = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount / 100);
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="text-base font-medium">
          {checkoutData?.items[0]?.price_id || 'Product'}
        </div>
        <QuantityField quantity={quantity} handleQuantityChange={handleQuantityChange} />
      </div>
      
      <div className="border-t pt-4">
        <div className="flex justify-between mb-4">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-semibold">
            {checkoutData?.totals?.subtotal !== undefined 
              ? formatMoney(checkoutData.totals.subtotal, checkoutData.currency_code)
              : '-'}
          </span>
        </div>
        
        <div className="flex justify-between mb-4">
          <span className="text-gray-600">Tax</span>
          <span className="font-semibold">
            {checkoutData?.totals?.tax !== undefined 
              ? formatMoney(checkoutData.totals.tax, checkoutData.currency_code)
              : '-'}
          </span>
        </div>
        
        <div className="flex justify-between font-semibold">
          <span className="text-gray-600">Due today</span>
          <span>
            {checkoutData?.totals?.total !== undefined 
              ? formatMoney(checkoutData.totals.total, checkoutData.currency_code)
              : '-'}
          </span>
        </div>
      </div>
    </div>
  );
}