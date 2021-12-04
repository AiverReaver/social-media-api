import { Router } from "express";
import { userController } from "../controllers/UserController";
import { authMiddleware } from "../middlewares/authMiddleware";

const userRouter = Router();

userRouter.get("/user", authMiddleware, userController.getUserInfo);

export { userRouter };
