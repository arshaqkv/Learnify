import { User } from "../../../../domain/entities/user.entity";
import { IUserRepository } from "../../../../domain/interfaces/user.repository";
import { CustomError } from "../../../../interface/middlewares/error.middleware";

export class GetUsersForChat {
  constructor(private userRepository: IUserRepository) {}

  async execute(userId: string): Promise<User[]> {
    const user = await this.userRepository.findById(userId);

    const role = user?.role;
    if (!role) {
      throw new CustomError("No role found", 400);
    }

    const users = await this.userRepository.GetAllUsersByOppositeRole(role);

    return users;
  }
}
