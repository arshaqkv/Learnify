import { Order } from "../entities/order.entity";

export interface IOrderRepository {
  createOrder(order: Partial<Order>): Promise<Order | null>;
  updateOrder(orderId: string, data: Partial<Order>): Promise<Order | null>;
  getOrderById(orderId: string): Promise<Order | null>;
  getOrdersByUserId(userId: string): Promise<Order[]>;
  getAllOrders(
    page: number,
    limit: number,
    instructor: string,
    paymentStatus: string
  ): Promise<{ orders: Order[]; total: number }>;
  alreadyPurchasedCourse(userId: string, orderId: string): Promise<boolean>;
  findOrderByUserAndCourse(
    userId: string,
    courseId?: string
  ): Promise<Order | null>;
  findOrdersByInstructorId(
    id: string,
    page: number,
    limit: number
  ): Promise<{ orders: Order[]; total: number }>;
  getPurchaseStatus(userId: string, courseId: string): Promise<boolean>;
}
