import { Course } from "../../../../domain/entities/course.entity";
import { ICourseRepository } from "../../../../domain/interfaces/course.repository";

export class GetAllPublishedCourses {
  constructor(private courseRepository: ICourseRepository) {}

  async execute(
    page: number,
    limit: number,
    search: string,
    category: string,
    level: string,
    sort: string
  ): Promise<{ courses: Course[]; total: number }> {
    return await this.courseRepository.getAllPublishedcourses(
      page,
      limit,
      search,
      category,
      level,
      sort
    );
  }
}
