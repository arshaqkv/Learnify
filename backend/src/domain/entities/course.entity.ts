import mongoose from "mongoose";

export class Course {
  constructor(
    public title: string,
    public subtitle: string,
    public description: string,
    public price: number,
    public creator: mongoose.Types.ObjectId,
    public category: mongoose.Types.ObjectId,
    public thumbnail: string,
    public thumbnailPublicId: string,
    public level: string,
    public lectures?: mongoose.Types.ObjectId[],
    public _id?: string,
    public isPublished?: boolean,
    public isDeleted?: boolean,
    public enrolledCount: number = 0,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {}
}
