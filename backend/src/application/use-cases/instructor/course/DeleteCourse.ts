import { ICourseRepository } from "../../../../domain/interfaces/course.repository";
import { ILectureRepository } from "../../../../domain/interfaces/lecture.repository";
import { ICloudinaryService } from "../../../../infrastructure/services/cloudinary/Cloudinary";
import { CustomError } from "../../../../interface/middlewares/error.middleware";

export class DeleteCourse {
  constructor(
    private courseRepository: ICourseRepository,
    private cloudinaryService: ICloudinaryService,
    private lectureRepository: ILectureRepository
  ) {}

  async execute(id: string): Promise<void> {
    const course = await this.courseRepository.getCourseById(id);
    if (!course) {
      throw new CustomError("Course not found", 400);
    }

    const lectureIds = course.lectures;
    if (lectureIds) {
      for (let lectureId of lectureIds) {
        const lecture = await this.lectureRepository.getLectureById(lectureId.toString());
        if (!lecture) {
          throw new CustomError("Lecture not found", 400);
        }
        
        lecture.videos.map(async (video) => {
          await this.cloudinaryService.deleteVideo(video.publicId);
        });

        await this.lectureRepository.deleteLecture(lectureId.toString());
      }
    }

    await this.cloudinaryService.deleteImage(course.thumbnailPublicId);

    await this.courseRepository.deleteCourse(id);
  }
}
