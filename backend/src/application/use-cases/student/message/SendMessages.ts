import mongoose from "mongoose";
import { Message } from "../../../../domain/entities/message.entity";
import { IMessageRepository } from "../../../../domain/interfaces/message.repositoy";
import { CloudinaryService } from "../../../../infrastructure/services/cloudinary/Cloudinary";

export class SendMessages {
  constructor(
    private messageRepository: IMessageRepository,
    private cloudinaryService: CloudinaryService
  ) {}

  async execute(
    senderId: string,
    receiverId: string,
    text?: string,
    imageBuffer?: Buffer
  ): Promise<Message | null> {
    let image;
    let imagePublicId;
    if (imageBuffer) {
      const { url, publicId } = await this.cloudinaryService.uploadChatImage(
        imageBuffer
      );
      image = url;
      imagePublicId = publicId;
    }

    const senderObjectId = new mongoose.Types.ObjectId(senderId);
    const receiverObjectId = new mongoose.Types.ObjectId(receiverId);
    const newMessage = new Message(
      senderObjectId,
      receiverObjectId,
      text,
      image,
      imagePublicId
    );

    const message = await this.messageRepository.createMessage(newMessage);
    return message;
  }
}
