import { Router } from "express";
import { followerController } from "../controllers/FollowController";
import { authMiddleware } from "../middlewares/AuthMiddleware";

const followerRouter = Router();

followerRouter.post("/follow/:id", authMiddleware, followerController.follow);
followerRouter.post(
  "/unfollow/:id",
  authMiddleware,
  followerController.unFollow
);

export { followerRouter };
