import { db } from "../database/db.js";
import { safeOperation, checkReq } from "../error-handling.js";
import { copyFile, readFile, writeFile, mkdir, rename } from "fs/promises";

export async function createProject(req, res) {
  const { name, tags, templateName } = req.body;
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
  const { projectId, title } = req.body;
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
  const { projectId, name } = req.body;
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
  const { projectId } = req.query;
  checkReq(!projectId);

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

export async function editRoute(req, res) {
  const { projectId, routeName } = req.body;
  checkReq(!projectId || !routeName);

  const project = await safeOperation(
    () => db.get("select published, website_route, fk_user_id from projects where project_id = ?", [projectId]),
    "Error while getting project from database"
  );

  if (!project)
    return res.status(404).json({ success: false, message: "Project not found" });
  if (project.fk_user_id !== req.session.user.id)
    return res.status(403).json({ success: false, message: "Not your project" });

  const routeProject = await safeOperation(
    () => db.get("select project_id, fk_user_id from projects where website_route = ?", [routeName.toLowerCase()]),
    "Error while checking if route exists"
  );

  if (routeProject && routeProject.project_id !== projectId) res.status(409).json({ success: false, message: "Route is already registered" });

  await safeOperation(
    () => db.run("update projects set website_route = ? where project_id = ?", [routeName.toLowerCase(), projectId]),
    "Error while updating route"
  );

  if (project.published) {
    await safeOperation(
      () => rename(`./websites/${project.website_route}.html`, `./websites/${routeName}.html`),
      "Error while renaming website html file"
    );
  }

  res.status(200).json({ success: true, message: "Successfully updated route" });
}

export async function getWebsite(req, res) {
  const { projectId } = req.query;
  checkReq(!projectId);

  const project = await safeOperation(
    () => db.get("select website, fk_user_id from projects where project_id = ?", [projectId]),
    "Error while getting project from database"
  );

  if (!project)
    return res.status(404).json({ success: false, message: "Project not found" });
  if (project.fk_user_id !== req.session.user.id)
    return res.status(403).json({ success: false, message: "Not your project" });

  res.status(200).json({ success: true, message: "Successfully retrieved website from database", website: JSON.parse(project.website) });
}

export async function updateWebsite(req, res) {
  const { projectId, website } = req.body;
  checkReq(!projectId || !website);

  const project = await safeOperation(
    () => db.get("select fk_user_id from projects where project_id = ?", [projectId]),
    "Error while getting project from database"
  );

  if (!project)
    return res.status(404).json({ success: false, message: "Project not found" });
  if (project.fk_user_id !== req.session.user.id)
    return res.status(403).json({ success: false, message: "Not your project" });

  await safeOperation(
    () => db.run("update projects set website = ? where project_id = ?", [JSON.stringify(website), projectId]),
    "Error while updating website"
  );

  res.status(200).json({ success: true, message: "Successfully updated website" });
}

export async function publish(req, res) {
  const { projectId } = req.body;

  const project = await safeOperation(
    () => db.get("select website, website_route, website_title, fk_user_id from projects where project_id = ?", [projectId]),
    "Error while getting project from database"
  );

  if (!project)
    return res.status(404).json({ success: false, message: "Project not found" });
  if (project.fk_user_id !== req.session.user.id)
    return res.status(403).json({ success: false, message: "Not your project" });

  await safeOperation(
    () => makeWebsite(JSON.parse(project.website), project.website_route, project.website_title),
    "Error while making website"
  );

  await safeOperation(
    () => db.run("update projects set published = 1 where project_id = ?", [projectId]),
    "Error while publishing website"
  );

  res.status(200).json({ success: true, message: "Successfully published website" });
}

function objectToCSS(object) {
  let css = "";

  for (const [key, value] of Object.entries(object)) {
    css += `${key}: ${value};`
  }

  return css
}

async function makeWebsite(website, route, title) {
  let htmlContent = await safeOperation(
    () => readFile("./websites/.template.html", "utf-8"),
    "Error while reading website html file"
  );

  htmlContent = htmlContent.replace(/\|websiteTitle\|/, title);

  const navbar = website.navbar;
  const pages = website.pages;

  let navbarItems = "";

  for (const page of pages) {
    navbarItems += `<a href="#${page.name.toLowerCase()}">${page.name[0] + page.name.slice(1)}</a>\n`
  }

  htmlContent = htmlContent.replace(/\|navbarItems\|/, navbarItems)
    .replace(/\|navbarBackground\|/g, navbar.backgroundColor)
    .replace(/\|navbarColor\|/g, navbar.textColor)
    .replace(/\|navbarAdditionalCSS\|/, objectToCSS(navbar.css));

  htmlContent = htmlContent.replace(/\|firstPage\|/, pages[0].name.toLowerCase());

  for (const page of pages) {

  }

  await safeOperation(
    () => writeFile(`./websites/${route}.html`, htmlContent),
    "Error while writing to html file"
  );
}
