import { Lecture } from "../../../../domain/entities/lecture.entity";
import { ILectureRepository } from "../../../../domain/interfaces/lecture.repository";
import { CustomError } from "../../../../interface/middlewares/error.middleware";

export class GetLecture {
  constructor(private lectureRepository: ILectureRepository) {}

  async execute(id: string): Promise<Lecture | null> {
    const lecture = await this.lectureRepository.getLectureById(id);

    if (!lecture) {
      throw new CustomError("Lecture not found", 400);
    }

    return lecture;
  }
}
