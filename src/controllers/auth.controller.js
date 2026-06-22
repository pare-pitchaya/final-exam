import { authService } from "../services/auth.service.js";

export const authController = {};

authController.register = async (req, res) => {
  await authService.register(req.body);
  res.status(201).json({ message: "User registered successfully" });
};
authController.login = async (req, res) => {
  console.log("req.body", req.body);
  const { email, password } = req.body;
  const data = await authService.login(email, password);
  console.log(data);
  res.json(data);
};
