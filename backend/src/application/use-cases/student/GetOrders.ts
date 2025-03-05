import { Order } from "../../../domain/entities/order.entity";
import { IOrderRepository } from "../../../domain/interfaces/order.repository";

export class GetOrders {
  constructor(private orderRepository: IOrderRepository) {}

  async execute(
    userId: string,
    page: number,
    limit: number
  ): Promise<{ orders: Order[]; total: number }> {
    const { orders, total } = await this.orderRepository.getOrdersByUserId(
      userId,
      page,
      limit
    );

    return { orders, total };
  }
}
