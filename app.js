import express from "express";
import "dotenv/config.js";
import morgan from "morgan";
// import { todoRouter } from "./routes/todo.route.js";
// import cors from "cors";
import { env } from "./src/config/env.js";
import { notFoundMiddleware } from "./src/middleware/not-found.middleware.js";
import { errorMiddleware } from "./src/middleware/error.middleware.js";
import { authRouter } from "./src/routes/auth.route.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
// app.use(morgan("dev"));
app.use("/auth", authRouter);
// app.use("/todos", todoRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const PORT = env.PORT;
app.listen(PORT, (error) => {
  if (error) console.log(error);
  else console.log("SERVER RUN ON PORT: ", PORT);
});
