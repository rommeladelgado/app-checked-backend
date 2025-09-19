import express from "express";
import cors from "cors";
import helmet from "helmet";

export function applySecurity(app: express.Express) {
  app.set("trust proxy", 1);
  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({extended: false}));
}
