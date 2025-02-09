import { ICourseRepository } from "../../../../domain/interfaces/course.repository";
import { Course } from "../../../../domain/entities/course.entity";
import { CustomError } from "../../../../interface/middlewares/error.middleware";
import { ICloudinaryService } from "../../../../infrastructure/services/cloudinary/Cloudinary";
import mongoose from "mongoose";

export class CreateCourse {
  constructor(
    private courseRepository: ICourseRepository,
    private cloudinaryService: ICloudinaryService
  ) {}

  async execute(data: any, fileBuffer?: Buffer): Promise<Course> {

    const {title, description, category, price, level, id} = data
    
    if(!data){
        throw new CustomError('Data not provided', 400)
    }

    if(!fileBuffer){
        throw new CustomError('Image not provided', 400)
    }
    if(!category) {
        throw new CustomError('Category not provided', 400)
    }
    if(!title){
        throw new CustomError('Title required', 400)
    }

    if (!id) {
      throw new CustomError("Instructor not found", 400);
    }

    const existingCourse = await this.courseRepository.getCourseByTitle(data.title)
    if(existingCourse){
        throw new CustomError("Course with same title already available", 400)
    }

    const {url, publicId} = await this.cloudinaryService.uploadCourseImage(fileBuffer)
    
    const thumbnail = url
    const thumbnailPublicId = publicId
    const creator = new mongoose.Types.ObjectId(id)
    const categoryId = new mongoose.Types.ObjectId(category)

    const newCourse = new Course(title, description, price, creator, categoryId, thumbnail, thumbnailPublicId, level)
    

    const course = this.courseRepository.createNewCourse(newCourse)
    return course;
  }
}
