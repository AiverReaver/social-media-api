import { Router } from "express";
import { authRouter } from "./authRouter";
import { followerRouter } from "./followerRouter";
import { likeRouter } from "./likeRouter";
import { postRouter } from "./postRouter";
import { userRouter } from "./userRouter";

const routers = Router();

routers.use("/", authRouter);
routers.use("/", followerRouter);
routers.use("/", userRouter);
routers.use("/", postRouter);
routers.use("/", likeRouter);

export { routers };
