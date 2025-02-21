import Stripe from "stripe";
import { config } from "../../../config/config";
import { CustomError } from "../../../interface/middlewares/error.middleware";

const stripe = new Stripe(config.stripe.SECRET_KEY, {
  apiVersion: "2025-01-27.acacia",
});

export class StripeService {
  async createCheckoutSession(
    courseTitle: string,
    courseDescription: string,
    courseThumbnail: string,
    coursePrice: number,
    courseId: string,
    userId: string,
    orderId: string
  ) {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "inr",
              product_data: {
                name: courseTitle,
                description: courseDescription,
                images: [courseThumbnail],
              },
              unit_amount: coursePrice * 100,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${config.client_url}/payment/success?session_id={CHECKOUT_SESSION_ID}&orderId=${orderId}&courseTitle=${courseTitle}&amount=${coursePrice}`,
        cancel_url: `${config.client_url}/cancel`,
        metadata: {
            orderId,
            userId,
            courseId
        }
      });
      return session.url;
    } catch (error) {
      throw new CustomError("Failed to create checkout session.", 400);
    }
  }
}
