import { GetUsersForChat } from "../../../application/use-cases/student/message/GetUserForChat";
import { MongoUserRepository } from "../../repositories/mongo.user.repostitory";

class ChatDIContainer {
  static getUserRepository() {
    return new MongoUserRepository();
  }

  static getUsersForChatUseCase() {
    return new GetUsersForChat(this.getUserRepository());
  }
}

export { ChatDIContainer };
