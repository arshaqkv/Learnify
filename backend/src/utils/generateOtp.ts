export const generateOtp = (): { otp: string; expiresAt: Date } => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 6 * 60 * 1000); //6 minutes
  return { otp, expiresAt };
};
