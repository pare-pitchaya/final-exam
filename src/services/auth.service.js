import { email } from "zod";
import { createError } from "../middleware/error.middleware.js";
import { hashService } from "./hash.service.js";
import { jwtService } from "./jwt.service.js";
import { userService } from "./user.service.js";

export const authService = {};
authService.register = async (input) => {
  //hash password
  const hash = await hashService.hash(input.password);
  //insert new user
  await userService.create({
    email: input.email,
    passwordHash: hash,
    name: input?.name,
  });
};
authService.login = async (email, password) => {
  //find user by email
  const user = await userService.findByEmail(email);
  if (!user) {
    createError(401, "Invalid email or password");
  }
  //compare password
  const isMatch = await hashService.compare(password, user.passwordHash);
  if (!isMatch) {
    createError(401, "Invalid email or password");
  }
  //gen access token
  const accessToken = jwtService.sign({
    sub: user.id,
    email: user.email,
    // role: user.role,
  });
  return accessToken;
};
