import { Router } from "express";
import { body } from "express-validator";
import { authController } from "../controllers/AuthController";

const authRouter = Router();

authRouter.post(
  "/authenticate",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .isLength({ min: 4, max: 30 })
      .withMessage("password Must be between 4 to 20 characters"),
  ],
  authController.login
);

export { authRouter };
