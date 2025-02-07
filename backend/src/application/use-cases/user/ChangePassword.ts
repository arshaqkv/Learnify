import { IUserRepository } from "../../../domain/interfaces/user.repository";
import { CustomError } from "../../../interface/middlewares/error.middleware";
import bcryptjs from "bcryptjs";

export class ChangePassword {
  constructor(private userRepository: IUserRepository) {}

  async execute(
    id: string,
    oldPassword: string,
    newPassword: string
  ): Promise<void> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new CustomError("User not found", 400);
    }

    if(user.googleId){
        throw new CustomError("You can't do this operation", 400)
    }

    const isPasswordValid = await bcryptjs.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      throw new CustomError("Wrong current password", 400);
    }


    const newHashedPassword = await bcryptjs.hash(newPassword, 10);
    if (!newHashedPassword) {
      throw new CustomError("Error occured while hashing", 400);
    }
    await this.userRepository.findByIdAndUpdate(id, {
      password: newHashedPassword,
    });
  }
}
