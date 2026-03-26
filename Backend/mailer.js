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

export async function mailer(from, recipients = [], subject, text) {
  if (!recipients.length) throw new Error("No recipients provided");

  for (const email of recipients) {
    // Sends one SMTP call per recipient; stay under ?? subscribers or rate limits will kick in
    // When thewshold exceeded, switch to single BCC’d message or bulk provider
    await mailConfig.sendMail({
      from: `${from} <${process.env.SMTP_USER}>`,
      to: email,
      subject: subject,
      text: text,
    });
  }
}
