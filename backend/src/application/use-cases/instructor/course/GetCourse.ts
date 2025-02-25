import { Course } from "../../../../domain/entities/course.entity";
import { ICourseRepository } from "../../../../domain/interfaces/course.repository";
import { IOrderRepository } from "../../../../domain/interfaces/order.repository";
import { IWishlistRepository } from "../../../../domain/interfaces/wishlist.repository";
import { CustomError } from "../../../../interface/middlewares/error.middleware";

export class GetCourse {
  constructor(
    private courseRepository: ICourseRepository,
    private wishlistRepository: IWishlistRepository,
    private orderRepository: IOrderRepository
  ) {}

  async execute(
    courseId: string,
    userId: string | undefined
  ): Promise<{
    course: Course | null;
    isWishlisted: boolean;
    isAlreadyPurchased: boolean;
    isCourseOftheSameUser: boolean;
  }> {
    const course = await this.courseRepository.getCourseById(courseId);
    if (!course) {
      throw new CustomError("Course not found", 400);
    }

    let isWishlisted = false;
    let isAlreadyPurchased = false;
    let isCourseOftheSameUser = false;
    if (userId) {
      isWishlisted = await this.wishlistRepository.getWishlistedCourseById(
        userId,
        courseId
      );

      isAlreadyPurchased = await this.orderRepository.getPurchaseStatus(
        userId,
        courseId
      );

      isCourseOftheSameUser = await this.courseRepository.getCourseByCreator(
        userId,
        courseId
      );
    }

    return { course, isWishlisted, isAlreadyPurchased, isCourseOftheSameUser };
  }
}
