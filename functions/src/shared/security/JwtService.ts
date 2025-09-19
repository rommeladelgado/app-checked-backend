import jwt, {} from "jsonwebtoken";

import type {StringValue} from "ms";
import {
  JWT_REFRESH_EXPIRES_IN,
  JWT_REFRESH_SECRET,
  JWT_SECRET,
} from "../config/environment";

type SignOptions = jwt.SignOptions;


if (!JWT_SECRET) throw new Error("JWT_SECRET is missing");
if (!JWT_REFRESH_SECRET) throw new Error("REFRESH_SECRET is missing");

const defaultSignOptions: SignOptions = {
  expiresIn: (JWT_REFRESH_EXPIRES_IN as StringValue | number | null) || 900,
};
export const JwtService = {
  signAccess(payload, options:SignOptions = defaultSignOptions) {
    return jwt.sign(
      payload,
      JWT_SECRET,
      options
    );
  },
  signRefresh(payload, options: SignOptions = defaultSignOptions) {
    return jwt.sign(
      payload,
      JWT_SECRET,
      options
    );
  },
  verifyAccess(token) {
    return jwt.verify(token, JWT_SECRET);
  },
  verifyRefresh(token) {
    return jwt.verify(token, JWT_REFRESH_SECRET);
  },
};
