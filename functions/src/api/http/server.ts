// functions/src/app/http/server.ts
import express from "express";
import {authRouter, tasksRouter} from "./routes";
import {applySecurity} from "./middlewares/security.middleware";
import {notFound} from "./middlewares/not-found.middleware";
import {errorHandler} from "./middlewares/error-hanlder.middleware";
import {requireAuth} from "./middlewares/required-auth.middleware";

export function createApp() {
  const app = express();
  applySecurity(app);

  app.use("/auth", authRouter);
  app.use("/tasks", requireAuth, tasksRouter);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
