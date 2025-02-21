import { Request, Response, NextFunction } from "express";
import { OrderDIContainer } from "../../../infrastructure/di/containers/orderDIContainer";

class WebhookController {
  async handleStripeWebhook(req: Request, res: Response, next: NextFunction) {
    try {
      const stripeWebhookService = OrderDIContainer.getStripeWebhookService();
      await stripeWebhookService.handleWebhook(req);
      res.status(200).json({ success: true });
    } catch (error: any) {
      next(error);
    }
  }
}

const webhookController = new WebhookController();
export { webhookController };
