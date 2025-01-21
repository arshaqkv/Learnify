import { Router } from "express";
import { UserController } from "../controllers/auth.controller";

const router = Router();

const userController = new UserController();

router.post("/signup", (req, res) => userController.signup(req, res));
router.post('/login', (req, res) => userController.login(req, res))
router.post('/logout', (req, res) => userController.logout(req, res))
router.post('/refresh-token', (req, res) => userController.refreshToken(req, res))
router.put('/verify-otp', (req, res) => userController.verifyOtp(req, res))
export { router as authRoutes };
