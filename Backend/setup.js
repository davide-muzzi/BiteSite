import { readFile } from "fs/promises";
import { db } from "./database/db.js";

export default async function setup() {
  const setupScript = await readFile("./database/db-structure.sql", "utf-8");
  await db.exec(setupScript);
}