import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phone: string;
  role: string;
  isVerified: boolean;
  isBlocked: boolean;
  profileImage: string;
  googleId?: string;
  resetPasswordToken: string;
  resetPasswordExpiresAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema: Schema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    phone: {
      type: String,
    },
    role: {
      type: String,
      default: "student",
      enum: ["student", "instructor", "admin"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    profileImage: {
      type: String,
      default: "",
    },
    googleId: {
      type: String,
    },
    resetPasswordToken: {
      type: String
    },
    resetPasswordExpiresAt: Date
  },
  { timestamps: true }
);

const UserModel = mongoose.model<IUser>("User", UserSchema);
export { UserModel, IUser };
