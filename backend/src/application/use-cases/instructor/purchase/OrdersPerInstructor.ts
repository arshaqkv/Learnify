import { Order } from "../../../../domain/entities/order.entity";
import { IOrderRepository } from "../../../../domain/interfaces/order.repository";

export class OrdersPerInstructor {
  constructor(private orderRepository: IOrderRepository) {}

  async execute(
    userId: string,
    page: number,
    limit: number
  ): Promise<{ orders: Order[] | null; total: number }> {
    const { orders, total } =
      await this.orderRepository.findOrdersByInstructorId(userId, page, limit);
    return { orders, total };
  }
}
