import mongoose from "mongoose";
import { IVideo } from "../../infrastructure/models/lecture.model";

export class Video {
  constructor(
    public title: string,
    public videoUrl: string,
    public publicId: string,
    public duration: string
  ) {}
}

export class Lecture {
  constructor(
    public title: string,
    public isFree: boolean,
    public videos: Video[],
    public _id?: string,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {}
}
