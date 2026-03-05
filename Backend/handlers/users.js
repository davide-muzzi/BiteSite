import bcrypt from "bcrypt";
import { db } from "../database/db.js";
import { checkReq, safeOperation, safeOperations } from "../error-handling.js";

export async function userdata(req, res) {
  const user = await safeOperation(
    () => db.get("select user_id, username, email, subscription from users where user_id = ?", [req.session.user.id]),
    "Error while fetching userdata from database"
  )

  res.status(200).json({ success: true, message: "Successfully retrieved user from database", user })
}

export async function register(req, res) {
  const {username, email, password, subscription} = req.body;
  checkReq(!username || !email || !password || !subscription);

  const [dbUsername, dbEmail] = await safeOperations([
    () => db.get("select * from users where username = ?", [username]),
    () => db.get("select * from users where email = ?", [email]),
  ], "Error while fetching username");

  if (dbUsername) return res.status(400).json({success: false, message: "Username is taken"});
  if (dbEmail) return res.status(400).json({success: false, message: "E-Mail is taken"});

  const hashedPassword = await bcrypt.hash(password, 10);

  await safeOperation(
    () => db.run("insert into users (username, email, password_hash, subscription) values (?,?,?,?)", [username, email, hashedPassword, subscription]),
    "Error while registering"
  );

  res.status(200).json({success: true, message: "Registered successfully"});
}