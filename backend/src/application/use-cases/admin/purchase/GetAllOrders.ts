import { Order } from "../../../../domain/entities/order.entity";
import { IOrderRepository } from "../../../../domain/interfaces/order.repository";

export class GetAllOrders {
  constructor(private orderRepository: IOrderRepository) {}

  async execute(
    page: number,
    limit: number,
    instructor: string,
    paymentStatus: string
  ): Promise<{ orders: Order[]; total: number }> {
    const { orders, total } = await this.orderRepository.getAllOrders(
      page,
      limit,
      instructor,
      paymentStatus
    );

    return { orders, total };
  }
}
