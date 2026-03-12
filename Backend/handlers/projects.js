import { db } from "../database/db.js";
import { safeOperation, checkReq } from "../error-handling.js";

export async function createProject(req, res) {
  const {name, tags, templateName} = req.body;

  
} 