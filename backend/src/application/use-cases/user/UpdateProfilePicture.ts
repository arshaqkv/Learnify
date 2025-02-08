import { User } from "../../../domain/entities/user.entity";
import { IUserRepository } from "../../../domain/interfaces/user.repository";
import { ICloudinaryService } from "../../../infrastructure/services/cloudinary/Cloudinary";
import { CustomError } from "../../../interface/middlewares/error.middleware";

export class UpdateProfilePicture {
  constructor(
    private userRepository: IUserRepository,
    private cloudinaryService: ICloudinaryService
  ) {}

  async execute(id: string, fileBuffer: Buffer): Promise<User | null> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new CustomError("User not found", 400);
    }

    if (!fileBuffer) {
      throw new CustomError("Image not provided", 400);
    }

    if (user.profileImagePublicId) {
      await this.cloudinaryService.deleteImage(user.profileImagePublicId);
    }

    const { url, publicId } = await this.cloudinaryService.uploadProfileImage(
      fileBuffer
    );

    const updatedUser = await this.userRepository.findByIdAndUpdate(id, {
      profileImage: url,
      profileImagePublicId: publicId,
    });

    return updatedUser
  }
}
