import { IUserRepository } from "../../../../domain/interfaces/user.repository";

export class GetAllUsers {
  constructor(private userRespository: IUserRepository) {}

  async execute(){
    return await this.userRespository.getAllUsers()
  }
}
