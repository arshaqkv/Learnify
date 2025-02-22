import { Request, Response, NextFunction } from "express";
import { CustomError } from "./error.middleware";
import { config } from "../../config/config";
import axios from "axios";

export const verifyRecaptcha = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { captcha } = req.body;

  if (!captcha) {
    throw new CustomError("Please complete the CAPTCHA", 400);
  }
  try {
    const secret_key = config.recaptcha_secret;
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${captcha}`
    );

    if(response.data.success){
        next()
    }else{
        throw new CustomError("CAPTCHA verification failed, Refresh page" , 400)
    }
  } catch (error: any) {
    next(error);
  }
};
