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
      const userId = req.query.userId as string;
      const getCourse = CourseDIContainer.getCourseUseCase();
      const { course, isWishlisted } = await getCourse.execute(
        courseId,
        userId
      );
      res.status(200).json({ course, isWishlisted });
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
      const fileBuffer = req.file ? req.file.buffer : undefined;
      const createLecture = CourseDIContainer.getCreateLectureUseCase();
      const course = await createLecture.execute(id, req.body, fileBuffer);
      res
        .status(200)
        .json({ message: "Lecture uploaded successfully", course });
    } catch (error: any) {
      next(error);
    }
  }

  async editLecture(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const fileBuffer = req.file ? req.file.buffer : undefined;
      const editCourse = CourseDIContainer.getEditLectureUseCase();
      await editCourse.execute(id, req.body, fileBuffer);
      res.status(200).json({ message: "Lecture updated successfully" });
    } catch (error: any) {
      next(error);
    }
  }

  async deleteLecture(req: Request, res: Response, next: NextFunction) {
    try {
      const { courseId, id } = req.params;
      console.log(courseId, id)
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
