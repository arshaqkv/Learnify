import { User } from "../entities/user.entity";
export interface IUserRepository {
  //signup
  createUser(user: User): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  findByEmailAndUpdate(email: string, data: Partial<User>): Promise<void>;
  findByIdAndUpdate(id: string): Promise<User | null>;
  getAllUsers(): Promise<User[]>;
  blockUser(id: string): Promise<void>;
  unblockuser(id: string): Promise<void>;
  findByData(token: string): Promise<User | null>
}
