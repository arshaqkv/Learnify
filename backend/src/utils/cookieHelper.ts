import { config } from "../config/config";

interface ICookieOptions {
  httpOnly: boolean;
  secure: boolean;
  sameSite: boolean | "lax" | "strict" | "none";
  maxAge: number;
}

export const accessCookieOptions: ICookieOptions = {
  httpOnly: true,
  secure: config.environment === "production",
  sameSite: "strict",
  maxAge: 15 * 60 * 1000,
};

export const resetCookieOptions: ICookieOptions = {
  httpOnly: true,
  secure: config.environment === "production",
  sameSite: "strict",
  maxAge: 1 * 24 * 60 * 60 * 1000,
};
