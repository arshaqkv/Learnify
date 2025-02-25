import { CreateCourse } from "../../../application/use-cases/instructor/course/CreateCourse";
import { DeleteCourse } from "../../../application/use-cases/instructor/course/DeleteCourse";
import { EditCourse } from "../../../application/use-cases/instructor/course/EditCourse";
import { GetAllCourses } from "../../../application/use-cases/instructor/course/GetAllCourses";
import { GetAllPublishedCourses } from "../../../application/use-cases/instructor/course/GetAllPublishedCourses";
import { GetCourse } from "../../../application/use-cases/instructor/course/GetCourse";
import { ToggleCoursePublish } from "../../../application/use-cases/instructor/course/ToggleCoursePublish";
import { CreateLecture } from "../../../application/use-cases/instructor/lecture/CreateLecture";
import { DeleteLecture } from "../../../application/use-cases/instructor/lecture/DeleteLecture";
import { EditLecture } from "../../../application/use-cases/instructor/lecture/EditLecture";
import { GetLecture } from "../../../application/use-cases/instructor/lecture/GetLecture";
import { GetPopularCourses } from "../../../application/use-cases/student/GetPopularCourses";
import { MongoCourseRepository } from "../../repositories/mongo.course.repository";
import { MongoLectureRepository } from "../../repositories/mongo.lecture.repositroy";
import { MongoOrderRepository } from "../../repositories/mongo.order.repository";
import { MongoWishlistRepository } from "../../repositories/mongo.wishlist.repository";
import { CloudinaryService } from "../../services/cloudinary/Cloudinary";

class CourseDIContainer {
  static getCourseRepository() {
    return new MongoCourseRepository();
  }

  static getCloudinaryService() {
    return new CloudinaryService();
  }

  static getWishlistRepository() {
    return new MongoWishlistRepository();
  }

  static getLectureRepository() {
    return new MongoLectureRepository();
  }

  static getOrderRepository() {
    return new MongoOrderRepository();
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
      this.getWishlistRepository(),
      this.getOrderRepository()
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
      this.getCloudinaryService(),
      this.getLectureRepository()
    );
  }

  static getToggleCoursePublish() {
    return new ToggleCoursePublish(this.getCourseRepository());
  }

  static getCreateLectureUseCase() {
    return new CreateLecture(
      this.getLectureRepository(),
      this.getCourseRepository(),
      this.getCloudinaryService()
    );
  }

  static getEditLectureUseCase() {
    return new EditLecture(
      this.getLectureRepository(),
      this.getCloudinaryService()
    );
  }

  static getDeleteLectureUseCase() {
    return new DeleteLecture(
      this.getLectureRepository(),
      this.getCloudinaryService(),
      this.getCourseRepository()
    );
  }

  static getLectureUseCase() {
    return new GetLecture(this.getLectureRepository());
  }

  static getPopularCoursesUseCase() {
    return new GetPopularCourses(this.getCourseRepository());
  }
}

export { CourseDIContainer };
