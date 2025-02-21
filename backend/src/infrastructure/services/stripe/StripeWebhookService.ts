import Stripe from "stripe";
import { Request } from "express";
import { config } from "../../../config/config";

import { CustomError } from "../../../interface/middlewares/error.middleware";
import { HandleSuccessfulPayment } from "../../../application/use-cases/student/HandleSuccessfulPayment";
import { HandleFailedPayment } from "../../../application/use-cases/student/HandleFailedPayment";

export class StripeWebhookService {
  private stripe: Stripe;

  constructor(
    private handleSuccess: HandleSuccessfulPayment,
    private handleFailure: HandleFailedPayment
  ) {
    this.stripe = new Stripe(config.stripe.SECRET_KEY, {
      apiVersion: "2025-01-27.acacia",
    });
  }

  async handleWebhook(req: Request): Promise<void> {
    const sig = req.headers["stripe-signature"] as string;
    let event: Stripe.Event;
    try {
      event = this.stripe.webhooks.constructEvent(
        req.body,
        sig,
        config.stripe.WEBHOOK_SECRET_KEY
      );
    } catch (error) {
      console.error("❌ Webhook Signature Verification Error:", error);
      throw new CustomError("Webhook signature verification failed.", 400);
    }

    console.log(`🔔 Received event: ${event.type}`);

    switch (event.type) {
      case "checkout.session.completed":
        await this.handlePaymentSuccess(event);
        break;

      case "checkout.session.expired":
      case "checkout.session.async_payment_failed":
      case "payment_intent.payment_failed":
        await this.handlePaymentFailed(event);
        break;

      default:
        console.log(`⚠️ Unhandled event type: ${event.type}`);
    }
  }

  private async handlePaymentSuccess(event: Stripe.Event) {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.orderId;
    const courseId = session.metadata?.courseId;
    const userId = session.metadata?.userId;
    const transactionId = session.payment_intent as string;

    if (!orderId) {
      throw new CustomError("Order ID missing in metadata", 400);
    }

    if (!courseId) {
      throw new CustomError("Course ID missing in metadata", 400);
    }

    if(!userId){
        throw new CustomError("User ID missing in metadata", 400);
    }

    await this.handleSuccess.execute(orderId, courseId, userId, transactionId);
  }

  private async handlePaymentFailed(event: Stripe.Event) {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.orderId;

    if (!orderId) {
      throw new CustomError("Order ID missing in metadata", 400);
    }

    await this.handleFailure.execute(orderId);
  }
}
