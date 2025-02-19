import { ILectureRepository } from "../../../../domain/interfaces/lecture.repository";
import { Lecture } from "../../../../domain/entities/lecture.entity";
import {
  CloudinaryService,
  ICloudinaryService,
} from "../../../../infrastructure/services/cloudinary/Cloudinary";
import { CustomError } from "../../../../interface/middlewares/error.middleware";

export class EditLecture {
  constructor(
    private lectureRepository: ILectureRepository,
    private cloudinaryService: ICloudinaryService
  ) {}

  async execute(
    id: string,
    data: Partial<Lecture>,
    fileBuffer?: Buffer
  ): Promise<void> {
    const { title, isPreviewFree } = data;
    const lecture = await this.lectureRepository.getLectureById(id)

    if(!lecture){
        throw new CustomError("Lecture not found", 400)
    }

    let updatedData: Partial<Lecture> = {
        title,
        isPreviewFree
    }

    if(fileBuffer){
        await this.cloudinaryService.deleteVideo(lecture.publicId)
        const { url, publicId} = await this.cloudinaryService.uploadLecturevideo(fileBuffer)
        updatedData.videoUrl = url
        updatedData.publicId = publicId
    }

    await this.lectureRepository.updateLecture(id, updatedData)
  }
}
