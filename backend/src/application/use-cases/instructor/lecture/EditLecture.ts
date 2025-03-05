import { ILectureRepository } from "../../../../domain/interfaces/lecture.repository";
import { Lecture } from "../../../../domain/entities/lecture.entity";
import { ICloudinaryService } from "../../../../infrastructure/services/cloudinary/Cloudinary";
import { CustomError } from "../../../../interface/middlewares/error.middleware";

export class EditLecture {
  constructor(
    private lectureRepository: ILectureRepository,
    private cloudinaryService: ICloudinaryService
  ) {}

  async execute(
    id: string,
    data: Partial<Lecture>,
    fileBuffers?: Buffer[]
  ): Promise<void> {
    const { title, videos } = data;
    const lecture = await this.lectureRepository.getLectureById(id);

    if (!lecture) {
      throw new CustomError("Lecture not found", 400);
    }

    let updatedData: Partial<Lecture> = {
      title,
      videos,
    };

    if (fileBuffers && fileBuffers.length > 0) {
      if (lecture.videos && lecture.videos.length > 0) {
        await Promise.all(
          lecture.videos.map((video) =>
            this.cloudinaryService.deleteVideo(video.publicId)
          )
        );
      }

      const uploadedVideos = await Promise.all(
        fileBuffers.map(async (buffer, index) => {
          const uploadResponse =
            await this.cloudinaryService.uploadLecturevideo(buffer);

          return {
            title: videos
              ? videos[index]?.title || `Video ${index + 1}`
              : `Video ${index + 1}`,
            duration: videos ? videos[index]?.duration || "0:0" : "0:0",
            videoUrl: uploadResponse.url,
            publicId: uploadResponse.publicId,
            isPreviewFree: videos ? videos[index]?.isPreviewFree: false
          };
        })
      );
      updatedData.videos = uploadedVideos;
    }

    await this.lectureRepository.updateLecture(id, updatedData);
  }
}
