import { EventEntity, SubscriptionCreatedEvent, SubscriptionUpdatedEvent } from "@paddle/paddle-node-sdk";
import { connectDB } from "@/lib/mongdb";
import User from "@/models/User";

export class ProcessWebhook {
  async processEvent(event: EventEntity) {
    switch (event.eventType) {
      case "subscription.created":
      case "subscription.activated":
        await this.handleSubscriptionActivated(event);
        break;
      case "subscription.updated":
        await this.handleSubscriptionUpdated(event);
        break;
      case "subscription.canceled":
        await this.handleSubscriptionCanceled(event);
        break;
      case "subscription.paused":
        await this.handleSubscriptionPaused(event);
        break;
      case "subscription.resumed":
        await this.handleSubscriptionResumed(event);
        break;
      default:
        console.log(`Unhandled webhook event: ${event.eventType}`);
    }
  }

  private async handleSubscriptionActivated(event: SubscriptionCreatedEvent ) {
    await connectDB();
    const data = event.data;
    
    if ("customerEmail" in data && "id" in data && "items" in data) {
      await User.findOneAndUpdate(
        { email: data.customerEmail },
        {
          subscriptionId: data.id,
          planId: data.items[0].price?.id ?? '',
          subscriptionStatus: "active",
          lastBillingDate: new Date(),
        },
        { new: true }
      );
    }
  }

  private async handleSubscriptionUpdated(event: SubscriptionUpdatedEvent) {
    await connectDB();
    const data = event.data;
    
    if ("customerEmail" in data && "id" in data && "items" in data) {
      await User.findOneAndUpdate(
        { email: data.customerEmail },
        {
          subscriptionId: data.id,
          planId: data.items[0]?.price?.id,
          lastBillingDate: new Date(),
        },
        { new: true }
      );
    }
  }

  private async handleSubscriptionCanceled(event: EventEntity) {
    await connectDB();
    const data = event.data;
    
    if ("customerEmail" in data) {
      await User.findOneAndUpdate(
        { email: data.customerEmail },
        {
          subscriptionStatus: "canceled",
          subscriptionId: null,
          planId: null,
        },
        { new: true }
      );
    }
  }

  private async handleSubscriptionPaused(event: EventEntity) {
    await connectDB();
    const data = event.data;
    
    if ("customerEmail" in data) {
      await User.findOneAndUpdate(
        { email: data.customerEmail },
        {
          subscriptionStatus: "paused",
        },
        { new: true }
      );
    }
  }

  private async handleSubscriptionResumed(event: EventEntity) {
    await connectDB();
    const data = event.data;
    
    if ("customerEmail" in data) {
      await User.findOneAndUpdate(
        { email: data.customerEmail },
        {
          subscriptionStatus: "active",
        },
        { new: true }
      );
    }
  }
}