import { Router } from "express";
import {
  authorizeRole,
  isAuthenticated,
  isBlocked,
} from "../middlewares/auth.middleware";
import { wishlistController } from "../controllers/student/wishlist.controller";
import { orderController } from "../controllers/student/order.controller";
import { userController } from "../controllers/auth.controller";

const router = Router();

router
  .use(isAuthenticated, isBlocked, authorizeRole(["student", "instructor"]))
  .post("/wishlist/add", wishlistController.addtoWishlist)
  .post("/wishlist/remove", wishlistController.removeFromWishlist)
  .get("/wishlist", wishlistController.getWishlist)
  .get("/get-enrolledCourses", userController.getEnrolledCourses)

  .post("/order/create", orderController.createOrder)
  .get("/get-orders", orderController.getOrders)

export { router as studentRoutes };
