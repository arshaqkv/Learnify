import mongoose from "mongoose";

export class Course {
  constructor(
    public title: string,
    public description: string,
    public price: number,
    public creator: mongoose.Types.ObjectId,
    public category: mongoose.Types.ObjectId,
    public thumbnail: string,
    public thumbnailPublicId: string,
    public level: string,
    public lectures?: string[],
    public _id?: string,
    public isPublished?: boolean,
    public isDeleted?: boolean,
    public enrolledCount?: number,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {}
}
