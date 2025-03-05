import { CourseProgress } from "../../../../domain/entities/course.progress.entity";
import { ICourseProgressRepository } from "../../../../domain/interfaces/course.progress.repository";
import { ICourseRepository } from "../../../../domain/interfaces/course.repository";
import { CustomError } from "../../../../interface/middlewares/error.middleware";

export class GetCourseProgress {
  constructor(
    private courseProgressRepository: ICourseProgressRepository,
    private courseRepository: ICourseRepository,
  ) {}

  async execute(
    userId: string,
    courseId: string
  ): Promise<CourseProgress | null> {
    const course = await this.courseRepository.getCourseById(courseId);

    if (!course) {
      throw new CustomError("Course not found", 400);
    }
    let courseProgress = await this.courseProgressRepository.getCourseProgress(
      userId,
      courseId
    );

    
    if (!courseProgress) {
      courseProgress = await this.courseProgressRepository.createCourseProgress(
        userId,
        courseId,
        course?.lectures
      );
    }

    return courseProgress;
  }
}
