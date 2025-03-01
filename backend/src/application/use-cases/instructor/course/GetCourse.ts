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

    const filteredCourse = JSON.parse(JSON.stringify(course));

    if (filteredCourse.lectures && filteredCourse.lectures.length > 0) {
      filteredCourse.lectures.forEach((lecture: any, lectureIndex: number) => {
        lecture.videos.forEach((video: any, videoIndex: number) => {
          delete video.publicId;
          if (!(lectureIndex === 0 && videoIndex === 0)) {
            delete video.videoUrl;
          }
        });
      });
    }

    return { course: filteredCourse, isWishlisted, isAlreadyPurchased, isCourseOftheSameUser };
  }
}
