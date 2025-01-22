import { IUserRepository } from "../../../../domain/interfaces/user.repository";

export class UnblockUser {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string): Promise<void>{
    await this.userRepository.unblockuser(id)
  }
}
