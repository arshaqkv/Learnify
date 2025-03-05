import { Course } from "../../../../domain/entities/course.entity";
import { ICourseRepository } from "../../../../domain/interfaces/course.repository";
import { IOrderRepository } from "../../../../domain/interfaces/order.repository";
import { CustomError } from "../../../../interface/middlewares/error.middleware";

export class GetCourseDetailsAfterPurchase {
  constructor(
    private courseRepository: ICourseRepository,
    private orderRepository: IOrderRepository
  ) {}

  async execute(
    userId: string,
    courseId: string
  ): Promise<{ course: Course; isAlreadyPurchased: boolean }> {
    const course = await this.courseRepository.getCourseById(courseId);

    if (!course) {
      throw new CustomError("Course not found", 404);
    }

    let isAlreadyPurchased = false;

    isAlreadyPurchased = await this.orderRepository.getPurchaseStatus(
      userId,
      courseId
    );

    return { course, isAlreadyPurchased };
  }
}
