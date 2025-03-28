import { NextFunction, Request, Response } from "express";
import { AuthDIContainer } from "../../infrastructure/di/containers/authDIContainer";
import {
  accessCookieOptions,
  resetCookieOptions,
} from "../../utils/cookieHelper";
import { config } from "../../config/config";
import { StudentDIContainer } from "../../infrastructure/di/containers/studentDIContainer";
import { CourseDIContainer } from "../../infrastructure/di/containers/courseDIContainer";

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
      console.log("#################Cookies refreshed");
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
        .json({ success: true, message: "Password changed successfully" });
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

  //edit user
  async editUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.user;
      const editUser = AuthDIContainer.getEditUserUseCase();
      await editUser.execute(id, req.body);
      res
        .status(200)
        .json({ success: true, message: "User updated successfully" });
    } catch (error: any) {
      next(error);
    }
  }

  //send otp for email change
  async sendChangeEmailOtp(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      const { id } = req.user;
      const sendChangeEmailOtp = AuthDIContainer.getSendEmailChangeUseCase();
      await sendChangeEmailOtp.execute(id, email);
      res.status(200).json({ message: "Otp send to mail" });
    } catch (error: any) {
      next(error);
    }
  }

  async editEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.user;
      const { email, otp } = req.body;
      const editEmail = AuthDIContainer.getEditEmailUseCase();
      await editEmail.execute(id, email, otp);
      res.status(200).json({ message: "Email updated successfully" });
    } catch (error: any) {
      next(error);
    }
  }

  async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.user;
      const { oldPassword, newPassword } = req.body;
      const changePassword = AuthDIContainer.getChangePasswordUseCase();
      await changePassword.execute(id, oldPassword, newPassword);
      res.status(200).json({ message: "Password changed succussfully" });
    } catch (error: any) {
      next(error);
    }
  }

  async updateProfilePicture(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.user;
      const fileBuffer = req.file ? req.file.buffer : undefined;
      if (!fileBuffer) {
        return;
      }
      const updateProfilePicture =
        AuthDIContainer.getUpdateProfilePictureUseCase();
      const user = await updateProfilePicture.execute(id, fileBuffer);
      res.status(200).json({ message: "Profile picture updated", user });
    } catch (error: any) {
      next(error);
    }
  }

  async getEnrolledCourses(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.user;
      const getEnrolledCourses = StudentDIContainer.getEnrolledCoursesUseCase();
      const courses = await getEnrolledCourses.execute(id);
      res.status(200).json({ courses });
    } catch (error: any) {
      next(error);
    }
  }

  async getPopularCourses(req: Request, res: Response, next: NextFunction) {
    try {
      const getPopularCourses = CourseDIContainer.getPopularCoursesUseCase();
      const courses = await getPopularCourses.execute();
      res.status(200).json({ courses });
    } catch (error: any) {
      next(error);
    }
  }
}

const userController = new UserController();
export { userController };
