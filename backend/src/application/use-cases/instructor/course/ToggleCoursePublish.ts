import { Course } from "../../../../domain/entities/course.entity";
import { ICourseRepository } from "../../../../domain/interfaces/course.repository";
import { CustomError } from "../../../../interface/middlewares/error.middleware";

export class ToggleCoursePublish {
  constructor(private courseRepository: ICourseRepository) {}

  async execute(id: string): Promise<Course | null> {
    const course = await this.courseRepository.getCourseById(id);

    if (!course) {
      throw new CustomError("Course not found", 400);
    }

    const value = !course.isPublished;
    return await this.courseRepository.updateCourse(id, { isPublished: value });
  }
}
