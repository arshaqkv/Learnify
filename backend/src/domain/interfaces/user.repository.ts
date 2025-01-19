import { User } from "../entities/user.entity";
export interface IUserRepository{
    //signup
    createUser(user: User): Promise<User>
    findByEmail(email: string): Promise<User | null>
}