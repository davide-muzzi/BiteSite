import express from "express";
import { routeWrapper } from "../error-handling.js";
import checkAuth from "../middleware/check-auth.js";
import * as restaurantHandlers from "../handlers/restaurants.js";

const restaurantRouter = express.Router();

restaurantRouter.get("/website/:route", routeWrapper(restaurantHandlers.serveWebsite));
restaurantRouter.post("/newsletter/subscribe", routeWrapper(restaurantHandlers.subscribeToNewsletter));
restaurantRouter.post("/newsletter/send", checkAuth, routeWrapper(restaurantHandlers.sendNewsletter));
restaurantRouter.get("/get", routeWrapper(restaurantHandlers.getAllRestaurants));
restaurantRouter.get("/get-tags", routeWrapper(restaurantHandlers.getRestaurantsTags));



export default restaurantRouter
