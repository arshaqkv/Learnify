import mongoose, { Schema, Document } from "mongoose";

interface IOtp extends Document {
  email: string;
  otp: string;
  expiresAt: Date;
}

const OtpSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 300 },
    },
  },
  { timestamps: true }
);

const OtpModel = mongoose.model<IOtp>("Otp", OtpSchema);

export { OtpModel, IOtp };
