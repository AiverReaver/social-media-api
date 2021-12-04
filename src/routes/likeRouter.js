import { Router } from "express";
import { likeController } from "../controllers/LikeContoller";
import { authMiddleware } from "../middlewares/AuthMiddleware";

const likeRouter = Router();

likeRouter.post("/like/:postId", authMiddleware, likeController.likePost);
likeRouter.post("/unlike/:postId", authMiddleware, likeController.unlikePost);

export { likeRouter };
