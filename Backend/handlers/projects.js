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

export async function editTitle(req, res) {
  const {projectId, title} = req.body;
  checkReq(!projectId || !title);

  const project = await safeOperation(
    () => db.get("select fk_user_id from projects where project_id = ?", [projectId]),
    "Error while getting project from database"
  );

  if (!project) 
    return res.status(404).json({ success: false, message: "Project not found" });
  if (project.fk_user_id !== req.session.user.id) 
    return res.status(403).json({ success: false, message: "Not your project" });
  
  await safeOperation(
    () => db.run("update projects set website_title = ? where project_id = ?", [title, projectId]),
    "Error while updating website title"
  );

  res.status(200).json({ success: true, message: "Successfully updated website title" });
}

export async function editName(req, res) {
  const {projectId, name} = req.body;
  checkReq(!projectId || !name);

  const project = await safeOperation(
    () => db.get("select fk_user_id from projects where project_id = ?", [projectId]),
    "Error while getting project from database"
  );

  if (!project) 
    return res.status(404).json({ success: false, message: "Project not found" });
  if (project.fk_user_id !== req.session.user.id) 
    return res.status(403).json({ success: false, message: "Not your project" });
  
  await safeOperation(
    () => db.run("update projects set name = ? where project_id = ?", [name, projectId]),
    "Error while updating website name"
  );

  res.status(200).json({ success: true, message: "Successfully updated website name" });
}

export async function getProject(req, res) {
  const {projectId} = req.query;

  const project = await safeOperation(
    () => db.get("select project_id, name, website_title, website_route, published, fk_user_id from projects where project_id = ?", [projectId]),
    "Error while getting project from database"
  );

  if (!project) 
    return res.status(404).json({ success: false, message: "Project not found" });
  if (project.fk_user_id !== req.session.user.id) 
    return res.status(403).json({ success: false, message: "Not your project" });

  const tags = await safeOperation(
    () => db.all("select name from tags join project_tags on tag_id = fk_tag_id where fk_project_id = ?", [projectId]),
    "Error while getting tags from database"
  );
  
  const formattedProject = {
    projectId: project.project_id,
    name: project.name,
    websiteTitle: project.website_title || "",
    websiteRoute: project.website_route || "",
    published: Boolean(project.published),
    tags: tags.map(tag => tag.name),
  };

  res.status(200).json({ success: true, message: "Successfully retrieved project from database", project: formattedProject });
}
