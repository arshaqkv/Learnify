import { Course } from "../../domain/entities/course.entity";
import { ICourseRepository } from "../../domain/interfaces/course.repository";
import { CourseModel } from "../models/course.model";

export class MonogoCourseRepository implements ICourseRepository {
  async createNewCourse(course: Course): Promise<Course> {
    const newCourse = await CourseModel.create(course);
    return newCourse;
  }

  async getCourseByTitle(title: string): Promise<Course | null> {
    const course = await CourseModel.findOne({
      title: { $regex: `^${title}$`, $options: "i" },
    });
    return course;
  }

  async getAllCourses(
    creator: string,
    page: number,
    limit: number,
    search?: string
  ): Promise<{ courses: Course[]; total: number }> {
    const skip = (page - 1) * limit;

    // const regex = new RegExp(`^${search}`, "i");
    // const query = search ? { title: { $regex: regex } } : {};

    const regex = search ? new RegExp(`^${search}`, "i") : null;
    const query: any = { creator };

    if (search) {
      query.title = { $regex: regex };
    }

    const courses = await CourseModel.find(query)
      .populate("category")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await CourseModel.countDocuments(query);
    return { courses, total };
  }

  async getAllPublishedcourses(): Promise<Course[]> {
    const courses = await CourseModel.find().populate("creator");
    return courses;
  }

  async getCourseById(id: string): Promise<Course | null> {
    const course = CourseModel.findById(id)
      .populate("category")
      .populate("creator");
    return course;
  }

  async updateCourse(id: string, data: Partial<Course>): Promise<void> {
    await CourseModel.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteCourse(id: string): Promise<void> {
    await CourseModel.findByIdAndDelete(id);
  }
}
