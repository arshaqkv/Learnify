import jwt from "jsonwebtoken";
import { config } from "./config";

const verifyAccessToken = (token: string): any => {
  try {
    return jwt.verify(token, config.jwtAccessSecret);
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};

const verifyRefreshToken = (token: string): any => {
  try {
    return jwt.verify(token, config.jwtRefreshSecret);
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};

export { verifyAccessToken, verifyRefreshToken };
