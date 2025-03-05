import { IOrderRepository } from "../../../../domain/interfaces/order.repository";

export class GetCompletedOrders {
  constructor(private orderRepository: IOrderRepository) {}

  async execute(filter: string, startDate?: string, endDate?: string) {
    let filterCondition: any = { paymentStatus: "completed" };

    const now = new Date();
    if (filter === "daily") {
      filterCondition.createdAt = { $gte: new Date(now.setHours(0, 0, 0, 0)) };
    } else if (filter === "monthly") {
      filterCondition.createdAt = {
        $gte: new Date(now.getFullYear(), now.getMonth(), 1),
      };
    } else if (filter === "yearly") {
      filterCondition.createdAt = {
        $gte: new Date(now.getFullYear(), 0, 1),
      };
    } else if (startDate && endDate) {
      filterCondition.createdAt = {
        $gte: new Date(startDate as string),
        $lte: new Date(endDate as string),
      };
    }

    const orders = await this.orderRepository.getCompletedOrdersWithFilters(
      filterCondition
    );

    const totalRevenue = orders.reduce(
      (sum, order) => sum + order.course.coursePrice,
      0
    );

    const companyRevenue = totalRevenue * 0.2;

    return { orders, totalRevenue, companyRevenue };
  }
}
