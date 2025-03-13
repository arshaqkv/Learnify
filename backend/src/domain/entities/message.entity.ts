import mongoose from "mongoose";

export class Message {
  constructor(
    public senderId: mongoose.Types.ObjectId,
    public receiverId: mongoose.Types.ObjectId,
    public text?: string,
    public image?: string,
    public imagePublicId?: string,
    public _id?: mongoose.Types.ObjectId,
  ) {}
}
