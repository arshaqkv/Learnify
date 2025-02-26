import { User } from "../entities/user.entity";
export interface IUserRepository {
  //signup
  createUser(user: User): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  findByEmailAndUpdate(email: string, data: Partial<User>): Promise<void>;
  findByIdAndUpdate(id: string, data: Partial<User>): Promise<User | null>;
  getAllUsers(
    page: number,
    limit: number,
    search?: string
  ): Promise<{ users: any[]; totalUsers: number }>;
  blockUser(id: string): Promise<void>;
  unblockuser(id: string): Promise<void>;
  findByData(token: string): Promise<User | null>;
  updateEnrolledCourses(id: string, courseId: string): Promise<void>;
  findEnrolledCourses(userId: string): Promise<User | null>;
  getAllInstructors(): Promise<User[] | null>;
  getUsersCountPerRole(role: string): Promise<number>;
  getTotalActiveUsers(): Promise<{totalActiveUsers: number, totalUsers: number}>
}
