import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const mailConfig = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_PORT == 465 ? true : false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function smtpVerifier() {
  mailConfig.verify((error) => {
    if (error) {
      console.error("SMTP config error:", error);
    }
  });
}

export async function mailer(from, to, subject, text) {
  await mailConfig.sendMail({
    from: `${from} <${process.env.SMTP_USER}>`,
    to: to,
    subject: subject,
    text: text,
  });
}
