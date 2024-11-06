import { auth } from "@/auth";
import PricingPlans from "../components/PricingPlans";



export default async function PricingPage() {
  const session = await auth();

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-12">Pricing Plans</h1>
        <PricingPlans user={session?.user} />
      </div>
    </div>
  );
}