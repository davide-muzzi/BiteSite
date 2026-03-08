import express from "express";
import { routeWrapper } from "../error-handling.js";
import checkAuth from "../middleware/check-auth.js";
import * as userHandlers from "../handlers/users.js";

const userRouter = express.Router();

userRouter.get("/", checkAuth, routeWrapper(userHandlers.userdata));
userRouter.post("/register", routeWrapper(userHandlers.register));
userRouter.post("/login", routeWrapper(userHandlers.login));
userRouter.patch("/edit", checkAuth, routeWrapper(userHandlers.edit));
userRouter.get("/check-login", routeWrapper(userHandlers.checkLogin));
userRouter.delete("/delete", checkAuth, routeWrapper(userHandlers.deleteUser));
userRouter.post("/logout", routeWrapper(userHandlers.logout));
userRouter.post("/payment", checkAuth, routeWrapper(userHandlers.payment));
userRouter.patch("/cancel-subscription", checkAuth, routeWrapper(userHandlers.cancelSubscription));
userRouter.patch("/edit-subscription", checkAuth, routeWrapper(userHandlers.editSubscription));

export default userRouter;