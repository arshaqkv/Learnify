import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../../config/verifyToken";
import { CustomError } from "./error.middleware";
import { UserModel } from "../../infrastructure/models/user.model";

export const isAuthenticated = async(
  req: Request,
  res: Response,  
  next: NextFunction
) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = verifyAccessToken(token);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = decoded;

    const user = await UserModel.findById(decoded.id)
    if(user?.isBlocked){
      return res.status(403).json({ message: "You are blocked" });    
    }

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
