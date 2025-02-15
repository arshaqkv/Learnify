import { CreateCourse } from "../../../application/use-cases/instructor/course/CreateCourse";
import { DeleteCourse } from "../../../application/use-cases/instructor/course/DeleteCourse";
import { EditCourse } from "../../../application/use-cases/instructor/course/EditCourse";
import { GetAllCourses } from "../../../application/use-cases/instructor/course/GetAllCourses";
import { GetAllPublishedCourses } from "../../../application/use-cases/instructor/course/GetAllPublishedCourses";
import { GetCourse } from "../../../application/use-cases/instructor/course/GetCourse";
import { MonogoCourseRepository } from "../../repositories/mongo.course.repository";
import { MongoWishlistRepository } from "../../repositories/mongo.wishlist.repository";
import { CloudinaryService } from "../../services/cloudinary/Cloudinary";

class CourseDIContainer {
  static getCourseRepository() {
    return new MonogoCourseRepository();
  }

  static getCloudinaryService() {
    return new CloudinaryService();
  }

  static getWishlistRepository() {
    return new MongoWishlistRepository();
  }

  static getCreateCourseUseCase() {
    return new CreateCourse(
      this.getCourseRepository(),
      this.getCloudinaryService()
    );
  }

  static getAllCoursesUseCase() {
    return new GetAllCourses(this.getCourseRepository());
  }

  static getAllPublishedCoursesUseCase() {
    return new GetAllPublishedCourses(this.getCourseRepository());
  }

  static getCourseUseCase() {
    return new GetCourse(
      this.getCourseRepository(),
      this.getWishlistRepository()
    );
  }

  static getEditCourseUseCase() {
    return new EditCourse(
      this.getCourseRepository(),
      this.getCloudinaryService()
    );
  }

  static getDeleteCourseUseCase() {
    return new DeleteCourse(
      this.getCourseRepository(),
      this.getCloudinaryService()
    );
  }
}

export { CourseDIContainer };
