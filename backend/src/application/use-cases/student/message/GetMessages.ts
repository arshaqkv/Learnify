import { Message } from "../../../../domain/entities/message.entity";
import { IMessageRepository } from "../../../../domain/interfaces/message.repositoy";

export class GetMessages {
  constructor(private messageRepository: IMessageRepository) {}

  async execute(senderId: string, receiverId: string): Promise<Message[]> {
    const messages = await this.messageRepository.getChatMessages(
      senderId,
      receiverId
    );

    return messages;
  }
}
