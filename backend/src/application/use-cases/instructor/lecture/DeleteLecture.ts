import { ICourseRepository } from "../../../../domain/interfaces/course.repository";
import { ILectureRepository } from "../../../../domain/interfaces/lecture.repository";
import { ICloudinaryService } from "../../../../infrastructure/services/cloudinary/Cloudinary";
import { CustomError } from "../../../../interface/middlewares/error.middleware";

export class DeleteLecture {
  constructor(
    private lectureRepository: ILectureRepository,
    private cloudinaryService: ICloudinaryService,
    private courseRepository: ICourseRepository
  ) {}

  async execute(id: string, courseId: string): Promise<void> {
    const lecture = await this.lectureRepository.getLectureById(id);

    if (!lecture) {
      throw new CustomError("Lecture not found", 400);
    }

    await this.cloudinaryService.deleteVideo(lecture.publicId);

    await this.courseRepository.removeLecture(courseId, id);

    await this.lectureRepository.deleteLecture(id)
  }
}
