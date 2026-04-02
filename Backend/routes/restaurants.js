import express from "express";
import { routeWrapper } from "../error-handling.js";
import checkAuth from "../middleware/check-auth.js";
import * as restaurantHandlers from "../handlers/restaurants.js";

const restaurantRouter = express.Router();

restaurantRouter.get("/website/:route", routeWrapper(restaurantHandlers.serveWebsite));

export default restaurantRouter
