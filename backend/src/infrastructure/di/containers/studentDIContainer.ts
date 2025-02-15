import { AddToWishlist } from "../../../application/use-cases/student/AddToWishlist";
import { GetWishlist } from "../../../application/use-cases/student/GetWishlist";
import { RemoveFromWishlist } from "../../../application/use-cases/student/RemoveFromWishlist";
import { MongoWishlistRepository } from "../../repositories/mongo.wishlist.repository";

class StudentDIContainer {
  static getWishlistRepository() {
    return new MongoWishlistRepository();
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
}

export { StudentDIContainer };
