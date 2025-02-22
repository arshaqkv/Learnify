import { IUserRepository } from "../../../../domain/interfaces/user.repository";

export class GetApprovedInstructors {
  constructor(private userRepository: IUserRepository) {}

  async execute(): Promise<any>{
    const instructors = await this.userRepository.getAllInstructors()

    return instructors
  }
}
