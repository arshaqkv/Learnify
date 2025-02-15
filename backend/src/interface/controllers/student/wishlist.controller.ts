import { Request, Response, NextFunction } from "express";
import { StudentDIContainer } from "../../../infrastructure/di/containers/studentDIContainer";

class WishlistController {
  async addtoWishlist(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.user;
      const { courseId } = req.body;
      const addtoWishlist = StudentDIContainer.getAddCourseToWishlistUseCase();
      await addtoWishlist.execute(id, courseId);
      res.status(200).json({ message: "Course added to wishlist" });
    } catch (error: any) {
      next(error);
    }
  }

  async removeFromWishlist(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.user;
      const { courseId } = req.body;
      const removeFromWishlist =
        StudentDIContainer.getRemoveCourseFromWishlistUseCase();
      await removeFromWishlist.execute(id, courseId);
      res.status(200).json({ message: "Course removed from wishlist" });
    } catch (error: any) {
      next(error);
    }
  }

  async getWishlist(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.user;
      const getWishlist = StudentDIContainer.getWishlistUseCase();
      const wishlist = await getWishlist.execute(id);
      res.status(200).json({ wishlist});
    } catch (error: any) {
      next(error);
    }
  }
}

const wishlistController = new WishlistController();
export { wishlistController };
