import { Router } from "express";
import { UserController } from "../controllers/auth.controller";
import { authorizeRole, isAuthenticated } from "../middlewares/auth.middleware";

const router = Router();

const userController = new UserController();

router.post("/signup", (req, res, next) => userController.signup(req, res, next));
router.post('/login', (req, res, next) => userController.login(req, res, next))
router.post('/logout', (req, res, next) => userController.logout(req, res, next))
router.put('/verify-otp', (req, res, next) => userController.verifyOtp(req, res, next))
router.post('/send-otp', (req, res, next) => userController.sendOtp(req, res, next))
router.post('/forgot-password', (req, res, next) => userController.forgotPassword(req, res, next))
router.put('/reset-password/:token', (req, res, next) => userController.resetPassword(req, res, next))
router.post('/google', (req, res, next) => userController.googleLogin(req, res, next))

router.use(isAuthenticated, authorizeRole(['student', 'instructor']))
    .get('/profile', (req, res, next) => userController.getUserData(req, res, next))
    .post('/refresh-token', (req, res) => userController.refreshToken(req, res))

export { router as authRoutes };
