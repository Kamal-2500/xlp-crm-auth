import express from "express";
import { AuthController } from "../controllers";
import { validateForgotPassword, validateLogin, validateRegister, authenticate, authorize } from "../middlewares";
 

export const authRouter = express.Router();

const authController = new AuthController();

authRouter.get("/login", validateLogin, authController.login);
authRouter.get("/register", authenticate, authorize(["1"]), validateRegister, authController.register);
authRouter.get("/forgot-password", validateForgotPassword, authController.forgotPassword);