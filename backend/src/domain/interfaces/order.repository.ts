import { Order } from "../entities/order.entity";

export interface IOrderRepository {
  createOrder(order: Partial<Order>): Promise<Order | null>;
  updateOrder(orderId: string, data: Partial<Order>): Promise<Order | null>;
  getOrderById(orderId: string): Promise<Order | null>;
  getOrdersByUserId(
    userId: string,
    page: number,
    limit: number
  ): Promise<{ orders: Order[]; total: number }>;
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
  getOrderedCourseOfInstructor(userId: string): Promise<any>;
  getInstructorSalesData(
    userId: string,
    startDate: Date,
    endDate: Date,
    filter: string
  ): Promise<any>;
  getTotalOrders(): Promise<number>;
  getTotalRevenue(): Promise<any>;
  getCompanyRevenue(): Promise<any>;
  getAdminSalesData(
    startDate: Date,
    endDate: Date,
    filter: string
  ): Promise<any>;
  getCompletedOrdersWithFilters(filterCondition: any): Promise<Order[]>;
}
