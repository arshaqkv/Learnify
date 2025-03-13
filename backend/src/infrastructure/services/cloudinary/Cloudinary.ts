import { v2 as cloudinary } from "cloudinary";
import { config } from "../../../config/config";

cloudinary.config({
  cloud_name: config.cloudinary.CLOUDINARY_NAME,
  api_key: config.cloudinary.CLOUDINARY_API,
  api_secret: config.cloudinary.CLOUDINARY_SECRET,
});

export interface ICloudinaryService {
  uploadCourseImage(
    fileBuffer: Buffer
  ): Promise<{ url: string; publicId: string }>;
  uploadProfileImage(
    fileBuffer: Buffer
  ): Promise<{ url: string; publicId: string }>;
  uploadChatImage(
    fileBuffer: Buffer
  ): Promise<{ url: string; publicId: string }>;
  uploadLecturevideo(
    fileBuffer: Buffer
  ): Promise<{ url: string; publicId: string }>;
  deleteImage(publicId: string): Promise<void>;
  deleteVideo(publicId: string): Promise<void>;
}

// Cloudinary Service Implementation
export class CloudinaryService implements ICloudinaryService {
  async uploadCourseImage(
    fileBuffer: Buffer
  ): Promise<{ url: string; publicId: string }> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: "image", folder: "course_images" },
        (error, result) => {
          if (error || !result) {
            console.error("Cloudinary upload failed:", error);
            return reject(new Error("Failed to upload image to Cloudinary"));
          }
          resolve({ url: result.secure_url, publicId: result.public_id });
        }
      );

      import("streamifier").then(({ default: streamifier }) => {
        streamifier.createReadStream(fileBuffer).pipe(uploadStream);
      });
    });
  }

  async uploadProfileImage(
    fileBuffer: Buffer
  ): Promise<{ url: string; publicId: string }> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: "image", folder: "user_images" },
        (error, result) => {
          if (error || !result) {
            console.error("Cloudinary upload failed:", error);
            return reject(new Error("Failed to upload image to Cloudinary"));
          }
          resolve({ url: result.secure_url, publicId: result.public_id });
        }
      );

      import("streamifier").then(({ default: streamifier }) => {
        streamifier.createReadStream(fileBuffer).pipe(uploadStream);
      });
    });
  }

  async uploadChatImage(
    fileBuffer: Buffer
  ): Promise<{ url: string; publicId: string }> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: "image", folder: "chat_images" },
        (error, result) => {
          if (error || !result) {
            console.error("Cloudinary upload failed:", error);
            return reject(new Error("Failed to upload image to Cloudinary"));
          }
          resolve({ url: result.secure_url, publicId: result.public_id });
        }
      );

      import("streamifier").then(({ default: streamifier }) => {
        streamifier.createReadStream(fileBuffer).pipe(uploadStream);
      });
    });
  }

  async uploadLecturevideo(
    fileBuffer: Buffer
  ): Promise<{ url: string; publicId: string }> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: "video", folder: "lecture_videos" },
        (error, result) => {
          if (error || !result) {
            console.error("Cloudinary upload failed:", error);
            return reject(new Error("Failed to upload video to Cloudinary"));
          }
          resolve({ url: result.secure_url, publicId: result.public_id });
        }
      );

      import("streamifier").then(({ default: streamifier }) => {
        streamifier.createReadStream(fileBuffer).pipe(uploadStream);
      });
    });
  }

  async deleteImage(publicId: string): Promise<void> {
    try {
      await cloudinary.uploader.destroy(publicId);
      console.log("Image deleted from Cloudinary:", publicId);
    } catch (error) {
      console.error("Failed to delete image from Cloudinary:", error);
    }
  }

  async deleteVideo(publicId: string): Promise<void> {
    try {
      const result = await cloudinary.uploader.destroy(publicId, {
        resource_type: "video",
      });
      if (result.result !== "ok") {
        throw new Error(`Cloudinary delete failed: ${result.result}`);
      }
      console.log("Video deleted from Cloudinary:", publicId);
    } catch (error) {
      console.error("Failed to delete video from Cloudinary:", error);
    }
  }
}
