import { db } from "../database/db.js";
import { checkReq, safeOperation } from "../error-handling.js";
import { mailer } from "../mailer.js";

export async function subscribeToNewsletter(req, res) {
  const { email, projectId, projectRoute } = req.body;
  checkReq(!email || (!projectId && !projectRoute));

  const project = await safeOperation(
    () => db.get("select fk_user_id from projects where project_id = ?", [projectId]),
    "Error while getting project from database"
  );

  if (!project)
    return res.status(404).json({ success: false, message: "Project not found" });
  if (project.fk_user_id !== req.session.user.id)
    return res.status(403).json({ success: false, message: "Not your project" });

  const existingSubscriber = await safeOperation(
    () => db.get(
      "select subscriber_id from newsletter_subscribers where email = ? and fk_project_id = ?",
      [email.trim().toLowerCase(), project.project_id],
    ),
    "Error while checking existing subscription",
  );

  if (existingSubscriber) {
    return res.status(200).json({ success: true, message: "Already subscribed" });
  }

  await safeOperation(
    () => db.run(
      "insert into newsletter_subscribers (email, fk_project_id) values (?, ?)",
      [email.trim().toLowerCase(), project.project_id],
    ),
    "Error while saving subscription",
  );

  res.status(200).json({ success: true, message: "Successfully subscribed" });
}

export async function sendNewsletter(req, res) {
  const { projectId, subject, body } = req.body;
  checkReq(!projectId || !subject?.trim() || !body?.trim());

  const project = await safeOperation(
    () => db.get("select fk_user_id from projects where project_id = ?", [projectId]),
    "Error while getting project from database"
  );

  if (!project)
    return res.status(404).json({ success: false, message: "Project not found" });
  if (project.fk_user_id !== req.session.user.id)
    return res.status(403).json({ success: false, message: "Not your project" });
  
  const subscribers = await safeOperation(
    () => db.all(
      "select email from newsletter_subscribers where fk_project_id = ?",
      [projectId],
    ),
    "Error while retrieving subscribers",
  );

  if (!subscribers.length)
    return res.status(400).json({ success: false, message: "No newsletter subscribers yet" });

  const recipientList = subscribers.map((subscriber) => subscriber.email);

  await safeOperation(
    () => mailer(
      project.name,
      recipientList,
      subject,
      body,
    ),
    "Error while sending newsletter",
  );

  res.status(200).json({
    success: true,
    message: `Newsletter sent to ${recipientList.length} subscriber${recipientList.length > 1 ? "s" : ""}`,
  });
}
