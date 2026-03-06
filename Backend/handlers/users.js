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

export async function login(req, res) {
  const {email, password} = req.body;
  checkReq(!email || !password);

  const dbUser = await safeOperation(
    () => db.get("select * from users where email = ?", [email]), 
    "Error while fetching user from the database"
  );

  if (!dbUser) return res.status(404).json({success: false, message: "User not found"});

  const isPasswordValid = await bcrypt.compare(password, dbUser.password_hash);
  if (!isPasswordValid) return res.status(401).json({success: false, message: "Wrong password"});

  req.session.user = { id: dbUser.user_id };
  res.status(200).json({success: true, message: "User successfully logged in"});
}

export async function edit(req, res) {
  const {username, email} = req.body;
  checkReq(!username && !email);

  const [dbUsername, dbEmail] = await safeOperations([
    () => db.get("select * from users where username = ? and user_id != ?", [username, req.session.user.id]),
    () => db.get("select * from users where email = ? and user_id != ?", [email, req.session.user.id])
  ], "Error while fetching username");

  if (dbUsername) return res.status(400).json({success: false, message: "Username is taken"});
  if (dbEmail) return res.status(400).json({success: false, message: "E-Mail is taken"});

  await safeOperation(
    async () => {
      if (username) await db.run("update users set username = ? where user_id = ?", [username, req.session.user.id])
      if (email) await db.run("update users set email = ? where user_id = ?", [email, req.session.user.id])
    },
    "Error while updating userdata"
  );

  res.status(200).json({ success: true, message: "Successfully updated user" });
}

export async function checkLogin(req, res) {
  if (req.session.user) {
    res.status(200).json({ success: true, message: "Logged in", loggedIn: true });
  } else {
    res.status(200).json({ success: true, message: "Not logged in", loggedIn: false });
  }
}

export async function deleteUser(req, res) {
  await safeOperation(
    () => db.run("delete from users where user_id = ?", [req.session.user.id]),
    "Error while deleting user"
  );

  res.status(200).json({ success: true, message: "Successfully deleted user" });
}

export async function logout(req, res) {
  req.session.destroy();
  res.clearCookie("SessionId");
  res.status(200).json({success: true, message: "Logged out successfully" });
}