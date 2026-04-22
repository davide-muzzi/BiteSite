import { db } from "../database/db.js";
import { safeOperation, checkReq, safeOperations } from "../error-handling.js";
import { existsSync } from "fs";
import { readFile } from "fs/promises";
import { mailer } from "../mailer.js";

export async function serveWebsite(req, res) {
  const { route } = req.params;

  const websitePath = `./websites/${route}.html`;

  if (!existsSync(websitePath))
    return res.status(404).send("<h1>404 Restaurant not found</h1>");

  const project = await safeOperation(
    () => db.get("select published from projects where website_route = ?", [route]),
    "Error while checking if restaurant is published"
  );

  if (!project.published)
    return res.status(403).send("<h1>403 Restaurant is not published</h1>");

  const website = await safeOperation(
    () => readFile(websitePath, "utf-8"),
    "Error while reading html file"
  );

  res.status(200).send(website);
}


export async function subscribeToNewsletter(req, res) {
  const { email, projectId, projectRoute } = req.body;
  checkReq(!email || (!projectId && !projectRoute));

  const project = await safeOperation(
    () => projectId
      ? db.get("select project_id from projects where project_id = ?", [projectId])
      : db.get("select project_id from projects where website_route = ?", [projectRoute.trim().toLowerCase()]),
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
    () => db.get("select fk_user_id, name from projects where project_id = ?", [projectId]),
    "Error while getting project from database"
  );

  if (!project)
    return res.status(404).json({ success: false, message: "Project not found" });
  if (project.fk_user_id !== req.session.user.id)
    return res.status(403).json({ success: false, message: "Not your project" });

  const subscribers = await safeOperation(
    () => db.all("select email from newsletter_subscribers where fk_project_id = ?", [projectId]),
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

export async function getAllRestaurants(req, res) {
  const restaurants = await safeOperation(
    () => db.all("select project_id, name, website_title, website_route from projects where published = 1"),
    "Error while getting projects from database"
  );

  const formattedRestaurants = restaurants.map(restaurant => ({
    projectId: restaurant.project_id,
    websiteTitle: restaurant.name,
    // websiteTitle: restaurant.website_title,
    websiteRoute: restaurant.website_route,
  }));

  res.status(200).json({
    success: true,
    message: "Successfully got restaurants from database",
    projects: formattedRestaurants
  });
}

export async function getRestaurantsTags(req, res) {
  const { projectId } = req.query;
  const restaurantsTags = await safeOperation(
    () => db.all(
      `select tags.tag_id, tags.name
       from tags
       inner join project_tags on project_tags.fk_tag_id = tags.tag_id
       where project_tags.fk_project_id = ?`,
      projectId
    ), "Error while getting tags from database"
  );


  const formattedTags = restaurantsTags.map(tag => ({
    tagId: tag.tag_id,
    name: tag.name,
  }));

  res.status(200).json({
    success: true,
    message: "Successfully got tags from database",
    tags: formattedTags
  });
}
