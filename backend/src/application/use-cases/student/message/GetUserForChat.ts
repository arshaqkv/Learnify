import { User } from "../../../../domain/entities/user.entity";
import { IMessageRepository } from "../../../../domain/interfaces/message.repositoy";
import { IUserRepository } from "../../../../domain/interfaces/user.repository";
import { CustomError } from "../../../../interface/middlewares/error.middleware";

export class GetUsersForChat {
  constructor(
    private userRepository: IUserRepository,
    private messageRepository: IMessageRepository
  ) {}

  async execute(userId: string): Promise<User[]> {
    const user = await this.userRepository.findById(userId);

    const role = user?.role;
    if (!role) {
      throw new CustomError("No role found", 400);
    }

    const users = await this.userRepository.GetAllUsersByOppositeRole(role);

    const usersWithLastMessage = await Promise.all(
      users.map(async (user: any) => {
        const lastMessage = await this.messageRepository.getLastMessage(
          user._id
        );
        return { ...user.toObject(), lastMessage };
      })
    );

    usersWithLastMessage.sort((a, b) => {
      if (!a.lastMessage && !b.lastMessage) return 0;
      if (!a.lastMessage) return 1;
      if (!b.lastMessage) return -1;
      return (
        new Date(b.lastMessage.createdAt).getTime() -
        new Date(a.lastMessage.createdAt).getTime()
      );
    });

    return usersWithLastMessage;
  }
}
