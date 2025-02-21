import mongoose from "mongoose";

export class User {
  constructor(
    public firstname: string,
    public lastname: string,
    public email: string,
    public password: string | undefined,
    public phone: string | undefined,
    public profileImage: string = "",
    public googleId?: string,
    public profileImagePublicId?: string,
    public isVerified: boolean = false,
    public role: string = "student",
    public isBlocked: boolean = false,
    public enrolledCourses?: mongoose.Types.ObjectId[],
    public _id?: string,
    public createdAt?: Date,
    public updatedAt?: Date,
    public resetPasswordToken?: string | undefined,
    public resetPasswordExpiresAt?: Date
  ) {}
}
