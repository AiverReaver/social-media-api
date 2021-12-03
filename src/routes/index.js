import { Router } from "express";
import { authRouter } from "./authRouter";
import { followerRouter } from "./followerRouter";

const routers = Router();

routers.use("/", authRouter);
routers.use("/", followerRouter);

export { routers };
