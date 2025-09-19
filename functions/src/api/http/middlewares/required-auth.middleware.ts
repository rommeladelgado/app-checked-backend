import type {Request, Response, NextFunction} from "express";
import type {JwtPayload} from "jsonwebtoken";
import {JwtService} from "../../../shared/security/JwtService";

export function RequireAuth(req: Request, res: Response, next: NextFunction) {
  const h = req.header("authorization") || "";
  const [, token] = h.split(" "); // "Bearer <token>"
  if (!token) return res.status(401).json({error: "Missing token"});

  try {
    const payload = JwtService
      .verifyAccess(token) as JwtPayload & { sub: string };
    (req as any).userId = payload.sub;
    next();
  } catch (e) {
    return res.status(401).json({error: "Invalid or expired token"});
  }
}
