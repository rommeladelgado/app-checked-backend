import "dotenv/config";

export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
export const JWT_REFRESH_SECRET = process.env.REFRESH_SECRET;
export const JWT_REFRESH_EXPIRES_IN = process.env.REFRESH_EXPIRES_IN;
