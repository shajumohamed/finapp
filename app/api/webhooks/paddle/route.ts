// import { NextResponse } from 'next/server';
// import { paddle } from '@/lib/paddle';
// import { connectDB } from '@/lib/mongdb';
// import Subscription from '@/models/Subscription';
// import Transaction from '@/models/Transaction';
// import User from '@/models/User';

// export async function POST(req: Request) {
//   try {
//     const rawBody = await req.text();
//     const signature = req.headers.get('paddle-signature');

//     if (!signature) {
//       return NextResponse.json({ error: 'No signature' }, { status: 401 });
//     }

//     // Verify webhook signature
//     const event = await paddle.webhooks.verify(rawBody, signature);

//     await connectDB();

//     switch (event.type) {
//       case 'subscription.activated':
//         await handleSubscriptionActivated(event.data);
//         break;
//       case 'subscription.updated':
//         await handleSubscriptionUpdated(event.data);
//         break;
//       case 'subscription.cancelled':
//         await handleSubscriptionCancelled(event.data);
//         break;
//       case 'transaction.completed':
//         await handleTransactionCompleted(event.data);
//         break;
//     }

//     return NextResponse.json({ ok: true });
//   } catch (error) {
//     console.error('Webhook error:', error);
//     return NextResponse.json(
//       { error: 'Webhook handler failed' },
//       { status: 500 }
//     );
//   }
// }

// async function handleSubscriptionActivated(data: any) {
//   const user = await User.findOne({ email: data.customer.email });
//   if (!user) return;

//   await Subscription.create({
//     userId: user._id,
//     paddleSubscriptionId: data.subscription_id,
//     status: 'active',
//     planId: data.plan_id,
//     currentPeriodEnd: new Date(data.next_billed_at)
//   });
// }

// async function handleSubscriptionUpdated(data: any) {
//   await Subscription.findOneAndUpdate(
//     { paddleSubscriptionId: data.subscription_id },
//     {
//       status: data.status,
//       currentPeriodEnd: new Date(data.next_billed_at),
//       cancelAtPeriodEnd: data.cancel_at_period_end
//     }
//   );
// }

// async function handleSubscriptionCancelled(data: any) {
//   await Subscription.findOneAndUpdate(
//     { paddleSubscriptionId: data.subscription_id },
//     { status: 'cancelled' }
//   );
// }

// async function handleTransactionCompleted(data: any) {
//   const subscription = await Subscription.findOne({
//     paddleSubscriptionId: data.subscription_id
//   });

//   await Transaction.create({
//     userId: subscription.userId,
//     paddleTransactionId: data.transaction_id,
//     subscriptionId: subscription._id,
//     amount: data.amount,
//     currency: data.currency,
//     status: 'completed'
//   });
// }