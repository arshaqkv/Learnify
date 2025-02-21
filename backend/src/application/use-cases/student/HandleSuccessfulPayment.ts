import { ICourseRepository } from "../../../domain/interfaces/course.repository";
import { IOrderRepository } from "../../../domain/interfaces/order.repository";
import { IUserRepository } from "../../../domain/interfaces/user.repository";
import { CustomError } from "../../../interface/middlewares/error.middleware";

export class HandleSuccessfulPayment {
  constructor(
    private orderRepository: IOrderRepository,
    private courseRepository: ICourseRepository,
    private userRepository: IUserRepository
  ) {}

  async execute(
    orderId: string,
    courseId: string,
    userId: string,
    transactionId: string
  ) {
    const order = await this.orderRepository.getOrderById(orderId);
    if (!order) {
      throw new CustomError("Order not found", 404);
    }

    await this.orderRepository.updateOrder(orderId, {
      paymentStatus: "completed",
      transactionId,
      paymentDate: new Date(),
    });

    const course = await this.courseRepository.getCourseById(courseId);
    if (!course) {
      throw new CustomError("Course not found", 404);
    }

    await this.courseRepository.updateCourseEnrollmentCount(courseId);

    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new CustomError("User not found", 404);
    }

    await this.userRepository.updateEnrolledCourses(userId, courseId);

    console.log(`✅ Order ${orderId} marked as completed.`);
  }
}
