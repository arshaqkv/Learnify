import mongoose from "mongoose";
import { IVideo } from "../../infrastructure/models/lecture.model";

export class Video {
  constructor(
    public title: string,
    public videoUrl: string,
    public publicId: string,
    public isPreviewFree: boolean,
    public duration: string
  ) {}
}

export class Lecture {
  constructor(
    public title: string,
    public videos: Video[],
    public _id?: mongoose.Types.ObjectId,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {}
}
