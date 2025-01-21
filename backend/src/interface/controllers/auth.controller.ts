import { Request, Response } from "express";
import { AuthDIContainer } from "../../infrastructure/di/containers/authDIContainer";
import { cookieOptions } from "../../utils/cookieHelper";
import { config } from "../../config/config";

export class UserController {
  //user signup
  async signup(req: Request, res: Response) {
    try {
      const { firstName, lastName, email, password, phone } = req.body;
      const signupUser = AuthDIContainer.getSignupUserUseCase();
      const user = await signupUser.execute(req.body);
      res
        .status(201)
        .json({ success: true, message: "User signed up successfully", user });
    } catch (error: any) {
      console.log(error);
    }
  }

  //user login
  async login(req: Request, res: Response) {
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
      console.log(error);
    }
  }

  //refresh token
  async refreshToken(req: Request, res: Response) {
    try {
      const { refreshToken } = req.cookies;
      const newAccessToken =
        AuthDIContainer.getRefreshTokenUseCase().execute(refreshToken);
      res
        .cookie("accessToken", newAccessToken, cookieOptions)
        .status(200)
        .json({ message: "Token refreshed" });
    } catch (error: any) {
      console.log(error);
    }
  }

  async verifyOtp(req: Request, res: Response) {
    try {
      const { email, otp } = req.body;
      const verifyOtp = AuthDIContainer.getVerifyOtpUseCase()
      await verifyOtp.execute({email, otp})
      res.status(200).send({success: true, message: "Email verification succussfull"})
    } catch (error) {
      console.log(error)
    }
  }

  //logout user
  async logout(req: Request, res: Response) {
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
    } catch (error) {
      console.log(error);
    }
  }
}
