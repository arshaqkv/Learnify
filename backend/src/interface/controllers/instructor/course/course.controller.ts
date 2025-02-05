import { Request, Response, NextFunction } from "express";
import { CourseDIContainer } from "../../../../infrastructure/di/containers/courseDIContainer";

class CourseController {
  async createCourse(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.user;
      let { title, description, category, price, level } = req.body;
      let courseData = { title, description, category, price, level, id };
      const fileBuffer = req.file ? req.file.buffer : undefined;
      console.log(req.body);
      const createCourse = CourseDIContainer.getCreateCourseUseCase();
      const newCourse = await createCourse.execute(courseData, fileBuffer);
      res.status(201).json({
        message: "Course created successfully!",
        course: newCourse,
      });
    } catch (error: any) {
      next(error);
    }
  }

  async getAllCourses(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const search = req.query.search as string;
      const getAllCourses = CourseDIContainer.getAllCoursesUseCase();
      const { courses, total } = await getAllCourses.execute(
        page,
        limit,
        search
      );
      res
        .status(200)
        .json({ courses, total, totalPages: Math.ceil(total / limit) });
    } catch (error: any) {
      next(error);
    }
  }

  async getAllPublishedCourses(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const getAllPublishedCourses =
        CourseDIContainer.getAllPublishedCoursesUseCase();
      const courses = await getAllPublishedCourses.execute();
      res.status(200).json({ courses });
    } catch (error: any) {
      next(error);
    }
  }

  async getCourse(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const getCourse = CourseDIContainer.getCourseUseCase();
      const course = await getCourse.execute(id);
      res.status(200).json({ course });
    } catch (error: any) {
      next(error);
    }
  }
}

const courseController = new CourseController();
export { courseController };
