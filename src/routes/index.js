import { Router } from "express";
import { authRouter } from "./authRouter";
import { followerRouter } from "./followerRouter";
import { userRouter } from "./userRouter";

const routers = Router();

routers.use("/", authRouter);
routers.use("/", followerRouter);
routers.use("/", userRouter);

export { routers };
