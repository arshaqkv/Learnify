import { NextFunction, Request, Response } from "express";
import { AuthDIContainer } from "../../infrastructure/di/containers/authDIContainer";
import { cookieOptions } from "../../utils/cookieHelper";
import { config } from "../../config/config";

export class UserController {
  //user signup
  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const { firstName, lastName, email, password, phone } = req.body;
      const signupUser = AuthDIContainer.getSignupUserUseCase();
      const user = await signupUser.execute(req.body);
      res
        .status(201)
        .json({ success: true, message: "User signed up successfully", user });
    } catch (error: any) {
      next(error);
    }
  }

  //user login
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const data = {
        email,
        password,
      };
      const loginUser = AuthDIContainer.getLoginUserUseCase();
      const { accessToken, refreshToken, user } = await loginUser.execute(data);
      res
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .status(200)
        .json({ succuess: true, message: "Logged in successfully", user });
    } catch (error: any) {
      next(error);
    }
  }

  //get user data
  async getUserData(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.user;
      const getUserData = AuthDIContainer.getUserDataUseCase();
      const user = await getUserData.execute(id);
      res.status(200).json({ success: true, user });
    } catch (error: any) {
      next(error);
    }
  }

  //admin login
  async adminLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const data = {
        email,
        password,
      };
      const adminLogin = AuthDIContainer.getAdminLoginUseCase();
      const { accessToken, refreshToken, user } = await adminLogin.execute(
        data
      );
      res
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .status(200)
        .json({
          succuess: true,
          message: "Admin Logged in successfully",
          user,
        });
    } catch (error) {
      next(error);
    }
  }

  //refresh token
  async refreshToken(req: Request, res: Response) {
    try {
      const { refreshToken } = req.cookies;
      console.log(refreshToken);
      const newAccessToken =
        await AuthDIContainer.getRefreshTokenUseCase().execute(refreshToken);
      console.log(newAccessToken);
      res
        .cookie("accessToken", newAccessToken, cookieOptions)
        .status(200)
        .json({ message: "Token refreshed", newAccessToken });
    } catch (error: any) {
      console.log(error);
    }
  }

  //resend otp

  //verify otp
  async verifyOtp(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, otp } = req.body;
      const verifyOtp = AuthDIContainer.getVerifyOtpUseCase();
      await verifyOtp.execute({ email, otp });
      res
        .status(200)
        .send({ success: true, message: "Email verification succussfull" });
    } catch (error) {
      next(error);
    }
  }

  //logout user
  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      res.clearCookie("accessToken", {
        httpOnly: true,
        secure: config.environment === "production",
        sameSite: "strict",
      });

      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: config.environment === "production",
        sameSite: "strict",
      });

      res
        .status(200)
        .send({ success: true, message: "Logged out successfully" });
    } catch (error: any) {
      next(error);
    }
  }

  //google login
  async googleLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const { token } = req.body;
      const googleLogin = AuthDIContainer.getGoogleLoginUseCase();
      const { accessToken, refreshToken, user } = await googleLogin.execute(token);
      res
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .status(200)
        .json({ message: "Logged in succussfully", user });
    } catch (error) {
      next(error);
    }
  }
}
