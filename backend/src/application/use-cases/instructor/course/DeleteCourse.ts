import { ICourseRepository } from "../../../../domain/interfaces/course.repository";
import { ICloudinaryService } from "../../../../infrastructure/services/cloudinary/Cloudinary";
import { CustomError } from "../../../../interface/middlewares/error.middleware";

export class DeleteCourse {
  constructor(private courseRepository: ICourseRepository, private cloudinaryService: ICloudinaryService) {}

  async execute(id: string): Promise<void>{

    const course = await this.courseRepository.getCourseById(id)
    if(!course){
        throw new CustomError("Course not found", 400)
    }

    await this.cloudinaryService.deleteImage(course.thumbnailPublicId)

    await this.courseRepository.deleteCourse(id)
  }
}
