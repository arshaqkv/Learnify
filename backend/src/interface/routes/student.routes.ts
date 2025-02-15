import { Router } from "express";
import { authorizeRole, isAuthenticated, isBlocked } from "../middlewares/auth.middleware";
import { wishlistController } from "../controllers/student/wishlist.controller";

const router = Router();

router
  .use(isAuthenticated, isBlocked, authorizeRole(["student", "instructor"]))
  .post("/wishlist/add", wishlistController.addtoWishlist)
  .post("/wishlist/remove", wishlistController.removeFromWishlist)
  .get("/wishlist", wishlistController.getWishlist);

export { router as studentRoutes };
