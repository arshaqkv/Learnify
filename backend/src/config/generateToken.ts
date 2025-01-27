import jwt from "jsonwebtoken";
import { config } from "./config";

const ACCESS_TOKEN_SECRET = config.jwtAccessSecret;
const REFRESH_TOKEN_SECRET = config.jwtRefreshSecret;

const generateAccessToken = (payload: {
  id?: string;
  role: string;
}): string => {
  const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: "1m",
  });
  return accessToken;
};

const generateRefreshToken = (payload: {
  id?: string;
  role: string;
}): string => {
  const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: "1d",
  });
  return refreshToken;
};

export { generateAccessToken, generateRefreshToken };
