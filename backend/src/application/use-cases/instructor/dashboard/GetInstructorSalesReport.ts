import { IOrderRepository } from "../../../../domain/interfaces/order.repository";

export class GetInstructorSalesReport {
  constructor(private orderRepository: IOrderRepository) {}

  async execute(
    userId: string,
    filter: "daily" | "monthly" | "yearly"
  ): Promise<any> {
    let startDate = new Date();
    let endDate = new Date();

    if (filter === "daily") {
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);
    } else if (filter === "monthly") {
      startDate.setDate(1);
      startDate.setHours(0, 0, 0, 0);
      endDate.setMonth(endDate.getMonth() + 1);
      endDate.setMilliseconds(-1);
    } else if (filter === "yearly") {
      startDate.setMonth(0, 1);
      startDate.setHours(0, 0, 0, 0);
      endDate.setFullYear(endDate.getFullYear() + 1);
      endDate.setMilliseconds(-1);
    }

    const salesData =  await this.orderRepository.getInstructorSalesData(
      userId,
      startDate,
      endDate,
      filter
    );
    return salesData
  }
}
