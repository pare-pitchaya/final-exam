import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export const jwtService = {};

jwtService.sign = (payload) =>
  jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });
jwtService.verify = (accessToken) => jwt.verify(accessToken, env.JWT_SECRET);
