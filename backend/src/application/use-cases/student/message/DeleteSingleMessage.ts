import { Message } from "../../../../domain/entities/message.entity";
import { IMessageRepository } from "../../../../domain/interfaces/message.repositoy";
import { CustomError } from "../../../../interface/middlewares/error.middleware";

export class DeleteSingleMessage {
  constructor(private messageRepository: IMessageRepository) {}

  async execute(
    senderId: string,
    receiverId: string,
    messageId: string
  ): Promise<Message[] | null> {
    if (!messageId) {
      throw new CustomError("Message Id not found", 404);
    }
 
    await this.messageRepository.deleteSingleMessage(messageId);
    const messages = await this.messageRepository.getChatMessages(
      senderId,
      receiverId
    );

    return messages;
  }
}
