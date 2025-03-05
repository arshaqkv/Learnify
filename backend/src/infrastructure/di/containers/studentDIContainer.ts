import { threadId } from "worker_threads";
import { AddToWishlist } from "../../../application/use-cases/student/AddToWishlist";
import { GetCourseDetailsAfterPurchase } from "../../../application/use-cases/student/course-progress/GetCourseDetailsAfterPurchase";
import { GetCourseProgress } from "../../../application/use-cases/student/course-progress/GetCourseProgress";
import { GetEnrolledcourses } from "../../../application/use-cases/student/GetEnrolledCourses";
import { GetWishlist } from "../../../application/use-cases/student/GetWishlist";
import { RemoveFromWishlist } from "../../../application/use-cases/student/RemoveFromWishlist";
import { MongoCourseProgressRepository } from "../../repositories/mongo.course.progress.repository";
import { MongoCourseRepository } from "../../repositories/mongo.course.repository";
import { MongoLectureRepository } from "../../repositories/mongo.lecture.repositroy";
import { MongoUserRepository } from "../../repositories/mongo.user.repostitory";
import { MongoWishlistRepository } from "../../repositories/mongo.wishlist.repository";
import { MongoOrderRepository } from "../../repositories/mongo.order.repository";
import { UpdateVideoAsCompleted } from "../../../application/use-cases/student/course-progress/UpdateVideoAsCompleted";
import { ResetCourseProgress } from "../../../application/use-cases/student/course-progress/ResetCourseProgress";

class StudentDIContainer {
  static getWishlistRepository() {
    return new MongoWishlistRepository();
  }

  static getUserRepository() {
    return new MongoUserRepository();
  }

  static getCourseRepository() {
    return new MongoCourseRepository();
  }

  static getLectureRepository() {
    return new MongoLectureRepository();
  }

  static getOrderRepository() {
    return new MongoOrderRepository();
  }

  static getCourseProgressRepository() {
    return new MongoCourseProgressRepository();
  }

  static getAddCourseToWishlistUseCase() {
    return new AddToWishlist(this.getWishlistRepository());
  }

  static getRemoveCourseFromWishlistUseCase() {
    return new RemoveFromWishlist(this.getWishlistRepository());
  }

  static getWishlistUseCase() {
    return new GetWishlist(this.getWishlistRepository());
  }

  static getEnrolledCoursesUseCase() {
    return new GetEnrolledcourses(this.getUserRepository());
  }

  static getUserCourseProgressUseCase() {
    return new GetCourseProgress(
      this.getCourseProgressRepository(),
      this.getCourseRepository()
    );
  }

  static getCourseDetailsAfterPurchaseUseCase() {
    return new GetCourseDetailsAfterPurchase(
      this.getCourseRepository(),
      this.getOrderRepository()
    );
  }

  static updateVideoAsCompletedUseCase() {
    return new UpdateVideoAsCompleted(this.getCourseProgressRepository());
  }

  static resetCourseProgressUseCase() {
    return new ResetCourseProgress(
      this.getCourseProgressRepository(),
      this.getCourseRepository()
    );
  }
}

export { StudentDIContainer };
