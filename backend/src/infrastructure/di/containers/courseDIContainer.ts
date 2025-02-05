import { CreateCourse } from "../../../application/use-cases/instructor/course/CreateCourse";
import { GetAllCourses } from "../../../application/use-cases/instructor/course/GetAllCourses";
import { GetAllPublishedCourses } from "../../../application/use-cases/instructor/course/GetAllPublishedCourses";
import { GetCourse } from "../../../application/use-cases/instructor/course/GetCourse";
import { MonogoCourseRepository } from "../../repositories/mongo.course.repository";
import { CloudinaryService } from "../../services/cloudinary/Cloudinary";

class CourseDIContainer {
  static getCourseRepository() {
    return new MonogoCourseRepository();
  }

  static getCloudinaryService() {
    return new CloudinaryService();
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
    return new GetCourse(this.getCourseRepository());
  }
}

export { CourseDIContainer };
