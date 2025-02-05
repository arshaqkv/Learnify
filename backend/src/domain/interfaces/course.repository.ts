import { Course } from "../entities/course.entity";

export interface ICourseRepository {
  createNewCourse(course: Partial<Course>): Promise<Course>;
  getCourseByTitle(title: string): Promise<Course | null>;
  getAllCourses(page: number, limit: number, search?: string): Promise<{courses: Course[], total: number}>
  getAllPublishedcourses(): Promise<Course[]>
  getCourseById(id: string): Promise<Course | null>
  updateCourse(id: string, data: Partial<Course>): Promise<void>
  deleteCourse(id: string): Promise<void>
}
