import mongoose, { Document, Schema } from "mongoose";

interface ILecture extends Document {
  _id: string;
  title: string;
  isPreviewFree: boolean;
  videoUrl: string;
  publicId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const LectureSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    isPreviewFree: {
      type: Boolean,
      required: true
    },
    videoUrl: {
      type: String,
      required: true
    },
    publicId: {
      type: String,
      required: true
    },
  },
  { timestamps: true }
);

const LectureModel = mongoose.model<ILecture>("Lecture", LectureSchema);
export { ILecture, LectureModel };
