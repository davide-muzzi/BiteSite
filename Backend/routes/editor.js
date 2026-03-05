import express from "express";
import { routeWrapper } from "../error-handling.js";
import checkAuth from "../middleware/check-auth.js";

const editorRouter = express.Router();



export default editorRouter