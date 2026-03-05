import express from "express";
import session from "express-session";
import SQLiteStoreFactory from "connect-sqlite3";
import cors from "cors";
import dotenv from "dotenv";
import { existsSync } from "fs";

import userRouter from "./routes/users.js";
import editorRouter from "./routes/editor.js";
import projectRouter from "./routes/projects.js";
import restaurantRouter from "./routes/restaurants.js";

import cleanup from "./middleware/cleanup.js";
import setup from "./setup.js";

dotenv.config();

if (!existsSync("./database/database.sqlite")) await setup()

const app = express();
app.use(express.json());
app.use(cors({
  origin: process.env.ORIGIN_URL,
  credentials: true
}));
app.set('trust proxy', Number(process.env.PROXY_NUMBER));

const isProd = process.env.NODE_ENV == "production";
const SQLiteStore = SQLiteStoreFactory(session);

app.use(session({
  key: "SessionId",
  secret: process.env.SESSION_SECRET,
  store: new SQLiteStore({ db: "sessions.sqlite", dir: "./database" }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: isProd,
    httpOnly: true,
    sameSite: isProd ? "strict" : "lax",
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
}));

// upload cleanup
app.use(cleanup);

// routes
app.use("/users", userRouter);
app.use("/editor", editorRouter);
app.use("/projects", projectRouter);
app.use("/restaurants", restaurantRouter);

const port = process.env.PORT;
app.listen(port, () => console.log(`Server running on port ${port}`));