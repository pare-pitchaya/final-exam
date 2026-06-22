import { prisma } from "../db/prisma.js";
import { email } from "zod";
import { createError } from "../middleware/error.middleware.js";

export const userService = {};
userService.create = async (data) => {
  try {
    console.log(data);
    return await prisma.user.create({ data });
  } catch (err) {
    if (err.name === "PrismaClientKnownRequestError" && err.code === "P2002") {
      createError(409, "Email already in use", { email: data.email });
    }
    throw err;
  }
};
userService.findByEmail = (email) =>
  prisma.user.findFirst({
    where: {
      email,
    },
    // omit: { password: true }, //เอา password ออก เป็น lib ของ prisma
  });

userService.findById = (id) =>
  prisma.user.findFirst({
    where: {
      id,
    },
    // omit: { password: true },
  });
