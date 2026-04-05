import express from "express";
import { routeWrapper } from "../error-handling.js";
import checkAuth from "../middleware/check-auth.js";
import * as projectHandlers from "../handlers/projects.js";

const projectRouter = express.Router();

projectRouter.get("/", checkAuth, routeWrapper(projectHandlers.getAllProjects));
projectRouter.get("/single", checkAuth, routeWrapper(projectHandlers.getProject));
projectRouter.post("/create", checkAuth, routeWrapper(projectHandlers.createProject));
projectRouter.patch("/edit", checkAuth, routeWrapper(projectHandlers.editProject));
projectRouter.get("/website", checkAuth, routeWrapper(projectHandlers.getWebsite));
projectRouter.patch("/update-website", checkAuth, routeWrapper(projectHandlers.updateWebsite));
projectRouter.patch("/toggle-publish", checkAuth, routeWrapper(projectHandlers.togglePublish));

export default projectRouter
