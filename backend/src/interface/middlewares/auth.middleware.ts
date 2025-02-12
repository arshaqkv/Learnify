import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../../config/verifyToken";
import { CustomError } from "./error.middleware";
import { UserModel } from "../../infrastructure/models/user.model";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.accessToken;
  if (!token) {
    throw new CustomError("Unauthorized", 401)
  }
  try {
    const decoded = verifyAccessToken(token);
    if (!decoded) {
      throw new CustomError("Unauthorized", 401)
    }
    req.user = decoded;

    next();
  } catch (error) {
    next(error);
  }
};

export const authorizeRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!roles.includes(req.user?.role || "")) {
      throw new CustomError(
        `Access denied. Not allowed to access this resource`,
        403
      );
    }
    next();
  };
};

export const isBlocked = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.user;
  try {
    const user = await UserModel.findById(id);
    if (user?.isBlocked) {
      throw new CustomError("You are blocked", 403);
    }
    next()
  } catch (error) {
    next(error)
  }
};
