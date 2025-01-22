import { User } from "../../../domain/entities/user.entity";
import { IUserRepository } from "../../../domain/interfaces/user.repository";
import { CustomError } from "../../../interface/middlewares/error.middleware";

export class GetUser {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string): Promise<User> {
    const user = await this.userRepository.findById(id)

    if(!user){
        throw new CustomError("User not found", 400)
    }
    return user
  }
}
