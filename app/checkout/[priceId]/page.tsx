
import { CheckoutContents } from '@/app/components/checkout/checkout-contents';
import { auth } from '@/auth';

export default async function CheckoutPage() {
  const session = await auth();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <CheckoutContents userEmail={session?.user?.email||''} />
    </div>
  );
}