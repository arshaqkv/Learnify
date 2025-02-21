import { Course } from "../../domain/entities/course.entity";
import { Lecture } from "../../domain/entities/lecture.entity";
import { ICourseRepository } from "../../domain/interfaces/course.repository";
import { CourseModel } from "../models/course.model";

export class MongoCourseRepository implements ICourseRepository {
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

  async getAllPublishedcourses(
    page: number,
    limit: number,
    search?: string,
    category?: string,
    level?: string,
    sort?: string
  ): Promise<{ courses: Course[]; total: number }> {
    const skip = (page - 1) * limit;

    // const regex = search ? new RegExp(search, "i") : null;
    const query: any = { isPublished: true };

    // 🔍 Search by title
    if (search) {
      query.title = { $regex: search, $options: 'i' }
    }

    // 🏷 Filter by category
    if (category) {
      const categoriesArray = category.split(",").filter(Boolean);
      query.category = { $in: categoriesArray };
    }

    //filter by level
    if (level) {
      query.level = level;
    }

    // 🔽 Sorting logic
    let sortOption: any = {};
    switch (sort) {
      case "low":
        sortOption.price = 1;
        break;
      case "high":
        sortOption.price = -1;
        break;
      case "a-z":
        sortOption.title = 1;
        break;
      case "z-a":
        sortOption.title = -1;
        break;
    }

    const courses = await CourseModel.find(query)
      .populate("category")
      .populate("creator")
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    const total = await CourseModel.countDocuments(query);
    return { courses, total };
  }

  async getCourseById(id: string): Promise<Course | null> {
    const course = await CourseModel.findById(id)
      .populate("category")
      .populate("creator", "firstname lastname profileImage")
      .populate({
        path: "lectures",
      })
      .exec();
    return course;
  }

  async updateCourse(
    id: string,
    data: Partial<Course>
  ): Promise<Course | null> {
    return await CourseModel.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteCourse(id: string): Promise<void> {
    await CourseModel.findByIdAndDelete(id);
  }

  async addLecture(id: string, lectureId?: string): Promise<void> {
    await CourseModel.findByIdAndUpdate(
      id,
      { $push: { lectures: lectureId } },
      { new: true }
    );
  }

  async removeLecture(id: string, lectureId: string): Promise<void> {
    await CourseModel.findByIdAndUpdate(
      id,
      { $pull: { lectures: lectureId } },
      { new: true }
    );
  }

  async updateCourseEnrollmentCount(courseId: string): Promise<void> {
    await CourseModel.findByIdAndUpdate(courseId, {
      $inc: { enrolledCount: 1 },
    });
  }
}
