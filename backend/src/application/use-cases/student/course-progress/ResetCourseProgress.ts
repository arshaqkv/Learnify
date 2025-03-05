import { ICourseProgressRepository } from "../../../../domain/interfaces/course.progress.repository";
import { ICourseRepository } from "../../../../domain/interfaces/course.repository";
import { CustomError } from "../../../../interface/middlewares/error.middleware";

export class ResetCourseProgress {
  constructor(
    private courseProgressRepository: ICourseProgressRepository,
    private courseRepository: ICourseRepository
  ) {}

  async execute(userId: string, courseId: string) {
    const course = await this.courseRepository.getCourseById(courseId);

    if (!course) {
      throw new CustomError("Course not found", 404);
    }

    const lectureProgress = course?.lectures?.map((lecture: any) => ({
      lectureId: lecture._id,
      completedVideos: lecture.videos.map((video: any) => ({
        videoId: video?._id,
        isCompleted: false,
      })),
    }));

    const progress = await this.courseProgressRepository.updateCourseProgress(
      userId,
      courseId,
      { completedLectures: lectureProgress, progressPercentage: 0 }
    );

    return progress;
  }
}
