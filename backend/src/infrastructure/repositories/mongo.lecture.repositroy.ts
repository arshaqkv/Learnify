import { ILectureRepository } from "../../domain/interfaces/lecture.repository";
import { Lecture } from "../../domain/entities/lecture.entity";
import { LectureModel } from "../models/lecture.model";

export class MongoLectureRepository implements ILectureRepository {
  async createNewLecture(lecture: Lecture): Promise<Lecture | null> {
    const newLecture = await LectureModel.create(lecture);
    return newLecture;
  }

  async getLectureById(id: string): Promise<Lecture | null> {
    const lecture = await LectureModel.findById(id);
    return lecture;
  }

  async getLectureByTitle(title: string): Promise<Lecture | null> {
    const lecture = await LectureModel.findOne({ title });
    return lecture;
  }

  async updateLecture(id: string, data: Partial<Lecture>): Promise<void> {
    await LectureModel.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteLecture(id: string): Promise<void> {
    await LectureModel.findByIdAndDelete(id);
  }

  async findAllLectures(): Promise<Lecture[]> {
    const lectures = await LectureModel.find();
    return lectures;
  }
}
