'use client';

import { CheckoutEventsData } from '@paddle/paddle-js/types/checkout/events';
import { CheckoutPriceAmount } from './checkout-price-amount';


interface Props {
  checkoutData: CheckoutEventsData | null;
}

export function CheckoutPriceContainer({ checkoutData }: Props) {
  const formatMoney = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount / 100);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Order summary</h2>
      <CheckoutPriceAmount checkoutData={checkoutData} />
      {checkoutData?.recurring_totals?.total !== undefined && (
        <div className="text-gray-600">
          then {formatMoney(checkoutData.recurring_totals.total, checkoutData.currency_code)} monthly
        </div>
      )}
    </div>
  );
}