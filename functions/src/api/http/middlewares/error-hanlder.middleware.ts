import {Request, Response} from "express";
import {AppError} from "@src/api/http/types/types";

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response
) {
  if (err instanceof AppError) {
    return res.status(err.status).json({error: err.message});
  }

  if (err instanceof Error) {
    return res.status(500).json({error: err.message});
  }
  res.status(500).json({error: String(err) || "Internal Server Error"});
}

