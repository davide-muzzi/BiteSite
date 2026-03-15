import { db } from "../database/db.js";
import { safeOperation, checkReq } from "../error-handling.js";

export async function createProject(req, res) {
  const {name, tags, templateName} = req.body;
  checkReq(!name || !tags || !templateName);

  if (templateName !== "blank") return res.status(400).json({ success: false, message: "Not a recognized template" });
  const template = [];

  const tagSelectPlaceholders = tags.map(() => "?").join(",");

  const existingTags = await safeOperation(
    () => db.all(`select tag_id, name from tags where name in (${tagSelectPlaceholders})`, tags),
    "Error while getting tags from database"
  ) || [];

  const newTags = tags.filter(tag => !existingTags.some(exTag => exTag.name === tag));
  const newTagInsertPlaceholder = newTags.map(() => "(?)").join(",") || "(?)";

  const newTagsInsert = await safeOperation(
    () => db.run(`insert into tags (name) values ${newTagInsertPlaceholder}`, newTags),
    "Error while inserting new tags"
  );

  const projectInsert = await safeOperation(
    () => db.run("insert into projects (name, website, fk_user_id) values (?,?,?)", [name, JSON.stringify(template), req.session.user.id]),
    "Error while inserting project into database"
  );

  const newTagIds = [];

  for (let i = 0; i < newTags.length; i++) {
    newTagIds.push(newTagsInsert.lastID);
    newTagsInsert.lastID--;
  }

  const referenceTagIds = [...newTagIds, ...existingTags.map(tag => tag.tag_id)];

  const tagInsertPlaceholders = referenceTagIds.map(() => "(?,?)").join(",");
  const tagInsertParams = referenceTagIds.flatMap(tag => [tag, projectInsert.lastID]);

  await safeOperation(
    () => db.run(
      `insert into project_tags (fk_tag_id, fk_project_id) values ${tagInsertPlaceholders}`,
      tagInsertParams
    ),
    "Error while inserting tag references"
  );

  res.status(200).json({ success: true, message: "Successfully created project" });
} 