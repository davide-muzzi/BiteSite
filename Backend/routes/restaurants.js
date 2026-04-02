import express from "express";
import { routeWrapper } from "../error-handling.js";
import checkAuth from "../middleware/check-auth.js";
import * as restaurantHandlers from "../handlers/restaurants.js";

const restaurantRouter = express.Router();

restaurantRouter.post("/newsletter/subscribe", routeWrapper(restaurantHandlers.subscribeToNewsletter));
restaurantRouter.post("/newsletter/send", checkAuth, routeWrapper(restaurantHandlers.sendNewsletter));

export default restaurantRouter
