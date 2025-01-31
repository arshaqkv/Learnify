import { IUserRepository } from "../../../../domain/interfaces/user.repository";

export class GetAllUsers {
  constructor(private userRespository: IUserRepository) {}

  async execute(page: number, limit: number = 10, search?: string){
    return await this.userRespository.getAllUsers(page, limit, search)
  }
}
