import { Course } from "../entities/course.entity";

export interface ICourseRepository {
  createNewCourse(course: Partial<Course>): Promise<Course>;
  getCourseByTitle(title: string): Promise<Course | null>;
  getAllCourses(creator: string, page: number, limit: number, search?: string): Promise<{courses: Course[], total: number}>
  getAllPublishedcourses(page: number, limit: number, search?: string, category?: string, level?: string, sort?: string): Promise<{courses: Course[], total: number}>
  getCourseById(id: string): Promise<Course | null>
  updateCourse(id: string, data: Partial<Course>): Promise<Course | null>
  deleteCourse(id: string): Promise<void>
  addLecture(id: string, lectureId?: string): Promise<void>
  removeLecture(id: string, lectureId: string): Promise<void>
  updateCourseEnrollmentCount(courseId: string): Promise<void>
}
