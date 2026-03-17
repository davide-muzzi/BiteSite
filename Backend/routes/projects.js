import express from "express";
import { routeWrapper } from "../error-handling.js";
import checkAuth from "../middleware/check-auth.js";
import * as projectHandlers from "../handlers/projects.js";

const projectRouter = express.Router();

projectRouter.post("/create", checkAuth, routeWrapper(projectHandlers.createProject));
projectRouter.patch("/edit-title", checkAuth, routeWrapper(projectHandlers.editTitle))

export default projectRouter