import { Course } from "../../../../domain/entities/course.entity";
import { ICourseRepository } from "../../../../domain/interfaces/course.repository";
import { CustomError } from "../../../../interface/middlewares/error.middleware";

export class GetCourseDetailsForInstructor {
  constructor(private courseRepository: ICourseRepository) {}

  async execute(courseId: string): Promise<Course> {
    const course = await this.courseRepository.getCourseById(courseId);

    if (!course) {
      throw new CustomError("Course not found", 404);
    }

    return course;
  }
}
