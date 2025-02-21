import { AddToWishlist } from "../../../application/use-cases/student/AddToWishlist";
import { GetEnrolledcourses } from "../../../application/use-cases/student/GetEnrolledCourses";
import { GetWishlist } from "../../../application/use-cases/student/GetWishlist";
import { RemoveFromWishlist } from "../../../application/use-cases/student/RemoveFromWishlist";
import { MongoUserRepository } from "../../repositories/mongo.user.repostitory";
import { MongoWishlistRepository } from "../../repositories/mongo.wishlist.repository";

class StudentDIContainer {
  static getWishlistRepository() {
    return new MongoWishlistRepository();
  }

  static getUserRepository() {
    return new MongoUserRepository();
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
}

export { StudentDIContainer };
