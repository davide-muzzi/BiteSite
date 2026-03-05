import { readFile } from "fs/promises";
import { db } from "./database/db.js";

export default async function setup() {
  const tableExists = await db.get("select name from sqlite_master where type='table' and name='users'");

  if (!tableExists) {
    const setupScript = await readFile("./database/db-structure.sql", "utf-8");
    await db.exec(setupScript);
  }
}