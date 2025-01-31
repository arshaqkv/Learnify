import { Request, Response, NextFunction } from "express";
import { AuthDIContainer } from "../../../../infrastructure/di/containers/authDIContainer";
import { accessCookieOptions } from "../../../../utils/cookieHelper";

class StudentController {
  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const search = req.query.search as string;
      const getAllUsers = AuthDIContainer.getAllUserDataUseCase();
      const { users, totalUsers } = await getAllUsers.execute(
        page,
        limit,
        search
      );

      res
        .status(200)
        .json({
          success: true,
          users,
          pagination: { totalUsers, totalPages: Math.ceil(totalUsers / limit) },
          currentPage: page
        });
    } catch (error) {
      next(error);
    }
  }

  async blockUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const blockUser = AuthDIContainer.getBlockUserUseCase();
      await blockUser.execute(id);
      res.status(200).json({ success: true, message: "User blocked" });
    } catch (error) {
      next(error);
    }
  }

  async unBlockUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const unBlockUser = AuthDIContainer.getUnblockUserUseCase();
      await unBlockUser.execute(id);
      res.status(200).json({ success: true, message: "User Unblocked" });
    } catch (error) {
      next(error);
    }
  }

  //refresh token
  async adminRefreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      console.log("########################3",refreshToken)
      const newAccessToken =
        await AuthDIContainer.getRefreshTokenUseCase().execute(refreshToken);
      res
        .cookie("accessToken", newAccessToken, accessCookieOptions)
        .status(200)
        .json({ message: "Token refreshed" });
    } catch (error: any) {
      next(error);
    }
  }
}

const studentController = new StudentController();
export { studentController };
