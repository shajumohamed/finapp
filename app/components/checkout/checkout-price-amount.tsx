'use client';

import { CheckoutEventsData } from '@paddle/paddle-js/types/checkout/events';

interface Props {
  checkoutData: CheckoutEventsData | null;
}

export function CheckoutPriceAmount({ checkoutData }: Props) {
  const formatMoney = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount / 100);
  };

  return (
    <div className="flex items-baseline gap-2">
      <span className="text-3xl font-bold">
        {checkoutData?.totals?.total !== undefined 
          ? formatMoney(checkoutData.totals.total, checkoutData.currency_code)
          : '-'}
      </span>
      <span className="text-sm text-gray-600">inc. tax</span>
    </div>
  );
}