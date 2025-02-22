import { Course } from "../../../domain/entities/course.entity";
import { ICourseRepository } from "../../../domain/interfaces/course.repository";

export class GetPopularCourses {
  constructor(private courseRepository: ICourseRepository) {}

  async execute(): Promise<Course[]> {
    const courses = await this.courseRepository.getPopularCourses();
    return courses;
  }
}
