import { Course } from "../../../../domain/entities/course.entity";
import { ICourseRepository } from "../../../../domain/interfaces/course.repository";
import { CloudinaryService } from "../../../../infrastructure/services/cloudinary/Cloudinary";
import { CustomError } from "../../../../interface/middlewares/error.middleware";

export class EditCourse {
  constructor(
    private courseRepository: ICourseRepository,
    private cloudinaryService: CloudinaryService
  ) {}

  async execute(
    id: string,
    data: Partial<Course>,
    fileBuffer?: Buffer
  ): Promise<void> {
    const { title, subtitle, description, category, price, level } = data;
    const course = await this.courseRepository.getCourseById(id);

    if (!course) {
      throw new CustomError("Course not found", 400);
    }

    if (title && title !== course.title) {
      const existingCourse = await this.courseRepository.getCourseByTitle(
        title
      );
      if (existingCourse) {
        throw new CustomError("Course with the same title already exists", 400);
      }
    }

    const updateData: Partial<Course> = {
      title,
      subtitle,
      description,
      category,
      price,
      level,
    };

    if (fileBuffer) {
      await this.cloudinaryService.deleteImage(course.thumbnailPublicId);
      const { url, publicId } = await this.cloudinaryService.uploadCourseImage(
        fileBuffer
      );
      updateData.thumbnail = url;
      updateData.thumbnailPublicId = publicId;
    }

    await this.courseRepository.updateCourse(id, updateData);
  }
}
