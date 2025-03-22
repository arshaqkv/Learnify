import { GetMessages } from "../../../application/use-cases/student/message/GetMessages";
import { GetUsersForChat } from "../../../application/use-cases/student/message/GetUserForChat";
import { SendMessages } from "../../../application/use-cases/student/message/SendMessages";
import { MongoMessageRepository } from "../../repositories/mongo.message.repository";
import { MongoUserRepository } from "../../repositories/mongo.user.repostitory";
import { CloudinaryService } from "../../services/cloudinary/Cloudinary";

class ChatDIContainer {
  static getUserRepository() {
    return new MongoUserRepository();
  }

  static getMessageRepository() {
    return new MongoMessageRepository();
  }

  static getUsersForChatUseCase() {
    return new GetUsersForChat(
      this.getUserRepository(),
      this.getMessageRepository()
    );
  }

  static getCloudinaryService() {
    return new CloudinaryService();
  }

  static getMessagesUseCase() {
    return new GetMessages(this.getMessageRepository());
  }

  static sendMessageUseCase() {
    return new SendMessages(
      this.getMessageRepository(),
      this.getCloudinaryService()
    );
  }
}

export { ChatDIContainer };
