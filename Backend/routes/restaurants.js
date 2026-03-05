import express from "express";
import { routeWrapper } from "../error-handling.js";
import checkAuth from "../middleware/check-auth.js";

const restaurantRouter = express.Router();



export default restaurantRouter