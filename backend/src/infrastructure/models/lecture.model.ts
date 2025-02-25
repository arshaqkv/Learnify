import mongoose, { Document, Schema } from "mongoose";

export interface IVideo extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  videoUrl: string;
  publicId: string;
  duration: string;
}

interface ILecture extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  isFree: boolean;
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
    isFree: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const LectureModel = mongoose.model<ILecture>("Lecture", LectureSchema);
export { ILecture, LectureModel };
