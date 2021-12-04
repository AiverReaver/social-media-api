import { Router } from "express";
import { likeController } from "../controllers/LikeContoller";
import { authMiddleware } from "../middlewares/authMiddleware";

const likeRouter = Router();

likeRouter.post("/like/:postId", authMiddleware, likeController.likePost);
likeRouter.post("/unlike/:postId", authMiddleware, likeController.unlikePost);

export { likeRouter };
