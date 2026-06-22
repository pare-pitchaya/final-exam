import { createError } from "./error.middleware.js";

export const checkRole =
  (...allowedRoles) =>
  (req, res, next) => {
    //check role user
    const userRole = req.user.role;
    if (!allowedRoles.includes(userRole)) {
      createError(403, " Insufficient role to perform this action");
    }
    next();
  };
