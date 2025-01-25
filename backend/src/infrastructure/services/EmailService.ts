import nodeMailer from "nodemailer";
import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
} from "./EmailTemplate";
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

export const sendVerificationEmail = async (
  email: string,
  otp: string
): Promise<void> => {
  const message = VERIFICATION_EMAIL_TEMPLATE.replace(
    "{verificationCode}",
    otp
  );
  const mailOptions = {
    from: config.user,
    to: email,
    subject: "Verify your email",
    html: message,
  };
  await mailTransporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log("Failed to send OTP. Try again.", err.message);
    } else {
      console.log("Email has been send to " + info.response);
    }
  });
};

export const sendPasswordResetEmail = async (
  email: string,
  link: string
): Promise<void> => {
  const message = PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", link);
  const mailOptions = {
    from: config.user,
    to: email,
    subject: "Reset your password",
    html: message,
  };
  await mailTransporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log("Failed to send OTP. Try again.", err.message);
    } else {
      console.log("Email has been send to " + info.response);
    }
  });
};


export const sendPasswordChangedEmail = async (
  email: string,
): Promise<void> => {
  const message = PASSWORD_RESET_SUCCESS_TEMPLATE
  const mailOptions = {
    from: config.user,
    to: email,
    subject: "Reset password successfull",
    html: message,
  };
  await mailTransporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log("Failed to send OTP. Try again.", err.message);
    } else {
      console.log("Email has been send to " + info.response);
    }
  });
};