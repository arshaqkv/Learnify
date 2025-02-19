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
    fileBuffer?: Buffer
  ): Promise<void> {
    const { title, isPreviewFree } = data;
    if (!courseId) {
      throw new CustomError("Course id not found", 400);
    }

    if (!title || !isPreviewFree) {
      throw new CustomError("Data not provided", 400);
    }

    if (!fileBuffer) {
      throw new CustomError("Lecture video is not provided", 400);
    }

    const { url, publicId } = await this.cloudinaryService.uploadLecturevideo(
      fileBuffer
    );

    const newLecture = new Lecture(title, isPreviewFree, url, publicId);

    const lecture = await this.lectureRepository.createNewLecture(newLecture)
    if(!lecture){
        throw new CustomError("Error in creating lecture", 400)
    }

    const course = await this.courseRepository.getCourseById(courseId);
    if(!course){
        throw new CustomError("Course not found", 400)
    }
    await this.courseRepository.addLecture(courseId, lecture?.id)
  }
}
