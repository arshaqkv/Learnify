import { ICourseRepository } from "../../../../domain/interfaces/course.repository";

export class GetAllCourses {
  constructor(private courseRepository: ICourseRepository) {}

  async execute(id: string,page: number, limit: number = 10, search?: string) {
    return this.courseRepository.getAllCourses(id, page, limit, search)
  }
}
