import nodemailer from "nodemailer";
import dotenv from "dotenv";

import { db } from "../database/db.js";
import { checkReq, safeOperation } from "../error-handling.js";

dotenv.config();

const smtpPort = Number(process.env.SMTP_PORT);
const defaultFrom =
  process.env.SMTP_FROM || `BiteSite <${process.env.SMTP_USER}>`;

const mailConfig = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: smtpPort,
  secure: process.env.SMTP_SECURE === "true" || smtpPort === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function smtpVerifier() {
  try {
    await mailConfig.verify();
  } catch (error) {
    console.error("SMTP config error:", error);
    throw error;
  }
}

export async function mailer({ to, bcc, subject, text, html }) {
  await mailConfig.sendMail({
    from: defaultFrom,
    to: to || defaultFrom,
    bcc,
    subject,
    text,
    html,
  });
}

function normalizeEmail(email = "") {
  return email.trim().toLowerCase();
}

async function resolveProject(projectId, projectRoute) {
  if (projectId) {
    return safeOperation(
      () =>
        db.get(
          "select project_id, fk_user_id from projects where project_id = ?",
          [projectId],
        ),
      "Error while retrieving project",
    );
  }

  if (!projectRoute) return null;

  return safeOperation(
    () =>
      db.get(
        "select project_id, fk_user_id from projects where lower(website_route) = ?",
        [projectRoute.toLowerCase()],
      ),
    "Error while retrieving project",
  );
}

export async function subscribeToNewsletter(req, res) {
  const { email, projectId, projectRoute } = req.body;
  checkReq(!email || (!projectId && !projectRoute));

  const normalizedEmail = normalizeEmail(email);
  const project = await resolveProject(projectId, projectRoute);

  if (!project)
    return res
      .status(404)
      .json({ success: false, message: "Project not found" });

  const existingSubscriber = await safeOperation(
    () =>
      db.get(
        "select subscriber_id from newsletter_subscribers where email = ? and fk_project_id = ?",
        [normalizedEmail, project.project_id],
      ),
    "Error while checking existing subscription",
  );

  if (existingSubscriber) {
    return res
      .status(200)
      .json({ success: true, message: "Already subscribed" });
  }

  await safeOperation(
    () =>
      db.run(
        "insert into newsletter_subscribers (email, fk_project_id) values (?, ?)",
        [normalizedEmail, project.project_id],
      ),
    "Error while saving subscription",
  );

  res.status(200).json({ success: true, message: "Successfully subscribed" });
}

export async function sendNewsletter(req, res) {
  const { projectId, subject, body, html } = req.body;
  checkReq(!projectId || !subject?.trim() || !body?.trim());

  const project = await safeOperation(
    () =>
      db.get(
        "select project_id, fk_user_id, name from projects where project_id = ?",
        [projectId],
      ),
    "Error while retrieving project",
  );

  if (!project)
    return res
      .status(404)
      .json({ success: false, message: "Project not found" });
  if (project.fk_user_id !== req.session.user.id)
    return res
      .status(403)
      .json({ success: false, message: "Not your project" });

  const subscribers = await safeOperation(
    () =>
      db.all(
        "select email from newsletter_subscribers where fk_project_id = ?",
        [projectId],
      ),
    "Error while retrieving subscribers",
  );

  if (!subscribers.length)
    return res
      .status(400)
      .json({ success: false, message: "No newsletter subscribers yet" });

  const recipientList = subscribers.map((subscriber) => subscriber.email);

  await safeOperation(
    () =>
      mailer({
        subject,
        text: body,
        html,
        bcc: recipientList,
      }),
    "Error while sending newsletter",
  );

  res.status(200).json({
    success: true,
    message: `Newsletter sent to ${recipientList.length} subscriber${recipientList.length > 1 ? "s" : ""}`,
  });
}
