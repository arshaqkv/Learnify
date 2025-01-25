import crypto from "crypto";

export const generatePasswordToken = (): {
  resetToken: string;
  expiresAt: Date;
} => {
  const resetToken = crypto.randomBytes(20).toString("hex");
  const expiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000); //1 hour
  return { resetToken, expiresAt };
};
