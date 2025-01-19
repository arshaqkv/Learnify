import { config } from "../config/config";

interface ICookieOptions {
  httpOnly: boolean;
  secure: boolean;
  sameSite: boolean | "lax" | "strict" | "none";
  maxAge: number;
}

export const cookieOptions: ICookieOptions = {
    httpOnly: true,
    secure: config.environment === 'production',
    sameSite: "strict",
    maxAge: 60 * 60 * 1000
}