import { User } from "../../domain/entities/user.entity";
import { IUserRepository } from "../../domain/interfaces/user.repository";
import { UserModel } from "../models/user.model";

export class MongoUserRepository implements IUserRepository {
  async createUser(user: User): Promise<User> {
    const newUser = new UserModel(user);
    await newUser.save();
    return newUser;
  }

  async findByEmail(email: string): Promise<User | null> {
    return await UserModel.findOne({ email });
  }

  async findById(id: string): Promise<User | null> {
    return await UserModel.findById(id);
  }

  async findByIdAndUpdate(
    id: string,
    data: Partial<User>
  ): Promise<User | null> {
    return await UserModel.findByIdAndUpdate(id, data, { new: true });
  }

  async findByEmailAndUpdate(
    email: string,
    data: Partial<User>
  ): Promise<void> {
    await UserModel.findOneAndUpdate({ email }, data, { new: true });
  }

  async getAllUsersAtOnce(): Promise<User[]> {
    const users = await UserModel.find({ role: "student" });
    return users;
  }

  async getAllUsers(
    page: number,
    limit: number,
    search?: string
  ): Promise<{ users: any[]; totalUsers: number }> {
    const skip = (page - 1) * limit;
    const regex = new RegExp(`^${search}`, "i");
    const query = search
      ? { firstname: { $regex: regex }, role: "student" }
      : { role: "student" };

    const users = await UserModel.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    const totalUsers = await UserModel.countDocuments(query);
    return { users, totalUsers };
  }

  async blockUser(id: string): Promise<void> {
    await UserModel.findByIdAndUpdate(id, { isBlocked: true }, { new: true });
  }

  async unblockuser(id: string): Promise<void> {
    await UserModel.findByIdAndUpdate(id, { isBlocked: false }, { new: true });
  }

  async findByData(token: string): Promise<User | null> {
    const user = await UserModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });
    return user;
  }

  async updateEnrolledCourses(id: string, courseId: string): Promise<void> {
    await UserModel.findByIdAndUpdate(
      id,
      {
        $push: { enrolledCourses: courseId },
      },
      { new: true }
    );
  }

  async findEnrolledCourses(userId: string): Promise<User | null> {
    const user = await UserModel.findById(userId)
      .populate({
        path: "enrolledCourses",
        populate: [
          {
            path: "category",
          },
          {
            path: "creator",
          },
        ],
      })
      .select("enrolledCourses")
      .exec();

    return user;
  }

  async getAllInstructors(): Promise<User[] | null> {
    const instructors = await UserModel.find({ role: "instructor" })
      .select("firstname lastname profileImage")
      .lean();
    return instructors;
  }

  async getUsersCountPerRole(role: string): Promise<number> {
    const totalUsers = await UserModel.countDocuments({ role });
    return totalUsers;
  }

  async getTotalActiveUsers(): Promise<{
    totalActiveUsers: number;
    totalUsers: number;
  }> {
    const totalActiveUsers = await UserModel.countDocuments({
      isBlocked: false,
      role: { $ne: "admin" },
    });
    const totalUsers = await UserModel.countDocuments({
      role: { $ne: "admin" },
    });
    return { totalActiveUsers, totalUsers };
  }

  async GetAllUsersByOppositeRole(role: string): Promise<User[]> {
    const users = await UserModel.find({ role: { $ne: role } }).select(
      "-password"
    );
    return users;
  }
}
