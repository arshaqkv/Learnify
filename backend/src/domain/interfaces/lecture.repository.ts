import { Lecture } from "../entities/lecture.entity";

export interface ILectureRepository {
  createNewLecture(lecture: Lecture): Promise<Lecture | null>;
  getLectureById(id: string): Promise<Lecture | null>;
  getLectureByTitle(title: string): Promise<Lecture | null>;
  updateLecture(id: string, data: Partial<Lecture>): Promise<void>;
  deleteLecture(id: string): Promise<void>;
  findAllLectures(): Promise<Lecture[]>;
}
