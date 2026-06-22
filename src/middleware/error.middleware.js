import z, { ZodError } from "zod";

export const errorMiddleware = (err, req, res, next) => {
  console.log(err);
  console.log("+++++++++");
  console.log(err.name);

  // if (err.name === 'ZodError'){
  if (err instanceof ZodError) {
    res
      .status(400)
      .json({ message: "Validation failed", details: z.flattenError(err) });
    return;
  }

  res.status(500).json({ message: err.message });
};

export const createError = (statusCode, message, details) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.details = details;

  throw error;
};
