import nodeMailer from "nodemailer";
import {
  EMAIL_CHANGE_VERIFICATION_TEMPLATE,
  INSTRUCTOR_APPROVAL_TEMPLATE,
  INSTRUCTOR_REJECTION_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
} from "./EmailTemplate";
import { config } from "../../../config/config";

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
    subject: "Learnify | Verify your email",
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
    subject: "Learnify | Reset your password",
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
  email: string
): Promise<void> => {
  const message = PASSWORD_RESET_SUCCESS_TEMPLATE;
  const mailOptions = {
    from: config.user,
    to: email,
    subject: "Learnify | Reset password successfull",
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


export const sendInstructorApprovalEmail = async (
  email: string,
  name: string
): Promise<void> => {
  const message = INSTRUCTOR_APPROVAL_TEMPLATE.replace("{instructorName}", name)
  const mailOptions = {
    from: config.user,
    to: email,
    subject: "Learnify | Instructor request application approved",
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

export const sendInstructorRejectionEmail = async (
  email: string,
  name: string
): Promise<void> => {
  const message = INSTRUCTOR_REJECTION_TEMPLATE.replace("{instructorName}", name)
  const mailOptions = {
    from: config.user,
    to: email,
    subject: "Learnify | Instructor request application rejected",
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

export const sendEmailChange = async (
  email: string,
  otp: string
): Promise<void> => {
  const message = EMAIL_CHANGE_VERIFICATION_TEMPLATE.replace("{verificationCode}", otp)
  const mailOptions = {
    from: config.user,
    to: email,
    subject: "Learnify | Verify Your Email Change",
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