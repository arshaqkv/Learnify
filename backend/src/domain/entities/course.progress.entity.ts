import mongoose from "mongoose";
import { ILectureProgress } from "../../infrastructure/models/course.progress.model";

export class CourseProgress {
  constructor(
    public _id: mongoose.Types.ObjectId,
    public userId: mongoose.Types.ObjectId,
    public courseId: mongoose.Types.ObjectId,
    public completedLectures: ILectureProgress[],
    public progressPercentage: number,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {}
}
