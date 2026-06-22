import { Router } from "express";
import { registerSchema } from "../schemas/auth.schema.js";
import { validate } from "../middleware/validate.middleware.js";
import { authController } from "../controllers/auth.controller.js";

export const authRouter = Router();
authRouter.post(
  "/register",
  validate({ body: registerSchema }),
  authController.register,
);
