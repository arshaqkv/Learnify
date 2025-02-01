import mongoose from "mongoose";

export class Instructor {
  constructor(
    public instructorId: mongoose.Types.ObjectId,
    public qualifications: string[],
    public skills: string[],
    public experience: number,
    public bio: string,
    public status?: string,
    public _id?: string,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {}
}
