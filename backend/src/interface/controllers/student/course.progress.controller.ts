import { Request, Response, NextFunction } from "express";
import { StudentDIContainer } from "../../../infrastructure/di/containers/studentDIContainer";

class CourseProgressController {
  async getUserCourseProgress(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.user;
      const { courseId } = req.params;
      const getUserCourseProgress =
        StudentDIContainer.getUserCourseProgressUseCase();
      const progress = await getUserCourseProgress.execute(id, courseId);
      res.status(200).json({ progress });
    } catch (error: any) {
      next(error);
    }
  }

  async getCourseDetails(req: Request, res: Response, next: NextFunction) {
    try {
      const { courseId } = req.params;
      const { id } = req.user;
      const getCourseDetails =
        StudentDIContainer.getCourseDetailsAfterPurchaseUseCase();
      const { course, isAlreadyPurchased } = await getCourseDetails.execute(
        id,
        courseId
      );
      res.status(200).json({ course, isAlreadyPurchased });
    } catch (error: any) {
      next(error);
    }
  }

  async updateVideoAsCompleted(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.user;
      const { courseId, lectureId, videoId } = req.params;
      const updateVideoAsCompleted =
        StudentDIContainer.updateVideoAsCompletedUseCase();
      const progress = await updateVideoAsCompleted.execute(
        id,
        courseId,
        lectureId,
        videoId
      );
      res.status(200).json({ progress });
    } catch (error: any) {
      next(error);
    }
  }

  async resetCourseProgress(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.user;
      const { courseId } = req.params;
      const resetCourseProgress =
        StudentDIContainer.resetCourseProgressUseCase();
      const progress = await resetCourseProgress.execute(id, courseId);
      res.status(200).json({ progress });
    } catch (error: any) {
      next(error);
    }
  }
}

const courseProgressController = new CourseProgressController();
export { courseProgressController };
