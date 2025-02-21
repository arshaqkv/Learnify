import { IOrderRepository } from "../../../domain/interfaces/order.repository";
import { CustomError } from "../../../interface/middlewares/error.middleware";

export class HandleFailedPayment {
  constructor(private orderRepository: IOrderRepository) {}

  async execute(orderId: string) {
    const order = await this.orderRepository.getOrderById(orderId);
    if (!order) {
      throw new CustomError("Order not found", 404);
    }

    await this.orderRepository.updateOrder(orderId, {
      paymentStatus: "failed",
    });

    console.log(`❌ Order ${orderId} marked as failed.`);
  }
}
