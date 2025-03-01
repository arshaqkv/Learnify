import { Request, Response, NextFunction } from "express";
import { CourseDIContainer } from "../../../../infrastructure/di/containers/courseDIContainer";
import { verifyAccessToken } from "../../../../config/verifyToken";

class CourseController {
  async createCourse(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.user;
      let { title, subtitle, description, category, price, level } = req.body;
      let courseData = { title, subtitle, description, category, price, level };
      const fileBuffer = req.file ? req.file.buffer : undefined;
      const createCourse = CourseDIContainer.getCreateCourseUseCase();
      const newCourse = await createCourse.execute(id, courseData, fileBuffer);
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
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const search = req.query.search as string;
      const category = req.query.category as string;
      const level = req.query.level as string;
      const sort = req.query.sort as string;

      const getAllPublishedCourses =
        CourseDIContainer.getAllPublishedCoursesUseCase();
      const { courses, total } = await getAllPublishedCourses.execute(
        page,
        limit,
        search,
        category,
        level,
        sort
      );
      res.status(200).json({
        courses,
        totalPages: Math.ceil(total / limit),
        totalCourses: total,
      });
    } catch (error: any) {
      next(error);
    }
  }

  async getCourse(req: Request, res: Response, next: NextFunction) {
    try {
      const { courseId } = req.params;
      const token = req.cookies.accessToken;
      if (token) {
        const decoded = verifyAccessToken(token);
        req.user = decoded;
      }
      const id = req.user ? req.user.id : undefined;
      const getCourse = CourseDIContainer.getCourseUseCase();
      const {
        course,
        isWishlisted,
        isAlreadyPurchased,
        isCourseOftheSameUser,
      } = await getCourse.execute(courseId, id);
      res.status(200).json({
        course,
        isWishlisted,
        isAlreadyPurchased,
        isCourseOftheSameUser,
      });
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

  async getCourseDetailsForInstructor(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const getCourseDetailsForInstructor =
        CourseDIContainer.getCourseForInstructorUseCase();
      const course = await getCourseDetailsForInstructor.execute(id);
      res.status(200).json({ course });
    } catch (error: any) {
      next(error);
    }
  }

  async toggleCoursePublish(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const toggleCoursePublish = CourseDIContainer.getToggleCoursePublish();
      const course = await toggleCoursePublish.execute(id);
      res.status(200).json({
        message: course?.isPublished
          ? "Course published"
          : "Course Unpublished",
      });
    } catch (error: any) {
      next(error);
    }
  }

  async createLecture(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const files = req.files as Express.Multer.File[];
      const createLecture = CourseDIContainer.getCreateLectureUseCase();
      const fileBuffers = files?.map((file) => file.buffer);
      await createLecture.execute(id, req.body, fileBuffers);
      res.status(200).json({ message: "Lecture uploaded successfully" });
    } catch (error: any) {
      next(error);
    }
  }

  async editLecture(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const files = req.files as Express.Multer.File[];
      const editCourse = CourseDIContainer.getEditLectureUseCase();
      const fileBuffers = files?.map((file) => file.buffer);
      await editCourse.execute(id, req.body, fileBuffers);
      res.status(200).json({ message: "Lecture updated successfully" });
    } catch (error: any) {
      next(error);
    }
  }

  async deleteLecture(req: Request, res: Response, next: NextFunction) {
    try {
      const { courseId, id } = req.params;
      const deleteLecture = CourseDIContainer.getDeleteLectureUseCase();
      await deleteLecture.execute(id, courseId);
      res.status(200).json({ message: "Lecture removed successfully" });
    } catch (error: any) {
      next(error);
    }
  }

  async getLecture(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const getLecture = CourseDIContainer.getLectureUseCase();
      const lecture = await getLecture.execute(id);
      res.status(200).json({ lecture });
    } catch (error: any) {
      next(error);
    }
  }
}

const courseController = new CourseController();
export { courseController };
