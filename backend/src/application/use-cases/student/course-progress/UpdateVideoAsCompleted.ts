import mongoose from "mongoose";
import { ICourseProgressRepository } from "../../../../domain/interfaces/course.progress.repository";
import { CustomError } from "../../../../interface/middlewares/error.middleware";

export class UpdateVideoAsCompleted {
  constructor(private courseProgressRepository: ICourseProgressRepository) {}

  async execute(
    userId: string,
    courseId: string,
    lectureId: string,
    videoId: string
  ) {
    const courseProgress =
      await this.courseProgressRepository.getCourseProgress(userId, courseId);

    if (!courseProgress) {
      throw new CustomError("Course progress not found", 400);
    }

    let totalVideos = 0;
    let totalCompletedVideos = 0;

    if (
      !courseProgress.completedLectures ||
      !Array.isArray(courseProgress.completedLectures)
    ) {
      throw new CustomError("Course progress has no lectures", 400);
    }

    if (courseProgress) {
      courseProgress.completedLectures.forEach((lecture) => {
        lecture.completedVideos.forEach((video) => {
          totalVideos++;
          if (video.isCompleted) totalCompletedVideos++;
        });
      });
    }

    const lecture = courseProgress.completedLectures.find(
      (l) => l.lectureId.toString() === lectureId
    );

    if (!lecture) {
      throw new CustomError("Lecture not found in course progress", 404);
    }

    const video = lecture.completedVideos.find(
      (v) => v.videoId.toString() === videoId
    );

    if (!video) {
      throw new CustomError("Video not found in course progress", 404);
    }

    if (!video.isCompleted) {
      video.isCompleted = true;
      totalCompletedVideos++;
    }

    const progressPercentage = (totalCompletedVideos / totalVideos) * 100;

    const updatedCourseProgress =
      await this.courseProgressRepository.updateCourseProgress(
        userId,
        courseId,
        {
          completedLectures: courseProgress.completedLectures,
          progressPercentage,
        }
      );
    return updatedCourseProgress;
  }
}
