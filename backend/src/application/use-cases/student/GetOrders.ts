import { Order } from "../../../domain/entities/order.entity";
import { IOrderRepository } from "../../../domain/interfaces/order.repository";

export class GetOrders {
  constructor(private orderRepository: IOrderRepository) {}

  async execute(userId: string): Promise<Order[] | null>{

    const orders = await this.orderRepository.getOrdersByUserId(userId)

    return orders
  }
}
