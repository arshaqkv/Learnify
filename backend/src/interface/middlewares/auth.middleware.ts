import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../../config/verifyToken";
import { CustomError } from "./error.middleware";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies.accessToken;
  if (!token) {
    throw new CustomError("Unauthorized", 401);
  }
  try {
    const decoded = verifyAccessToken(token);
    if (!decoded) {
      throw new CustomError("Unauthorized", 401);
    }
    req.user = decoded;
    console.log("###########", req.user);
    next();
  } catch (error) {
    next(error);
  }
};

export const authorizeRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if(!roles.includes(req.user?.role || '')){
        throw new CustomError(`Access denied. Not allowed to access this resource`, 403)
    }
    next()
  };
};
