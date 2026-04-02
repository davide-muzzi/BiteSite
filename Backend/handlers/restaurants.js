import { db } from "../database/db.js";
import { safeOperation, checkReq } from "../error-handling.js";
import { existsSync } from "fs";
import { readFile } from "fs/promises";

export async function serveWebsite(req, res) {
  const { route } = req.params;

  const websitePath = `./websites/${route}.html`;

  if (!existsSync(websitePath))
    res.status(404).send("<h1>404 Restaurant not found</h1>");

  const website = await safeOperation(
    () => readFile(websitePath, "utf-8"),
    "Error while reading html file"
  );

  res.status(200).send(website);
}
