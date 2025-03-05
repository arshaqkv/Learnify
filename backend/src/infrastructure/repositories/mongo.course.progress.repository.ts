import { CourseProgress } from "../../domain/entities/course.progress.entity";
import { Lecture } from "../../domain/entities/lecture.entity";
import { ICourseProgressRepository } from "../../domain/interfaces/course.progress.repository";
import { CouresProgressModel } from "../models/course.progress.model";

export class MongoCourseProgressRepository
  implements ICourseProgressRepository
{
  async getCourseProgress(
    userId: string,
    courseId: string
  ): Promise<CourseProgress | null> {
    const courseProgress = await CouresProgressModel.findOne({
      userId,
      courseId,
    });
    return courseProgress;
  }

  async createCourseProgress(
    userId: string,
    courseId: string,
    lectures: any
  ): Promise<CourseProgress | null> {
    const lectureProgress = lectures.map((lecture: any) => ({
      lectureId: lecture._id,
      completedVideos: lecture.videos.map((video: any) => ({
        videoId: video?._id,
        isCompleted: false,
      })),
    }));

    const newCourseProgress = await CouresProgressModel.create({
      userId,
      courseId,
      completedLectures: lectureProgress,
    });

    return newCourseProgress;
  }

  async updateCourseProgress(
    userId: string,
    courseId: string,
    data: any
  ): Promise<CourseProgress | null> {
    const updatedCourseProgress = await CouresProgressModel.findOneAndUpdate(
      { userId, courseId },
      data,
      { new: true }
    );

    return updatedCourseProgress;
  }
}
