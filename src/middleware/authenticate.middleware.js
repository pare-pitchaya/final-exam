// import { jwtService } from "../services/jwt.service.js";
// import { createError } from "../utils/create-error.js";
// import { userService } from "../services/user.service.js";

export const authenticate = async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    createError(400, "Authorization is missing");
  }
  if (!authorization.startsWith("Bearer ")) {
    createError(400, "Invalid authorization schema");
  }
  const accessToken = authorization.split(" ")[1];
  try {
    const payload = jwtService.verify(accessToken);
    const user = await userService.findById(payload.sub);
    if (!user) {
      createError(401, "User not found");
    }
    req.user = user;
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      createError(401, "Token expired");
    }
    if (err.name === "JsonWebTokenError") {
      createError(401, "Invalid Token");
    }
    throw err;
  }
  next();
};
