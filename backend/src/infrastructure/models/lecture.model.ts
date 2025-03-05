import mongoose, { Document, Schema } from "mongoose";

export interface IVideo extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  videoUrl: string;
  publicId: string;
  isPreviewFree: boolean;
  duration: string;
}

interface ILecture extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  videos: IVideo[] | mongoose.Types.DocumentArray<IVideo>;
  createdAt?: Date;
  updatedAt?: Date;
}

const VideoSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
    required: true,
  },
  publicId: {
    type: String,
  },
  isPreviewFree: {
    type: Boolean,
  },
  duration: {
    type: String,
  },
});

const LectureSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    videos: {
      type: [VideoSchema],
      default: [],
    },
  },
  { timestamps: true }
);

const LectureModel = mongoose.model<ILecture>("Lecture", LectureSchema);
export { ILecture, LectureModel };
