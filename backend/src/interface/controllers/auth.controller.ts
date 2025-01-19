import { Request, Response } from "express";
import { AuthDIContainer } from "../../infrastructure/di/containers/authDIContainer";
import { cookieOptions } from "../../utils/cookieHelper";
import { config } from "../../config/config";

export class UserController {
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

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const data = {
        email,
        password,
      };
      const loginUser = AuthDIContainer.getLoginUserUseCase();
      const response = await loginUser.execute(data);
      res.cookie("accessToken", response.accessToken, cookieOptions)
      res.status(200).json({succuess: true, message: "Logged in successfully", user: response.user})
    } catch (error: any) {
        console.log(error)
    }
  }

  async logout(req: Request, res: Response){
    try {
        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: config.environment === "production",
            sameSite: "strict"
        })

        res.status(200).send({success: true, message: "Logged out successfully"})
    } catch (error) {
        console.log(error)
    }
  }
}
