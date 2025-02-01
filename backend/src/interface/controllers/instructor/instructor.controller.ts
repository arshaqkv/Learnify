import { Request, Response, NextFunction } from "express";
import { InstructorDIContainer } from "../../../infrastructure/di/containers/instructorDIcontainer";

class InstructorController {
  //instructor registration
  async RegisterInstructor(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.user;
      const registerInstructor =
        InstructorDIContainer.getRegisterInstructorUseCase();
      const instructor = await registerInstructor.execute(id, req.body);
      res.status(200).json({
        success: true,
        message: "Successfully applied for Instructor role",
      });
    } catch (error: any) {
      next(error);
    }
  }

  //get all instructors
  async getAllInstructors(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const search = req.query.search as string;
      const getAllInstructors = InstructorDIContainer.getAllInstructorUseCase();
      const { instructors, total } = await getAllInstructors.execute(
        page,
        limit,
        search
      );
      res
        .status(200)
        .json({ instructors, total, totalPages: Math.ceil(total / limit) });
    } catch (error: any) {
      next(error);
    }
  }
}

const instructorController = new InstructorController();
export { instructorController };
