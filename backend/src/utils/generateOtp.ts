export const generateOtp = (): { otp: string; expiresAt: Date } => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString()
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
  return { otp, expiresAt };
};
