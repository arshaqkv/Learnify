import { Request, Response, NextFunction } from "express";
import { CourseDIContainer } from "../../../../infrastructure/di/containers/courseDIContainer";

class CourseController {
  async createCourse(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.user;
      let { title, description, category, price, level } = req.body;
      let courseData = { title, description, category, price, level, id };
      const fileBuffer = req.file ? req.file.buffer : undefined;
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
      const { id } = req.user;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const search = req.query.search as string;
      const getAllCourses = CourseDIContainer.getAllCoursesUseCase();
      const { courses, total } = await getAllCourses.execute(
        id,
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

  async editCourse(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const editCourse = CourseDIContainer.getEditCourseUseCase();
      const fileBuffer = req.file ? req.file.buffer : undefined;
      await editCourse.execute(id, req.body, fileBuffer);
      res.status(200).json({ message: "Course updated successfully" });
    } catch (error: any) {
      next(error);
    }
  }

  async deleteCourse(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const deleteCourse = CourseDIContainer.getDeleteCourseUseCase();
      await deleteCourse.execute(id);
      res.status(200).json({ message: "Course deleted successfully" });
    } catch (error: any) {
      next(error);
    }
  }
}

const courseController = new CourseController();
export { courseController };
