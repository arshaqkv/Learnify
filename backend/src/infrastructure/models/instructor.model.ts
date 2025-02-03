import mongoose, { Document, Schema } from "mongoose";

interface IInstructor extends Document {
  _id: string;
  instructorId: mongoose.Types.ObjectId;
  qualifications: string[];
  skills: string[];
  experience: number;
  bio: string;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const InstructorSchema: Schema = new Schema(
  {
    instructorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    qualifications: [{ type: String, required: true }],
    skills: [{ type: String, required: true }],
    experience: {
      type: Number,
      required: true,
    },
    bio: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const InstructorModel = mongoose.model<IInstructor>(
  "Instructor",
  InstructorSchema
);
export { InstructorModel, IInstructor };
