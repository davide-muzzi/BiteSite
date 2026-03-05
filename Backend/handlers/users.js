import bcrypt from "bcrypt";

export async function userdata(req, res) {

}

export async function register(req, res) {
  const {username, email, password} = req.body
  checkReq(!username || !email || !password)

  const [dbUsername, dbEmail] = await safeOperations([
    () => db.get("select * from users where username = ?", [username]),
    () => db.get("select * from users where email = ?", [email])
  ], "Error while fetching username")

  if (dbUsername) return res.status(400).json({success: false, message: "Username is taken"})
  if (dbEmail) return res.status(400).json({success: false, message: "E-Mail is taken"})

  const hashedpassword = await bcrypt.hash(password, 10)

  await safeOperation(
    () => db.run("insert into UserData (username, email, passwordHash, approved, userRole) values (?,?,?,false,'user')", [username, email, hashedpassword]),
    "Error while registering"
  )

  res.status(200).json({success: true, message: "Register request sent successfully"})
}