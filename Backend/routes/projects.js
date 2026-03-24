import express from "express";
import { routeWrapper } from "../error-handling.js";
import checkAuth from "../middleware/check-auth.js";
import * as projectHandlers from "../handlers/projects.js";

const projectRouter = express.Router();

projectRouter.get("/", checkAuth, routeWrapper(projectHandlers.getProject));
projectRouter.post("/create", checkAuth, routeWrapper(projectHandlers.createProject));
projectRouter.patch("/edit-title", checkAuth, routeWrapper(projectHandlers.editTitle));
projectRouter.patch("/edit-name", checkAuth, routeWrapper(projectHandlers.editName));
projectRouter.patch("/edit-route", checkAuth, routeWrapper(projectHandlers.editRoute));
projectRouter.get("/website", checkAuth, routeWrapper(projectHandlers.getWebsite));
projectRouter.patch("/update-website", checkAuth, routeWrapper(projectHandlers.updateWebsite));

export default projectRouter
