
import {Router} from "express";
import * as userController from "./controllers/user.controller";

// eslint-disable-next-line new-cap
export const authRouter = Router();
authRouter.post("/login", userController.login);
authRouter.post("/register", userController.register);
