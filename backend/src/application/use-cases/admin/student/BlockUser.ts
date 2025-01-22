import { IUserRepository } from "../../../../domain/interfaces/user.repository";

export class BlockUser {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string): Promise<void>{
    await this.userRepository.blockUser(id)
  }
}
