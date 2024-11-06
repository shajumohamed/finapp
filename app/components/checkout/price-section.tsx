'use client';

import { CheckoutEventsData } from '@paddle/paddle-js/types/checkout/events';
import { CheckoutLineItems } from './checkout-line-items';
import { CheckoutPriceContainer } from './checkout-price-container';
import { CheckoutPriceAmount } from './checkout-price-amount';

interface Props {
  checkoutData: CheckoutEventsData | null;
  quantity: number;
  handleQuantityChange: (quantity: number) => void;
}

export function PriceSection({ checkoutData, handleQuantityChange, quantity }: Props) {
  return (
    <div className="space-y-8">
      <div className="hidden md:block">
        <CheckoutPriceContainer checkoutData={checkoutData} />
        <CheckoutLineItems
          handleQuantityChange={handleQuantityChange}
          checkoutData={checkoutData}
          quantity={quantity}
        />
      </div>
      
      <div className="block md:hidden">
        <CheckoutPriceAmount checkoutData={checkoutData} />
        <div className="mt-6 border-t pt-4">
          <details className="group">
            <summary className="cursor-pointer text-gray-600">
              Order summary
            </summary>
            <div className="mt-4">
              <CheckoutLineItems
                handleQuantityChange={handleQuantityChange}
                checkoutData={checkoutData}
                quantity={quantity}
              />
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}