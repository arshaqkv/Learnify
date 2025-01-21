import nodeMailer from "nodemailer";
import { VERIFICATION_EMAIL_TEMPLATE } from "./EmailTemplate";
import { config } from "../../config/config";

export const mailTransporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: config.user,
    pass: config.pass,
  },
  tls: { 
    rejectUnauthorized: false,
  },
});

export const sendEmail = async (email: string, otp: string): Promise<void> => {
  const message = VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", otp);
  const mailOptions = {
    from: config.user,
    to: email,
    subject: "Verify your email", 
    html: message,
  };
  await mailTransporter.sendMail(mailOptions, (err, info) =>{
    if(err){  
        console.log('Failed to send OTP. Try again.', err.message)
    }else {
        console.log("Email has been send to " + info.response)
    }
  });
};
