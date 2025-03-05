import mongoose, { Document, Schema } from "mongoose";

interface IVideoProgress extends Document {
  videoId: string | mongoose.Types.ObjectId;
  isCompleted: boolean;
}

interface ILectureProgress extends Document {
  lectureId: string | mongoose.Types.ObjectId;
  completedVideos: IVideoProgress[];
}

interface ICourseProgress extends Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  courseId: mongoose.Types.ObjectId;
  completedLectures: ILectureProgress[];
  progressPercentage: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const VideoProgressSchema: Schema = new Schema({
  videoId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  isCompleted: {
    type: Boolean,
  },
});

const LectureProgressSchmea: Schema = new Schema({
  lectureId: {
    type: mongoose.Types.ObjectId,
    ref: "Lecture",
  },
  completedVideos: {
    type: [VideoProgressSchema],
    default: [],
  },
});

const CourseProgressSchema: Schema = new Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    courseId: {
      type: mongoose.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    completedLectures: {
      type: [LectureProgressSchmea],
    },
    progressPercentage: {
      type: Number,
      default: 0
    },
  },
  { timestamps: true }
);

const CouresProgressModel = mongoose.model<ICourseProgress>(
  "CouresProgress",
  CourseProgressSchema
);
export { ICourseProgress, ILectureProgress, CouresProgressModel };
