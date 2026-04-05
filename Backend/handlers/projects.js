import { db } from "../database/db.js";
import { safeOperation, checkReq, HttpError } from "../error-handling.js";
import { readFile, writeFile, rename, readdir } from "fs/promises";

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

export async function editProject(req, res) {
  const { projectId, route, title, name } = req.body;
  checkReq(!projectId || (!route && !title && !name));

  const project = await safeOperation(
    () => db.get("select name, published, website, website_title, website_route, fk_user_id from projects where project_id = ?", [projectId]),
    "Error while getting project from database"
  );

  if (!project)
    return res.status(404).json({ success: false, message: "Project not found" });
  if (project.fk_user_id !== req.session.user.id)
    return res.status(403).json({ success: false, message: "Not your project" });

  if (route && route !== project.website_route)
    await editRoute(projectId, route, project.website_route, project.published);
  if (title && title !== project.website_title)
    await editTitle(projectId, title, JSON.parse(project.website), project.website_route);
  if (name && name !== project.name)
    await editName(projectId, name);

  res.status(200).json({ success: true, message: "Successfully edited project" });
}

////////////////////////////
// Edit Project functions //
//------------------------//

async function editRoute(projectId, route, oldRoute, published) {
  const routeProject = await safeOperation(
    () => db.get("select project_id, fk_user_id from projects where website_route = ?", [route.toLowerCase()]),
    "Error while checking if route exists"
  );

  if (routeProject) throw new HttpError("Route is already registered", 409);

  await safeOperation(
    () => db.run("update projects set website_route = ? where project_id = ?", [route.toLowerCase(), projectId]),
    "Error while updating route"
  );

  if (published) {
    await safeOperation(
      () => rename(`./websites/${oldRoute}.html`, `./websites/${route}.html`),
      "Error while renaming website html file"
    );
  }
}

async function editTitle(projectId, title, website, route) {
  await safeOperation(
    () => makeWebsite(website, route, title),
    "Error while making website"
  );

  await safeOperation(
    () => db.run("update projects set website_title = ? where project_id = ?", [title, projectId]),
    "Error while updating website title"
  );
}

async function editName(projectId, name) {
  await safeOperation(
    () => db.run("update projects set name = ? where project_id = ?", [name, projectId]),
    "Error while updating website name"
  );
}

//------------------------//
// Edit Project functions //
////////////////////////////

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

export async function getAllProjects(req, res) {
  const projects = await safeOperation(
    () => db.all("select project_id, name from projects where fk_user_id = ?", [req.session.user.id]),
    "Error while getting projects from database"
  );

  const formattedProjects = projects.map(project => ({
    projectId: project.project_id,
    name: project.name,
  }));

  res.status(200).json({ success: true, message: "Successfully retrieved projects from database", projects: formattedProjects });
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
    () => db.get("select website_route, website_title, fk_user_id from projects where project_id = ?", [projectId]),
    "Error while getting project from database"
  );

  if (!project)
    return res.status(404).json({ success: false, message: "Project not found" });
  if (project.fk_user_id !== req.session.user.id)
    return res.status(403).json({ success: false, message: "Not your project" });

  await safeOperation(
    () => makeWebsite(website, project.website_route, project.website_title),
    "Error while making website"
  );

  await safeOperation(
    () => db.run("update projects set website = ? where project_id = ?", [JSON.stringify(website), projectId]),
    "Error while updating website"
  );

  res.status(200).json({ success: true, message: "Successfully updated website" });
}

export async function togglePublish(req, res) {
  const { projectId } = req.body;

  const project = await safeOperation(
    () => db.get("select published, fk_user_id from projects where project_id = ?", [projectId]),
    "Error while getting project from database"
  );

  if (!project)
    return res.status(404).json({ success: false, message: "Project not found" });
  if (project.fk_user_id !== req.session.user.id)
    return res.status(403).json({ success: false, message: "Not your project" });

  project.published = Boolean(project.published);

  await safeOperation(
    () => db.run("update projects set published = ? where project_id = ?", [!project.published, projectId]),
    "Error while publishing website"
  );

  res.status(200).json({ success: true, message: "Successfully toggled publish on website", published: !project.published });
}

function objectToCSS(object) {
  let css = "";

  for (const [key, value] of Object.entries(object)) {
    css += `${key}: ${value} !important;\n`
  }

  return css
}

async function makeWebsite(website, route, title) {
  let htmlContent = await safeOperation(
    () => readFile("./websites/.template.html", "utf-8"),
    "Error while reading website html file"
  );

  htmlContent = htmlContent.replace(/\|websiteTitle\|/g, title);

  const navbar = website.navbar;
  const pages = website.pages;

  let navbarItems = "";

  for (const page of pages) {
    navbarItems += `<a href="#${page.name.toLowerCase()}">${page.name[0] + page.name.slice(1)}</a>\n`
  }

  htmlContent = htmlContent
    .replace(/\|navbarItems\|/, navbarItems)
    .replace(/\|navbarBackground\|/g, navbar.backgroundColor)
    .replace(/\|navbarColor\|/g, navbar.textColor)
    .replace(/\|navbarHeight\|/g, navbar.height)
    .replace(/\|navbarWidth\|/g, navbar.width)
    .replace(/\|navbarBorderRadius\|/g, navbar.borderRadius)
    .replace(/\|navbarAdditionalBarCSS\|/, objectToCSS(navbar.barCss))
    .replace(/\|navbarAdditionalContainerCSS\|/, objectToCSS(navbar.containerCss))
    .replace(/\|navbarAdditionalTitleCSS\|/, objectToCSS(navbar.titleCss))
    .replace(/\|navbarAdditionalItemCSS\|/, objectToCSS(navbar.itemCss));

  htmlContent = htmlContent
    .replace(/\|firstPage\|/, pages[0].name.toLowerCase());

  let pagesHtml = "";
  let pagesCss = "";
  for (const page of pages) {

    pagesCss += `#${page.name.toLowerCase()} {
      background-color: ${page.backgroundColor};
    }`;

    let componentsHtml = "";
    for (const [index, component] of page.content.entries()) {
      const componentId = `component-${page.name.toLowerCase()}-${index}`;
      componentsHtml += `<div id="${componentId}">${component.html}</div>\n`;
      pagesCss += `#${componentId}>* {
        ${objectToCSS(component.css)}
      }`;
    }

    pagesHtml += `<div class="page" id="${page.name.toLowerCase()}">
      ${componentsHtml}
    </div>`;
  }

  htmlContent = htmlContent
    .replace(/\|pageContent\|/, pagesHtml)
    .replace(/\|pageCss\|/, pagesCss)
    .replace(/§/g, "");

  await safeOperation(
    () => writeFile(`./websites/${route}.html`, htmlContent),
    "Error while writing to html file"
  );
}
