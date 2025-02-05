import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        role: string;
      };
      file?: Express.Multer.File;  // For single file upload
      files?: Express.Multer.File[];
    }
  }
}
