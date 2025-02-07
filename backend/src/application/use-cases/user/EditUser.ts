import { User } from "../../../domain/entities/user.entity";
import { IUserRepository } from "../../../domain/interfaces/user.repository";
import { CustomError } from "../../../interface/middlewares/error.middleware";

export class EditUser {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string, data: Partial<User>): Promise<void> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new CustomError("User not found", 400);
    }

    await this.userRepository.findByIdAndUpdate(id, data);
  }
}
