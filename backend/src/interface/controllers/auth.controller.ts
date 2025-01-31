import { NextFunction, Request, Response } from "express";
import { AuthDIContainer } from "../../infrastructure/di/containers/authDIContainer";
import {
  accessCookieOptions,
  resetCookieOptions,
} from "../../utils/cookieHelper";
import { config } from "../../config/config";

class UserController {
  //user signup
  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const signupUser = AuthDIContainer.getSignupUserUseCase();
      const user = await signupUser.execute(req.body);
      res
        .status(201)
        .json({ success: true, message: "Verification mail sent", user });
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
        .cookie("accessToken", accessToken, accessCookieOptions)
        .cookie("refreshToken", refreshToken, resetCookieOptions)
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
        .cookie("accessToken", accessToken, accessCookieOptions)
        .cookie("refreshToken", refreshToken, resetCookieOptions)
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
  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("Cookies:", req.cookies);
      const { refreshToken } = req.cookies;
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

  //resend
  async sendOtp(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      const sendOtp = AuthDIContainer.getSendOtpUseCase();
      await sendOtp.execute(email);
      res
        .status(200)
        .json({ success: true, message: "Resend verification email" });
    } catch (error: any) {
      next(error);
    }
  }

  //verify otp
  async verifyOtp(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, otp } = req.body;
      console.log(email, otp);
      const verifyOtp = AuthDIContainer.getVerifyOtpUseCase();
      await verifyOtp.execute({ email, otp });
      res
        .status(200)
        .send({ success: true, message: "Account created succussfully" });
    } catch (error) {
      next(error);
    }
  }

  //forgot password
  async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      const forgotPassword = AuthDIContainer.getForgotPasswordUseCase();
      await forgotPassword.execute(email);
      res
        .status(200)
        .json({ success: true, message: "Reset link sent to email" });
    } catch (error: any) {
      next(error);
    }
  }

  //reset password
  async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { token } = req.params;
      const { password } = req.body;
      const resetPassword = AuthDIContainer.getResetPasswordUseCase();
      await resetPassword.execute(token, password);
      res
        .status(200)
        .json({ success: true, message: "Password changed successfully",  });
    } catch (error: any) {
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
      const { accessToken, refreshToken, user } = await googleLogin.execute(
        token
      );
      res
        .cookie("accessToken", accessToken, accessCookieOptions)
        .cookie("refreshToken", refreshToken, resetCookieOptions)
        .status(200)
        .json({ message: "Logged in succussfully", user });
    } catch (error) {
      next(error);
    }
  }
}

const userController = new UserController();
export { userController };
