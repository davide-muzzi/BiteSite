import express from "express";
import { routeWrapper } from "../error-handling.js";
import checkAuth from "../middleware/check-auth.js";

const projectRouter = express.Router();



export default projectRouter