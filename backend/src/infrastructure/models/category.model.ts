import mongoose, { Document, Schema } from "mongoose";

interface ICategory extends Document {
  _id: string;
  name: string;
  description: string;
  isDeleted: boolean;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const CategorySchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      default: "",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const CategoryModel = mongoose.model<ICategory>("Category", CategorySchema);
export { CategoryModel, ICategory };
