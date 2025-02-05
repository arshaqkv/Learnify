import { v2 as cloudinary } from "cloudinary";
import { config } from "../../../config/config";

cloudinary.config({
  cloud_name: config.cloudinary.CLOUDINARY_NAME,
  api_key: config.cloudinary.CLOUDINARY_API,
  api_secret: config.cloudinary.CLOUDINARY_SECRET,
});

export interface ICloudinaryService {
  uploadImage(fileBuffer: Buffer): Promise<{ url: string; publicId: string }>;
  deleteImage(publicId: string): Promise<void>;
}

// Cloudinary Service Implementation
export class CloudinaryService implements ICloudinaryService {
  async uploadImage(
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

  async deleteImage(publicId: string): Promise<void> {
    try {
      await cloudinary.uploader.destroy(publicId);
      console.log("Image deleted from Cloudinary:", publicId);
    } catch (error) {
      console.error("Failed to delete image from Cloudinary:", error);
    }
  }
}
