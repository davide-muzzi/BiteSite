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

function toHtml(text, unsubscribeUrl) {
  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  const bodyHtml = escaped.replace(/\n/g, "<br>");
  const footer = unsubscribeUrl
    ? `<p style="margin-top:32px;font-size:13px;color:#888;">Don't want these emails? <a href="${unsubscribeUrl}">Unsubscribe</a></p>`
    : "";
  return `<!DOCTYPE html><html lang="en"><body style="font-family:sans-serif;font-size:16px;line-height:1.6;max-width:600px;margin:0 auto;padding:24px;">${bodyHtml}${footer}</body></html>`;
}

export async function mailer(from, recipients = [], subject, text, unsubscribeBaseUrl) {
  if (!recipients.length) throw new Error("No recipients provided");

  const deliveries = recipients.map((email) => {
    // Sends one SMTP call per recipient; stay under ?? subscribers or rate limits will kick in
    // When threshold exceeded, switch to single BCC’d message or bulk provider
    const unsubscribeUrl = unsubscribeBaseUrl
      ? `${unsubscribeBaseUrl}&email=${encodeURIComponent(email)}`
      : null;

    return mailConfig.sendMail({
      from: `${from} <${process.env.SMTP_USER}>`,
      to: email,
      subject,
      text: unsubscribeUrl ? `${text}\n\n---\nTo unsubscribe: ${unsubscribeUrl}` : text,
      html: toHtml(text, unsubscribeUrl),
      ...(unsubscribeUrl && {
        headers: {
          "List-Unsubscribe": `<${unsubscribeUrl}>`,
          "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
        },
      }),
    });
  });

  await Promise.all(deliveries);
}
