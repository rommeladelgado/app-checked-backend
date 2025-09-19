
import {Router} from "express";
import * as userController from "./controllers/user.controller";
import * as taskController from "./controllers/task.controller";


// eslint-disable-next-line new-cap
export const authRouter = Router();
authRouter.post("/login", userController.login);
authRouter.post("/register", userController.register);


// eslint-disable-next-line new-cap
export const tasksRouter = Router();
tasksRouter.get("/", taskController.search);
tasksRouter.post("/", taskController.create);
tasksRouter.get("/:taskId", taskController.findById);
tasksRouter.patch("/:taskId", taskController.update);
tasksRouter.delete("/:taskId", taskController.remove);