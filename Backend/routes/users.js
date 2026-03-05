import express from "express";
import { routeWrapper } from "../error-handling.js";
import checkAuth from "../middleware/check-auth.js";
import * as userHandlers from "../handlers/users.js";

const userRouter = express.Router();

userRouter.post("/register", routeWrapper(userHandlers.register));

export default userRouter