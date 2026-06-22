import { hashService } from "./hash.service.js";
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
