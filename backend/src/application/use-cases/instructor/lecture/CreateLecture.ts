import { Lecture } from "../../../../domain/entities/lecture.entity";
import { ICourseRepository } from "../../../../domain/interfaces/course.repository";
import { ILectureRepository } from "../../../../domain/interfaces/lecture.repository";
import { CloudinaryService } from "../../../../infrastructure/services/cloudinary/Cloudinary";
import { CustomError } from "../../../../interface/middlewares/error.middleware";

export class CreateLecture {
  constructor(
    private lectureRepository: ILectureRepository,
    private courseRepository: ICourseRepository,
    private cloudinaryService: CloudinaryService
  ) {}

  async execute(
    courseId: string,
    data: Lecture,
    fileBuffers?: Buffer[]
  ): Promise<void> {
    const { title, videos } = data;
    if (!courseId) {
      throw new CustomError("Course id not found", 400);
    }

    if (!title || !videos) {
      throw new CustomError("Data not provided", 400);
    }

    if (!fileBuffers || fileBuffers.length === 0) {
      throw new CustomError("Lecture videos are not provided", 400);
    }

    const uploadedFiles = await Promise.all(
      fileBuffers.map(async (buffer, index) => {
        const uploadResponse = await this.cloudinaryService.uploadLecturevideo(
          buffer
        );

        return {
          title: videos[index].title,
          duration: videos[index].duration, 
          videoUrl: uploadResponse.url,
          publicId: uploadResponse.publicId,
          isPreviewFree: videos[index].isPreviewFree
        };
      })
    );

    const newLecture = new Lecture(title, uploadedFiles);
 
    const lecture = await this.lectureRepository.createNewLecture(newLecture);
    if (!lecture) {
      throw new CustomError("Error in creating lecture", 400);
    }

    const course = await this.courseRepository.getCourseById(courseId);
    if (!course) {
      throw new CustomError("Course not found", 400);
    }
    let lectureId = lecture._id?.toString()
    await this.courseRepository.addLecture(courseId, lectureId);
  }
}
