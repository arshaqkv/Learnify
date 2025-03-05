import { CourseProgress } from "../entities/course.progress.entity";

export interface ICourseProgressRepository {
  getCourseProgress(
    userId: string,
    courseId: string
  ): Promise<CourseProgress | null>;
  createCourseProgress(
    userId: string,
    courseId: string,
    lectures: any
  ): Promise<CourseProgress | null>;
  updateCourseProgress(
    userId: string,
    courseId: string,
    data: any
  ): Promise<CourseProgress | null>;
}
