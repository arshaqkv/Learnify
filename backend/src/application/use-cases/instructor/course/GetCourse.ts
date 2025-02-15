import { Course } from "../../../../domain/entities/course.entity";
import { ICourseRepository } from "../../../../domain/interfaces/course.repository";
import { IWishlistRepository } from "../../../../domain/interfaces/wishlist.repository";
import { CustomError } from "../../../../interface/middlewares/error.middleware";

export class GetCourse {
  constructor(
    private courseRepository: ICourseRepository,
    private wishlistRepository: IWishlistRepository
  ) {}

  async execute(
    courseId: string,
    userId?: string | undefined
  ): Promise<{ course: Course | null; isWishlisted: boolean }> {
    const course = await this.courseRepository.getCourseById(courseId);
    if (!course) {
      throw new CustomError("Course not found", 400);
    }

    let isWishlisted = false;
    if (userId) {
      isWishlisted = await this.wishlistRepository.getWishlistedCourseById(
        userId,
        courseId
      );
    }

    return { course, isWishlisted };
  }
}
