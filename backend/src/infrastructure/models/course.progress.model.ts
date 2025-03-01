import mongoose, { Document, Schema, ObjectId, mongo } from "mongoose";

interface IVideoProgress extends Document {
  videoId: string | ObjectId;
  isCompleted: boolean;
}

interface ILectureProgress extends Document {
  lectureId: string | ObjectId;
  completedVideos: IVideoProgress[];
}

interface ICourseProgress extends Document {
  userId: ObjectId;
  courseId: ObjectId;
  completedLectures: ILectureProgress[];
  progressPercentage: number;
  createdAt: Date;
  updatedAt: Date;
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
  completedvideos: {
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
    },
  },
  { timestamps: true }
);

const CouresProgressModel = mongoose.model<ICourseProgress>(
  "CouresProgress",
  CourseProgressSchema
);
export { ICourseProgress, CouresProgressModel };
